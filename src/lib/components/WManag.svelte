﻿<script lang="ts">

import { onMount, onDestroy} from "svelte";
import {dragElement} from './CompUtils'



export let id = 'defaultWManager'
export let title = 'WINDOW TITLE'
export let disableClose = false
export let disableMinimize = false
export let draggable = true
export let top = "10px"
export let left = "10px"
export let zindex = 3
export let headercolor = "#e9e9e9"
export let titlecolor = "#666"
export let titlefontsize = "15px"
export let titleweight = "bold"
export let bodycolor = "#ffffff"
export let data:any = []
export let dragE:any = {}
export let width = "max-content"
export let height = "max-content"
export let visibility = "visible"
export let resize = 'none'
export let minimized = 'off'
export let scrollable = false
export let showheader = true
export let bordercolor = "#c0c0c0"
export let boxshadow = "0px 0px 0px 0px #000000"
export let mbariconwidth = "18"

export let toolbar:any = [
	
]

export let closeMenu = (ev:any)=>{
	let win:any = document.getElementById(id);
	win.style.visibility = "hidden";
	// hide all registered components
	regComponents.forEach((compname:any) => {
		let comp = document.getElementById(compname)
		if(comp)
			comp.style.visibility = "hidden"
	});
}

let winHeight = ''
let regComponents:any = []
let regEvlistener:any

onMount(async () => { 
	const dragable = document.getElementById(id);
	if(draggable){
		//const dragelement = document.getElementById(id+"dragelement");
		const dragzone = document.getElementById(id+"dragzone");
		dragElement(dragable, dragzone)
		dragE = id+"dragelement"
	}
	let win:any = document.getElementById(id);
	switch(minimized){
		case 'on':
			 win.style.height ="30px"
			 break;
		default:
			win.style.height =''
			break;
	}

	// add event listener to register components
	regEvlistener = win.addEventListener('register', (e:any) => {
		const comp = e.detail
		// if the component is already registered do nothing
		if(regComponents.includes(comp))
			return
		regComponents.push(comp)
	})
 })

 onDestroy(() => {
	 let win:any = document.getElementById(id);
	 if(win)
		win.removeEventListener('register', regEvlistener)
 })


const minimize = (event:any)=>{
	let win:any = document.getElementById(id);
	winHeight = win.style.height
	if(winHeight == '')
      winHeight ="30px"
	else
	  winHeight = ""
	win.style.height = winHeight;
}

</script>

<div class="window-menu" 
		id="{id}" 
		style="--resize:{resize};
				--visibility:{visibility};
				--height:{height};
				--width:{width};
				--z-index:{zindex};
				--top:{top};
				--left:{left};
				--background-color:{bodycolor};
				--border-color:{bordercolor};
				--box-shadow:{boxshadow}">
	
	<header id="{id+'dragelement'}">
		{#if showheader}
		<div class="window-menu-header" id="{id+'dragzone'}" style="background-color: {headercolor};">
			<span id={"title-"+id} style={"padding:4px;font-weight:"+titleweight+";color:"+titlecolor+";font-size:"+titlefontsize+";"}>{title}</span>
			<!--span id={"title-"+id}>{title}</!--span-->
			<div style="margin:2px;">
				<input class="wmanag-button cursor-pointer text-lg" type="button" disabled={disableMinimize} value="&horbar;" on:click={minimize} />
				<input class="wmanag-button cursor-pointer text-lg" type="button" disabled={disableClose} value="&bigotimes;" on:click={closeMenu} />
			</div>
		</div>
		
		 <div class="window-menu-toolbar">
		  {#key toolbar}
			{#each toolbar as Tool}
			   {#if Tool.label}
					<label id={Tool.props.id?"label-"+Tool.props.id:null} 
						style="visibility:{Tool.props.visibility?Tool.props.visibility:'visible'}">{Tool.label}</label>
			   {/if}
			   {#if Tool.type == 'button'}
					<input class="wmanag-button" 
						style="visibility:{Tool.props.visibility?Tool.props.visibility:'visible'};font-size:{Tool.props.fsize?Tool.props.fsize:'small'}" 
						type="{Tool.type}" 
						id={Tool.props.id?""+Tool.props.id:null} 
						value="{Tool.props.value}"  
						on:click={Tool.function} 
						disabled={Tool.disabled?Tool.disabled:false}/>
				{/if}
				{#if Tool.type == 'text'}
					<input class="wmanag-text" 
						size="{Tool.props.size?Tool.props.size:20}" 
						style="visibility:{Tool.props.visibility?Tool.props.visibility:'visible'};font-size:{Tool.props.fsize?Tool.props.fsize:'small'};" 
						type="{Tool.type}" 
						id={Tool.props.id?""+Tool.props.id:null} 
						value="{Tool.props.value}"  
						on:change={Tool.function} 
						disabled={Tool.disabled?Tool.disabled:false}/>
				{/if}
				{#if Tool.type == 'password'}
					<input class="wmanag-text" 
						size="{Tool.props.size?Tool.props.size:20}" 
						style="visibility:{Tool.props.visibility?Tool.props.visibility:'visible'};font-size:{Tool.props.fsize?Tool.props.fsize:'small'};" 
						type="{Tool.type}" id={Tool.props.id?""+Tool.props.id:null} 
						value="{Tool.props.value}"  
						on:change={Tool.function} 
						disabled={Tool.disabled?Tool.disabled:false}/>
				{/if}
			    {#if Tool.type == 'image'}
					<input class="wmanag-image" 
						style="visibility:{Tool.props.visibility?Tool.props.visibility:'visible'}" 
						id={Tool.props.id?""+Tool.props.id:null} 
						type="{Tool.type}" 
						src="{Tool.props.src}" 
						height="{mbariconwidth}" 
						on:click={Tool.function} 
						disabled={Tool.disabled?Tool.disabled:false}/>
				{/if}
				{#if Tool.type == 'date'}
					<input class="wmanag-text" 
						size="{Tool.props.size?Tool.props.size:20}" 
						style="visibility:{Tool.props.visibility?Tool.props.visibility:'visible'};font-size:{Tool.props.fsize?Tool.props.fsize:'small'};" 
						type="{Tool.type}" 
						id={Tool.props.id?""+Tool.props.id:null} 
						value="{Tool.props.value}"  
						on:change={Tool.function} 
						disabled={Tool.disabled?Tool.disabled:false}
						min={Tool.min?Tool.min:null}
						max={Tool.max?Tool.max:null}/>
				{/if}
				{#if Tool.type == 'select'}
					<select class="wmanag-select" style="visibility:{Tool.props.visibility?Tool.props.visibility:'visible'}" id={Tool.props.id?""+Tool.props.id:null} on:change={Tool.function} disabled={Tool.disabled?Tool.disabled:false}>
						<option value="" style="color:#afafaf"></option>
						{#each Tool.props.options as Opt}
							<option value={Opt.value} selected={Opt.selected?Opt.selected:false}>{Opt.label}</option>
						{/each}
					</select>
			
				{/if}
			{/each}
			{/key}
		</div>
		{/if}
		<div class="window-menu-body" style="overflow-x: hidden ; overflow-y: {scrollable?'auto':'hidden'} ">
			{#if $$slots.bodycontent}
				<slot name="bodycontent" data={data} options={dragE}></slot>
			{/if}
			<div class="window-menu-footer">
				<slot name="footercontent"></slot>
			</div>
		</div>
	</header>
</div>

<style>
	.window-menu{
		/*display:var(--visibility);*/
		/*align-items: left;*/
		visibility: var(--visibility);
		position: absolute;
		top: var(--top);
		left: var(--left);
		width:var(--width);
		height:var(--height);
		overflow-y: auto;
		border-radius: 6px;
		overflow: hidden;
		box-shadow: var(--box-shadow);
		border: solid 1px;
		z-index: var(--z-index);
		justify-content: space-between;
		align-items: left;
		background-color: var(--background-color, rgba(255, 0, 0, 0));
		border-color: var(--border-color,rgba(255, 0, 0, 0));
		font-family:Verdana, Geneva, Tahoma, sans-serif;
		font-size: small;
		resize: var(--resize);
		/*transition: height 0.5s linear;*/
	}

	.window-menu-header{
		display:flex;
		justify-content: space-between;
		margin-top: 2px;
		margin-bottom: 2px;
		margin-left: 2px;
		background-color: var(--background-color);
		cursor:grab;
		width: max(max-content,400px);
		height: var(--headerheight);
	}

	.window-menu-header input[type="button"]:disabled{
		opacity: 0.2;
		cursor: not-allowed;
	}

	.context-menu-toolbar{
		display:flex;
		justify-content: left;
		margin-top: 2px;
		margin-bottom: 2px;
		margin-left: 4px;
		cursor:default;
	}

	.window-menu-toolbar input,label{
		margin-top: 2px;
		/*margin-bottom: 2px;*/
		margin-left: 3px;
	}

	.window-menu-toolbar .wmanag-button{
		cursor: pointer;
		font-size: 15px;
	}
	.window-menu-toolbar .wmanag-button:disabled{
		opacity: 0.4;
		cursor:not-allowed;
	}
	.window-menu-toolbar label{
		font-weight: bold;
		color: #898989;
	}

	.window-menu-toolbar .wmanag-select{
		z-index: 10;
		-webkit-border-radius: 20px;
		-moz-border-radius: 20px;
		 border-radius: 20px;
		 border: 1px solid #2d9fd9;
		 background-color: #ffffff;
		 color: #222222;
		 padding-left: 10px;
		 cursor: pointer;
	}

	.window-menu-toolbar .wmanag-text{
		 z-index: 10;
		-webkit-border-radius: 20px;
		-moz-border-radius: 20px;
		 border-radius: 20px;
		 border: 1px solid #2d9fd9;
		 background-color: #ffffff;
		 color: #222222;
		 padding-left: 10px;
		 cursor: pointer;
	}

	

	.window-menu-toolbar input[type="image"]{
		vertical-align:middle ;
	}

	.context-menu-body{
		display:block;
		justify-content: left;
		overflow-y: auto;
		overflow-x:hidden;
		width: 100%;
		/*height:fit-content;*/
	}
	.list-item{
		width:300px;
		margin: 10px 3px 10px 3px;
	}
	.window-menu-footer{
		display:flex;
		justify-content: left;
		margin-top: 2px;
		margin-bottom: 2px;
		margin-left: 2px;
	}

	.input-footer{
		-webkit-border-radius: 20px;
		-moz-border-radius: 20px;
		 border-radius: 20px;
		 border: 1px solid #2d9fd9;
		 background-color: #777777;
		 color: #FFFFFF;
		 padding-left: 10px;
	}
	.db-button{
		color: #f00;
	}
	.wmanag-image:disabled{
		opacity: 0.4;
		cursor: not-allowed;
	}
	
	
</style>
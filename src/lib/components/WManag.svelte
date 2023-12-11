<script lang="ts">

import { onMount} from "svelte";
import {dragElement} from './CompUtils.js'

const onClick = (ev:any)=>{
	console.log("ONCLICK")
}
export let id = 'defaultWManager'
export let title = 'WINDOW TITLE'
export let disableClose = false
export let disableMinimize = false
export let draggable = true
export let top = "10px"
export let left = "10px"
export let zindex = 3
export let headercolor = "#e9e9e9"
export let bodycolor = "#ffffff"
export let data:any = []
export let dragE:any = {}
export let width = "max-content"
export let height = "max-content"
export let visibility = "visible"

export let toolbar:any = [
	{type:'button',props:{value:'+'},function:onClick,label:''},
	{type:'button',props:{value:'-'},function:onClick,label:''},
]



let winHeight = ''

onMount(async () => { 
	const dragable = document.getElementById(id);
	if(draggable){
		const dragelement = document.getElementById(id+"dragelement");
		const dragzone = document.getElementById(id+"dragzone");
		dragElement(dragable, dragzone)
		dragE = id+"dragelement"
	}
 })

const closeMenu = (ev:any)=>{
	visibility = "hidden";
}


const minimize = (event:any)=>{
	let win = document.getElementById(id);
	winHeight = win.style.height
	if(winHeight == '')
      winHeight ="20px"
	else
	  winHeight = ""

	win.style.height = winHeight;
}

</script>

<div class="window-menu" id="{id}" style="--visibility:{visibility};--height:{height};--width:{width};--z-index:{zindex};--top:{top};--left:{left};--background-color:{bodycolor}">
	<header id="{id+'dragelement'}">
    <div class="window-menu-header" id="{id+'dragzone'}" style="background-color: {headercolor};">
		<span>{title}</span>
		<div>
			<input class="wmanag-button" type="button" disabled={disableMinimize} value="-" on:click={minimize} />
			<input class="wmanag-button" type="button" disabled={disableClose} value="X" on:click={closeMenu} />
		</div>
	</div>
	 <div class="window-menu-toolbar">
		{#each toolbar as Tool}
		   {#if Tool.label}
				<label id={Tool.props.id?"label-"+Tool.props.id:null} style="visibility:{Tool.props.visibility?Tool.props.visibility:'visible'}">{Tool.label}</label>
		   {/if}
		   {#if Tool.type == 'button'}
				<input class="wmanag-button" style="visibility:{Tool.props.visibility?Tool.props.visibility:'visible'};font-size:{Tool.props.fsize?Tool.props.fsize:'small'}" type="{Tool.type}" id={Tool.props.id?""+Tool.props.id:null} value="{Tool.props.value}"  on:click={Tool.function} disabled={Tool.disabled?Tool.disabled:false}/>
			{/if}
			{#if Tool.type == 'text'}
				<input class="wmanag-text" size="{Tool.props.size?Tool.props.size:20}" style="visibility:{Tool.props.visibility?Tool.props.visibility:'visible'};font-size:{Tool.props.fsize?Tool.props.fsize:'small'};" type="{Tool.type}" id={Tool.props.id?""+Tool.props.id:null} value="{Tool.props.value}"  on:change={Tool.function} disabled={Tool.disabled?Tool.disabled:false}/>
			{/if}
			{#if Tool.type == 'password'}
				<input class="wmanag-text" size="{Tool.props.size?Tool.props.size:20}" style="visibility:{Tool.props.visibility?Tool.props.visibility:'visible'};font-size:{Tool.props.fsize?Tool.props.fsize:'small'};" type="{Tool.type}" id={Tool.props.id?""+Tool.props.id:null} value="{Tool.props.value}"  on:change={Tool.function} disabled={Tool.disabled?Tool.disabled:false}/>
			{/if}
		   {#if Tool.type == 'image'}
				<input class="wmanag-image" style="visibility:{Tool.props.visibility?Tool.props.visibility:'visible'}" id={Tool.props.id?""+Tool.props.id:null} type="{Tool.type}" src="{Tool.props.src}" height="25" on:click={Tool.function} disabled={Tool.disabled?Tool.disabled:false}/>
			{/if}
			{#if Tool.type == 'select'}
				<select class="wmanag-select" style="visibility:{Tool.props.visibility?Tool.props.visibility:'visible'}" id={Tool.props.id?""+Tool.props.id:null} on:change={Tool.function} disabled={Tool.disabled?Tool.disabled:false}>
					<option value="" style="color:#afafaf"></option>
					{#each Tool.props.options as Opt}
						<option value={Opt.value}>{Opt.label}</option>
					{/each}
				</select>
			
			{/if}
		{/each}
	</div>
	<div class="window-menu-body">
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
		display:var(--visibility);
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
		box-shadow: var(--minimap-shadow, var(--default-minimap-shadow));
		border: solid 1px;
		z-index: var(--z-index);
		justify-content: space-between;
		align-items: left;
		background-color: var(--background-color);
		border-color: var(
			--prop-minimap-border-color,
			var(--minimap-border, var(--default-minimap-border))
		);
		font-family:Verdana, Geneva, Tahoma, sans-serif;
		font-size: small;
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
	}

	.window-menu-header input[type="button"]:disabled{
		opacity: 0.4;
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
		margin-bottom: 2px;
		margin-left: 2px;
	}

	.window-menu-toolbar .wmanag-button{
		cursor: pointer;
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
		height:fit-content;
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
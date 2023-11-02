<script lang="ts">
// https://blog.logrocket.com/min-max-clamp-css-functions/

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
export let top = "20px"
export let left = "20px"
export let zindex = 3
export let headercolor = "#e9e9e9"
export let bodycolor = "#ffffff"

export let toolbar = [
	{type:'button',value:'+',function:onClick,label:''},
	{type:'button',value:'-',function:onClick,label:''},
]



let winHeight = ''

onMount(async () => { 
	const dragable = document.getElementById(id);
	if(draggable){
		const dragzone = document.getElementById(id+"dragzone");
		dragElement(dragable, dragzone);
	}
	

 })



const closeMenu = (ev:any)=>{
	let win = document.getElementById(id);
	 win.style.visibility = "hidden";
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

<div class="window-menu" id="{id}" style="--z-index:{zindex};--top:{top};--left:{left};--background-color:{bodycolor}">
	<header id="{id+'dragzone'}">
    <div class="window-menu-header" style="background-color: {headercolor};">
		<span>{title}</span>
		<div>
			<input type="button" disabled={disableMinimize} value="-" on:click={minimize} />
			<input type="button" disabled={disableClose} value="X" on:click={closeMenu} />
		</div>
	</div>
	 <div class="window-menu-toolbar">
		{#each toolbar as Tool}
		   {#if Tool.label}
				<label>{Tool.label}</label>
		   {/if}
		   <input type="{Tool.type}" value="{Tool.value}" on:click={Tool.function} />
		{/each}
	</div>
	<div class="window-menu-body">
		<slot name="bodycontent"></slot>
		<div class="window-menu-footer">
			<slot name="footercontent"></slot>
		</div>
	</div>
	</header>
</div>

<style>
	.window-menu{
		display:block;
		/*align-items: left;*/
		visibility: visible;
		position: absolute;
		top: var(--top);
		left: var(--left);
		width:max-content;
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

	.window-menu-header input {
		cursor: pointer;
	}
	.context-menu-toolbar{
		display:flex;
		justify-content: left;
		margin-top: 2px;
		margin-bottom: 2px;
		margin-left: 2px;
	}

	.window-menu-toolbar input{
		cursor: pointer;
		margin-top: 2px;
		margin-bottom: 2px;
		margin-left: 2px;
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
	
</style>
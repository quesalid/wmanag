<script lang="ts">

import { onMount} from "svelte";
import {dragElement,
		getDefaultProperties} from './GraphUtils'

export let id = 'defaultContextMenu'
export let add = (ev:any|undefined)=>console.log("ADD NODE")
export let modify = (ev:any|undefined)=>console.log("MODIFY NODE")
export let exp = (ev:any|undefined)=>console.log("EXPORT GRAPH")
export let imp = (ev:any|undefined)=>console.log("INPORT GRAPH")
export let load = (ev:any|undefined)=>console.log("LOAD GRAPH")
export let save = (ev:any|undefined)=>console.log("SAVE GRAPH")
export let del = (ev:any|undefined)=>console.log("DELETE GRAPH")
export let clear = (ev:any|undefined)=>console.log("CLEAR GRAPH")

export let propArrayVal: any ={}
export let title = 'GRAPH MENU'
export let zoom:any 
export let x = 1
export let y = 1


const formattedZoom = (zoom:any)=>{return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(zoom)}
const getX = ()=>{return x}
const getY = ()=>{return y}

let contextHeight = ''

export let typeOptions = [
	{value:"DEFAULT",options:{level:'level0'}},
	{value:"COMPANY",options:{level:'level1'}},
	{value:"PLANT",options:{level:'level2'}},
	{value:"DEPARTMENT",options:{level:'level3'}},
	{value:"LINE",options:{level:'level4'}},
	{value:"MACHINE",options:{level:'level5'}},
	{value:"CONTROLLER",options:{level:'level6'}},
	{value:"SUBGRAPH",options:{level:'level0'}},
]

export let options = {}

onMount(async () => {  
    const dragable = document.getElementById(id);
    const dragzone = document.getElementById(id+"dragzoneContext");
	dragElement(dragable, dragzone);
 })



const closeMenu = (ev:any)=>{
	let contextMenu = document.getElementById(id);
	if(contextMenu)
	 contextMenu.style.visibility = "hidden";
}

const changeVal = (ev:any)=>{
	    console.log("CHANGE VAL",ev.target.id)
		if(ev.target.type == 'number')
			propArrayVal[ev.target.id]= Number(ev.target.value)
		else
			propArrayVal[ev.target.id] = ev.target.value
		// PUSH AUTOMATIC NODE LEVEL AND NODETYPE  IF graphtype is ISA
		//if(propArrayVal.graphtype == 'ISA'){
			switch(ev.target.id ){
				case 'nodetype':
					let level:any = typeOptions.find((item:any)=>item.value == ev.target.value)
					const dt = {type:'text', key:'level', value:level.options.level}
					const dt1 = {type:'text', key:'nodetype', value:ev.target.value}
					const index = propArrayVal['data'].findIndex((item:any)=>item.key == 'level')
					const index1 = propArrayVal['data'].findIndex((item:any)=>item.key == 'nodetype')
					if(index > -1)
						propArrayVal['data'][index] = dt
					else
						propArrayVal['data'].push(dt)
					if(index1 > -1)
						propArrayVal['data'][index1] = dt1
					else
						propArrayVal['data'].push(dt1)
					if(level && level.options)
						propArrayVal['image'] = level.options.image?level.options.image:''
					if(level.options)
						propArrayVal['bgColor'] = level.options.color?level.options.color:''

					propArrayVal = propArrayVal;
					console.log("CONTEXT MENU PROPARRAYVAL",level)
					break
				case 'input':
					const dt2 =  {type:'text', key:'name', value:ev.target.value}
					const index2 = propArrayVal['data'].findIndex((item:any)=>item.key == 'name')
					if(index2 > -1)
						propArrayVal['data'][index2] = dt2
					else
						propArrayVal['data'].push(dt2)
					break
				default:
					break
			}
			propArrayVal = propArrayVal
		//}
}

const clearLoc = (event:any)=>{
	// RESET PROPERTY ARRAY VAL
	propArrayVal = getDefaultProperties(typeOptions, options)
	clear(event)
}

const minimize = (event:any)=>{
	let contextMenu = document.getElementById(id);
	if(contextMenu){
		contextHeight = contextMenu.style.height
		if(contextHeight == '')
		  contextHeight ="20px"
		else
		  contextHeight = ""

		contextMenu.style.height = contextHeight;
	}
}

</script>

<div class="context-menu" id="{id}">
	<header id="{id+'dragzoneContext'}">
    <div class="context-menu-header">
		<span>{title}</span>
		<div>
			<input type="button" value="-" on:click={minimize} />
			<input type="button" value="X" on:click={closeMenu} />
		</div>
	</div>
	 <div class="context-menu-toolbar">
		<input type="button" value="+" on:click={add} />
		<input type="button" value="M" on:click={modify} />
		<input type="button" value="EXP" on:click={exp} />
		<input type="button" value="IMP" on:click={imp} />
		<input class="db-button" type="button" value="LOAD" on:click={load} />
		<input class="db-button" type="button" value="SAVE" on:click={save} />
		<input class="db-button" type="button" value="DEL" on:click={del} />
		<input type="button" value="CLEAR" on:click={clearLoc} />
	</div>
	<div class="context-menu-body">
		<div class="list-item">
			<label for="bgColor">Background: </label>
			<input id="bgColor" class="colorWheel" value="{propArrayVal.bgColor}" type="color" on:change={changeVal} />
		</div>
		<div class="list-item">
			<label for="inputs">Input: </label>
			<input id="inputs" size="15" class="inputField" value="{propArrayVal.inputs}" type="number" min="0" on:change={changeVal} />
		</div>
		<div class="list-item">
			<label for="outputs">Output: </label>
			<input id="outputs" size="15" class="inputField" value="{propArrayVal.outputs}" type="number" min="0" on:change={changeVal} />
		</div>
		<div class="list-item">
			<label for="label">Label: </label>
			<input id="label" size="15" class="inputField" value="{propArrayVal.label}" type="text" min="0" on:change={changeVal} />
		</div>
		<div class="list-item">
			<label for="nodetype">TYPE: </label>
			<select name="nodetype" id="nodetype" value={propArrayVal.nodetype} on:change={changeVal}>
			{#each typeOptions as Option,index}
				{#if index == 0}
					<option value={Option.value} selected>{Option.value}</option>
				{:else}
					<option value={Option.value}>{Option.value}</option>
				{/if}
			{/each}
		</div>
		<div class="list-item" style="display:flex;">
			   <label for="nodeimage">IMAGE: </label>
			   <img  style="border:solid 1px;width:20px;height:20px" src="{propArrayVal.image}" alt='NO'/>
			
	    </div>
		<div class="context-menu-footer">
			<input id="label" size="8" class="input-footer" value="zoom:{formattedZoom(zoom)}" type="text" min="0" />
			<input id="label" size="5" class="input-footer" value="x:{x}" type="text" min="0" />
			<input id="label" size="5" class="input-footer" value="y:{y}" type="text" min="0" />
		</div>
	</div>
	</header>
</div>

<style>
	.context-menu{
		display:block;
		align-items: left;
		visibility: hidden;
		position: absolute;
		top: 20px;
		left: 20px;
		width:max-content;
		overflow-y: auto;
		border-radius: 6px;
		overflow: hidden;
		box-shadow: var(--minimap-shadow, var(--default-minimap-shadow));
		border: solid 1px;
		z-index: 3;
		justify-content: space-between;
		align-items: left;
		background-color: var(
			--prop-minimap-background-color,
			var(
				--minimap-background-color,
				var(--background-color, var(--default-minimap-background-color))
			)
		);
		border-color: var(
			--prop-minimap-border-color,
			var(--minimap-border, var(--default-minimap-border))
		);
		font-family:Verdana, Geneva, Tahoma, sans-serif;
		font-size: small;
	}

	.context-menu-header{
		display:flex;
		justify-content: space-between;
		margin-top: 2px;
		margin-bottom: 2px;
		margin-left: 2px;
		background-color: #e9e9e9;
		cursor:grab;
	}

	.context-menu-header input[type="button"] {
		cursor: pointer;
	}

	.context-menu-header input[type="button"]:hover{
		background-color: #b9b9b9;
	}
	.context-menu-toolbar{
		display:flex;
		justify-content: left;
		margin-top: 2px;
		margin-bottom: 2px;
		margin-left: 2px;
	}

	.context-menu-toolbar input[type="button"]{
		cursor: pointer;
		margin-top: 2px;
		margin-bottom: 2px;
		margin-left: 2px;
		background-color: #e9e9e9;
		border: 1px solid;
	}

	.context-menu-toolbar input[type="button"]:hover{
		background-color: #b9b9b9;
	}

	.context-menu-body{
		display:block;
		justify-content: left;
		overflow-y: auto;
		overflow-x:hidden;
		height: 200px;
		width: 100%;
	}
	.list-item{
		width:300px;
		margin: 10px 3px 10px 3px;
	}
	.context-menu-footer{
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
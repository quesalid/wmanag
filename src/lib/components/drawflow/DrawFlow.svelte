﻿<script lang='ts'>
import { onMount, onDestroy } from 'svelte';
import DrawFlow from './drawflow.js'
import DFEDITOR from './grapheditor.js'
import NODETYPES from './nodetypes.js'
import PanelBody from './panels/PanelBody.svelte'
import PanelMessage from './panels/PanelMessage.svelte'

export const drop = (ev:any) =>{}
export const allowDrop = (ev:any) =>{}
export let dataToImport = {"drawflow":{"Home":{"data":{}}}}
export let editor:any
export let top = '100px'


let editPanel = 'drawflow-edit-panel'
let drawFlow = 'drawflow'
let drawflowShowEventListener:any
let drawflowHideEventListener:any
let nodeid = ''
let node:any
let nodes:any = {}

onMount(async () => {
	var id = document.getElementById("drawflow");
	editor = new DrawFlow(id);
	editor.useuuid = true;
	editor.editpanel = editPanel
	editor.start();
	editor.import(dataToImport);
	// ADD EVENT LISTENER TO EDIT PANEL
	const df:any = document.querySelector('#'+editPanel)
	if(df){
		df.removeEventListener('showeditpanel',drawflowShowEventListener)
		drawflowShowEventListener = df.addEventListener('showeditpanel',(ev:any) =>{
			nodeid = ev.detail.node.id.replace('node-','')
			node = editor.drawflow.drawflow.Home.data[nodeid]
			nodes = editor.drawflow.drawflow.Home.data
			df.style.display='block'
		})
		df.removeEventListener('hideeditpanel',drawflowHideEventListener)
		drawflowHideEventListener = df.addEventListener('hideeditpanel',(ev:any) =>{
			nodeid = ev.detail.node.id.replace('node-','')
			node = editor.drawflow.drawflow.Home.data[nodeid]
			nodes = editor.drawflow.drawflow.Home.data
			df.style.display='none'
		})
	}
	editor.on("connectionCreated", (ev:any) => {
		// find output node
		const output = editor.drawflow.drawflow.Home.data[ev.output_id]
		console.log("EDITOR Connection created --> output", ev.output_class,output)
		const connection = output.outputs[ev.output_class].connections.find((item:any)=> item.node == ev.input_id)
		console.log("EDITOR Connection created --> connection",connection)
		connection.message = {id:output.data.name.value,value:'defaultmsg'}
	})
	editor.on("nodeCreated", (ev:any) => {
		const func = NODETYPES.getCallback(editor.drawflow.drawflow.Home.data[ev].class)
		editor.drawflow.drawflow.Home.data[ev].data.callback = {value:func,type:'objfunction'}
		console.log("EDITOR Node created", ev,func)
	})
	editor.on("nodeRemoved", (ev:any) => {
		console.log("EDITOR Node removed", ev,editor.drawflow.drawflow.Home)
	})
	editor.on("connectionRemoved", (ev:any) => {
		console.log("EDITOR Connection removed", ev,editor.drawflow.drawflow.Home)
	})
})

const panelEditSave = (ev:any)=>{
	const ep:any = document.querySelector('#'+editPanel)
	if(ep){
		ep.style.display='none'
	}
}

const panelEditExit = (ev:any)=>{
	const ep:any = document.querySelector('#'+editPanel)
	if(ep){
		ep.style.display='none'
	}
}

</script>
    <!-- DRAWFLOW EDITOR CANVAS-->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class= "parent-drawflow" 
		id="{drawFlow}" 
		on:drop={(ev)=>{DFEDITOR.drop(ev,editor)}} 
		on:dragover={(ev)=>{DFEDITOR.allowDrop(ev)}}>
	</div>
	<!-- PANEL EDITOR -->
	<div class="drawflow-edit-panel-class" style="--top:{top}" id="{editPanel}">
		<div class="drawflow-edit-panel-header">
			<span>Editor Panel</span>
			<div>
				<input type='button' value=&#x1f5ac; on:click={panelEditSave}/>
				<input type='button' value=&#x1f5d9; on:click={panelEditExit}/>
			</div>
		</div>
		<div class="drawflow-edit-panel-body">
			<PanelBody bind:node={node} />
		</div>
		<div class="drawflow-edit-panel-message">
			<PanelMessage bind:node={node} bind:nodes={nodes} />
		</div>
	</div>
<style>

.parent-drawflow {
  --parent-drawflow-heigth: 600px;
  display: flex;
  overflow: hidden;
  touch-action: none;
  outline:none;
  width:100%;
  height:var(--parent-drawflow-heigth);
   top: 40px;
}

:global(.drawflow-edit-panel-class) {
	display: none;
	position:absolute;
	top:calc(2px + var(--top));
	right: 3px;
	width: 350px;
	/*height:200px;*/
	border: 1px solid black;
	border-radius: 3px;
}
:global(.drawflow-edit-panel-header) {
	--background-edut-panel-header: #e9e9e9;
	display:flex;
	justify-content:space-between ;
	margin-left: auto ;
	min-height: 30px;
	background-color: var(--background-edut-panel-header);
	font-weight: 600 ;
	padding: 3px;
	border-bottom: 1px solid;
}
:global(.drawflow-edit-panel-header input[type='button']) {
	cursor:pointer;
	border: 1px solid;
	padding: 2px;
}

:global(.drawflow-edit-panel-body) {
	display:flexbox;
	padding: 5px;
}

:global(.drawflow-edit-panel-message) {
	--background-edut-panel-header: #e9e9e9;
	background-color: var(--background-edut-panel-header);
}

:global(.drawflow) {
  width: 100%;
  height: 100%;
  position: relative;
  user-select: none;
  perspective: 0;
}

:global(.drawflow .parent-node) {
  position: relative;

}

:global(.drawflow .drawflow-node) {
  --drawflow-node-width:fit-content;
  --drawflow-node-border-color:#666666;
  --drawflow-node-color:#333333;
  display: flex;
  align-items: center;
  position: absolute;
  background: var(--background-color);
  width: var(--drawflow-node-width);
  min-width: 30px;
  min-height: fit-content;
  border-radius:4px;
  border: 2px solid var(--drawflow-node-border-color);
  color: var(--drawflow-node-color);
  z-index: 2;
}


:global(.drawflow .drawflow-node.selected) {
  --drawflow-node-border-selected-color:#4ea9ff;
  background: white;
  border: 2px solid var( --drawflow-node-border-selected-color);
}

:global(.drawflow .drawflow-node:hover) {
  cursor: move;
}

:global(.drawflow .drawflow-node .inputs, .drawflow .drawflow-node .outputs) {
  width: 0px;
}

:global(.drawflow .drawflow-node .drawflow_content_node) {
  width: fit-content;
  display: block;
}

:global(.drawflow .drawflow-node .input, .drawflow .drawflow-node .output) {

  position: relative;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  border: 2px solid black;
  cursor: crosshair;
  z-index: 1;
  margin-bottom: 5px;
}

:global(.drawflow .drawflow-node .input) {
  left: -27px;
  top: 2px;
  background: yellow;
}
:global(.drawflow .drawflow-node .output) {
  right: -3px;
  top: 2px;
}

:global(.drawflow-node .title-box) {
  /*height: 50px;
  line-height: 50px;*/
  --background-box-title: #e9e9e9;
  background: var(--background-box-title);
  border-bottom: 1px solid black;
  border-radius: 4px 4px 0px 0px;
  padding-left: 10px;
  font-weight:600 ;
  padding: 3px;
  min-width: 60px;
}
:global(.drawflow-node .box) {
	padding: 12px;
}

/* CONTENT STYLES*/
:global(.drawflow-node .box button) {
	--background-box-button: #e9e9e9;
	background-color: var(--background-box-button);
	border: 1px solid;
	border-radius: 3px;
}
:global(.drawflow-node .box a) {
	--color-box-anchor: #0000e9;
	color:var(--color-box-anchor);
	font-style:italic ;
}
:global(.drawflow-node .box .svg-box-stroke) {
	position: absolute;
	stroke: teal;
	fill:none;
	width: 18px;
	height: 18px;
	top:18px;
	left: 9px;
	padding-bottom: 2px;
}

:global(.drawflow-node .box .svg-box-fill) {
	position: absolute;
	stroke: none;
	fill:teal;
	width: 18px;
	height: 18px;
	top:18px;
	left: 9px;
	padding-bottom: 2px;
}

:global(.drawflow-node .box .svg-box-fill-stroke) {
	position: absolute;
	stroke: none;
	fill:teal;
	stroke:teal;
	width: 18px;
	height: 18px;
	top:18px;
	left: 9px;
	padding-bottom: 2px;
}

/* END CONTENT STYLES*/
:global(.drawflow-node input, .drawflow-node select, .drawflow-node textarea) {
  border-radius: 4px;
  border: 1px solid var(--border-color);
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  width: inherit;
  color: #555555;
}

:global(.drawflow svg) {
  z-index: 0;
  position: absolute;
  overflow: visible !important;
}
:global(.drawflow .connection) {
  position: absolute;
  pointer-events: none;
  aspect-ratio: 1 / 1;
}
:global(.drawflow .connection .main-path) {
  --connection-color:#4ea9ff;
  fill: none;
  stroke-width: 3px;
  stroke: var(--connection-color);
  pointer-events: all;
}


:global(.drawflow .connection .main-path:hover) {
  --connection-hover-color:#1266ab;
  stroke: var( --connection-hover-color);
  cursor: pointer;
}

:global(.drawflow .connection .main-path.selected) {
  stroke: #43b993;
}

:global(.drawflow .connection .point) {
  cursor: move;
  stroke: black;
  stroke-width: 2;
  fill: white;
  pointer-events: all;
}

:global(.drawflow .connection .point.selected, .drawflow .connection .point:hover) {
  fill: #1266ab;
}

:global(.drawflow .main-path) {
  fill: none;
  stroke-width: 5px;
  stroke: steelblue;
}

:global(.drawflow-delete) {
  --drawflow-node-menu-bcolor:white;
  --drawflow-node-menu-color:#666666;
  position: absolute;
  display: block;
  width: 30px;
  height: 30px;
  background: var(--drawflow-node-menu-bcolor);
  color: var(--drawflow-node-menu-color);
  z-index: 4;
  border: 1px solid var(--drawflow-node-menu-color);
  line-height: 30px;
  font-weight: bold;
  text-align: center;
  border-radius: 50%;
  font-family: monospace;
  cursor: pointer;
}

:global(.drawflow-edit) {
  --drawflow-node-menu-bcolor:white;
  --drawflow-node-menu-color:#666666;
  position: absolute;
  display: block;
  width: 30px;
  height: 30px;
  background: var(--drawflow-node-menu-bcolor);
  color: var(--drawflow-node-menu-color);
  z-index: 4;
  border: 1px solid var(--drawflow-node-menu-color);
  line-height: 30px;
  font-weight: bold;
  text-align: center;
  border-radius: 50%;
  font-family: monospace;
  cursor: pointer;
}
:global(.drawflow > .drawflow-delete) {
  margin-left: -15px;
  margin-top: 15px;
}

:global(.drawflow > .drawflow-edit) {
  margin-left: -15px;
  margin-top: 15px;
}

:global(.parent-node .drawflow-delete) {
  right: 0px;
  top: 0px;
}

:global(.parent-node .drawflow-edit) {
  right: 30px;
  top: 0px;
}


</style>
<script lang='ts'>
// https://github.com/jerosoler/Drawflow
import { onMount, onDestroy } from 'svelte';
import DrawFlow from './DrawFlow.svelte'
import DrawFlowMenu from './DrawFlowMenu.svelte'
import NODETYPES from './nodetypes.js'
import {module, family,role} from '../../ustore.js'
import EDITORUTILS from './grapheditor.js'
import {fromGraphToFlow,resetGraph} from '../../script/flow/flowmap.js'

const dataToImportClear = {"drawflow":{"Home":{"data":{}}}}
let dataToImport = dataToImportClear
export let editor:any
export let graph:any
let nodetypes:any = []

onMount(async () => {
	switch($module.toUpperCase()){
		case 'DATA':
			if($family == 'PLANT')
				nodetypes = NODETYPES.getAllNodeType('DATA')
			else
				nodetypes = NODETYPES.getAllNodeType('DATAUTLITY')
			break;
		case 'CLONE':
			nodetypes = NODETYPES.getAllNodeType('CLONE')
			break;
	}
})

export let imp = (ev:any) =>{}
export let exp = (ev:any) =>{}


export let save = (ev:any) =>{
	console.log("save")
}
export let load = (ev:any) =>{
	console.log("load")
}
export let clear = (ev:any) =>{
	dataToImport = dataToImportClear
	editor.import(dataToImport)
	console.log("clear")
}
export let top = '2px'

/**
	 * Download data from json file clicking on hidden input
	 * @param e hidden input event
	 */
	const downloadData = async (e:any|undefined)=>{
		let file = e.target.files[0]
		const result = await EDITORUTILS.downloadJSON(file)
		dataToImport = editor.import(JSON.parse(result))
		let expdata = editor.export()
		console.log("DOWLOAD DATA", expdata)
		graph = fromGraphToFlow(expdata)
		console.log("IMPORTED FLOW", graph)
	}

const clickStart = (ev:any)=>{
	console.log("CLICK START",graph)
	if(graph)
		graph.start()
}

const clickStop = (ev:any)=>{
	console.log("CLICK STOP")
	let expdata = editor.export()
	if(expdata){
		console.log("CLICK STOP",expdata)
		resetGraph(expdata,graph,"lightgrey")
	}
}
</script>
	<div class="wrapper" style="--top:{top}">
		 <div class="col">
			 <div>
				 <input type="button" value="import" on:click={imp}/>
				 <input type="button" value="export" on:click={exp}/>
				 {#if $role != 'USER'}
					 <input type="button" value="save" on:click={save}/>
					 <input type="button" value="load" on:click={load}/>
				 {/if}
				 <input type="button" value="clear" on:click={clear}/>
				 <input id="file-data-input"name="file-data-input" type='file' accept=".json" style="visibility:hidden;"  on:change={downloadData}>
			 </div>
			 <DrawFlowMenu {nodetypes} />
			 <div class="player-control" style="visibility:{$module.toUpperCase()=='CLONE'?'visible':'hidden'}">
				 <!-- svelte-ignore a11y-click-events-have-key-events -->
				 <!-- svelte-ignore a11y-no-static-element-interactions -->
				 <svg on:click={clickStart} class="player-button" xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 32 32">
					<path fill="currentColor" d="M11 23a1 1 0 0 1-1-1V10a1 1 0 0 1 1.447-.894l12 6a1 1 0 0 1 0 1.788l-12 6A1.001 1.001 0 0 1 11 23m1-11.382v8.764L20.764 16Z"/><path fill="currentColor" d="M16 4A12 12 0 1 1 4 16A12 12 0 0 1 16 4m0-2a14 14 0 1 0 14 14A14 14 0 0 0 16 2"/>
				</svg>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				 <!-- svelte-ignore a11y-no-static-element-interactions -->
				<svg on:click={clickStop} class="player-button"  xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 32 32">
			<path fill="currentColor" d="M14 10h-2v12h2zm6 0h-2v12h2z"/><path fill="currentColor" d="M16 4A12 12 0 1 1 4 16A12 12 0 0 1 16 4m0-2a14 14 0 1 0 14 14A14 14 0 0 0 16 2"/></svg>
			 </div>
		 </div>
		 <DrawFlow bind:editor={editor} bind:dataToImport={dataToImport} {top}/>
	</div>
<style>
.wrapper {
  width: 100%;
  height: calc(100vh - 67px);
  display: flex;
  margin-top: var(--top);
  padding-top: 2px;
}

.col {
  --drawflow-menu-width:300px;
  overflow-x: hidden;
  width: calc(-10px + var(--drawflow-menu-width));
  height: 100%;
  border-right: 1px solid var(--border-color);
}
.col input[type='button']{
	--drawflow-menu-button-bgcolor:#e9e9e9;
	background-color: var(--drawflow-menu-button-bgcolor);
	border: 1px solid black;
	cursor:pointer;
	padding: 2px;
}
.player-control{
	display:flex;
	padding: 4px;
	border: 1px solid;
	border-radius: 8px;
	background-color: #EEEEEE;
}
.player-button{
	cursor:pointer ;
}
</style>

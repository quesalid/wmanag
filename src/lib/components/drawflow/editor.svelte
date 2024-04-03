<script lang='ts'>
// https://github.com/jerosoler/Drawflow
import { onMount, onDestroy } from 'svelte';
import DrawFlow from './DrawFlow.svelte'
import DrawFlowMenu from './DrawFlowMenu.svelte'
import NODETYPES from './nodetypes.js'
import {module, family} from '../../ustore.js'

const dataToImportClear = {"drawflow":{"Home":{"data":{}}}}
let dataToImport = dataToImportClear
let editor:any
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

export const imp = (ev:any) =>{
	editor.import(dataToImport)
	console.log("import",JSON.stringify(dataToImport))
}
export const exp = (ev:any) =>{
	dataToImport = editor.export()
	console.log("export",JSON.stringify(dataToImport))
}
export const save = (ev:any) =>{
	console.log("save")
}
export const load = (ev:any) =>{
	console.log("load")
}
export const clear = (ev:any) =>{
	dataToImport = dataToImportClear
	editor.import(dataToImport)
	console.log("clear")
}
export let top = '100px'
</script>
	<div class="wrapper" style="--top:{top}">
		 <div class="col">
			 <div>
				 <input type="button" value="import" on:click={imp}/>
				 <input type="button" value="export" on:click={exp}/>
				 <input type="button" value="save" on:click={save}/>
				 <input type="button" value="load" on:click={load}/>
				 <input type="button" value="clear" on:click={clear}/>
			 </div>
			 <DrawFlowMenu {nodetypes} />
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
  overflow: auto;
  width: var(--drawflow-menu-width);
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
</style>
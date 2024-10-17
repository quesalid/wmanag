<script lang="ts">
   // EXTERNAL
   import { navigate } from "svelte-routing";
   import {onMount} from "svelte"
   import { writable } from "svelte/store";
   // INTERNAL
   import Wmanag from '../WManag.svelte'
   import PlaceHolder from '../PlaceHolder.svelte'
   // STORE
   import { mock,module, assistant} from '../../ustore.js'
   // API INTERFACE
   import {query} from '../../script/apiassistant.js'

   const updateToolbar = (toolbar:any) => {
	   const found = toolbar.find((item:any) => item.label == 'Ask')
	   if($assistant && !found)
	   toolbar.push({type:'image',props:{src:'/LLM.png'},function:onClickAskModel,label:"Ask"})
	   if(!$assistant && found)
	   toolbar = toolbar.filter((item:any) => item.label !== 'Ask')
	   return toolbar
	}
   
	// ASSISTANT SUPPORT
	let onClickAskModel = async (ev:any)=>{
		// SEND QUERY TO ASSISTANT
		console.log('ASK MODEL')
		const query1 = {"inputs": "I have an alarm on the panel. What I should do? "}
		const ret = await query(query1)
		console.log('QUERY',ret)
	}
   
	onMount(async () => {
		toolbar = updateToolbar(toolbar)
	});

	export let logoImage = "/ICO_UP2_DATA.png"
	export let  bgcolor = "#ddefde"
	export let barheigth = "60px"
	// WMANAGER VARIABLES
	export let titlepoint = 'COMMUNICATION'
	export let toolbar:any = []
	export let  disableClose = true
	export let  draggable = true
	export let  zindex = 4
	export let height = "max-content"
	export let width = "max-content"
	export let headercolor = bgcolor
	export let top = "10px"
	export let left = "10px"
	export let resize = 'both'
	// TABLE VARIABLES
	/*export let pagesize = true
	export let  pSize = 8
	export let  pointsdata:any
	export let pointdatacolumns:any = []
	// DIALOG VARIABLES
	export let savedialog = PointForm
	export let deletedialog = DeleteForm
	export let chartdialog = Chart
	export let modalIdEdit = "PointInputDiv"
	export let modalIdDel = "DeleteInputDiv"
	export let modalIdChart = "PointChartDiv"
	export let deleteTitle = "Clicking DELETE the point will be cancelled"
	export let edit = async (ev:any)=>{}
	export let del = async (ev:any)=>{}*/
	
	

</script>
 
		<div class="configurator-container" style="--top:{barheigth}">
			<Wmanag id="communicationWManager"  
				title="{titlepoint}" 
				toolbar={toolbar} 
				{disableClose} 
				{draggable} 
				{headercolor} 
				{zindex}
				{width}
				{height}
				{top}
				{left}
				{resize}>
				<PlaceHolder slot="bodycontent"/>
			</Wmanag>
		</div>
		<!-- DIALOGS >
		<div id="save-point-dialog">
			<svelte:component this={savedialog} bind:modalId={modalIdEdit} save={edit} {bgcolor}/>
		</div>
		<div id="delete-point-dialog">
			<svelte:component this={deletedialog} bind:modalId={modalIdDel} del={del} {bgcolor} title={deleteTitle}/>
		</div>
		{#if $module.toUpperCase() == 'DATA' || $module.toUpperCase() == 'CLONE' || $module.toUpperCase() == 'LEARN'}
			<div id="show-chart-dialog">
				<svelte:component this={chartdialog} bind:modalId={modalIdChart}  {bgcolor}/>
			</div>
		{/if}
		<-->

<style>
.configurator-container{
		display:flex;
		position:relative;
		top: var(--top);
	}

</style>
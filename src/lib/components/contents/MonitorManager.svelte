<script lang="ts">
   // EXTERNAL
   import { navigate } from "svelte-routing";
   import {onMount} from "svelte"
   import { writable } from "svelte/store";
   // INTERNAL
   import Wmanag from '../../components/WManag.svelte'
   import {SimpleTable} from '../table'
   import {PointForm,DeleteForm} from '../forms'
   import {ChartPoint} from '../chart'
   
   // STORE
   import { module} from '../../../lib/ustore.js'
   
  
	onMount(async () => {
		
	});

	let defaultWManager= 'defaultMonitorWManager'

	export let  bgcolor = "#ddefde"
	export let managerid = "monitorManagerId"
	// WMANAGER VARIABLES
	export let title = 'POINTS'
	export let toolbarpoint:any = []
	export let  disableClose = true
	export let  draggable = true
	export let  zindex = 4
	export let height = "max-content"
	export let width = "max-content"
	export let headercolor = bgcolor
	export let titlefontsize = "15px"
	export let titlecolor = "#666"
	export let titleweight = "bold"
	export let bodycolor = "#ffffff"
	export let showheader = true
	export let top = "10px"
	export let left = "10px"
	export let resize = 'none'
	export let bordercolor = "#c0c0c0"
	export let boxshadow = "0px 0px 0px 0px #000000"
	export let minimized = 'off'
	// TABLE VARIABLES
	export let pagesize = true
	export let  pSize = 8
	export let  pointsdata:any
	export let pointdatacolumns:any = []
	// DIALOG VARIABLES
	export let savedialog = PointForm
	export let deletedialog = DeleteForm
	export let chartdialog = ChartPoint
	export let modalIdEdit = "PointInputDiv"
	export let modalIdDel = "DeleteInputDiv"
	export let modalIdChart = "PointChartDiv"
	export let deleteTitle = "Clicking DELETE the point will be cancelled"
	export let edit = async (ev:any)=>{}
	export let del = async (ev:any)=>{}
	
	

</script>
 
		<div class="configurator-container" id={managerid}>
			<Wmanag id="{defaultWManager}"  
				title="{title}" 
				toolbar={toolbarpoint} 
				{disableClose} 
				{draggable} 
				headercolor={bgcolor?bgcolor:headercolor}
				{zindex}
				{width}
				{height}
				{top}
				{left}
				{resize}
				{titlefontsize}
				{titlecolor}
				{titleweight}
				{bodycolor}
				{showheader}
				{bordercolor}
				{boxshadow}
				{minimized}>
				<SimpleTable slot="bodycontent" data={pointsdata} bind:datacolumns={pointdatacolumns} {pagesize} {pSize}/>
			</Wmanag>
		</div>
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

<style>

</style>



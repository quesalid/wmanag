<script lang="ts">
   // EXTERNAL
   import {onMount} from "svelte"
   import { writable } from "svelte/store";
   // INTERNAL
   import {ChartPoint} from '../chart'
   import Wmanag from '../../components/WManag.svelte'
   import {SimpleTableNoPage} from '../../components/table'
   import {getAlarmColumns} from '../../script/utils.js'
    import {AlarmActionForm} from '../forms'
   // STORE
   import { mock,module } from '../../ustore.js'
   

	onMount(async () => {
		
	});

	let defaultWManager = 'defaultAlarm'
	  
	export let managerid = "alarmManagerId"
	// WINDOW VARIABLES
	export let width = "750px"
	export let height = "450px"
	export let headercolor = '#fff2e8'
	export let titlefontsize = "15px"
	export let titlecolor = "#666"
	export let titleweight = "bold"
	export let bodycolor = "#ffffff"
	export let disableClose = true
	export let title = "ALARMS"
	export let top = '20%'
	export let left = '20%'
	export let minimized = 'off'
	export let toolbar:any = []
	export let  draggable = true
	export let  zindex = 4
	export let resize = 'none'
	export let bgcolor = '#ddefde'
	export let showheader = true
	export let bordercolor = "#c0c0c0"
	export let boxshadow = "0px 0px 0px 0px #000000"
    // TABLE VARIABLES
	export let  pagesize = true
	export let  pSize = 3
	export let alarmdatacolumns = getAlarmColumns($module.toUpperCase())
	export let alarmsdata:any
	// DIALOG VARIABLES
	export let savedialog = AlarmActionForm
	export let doAction =  (ev:any)=>{}
	export let modalIdEdit = "AlarmActionDiv"
	// CHART VARIABLES
	export let chartdialog = ChartPoint
	export let modalIdChart = "PointChartDiv"
	// Set SimpleTableNoPage height equal to the height of the wmanager minus the height of the window title
	let tableheight = (parseInt(height) - 35) + 'px'


	

</script>
 
        
		<div class="alarm-container" id="{managerid}">
				<Wmanag id="{defaultWManager}"  
				{title}
				toolbar = {toolbar} 
				{disableClose} 
				{draggable} 
				headercolor={bgcolor?bgcolor:headercolor}
				{zindex}
				{top}
				{left}
				{minimized}
				{width}
				{height}
				{resize}
				{titlefontsize}
				{titlecolor}
				{titleweight}
				{bodycolor}
				{showheader}
				{bordercolor}
				{boxshadow}>
					<SimpleTableNoPage slot="bodycontent" bind:data={alarmsdata} datacolumns={alarmdatacolumns} height={tableheight}/>
				</Wmanag>
		</div>
		<div id="save-point-dialog">
			<svelte:component this={savedialog} bind:modalId={modalIdEdit} save={doAction} {bgcolor} />
		</div>
		{#if $module.toUpperCase() == 'DATA' || $module.toUpperCase() == 'CLONE' || $module.toUpperCase() == 'LEARN'}
			<div id="show-chart-dialog">
				<svelte:component this={chartdialog} bind:modalId={modalIdChart}  {bgcolor}/>
			</div>
		{/if}


<style>
.alarm-container{
		display:flex;
		position:relative;
	}

</style>



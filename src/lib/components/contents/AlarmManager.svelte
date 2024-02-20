<script lang="ts">
   // EXTERNAL
   import {onMount} from "svelte"
   import { writable } from "svelte/store";
   // INTERNAL
   import Wmanag from '../../components/WManag.svelte'
   import {SimpleTable} from '../../components/table'
   import {getAlarmColumns} from '../../script/utils.js'
   import {dragElement} from '../../components/CompUtils.js'
   // API INTERFACE
   import {getDataPoints} from '../../script/apidataconfig.js'
   // STORE
   import { mock,module} from '../../ustore.js'
   
  


   let alarmsdata:any = writable([])
	onMount(async () => {
		const filters:any = [{module:$module.toUpperCase(),_type:'eq'},{type:'ALARM',_type:'eq'}]
		const ret = await getDataPoints(filters,$mock)
		$alarmsdata = ret.data
		// ADD EVENT LITSENER FOR AGENT CONFIGURATION
		/*const confMainDiv = document.getElementById("main-configuration-page")
		if(confMainDiv){
			confMainDiv.addEventListener("agentclicked",async (e:any)=>{
				// SET CURRENT DEVICE IN STORE
				deviceuid = e.detail
				$currdevice = deviceuid
				// NAVIGATE TO AGENT PAGE
				console.log("AGENT CLICKED ---> ",deviceuid)
				navigate("/"+$module+"/configure/agent")
				$navigation = getArrayFromPath("/"+$module+"/configure/agent")
			})
		}*/
	});

	

	// WINDOW VARIABLES
	export let width = "600px"
	export let headercolor = '#fff2e8'
	export let disableClose = true
	export let title = "ALARMS"
	export let top = '20%'
	export let left = '20%'
	export let minimized = 'ff'
	export let toolbardevice:any = []
	export let  draggable = true
	export let  zindex = 4
    // TABLE
	export let  pagesize = true
	export let  pSize = 3
	let alarmdatacolumns = getAlarmColumns($module.toUpperCase())

	

</script>
 

		<div class="alarm-container">
			<Wmanag id="containerWManager"  
			{title}
			toolbar={toolbardevice} 
			{disableClose} 
			{draggable} 
			{headercolor} 
			{zindex}
			{top}
			{left}
			{minimized}
			{width}>
				<SimpleTable slot="bodycontent" data={alarmsdata} datacolumns={alarmdatacolumns} {pagesize} {pSize}/>
			</Wmanag>
		</div>


<style>
.alarm-container{
		display:flex;
		position:relative;
	}

</style>



<script lang="ts">
   // EXTERNAL
   import {onMount} from "svelte"
   import { writable } from "svelte/store";
   // INTERNAL
   import Wmanag from '../../components/WManag.svelte'
   import {SimpleTable} from '../../components/table'
   import {getAlarmColumns} from '../../script/utils.js'
   // API INTERFACE
   import {getDataPoints,getControllers,getMachines} from '../../script/apidataconfig.js'
   // STORE
   import { mock,module} from '../../ustore.js'
   
  


   let alarmsdata:any = writable([])
   let machines:any = []
   let controllers:any = []
	onMount(async () => {
		const filters:any = [{module:$module.toUpperCase(),_type:'eq'},{type:'ALARM',_type:'eq'}]
		const ret = await getDataPoints(filters,$mock)
		let ret1 = await getMachines([],$mock)
		machines = ret1.data
		let ret2 = await getControllers([],$mock)
	    controllers = ret2.data
		for(let i=0;i<ret.data.length;i++){
			const index = machines.findIndex((item:any)=>item.uid == ret.data[i].machine)
			const index1 = controllers.findIndex((item:any)=>item.uid == ret.data[i].controller)
			if(index > -1)
				ret.data[i].machineName = machines[index].name
			else
				ret.data[i].machineName = 'NOTFOUND'
			if(index1 > -1)
				ret.data[i].controllerName = controllers[index1].name
			else
				ret.data[i].controllerName = 'NOTFOUND'
		}
		$alarmsdata = ret.data
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



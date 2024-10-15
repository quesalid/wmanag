<script lang="ts">
   // EXTERNAL
   import {onMount} from "svelte"
   import { writable } from "svelte/store";
   // INTERNAL
   import Wmanag from '../../components/WManag.svelte'
   import {SimpleTableNoPage} from '../../components/table'
   import {getAlarmColumns} from '../../script/utils.js'
   // API INTERFACE
   import {getDataPoints,getControllers,getEntityControlled} from '../../script/apidataconfig.js'
   // STORE
   import { mock,module} from '../../ustore.js'
   
  


   let alarmsdata:any = writable([])
   let machines:any = []
   let controllers:any = []
	onMount(async () => {
		const filters:any = [{module:$module.toUpperCase(),_type:'eq'},{type:'ALARM',_type:'eq'},{lastvalue:'ON',_type:'eq'}]
		const pagination:any = {_order:{lasttime:"DESC"},_offset:0,_limit:null}
		// Here we get the data from the API
		const ret = await getDataPoints(filters,$mock,pagination)
		let ret1 = await getEntityControlled([],$mock)
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
		console.log('ALARMS DATA',ret.data)
	});

	

	// WINDOW VARIABLES
	export let width = "750px"
	export let headercolor = '#fff2e8'
	export let disableClose = true
	export let title = "ALARMS"
	export let top = '20%'
	export let left = '20%'
	export let minimized = 'off'
	export let toolbardevice:any = []
	export let  draggable = true
	export let  zindex = 4
    // TABLE
	export let  pagesize = true
	export let  pSize = 3
	let alarmdatacolumns = getAlarmColumns($module.toUpperCase())
	let pagination = false

	

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
			scrollable={false}
				<SimpleTableNoPage slot="bodycontent" data={alarmsdata} datacolumns={alarmdatacolumns} />
			</Wmanag>
		</div>


<style>
.alarm-container{
		display:flex;
		position:relative;
	}

</style>



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
   import {query} from '../../script/apiassistant.js'
   // STORE
   import { mock,module, assistant} from '../../ustore.js'
   
  


   //let alarmsdata:any = writable([])
   let machines:any = []
   let controllers:any = []

   const updateToolbar = (toolbar:any) => {
	   const found = toolbar.find((item:any) => item.label == 'Ask')
	   if($assistant && !found)
	   toolbar.push({type:'image',props:{src:'/LLM.png'},function:onClickAskModel,label:"Ask"})
	   if(!$assistant && found)
	   toolbar = toolbar.filter((item:any) => item.label !== 'Ask')
	   return toolbar
	}

	onMount(async () => {
		/*const filters:any = [{module:$module.toUpperCase(),_type:'eq'},{type:'ALARM',_type:'eq'},{lastvalue:'ON',_type:'eq'}]
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
		console.log('ALARMS DATA',ret.data)*/
		alarmsdata = alarmsdata
		toolbar = updateToolbar(toolbar)
	});

	// ASSISTANT SUPPORT
	let onClickAskModel = async (ev:any)=>{
		// SEND QUERY TO ASSISTANT
		console.log('ASK MODEL')
		const query1 = {"inputs": "I have an alarm on the panel. What I should do? "}
		const ret = await query(query1)
		console.log('QUERY',ret)
	}
	  
	// WINDOW VARIABLES
	export let width = "750px"
	export let height = "450px"
	export let headercolor = '#fff2e8'
	export let disableClose = true
	export let title = "ALARMS"
	export let top = '20%'
	export let left = '20%'
	export let minimized = 'off'
	export let toolbar:any = []
	export let  draggable = true
	export let  zindex = 4
    // TABLE VARIABLES
	export let  pagesize = true
	export let  pSize = 3
	export let alarmdatacolumns = getAlarmColumns($module.toUpperCase())
	export let alarmsdata:any

	

</script>
 
        
		<div class="alarm-container">
				<Wmanag id="containerWManager"  
				{title}
				toolbar = {toolbar} 
				{disableClose} 
				{draggable} 
				{headercolor} 
				{zindex}
				{top}
				{left}
				{minimized}
				{width}>
				{height}
				scrollable={false}
					<SimpleTableNoPage slot="bodycontent" bind:data={alarmsdata} datacolumns={alarmdatacolumns} {height}/>
				</Wmanag>
		</div>


<style>
.alarm-container{
		display:flex;
		position:relative;
	}

</style>



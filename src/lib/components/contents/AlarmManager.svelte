<script lang="ts">
   // EXTERNAL
   import {onMount} from "svelte"
   import { writable } from "svelte/store";
   // INTERNAL
   import Wmanag from '../../components/WManag.svelte'
   import {SimpleTableNoPage} from '../../components/table'
   import {getAlarmColumns} from '../../script/utils.js'
   // STORE
   import { mock,module } from '../../ustore.js'
   

	onMount(async () => {
		
	});
	  
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
    // TABLE VARIABLES
	export let  pagesize = true
	export let  pSize = 3
	export let alarmdatacolumns = getAlarmColumns($module.toUpperCase())
	export let alarmsdata:any

	

</script>
 
        
		<div class="alarm-container">
				<Wmanag id="alarmWManager"  
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
				{bodycolor}>
					<SimpleTableNoPage slot="bodycontent" bind:data={alarmsdata} datacolumns={alarmdatacolumns} {height}/>
				</Wmanag>
		</div>


<style>
.alarm-container{
		display:flex;
		position:relative;
	}

</style>



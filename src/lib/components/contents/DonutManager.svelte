<script lang="ts">
   // EXTERNAL
   import {onMount} from "svelte"
   import { writable } from "svelte/store";
   // INTERNAL
   import WManag from '../../components/WManag.svelte'
   import Donut from "../../components/donut/Donut.svelte"
   import {getAlarmColumns} from '../../script/utils.js'
   
   // API INTERFACE
   import {getDataPoints,getControllers,getMachines} from '../../script/apidataconfig.js'
   // STORE
   import { mock,module} from '../../ustore.js'
   
  


   
	onMount(async () => {
		
	});

	

	// WINDOW VARIABLES
	export let donut:any = {}
	export let bgcolor:any = '#FFFFFF'
	export let  key = 0
	export let top = $module.toUpperCase() == 'DATA'?'380px':'10px'
	export let left = '1%'

</script>
 

		<div class="donut-container">
			<WManag id="donutManager" 
						title="{donut.dbTitle}" 
						disableClose={true}
						draggable={true} 
						headercolor={bgcolor}
						width={donut.donutWidth+' +10'}
						top={top}
						left={left}
						minimized="off"
						resize='both'>
						<div class="flex flex-col min-h-200 min-w-1" slot="bodycontent">
						    {#key key}
								<Donut donut={donut}/>
							{/key}
						</div>
					</WManag>
		</div>


<style>
.donut-container{
		display:flex;
		position:relative;
	}

</style>



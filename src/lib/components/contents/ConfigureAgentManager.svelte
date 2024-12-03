<script lang="ts">
   // EXTERNAL
   import {onMount} from "svelte"
    import { writable } from "svelte/store";
   // INTERNAL
   import WManag from '../../components/WManag.svelte'
   import {SimpleTable} from '../table'
   // API
   import {getDevices,getAgents} from '../../script/apidataconfig.js'
   // STORE
   import { module,mock, currdevice} from '../../ustore.js'
   
   let defaultWManager = 'defaultConfigureAgentManager'

   // TABLE VARIABLES
	export let title = 'DEVICES'
	export let toolbar:any = []
	export let  disableClose = true
	export let draggable = true
	export let zindex = 4
	export let bgcolor = '#ddefde'
    export let headercolor = bgcolor
	export let top = "10px"
	export let left = "10px"
	export let titlecolor = "#666"
	export let titlefontsize = "15px"
	export let titleweight = "bold"
	export let bodycolor = "#ffffff"
	export let width = "max-content"
	export let height = "max-content"
	export let resize = 'none'
	export let minimized = 'off'
	export let scrollable = false
	export let showheader = true
	export let bordercolor = "#c0c0c0"
	export let boxshadow = "0px 0px 0px 0px #000000"
    // TABLE VARIABLES
	export let managerid = 'configureAgentManagerId'
	export let agentsdata:any =writable([])
	export let agentdatacolumns:any = []
	export let pagesize = true
	export let pSize = 8
	
   
	onMount(async () => {
		// D.GET AGENTS FOR DEVICE
		const filters = [{module:$module.toUpperCase(),_type:'eq'},{devuid:$currdevice,_type:'eq'}]
		const ret = await getAgents(filters,$mock)
		$agentsdata = ret.data
		
	});


</script>
 
<div class="configurator-container" id="{managerid}">
    
			<WManag id="{defaultWManager}"  
					title="{title}" 
					toolbar={toolbar} 
					disableClose={disableClose} 
					draggable={draggable} 
					headercolor={headercolor} 
					zindex={zindex}
					top={top}
					left={left}
					width={width}
					height={height}
					showheader={showheader}
					resize={resize}
					minimized={minimized}
					titlecolor={titlecolor}
					titlefontsize={titlefontsize}
					titleweight={titleweight}
					boxshadow={boxshadow}
					bordercolor={bordercolor}
					scrollable={scrollable}
					bodycolor={bodycolor}>
					<div  slot="bodycontent">
						<SimpleTable  data={agentsdata} bind:datacolumns={agentdatacolumns} {pagesize} {pSize}/>
					</div>
			</WManag>
		
		</div>

<style>

</style>
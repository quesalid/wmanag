<script lang="ts">
   // EXTERNAL
   import { navigate } from "svelte-routing";
   import {onMount} from "svelte"
   import { writable } from "svelte/store";
   // INTERNAL
   import Wmanag from '../../components/WManag.svelte'
   import {EChart} from '../chart'
   
   // STORE
   import { module} from '../../../lib/ustore.js'
   
  
	onMount(async () => {
		
	});

	export let logoImage = "/ICO_UP2_DATA.png"
	export let  bgcolor = "#ddefde"
	export let barheigth = "60px"
	export let managerid = "chartManagerId"
	// WMANAGER VARIABLES
	export let titlepoint = 'CHART'
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
	export let bordercolor = bodycolor
	export let boxshadow = "0px 0px 0px 0px #000000"
	export let minimized = 'off'
	// CHART VARIABLES
	

</script>
 
		<div class="configurator-container" style="--top:{barheigth}" id="{managerid}">
			<Wmanag id="containerWManager"  
				title="{titlepoint}" 
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
				{boxshadow}
				{bordercolor}
				{minimized}>
				<div  slot="bodycontent">
					<EChart modalId="EChartDivId" />
				</div>
			</Wmanag>
		</div>

<style>
.configurator-container{
		display:flex;
		position:relative;
		top: var(--top);
	}

</style>



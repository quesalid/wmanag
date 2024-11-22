<script lang="ts">
   // EXTERNAL
   import {onMount} from "svelte"
   // INTERNAL
   import WManag from '../../components/WManag.svelte'
   // STORE
   import { module} from '../../ustore.js'
   
  

   
	onMount(async () => {
		
	});

	let defaultWManager= 'defaultDonutManager'
	
	export let managerid = "donutManagerId"
	// WINDOW VARIABLES
	export let width = "600px"
	export let height = "3800px"
	export let disableClose = false
	export let title = "MAP MANAGER"
	export let top = '20%'
	export let left = '20%'
	export let minimized = 'on'
	export let resize = 'both'
	export let toolbar:any = []
	export let bgcolor = '#ddefde'
	export let headercolor = bgcolor
	export let titlefontsize = "15px"
	export let titlecolor = "#666"
	export let titleweight = "bold"
	export let bodycolor = "#ffffff"
	export let showheader = true
	export let bordercolor = "#c0c0c0"
	export let boxshadow = "0px 0px 0px 0px #000000"

</script>
 

		<div class="donut-container" id="{managerid}">
			<WManag id="{defaultWManager}" 
						title="{title}" 
						disableClose={disableClose} 
						draggable={true} 
						headercolor={bgcolor?bgcolor:headercolor}
						width={width}
						height={height}
						top={top}
						left={left}
						toolbar = {toolbar}
						minimized="{minimized}"
						resize={resize}
						{titlefontsize}
						{titlecolor}
						{titleweight}
						{bodycolor}
						{showheader}
						{bordercolor}
						{boxshadow}>
				<div class="flex flex-col min-h-200 min-w-1" slot="bodycontent">
						    
				</div>
			</WManag>
		</div>


<style>
.donut-container{
		display:flex;
		position:relative;
	}

</style>




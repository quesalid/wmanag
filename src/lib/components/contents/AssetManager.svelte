<script lang="ts">
import {onMount, tick} from 'svelte'
import L from 'leaflet';
// INTERNAL
import WManag from '../WManag.svelte'
import {mock,user} from '../../ustore.js'
import {Section} from '../sections/section'
import AssetComp from '../asset/AssetComp.svelte'

let defaultWManager = 'defaultAssetManager'

// SECTION VARS




// WINDOW EXPORTS
export let width = "600px"
export let height = "3800px"
export let disableClose = true
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
// SECTIONS
export let twindata:any
// ASSET EXPORTS
export let managerid = 'sectionManagerId'
export let d3win = 'map-container'
export let containerClass = 'map-container'


onMount(async () => {
	console.log("ASSET MANAGER MOUNTED",twindata)
})

// force redraw on twindata change
$: {
	if(twindata)
	  twindata = {...twindata}
		
}

</script>

<div class="map-manager" id="{managerid}">
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
		<div  slot="bodycontent">
			<AssetComp d3win={d3win} containerClass={containerClass}  bind:twindata={twindata}/>
	</WManag>
</div>


<style>
</style>
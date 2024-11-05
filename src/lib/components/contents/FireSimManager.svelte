<script lang="ts">
import WManag from '../WManag.svelte'
import {onMount} from 'svelte'
// INTERNAL
import LeafletMap from '../map/leaflet/LeafletMap.svelte'
import {mock,user} from '../../ustore.js'
let defaultWManager = 'defaultFireSimManager'
let group:any = []


const resetFire = () => {
	const mapdiv = document.getElementById(mapid);
	const resetFire = new CustomEvent("resetsimulation", { detail: mapid })
	mapdiv?.dispatchEvent(resetFire)
}


// WINDOW EXPORTS
export let width = "600px"
export let height = "3800px"
export let disableClose = true
export let title = "MAP MANAGER"
export let top = '20%'
export let left = '20%'
export let minimized = 'on'
export let resize = 'both'
export let toolbar:any = [
		{
			type:'button',
			function:resetFire,
			label:'',
			id:'FireSimReset',
			props:{value:"Reset Simulation"},
		},

]
export let bgcolor = '#ddefde'
export let headercolor = bgcolor
export let titlefontsize = "15px"
export let titlecolor = "#666"
export let titleweight = "bold"
export let bodycolor = "#ffffff"
export let showheader = true
export let bordercolor = "#c0c0c0"
export let boxshadow = "0px 0px 0px 0px #000000"
// MAP EXPORTS
export let mapid = 'leafletmap';
export let initlat = 45.0;
export let initlon = 7.0;
export let initzoom = 10;
export let maxzoom = 19;
export let fswidth = '100%';
export let fsheight = '100vh';
export let  cellSize = 0.1; // 100 metri
export let  bbox = [6.5, 45, 7.5, 46]; // Bounding box per l'area simulata
// DATA EXPORTS

export let managerid = 'fireSimManagerId'





onMount(async () => {
	console.log("FIRE SIM MANAGER INIT")
	// send parentloaded custom event to mapid
	const mapdiv = document.getElementById(mapid);
	const parentLoaded = new CustomEvent("parentloaded", { detail: mapid })
	mapdiv?.dispatchEvent(parentLoaded)
})



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
		<div class="flex flex-col min-h-200 min-w-1" slot="bodycontent">
			<LeafletMap 
				mapid={mapid}
				initlat={initlat}
				initlon={initlon}
				initzoom={initzoom}
				maxzoom={maxzoom}
				width={fswidth}
				height={fsheight}
				cellSize={cellSize}
				bbox={bbox}/>
		</div>
	</WManag>
</div>


<style>
</style>
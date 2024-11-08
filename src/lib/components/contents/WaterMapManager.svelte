<script lang="ts">
import {onMount, tick} from 'svelte'
import L from 'leaflet';
// INTERNAL
import WManag from '../WManag.svelte'
import LeafletMap from '../map/leaflet/LeafletMap.svelte'
//import { drawLine} from '../map/leaflet/mapfuncs/geojsonline'
import {Section} from '../sections/section'
import {mock,user} from '../../ustore.js'

let defaultWManager = 'defaultWaterMapManager'

// SIMULATION VARS
// CELL DEFINITION
export let map:any;
let geolinesline:any = [];



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
// MAP EXPORTS
export let initlat = 45.0;
export let initlon = 7.0;
export let initzoom = 10;
export let maxzoom = 19;
export let fswidth = '100%';
export let fsheight = '100vh';
// DATA EXPORTS
export let managerid = 'waterManagerId'
export let sectionCoords:any
export let opt:any = {
	color: '#0000ff',
	weight: 3,
	opacity: 1.0
}



onMount(async () => {
	console.log("WATER MANAGER LOAD",map)
	
	if (map) {
			L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: maxzoom,
			attribution: '&copy; OpenStreetMap contributors'
		}).addTo(map);
		// add event listener maoloaded
		map.whenReady(() => {
			for(let i=0;i<sectionCoords.length;i++) {
				let line = sectionCoords[i];
				let section = new Section(line);
				const drawsection = section.drawSection(map,opt);
			}
		})
	}
})

$:  {
	for(let i=0;i<sectionCoords.length;i++) {
		let line = sectionCoords[i];
		let section = new Section(line);
		const drawsection = section.drawSection(map,opt);
	}
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
		<div class="flex flex-col min-h-200 min-w-1" slot="bodycontent">
			<LeafletMap 
				mapid={managerid}
				width={fswidth}
				height={fsheight}
				bind:map={map}
				initlat={initlat}
				initlon={initlon}
				initzoom={initzoom}/>
		</div>
	</WManag>
</div>


<style>
</style>
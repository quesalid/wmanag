<script lang="ts">
import WManag from '../WManag.svelte'
import {onMount, tick} from 'svelte'
import L from 'leaflet';
// INTERNAL
import LeafletMap from '../map/leaflet/LeafletMap.svelte'
import {createGrid, 
            drawGrid, 
            propagateFire, 
            resetSimulation,
            initSimulation,
            updateGrid} from '../map/leaflet/mapfuncs/firepropagation'
import {mock,user} from '../../ustore.js'
let defaultWManager = 'defaultFireSimManager'
let group:any = []
// SIMULATION VARS
// CELL DEFINITION
 let cells:any = [];
 let windDirection = 45; // Direzione del vento (0 = Nord, 90 = Est, 180 = Sud, 270 = Ovest)
 let windIntensity = 2;  // Intensità del vento (più alto significa maggiore influenza)
 let map:any;


const resetFire = () => {
	resetSimulation(cells);
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
	console.log("FIRE MANAGER LOAD",map)
	initSimulation(bbox, cellSize,windDirection,windIntensity,map,managerid);

	L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: maxzoom,
		attribution: '&copy; OpenStreetMap contributors'
	}).addTo(map);

	cells = createGrid();
	drawGrid(cells);
	const me = document.getElementById(managerid);
    me?.addEventListener('startfire', (e:any) => {
		startFire();
	});
})

const  runSimulation = async () => {
    console.log("RUN SIMULATION")
    while (cells.some((cell:any) => cell.properties.state === 'burning')) {
        propagateFire(cells);
        // Aggiorna i colori sulla mappa
        updateGrid(cells)

        await tick(); // Aspetta il prossimo frame
        await new Promise(resolve => setTimeout(resolve, 500)); // Delay tra i passi
    }
}

const  startFire = () => {
    console.log("START FIRE")
    runSimulation();
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
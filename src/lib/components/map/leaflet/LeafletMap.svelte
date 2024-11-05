<script lang="ts">
    import 'leaflet/dist/leaflet.css';
    import L from 'leaflet';
    import { onMount, tick } from 'svelte';
    import {createGrid, 
            drawGrid, 
            propagateFire, 
            resetSimulation,
            initSimulation,
            updateGrid} from './firepropagation/fireptopagation'

    let map:any;
    // EXPORTS
    export let mapid = 'leafletmap';
    export let initlat = 45.0;
    export let initlon = 7.0;
    export let initzoom = 10;
    export let maxzoom = 19;
    export let width = '100%';
    export let height = '100vh';
    export let windDirection = 45; // Direzione del vento (0 = Nord, 90 = Est, 180 = Sud, 270 = Ovest)
    export let windIntensity = 2;  // Intensità del vento (più alto significa maggiore influenza)
    // CELL DEFINITION
    let cells:any = [];
    export let  cellSize = 0.1; // 100 metri
    export let  bbox = [6.5, 45, 7.5, 46]; // Bounding box per l'area simulata

    //cells = createGrid(bbox, cellSize);

    onMount(() => {
        
        // add custom event listener to start fire
        const mapdiv = document.getElementById(mapid);
        mapdiv?.addEventListener('startfire', (e:any) => {
			startFire();
		});
        // add custom event listener to check if parent is loaded
        mapdiv?.addEventListener('parentloaded', (e:any) => {
            console.log("PARENT LOADED EVENT RECEIVED",e.detail)
            map = L.map(mapid).setView([initlat, initlon], initzoom); // Centro dell'area (es. Italia nord-ovest)

            // initialize simulation
            initSimulation(bbox, cellSize,windDirection,windIntensity,map,mapid);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: maxzoom,
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(map);

            cells = createGrid();
            drawGrid(cells);
        })
        // add custom event listener to reset simulation
        mapdiv?.addEventListener('resetsimulation', (e:any) => {
			resetSimulation(cells);
		});

    });

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
        //const initialCell = cells[Math.floor(Math.random() * cells.length)];
        //initialCell.properties.state = 'burning';
        runSimulation();
    }
</script>


<div>
<div class="leaflet-map-class" style="--width:{width}; --height:{height}" id={mapid}></div>
</div>

<style>
    .leaflet-map-class {
        width: var(--width);
        height: var(--height);
    }
</style>
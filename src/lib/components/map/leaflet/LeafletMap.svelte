<script lang="ts">
    import 'leaflet/dist/leaflet.css';
    import L from 'leaflet';
    import { onMount} from 'svelte';
   
    // EXPORTS
    export let map:any;
    export let mapid:any
    export let width = '100%';
    export let height = '100vh';
    export let initlat = 45.0;
    export let initlon = 7.0;
    export let initzoom = 6;
        

    onMount(() => {
        map = L.map("map-"+mapid).setView([initlat, initlon], initzoom); // Centro dell'area (es. Italia nord-ovest)
        // send maploaded custom event to parent
        const mapdiv = document.getElementById(mapid);
        const mapLoaded = new CustomEvent("maploaded", { detail: mapid })
        mapdiv?.dispatchEvent(mapLoaded)
        console.log("MAP MOUNT:sent maploadevent to ",mapdiv)

    });

    
</script>


<div>
<div class="leaflet-map-class" style="--width:{width}; --height:{height}" id={"map-"+mapid}></div>
</div>

<style>
    .leaflet-map-class {
        width: var(--width);
        height: var(--height);
    }
</style>
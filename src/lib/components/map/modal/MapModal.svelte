<script lang="ts">
  import maplibregl from 'maplibre-gl';
  import { onMount, createEventDispatcher } from 'svelte';
  import 'maplibre-gl/dist/maplibre-gl.css';
  import './modalstyles.css';

  let PUBLIC_MAPTILER_KEY = "WtDpLYuY39XKDh4g0h1z"
  const dispatcher = createEventDispatcher();

  let map:any;
  let mapContainer:any;

  onMount(() => {
    map = new maplibregl.Map({
      container: mapContainer,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${PUBLIC_MAPTILER_KEY}`,
      center: [12.4964, 41.9028], // Roma come punto iniziale
      zoom: 5
    });

    map.on('click', (event:any) => {
      const { lng, lat } = event.lngLat;
      dispatcher('locationSelected', { lat, lng });
    });

    return () => map.remove();
  });

  function closeModalWithNull() {
    dispatcher('locationSelected', { lat: null, lng: null });
    dispatcher('close');
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="modal" on:click={closeModalWithNull}>
  <div class="modal-content" on:click|stopPropagation>
    <span class="close" on:click={closeModalWithNull}>&times;</span>
    <div bind:this={mapContainer} class="map-container"></div>
  </div>
</div>

<style>
  
</style>

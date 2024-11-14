<script lang="ts">
  import maplibregl from 'maplibre-gl';
  import MaplibreGeocoder from '@maplibre/maplibre-gl-geocoder';
  import { onMount, createEventDispatcher } from 'svelte';
  import 'maplibre-gl/dist/maplibre-gl.css';
  import './modalstyles.css';

  export let center:any = [12.4964, 41.9028];

  let PUBLIC_MAPTILER_KEY = "WtDpLYuY39XKDh4g0h1z"
  const dispatcher = createEventDispatcher();

  let map:any;
  let mapContainer:any;

  onMount(() => {
    map = new maplibregl.Map({
      container: mapContainer,
      //style: `https://api.maptiler.com/maps/streets/style.json?key=${PUBLIC_MAPTILER_KEY}`,
      style: {
            'version': 8,
            'name': 'Blank',
            'center': [0, 0],
            'zoom': 0,
            'sources': {
                'raster-tiles': {
                    'type': 'raster',
                    'tiles': ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
                    'tileSize': 256,
                    'minzoom': 0,
                    'maxzoom': 19
                }
            },
            'layers': [
                {
                    'id': 'background',
                    'type': 'background',
                    'paint': {
                        'background-color': '#e0dfdf'
                    }
                },
                {
                    'id': 'simple-tiles',
                    'type': 'raster',
                    'source': 'raster-tiles'
                }
            ],
            'id': 'blank'
        },
        center: center, 
        zoom: 8.99,
        pitch: 20,
        bearing: 0,
        antialias: true
    });

    const geocoderApi:any = {
        forwardGeocode: async (config:any) => {
            const features = [];
            try {
                const request =
            `https://nominatim.openstreetmap.org/search?q=${
                config.query
            }&format=geojson&polygon_geojson=1&addressdetails=1`;
                const response = await fetch(request);
                const geojson = await response.json();
                for (const feature of geojson.features) {
                    const center = [
                        feature.bbox[0] +
                    (feature.bbox[2] - feature.bbox[0]) / 2,
                        feature.bbox[1] +
                    (feature.bbox[3] - feature.bbox[1]) / 2
                    ];
                    const point = {
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: center
                        },
                        place_name: feature.properties.display_name,
                        properties: feature.properties,
                        text: feature.properties.display_name,
                        place_type: ['place'],
                        center
                    };
                    features.push(point);
                }
            } catch (e) {
                console.error(`Failed to forwardGeocode with error: ${e}`);
            }

            return {
                features
            };
        }
    };

    map.addControl(new maplibregl.NavigationControl());
    map.addControl(
        new MaplibreGeocoder(geocoderApi, {
            maplibregl
        })
    );

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
  // fly to center
  $: if(map && center){
      map.flyTo({
	    center: center,
	    essential: true // this animation is considered essential with respect to prefers-reduced-motion
      });
      // add a marker to center
      const el = document.createElement('div');
      el.className = 'marker';
      new maplibregl.Marker(el)
      .setLngLat(center)
      .addTo(map);
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

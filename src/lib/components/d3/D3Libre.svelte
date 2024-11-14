<script lang='ts'>
  import maplibregl from 'maplibre-gl';
  import { onMount, createEventDispatcher } from 'svelte';
  import 'maplibre-gl/dist/maplibre-gl.css';
  
 
 export let section:any
 let mapContainer:any;
 let map:any;
 let PUBLIC_MAPTILER_KEY = "WtDpLYuY39XKDh4g0h1z"

  onMount(async () => {
    console.log("D3 Libre ",section)
	if(!map && section.closestPoint)
		addMap()
  });

  const mapStyleParams = {"method":"terrainRgb", "parameters":{"alpha":1, "bandNumber":1,"offeset":1.0} }
  const mapStyle = {style:JSON.stringify(mapStyleParams)}
  const queryString = new URLSearchParams(mapStyle).toString();

  const addMap = async () => {
	console.log("D3 Libre ",section)
	map = new maplibregl.Map({
					container: 'd3-map-libre',
					zoom: 12,
					center: [section.closestPoint[0], section.closestPoint[1]],
					pitch: 52,
					hash: true,
					style: {
						version: 8,
						sources: {
							osm: {
								type: 'raster',
								tiles: [`https://a.tile.openstreetmap.org/{z}/{x}/{y}.png`],
								tileSize: 256,
								attribution: '&copy; OpenStreetMap Contributors',
								maxzoom: 19
							},
							terrainSource: {
								type: 'raster-dem',
								tiles: [`https://api.ellipsis-drive.com/v3/path/085f5e10-63b6-4e8f-a4c6-dce9689100d3/raster/timestamp/3179fa80-60ad-41c7-ae67-cdd5eeeca693/tile/{z}/{x}/{y}?`+queryString],
								tileSize: 256
							},
						},
						layers: [
							{
								id: 'osm',
								type: 'raster',
								source: 'osm'
							},
						],
						terrain: {
							source: 'terrainSource',
							exaggeration: 1
						}
					},
					maxZoom: 18,
					maxPitch: 85
				});
 
	map.addControl(
	new maplibregl.NavigationControl({
			visualizePitch: true,
			showZoom: true,
			showCompass: true
			})
	);
 
	map.addControl(
		new maplibregl.TerrainControl({
		source: 'terrainSource',
		exaggeration: 1
		})
	);
}

  $: if(section.closestPoint && section){
        console.log("SECTION ----------------------->>>>>>>",section)
        flyTo(section.closestPoint[0], section.closestPoint[1], section.closestPoint[2])
  }

  const flyTo = async (lat:number, lon:number, alt:number) => {
	  if(!map && section.closestPoint)
		addMap()
	map.flyTo({
            center: [
                lat,
                lon
            ],
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });
  }

</script>

<div id="d3-map-libre" class="map-container"></div>
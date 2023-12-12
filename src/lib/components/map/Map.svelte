<script lang="ts">
import { MapLibre,
        NavigationControl,
        GeolocateControl,
        FullscreenControl,
        ScaleControl,
        AttributionControl,
        Control,
        ControlGroup,
        ControlButton,
        Marker,
        Popup} from 'svelte-maplibre';

export let mapClasses = 'relative w-full aspect-[9/16] max-h-[70vh] sm:max-h-full sm:aspect-video';
export let group:any = []
export let zoom = 5;
export let clickedName:any = (g:any)=>{console.log("CLICKED: ",g.name);}


let markerClass = 'border-gray-200 border shadow-2xl focus:outline-2 focus:outline-black w-6 h-6 '+'bg-indigo-400'+' text-white text-[8px] font-bold rounded-full grid place-items-center'


</script>

<MapLibre
  style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
  class={mapClasses}
  center={[-120, 50]}
  zoom={2}
  attributionControl={false}
  let:map
>
  <!-- You can also set the Map's `standardControls` attribute to create these. -->
  <NavigationControl position="top-left" />
  <GeolocateControl position="top-left" fitBoundsOptions={{ maxZoom: 12 }} />
  <FullscreenControl position="top-left" />
  <ScaleControl />
  <AttributionControl
    customAttribution={`A <strong class="text-red-500">custom</strong> attribution`}
  />

  <Control class="flex flex-col gap-y-2">
    <ControlGroup>
        {#each group as g}
			<ControlButton class="text-left w-fit text-xs"
				on:click={() => {
					if(map)
					map.flyTo({
						center: [g.lon, g.lat],
						zoom: zoom,
					});
				}}
			>
				{g.label}
			</ControlButton>
		{/each}
    </ControlGroup>

    <ControlGroup>
      <ControlButton class="text-lg" on:click={() => {
          if(map)
			map.flyTo({
				center: [-30, 30],
				zoom: 0.5,
			})
      }}>&#127757</ControlButton>
    </ControlGroup>
  </Control>

  {#each group as g}
  <Marker
      lngLat ={[g.lon,g.lat]}
      on:click={clickedName(g)}
      class="{g.name!='PLANT-001'?markerClass:markerClass.replace('bg-indigo-400','bg-red-300')}"
    >
      <span>
        {g.label}
      </span>

      <Popup openOn="hover" offset={[0, -10]}>
        <div class="text-sm font-bold">{g.name}</div>
        <div class="text-sm font-bold">{g.description}</div>
        <div class="text-xs ">{g.address}</div>
      </Popup>
    </Marker>
    {/each}
  

</MapLibre>


<style>
</style>
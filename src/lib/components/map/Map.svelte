<script lang="ts">
// BOOTSRAP BG COLORS https://toruskit.com/docs/utilities/background-color/
import {onMount} from 'svelte'
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
import {getClassFromColor} from '../../script/utils.js'


onMount(async () => { 
})

export let mapClasses = 'relative w-full aspect-[9/16] max-h-[70vh] sm:max-h-full sm:aspect-video';
export let group:any = []
export let zoom:any = 5;
export let initZoom:any = 1;
export let initCenter:any= [-30,30]
export let modalId = 'markerClickedDivPlants'
export let clickedName:any = (g:any)=>{
    const modalEdit = document.getElementById(modalId)
    const editClicked = new CustomEvent("markerclicked", { detail: g.uid })
    modalEdit?.dispatchEvent(editClicked)
}


// CONSIDER MOVE THIS ON UTILITIES
let markerClass = 'border-gray-200 border shadow-2xl focus:outline-2 focus:outline-black w-6 h-6 '+'bg-indigo-400'+' text-white text-[8px] font-bold rounded-full grid place-items-center'
const getMarkerClass = (color:string) =>{
    let newClass = JSON.parse(JSON.stringify(markerClass))
    const cl = getClassFromColor(color)
    const ret = newClass.replace('bg-indigo-400',cl)
    return(ret)
}

</script>

<MapLibre
  style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
  class={mapClasses}
  center={initCenter}
  zoom={initZoom}
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
            {#if (g.lon && g.lat)}
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
            {/if}
		{/each}
    </ControlGroup>

    <ControlGroup>
      <ControlButton class="text-lg" on:click={() => {
          if(map)
			map.flyTo({
				center: initCenter,
				zoom: initZoom,
			})
      }}>&#127757</ControlButton>
    </ControlGroup>
  </Control>

  {#each group as g}
    {#if (g.lon && g.lat)}
          <Marker
              lngLat ={[g.lon,g.lat]}
              on:click={clickedName(g)}
              class="{getMarkerClass(g.color)}">
                  <span>
                    {g.label}
                  </span>

                  <Popup openOn="hover" offset={[0, -10]}>
                    <div class="text-sm font-bold">{g.name}</div>
                    <div class="text-sm font-bold">{g.description}</div>
                    <div class="text-xs ">{g.address}</div>
                  </Popup>
          </Marker>
    {/if}
  {/each}
  

</MapLibre>


<style>
.plant-lightred{
    background-color: #FF6188;
}
.plant-lightblue{
    background-color: #B9DCCC;
}
.plant-lightgreen{
    background-color: #A9DC62;
}
</style>
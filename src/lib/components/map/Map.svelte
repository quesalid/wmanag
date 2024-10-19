<script lang="ts">
// BOOTSRAP BG COLORS https://toruskit.com/docs/utilities/background-color/
import {onMount} from 'svelte'
import {sleep} from '../../script/api.js'


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
        Popup,
        GeoJSON,
        LineLayer,
        FillExtrusionLayer} from 'svelte-maplibre';
import {getClassFromColor} from '../../script/utils.js'


let mapContainer:any
export let map:any 

onMount(async () => { 
    // add eventlistner to listen for profile base coords
    const modalEdit = document.getElementById(modalId)
    modalEdit?.addEventListener('profilecoords', (e:any) => {
		console.log("PROFILE COORDINATES EVENT RECEIVED",e.detail)
        // click on fly button to move to profile base coords
	})
    
})

export let mapClasses = 'relative w-full aspect-[9/16] max-h-[70vh] sm:max-h-full sm:aspect-video';
export let mapStyle = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
export let group:any = null
export let markers:any = []
export let zoom:any = 5;
export let initZoom:any = 1;
export let initCenter:any= [-30,30]
export let pitch:any = 45;
export let bearing:any = -17.5;
export let modalId = 'markerClickedDivPlants'
export let clickedName:any = (g:any)=>{
   
    const modalEdit = document.getElementById(modalId)
    const editClicked = new CustomEvent("markerclicked", { detail: g.uid })
        modalEdit?.dispatchEvent(editClicked)
}
export let geolineprops:any = {
    layout:{'line-cap': 'round', 'line-join': 'round' },
    paint:{'line-width': 2,
           'line-color': '#008800',
           'line-opacity': 0.8,
           }
}


// CONSIDER MOVE THIS ON UTILITIES
let markerClass = 'border-gray-200 border shadow-2xl focus:outline-2 focus:outline-black w-6 h-6 '+'bg-indigo-400'+' text-white text-[8px] font-bold rounded-full grid place-items-center'
let markerClassSmall = 'border-gray-200 border shadow-2xl focus:outline-2 focus:outline-black w-4 h-4 '+'bg-[#FF0000]'+' text-white text-[5px] font-bold rounded-full grid place-items-center animate-blink-5 '

const getMarkerClass = (color:string) =>{
    let newClass = JSON.parse(JSON.stringify(markerClass))
    const cl = getClassFromColor(color)
    const ret = newClass.replace('bg-indigo-400',cl)
    return(ret)
}

const MyFlyTo = (lon:any=null,lat:any=null,zoom:any=null) => {
    const lz = zoom || initZoom
    const llon = lon || initCenter[0]
    const llat = lat || initCenter[1]
    if(map)
	    map.flyTo({
		    //center: initCenter,
		    //zoom: initZoom,
            center: [llon, llat],
	        zoom: lz,
	    })
}

</script>

<MapLibre
  bind:style={mapStyle}
  class={mapClasses}
  center={initCenter}
  zoom={initZoom}
  pitch={pitch}
  bearing={bearing}
  attributionControl={true}
  bind:map={map}
  bind:mapContainer={mapContainer}
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
						MyFlyTo(g.lon,g.lat,zoom)
				    }}>
				    {g.label}
			    </ControlButton>
            {/if}
		{/each}
    </ControlGroup>

    <ControlGroup>
      <ControlButton class="text-lg flybutton"  on:click={() => {
           MyFlyTo()
      }}>&#127757</ControlButton>
    </ControlGroup>
  </Control>
 
  {#each markers as m}
  	<Marker
	  lngLat={m.lngLat}
	  class={markerClassSmall+" blink"}
	>
	  <span>{"alm"}</span>
	  <Popup openOn="click" offset={[0, -10]}>
		<div class="text-sm font-bold">
            <a href="#">{m.name}</a>
            </div>
		<div class="text-sm font-bold">{m.description}</div>
	  </Popup>
	</Marker>
  
  {/each}
  
  {#if group}
      {#each group as g}
        {#if g.geojson}
            <GeoJSON id="{g.uid}" data={g.geojson}>
                <LineLayer
                  layout={geolineprops.layout}
                  paint={geolineprops.paint}
                />
            </GeoJSON>          
        {/if}
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
  {/if}
</MapLibre>


<style>

</style>
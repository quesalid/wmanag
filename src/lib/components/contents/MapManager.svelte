<script lang="ts">
import Map from '../map/Map.svelte';
import MarkerClickedPlants from './MarkerClickedPlants.svelte'
import WManag from '../WManag.svelte'
import {onMount} from 'svelte'
import {mock,user} from '../../ustore.js'
import {getEntityMain} from '../../script/apidataconfig.js'

let defaultWManager = 'defaultMapManager'
let group:any = []
let PUBLIC_MAPTILER_KEY = "WtDpLYuY39XKDh4g0h1z"
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
//export let mapStyle:any ='https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
export let mapStyle:any =`https://api.maptiler.com/maps/streets-v2/style.json?key=${PUBLIC_MAPTILER_KEY}`
export let initZoom:any = 10
export let initCenter:any= [-0.12755,51.507222]
export let zoomfactor = 3
export let pitch:any = 0;
export let bearing:any = 0;
// DATA EXPORTS
export let mapdata:any = []
export let markers:any = []
export let managerid = 'mapManagerId'

let component:any = MarkerClickedPlants
let modalId = "markerClickedDivPlants"
let map:any


const alarmMarkerClasses =[
	{action:'ACKNOWLEDGE',color:'bg-orange-400'},
	{action:'RESUME',color:'animate-blink-5'},
	{action:'SUSPEND',color:'bg-fuchsia-400'},
	{action:'DROP',color:'bg-green-400'},
]

const changeMarkerClass = (marker:any,action:any) => {
	alarmMarkerClasses.forEach((m:any)=>{
		marker.classList.remove(m.color)
		if(m.action == action){
			marker.classList.add(m.color)
		}
	})
}

onMount(async () => {
	let filters:any
	let ret:any
	
	filters = []
	ret = await getEntityMain(filters,$mock)
	group= ret.data
	component = MarkerClickedPlants
	modalId = "markerClickedDivPlants"
	map.flyTo({center: initCenter,zoom: initZoom})
	// dispacth event to listen for profile base coords
	const modalEdit = document.getElementById(modalId)
	const profileCoords = new CustomEvent("profilecoords", { detail: {zoom: initZoom,center:initCenter} })
	modalEdit?.dispatchEvent(profileCoords)
	const mapManager = document.getElementById(managerid)

	const toggleBlink = (marker:any) => {
		marker.classList.toggle('blink')
	}
	console.log("MAP MANAGER ADD EVENT LISTENER",managerid,mapdata)
	// ADD EVENT LISTENERS
	if(mapManager){
		mapManager.addEventListener("alarmlocation",async (e:any)=>{
			const uid = e.detail
			console.log("ALARM LOCATION EVENT RECEIVED",uid,mapdata)
			// FIND THE UID IN THE MAPDATA
			const found = mapdata.find((m:any)=>m.uid == uid)
			if(found){
				const lon = found.lon?found.lon:initCenter[0]
				const lat = found.lat?found.lat:initCenter[1]
				map.flyTo({center: [lon, lat],zoom: initZoom+zoomfactor,})
			}
		})
		mapManager.addEventListener("alarmaction",async (e:any)=>{
			const uid = e.detail.uid
			const action = e.detail.action
			// FIND THE UID IN MARKERS
			const found = markers.find((m:any)=>m.uid == uid)
			if(found){
				changeMarkerClass(found.marker._element,action)
			}
		})
	}
})


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
			<Map bind:group={group} 
				zoom=14 
				modalId={modalId} 
				initZoom={initZoom}
				initCenter={initCenter}
				bind:mapStyle={mapStyle}
				bind:map={map}
				bind:markers={markers}
				bind:pitch={pitch}
				bind:bearing={bearing}/>
		</div>
	</WManag>
</div>

<div>
    <svelte:component this={component} modalId={modalId}/>
</div>

<style>
</style>
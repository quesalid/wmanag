<script lang="ts">
import Map from '../map/Map.svelte';
import MarkerClickedPlants from './MarkerClickedPlants.svelte'
import WManag from '../WManag.svelte'
import {onMount} from 'svelte'
import {mock,user} from '../../ustore.js'
import {getEntityMain} from '../../script/apidataconfig.js'

let defaultWManager = 'defaultMapper'
let group:any = []

export let width = "600px"
export let height = "3800px"
export let headercolor = '#fff2e8'
export let disableClose = true
export let title = "MAP MANAGER"
export let top = '20%'
export let left = '20%'
export let minimized = 'on'
export let resize = 'both'
export let toolbar:any = []
export let maptype:any ='factory'
let component:any = MarkerClickedPlants
let modalId = "markerClickedDivPlants"
let mapManagerId = 'mapManagerId'


let initZoom:any = $user.profile.map.zoom;
let initCenter:any= [$user.profile.map.center.lng, $user.profile.map.center.lat]

onMount(async () => {
	let filters:any
	let ret:any
	
			filters = []
			ret = await getEntityMain(filters,$mock)
			group= ret.data
			component = MarkerClickedPlants
			modalId = "markerClickedDivPlants"
			if($user.profile.map){
				initZoom = $user.profile.map.zoom
				initCenter = [$user.profile.map.center.lng, $user.profile.map.center.lat]
			}
			// dispacth event to listen for profile base coords
			const modalEdit = document.getElementById(modalId)
			const profileCoords = new CustomEvent("profilecoords", { detail: {zoom: initZoom,center:initCenter} })
			modalEdit?.dispatchEvent(profileCoords)
			const mapManager = document.getElementById(mapManagerId)
			if(mapManager){
				mapManager.addEventListener("alarmlocation",async (e:any)=>{
					const uid = e.detail
					// FLY MAP TO RANDOM LOCATION IN EUROPE
					// Generate random real number between 8.00 and 16.00
					const lon = Math.random() * (16.00 - 8.00) + 8.00
					// Generate random real number between 36.00 and 48.00
					const lat = Math.random() * (48.00 - 36.00) + 36.00
					initCenter = [lon,lat]
					initZoom = 7
				})
			}
	
})

</script>

<div class="map-manager" id="{mapManagerId}">
	<WManag id="{defaultWManager}" 
		title="{title}" 
		disableClose={disableClose} 
		draggable={true} 
		headercolor={headercolor}
		width={width}
		height={height}
		top={top}
		left={left}
		toolbar = {toolbar}
		minimized="{minimized}"
		resize={resize}>
		<div class="flex flex-col min-h-200 min-w-1" slot="bodycontent">
			<Map bind:group={group} zoom=14 modalId={modalId} bind:initZoom={initZoom} bind:initCenter={initCenter}/>
		</div>
	</WManag>
</div>

<div>
    <svelte:component this={component} modalId={modalId}/>
</div>

<style>
</style>
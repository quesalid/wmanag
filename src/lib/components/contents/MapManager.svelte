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
export let headercolor = '#fff2e8'
export let disableClose = true
export let title = "MAP MANAGER"
export let top = '20%'
export let left = '20%'
export let minimized = 'on'
export let toolbar:any = []
export let maptype:any ='factory'
let component:any = MarkerClickedPlants
let modalId = "markerClickedDivPlants"


let initZoom:any = 1;
let initCenter:any= [-30,30]

onMount(async () => {
	let filters:any
	let ret:any
	/*switch(maptype){
		case 'factory':*/
			filters = []
			ret = await getEntityMain(filters,$mock)
			group= ret.data
			console.log("MAP MANAGER MAIN ENTITIES",group)
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
	/*	break;
	}*/
})

</script>

<div class="map-manager">
	<WManag id="{defaultWManager}" 
		title="{title}" 
		disableClose={disableClose} 
		draggable={true} 
		headercolor={headercolor}
		width={width}
		top={top}
		left={left}
		toolbar = {toolbar}
		minimized="{minimized}"
		resize='both'>
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
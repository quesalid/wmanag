<script lang="ts">
import Map from '../map/Map.svelte';
import MarkerClickedPlants from './MarkerClickedPlants.svelte'
import WManag from '../WManag.svelte'
import {onMount} from 'svelte'
import {mock} from '../../ustore.js'
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

onMount(async () => {
	let filters:any
	let ret:any
	switch(maptype){
		case 'factory':
			filters = []
			ret = await getEntityMain(filters,$mock)
			group= ret.data
			component = MarkerClickedPlants
			modalId = "markerClickedDivPlants"
		break;
	}
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
			<Map bind:group={group} zoom=14 modalId={modalId}/>
		</div>
	</WManag>
</div>

<div>
    <svelte:component this={component} modalId={modalId}/>
</div>

<style>
</style>
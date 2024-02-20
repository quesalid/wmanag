<script lang="ts">
import Map from '../map/Map.svelte';
import MarkerClicked from './MarkerClicked.svelte'
import WManag from '../WManag.svelte'
import {onMount} from 'svelte'
import {token, mock, currentplant} from '../../ustore.js'
import {getPlants} from '../../script/apidataconfig.js'

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

onMount(async () => { 
	const filters:any = []
    const ret = await getPlants(filters,$mock)
	group= ret.data
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
			<Map bind:group={group} zoom=14/>
		</div>
	</WManag>
</div>

<div>
	<MarkerClicked />
</div>

<style>
</style>
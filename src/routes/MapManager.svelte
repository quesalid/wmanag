<script lang="ts">
import Map from '../lib/components/map/Map.svelte';
import WManag from '../lib/components/WManag.svelte'
import {onMount} from 'svelte'
import {token, mock, currentplant} from '../lib/ustore.js'
import {getPlants} from '../lib/script/apidataconfig.js'

let defaultWManager = 'defaultMapper'
let group:any = []

onMount(async () => { 
	const filters:any = []
    const ret = await getPlants(filters,$mock)
	group= ret.data
})

</script>

<div class="map-manager">
	<WManag id="{defaultWManager}" 
		title="MAP MANAGER"  
		disableClose={true} 
		draggable={true} 
		headercolor="#fff2e8"
		width="400px">
		<div class="flex flex-col min-h-200 min-w-1" slot="bodycontent">
			<Map bind:group={group} zoom=14/>
		</div>
	</WManag>
</div>

<style>
</style>
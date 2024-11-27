<script lang="ts">
import {onMount, tick} from 'svelte'

// INTERNAL
import WManag from '../WManag.svelte'
import {mock,user} from '../../ustore.js'
import D3Libre from '../d3/D3Libre.svelte'

let defaultWManager = 'defaultD3LibreManager'

// SECTION VARS


// WINDOW EXPORTS
export let width = "600px"
export let height = "3800px"
export let disableClose = false
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

// DATA EXPORTS
export let managerid = 'd3ManagerId'
export let containerClass = 'map-container-maplibre'
// INTERNAL VARIABLES



onMount(async () => {
	const wmanag = document.getElementById(defaultWManager)
	if(wmanag)
		wmanag.style.visibility = 'hidden'
	wmanag?.addEventListener('show', (e:any) => {
		wmanag.style.visibility = 'visible'
	})
	wmanag?.addEventListener('hide', (e:any) => {
		wmanag.style.visibility = 'hidden'
		console.log("HIDE",e.detail)
	})
	
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
		<div  slot="bodycontent">
			<D3Libre {containerClass}/>
		</div>
	</WManag>
</div>


<style>
</style>
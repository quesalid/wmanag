<script lang="ts">
import {onMount, tick} from 'svelte'
import L from 'leaflet';
// INTERNAL
import WManag from '../WManag.svelte'
import PlaceHolder from '../PlaceHolder.svelte'
import AssetChart from '../asset/AssetChart.svelte'
import {mock,user} from '../../ustore.js'

let defaultWManager = 'defaultAssetGraphManager'

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
export let zindex = 3


// DATA EXPORTS
export let managerid = 'assetGraphManagerId'
// INTERNAL VARIABLES
let section:any = {}
let twinClassId = "twin-class-id";
let asset:any = null
let showSag = false;

onMount(async () => {
	const wmanag = document.getElementById(defaultWManager)
	if(wmanag)
		wmanag.style.visibility = 'hidden'
	console.log("AssetGraphManager onMount",wmanag.style.visibility)
	wmanag?.addEventListener('show', (e:any) => {
		console.log("AssetGraphManager show",e.detail)
		wmanag.style.visibility = 'visible'
		title = 'Asset Graph ' + e.detail.userData.id
		asset = e.detail
	})
	wmanag?.addEventListener('hide', (e:any) => {
		wmanag.style.visibility = 'hidden'
		showSag = false
	})
	
})



</script>

<div class="map-manager" id="{managerid}">
	<WManag id="{defaultWManager}" 
		bind:title="{title}" 
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
		{boxshadow}
		{zindex}>
		<div  slot="bodycontent">
			<AssetChart bind:showSag={showSag}/>
		</div>
	</WManag>
</div>


<style>
</style>
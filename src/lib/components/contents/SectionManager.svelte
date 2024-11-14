<script lang="ts">
import {onMount, tick} from 'svelte'
import L from 'leaflet';
// INTERNAL
import WManag from '../WManag.svelte'
import {mock,user} from '../../ustore.js'
import {Section} from '../sections/section'
import SectionComp from '../sections/Section.svelte'

let defaultWManager = 'defaultSectionManager'

// SECTION VARS




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
export let initlat = 45.0;
export let initlon = 7.0;
export let initzoom = 10;
// DATA EXPORTS
export let managerid = 'sectionManagerId'
export let sectionCoords:any
export let twindata:any
export let map:any
export let twinwin = 'defaultTwinManager'
export let d3win = 'defaultD3Manager'


// INTERNAL VARIABLES
let sections:any = []





onMount(async () => {
	
})

$:  { 
		for(let i=0;i<sectionCoords.length;i++) {
			let line = sectionCoords[i];
			let section = new Section(line);
			sections.push(section)
		}
		sections = sections
}


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
			<SectionComp  
				sections={sections} 
				bind:map={map}
				initlat={initlat}
				initlon={initlon}
				initzoom={initzoom}
				twinwin={twinwin}
				d3win={d3win}
				twindata={twindata}/>
		</div>
	</WManag>
</div>


<style>
</style>
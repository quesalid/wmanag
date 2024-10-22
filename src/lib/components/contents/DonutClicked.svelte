<script lang="ts">
// EXTERNAL
import {onMount} from "svelte"
// INTRNAL
import WManag from '../WManag.svelte'
import {DonutClickedForm} from '../forms'
// API
import {getEntityMain,
		getDevices,
		getAgents,
		getEntityArea,
		getEntityLocal,
		getEntityControlled,
		getControllers} from '../../script/apidataconfig.js'
// STORE
import {token, mock, module} from '../../ustore.js'

let donutListener:any
onMount(async () => {
		// GET MYSELF
		const donutClicked = document.getElementById(modalId)
		// REMOVE EVENT LISTENER IF EXISTS
		if(donutListener && donutClicked)
			donutClicked.removeEventListener("donutclicked",donutListener)
		// ADD EVENT LISTENER FOR DONUTS
		if(donutClicked){
			donutListener = donutClicked.addEventListener("donutclicked",async (e:any)=>{
			   // GET PLANT ID
			   uid = e.detail
			   // GET PLANTS
			   const retplants = await getEntityMain([{uid:uid,_type:'eq'}],$mock)
			   const plants = retplants.data
			   const plant = plants[0]
			   const pname = plant?plant.name:''
			   title = 'AGENTS FOR PLANT '+pname
			   // GET MACHINES
			   const retmachines = await getEntityControlled([],$mock)
			   const machines = retmachines.data
			   // GET DEVICES
			   const retdevices = await getDevices([{plant:uid,_type:'eq'},{module:$module.toUpperCase(),_type:'eq'}],$mock)
			   devices = retdevices.data
			   // ADD agents to device
			   for(let i=0;i<devices.length;i++){
				   const dev = devices[i]
				   const retagents:any = await getAgents([{devuid:dev.uid,_type:'eq'},{type:'SCANNER',_type:'eq'}],$mock)
				   const agts =  retagents.data
				   // ADD MACHINES TO AGENTS
				   for(let j=0;j<agts.length;j++){
					   const mcs = machines.filter((item:any)=> item.agent == agts[j].uid)
					   agts[j].machines = mcs
				   }
				   devices[i].agents = agts
			   }
			   // SHOW ME
				donutClicked.style.display='block'

			})
		}
	});


// EXPORTS
// WIMANAGER VARIABLES
export let modalId = "donutClickedDiv"
export let  bgcolor = "#ddefde"
export let toolbar:any = []
export let title = "DONUT CLICKED"
export let disableClose = false
export let draggable = true
export let width = "1100px"
export let top = "5%"
export let left = "5%"
export let minimized = "off"
export let resize = "both"
export let titlecolor = "#666"
export let titlefontsize = "13px"
export let titleweight = "bold"
export let showheader = true
export let bordercolor = "#c0c0c0"
export let boxshadow = "0px 0px 0px 0px #000000"
export let height = "max-content"



let uid = ''
let devices:any =[]




let image = '/PLANT-001.jpg'
let plant:any = {}
let departments:any = []
let lines:any = []
let machines:any = []
let controllers:any = []
let videostarted = false

const closeModal = (ev:any) =>{
	 const divCont = document.getElementById(modalId)
	 if(divCont)
		divCont.style.display = 'none'
	 image = ''
 }

</script>
<div class="modal" id={modalId} style="--background-color:{bgcolor}">
	<WManag id="DonutClickedWindow"
		closeMenu={closeModal}
		title="{title}" 
		disableClose={disableClose} 
		draggable={draggable} 
		headercolor={bgcolor}
		{width}
		{top}
		{left}
		toolbar = {toolbar}
		{minimized}
		{resize}
		{titlecolor}
		{titlefontsize}
		{titleweight}
		{showheader}
		{bordercolor}
		{boxshadow}
		{height}>
		<div class="dc-content-div" slot="bodycontent">
			<DonutClickedForm {devices}/>
		</div>
	</WManag>
</div>
<style>
.modal{
  display: none;
  position: absolute; /* Stay in place */
  top:0px;
  z-index: 999; /* Sit on top */
  padding: 4%; /* Location of the box */
  width: 100%; /* Full width */
  min-width: 200px; /* Full width */
  height: 100%; /* Full height */
  background-color: var(--background-color);
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

.dc-content-div{
	display:flex;
	justify-content:space-between;
	margin-top: 2em;
}

</style>
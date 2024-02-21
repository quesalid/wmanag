<script lang="ts">
// EXTERNAL
import {onMount} from "svelte"
// INTRNAL
import WManag from '../WManag.svelte'
import {PlantForm} from '../forms'
// API
import {getPlants,getDepartments,getLines,getMachines,getControllers} from '../../script/apidataconfig.js'
// STORE
import {token, mock, currentplant} from '../../ustore.js'

onMount(async () => {
		// GET MYSELF
		const markerClicked = document.getElementById(modalId)
		if(markerClicked){
			markerClicked.addEventListener("markerclicked",async (e:any)=>{
				markerClicked.style.display='block'
				uid = e.detail
				// GET DEVICES
				const filters:any = [{uid:uid,_type:'eq'}]
				const ret = await getPlants(filters,$mock)
				const found = ret.data.find((item:any)=> {return(item.uid == uid)})
				title = "PLANT "+found.name
				image = "/"+found.name+".jpg"
				plant = found
				const filtdep = [{plant:found.uid,_type:'eq'}]
				const retdep = await getDepartments(filtdep,$mock)
				departments = retdep.data
				console.log("DEPARTMENTS",departments)
				if(videostarted){
					stopVideo()
					videostarted = false
				}
				
			})
		}
	});


// EXPORTS
export let modalId = "donutClickedDiv"
export let  bgcolor = "#ddefde"
export let toolbar:any = []



let title = "DONUT CLICKED"
let uid = ''
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
	<WManag id="MarkClickedWindow"
		closeMenu={closeModal}
		title="{title}" 
		disableClose={false} 
		draggable={true} 
		headercolor={bgcolor}
		width="1100px"
		top="5%"
		left="5%"
		toolbar = {toolbar}
		minimized="off"
		resize='both'>
		<div class="dc-content-div" slot="bodycontent">
			
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
<script lang="ts">
// EXTERNAL
import {onMount} from "svelte"
// INTERNAL
import WManag from '../WManag.svelte'
import Donut from '../donut/Donut.svelte'
import {LearnPhaseForm} from '../forms'
// USTORE
import {mock} from '../../ustore.js'
// API
import {
		getLearnPoints,
		getLearnPhases,
		getCloneMBPhases} from '../../script/apidataconfig.js'
// UTILS
import {setConicDataBatch} from '../../script/utils.js'
    import type { USTORE } from "../../..";

let batch:any
let phases:any = []
let phase: any ={}
let mbphases: any = []

onMount(async () => {
	const retmbp = await getCloneMBPhases([],$mock)
	mbphases = retmbp.data
	const detailForm = document.getElementById(modalId)
		if(detailForm){
			detailForm.addEventListener("detailclicked",async (e:any)=>{
				detailForm.style.display='block'
				uid = e.detail
				// UPDATE DONUT
				/** ad dynamic call to donut ***/
				// A. GET BATCH
				const batchfilters = [{uid:uid,_type:'eq'}]
				const ret = await getLearnPoints(batchfilters,$mock)
				if(ret.data.length >0)
					batch = ret.data[0]
				// B. GET PHASES
				if(batch.uid){
					title= "BATCH N. "+batch.tag
					const phasefilters = [{point:batch.uid,_type:'eq'}]
					const retphases = await getLearnPhases(phasefilters,$mock)
					phases = retphases.data
					// C. POPULATE phases field
					for(let i=0;i<phases.length;i++){
						const ph = phases[i]
						const found = mbphases.find((item:any)=> item.uid == ph.mbphase)
						if(found){
							ph.description = found.description
							ph.type = found.tag
							ph.image = found.image
							ph.color = found.color
						}
							
					}
					// ADJUST PHASE FOR PHASE FORM
					if(phases.length > 0)
						phase = phases[0]
				}
				// D. GET CONIC DATA
				console.log("SYNBATCH PHASES",phases)
				donut.conicData = setConicDataBatch(batch,phases)
				const donutDiv = document.getElementById(donut.id)
				const donutRedraw = new CustomEvent("donutredraw", { detail: 'redraw' })
				donutDiv?.dispatchEvent(donutRedraw)
				count += 1
				donutDiv?.dispatchEvent(donutRedraw)
				count += 1
			})

			detailForm.addEventListener("donutclicked",async (e:any)=>{
				const id = e.detail
				const filters = [{uid:id,_type:'eq'}]
				const retphase = await getLearnPhases(filters,$mock)
				phase = retphase.data[0]
				const found = mbphases.find((item:any)=> item.uid == phase.mbphase)
				if(found){
					phase.description = found.description
					phase.type = found.tag
					phase.image = found.image
					phase.color = found.color
				}
				console.log("DONUT CLICKED PHASE",retphase.data)
				// route event to konva animation form
				const donutClicked = new CustomEvent("donutclicked",{detail:phase})
				const konvaForm:any = document.getElementById("konva-animation-id")
				konvaForm.dispatchEvent(donutClicked)
			})
		}

})

let defaultWManager = 'defaultSynBatchDetail'

// EXTERNAL
// WINDOW VARIANBLES
export let modalId = "SynBatchDetailDiv"
export let  bgcolor = "#ddefde"
export let toolbar:any = []
export let closeModal = (ev:any) =>{
	 const divCont = document.getElementById(modalId)
	 if(divCont)
		divCont.style.display = 'none'
 }
export let title = "BATCH DETAILS"
export let disableClose = false
export let draggable = true
export let width = "1300px"
export let top = "5%"
export let left = "10%"
export let minimized = "off"
export let resize = "both"
export let zindex = 3
export let headercolor = bgcolor
export let titlecolor = "#666"
export let titlefontsize = "15px"
export let titleweight = "bold"
export let bodycolor = "#ffffff"
export let height = "max-content"
export let scrollable = false
export let showheader = true
export let bordercolor = "#c0c0c0"
export let boxshadow = "0px 0px 0px 0px #000000"

//let bgcl = '#004B7C'
let bgcl = bgcolor
let uid:any = ''
let count = 0
let donut:any = {
		id:"donut-default",
		dbTitle: "BATCH PHASES",
		donutWidth: '300px',
		donutHeight: '300px',
		pageId:modalId,
		color:'',
		image:'',
		showTitle:false,
		conicData: []
	}


</script>


<div class="modal" id={modalId} style="--background-color:{bgcolor}">
	<WManag id="{defaultWManager}"
			closeMenu={closeModal}
			title="{title}" 
			{disableClose} 
			{draggable} 
			headercolor={headercolor}
			{width}
			{top}
			{left}
			toolbar = {toolbar}
			{minimized}
			{resize}
			{zindex}
			{titlecolor}
			{titlefontsize}
			{titleweight}
			{boxshadow}
			{bordercolor}
			{showheader}
			{bodycolor}
			{height}
			{scrollable}>
			<div class="batch-detail-form" slot="bodycontent"> 
				<div class="donut-container" style="--background-color:{bgcl}" >
					<Donut donut={donut} addNumbers={true} bgcolor="{bgcl}"/>
				</div>
				<div class="phase-container">
					<LearnPhaseForm  />
				</div>
			</div>
	</WManag>>
</div>

<style>
.modal{
  display: none;
  position: absolute; /* Stay in place */
  z-index: 999; /* Sit on top */
  padding: 5%; /* Location of the box */
  width: 100%; /* Full width */
  min-width: 200px; /* Full width */
  height: 100%; /* Full height */
  background-color: var(--background-color);
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}
.batch-detail-form{
	display:flex;
}
.donut-container{
	width: 316px;
	height: 316px;
	background-color: var(--background-color);
	border-radius: 50%;
}
.phase-container{
	width:100%;
}
</style>
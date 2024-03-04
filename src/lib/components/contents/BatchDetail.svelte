<script lang="ts">
// EXTERNAL
import {onMount} from "svelte"
// INTERNAL
import WManag from '../WManag.svelte'
import Donut from '../donut/Donut.svelte'
import {PhaseForm} from '../forms'
// USTORE
import {mock} from '../../ustore.js'
// API
import {getClonePoints,getClonePhases} from '../../script/apidataconfig.js'
// UTILS
import {setConicDataBatch} from '../../script/utils.js'
    import type { USTORE } from "../../..";

let batch:any
let phases:any = []
let phase: any ={}


onMount(async () => {
	const detailForm = document.getElementById(modalId)
		if(detailForm){
			detailForm.addEventListener("detailclicked",async (e:any)=>{
				detailForm.style.display='block'
				uid = e.detail
				// UPDATE DONUT
				/** ad dynamic call to donut ***/
				// A. GET BATCH
				const batchfilters = [{uid:uid,_type:'eq'}]
				const ret = await getClonePoints(batchfilters,$mock)
				if(ret.data.length >0)
					batch = ret.data[0]
				console.log("BATCH DETAIL batch",batch)
				// B. GET PHASES
				if(batch.uid){
					const phasefilters = [{point:batch.uid,_type:'eq'}]
					const retphases = await getClonePhases(phasefilters,$mock)
					phases = retphases.data
					console.log("BATCH DETAIL phases",phases,retphases)
				}
				// C. GET CONIC DATA
				donut.conicData = setConicDataBatch(batch,phases)
				console.log("BATCH DETAIL conic data",donut.conicData)
				const donutDiv = document.getElementById(donut.id)
				const donutRedraw = new CustomEvent("donutredraw", { detail: 'redraw' })
				donutDiv?.dispatchEvent(donutRedraw)
				count += 1
				donutDiv?.dispatchEvent(donutRedraw)
				count += 1
			})

			detailForm.addEventListener("donutclicked",async (e:any)=>{
				const id = e.detail
				console.log("DONUT CLICKED",id)
				const filters = [{uid:id,_type:'eq'}]
				const retphase = await getClonePhases(filters,$mock)
				phase = retphase.data[0]
				console.log("DONUT CLICKED PHASE",phase)
			})
		}

})

export let modalId = "BatchDetailDiv"
export let  bgcolor = "#ddefde"
export let toolbar:any = []

//let bgcl = '#004B7C'
let bgcl = bgcolor
let title = "BATCH DETAILS"
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

const closeModal = (ev:any) =>{
	 const divCont = document.getElementById(modalId)
	 if(divCont)
		divCont.style.display = 'none'
 }
</script>


<div class="modal" id={modalId} style="--background-color:{bgcolor}">
	<WManag id="BatchDetailWindow"
			closeMenu={closeModal}
			title="{title}" 
			disableClose={false} 
			draggable={true} 
			headercolor={bgcolor}
			width="1300px"
			top="5%"
			left="10%"
			toolbar = {toolbar}
			minimized="off"
			resize='both'>
			<div class="batch-detail-form" slot="bodycontent"> 
				<div class="donut-container" style="--background-color:{bgcl}" >
					<Donut donut={donut} addNumbers={true} bgcolor="{bgcl}"/>
				</div>
				<div class="phase-container">
					<PhaseForm bind:phase={phase}/>
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
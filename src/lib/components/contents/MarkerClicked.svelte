<script lang="ts">
// IMAGE MAP GENERATOR
// https://imagemap.org/
// EXTERNAL
import {onMount} from "svelte"
// INTRNAL
import WManag from '../WManag.svelte'
import {PlantForm} from '../forms'
// API
import {getPlants,getDepartments,getLines,getMachines,getControllers} from '../../script/apidataconfig.js'
// STORE
import {token, mock, currentplant} from '../../ustore.js'
    import AdminDb from "../../../routes/AdminDB.svelte";

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
				const retlines = await getLines([],$mock)
				lines = retlines.data
				for(let i=0; i< departments.length;i++){
					const ln = lines.filter((item:any)=>item.department == departments[i].uid)
					departments[i].lines = ln
				}
				console.log("DEPARTMENTS",departments)
				if(videostarted){
					stopVideo()
					videostarted = false
				}
				
			})
		}
	});


// EXPORTS
export let modalId = "markerClickedDiv"
export let  bgcolor = "#ddefde"
export let toolbar:any = []



let title = "PLANT"
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

 const cameraClicked = (ev:any) =>{
	 ev.preventDefault();
	 console.log("CAMERA CLICKED",uid)
	 if(!videostarted){
		startVideo()
		videostarted=true
	 }else{
		 stopVideo()
		videostarted = false
	 }
 }

 const startVideo = () =>{
	let maindiv:any =  document.getElementById('marker-left-panel-content-id')
	let div:any = document.getElementById('factoryVidPlayerDiv')
	let video: any = document.getElementById('factoryVidPlayer')
	div.style.display='block'
	maindiv.style.display='none'
    let vendorUrl = window.URL || window.webkitURL; 
	if (navigator.mediaDevices.getUserMedia) { 
		navigator.mediaDevices.getUserMedia({ video: true }) 
			.then(function (stream) { 
				video.srcObject = stream; 
			}).catch(function (error) { 
				console.log("Something went wrong!"); 
			}); 
	} 
 }

 const stopVideo = () =>{
	let maindiv:any =  document.getElementById('marker-left-panel-content-id')
    let div:any = document.getElementById('factoryVidPlayerDiv')
	let video:any = document.getElementById('factoryVidPlayer')
	let stream = video.srcObject; 
    let tracks = stream.getTracks(); 
    for (var i = 0; i < tracks.length; i++) { 
        var track = tracks[i]; 
        track.stop(); 
    } 
    video.srcObject = null; 
	div.style.display='none'
	maindiv.style.display='block'
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
		<div class="mc-content-div" slot="bodycontent">
			<div class="left-panel">
				<div class="left-panel-content" id="factoryVidPlayerDiv">
					<video  id="factoryVidPlayer" controls muted autoplay></video>
				</div>
				<div class="left-panel-content" id="marker-left-panel-content-id">
					<PlantForm plant={plant} {departments}/>
				</div>
			</div>
			<div style="margin-left:auto;">
				<img src={image} alt={plant.name}>
			</div>
			<div id="camera-div" style="margin-left:auto;">
				<img src="/WEBCAM.png" alt="camera" width="40px" on:click={cameraClicked}>
			</div>
		</div>
	</WManag>
</div>
<style>
.modal{
  display: none;
  position: absolute; /* Stay in place */
  z-index: 999; /* Sit on top */
  padding: 4%; /* Location of the box */
  width: 100%; /* Full width */
  min-width: 200px; /* Full width */
  height: 100%; /* Full height */
  background-color: var(--background-color);
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}
.left-panel{
	width: 35%;
}
.mc-content-div{
	display:flex;
	justify-content:space-between;
	margin-top: 2em;
}
#camera-div{
	position:absolute;
	cursor: pointer;
	top: 90%;
	left:95%;
}
#marker-left-panel-content-id{
	display:block;
}
#factoryVidPlayerDiv{
	display:none;
	margin: 3px;
}
#factoryVidPlayer{
	margin: 3px;
}
</style>
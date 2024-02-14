<script lang="ts">
import {onMount} from "svelte"
import {getDevices} from '../../script/apidataconfig.js'
import {token, mock, currentplant} from '../../ustore.js'

onMount(async () => {
		// GET MYSELF - SHOW UP IF DELETE IS CLICKED
		const deleteForm = document.getElementById(modalId)
		if(deleteForm){
			deleteForm.addEventListener("deleteclicked",async (e:any)=>{
				deleteForm.style.display='block'
				uid = e.detail
			})
		}
	});



const exit = (ev:any)=>{
	console.log("EXIT")
	const thisDiv = document.getElementById(modalId)
	if(thisDiv)
		thisDiv.style.display = 'none'
}
// EXPORTS
export let modalId = "DeleteInputDiv"
export let  bgcolor = "#ddefde"
export let del = (ev:any)=>{
	console.log("delete DEVICE: ",uid)
}



let title = "DELETE"
let uid = ''

</script>
<div class="modal" id={modalId} style="--background-color:{bgcolor}">
	   <div class="device-form"> 
		<section>
			<h3></h3>
		</section>
		<div class="banner">
			Clicking DELETE the device will be cancelled
		</div>
		<div class="button-div">
			<!--div><span class="req">*</span> - Required field</!--div-->
			<div style="margin-left:auto;">
				<input class="formbutton" data-uid={uid} type="button" value="DELETE" on:click={del}>
				<input class="formbutton" type="button" value="EXIT" on:click={exit}>
			</div>
		</div>
	  </div>
</div>
<style>
.modal{
  display: none;
  position: absolute; /* Stay in place */
  z-index: 999; /* Sit on top */
  padding: 20%; /* Location of the box */
  width: 100%; /* Full width */
  min-width: 200px; /* Full width */
  height: 100%; /* Full height */
  background-color: var(--background-color);
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}
.device-form{
	color: #444;
	background-color: #fff;
	padding:0.4em;
	border-radius: 10px;
}
section{
	margin: 3px;
	font-weight: bold ;
}

.formbutton{
	padding: 0px 3px 0px 3px;
	margin-right: 5px;
	color: #444;
	border: 1px solid;
	border-radius: 20%;
	background-color: #ccc ;
}
.formbutton:hover{
	cursor:pointer;
}
.button-div{
	display:flex;
	justify-content:space-between;
	margin-top: 2em;
}
.banner{
	margin-top: 1.5em;
	text-align: center;
	font-size:large;
	font-weight: bold;
}
</style>
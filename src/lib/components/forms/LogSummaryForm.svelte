<script lang="ts">
// EXTERNAL
import {onMount} from "svelte"
import { v4 as uuidv4 } from 'uuid';
// INTRNAL
import {getUserTemplate} from '../../script/utils.js'
// API
import {getUsers} from '../../script/apisecurity.js'
// STORE
import {token, mock, currentplant} from '../../ustore.js'

onMount(async () => {
		// GET MYSELF
		const logSummaryForm = document.getElementById(modalId)
		if(logSummaryForm){
			logSummaryForm.addEventListener("summaryclicked",async (e:any)=>{
				logSummaryForm.style.display='block'
			})
		}
	});



const exit = (ev:any)=>{
	const thisDiv = document.getElementById(modalId)
	if(thisDiv)
		thisDiv.style.display = 'none'
}
// EXPORTS
export let modalId = "LogSummaryDiv"
export let  bgcolor = "#ddefde"
let title = "LOG SUMMARY"
export let padding = '5%'



</script>
<div class="modal" id={modalId} style="--background-color:{bgcolor};--padding:{padding}">
	<form class="device-form">
		<section>
			<h3>{title}</h3>
		</section>
		<fieldset>
			<legend>IDENTIFICATION</legend>
		</fieldset>
		<div class="button-div">
			<div style="margin-left:auto;">
				<input class="formbutton" type="button" value="EXIT" on:click={exit}>
			</div>
		</div>
	</form>
</div>
<style>

.modal{
  display: none;
  position: absolute; /* Stay in place */
  z-index: 999; /* Sit on top */
  padding: var(--padding); /* Location of the box */
  top:0%;
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
fieldset {
	color: #999;
	border: 1px solid;
	border-radius: 2px;
	margin: 3px;
}
label{
	color: #444;
	margin: 2px;
	font-weight:600 ;
}
input{
	color: #444;
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
select{
	color: #444;
}
legend{
	margin-left:5px;
}
.req {
  color: red;
}
</style>
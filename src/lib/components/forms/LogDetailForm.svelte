<script lang="ts">
// EXTERNAL
import {onMount} from "svelte"
import { v4 as uuidv4 } from 'uuid';
// INTRNAL
import {getLogTemplate,logToObject} from '../../script/utils.js'
// API
import {getLogsByUid} from '../../script/apisecurity.js'
// STORE
import {token, mock} from '../../ustore.js'

onMount(async () => {
		// GET MYSELF
		const logForm = document.getElementById(modalId)
		if(logForm){
			logForm.addEventListener("logdetailclicked",async (e:any)=>{
				logForm.style.display='block'
				uid = e.detail
				// GET DEVICES
				const ret = await getLogsByUid(uid,$mock)
				console.log("LOG RETURNED",ret.data)
				if(ret.data && ret.data.length > 0)
					log = logToObject(ret.data[0])
				console.log("LOG",log)
			})
		}
	});



const exit = (ev:any)=>{
	const thisDiv = document.getElementById(modalId)
	if(thisDiv)
		thisDiv.style.display = 'none'
}
// EXPORTS
export let modalId = "LogDetailDiv"
export let  bgcolor = "#ddefde"
export let padding = '5%'


let newlog:any = getLogTemplate()
let log:any = newlog
let title = "LOG"
let uid = ''



</script>
<div class="modal" id={modalId} style="--background-color:{bgcolor};--padding:{padding}">
	<form class="log-form">
		<section>
			<h3>{title}</h3>
		</section>
		<fieldset>
			<legend>IDENTIFICATION</legend>
				<label for="log-level">Level:</label>
				<input disabled type="text" id="log-level" name="name" bind:value={log.level}>
				<label for="log-logger">Logger:</label>
				<input disabled type="text" id="log-logger" name="name" bind:value={log.logger}>
				<label for="log-level">Message:</label>
				<input disabled type="text" id="log-message" name="name" bind:value={log.message}>
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
.log-form{
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
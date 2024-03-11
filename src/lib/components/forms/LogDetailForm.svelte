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
				if(ret.data && ret.data.length > 0){
					log = logToObject(ret.data[0])
					headerkeys = Object.keys(log.headers)
					if(log.body && log.body.options)
						optionkeys = Object.keys(log.body.options)
				}
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
let headerkeys:any = []
let optionkeys:any = []
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
				<input disabled type="text" id="log-level" name="loglevel" bind:value={log.level}>
				<label for="log-logger">Logger:</label>
				<input disabled type="text" id="log-logger" name="loglogger" bind:value={log.logger}>
				<label for="log-message">Message:</label>
				<input disabled type="text" id="log-message" name="logmessage" bind:value={log.msg}>
				<label for="log-ts">Date:</label>
				<input disabled type="text" id="log-ts" name="logts" bind:value={log.ts}>
		</fieldset>
		<fieldset>
			<legend>REQUEST SOURCE</legend>
				<label for="log-userId">User:</label>
				<input disabled type="text" id="log-userId" name="loguserid" bind:value={log.userId}>
				<label for="log-remote_ip">Remote Ip:</label>
				<input disabled type="text" id="log-remote_ip" name="logremip" bind:value={log.remote_ip}>
				<label for="log-remote_port">Remote Port:</label>
				<input disabled type="text" id="log-remote_port" name="logremport" bind:value={log.remote_port}>
				<label for="log-proto">Protocol:</label>
				<input disabled type="text" id="log-proto" name="logproto" bind:value={log.proto}>
		</fieldset>
		<fieldset>
			<legend>REQUEST </legend>
				<label for="log-method">User:</label>
				<input disabled type="text" id="log-method" name="logmethod" bind:value={log.method}>
				<label for="log-uri">URI:</label>
				<input disabled type="text" id="log-uri" name="loguri" bind:value={log.uri}>
				<label for="log-status">Status:</label>
				<input disabled type="text" id="log-status" name="logstatus" bind:value={log.status}>
				<label for="log-duration">Duration (ms):</label>
				<input disabled type="text" id="log-duration" name="logduration" bind:value={log.duration}>
				<label for="log-size">Size (bytes):</label>
				<input disabled type="text" id="log-size" name="logsize" bind:value={log.size}>
				<fieldset>
					<legend>REQUEST HEADERS</legend>
					{#each headerkeys as key}
						<label for="log-header">{key}:</label>
						<input disabled type="text" id="log-header" name="logheader" bind:value={log.headers[key]}>
					{/each}
				</fieldset>
		</fieldset>
		<fieldset>
			<legend>COMMAND</legend>
				<label for="log-command">Command:</label>
				<input disabled type="text" id="log-command" name="logcommand" bind:value={log.body.command}>
				<label for="log-body-type">Type:</label>
				<input disabled type="text" id="log-body-type" name="logtype" bind:value={log.body.type}>
				<label for="log-body-version">Version:</label>
				<input disabled type="text" id="log-body-version" name="logversion" bind:value={log.body.version}>
				<fieldset>
				<legend>COMMAND OPTIONS</legend>
					{#each optionkeys as key}
						<label for="log-commnad-option">{key}:</label>
						<input disabled type="text" id="log-commnad-option" name="logoption" bind:value={log.body.options[key]}>
					{/each}
				</fieldset>
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
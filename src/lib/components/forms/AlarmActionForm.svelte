<script lang="ts">
// EXTERNAL
import {onMount} from "svelte"
import { v4 as uuidv4 } from 'uuid';
// INTERNAL 
import {getAlarmHistoryTemplate} from '../../script/utils.js'
// API
import {getAlarmHist,getDataPoints} from '../../script/apidataconfig.js'
// STORE
import {mock, module, user} from '../../ustore.js'

onMount(async () => {
		
		// GET MYSELF
		const alarmactForm = document.getElementById(modalId)
		if(alarmactForm){
			alarmactForm.addEventListener("alarmaction",async (e:any)=>{
				
				// GET NEW ALM HIST
				alarmhist = getAlarmHistoryTemplate()
				alarmactForm.style.display='block'
				uid = e.detail.uid
				originid = e.detail.originid
				// SET ALARM HISTORY
				alarmhist.alarmuid = uid
				// set alarm history status to ACK
				alarmhist.status = 'ACK'
				// set alarm history action to ACKNOWLEDGE
				alarmhist.action = 'ACKNOWLEDGE'
				// set alarm history note to empty
				alarmhist.note = ''
				// set alarm history sendto to empty
				alarmhist.sendto = ''
				// set alarm history sendtotype to chat
				alarmhist.sendtotype = 'chat'
				// set timestamp to local date time
				alarmhist.timestamp = new Date().toLocaleString()
				// set operator to user name
				alarmhist.operator = $user.username
				// set color of status divs
				const stdivs = document.getElementsByClassName('status-div')
				for(let i=0;i<stdivs.length;i++){
					const stdiv:any = stdivs[i]
					const st = stdiv.innerHTML.trim()
					stdiv.style.color = '#333'
					stdiv.style.fontWeight = 'normal'
					if(st == alarmhist.status ){
						stdiv.style.fontWeight = 'bold'
						stdiv.style.color = 'orange'
					}
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
export let modalId = "AlarmActionDiv"
export let  bgcolor = "#ddefde"
export let save = (ev:any)=>{
	const target = ev.target
	const cdev = target.dataset.cdev
	const originid = target.dataset.originid
}

let title = "ALARM ACTION PANEL"
let uid = ''
let originid = ''
let alarmhist:any = getAlarmHistoryTemplate()

let states = [
	{state:'ON',color:'red'},
	{state:'ACK',color:'orange'},
	{state:'SUS',color:'fuchsia'},
	{state:'DRP',color:'green'}
]

const setStatusColor = (ev:any,alamhist:any)=>{
	const action = ev.target
	const value = action.value.toUpperCase().trim()
	// Get all status divs
	const stdivs = document.getElementsByClassName('status-div')
	// Change div text color depending on status
	for(let i=0;i<stdivs.length;i++){
		const stdiv:any = stdivs[i]
		const st = stdiv.innerHTML.trim()
		stdiv.style.color = '#333'
		stdiv.style.fontWeight = 'normal'
		if(st == alamhist.status ){
			stdiv.style.fontWeight = 'bold'
			const found = states.find((item:any)=>{return item.state ==  alamhist.status})
			stdiv.style.color = found?found.color:'#333'
		}
		switch(st){
			case 'ON':
				if(value == 'RESUME'){
					stdiv.style.color = 'red'
					stdiv.style.fontWeight = 'bold'
					alamhist.status = st
				}
				break
			case 'ACK':
				if(value == 'ACKNOWLEDGE'){
					stdiv.style.color = 'orange'
					stdiv.style.fontWeight = 'bold'
					alamhist.status = st
				}
				break
			case 'SUS':
				if(value == 'SUSPEND'){
					stdiv.style.color = 'fuchsia'
					stdiv.style.fontWeight = 'bold'
					alamhist.status = st
				}
				break
			case 'DRP':
				if(value == 'DROP'){
					stdiv.style.color = 'green'
					stdiv.style.fontWeight = 'bold'
					alamhist.status = st
				}
				break
			default:
				break
		}
	}
}
</script>
<div class="modal" id={modalId} style="--background-color:{bgcolor}">
	<form class="device-form">
		<section>
			<h3>{title}</h3>
		</section>
		<!--svelte:component this={pointform} bind:point={point} title={title}/-->
		
		<fieldset style="display:flex;padding:10px; border:2px solid #4238ca; background:#ffffff;">
			<legend style="font-weight:bold"> Action choice </legend>
			<div style="display:block;padding:0% 10% 0% 0%">
				<h3>SET STATUS</h3>
				{#each states as status}
					<div class="status-div" id={"status-div"+status.state}>
						{status.state}
					</div>
				{/each}
			</div>
			<div style="display:block;padding:0% 10% 0% 0%">
				<h3>ACTION<span class="req">*</span></h3>
				{#each ['ACKNOWLEDGE', 'RESUME', 'SUSPEND', 'SEND', 'DROP'] as action}
					<div>
						<input
								type="radio"
								name="scoops"
								value={action}
								bind:group={alarmhist.action}
								on:click={(ev)=>{setStatusColor(ev,alarmhist)}}
						/>
						<label for="{action}">{action}</label>
					</div>
				{/each}
			</div>
			<div style="display:block;">
				<h3>ACTION PARAMS<span class="req">*</span></h3>
				{#each ['ACKNOWLEDGE', 'RESUME', 'SUSPEND', 'SEND', 'DROP'] as action}
					<div>
						 {#if action == 'SEND'}
							<label for="send-to">SEND TYPE</label>
							<select id="send-to" bind:value={alarmhist.sendtotype}>
								<option value="chat">CHAT</option>
								<option value="email">EMAIL</option>
								<option value="sms">SMS</option>
							</select>
							<label for="send-to-value">RECIPIENT</label>
							<input style="width:180px" type="text" id="send-to-value" bind:value={alarmhist.sendto}/>
						 {:else}
						 ---------
						 {/if}
					</div>
				{/each}
			</div>
		</fieldset>
		
		<fieldset style="padding:10px; border:2px solid #4238ca; background:#ffffff;">
			<legend style="font-weight:bold"> Annotation panel </legend>
			<div style="display:block;">
				<textarea id="db-query-area" rows={2} cols={90} bind:value={alarmhist.note}/>
			</div>
		</fieldset>
		<div class="button-div">
			<div><span class="req">*</span> - Required field</div>
			<div style="margin-left:auto;">
				<input class="formbutton" data-cdev={JSON.stringify(alarmhist)} data-originid={originid} type="button" value="DO ACTION" on:click={(ev)=>{save(ev)}}>
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
  padding: 4% 22% 15% 22%; /* Location of the box */
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
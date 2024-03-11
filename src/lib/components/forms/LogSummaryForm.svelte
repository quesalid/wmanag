<script lang="ts">
// EXTERNAL
import {onMount} from "svelte"
import { v4 as uuidv4 } from 'uuid';
import { writable } from "svelte/store";
// INTRNAL
import {getLogRequestedColumns,getCommandsFromLogs,aggregateLogs,logToObject} from '../../script/utils.js'
import {ComboPanel} from '../contents'
// API
import {getLogsByCommand,getLogsByUser,getLogs,getUsers} from '../../script/apisecurity.js'
// STORE
import {token, mock, currentplant} from '../../ustore.js'

let tabdatacolumns:any=[]
let dataLogByCommand:any = []
let dataLogByUser:any = []


onMount(async () => {
		// GET MYSELF
		const logSummaryForm = document.getElementById(modalId)
		if(logSummaryForm){
			logSummaryForm.addEventListener("summaryclicked",async (e:any)=>{
				/*********************************** */
				// A. GET TABLE COLUMNS
				tabdatacolumns = getLogRequestedColumns()
				//console.log("LOG SUMMARY DATA COLUMNS",tabdatacolumns)
				// B. GET LOGS
				const logFilters:any = []
				const retLogs = await getLogs(logFilters,$mock)
				const totalLogs:any=[]
				for(let i=0;i<retLogs.data.length;i++){
					const lobj = logToObject(retLogs.data[i])
					totalLogs.push(lobj)
				}
				//console.log("LOG SUMMARY TOTAL LOGS",totalLogs)
				// C. GET COMMANDS
				const commands = getCommandsFromLogs(totalLogs)
				//console.log("LOG SUMMARY COMMANDS FROM LOGS",commands)
				// D. GET USERS
				const userFilters:any = []
				const retUsers = await getUsers(userFilters,$mock)
				const users = retUsers.data
				//console.log("LOG SUMMARY USERS",users)
				// E. For each command get log set
				for(let i=0;i< commands.length;i++){
					const command = commands[i]
					const commLogs:any = []
					const retCommLogs = await getLogsByCommand(command,$mock)
					for(let i=0;i<retCommLogs.data.length;i++){
						const lobj = logToObject(retCommLogs.data[i])
						commLogs.push(lobj)
					}
					const commLog = aggregateLogs(commLogs)
					if(commLog)
						dataLogByCommand.push(commLog)
				}
				// F. For each user get log set
				for(let i=0;i< users.length;i++){
					const user = users[i].username
					const userLogs:any = []
					const retUserLogs = await getLogsByUser(user,$mock)
					for(let i=0;i<retUserLogs.data.length;i++){
						const lobj = logToObject(retUserLogs.data[i])
						userLogs.push(lobj)
					}
					const userLog = aggregateLogs(userLogs)
					if(userLog)
						dataLogByUser.push(userLog)
				}
				dataLogByCommand = dataLogByCommand
				dataLogByUser = dataLogByUser
				console.log("LOGS BY COMMAND",dataLogByCommand)
				console.log("LOGS BY USER",dataLogByUser)
				/*********************************** */
				
				// SEND EVENT TO COMBO PANEL(S)
				const comboLogCom = document.getElementById(uid)
				const summaryClicked = new CustomEvent("summaryclicked", { detail: 'NONE' })
				comboLogCom?.dispatchEvent(summaryClicked)
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
let uid = uuidv4()


</script>
<div class="modal" id={modalId} style="--background-color:{bgcolor};--padding:{padding}">
	<form class="device-form">
		<section>
			<h3>{title}</h3>
		</section>
		<ComboPanel tabdatacolumns={tabdatacolumns} bind:data={dataLogByCommand} id={uid}/>
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
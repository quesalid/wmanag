<script lang="ts">
// EXTERNAL
import {onMount} from "svelte"
// INTERNAL 
import {getAgentTemplate} from '../../script/utils.js'
import {AgentDataForm,AgentAiForm,AgentLearnForm,AgentCloneForm} from './'
// API
import {getAgents} from '../../script/apidataconfig.js'
// STORE
import {mock, module} from '../../ustore.js'

onMount(async () => {
		// GET MYSELF
		const agentForm = document.getElementById(modalId)
		if(agentForm){
			agentForm.addEventListener("editclicked",async (e:any)=>{
				agentForm.style.display='block'
				uid = e.detail
				// GET DEVICES
				const filters:any = [{uid:uid,_type:'eq'},{module:$module.toUpperCase(),_type:'eq'}]
				const ret = await getAgents(filters,$mock)
				const found = ret.data.find((item:any)=> {return(item.uid == uid)})
				if(found){
					agent = found
					const name = agent?agent.name:''
					title = "AGENT "+name
				}
				else{
					agent = newagent
					title = "AGENT "+$module
				}
				// SELECT AGENT FOEM
				switch($module.toUpperCase()){
					case 'DATA':
						agentform = AgentDataForm
						break;
					case 'CLONE':
						agentform = AgentCloneForm
						break;
					case 'AI':
						agentform = AgentAiForm
						break;
					case 'LEARN':
						agentform = AgentLearnForm
						break;
				}
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
export let modalId = "AgentInputDiv"
export let  bgcolor = "#ddefde"
export let save = (ev:any)=>{
	const target = ev.target
	const cdev = target.dataset.cdev
	console.log("SAVE AGENT: ",uid)
}
export let mod = 'DATA'


let newagent = getAgentTemplate(mod.toUpperCase())
let agent = newagent
let title = "AGENT "+ mod
let uid = ''
let agentform = AgentDataForm

</script>
<div class="modal" id={modalId} style="--background-color:{bgcolor}">
	<form class="device-form">
		<section>
			<h3>{title}</h3>
		</section>
		<svelte:component this={agentform} bind:agent={agent} title={title}/>
		<div class="button-div">
			<div><span class="req">*</span> - Required field</div>
			<div style="margin-left:auto;">
				<input class="formbutton" data-cdev={JSON.stringify(agent)} type="button" value="SAVE" on:click={save}>
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
  padding: 10%; /* Location of the box */
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
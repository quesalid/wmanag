<script lang="ts">
// EXTERNAL
import {onMount} from "svelte"
// INTRNAL
import {getDeviceTemplate} from '../../script/utils.js'
// API
import {getAgents} from '../../script/apidataconfig.js'
// STORE
import {token, mock, currentplant} from '../../ustore.js'

onMount(async () => {
		//console.log("DATA FORM", agent)
	});



export let devices:any = []

const fieldSetClick = (ev:any) =>{
	const target = ev.target
	// HIDE ALL cont-div-agent
	const divAgents = document.getElementsByClassName('cont-div-agent') as HTMLCollectionOf<HTMLElement>
	for (const c of divAgents) {
		if(c.id !=  "cont-div-"+ev.target.id)
			c.style.display = 'none'
	}
	
	// TOGGLE target div-agent
	const divClickedId = "cont-div-"+ev.target.id
	const divClicked = document.getElementById(divClickedId)
	if(divClicked){
		if(divClicked.style.display == 'block')
			divClicked.style.display = 'none'
		else
			divClicked.style.display = 'block'
	}
}

</script>
	<section class="device-form">
		{#each devices as device}
			<fieldset style="padding:10px; border:2px solid #4238ca; background:#f5f5f5;">
			<legend>DEVICE {device.name}</legend>
			<label class='info-device' for="device-name">Name:</label>
			<input disabled class='info-device' type="text" id="device-name" name="name" value={device.name}>
			<label class='info-device' for="device-description">Description:</label>
			<input disabled class='info-device' type="text" size="30" id="device-description" name="description" value={device.description}>
			{#if device.agents}
				{#each device.agents as agent}
					<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<fieldset id="{agent.uid}" style="padding:10px; border:2px solid #4238ca; background:#f9f9f9;" on:click={fieldSetClick}>
						<legend>AGENT {agent.name}</legend>
						<label class='info-agent' for="agent-name">Name:</label>
						<input class='info-agent' disabled type="text" id="agent-name" name="name" value={agent.name}>
						<label class='info-agent' for="agent-description">Description:</label>
						<input class='info-agent' disabled type="text" size="30" id="agent-description" name="description" value={agent.description}>
						<label class='info-agent' for="agent-type">Type:</label>
							<input class='info-agent' disabled type="text" size="30" id="agent-type" name="type" value={agent.type}>
						<div id={"cont-div-"+agent.uid} class="cont-div-agent">
						{#if agent.machines}
							{#each agent.machines as machine}
								<fieldset style="padding:10px; border:2px solid #4238ca; background:#ffffff;">
									<legend>MACHINE {machine.name}</legend>
									<label class='info-machine' for="machine-name">Name:</label>
									<input class='info-machine' size='15' disabled type="text" id="machine-name" name="name" value={machine.name}>
									<label class='info-machine' for="machine-type">Type:</label>
									<input class='info-machine' size='15' disabled type="text" id="machine-type" name="type" value={machine.type}>
									<label class='info-machine' for="machine-manufacturer">Manufacturer:</label>
									<input class='info-machine' size='15' disabled type="text" id="machine-manufacturer" name="manufacturer" value={machine.manufacturer}>
									<label class='info-machine' for="machine-model">Model:</label>
									<input class='info-machine' size='15' disabled type="text" id="machine-model" name="model" value={machine.model}>
								</fieldset>
							{/each}
						{/if}
						</div>
					</fieldset>
				{/each}
			{/if}
			</fieldset>
		{/each}
	</section>
<style>

.device-form{
	color: #444;
	background-color: #fff;
	padding:0.4em;
	border-radius: 10px;
}
section{
	margin: 3px;
}
fieldset {
	color: #999;
	border: 1px solid;
	border-radius: 2px;
	margin: 3px;
}
label{
	color: #444;
	margin: 3px;
	font-weight:600 ;
}
input{
	color: #444;
}
select{
	color: #444;
}
legend{
	margin-left:5px;
}
.info-device {
  background: #f5f5f5;
}
.info-agent {
  background: #f9f9f9;
}
.cont-div-agent{
	display:none;
}
</style>
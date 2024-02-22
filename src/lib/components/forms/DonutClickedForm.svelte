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

</script>
	<section class="device-form">
		{#each devices as device}
			<fieldset style="padding:10px; border:2px solid #4238ca; background:#f5f5f5;">
			<legend>DEVICE {device.name}</legend>
			<label class='info-device' for="device-name">Name:</label>
			<input class='info-device' type="text" id="device-name" name="name" bind:value={device.name}>
			<label class='info-device' for="device-description">Description:</label>
			<input class='info-device' type="text" size="30" id="device-description" name="description" bind:value={device.description}>
			{#if device.agents}
				{#each device.agents as agent}
					<fieldset style="padding:10px; border:2px solid #4238ca; background:#ffffff;">
						<legend>AGENT {agent.name}</legend>
						<label for="agent-name">Name:</label>
						<input type="text" id="agent-name" name="name" bind:value={agent.name}>
						<label for="agent-description">Description:</label>
						<input type="text" size="30" id="agent-description" name="description" bind:value={agent.description}>
						<label for="agent-type">Type:</label>
						<input type="text" size="30" id="agent-type" name="type" bind:value={agent.type}>
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
</style>
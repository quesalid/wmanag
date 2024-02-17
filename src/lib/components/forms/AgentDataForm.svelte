<script lang="ts">
// EXTERNAL
import {onMount} from "svelte"
// INTRNAL
import {getDeviceTemplate} from '../../script/utils.js'
// API
import {getDevices} from '../../script/apidataconfig.js'
// STORE
import {token, mock, currentplant} from '../../ustore.js'

onMount(async () => {
		//console.log("DATA FORM", agent)
	});




// EXPORTS
export let agent:any
export let title:any


</script>
	<section class="device-form">
		<fieldset>
			<legend>IDENTIFICATION</legend>
			<label for="agent-name">Name<span class="req">*</span>:</label>
			<input type="text" id="agent-name" name="name" bind:value={agent.name}>
			<label for="agent-type">Type<span class="req">*</span>:</label>
			<select name="type" id="agent-type" bind:value={agent.type}>
				<option value="SCANNER">SCANNER</option>
				<option value="HIST">HIST</option>
			</select>
			<label for="agent-description">Description:</label>
			<input type="text" size="35" id="agent-description" name="description" bind:value={agent.description}>
		</fieldset>
		<fieldset>
			<legend>SOURCE</legend>
			<label for="agent-source-name">Name<span class="req">*</span>:</label>
			<input type="text" id="agent-source-name" name="source-name" bind:value={agent.source.name}>
			<label for="agent-source-host">IP<span class="req">*</span>:</label>
			<input type="text" id="agent-source-host" name="source-host" bind:value={agent.source.server}>
			<label for="agent-source-port">Port<span class="req">*</span>:</label>
			<input type="text" id="agent-source-port" name="source-port" bind:value={agent.source.port}>
			<label for="agent-source-driver">Driver<span class="req">*</span>:</label>
			<select name="type" id="agent-source-driver" bind:value={agent.source.driver}>
				<option value="s7">s7</option>
				<option value="mqtt">mqtt</option>
				<option value="ip">eth/ip</option>
				<option value="modbus">modbus</option>
				<option value="mqtt">opcua</option>
			</select>
			<fieldset style="margin:6px;">
				<legend>security</legend>
				<label for="agent-source-username">Username:</label>
				<input type="text" id="agent-source-username" name="source-usernamename" bind:value={agent.source.username}>
				<label for="agent-source-password">Password:</label>
				<input type="password" id="agent-source-password" name="source-password" bind:value={agent.source.password}>
			</fieldset>
		</fieldset>
		<fieldset>
			<legend>DESTINATION</legend>
			<label for="agent-destination-name">Name<span class="req">*</span>:</label>
			<input type="text" id="agent-destination-name" name="destination-name" bind:value={agent.destination.name}>
			<label for="agent-destination-host">IP<span class="req">*</span>:</label>
			<input type="text" id="agent-destination-host" name="destination-host" bind:value={agent.destination.server}>
			<label for="agent-destination-port">Port<span class="req">*</span>:</label>
			<input type="text" id="agent-destination-port" name="destination-port" bind:value={agent.destination.port}>
			<label for="agent-destination-driver">Driver<span class="req">*</span>:</label>
			<select name="type" id="agent-destination-driver" bind:value={agent.destination.driver}>
				<option value="mqtt">mqtt</option>
				<option value="pirest">osipirest</option>
				<option value="opcua">opcua</option>
				<option value="craterest">craterest</option>
			</select>
			<fieldset style="margin:6px;">
				<legend>security</legend>
				<label for="agent-destination-username">Username:</label>
				<input type="text" id="agent-destination-username" name="destination-username" bind:value={agent.destination.username}>
				<label for="agent-destination-password">Password:</label>
				<input type="password" id="agent-destination-password" name="destination-password" bind:value={agent.destination.password}>
			</fieldset>
		</fieldset>
		{#if agent.type == 'SCANNER'}
		<fieldset>
			<legend>FIELD DATABASE</legend>
			{#each agent.dbs as db}
				<label for="agent-db-name">Filename<span class="req">*</span>:</label>
				<input type="text" id="agent-db-name" name="db-name" bind:value={db.name}>
			{/each}
		</fieldset>
		{/if}
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
.req {
  color: red;
}
</style>
<script lang="ts">
// EXTERNAL
import {onMount} from "svelte"
// INTRNAL
import {getDeviceTemplate} from '../../script/utils.js'
// API
import {getDevices} from '../../script/apidataconfig.js'
// STORE
import {token, mock, currentmainentity} from '../../ustore.js'

onMount(async () => {
		
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
			<label for="agent-type">Type:</label>
			<select name="type" id="agent-type" bind:value={agent.type}>
				<option value="PLAYER_FREEZE-DRYER">FREEZE-DRYER</option>
				<option value="PLAYER_PREPARER">PREPARER</option>
				<option value="PLAYER_FILLER">FILLER</option>
				<option value="PLAYER_GRANULATOR">GRANULATOR</option>
				<option value="PLAYER_AUTOCLAVE">AUTOCLAVE</option>
				<option value="PLAYER_OVEN">OVEN</option>
				<option value="PLAYER_PASSBOX">PASSBOX</option>
				<option value="PLAYER_PACKAGER">PACKAGER</option>
			</select>
			<label for="agent-description">Description:</label>
			<input type="text" id="agent-description" name="description" bind:value={agent.description}>
		</fieldset>
		<fieldset>
			<legend>MODEL</legend>
			<label for="agent-model-name">Name<span class="req">*</span>:</label>
			<input type="text" id="agent-model-name" name="name" bind:value={agent.model.name}>
			<label for="agent-model-path">Model<span class="req">*</span>:</label>
			<input size="30" type="text" id="agent-model-path" name="path" bind:value={agent.model.path}>
		</fieldset>
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
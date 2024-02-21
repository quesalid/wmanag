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
export let plant:any
export let departments:any = []

</script>
	<section class="plant-form">
		<fieldset>
			<legend>IDENTIFICATION</legend>
			<label for="plant-name">Name:</label>
			<input type="text" id="palnt-name" name="name" bind:value={plant.name}>
			<label for="plant-description">Description:</label>
			<input type="text" size="20" id="plant-description" name="description" bind:value={plant.description}>
			<label for="plant-address">Address:</label>
			<input type="text" size="20" id="plant-address" name="address" bind:value={plant.address}>
			<label for="plant-label">Code:</label>
			<input type="text" size="20" id="plant-label" name="address" bind:value={plant.label}>
		</fieldset>
		<fieldset>
			<legend>DEPARTMENTS</legend>
			{#each departments as dept}
				<label for="department-name">Name:</label>
				<input type="text" id="department-name" name="name" bind:value={dept.name}>
				<label for="department-description">Description:</label>
				<input type="text" size="20" id="department-description" name="description" bind:value={dept.description}>
			{/each}
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
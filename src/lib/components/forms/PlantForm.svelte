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
		<fieldset style="padding:10px; border:2px solid #4238ca; background:#ffffff;">
			<legend>IDENTIFICATION</legend>
			<label for="plant-name">Name:</label>
			<input type="text" size="20"  id="palnt-name" name="name" bind:value={plant.name}>
			<label for="plant-description">Description:</label>
			<input type="text" size="15" id="plant-description" name="description" value={plant.description}>
			<label for="plant-address">Address:</label>
			<input type="text" size="20" id="plant-address" name="address" value={plant.address}>
			<label for="plant-label">Code:</label>
			<input type="text" size="15" id="plant-label" name="address" value={plant.label}>
		</fieldset>
		<fieldset style="padding:10px; border:2px solid #4238ca; background:#ffffff;">
			<legend>DEPARTMENTS</legend>
			{#each departments as dept}
				<label for="department-name">Name:</label>
				<input type="text" size="15"  id="department-name" name="name" value={dept.name}>
				<label for="department-description">Description:</label>
				<input type="text" size="17" id="department-description" name="description" value={dept.description}>
				<fieldset>
					<legend>LINES</legend>
					{#if dept.lines}
						{#each dept.lines as line}
							<label for="line-name">Name:</label>
							<input type="text" id="line-name" name="name" value={line.name}>
							<label for="line-description">Description:</label>
							<input type="text" size="15" id="line-description" name="description" value={line.description}>
						{/each}
					{/if}
				</fieldset>
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
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


const changeAnnotation = (ev:any)=>{
	const target = ev.target
	const uid = target.id.split("-")[1]
	console.log("change Annotation id",uid)
}

// EXPORTS
// EXPORTS
export let point:any
export let title:any


</script>
	<section class="device-form">
		<fieldset>
			<legend>IDENTIFICATION</legend>
			<label for="point-tag">Tag<span class="req">*</span>:</label>
			<input disabled type="text" id="point-tag" name="tag" bind:value={point.tag}>
			<label for="point-description">Description:</label>
			<input disabled type="text" id="point-description" name="description" bind:value={point.description}>
		</fieldset>
		<fieldset>
			<legend>PROCESS</legend>
			<label for="point-startdate">Start Date:</label>
			<input disabled type="datetime-local" id="point-startdate" name="startdate" bind:value={point.startdate}>
			<label for="point-enddate">End Date:</label>
			<input disabled type="datetime-local" id="point-enddate" name="enddate" bind:value={point.enddate}>
		</fieldset>
	    <fieldset>
			<legend>ANNOTATIONS</legend>
			{#each point.annotations as annotation}
				<label for="point-enddate">Annotation:</label>
				<input type="textarea" id={"annotation-"+annotation.uid} name="annotation" on:change={changeAnnotation}>
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
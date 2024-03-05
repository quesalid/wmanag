<script lang="ts">

export let phase:any ={}
</script>

<section class="phase-form">
		<fieldset style="padding:10px; border:2px solid #4238ca; background:#ffffff;">
			<legend>PHASE IDENTIFICATION</legend>
			<label for="phase-tag">Tag:</label>
			<input disabled type="text" size="20"  id="phase-tag" name="tage" bind:value={phase.tag}>
			<label for="phase-description">Description:</label>
			<input disabled type="text" size="30" id="phase-description" name="description" value={phase.description}>
			<label for="phase-type">Type:</label>
			<input disabled type="text" size="30" id="phase-type" name="type" value={phase.type}>
		</fieldset>
		<fieldset style="padding:10px; border:2px solid #4238ca; background:#ffffff;">
			<legend>PHASE RUN</legend>
			<label for="phase-start">StartDate:</label>
			<input disabled type="text" size="20"  id="phase-start" name="tage" bind:value={phase.startdate}>
			<label for="phase-start">EndDate:</label>
			<input disabled type="text" size="20"  id="phase-start" name="tage" bind:value={phase.enddate}>
			<label for="phase-start">Status:</label>
			<input disabled type="text" size="20"  id="phase-start" name="tage" bind:value={phase.status}>
		</fieldset>
	</section>

<style>
.phase-form{
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
</style>
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
			<label for="phase-point">Batch:</label>
			<input disabled type="text" size="20" id="phase-point" name="point" value={phase.point}>
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
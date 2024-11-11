<script lang="ts">

export let section:any = {name:null,image:null}


const onClickInfo = (ev:any) => {
	console.log("TWIN",section)
}

const onClickSimulation = (ev:any) => {
	console.log("TWIN",section)
}

const onClickStats = (ev:any) => {
	console.log("TWIN",section)
}

</script>
 <div class="twin-class">
	 <div class="twin-class-header">
		<input class="button-header" type="button" id={"twin-info-button"} value="Info" on:click={onClickInfo}/>
		<input class="button-header" type="button" id={"twin-sim-button"} value="Simulation" on:click={onClickSimulation}/>
		<input class="button-header" type="button" id={"twin-stats-button"} value="Stats" on:click={onClickStats}/>
	</div>
	<div class="twin-class-body">
		<div class="twin-class-image">
			<img src="{"/acea/"+section.image}" width='450' alt="twin" />
		</div>
		<div class="twin-class-model">
			{#if section.twin}
				<div>Twin uid: {section.twin.uid}</div>
				<fieldset style="padding:10px; border:2px solid #4238ca; background:#ffffff; width:98%;">
					<legend style="font-weight:bold"> Model</legend>
				{#each Object.keys(section.twin.model) as key}
					<div>{key}: {section.twin.model[key]}</div>
				{/each}
				</fieldset>
			{/if}
		</div>
	</div>
 </div>

<style>
.twin-class{
	display: block;
}
.twin-class-header{
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	height: 10%;
	margin-bottom: 3px;
}
.twin-class-body{
	display: flex;
	flex-direction: row;
	justify-content:flex-start;
	height: 90%;
	
}
.twin-class-model{
	padding: 10px;
	width: 50%;
}
.button-header{
	cursor:pointer;
	margin-top: 8px;
	border:1px solid #555; 
	border-radius: 3px; 
	background-color:#777; 
	color:#fff;
	font-weight:bold;
	margin-right: 3px;
	padding: 2px;
}
</style>
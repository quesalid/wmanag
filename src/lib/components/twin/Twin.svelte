<script lang="ts">
import { onMount } from 'svelte';
import TwinStats from './TwinStats.svelte';
import  TwinImage  from './TwinImage.svelte';
export let section:any = {name:null,image:null}

let showInfo = true;
let showSimulation = false;
let showStats = false;

const setButtonStyle = (buttonId:string, color:string) => {
	const button = document.getElementById(buttonId);
	if(button){
		button.style.color = color;
	}
}

const highlightButton = (buttonId:string) => {
	setButtonStyle("twin-info-button", "#fff");
	setButtonStyle("twin-sim-button", "#fff");
	setButtonStyle("twin-stats-button", "#fff");
	setButtonStyle(buttonId, "#FF0");
}

onMount(() => {
	console.log("TWIN",section)
	showInfo = true;
	showSimulation = false;
	showStats = false;
	highlightButton("twin-info-button");
	
})

const onClickInfo = (ev:any) => {
	console.log("TWIN",section)
	showInfo = true;
	showSimulation = false;
	showStats = false;
	highlightButton("twin-info-button");
	section = section
}

const onClickSimulation = (ev:any) => {
	console.log("TWIN",section)
	showInfo = false;
	showSimulation = true;
	showStats = false;
	highlightButton("twin-sim-button");
}

const onClickStats = (ev:any) => {
	console.log("TWIN",section)
	showInfo = false;
	showSimulation = false;
	showStats = true;
	highlightButton("twin-stats-button");
}

</script>
 <div class="twin-class">
	 <div class="twin-class-header">
		<input class="button-header" type="button" id={"twin-info-button"} value="Info" on:click={onClickInfo}/>
		<input class="button-header" type="button" id={"twin-sim-button"} value="Simulation" on:click={onClickSimulation}/>
		<input class="button-header" type="button" id={"twin-stats-button"} value="Stats" on:click={onClickStats}/>
	</div>
	<div class="twin-class-body">
		{#if showInfo}
			<TwinImage bind:section={section}/>
		{/if}
		{#if showSimulation}
			<div class="twin-class-model">
				SIMULATION
			</div>
		{/if}
		{#if showStats}
			<div class="twin-class-model">
				<TwinStats bind:sectionName={section.name}/>
			</div>
		{/if}
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
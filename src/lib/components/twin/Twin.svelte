<script lang="ts">
import { onMount } from 'svelte';
import TwinStats from './TwinStats.svelte';
import  TwinRun  from './TwinRun.svelte';
import TwinModel from './TwinModel.svelte';
export let section:any = {name:null,image:null}
export let twinClassId = "twin-class-id";

let showModel = false;
let showSimulation = true;
let showStats = false;

const setButtonStyle = (buttonId:string, color:string) => {
	const button = document.getElementById(buttonId);
	if(button){
		button.style.color = color;
	}
}

const highlightButton = (buttonId:string) => {
	setButtonStyle("twin-model-button", "#fff");
	setButtonStyle("twin-sim-button", "#fff");
	setButtonStyle("twin-stats-button", "#fff");
	setButtonStyle(buttonId, "#FF0");
}

onMount(() => {
	console.log("TWIN",section)
	showModel = false;
	showSimulation = true;
	showStats = false;
	highlightButton("twin-sim-button");
	// add event listenet to show twin
	const twin = document.getElementById(twinClassId);
	twin?.addEventListener('show', (e:any) => {
		console.log("TWIN",section)
		showModel = false;
		showSimulation = true;
		showStats = false;
		highlightButton("twin-sim-button");
	})
	
})

const onClickModel = (ev:any) => {
	console.log("TWIN Model",section)
	showModel = true;
	showSimulation = false;
	showStats = false;
	highlightButton("twin-model-button");
	section = section
}

const onClickSimulation = (ev:any) => {
	console.log("TWIN Simulation",section)
	showModel = false;
	showSimulation = true;
	showStats = false;
	highlightButton("twin-sim-button");
}

const onClickStats = (ev:any) => {
	console.log("TWIN Stats",section)
	showModel = false;
	showSimulation = false;
	showStats = true;
	highlightButton("twin-stats-button");
}


</script>
 <div class="twin-class" id={twinClassId}>
	 <div class="twin-class-header">
		<input class="button-header" type="button" id={"twin-sim-button"} value="Run" on:click={onClickSimulation}/>
		<input class="button-header" type="button" id={"twin-model-button"} value="Model" on:click={onClickModel}/>
		<input class="button-header" type="button" id={"twin-stats-button"} value="Stats" on:click={onClickStats}/>
	</div>
	<div class="twin-class-body">
		{#if showSimulation}
			<TwinRun bind:section={section}/>
		{/if}
		{#if showModel}
			<div class="twin-class-model">
				<TwinModel bind:section={section}/>
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
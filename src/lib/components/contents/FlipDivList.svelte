<script lang="ts">

import FlipDiv from "./FlipDiv.svelte";
import { onMount } from "svelte";

const sleep = function (ms:any) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


export let agents:any = []
export let dragelem = {}
export let device = "DEFAULTSERVER"
export let startAgent = async (agent:any)=>{console.log("START AGENT",agent.agent),await sleep(2000)}
export let stopAgent = async (agent:any)=>{console.log("STOP AGENT",agent.agent),await sleep(2000)}
export let deployAgent = async (agent:any)=>{console.log("DEPLOY AGENT",agent.agent),await sleep(2000)}
export let undeployAgent = async (agent:any)=>{console.log("UNDEPLOY AGENT",agent.agent),await sleep(2000)}


</script>


	<div class="flipdivlistheader">
		<div class="flipdivlist-header left">
			<div class="flipdivlist-header-left">
				<div class="flipdivlist-header-left-title">
					<h3>CONFIGURATORE</h3>
				</div>
				<div class="flipdivlist-header-left-subtitle">
					<h4>Lista degli agent installabili</h4>
				</div>
			</div>
		</div>
		<div class="flipdivlist-header right">
			<div class="flipdivlist-header-right">
				<div class="flipdivlist-header-right-title" style="text-align:center ;">
					<h3>EDGE <span style="color:#444444;font-weight:650;">{device}</span></h3>
				</div>
				<div class="flipdivlist-header-right-subtitle">
					<h4>Lista degli agent installati</h4>
				</div>
			</div>"
		</div>
	</div>
	<div class="flipdivlist">
	{#each agents as agent}
			<FlipDiv 
				bind:agent={agent} 
				dragelem={dragelem}
				{startAgent}
				{stopAgent}
				{deployAgent}
				{undeployAgent}
			/>
	{/each}
	</div>

	
<style>
.flipdivlist-header{
	display:flex;
	flex-direction:row;
	justify-content:space-evenly;
	color: #777;
}
.flipdivlist-header-left{
	display:flex;
	flex-direction:column;
	justify-content:center;
	padding-right: 100px;
}
.flipdivlist-header-right{
	display:flex;
	flex-direction:column;
	justify-content:center;
	padding-right: 20px;
}
.flipdivlist-header-left-title{
	display:flex;
	flex-direction:row;
	justify-content:center;
}
.flipdivlist-header-left-subtitle{
	display:flex;
	flex-direction:row;
	justify-content:center;
}
.flipdivlist-header-right-title{
	display:flex;
	flex-direction:row;
	justify-content:center;
}
.flipdivlist-header-right-subtitle{
	display:flex;
	flex-direction:row;
	justify-content:center;
}
.flipdivlist-header-left-title h3{
	margin:0px;
}
.flipdivlist-header-left-subtitle h4{
	margin:0px;
}
.flipdivlist-header-right-title h3{
	margin:0px;
}
.flipdivlist-header-right-subtitle h4{
	margin:0px;
}
.flipdivlist{
	display:block;
	overflow-y:scroll;
	overflow-x: none ;
	max-height: 500px;
	width:100%;

}
.flipdivlistheader{
	display:flex;
	overflow-x: none ;
	max-height: 500px;
	width:100%;
	justify-content:space-evenly;
	margin-bottom: 10px;
	margin-top: 10px;

}
</style>
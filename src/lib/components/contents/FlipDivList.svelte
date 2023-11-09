<script lang="ts">

import FlipDiv from "./FlipDiv.svelte";
import { onMount } from "svelte";
import { sleep } from "../../script/api";

export let scanners = [
	{
		agent: "SCANNER01",
		type: "SCANNER",
		description: "Scanner for L2-M17",
		source:"s7-127.0.0.1:502",
		destination:"mqtt-127.0.0.1:8883",
		loaded:false,
		instore:true,
	},
	{
		agent: "HIST01",
		type: "HIST",
		description: "Historian for L2-M17",
		source:"mqtt-127.0.0.1:8883",
		destination:"https://pirest:8080",
		loaded:true,
		instore:true
	},
	{
		agent: "SCANNER02",
		type: "SCANNER",
		description: "Scanner for AUT-01",
		source:"modbus-127.0.0.1:108",
		destination:"mqtt-127.0.0.1:8883",
		loaded:true,
		instore:false
	},
]

export let dragelem = {}
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
					<h3>EDGE</h3>
				</div>
				<div class="flipdivlist-header-right-subtitle">
					<h4>Lista degli agent installati</h4>
				</div>
			</div>"
		</div>
	</div>
	<div class="flipdivlist">
	{#each scanners as scanner}
			<FlipDiv {scanner} dragelem={dragelem}/>
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
<script lang="ts">
// https://echarts.apache.org/examples/en/editor.html?c=doc-example%2Ftutorial-dynamic-data 
// EXTERNAL
import { onMount } from 'svelte';
import * as echarts from "echarts";
// INTERNAL
import Switch from '../switch/Switch.svelte'
import { option, startSim, stopSim } from './chartoptions'

export let section:any

const colorReal = '#f55';
const colorSimulated = '#2196F3';
let statusvar = 'Real';
let startvar = false;
let myChart:any;

 
 onMount(() => {
	var chartDom = document.getElementById('chart-div-id');
	myChart = echarts.init(chartDom);
	option && myChart.setOption(option);
 
     stopSim(myChart);
  });

const statusChange = (ev: any) => {
	// change status div color and text
	const status:any = document.querySelector('.status');
	if(status){
		// when change status, stop the simulation
		const playpause:any = document.querySelector('.play-pause');
		if(playpause){
			playpause.src = 'StartStop.png';
			startvar = false;
			stopSim(myChart);
		}
		if(ev.target.checked){
			status.innerHTML = 'Simulated';
			status.style.color = colorSimulated;
			statusvar = 'Simulated';
		}else{
			status.innerHTML = 'Real';
			status.style.color = colorReal
			statusvar = 'Real';
		}
	}
};

const startStop = (ev: any) => {
	// change status div color and text
	const playpause:any = document.querySelector('.play-pause');
	if(playpause){
		if(startvar){
			playpause.src = 'StartStop.png';
			startvar = false;
			stopSim(myChart);
		}else{
			playpause.src = 'StartStopOn.png';
			startvar = true;
			startSim(myChart);
		}
	}
};

$: {
		if(section){
			// session changed, stop the simulation, reset the status to real and the switch
			const playpause:any = document.querySelector('.play-pause');
			if(playpause){
				playpause.src = 'StartStop.png';
				startvar = false;
			}
			const status:any = document.querySelector('.status');
			if(status){
				status.innerHTML = 'Real';
				status.style.color = colorReal;
				statusvar = 'Real';
			}
			const switchvar:any = document.querySelector('.switch input');
			if(switchvar){
				switchvar.checked = false;
			}
		}
	}
</script>
		<div class="twin-run-main" >
			<div class="twin-run-header">
				<div class="controls">
					<div class="status">Real</div>
					<label class="switch">
						<input type="checkbox" on:change={statusChange}>
						<span class="slider round"></span>
					</label>
					<input type="image" width="30" src="StartStop.png" alt="Play" class="play-pause" on:click={startStop}/>
					<div class="progress-bar">
						 <!--div class="scrubber"></!--div-->
					</div>
					<!--button class="fullscreen">Fullscreen</!--button-->
					<slot></slot>
				</div>
			</div>
			<div class="div-run-body">
				<div class="e-chart-class" id="chart-div-id"></div> 
			</div>
			<div class="div-run-footer">
			</div>
		</div>
<style>

.controls{
	display:flex;
	border-bottom: 1px solid #999;
	padding: 2px;
}

.status{
	margin-top: 2px;
	min-width: 7vw;
	height: 1.3vw;
	text-align: center;
	font-weight: 700;
	color: #f55;
	font-size: larger;
	padding-bottom: 4px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 2.7vw;
  height: 1.3vw;
  margin-top: 5px;
  margin-right: 6px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f99;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 1.2vw;
  width: 1.2vw;
  left: 3px;
  bottom: 1px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(1.2vw);
  -ms-transform: translateX(1.2vw);
  transform: translateX(1.2vw);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.e-chart-class {
  min-width:800px;
  min-height: 400px; /* Assicurati che il contenitore abbia una dimensione fissa */
  padding: 10px;
  resize: both;
}

</style>
<script lang='ts'>
import * as echarts from 'echarts';
import { onMount } from 'svelte';

import * as theme from './chalkproject.json'
import { getOptionTmech, getOptionHistoric, getOptionDistribution, getOptionPolar} from './assetoptions'
import SagGrid from './SagGrid.svelte'

let option:any
let myChart:any



onMount(() => {
	let chartDom = document.getElementById('chartmain');
    const chalk = theme.theme;
    echarts.registerTheme('chalk', chalk);
	myChart = echarts.init(chartDom,'chalk');
    option = getOptionTmech(titletext,legendData,6,12,45,35);
	
    myChart.on('timelinechanged', function (params:any) {
        const currentIndex = params.currentIndex; // Ottieni l'indice selezionato nella timeline
        const timeKey = option.timeline.data[currentIndex]; // Ottieni la chiave temporale (es. '7:00')
        const xdata = option.xAxis.data;
        // ottieni i dati per l'indice selezionato
        let xdataIndex = getIndex(xdata,timeKey);
        // per ogni serie i dati della sottoserie ed aggiorna il grafico
        let subseries = [];
        const series = option.series;
        for (let i = 0; i < series.length; i++) {
            // controlla che non sia la serie dei markers
            if (series[i].name == 'markers') continue;
            let subserie = {name:series[i].name,type:series[i].type,data:getSubSeries(series[i],xdataIndex)}
            subseries.push(subserie);
		}
        // riaggiungi la serie dei markers
        const markerSerie = option.series[option.series.length-1];
        subseries.push(markerSerie);
        myChart.setOption({
			series: subseries
		});
       
    });
	myChart.setOption(option);
});

// exports
export let titletext = "Tensione 8h (kN)";
export let width = '60vw';
export let height = '80vh';
export let showSag = false;
export let winid = 'defaultAssetGraphManager';


// data una serie ed un indice torna una sottoserie compresa tra 0 e l'indice
const getSubSeries = (series:any, index:number) => {
	let subseries = [];
	subseries = series.data.slice(0,index);
	return subseries;
}

// dato un arreay di punti xdata ed un punto, torna l'indice del punto
const getIndex = (xdata:any, point:any) => {
	let index = xdata.indexOf(point);
	return index;
}

let selectedChart = "tmech";
let legendData = [
	{name:'4A',textStyle:{color:'white'}}, 
	{name:'4B',textStyle:{color:'white'}}, 
	{name:'8A',textStyle:{color:'white'}},
	{name:'8B',textStyle:{color:'white'}},
	{name:'12A',textStyle:{color:'white'}},
	{name:'12B',textStyle:{color:'white'}},
]

const changeGraph = () => {
    const historicdata = legendData.map((item) => {return item.name})
	// get sag-grid-class-component
	const SagGrid = document.querySelector('#sag-grid-id');
	// register with winid
	const regEvent = new CustomEvent('register', {detail:'sag-grid-id'});
	const win = document.getElementById(winid);
	win?.dispatchEvent(regEvent);
    switch(selectedChart){
		case "tmech":
			showSag = false;
			option = getOptionTmech(titletext,legendData,6,12,45,35);
			break;
		case "historic":
			showSag = false;
            option = getOptionHistoric(historicdata,'2024-01-01');
			break;
		case "distribution":
			showSag = false;
			option = getOptionDistribution();
			break;
		case "polar":
			showSag = false;
			option = getOptionPolar();
			break;
		case "sag":
			showSag = true;
			break;
    }
    if(myChart)
        myChart.dispose();
    myChart = echarts.init(document.getElementById('chartmain'),'chalk');
    if(option.timeline){
		myChart.on('timelinechanged', function (params:any) {
			const currentIndex = params.currentIndex; // Ottieni l'indice selezionato nella timeline
			const timeKey = option.timeline.data[currentIndex]; // Ottieni la chiave temporale (es. '7:00')
			const xdata = option.xAxis.data;
			// ottieni i dati per l'indice selezionato
			let xdataIndex = getIndex(xdata,timeKey);
			// per ogni serie i dati della sottoserie ed aggiorna il grafico
			let subseries = [];
			const series = option.series;
			for (let i = 0; i < series.length; i++) {
				// controlla che non sia la serie dei markers
				if (series[i].name == 'markers') continue;
				let subserie = {name:series[i].name,type:series[i].type,data:getSubSeries(series[i],xdataIndex)}
				subseries.push(subserie);
			}
			// riaggiungi la serie dei markers
			const markerSerie = option.series[option.series.length-1];
			subseries.push(markerSerie);
			myChart.setOption({
				series: subseries
			});
		
		});
	}
	myChart.setOption(option);
}

</script>
    <div class= "outer-chart-class">
		<div id="chartmain" style="width: {width};height: {height};}"></div>
		<div id="sag-grid-id" class="sag-grid-class" style="width: {width};height: {height}; visibility:{showSag?'visible':'hidden'}">
			<SagGrid/>
		</div>
        <div class="bottom-buttons">
            <button on:click={changeGraph}>
                Select
            </button>
            <select bind:value={selectedChart}>
                <option value="tmech">Tensione meccanica (8h)</option>
				<option value="historic">Tensione meccanica (media)</option>
				<option value="distribution">Distribuzione</option>
				<option value="polar">Orbita</option>
				<option value="sag">Sag</option>
            </select>
        </div>
    </div>
	

<style>
	.outer-chart-class{
        width: 80vw;
        height: 85vh;
	}
	.sag-grid-class{
		position:absolute;
		top: 35px;
		left: 0;
	}
	.bottom-buttons{
        position:absolute;
        bottom: 0;
		left: 0;
		width: 60vw;
		justify-content: left;
        z-index: 5;
        background-color: rgba(61,72,85,0.88);
	}
	.bottom-buttons button{
        background-color: rgba(31,42,55,1);
		border: 1px solid white;
		color: white;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 12px;
		margin: 5px 5px 5px 10px;
		cursor: pointer;
		border-radius: 12px;
		padding: 3px 14px;
    }
    .bottom-buttons select{
        background-color: rgba(31,42,55,1);
        border: 1px solid white;
        color: white;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 14px;
        margin: 5px 5px 5px 10px;
        width: 250px;
    }
</style>
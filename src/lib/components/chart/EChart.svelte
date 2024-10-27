<script lang='ts'>
import * as echarts from "echarts";
import { onMount, onDestroy } from "svelte";
// INTERNAL LIBS
import {EchartOptions} from ".";

// INIT VARIABLES
let chartInstance: any;
let chartDom: any;
let initdate = '2024-10-01'
let enddate = '2024-11-01'
const getVirtualData = (initdate:string,enddate:string) => {
      const date = +echarts.time.parse(initdate);
      const end = +echarts.time.parse(enddate);
      const dayTime = 3600 * 24 * 1000;
      const data = [];
      for (let time = date; time < end; time += dayTime) {
        data.push([
          echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
          Math.floor(Math.random() * 10000)
        ]);
      }
      return data;
    }

export let modalId = "EChartDivId";
export let option = {}
export let data = getVirtualData(initdate,enddate)
export let chartType = "gradientStackedArea"
export let chartOpts = {title:"Consumo Enegia Linee"}


const initChart = (option:any) => {
  if (chartDom) {
    console.log("Inizializzazione del grafico...");
    chartInstance = echarts.init(chartDom);
    chartInstance.setOption(option);
  } else {
    console.error("chartDom non è definito");
  }
};

const resizeChart = () => {
    if (chartInstance) {
      chartInstance.resize();
    }
  };

  const updateChart = (node:any,option:any) => {
	if (chartInstance) {
	  chartInstance.setOption(option);
	}
  }

onMount(async () => {
  // ******** VARIABLES TO TEST CALENDAR ********
  option = EchartOptions[chartType](data,chartOpts);
    
  // ******** END VARIABLES TO TEST CALENDAR ********
  
  initChart(option);

  // Aggiungi un observer per rilevare i cambiamenti nelle dimensioni del contenitore
    const resizeObserver = new ResizeObserver(() => {
      resizeChart(); // Richiama il resize di ECharts quando il contenitore cambia dimensioni
    });

    // Osserva il contenitore del grafico
    if (chartDom) {
      resizeObserver.observe(chartDom);
    }

    // Add event listener to the window to listen for the event charttype
    const div = document.getElementById(modalId)
    if(div){
	  div.addEventListener('charttype', (e:any) => {
		chartType = e.detail.chartType
		chartOpts = e.detail.chartOpts
        // Call routine to update data
        
		option = EchartOptions[chartType](data,chartOpts);
        chartInstance.dispose();
		initChart(option);
	  })
	}
});

onDestroy(() => {
      if (chartInstance) {
        chartInstance.dispose();
      }
    });





</script>

<div class="e-chart-class" bind:this={chartDom} id={modalId} use:updateChart={option}></div>

<style>
.e-chart-class {
  min-width:400px;
  min-height: 600px; /* Assicurati che il contenitore abbia una dimensione fissa */
  padding: 10px;
  resize: both;
}
</style>

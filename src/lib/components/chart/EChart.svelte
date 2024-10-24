<script lang='ts'>
import * as echarts from "echarts";
import { onMount, onDestroy } from "svelte";

// INIT VARIABLES
let chartInstance: any;
let chartDom: any;

export let modalId = "EChartDivId";
export let option: any = {
  title: {
    text: "Esempio di Grafico ECharts",
  },
  tooltip: {},
  xAxis: {
    data: ["A", "B", "C", "D", "E", "F"],
  },
  yAxis: {},
  series: [
    {
      name: "Valori",
      type: "bar",
      data: [5, 20, 36, 10, 10, 20],
    },
  ],
};

const initChart = () => {
  if (chartDom) {
    console.log("Inizializzazione del grafico...");
    chartInstance = echarts.init(chartDom);
    chartInstance.setOption(option);
    console.log("Opzioni applicate:", option);
  } else {
    console.error("chartDom non è definito");
  }
};

onMount(async () => {
  initChart();
});

onDestroy(() => {
  if (chartInstance) {
    chartInstance.dispose();
  }
});
</script>

<div class="e-chart-class" bind:this={chartDom} id={modalId}></div>

<style>
.e-chart-class {
  width: 800px;
  height: 300px; /* Assicurati che il contenitore abbia una dimensione fissa */
  padding: 10px;
}
</style>

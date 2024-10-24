<script lang='ts'>
import * as echarts from "echarts";
import { onMount, onDestroy } from "svelte";

// INIT VARIABLES
let chartInstance: any;
let chartDom: any;

export let modalId = "EChartDivId";
export let option = {}


const initChart = (option:any) => {
  if (chartDom) {
    console.log("Inizializzazione del grafico...");
    chartInstance = echarts.init(chartDom);
    chartInstance.setOption(option);
    console.log("Opzioni applicate:", option);
  } else {
    console.error("chartDom non è definito");
  }
};

const resizeChart = () => {
    if (chartInstance) {
      chartInstance.resize();
    }
  };

onMount(async () => {
  // ******** VARIABLES TO TEST CALENDAR ********

    const cellSize = [80, 80];
    const pieRadius = 25;
    function getVirtualData() {
      const date = +echarts.time.parse('2024-09-01');
      const end = +echarts.time.parse('2024-10-01');
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
    const scatterData = getVirtualData();
    const pieSeries = scatterData.map(function (item, index) {
      const Line1 = Math.round(Math.random() * 70) + 30;
      const Line2 = Math.round(Math.random() * (100-Line1));
      const Idle = 100 - Line1 - Line2;
      return {
        type: 'pie',
        id: 'pie-' + index,
        center: item[0],
        radius: pieRadius,
        coordinateSystem: 'calendar',
        label: {
          formatter: '{c}',
          position: 'inside'
        },
        data: [
          { name: 'Line1', value: Line1 },
          { name: 'Line2', value: Line2 },
          { name: 'Idle', value: Idle }
        ]
      };
    });
    option = {
      title:{
          text: 'Utilizzo Mensile Linee - Sept. 2024',
          left: 'center',
          padding: [0,0,40,0]
      },
      tooltip: {
          //formatter: '{a} {b} {c} {d}'
      },
      legend: {
        data: ['Line1', 'Line2', 'Idle'],
        bottom: 60
      },
      calendar: {
        top: 65,
        left: 'center',
        orient: 'vertical',
        height: 400,
        cellSize: cellSize,
        yearLabel: {
          show: false,
          fontSize: 30
        },
        dayLabel: {
          margin: 20,
          firstDay: 1,
          nameMap: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        monthLabel: {
          show: false
        },
        range: ['2024-09']
      },
      series: [
        {
          id: 'label',
          type: 'scatter',
          coordinateSystem: 'calendar',
          symbolSize: 0,
          label: {
            show: true,
            formatter: function (params:any) {
              return echarts.time.format(params.value[0], '{dd}', false);
            },
            offset: [-cellSize[0] / 2 + 10, -cellSize[1] / 2 + 15],
            fontSize: 12
          },
          data: scatterData
        },
        ...pieSeries
      ]
    };
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
  min-width:400px;
  min-height: 600px; /* Assicurati che il contenitore abbia una dimensione fissa */
  padding: 10px;
  resize: both;
}
</style>

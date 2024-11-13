<script lang="ts">
import * as echarts from 'echarts';
import { onMount } from 'svelte';

export let section:any
export let getImagePath:any = async (section:any)=> {
    return "../../../public/acea/"+section.image
}

let myChart:any;
let chartDom:any;

let option = {
    tooltip: {},
    visualMap: {
      left: 'center',
      bottom: '10%',
      min: 5,
      max: 100,
      orient: 'horizontal',
      text: ['', 'Price'],
      realtime: true,
      calculable: true,
      show:false,
      inRange: {
        color: ['#dbac00', '#db6e00', '#cf0000']
      }
    },
    series: [
      {
        name: 'Centrale Salisano',
        type: 'map',
        map: 'salisano',
        roam: true,
        emphasis: {
          label: {
            show: false
          }
        },
        selectedMode: false,
        data: [
          { name: 'EDIFICIO_UNO', value: 85 },
          { name: 'EDIFICIO_DUE', value: 85 },
          { name: 'SOSTEGNI_LINEE', value: 85 },
          { name: 'Recinto_3', value: 85 },
          { name: 'Recinto_2', value: 85 },
          { name: 'TRALICCIO_UNO', value: 85 },
          { name: 'CENTRALE', value: 85 },
          { name: 'TRALICCIO_DUE', value: 85 },
          { name: 'Recinto_1', value: 85 },
          { name: "PASSANTE_UNO", value: 85 },
          { name: 'PASSANTE_DUE', value: 85 },
          { name: 'PASSANTE_TRE', value: 85 },
        ]
      }
    ]
  };

 async function loadSVG(path:string) {
     return new Promise((resolve, reject) => {
		fetch(path)
			.then(response => response.text())
			.then(data => {
				resolve(data)
			})
			.catch(error => {
				reject(error)
			})
    })
} 
 onMount(() => {
    chartDom = document.getElementById('chartmain');
    if(section && section.image){
        option.series[0].map = section.image
		loadChart()
	}
    return () => {
        if(myChart)
            myChart.dispose();
    };
  });

 const loadChart = async () => {
	try{
		const filepath = await getImagePath(section)
		console.log("filepath",filepath)
		let mySvg:any = await loadSVG(filepath)
		console.log(mySvg)
		echarts.registerMap(section.image, { svg: mySvg });
		console.log("echart registered")
		myChart = echarts.init(chartDom);
	    myChart.setOption(option);
		// Aggiungi l'evento click
		myChart.on('click', function (params:any) {
			if (params.componentType === 'series' && params.seriesType === 'map') {
			console.log('Elemento cliccato:', params.name);
			}
		});
        }catch(e){
	        console.log(e)
        }
  }

  $: {
	    if(section && section.image){
            updateChart(null,option)
	    }
    }
const updateChart = (node:any,option:any) => {
	if (myChart) {
	     myChart.setOption(option);
	}
  }
</script>
		<div id="chartmain" bind:this={chartDom} use:updateChart={option} style="width: 500px;height: 500px;"></div>
<style>
</style>
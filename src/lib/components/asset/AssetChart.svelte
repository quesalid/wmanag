<script lang='ts'>
import * as echarts from 'echarts';
import { onMount } from 'svelte';

import * as theme from './chalkproject.json'

onMount(() => {
	let chartDom = document.getElementById('chartmain');
    const chalk = theme.theme;
    console.log("theme",theme.theme)
    echarts.registerTheme('chalk', chalk);
	let myChart = echarts.init(chartDom,'chalk');
    myChart.on('timelinechanged', function (params:any) {
        const currentIndex = params.currentIndex; // Ottieni l'indice selezionato nella timeline
        const timeKey = option.timeline.data[currentIndex]; // Ottieni la chiave temporale (es. '7:00')
        // ottieni i dati per l'indice selezionato
        let xdataIndex = getIndex(xdata,timeKey);
        // per ogni serie i dati della sottoserie ed aggiorna il grafico
        let subseries = [];
        for (let i = 0; i < series.length; i++) {
            // controlla che non sia la serie dei markers
            if (series[i].name == 'markers') continue;
            let subserie = {name:series[i].name,type:series[i].type,data:getSubSeries(series[i],xdataIndex)}
            subseries.push(subserie);
		}
        // riaggiungi la serie dei markers
        subseries.push(markerSerie);
        myChart.setOption({
			series: subseries
		});
       
        console.log('currentIndex',currentIndex,timeKey,xdataIndex);   
    });
	myChart.setOption(option);
});

// exports
export let titletext = "Asset Chart";
export let width = '60vw';
export let height = '80vh';
export let legend = {
        data: [{name:'4A',textStyle:{color:'white'}}, 
                {name:'4B',textStyle:{color:'white'}}, 
                {name:'8A',textStyle:{color:'white'}},
                {name:'8B',textStyle:{color:'white'}},
                {name:'12A',textStyle:{color:'white'}},
                {name:'12B',textStyle:{color:'white'}},
        ], 
        top: 30,
        selected: {
            '4A': true,
            '4B': true,
            '8A': true,
            '8B': true,
            '12A': true,
            '12B': true,
        }
}

const markerSerie = {
            name: 'markers',
            type: 'line',
            data: [], // Nessun dato visibile
            markLine: {
                symbol: 'none', // Nessun simbolo alle estremità
                data: [
                    {
                        yAxis: 35,
                        name: 'Limite Warning',
                        lineStyle: {
                            color: 'orange',
                            type: 'dashed'
                        },
                        label: {
                            formatter: 'Warning ({c})'
                        }
                    },
                    {
                        yAxis: 45,
                        name: 'Limite Allarme',
                        lineStyle: {
                            color: 'red',
                            type: 'solid'
                        },
                        label: {
                            formatter: 'Allarme ({c})'
                        }
                    }
                ]
            }
        }
const getSeries = (legend:any,numpoints:number) => {
	let series = [];
	for (let i = 0; i < legend.length; i++) {
        const points = [];
        let nextinit = Math.floor(Math.random()*30);
        for (let j = 0; j < numpoints; j++) {
            // add noise to parabola
            let parabola = 20 - 100*Math.pow(numpoints/2-j,2)/1000;
            let next = nextinit + parabola + Math.floor(Math.random()*5);
			points.push(next);
		}
		series.push({
			name: legend[i].name,
			type: 'line',
			data: points,
		});
	}
    // aggiungi la serie dei markers
    series.push(markerSerie);
	return series;
}

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

// tempo di otto ore dalle 6:00 alle 14:00 diviso in 15 minuti
// h = ora iniziale f = ora finale
const gettime = (h:number, f:number) => {
	let time = h*60;
	let timearr = [];
    let num = (f-h)*4;
	for (let i = 0; i < num; i++) {
		let h = Math.floor(time/60);
		let m = time % 60;
		let hstr = h < 10 ? '0'+h : h.toString();
		let mstr = m < 10 ? '0'+m : m.toString();
		timearr.push(hstr+':'+mstr);
		time += 15;
	}
	return timearr;
}
// torna la timeline campionando ogni ora dalla xdata
const gettimeline = (xdata:any) => {
	let timeline = [];
	for (let i = 0; i < xdata.length; i++) {
		if (i % 4 == 0) {
			timeline.push(xdata[i]);
		}
	}
	return timeline;
}


export let xdata = gettime(6,14);
export let series = getSeries(legend.data,xdata.length);
export let timelinedata = gettimeline(xdata);


let option:any = {
    title: {
        text: titletext,
        textStyle: {
            color: 'white'
        },
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        orient: 'vertical',
        top: '10%', // Posiziona il legend sotto il grafico
        left: 'left',
        data: legend.data,
        selected: legend.selected,
    },
    grid: {
        top: '10%',
        bottom: '20%', // Margine per lasciare spazio alla timeline e al legend
        containLabel: true // Aggiusta i margini automaticamente
    },
    toolbox: {
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
        },
        iconStyle: {
            borderColor: 'white'
        }
    },
    xAxis: {
        type: 'category',
        gridIndex: 0, // Associa l'asse X al grid
        data: xdata
    },
    yAxis: 
    [
        {
            type: 'value',
            name: 'Scala 1',
            max: 70,
        },
        {
            type: 'value',
            name: 'Scala 2',
            position: 'right'
        }
    ],
    series: series,
    timeline: {
        axisType: 'category',
        data: timelinedata,
        autoPlay: false,
        bottom: '10%', // Posiziona la timeline in basso
        width: '50%',
        playInterval: 2000,
        loop: false,
        controlStyle: {
            position: 'left'
        }
    },
};


</script>
    <div class= "outer-chart-class" >
	    <div id="chartmain" style="width: {width};height: {height};"></div>
        <div class="bottom-buttons">
            <button >
                Pulsante Sotto il Grafico
            </button>
        </div>
    </div>
	

<style>
	.outer-chart-class{
        width: 80vw;
        height: 80vh;
	}
	.bottom-buttons{
		left: 0;
		width: 60vw;
		display: flex;
		justify-content: left;
        background-color: rgba(41,52,65,0.88);
	}
	.bottom-buttons button{
        background-color: rgba(31,42,55,1);
		border: 1px solid white;
		color: white;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 14px;
		margin: 2px 2px 10px 2px;
		cursor: pointer;
		border-radius: 12px;
		padding: 5px 14px;
    }
</style>
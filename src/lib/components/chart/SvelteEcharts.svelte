<script lang="ts">
import * as echarts from "echarts";
import { onMount} from "svelte";


export let data:any ={data:[],timestamp:[],title:'',legend:[],tag:'',um:''}
export let options:any
export let onDataClick = (ev:any)=>{console.log("ECHART EVENT",ev)}


let myChart:any 
let ldata:any = []
let labels:any = []
let title = ""
let tag = ""
let um = ""
let markLine:any={}

onMount(async ()=>{
      ldata = JSON.parse(JSON.stringify(data.data))
      labels = JSON.parse(JSON.stringify(data.timestamp))
    
      title = data.title
      tag = data.tag
      um = data.um
      markLine = data.markMin
    });

const drawChart = (node:any,series:any)=>{
	  myChart = echarts.init(node);
      // Specify the configuration items and data for the chart
      var option = {
        title: {
          text: title
        },
        tooltip: {},
        toolbox: {
            left: 'center',
            itemSize: 25,
            top: 20,
            feature: {
                dataZoom: {
                yAxisIndex: 'none'
                },
                restore: {}
            }
         },
        legend: {
          data: [tag]
        },
        //legend: data[options.legend,data],
        xAxis: {
          type: 'category',
          data: labels,
        },
        yAxis: {
            name: um
        },
        series: [
          {
            name: data.tag,
            type: 'line',
            data: ldata,
            showAllSymbol: true,
            smooth: true,
            markLine:markLine
          }
        ]
      };

      // Display the chart using the configuration items and data just specified.
      myChart.setOption(option);

      return {
         update: (newParams:any) => {
              ldata = JSON.parse(JSON.stringify(newParams.series.data))
              labels = JSON.parse(JSON.stringify(newParams.series.timestamp))
              title = String(newParams.series.title)
              option.title.text=title
              option.series[0].data = ldata
              option.series[0].name = newParams.series.tag
              option.legend.data = [newParams.series.tag]
              option.xAxis.data = labels
              option.yAxis.name = newParams.series.um
              if(newParams.series.yAxis){
                  option.yAxis.min = newParams.series.yAxis.min
                  option.yAxis.max = newParams.series.yAxis.max
              }
              if(newParams.series.markData)
                  option.series[0].markLine.data =  newParams.series.markData
              if(newParams.series.markOptions)
              option.series[0].markLine.symbol = newParams.series.markOptions.symbol
              
              //console.log("SVELTE ECHART UPDATEA",option,newParams,newParams.tag)
              myChart.setOption(option,newParams);
              myChart.on('click', onDataClick)
         },
    }

}
</script>

    <div id="svelte-chart-viewer" use:drawChart={{series:data}} />

<style>
#svelte-chart-viewer{
    width: 800px;
    height: 300px;
}
</style>

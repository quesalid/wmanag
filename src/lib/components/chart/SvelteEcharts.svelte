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
let type = ""
let markLine:any={}

onMount(async ()=>{
      ldata = JSON.parse(JSON.stringify(data.data))
      labels = JSON.parse(JSON.stringify(data.timestamp))
    
      title = data.title
      tag = data.tag
      um = data.um
      type = data.type
      markLine = data.markMin
    });

const drawChart = (node:any,series:any)=>{
      const initoptions:any = {
          renderer: 'canvas',
      }
      const theme = 'dark'
	  myChart = echarts.init(node,theme,initoptions);
      // Specify the configuration items and data for the chart
      var option = {
        title: {
          text: title,
          left: 'center',
        },
        tooltip: {
		  trigger: 'axis',
		  axisPointer: {
			type: 'line'
		  }
		},
        toolbox: {
            rigth: '50px',
            itemSize: 25,
            top: 20,
            feature: {
                dataZoom: {
                yAxisIndex: 'none'
                },
                saveAsImage: {
                    type:"png",
                    backgroundColor: 'black',
                    pixelRatio: 2
                },
                dataView:{
                    show:true
                }
            }
         },
        legend: {
          bottom: 10,
          data: [tag]
        },
        //legend: data[options.legend,data],
        xAxis: {
          type: 'category',
          data: labels
        },
        yAxis: {
            name: type +" " +um,
            nameTextStyle:{color:'yellow',fontWeight:'bold'}
        },
        series: [
          {
            name: data.tag,
            type: 'line',
            data: ldata,
            showAllSymbol: true,
            smooth: true,
            markLine:markLine,
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
              option.yAxis.name = newParams.series.type + " "+ newParams.series.um
              if(newParams.series.yAxis){
                  option.yAxis.min = newParams.series.yAxis.min
                  option.yAxis.max = newParams.series.yAxis.max
              }
              if(newParams.series.markData)
                  option.series[0].markLine.data =  newParams.series.markData
              if(newParams.series.markOptions){
                option.series[0].markLine.symbol = newParams.series.markOptions.symbol
                option.series[0].markLine.label = newParams.series.markOptions.label
              }
              
              //console.log("SVELTE ECHART UPDATEA",option,newParams,newParams.tag)
              myChart.setOption(option,newParams);
              myChart.on('click', onDataClick)
         },
    }

}
</script>

    <div id="svelte-chart-viewer"  style="--width:{options.width}; --height:{options.height}" use:drawChart={{series:data}} />

<style>
#svelte-chart-viewer{
    width: var(--width);
    height: var(--height);
}
</style>

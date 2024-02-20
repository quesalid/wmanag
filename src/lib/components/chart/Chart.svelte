<script lang='ts'>
import {onMount} from "svelte"
import SvelteEchart from './SvelteEcharts.svelte'
import {token, mock} from '../../ustore.js'
import {getDataPoints,getDataTimeSeries} from '../../script/apidataconfig.js'
import SvelteEcharts from "./SvelteEcharts.svelte";

onMount(async () => {
		// GET MYSELF - SHOW UP IF DELETE IS CLICKED
		const chartForm = document.getElementById(modalId)
		if(chartForm){
			chartForm.addEventListener("chartclicked",async (e:any)=>{
				chartForm.style.display='block'
				uid = e.detail
				// A. GET POINT
				let filters =[{uid:uid,_type:'eq'}]
				const ret = await getDataPoints(filters,$mock)
				if(ret.data && ret.data.length > 0)
					point = ret.data[0]
				let filters1 = [{tag:point.tag,_type:'eq'}]
				let ret1 = await getDataTimeSeries(filters1,$mock)
				echartdata.data = []
				echartdata.timestamp = []
				for (let i = 0; i < ret1.data.length; i++) {
					const p:any = ret1.data[i]
					var date:any = new Date(p.timestamp);
					const pnt = { group: p.tag, value: p.value, date: date.toISOString() }
					echartdata.data.push(p.value)
					echartdata.timestamp.push(date.toISOString())
				}
				echartdata.title = "Point "+point.tag
				echartdata.legend.push(point.tag)
				echartdata.tag = point.tag
				echartdata.um = point.um
				echartdata.yAxis = {min:point.llim >0?Math.floor(point.llim*0.8):Math.floor(point.llim*1.1),max:point.hlim >0?Math.ceil(point.hlim*1.2):Math.ceil(point.hlim*0.8)}
				echartdata.markData=[
					{name:'LLIM',yAxis:point.llim,lineStyle: {type:'dashed',color:'#f00'}},
					{name:'HLIM',yAxis:point.hlim,lineStyle: {type:'dashed',color:'#f00'}},
				]
				echartdata.markOptions={symbol:['circle','circle']}
			})
		}
	});

const exit = (ev:any)=>{
	console.log("EXIT")
	const thisDiv = document.getElementById(modalId)
	if(thisDiv)
		thisDiv.style.display = 'none'
}

// EXPORTS
export let modalId = "PointChartDiv"
export let  bgcolor = "#ddefde"
export let showChart = (ev:any)=>{
	console.log("show  Chart: ",uid)
}
// INTERNAL
let title = "CHART"
let uid = ''
let point:any = {}
let echartdata:any = {data:[],timestamp:[],title:'',tag:'',legend:[],um:'',markData:[],yAxis:{},markOptions:{}}
let chartoptions = {
		"title": "Point  Macchina: ",
        "axes": {
            "bottom": {
                "title": "Sampling time ",
                "mapsTo": "date",
                "scaleType": "time"
            },
            "left": {
                "mapsTo": "value",
                "title": "UM ",
                "scaleType": "linear"
            }
        },
        "curve": "curveMonotoneX",
        "height": "400px",
		"legend":{"data":""},
        "width": "800px",
        "experimental": true,
        "zoomBar": {
            "top": {
                "enabled": true
            }
        },
		"toolbar":{"enabled":false}
}

</script>
<div class="modal" id={modalId} style="--background-color:{bgcolor}">
	   <div class="chart-form"> 
		<div class="banner">
			POINT CHART - {point.description}
		</div>
		<div class="chart-div" style="margin-left:auto;">
			    <div class="filter-div" >
					<div style='display:block;font-weight:bold;font-size:large;'>Filtri</div>
					    <div style="border:1px solid;margin:2px;">
						<label for="input-start-date" class="text-sm font-medium text-gray-700">Data inizio</label>
						<input type="date" name="input-start-date">
						</div>
						 <div style="border:1px solid;margin:2px;">
						<label for="input-end-date" class="text-sm font-medium text-gray-700">Data Fine</label>
						<input type="date" name="input-end-date">
						</div>
					</div>
				<div class="chart-container-div" style="margin-left:auto;">
					<SvelteEcharts bind:data={echartdata} bind:options={chartoptions}/>
				</div>
			</div>
		<div class="button-div">
			<!--div><span class="req">*</span> - Required field</!--div-->
			
			<input class="formbutton" type="button" value="EXIT" on:click={exit}>
		</div>
	  </div>
</div>
<style>
.modal{
  display: none;
  position: absolute; /* Stay in place */
  z-index: 999; /* Sit on top */
  padding: 5%; /* Location of the box */
  width: 100%; /* Full width */
  min-width: 200px; /* Full width */
  height: 100%; /* Full height */
  background-color: var(--background-color);
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}
.chart-form{
	display:block;
	color: #444;
	background-color: #fff;
	padding:0.4em;
	border-radius: 10px;
}

.chart-div{
	display:flex;
	margin-left:auto;
}
.filter-div{
	display:block;
	border: 1px solid;
	border-radius: 5px;
	margin-left:auto;
}
.chart-container-div{
	display:block;
	border: 1px solid;
	border-radius: 5px;
	margin-left:auto;
}
.formbutton{
	padding: 0px 3px 0px 3px;
	margin-left:auto;
	color: #444;
	border: 1px solid;
	border-radius: 20%;
	background-color: #ccc ;
}
.formbutton:hover{
	cursor:pointer;
}
.button-div{
	display:flex;
	justify-content:space-between;
	margin-top: 2em;
}
.banner{
	margin-top: 1.5em;
	text-align: center;
	font-size:large;
	font-weight: bold;
}
</style>
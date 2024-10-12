<script lang='ts'>
import {onMount} from "svelte"
import {token, mock} from '../../ustore.js'
import {getDataPoints,getDataTimeSeries,getEntityControlled} from '../../script/apidataconfig.js'
import SvelteEcharts from "./SvelteEcharts.svelte";
import WManag from '../WManag.svelte'
//import {CP_Button} from '../../script/controlpanel_0.0.1.js'
import Gauge from '../gaugejs/Gauge.svelte'

let opts = {
          angle: -0.2, // The span of the gauge arc
          lineWidth: 0.2, // The line thickness
          radiusScale: 0.8, // Relative radius
          pointer: {
            length: 0.6, // // Relative to gauge radius
            strokeWidth: 0.035, // The thickness
            color: '#000000' // Fill color
          },
          limitMax: false,     // If false, max value increases automatically if value > maxValue
          limitMin: false,     // If true, the min value of the gauge will be fixed
          //colorStart: '#6FADCF',   // Colors
          colorStart: '#6FADCF',   // Colors
          colorStop: '#8FC0FA',    // just experiment with them
          strokeColor: '#E0E0E0',  // to see which ones work best for you
          generateGradient: true,
          highDpiSupport: true,     // High resolution support
          staticLabels: {
              font: "8px sans-serif",  // Specifies font
              labels: [0, 50, 100, 150, 200, 250,300],  // Print labels at these values
              color: "#000000",  // Optional: Label text color
              fractionDigits: 0  // Optional: Numerical precision. 0=round off.
            },
        staticZones: [
           {strokeStyle: "#F03E3E", min: 0, max: 60}, // Red from 100 to 130
           {strokeStyle: "#FFDD00", min: 60, max: 120}, // Yellow
           {strokeStyle: "#30B32D", min: 120, max: 180}, // Green
           {strokeStyle: "#FFDD00", min: 180, max: 240}, // Yellow
           {strokeStyle: "#F03E3E", min: 240, max: 300}  // Red
        ],
        renderTicks: {
          divisions: 5,
          divWidth: 1.1,
          divLength: 0.7,
          divColor: '#333333',
          subDivisions: 3,
          subLength: 0.5,
          subWidth: 0.6,
          subColor: '#666666'
        }
    };

onMount(async () => {
	    // INITIALIZE CP_Button
		//powerButton = new CP_Button("cpPowerButton","/POWERON.png","/POWEROFF.png",$mock)
		// BIND CP_Button
		//powerButton.bind("power-button-id")
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
				// B. GET MACHINES
				const filters2 = [{uid:point.machine,_type:'eq'}]
				const ret2 = await getEntityControlled(filters2,$mock)
				if(ret2.data && ret2.data.length > 0)
					machine = ret2.data[0]
				if(machine.type)
					machineImg = '/'+machine.type +'.jpg'
				// Use specific machine image if configured
				machineImg = machine.image?machine.image:machineImg
				// C. GET TIME SERIES
				let filters1 = [{tag:point.tag,_type:'eq'}]
				let pagination = {_order:{timestamp:'DESC'}}
				let ret1 = await getDataTimeSeries(filters1,$mock)
				echartdata.data = []
				echartdata.timestamp = []
				for (let i = 0; i < ret1.data.length; i++) {
					const p:any = ret1.data[i]
					var date:any = new Date(p.timestamp).toISOString();
					// get only time
					date = date.split('T')[1].split('.')[0]
					const pnt = { group: p.tag, value: p.value, date: date }
					// get only three decimals
					p.value = Math.round(p.value * 1000) / 1000
					echartdata.data.push(p.value)
					echartdata.timestamp.push(date)
				}
				echartdata.title = "Point "+point.tag
				echartdata.legend.push(point.tag)
				echartdata.tag = point.tag
				echartdata.um = point.um
				echartdata.type = point.type
				echartdata.yAxis = {min:point.llim >0?Math.floor(point.llim*0.8):Math.floor(point.llim*1.1),max:point.hlim >0?Math.ceil(point.hlim*1.2):Math.ceil(point.hlim*0.8)}
				echartdata.markData=[
					{name:'LLIM',yAxis:point.llim,lineStyle: {type:'dashed',color:'#f00'}},
					{name:'HLIM',yAxis:point.hlim,lineStyle: {type:'dashed',color:'#f00'}},
				]
				echartdata.markOptions={
					symbol:['circle','circle'],
					label:{
						color:'#f00',
						fontWeight:'bold',
						padding: [0, 0, 0, 6],
						fontSize: 14,
					}
				}
				title = "POINT CHART - "+point.description

			})
		}
		 
	});

const closeModal = (ev:any) =>{
	 const divCont = document.getElementById(modalId)
	 if(divCont)
		divCont.style.display = 'none'
	 machineImg = ''
 }

// EXPORTS
export let modalId = "PointChartDiv"
export let  bgcolor = "#ddefde"
export let toolbar:any = []

// INTERNAL
let title = "CHART"
let uid = ''
let point:any = {}
let machine:any = {}
let machineImg='/LIOFILIZZATORE.jpg'
let echartdata:any = {data:[],timestamp:[],title:'',tag:'',legend:[],um:'',type:'',markData:[],yAxis:{},markOptions:{}}
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
        "height": "450px",
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
// CONTROL PANEL
//let powerButton

let gauge:any = {}
let myCanvasName = 'myCanvasName'
let onDataClick = (ev:any)=>{
	console.log("ECHART EVENT",ev)
	if(ev.seriesName){
		console.log("ECHART EVENT",ev.seriesName,ev.data)
		const gaugeEvent = new CustomEvent("showgauge",{detail:ev.data})
		const div = document.getElementById(myCanvasName)
		myCanvasName = myCanvasName
		if(div)
			div.dispatchEvent(gaugeEvent)
	}
}

</script>
<div class="modal" id={modalId} style="--background-color:{bgcolor}">
		<WManag id="MarkClickedWindow"
		closeMenu={closeModal}
		title="{title}" 
		disableClose={false} 
		draggable={true} 
		headercolor={bgcolor}
		width="1100px"
		top="10%"
		left="15%"
		toolbar = {toolbar}
		minimized="off"
		resize='both'>
		   <div class="chart-form" slot="bodycontent"> 
			<div class="chart-div" style="margin-left:auto;">
					<div class="filter-div" >
						<div style='display:block;font-weight:bold;font-size:16px;'>{machine.type} - {machine.name}</div>
							<img src={machineImg} alt="machImg"/>
						</div>
					<div class="chart-container-div" style="margin-left:auto;">
						<SvelteEcharts bind:data={echartdata} 
									bind:options={chartoptions}
									onDataClick={onDataClick}/>
						<!--div class="control-container-div">
							<Gauge  bind:myCanvasName={myCanvasName}/>
						</!--div-->
					</div>
				</div>
		  </div>
		</WManag>>
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
	justify-content: space-between ;
}
.filter-div{
	display:block;
	margin-right:4px;
}
.chart-container-div{
	display:block;
	margin-left:auto;
}
.control-container-div{
	display:flex;
	margin-left:auto;
	height: 150px;
	width:auto;
}
.power-control {
  display: block;
  background-color:#aaa;
  border: 1px solid;
  width:20%;
  height:100%
}
.power-control img{
  margin-left: auto;
  margin-right: auto;
}
.cp-button-class{
	cursor:pointer;
}

</style>
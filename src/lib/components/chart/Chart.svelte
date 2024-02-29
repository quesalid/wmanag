<script lang='ts'>
import {onMount} from "svelte"
import SvelteEchart from './SvelteEcharts.svelte'
import {token, mock} from '../../ustore.js'
import {getDataPoints,getDataTimeSeries,getMachines} from '../../script/apidataconfig.js'
import SvelteEcharts from "./SvelteEcharts.svelte";
import WManag from '../WManag.svelte'

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
				// B. GET MACHINES
				const filters2 = [{uid:point.machine,_type:'eq'}]
				const ret2 = await getMachines(filters2,$mock)
				if(ret2.data && ret2.data.length > 0)
					machine = ret2.data[0]
				if(machine.type)
					machineImg = '/'+machine.type +'.jpg'
				// Use specific machine image if configured
				machineImg = machine.image?machine.image:machineImg
				// C. GET TIME SERIES
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
						<SvelteEcharts bind:data={echartdata} bind:options={chartoptions}/>
						<div class="control-container-div">
							<div class="power-control">
								<img src="/POWERBUTTON.png" width="70%" alt="powerbutton"/>
								<img src="/EMBUTTON.png" width="45%" alt="embutton"/>
							</div>
							<div style="background-color:#fff;border: 1px solid;width:45%;height:100%">
							</div>
							<div style="background-color:#aaa;border: 1px solid;width:35%;height:100%">
							</div>
						</div>
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
</style>
<script lang="ts">
   // EXTERNAL
   import { navigate } from "svelte-routing";
   import {onMount} from "svelte"
   import { writable } from "svelte/store";
   // INTERNAL
   import Wmanag from '../../components/WManag.svelte'
   import {EChart} from '../chart'
   
   // STORE
   import { module} from '../../../lib/ustore.js'
   
  
	onMount(async () => {
	});

	let defaultWManager = 'defaultCharter'
	let chartChoice = 'calendarPie'
	let showdatepicker = true
	const today = new Date()
	let date = today.toISOString().split('T')[0]
	

	/* Set options based on chartType */
	const getChartOpts = (chartType:string)=>{
		const tool = toolbarpoint.find((el:any)=>el.id === 'ChartTypeSelect')
		const found = tool.props.options.find((el:any)=>el.value === chartChoice)
		let chartOpts:any = {title:'Title'}
		switch(chartType){
			case 'calendarPie':
				chartOpts = found?{title:found.title}:{title:'Title'}
				chartOpts['calendar'] = {range:range}
				chartOpts['_data'] ={initdate:firstDayCurrentMonth,enddate:firstDayNextMonth}
				break;
			case 'gradientStackedArea':
				chartOpts = found?{title:found.title}:{title:'Title'}
				break;
			case 'barYStacked':
				chartOpts = found?{title:found.title}:{title:'Title'}
				break;
		}
		return chartOpts
	}

	const getFirstDayOfMonth = (date:any):any => {
		// date format: yyyy-mm-dd
		const items = date.split('-');
		const year = parseInt(items[0]);
		const month = parseInt(items[1]);
		// Primo giorno del mese corrente
		//const firstDayCurrentMonth = new Date(date.getFullYear(), date.getMonth(), 1);
		const fdcm = new Date(year, month-1,2)
		const range = fdcm.getFullYear() + '-' + (fdcm.getMonth() + 1);
		const firstDayCurrentMonth = fdcm.toISOString().split('T')[0];
		// Primo giorno del mese successivo
		//const firstDayNextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
		const firstDayNextMonth = new Date(year, month,2).toISOString().split('T')[0];

		return [
			firstDayCurrentMonth,
			firstDayNextMonth,
			range
		];
	}

	const changeChart = (ev:any)=>{
		chartChoice = ev.target.value
		if(chartChoice && chartChoice != ""){
			// Send Custom Event to targetDiv
			let chartOpts = getChartOpts(chartChoice)
			const event = new CustomEvent('charttype', {
				detail: { chartType: chartChoice, chartOpts:chartOpts }
			})
			const target = document.getElementById(targetDiv)
			if(target)
				target.dispatchEvent(event)
		}
	}

	const changeDate = (ev:any)=>{
		date = ev.target.value;
		[firstDayCurrentMonth, firstDayNextMonth, range] = getFirstDayOfMonth(date);
		if(chartChoice && chartChoice != ""){
			// Send Custom Event to targetDiv
			let chartOpts = getChartOpts(chartChoice)
			const event = new CustomEvent('charttype', {
				detail: { chartType: chartChoice, chartOpts:chartOpts }
			})
			const target = document.getElementById(targetDiv)
			if(target)
				target.dispatchEvent(event)
		}
	}

	let [firstDayCurrentMonth, firstDayNextMonth, range] = getFirstDayOfMonth(date);


	export let logoImage = "/ICO_UP2_DATA.png"
	export let  bgcolor = "#ddefde"
	export let barheigth = "60px"
	export let managerid = "chartManagerId"
	export let targetDiv = "EChartDivId"
	// WMANAGER VARIABLES
	export let titlepoint = 'CHART'
	export let toolbarpoint:any = [
		{
			type:'select',
			function:changeChart,
			label:'Chart select',
			id:'ChartTypeSelect',
			props:{
				options:[
				{label:'Utilizzo',value:'calendarPie',title:"Utilizzo Impianto", selected:true,datepicker:true},
				{label:'Energia',value:'gradientStackedArea',title:"Consumo Energia totale",datepicker:true},
				{label:'CO2',value:'barYStacked',title:"Emissioni CO2 totali",datepicker:true},
				]
			}
		},
		{
			type:'date',
			function:changeDate,
			id:"ChartDatePicker", 
			label:"Date select",
			props:{
				value:  new Date().toISOString().split('T')[0],
				max: new Date().toISOString().split('T')[0],
			}
		}
	]
	export let  disableClose = true
	export let  draggable = true
	export let  zindex = 4
	export let height = "max-content"
	export let width = "max-content"
	export let headercolor = bgcolor
	export let titlefontsize = "15px"
	export let titlecolor = "#666"
	export let titleweight = "bold"
	export let bodycolor = "#ffffff"
	export let showheader = true
	export let top = "10px"
	export let left = "10px"
	export let resize = 'both'
	export let bordercolor = "#c0c0c0"
	export let boxshadow = "0px 0px 0px 0px #000000"
	export let minimized = 'off'
	// CHART VARIABLES
	let chartType = "calendarPie"
	let chartOpts = {title:"Utilizzo Impianto",_data:{initdate:firstDayCurrentMonth,enddate:firstDayNextMonth}}

</script>
 
		<div class="chart-manager" id="{managerid}">
			<Wmanag id="{defaultWManager}"  
				title="{titlepoint}" 
				toolbar={toolbarpoint} 
				{disableClose} 
				{draggable} 
				headercolor={bgcolor?bgcolor:headercolor}
				{zindex}
				{width}
				{height}
				{top}
				{left}
				{resize}
				{titlefontsize}
				{titlecolor}
				{titleweight}
				{bodycolor}
				{showheader}
				{boxshadow}
				{bordercolor}
				{minimized}>
				<div  slot="bodycontent" class="body-content-class">
					<EChart modalId="EChartDivId" bind:chartType={chartType} bind:chartOpts={chartOpts}/>
				</div>
			</Wmanag>
		</div>

<style>

</style>



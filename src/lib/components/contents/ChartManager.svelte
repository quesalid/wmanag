<script lang="ts">
   // EXTERNAL
   import { navigate } from "svelte-routing";
   import {onMount} from "svelte"
   import { writable } from "svelte/store";
   // INTERNAL
   import Wmanag from '../../components/WManag.svelte'
   import {EChart} from '../chart'
   // STORE
   
  
	onMount(async () => {
		[firstDayCurrentMonth, firstDayNextMonth, range] = getFirstDayOfMonth(date);
		[firstDayOfWeek, lastDayOfWeek] = getWeekBoundaries(today);
		chartOpts = getChartOpts(chartChoice)
		console.log("Chart Mamager Mount",chartOpts)
		// sleep 300 ms to wait for EChart to be mounted
		await new Promise(r => setTimeout(r, 400));
		const event = new CustomEvent('charttype', {
			detail: { chartType: chartChoice, chartOpts:chartOpts }
		})
		const target = document.getElementById(targetDiv)
		if(target)
			target.dispatchEvent(event)
	});

	let defaultWManager = 'defaultCharter'
	let chartChoice = 'calendarPie'
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
				chartOpts['_data'] ={
					initdate:firstDayCurrentMonth,
					enddate:firstDayNextMonth,
					xlabels:seriesXLabelsPie,
					names: seriesNamesPie,
				}
				break;
			case 'gradientStackedArea':
				chartOpts = found?{title:found.title}:{title:'Title'}
				// calc num of days between firstDayOfWeek and lastDayOfWeek
				const diffTime = Math.abs(new Date(lastDayOfWeek).getTime() - new Date(firstDayOfWeek).getTime());
				const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) +1;
				chartOpts['_data'] ={
					initdate:firstDayOfWeek,
					enddate:lastDayOfWeek,
					range:diffDays,
					names:seriesNames,
					colors:seriesColors,
					xlabels:seriesXLabels,
				}
				break;
			case 'barYStacked':
				chartOpts = found?{title:found.title}:{title:'Title'}
				chartOpts['_data'] ={
					initdate:firstDayOfWeek,
					enddate:lastDayOfWeek,
					names:seriesNames,
					colors:seriesColors,
					xlabels:seriesXLabels,
				}
				break;
		}
		return chartOpts
	}

	// Get first day of month and first day of next month
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

	// Get week boundaries
	const  getWeekBoundaries = (date:any) => {
		// Creiamo una nuova data per evitare di modificare l'oggetto originale
		const currentDate = new Date(date)

		// Calcolo del primo giorno della settimana (lunedì)
		const dayOfWeek = currentDate.getDay(); // Ottiene il giorno della settimana (0: domenica, 1: lunedì, ...)
		const distanceToMonday = (dayOfWeek + 6) % 7; // Calcola la distanza dal lunedì
		const firstDayOfWeek = new Date(currentDate);
		firstDayOfWeek.setDate(currentDate.getDate() - distanceToMonday);
		let isoFirstday = firstDayOfWeek.toISOString().split('T')[0]

		// Calcolo dell'ultimo giorno della settimana (domenica)
		const lastDayOfWeek = new Date(firstDayOfWeek);
		lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6); // Aggiunge 6 giorni a partire dal lunedì
		let isoLastday = lastDayOfWeek.toISOString().split('T')[0]

		return [
			isoFirstday,
			isoLastday
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
		[firstDayOfWeek, lastDayOfWeek] = getWeekBoundaries(date);
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
	let [firstDayOfWeek, lastDayOfWeek] = getWeekBoundaries(today);


	export let logoImage = "/ICO_UP2_DATA.png"
	export let  bgcolor = "#ddefde"
	export let barheigth = "60px"
	export let managerid = "chartManagerId"
	export let targetDiv = "EChartDivId"
	// WMANAGER VARIABLES
	export let title = 'CHART'
	export let toolbarpoint:any = [
		{
			type:'select',
			function:changeChart,
			label:'Chart select',
			id:'ChartTypeSelect',
			props:{
				options:[
				{label:'Utilizzo (torta)',value:'calendarPie',title:"Utilizzo Impianto", selected:true,datepicker:true},
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
	const seriesNamesPie = ['Linea 1', 'Linea2', 'Linea3','Idle']
	const seriesXLabels = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom']
	const seriesXLabelsPie = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom']
	let chartOpts = {
		title:"Utilizzo Impianto",
		_data:{
			initdate:firstDayCurrentMonth,
			enddate:firstDayNextMonth,
		},
		calendar:{range:range},
		xlabels:seriesXLabelsPie,
		names: seriesNamesPie,
	}
	let seriesNames = ['Prim 1', 'Sec 1', 'Prim 2', 'Sec 2', 'Fanghi','Scarico']
	const seriesColors = [
        { offset0: 'rgb(128, 255, 165)', offset1: 'rgb(1, 191, 236)' },
        { offset0: 'rgb(0, 221, 255)', offset1: 'rgb(77, 119, 255)' },
        { offset0: 'rgb(55, 162, 255)', offset1: 'rgb(116, 21, 219)' },
        { offset0: 'rgb(255, 0, 135)', offset1: 'rgb(135, 0, 157)' },
        { offset0: 'rgb(255, 191, 0)', offset1: 'rgb(224, 62, 76)' },
		{ offset0: 'rgb(128, 255, 165)', offset1: 'rgb(1, 191, 236)' },
    ]
	

</script>
 
		<div class="chart-manager" id="{managerid}">
			<Wmanag id="{defaultWManager}"  
				title="{title}" 
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



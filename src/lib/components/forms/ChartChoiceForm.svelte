<script lang="ts">
// EXTERNAL
import {onMount} from "svelte"
import { v4 as uuidv4 } from 'uuid';
import { DateInput, localeFromDateFnsLocale } from 'date-picker-svelte'
import { it } from 'date-fns/locale'
// INTERNAL 



onMount(() => {
		
	});



const exit = (ev:any)=>{
	const thisDiv = document.getElementById(modalId)
	if(thisDiv)
		thisDiv.style.display = 'none'
}
// EXPORTS
export let modalId = "ChartChoiceDiv"
export let  bgcolor = "#ddefde"
export let targetDiv = "ChartChoiceDiv"


let title = ""
let uid = ''
let showdatepicker = true
let date = new Date()
let locale = localeFromDateFnsLocale(it)


let charts = [
	{name:'Utilizzo',type:'calendarPie', checked:true, title:"Utilizzo Linee", datepicker:true},
	{name:'Energia',type:'gradientStackedArea',checked:false,title:"Consumo Energia Linee",datepicker:true},
	{name:'CO2',type:'barYStacked',checked:false,title:"Emissioni CO2 totali",datepicker:true},
]

let chartChoice = 'calendarPie'
let fsTitle = 'Scelta Grafico'

const changeChart = (ev:any)=>{
	// Send the selected chart to the parent
	chartChoice = ev.target.value
	console.log(ev.target.value,chartChoice,date)
	// Send Custom Event to targetDiv
	const found = charts.find((el)=>el.type === chartChoice)
	// enable or disable datepicker
	showdatepicker = found?found.datepicker:false
	const event = new CustomEvent('charttype', {
		detail: { chartType: chartChoice, chartOpts:found?{title:found.title}:{title:'Title'} }
	})
	const target = document.getElementById(targetDiv)
	if(target)
		target.dispatchEvent(event)
}

</script>
<div class="modal" id={modalId} style="--background-color:{bgcolor}">
	<div class="device-form">
		<section>
			<h3>{title}</h3>
		</section>
		<!--svelte:component this={pointform} bind:point={point} title={title}/-->
		
		<!--fieldset style="display:flex;padding:10px; border:2px solid #4238ca; background:#ffffff;">
			<legend style="font-weight:bold"> {fsTitle} </legend-->
			<div style="display:block;padding:0% 10% 0% 0%">
				<h3>CHARTS</h3>
				{#each charts as Chart}
					<div>
						<input
								type="radio"
								name="charts"
								value={Chart.type}
								checked={Chart.checked}
								on:click={(ev)=>{changeChart(ev)}}
						/>
						<label for="charts">{Chart.name}</label>
					</div>
				{/each}
			</div>
		<!--/!--fieldset-->
		{#if showdatepicker}
			<div class="date-picker-class">
			<DateInput
					format="yyyy/MM/dd HH:mm:ss"
					placeholder="2000/31/12 23:59:59" 
					dynamicPositioning={true}
					timePrecision="minute"
					{locale}
					bind:value={date}/>
			</div>
		{/if}
	</div>
</div>
<style>
.modal{
  display: block;
  position: absolute; /* Stay in place */
  width: 100%;
}
.device-form{
	color: #444;
	background-color: rgba(255, 0, 0, 0);
	padding:0.4em;
	border-radius: 10px;
	width: 60%;
	float: right;
}
section{
	margin: 3px;
	font-weight: bold ;
}
fieldset {
	color: #999;
	border: 1px solid;
	border-radius: 2px;
	margin: 3px;
}
label{
	color: #444;
	margin: 2px;
	font-weight:600 ;
}
input{
	color: #444;
}
.formbutton{
	padding: 0px 3px 0px 3px;
	margin-right: 5px;
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
select{
	color: #444;
}
legend{
	margin-left:5px;
}
.req {
  color: red;
}
.date-picker-class{
	display: flexbox ;
	/*position: absolute;*/
	z-index: 5;
	float: right;
}

</style>
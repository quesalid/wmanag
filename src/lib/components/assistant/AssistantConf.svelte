<script lang="ts">
import { onMount} from "svelte";
// INTERNAL
import Switch from "../switch/Switch.svelte"
import {assistant,user} from '../../ustore.js'
import {downloadDataText} from '../../script/utils.js'


// EXPORTS
export let options = ['','GPT-2','GPT-3','BERT','XLNet','RoBERTa','T5','DialoGPT']
export let type = ''
export let model = ''
export let onClick = (ev:any)=>{
	model = ev.target.value
}
export let initialcontext = ''
// INTERNALS
const placeholder = "Insert or upload initial context..."


onMount(async () => { 
	//console.log("SELECT RENDER",options)
	
  })

const onCheck = async (ev:any)=>{
		// send custom event toggleassistant to ChatBot
		const event = new CustomEvent('toggleassistant', {detail: {status: ev.target.checked}});
		document.dispatchEvent(event)
		$assistant = ev.target.checked
	}

const downloadData = async (e:any|undefined)=>{
		let file = e.target.files[0]
		const result = await downloadDataText(file)
		console.log("RESULT",file.name)
		initialcontext = result
	}
</script>

	<div class="assistant-configure">
		<div class="assistant-conf-row" style="margin-bottom:20px">
			<div class="div-label">ON/OFF</div>
			<Switch height='20px' width="45px" {onCheck} checked={$assistant}/>
		</div>
		<fieldset style="padding:10px; border:2px solid #4238ca; background:#ffffff; width:98%;">
			<legend style="font-weight:bold"> Assistant Configuration </legend>
			<div class="assistant-conf-row">
				<div class="div-label">Model</div>
				<select class="wmanag-select"  on:change={onClick}>
					<option value="" style="color:#afafaf"></option>
						{#each options as Opt}
							<option value={Opt} selected={Opt==type?true:false}>{Opt}</option>
						{/each}
				</select>
				<div class="div-label">Upload context</div>
				<input class="context-upload-file" id="avatar-file-picker" type="file" accept=".txt" on:change={downloadData}>
			</div>
			<div class="assistant-conf-row next">
				<div class="div-label">Initial Context</div>
				<textarea  class="context-input" placeholder="{placeholder}" bind:value="{initialcontext}"></textarea>
			</div>
		</fieldset>
	</div>

<style>

.assistant-configure{
	display:block;
	margin: 10px;
}
.context-input{
	width: 70%;
	height: 100px;
	margin-top: 5px;
	padding: 5px;
	font-style:italic ;
	font-weight: 500;
	border: 1px solid #aaa;
}
.assistant-conf-row{
	display:flex;
}
.next{
	margin-top: 20px;
}
.div-label{
	margin-right: 5px;
	margin-left: 15px;
}

</style>
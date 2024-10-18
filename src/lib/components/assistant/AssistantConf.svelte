<script lang="ts">
import { onMount} from "svelte";
import Switch from "../switch/Switch.svelte"
 import {assistant} from '../../ustore.js'


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
</script>

	<div class="assistant-configure">
				<fieldset style="padding:10px; border:2px solid #4238ca; background:#ffffff; width:70%">
					<legend style="font-weight:bold"> Assistant Configuration </legend>
					<div class="assistant-conf-row">
						<div class="div-label">Assistant ON/OFF</div>
						<Switch height='20px' width="45px" {onCheck} checked={$assistant}/>
						<div class="div-label">Model</div>
						<select class="wmanag-select"  on:change={onClick}>
							<option value="" style="color:#afafaf"></option>
								{#each options as Opt}
									<option value={Opt} selected={Opt==type?true:false}>{Opt}</option>
								{/each}
						</select>
						<div class="div-label">Upload context</div>
					</div>
					<div class="assistant-conf-row next">
						<div class="div-label">Initial Context</div>
						<textarea  class="context-input" placeholder="{placeholder}" bind:value="{initialcontext}"></textarea>
					</div>
				</fieldset>
			</div>

<style>

.assistant-configure{
	display:flex;
	margin: 10px;
}
.context-input{
	width: 70%;
	height: 100px;
	margin-top: 10px;
	padding: 5px;
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
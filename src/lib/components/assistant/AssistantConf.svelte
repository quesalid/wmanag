<script lang="ts">
// use vosk for speech recognition
import { onMount} from "svelte";
// INTERNAL
import Switch from "../switch/Switch.svelte"
import {assistant,user,module} from '../../ustore.js'
import {downloadDataText} from '../../script/utils.js'


// EXPORTS
export let options = [
	{type:'SIMPLE',name:'Semplice'},
	{type:'GENERATIVE', name:'LLM'},
	{type:'REINFORCEMENT_LEARNING',name:'LLM+'},
	{type:'HUMAN',name:'Umano'},
]
export let model = ''
export let initialcontext = ''
// INTERNALS
const placeholder = "Insert or upload initial context..."
let showHeader = false;
let showCheckbox = false;  // Variabile per mostrare/nascondere la checkbox per mostrare/nascondere la storia della chat
let showFullHistory = false;  // Variabile per mostrare/nascondere la storia della chat
let chatImage = "ChatBot.png" 
let showImage = true
let showMessageInput = false
let type = 'SIMPLE'

onMount(async () => { 
	console.log("ASSINTANT ONMOUNT",$user)
	
	let profile:any = $user.profile
	let dashboards:any = profile.dashboard.find((item:any) => item.module == $module.toUpperCase())
	if(!dashboards)
		dashboards = profile.find((item:any) => item.module == 'DEFAULT')
	let win = dashboards.windows.find((item:any) => item.id == 'Communication')
	if(win){
		type = win.params && win.params.type? win.params.type : ''
		showHeader = win.params && win.params.showHeader? win.params.showHeader : false
		showCheckbox = win.params && win.params.showCheckbox? win.params.showCheckbox : false
		showFullHistory = win.params && win.params.showFullHistory? win.params.showFullHistory : false
		chatImage = win.params && win.params.chatImage? win.params.chatImage : "ChatBot.png"
		showImage = win.params && win.params.showImage? win.params.showImage : true
		showMessageInput = win.params && win.params.showMessageInput? win.params.showMessageInput : false
		type= win.params && win.params.type? win.params.type : 'SIMPLE'
	}
	console.log('WIN',win)
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

const changeData = async (e:any|undefined)=>{
		// mofica il valore corrispondente
		switch(e.target.id){
			case 'show-check-header':
				showHeader = e.target.checked
				break
			case 'show-check-check':
				showCheckbox = e.target.checked
				break
			case 'show-check-history':
				showFullHistory = e.target.checked
				break
			case 'show-check-image':
				showImage = e.target.checked
				break
			/*case 'show-check-input':
				showMessageInput = e.target.checked
				break*/
		}
		// al cambio dati colora il bottone di save
		const saveButton = document.getElementById('save-button')
		if(saveButton)
			saveButton.style.backgroundColor = '#fcdcdc'
	}
const saveData = async (e:any|undefined)=>{
		// save data to user profile
		let profile:any = $user.profile
		let dashboards:any = profile.dashboard.find((item:any) => item.module == $module.toUpperCase())
		if(!dashboards)
			dashboards = profile.find((item:any) => item.module == 'DEFAULT')
			let win = dashboards.windows.find((item:any) => item.id == 'Communication')
			if(win){
					win.params.type = type
					win.params.showHeader = showHeader
					win.params.showCheckbox = showCheckbox
					win.params.showFullHistory = showFullHistory
					win.params.chatImage = chatImage
					win.params.showImage = showImage
					win.params.showMessageInput = showMessageInput
			}
			// save profile
			$user.profile = profile
			console.log('SAVE',$user.profile)
			const event = new CustomEvent('toggleassistant', {detail: {status: e.target.checked}});
			document.dispatchEvent(event)
			// reset button color
			const saveButton = document.getElementById('save-button')
			if(saveButton)
				saveButton.style.backgroundColor = '#c0c0c0'
	}

const  onClick = (ev:any)=>{
		type = ev.target.value
		console.log('TYPE',type)
		showMessageInput = type=='SIMPLE'?false:true
		const saveButton = document.getElementById('save-button')
		if(saveButton)
			saveButton.style.backgroundColor = '#fcdcdc'
	}
</script>

	<div class="assistant-configure">
		<fieldset style="padding:10px; border:2px solid #4238ca; background:#ffffff; width:98%;">
			<legend style="font-weight:bold"> Model Configuration </legend>
			<div class="assistant-conf-row">
				<div class="div-label">Model</div>
				<select class="wmanag-select"  on:change={onClick}>
						{#each options as Opt}
							<option value={Opt.type} selected={Opt.type==type?true:false}>{Opt.name}</option>
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
		<fieldset style="padding:10px; border:2px solid #4238ca; background:#ffffff; width:98%;">
			<legend style="font-weight:bold"> Assistant Configuration</legend>
			<div class="assistant-conf-row">
				<div class="div-label">Show Header</div>
				<input id="show-check-header" type="checkbox"  on:change={changeData} checked={showHeader}/>
				<div class="div-label">Show History Check</div>
				<input id="show-check-check" type="checkbox"  on:change={changeData} checked={showCheckbox}/>
				<div class="div-label">Show Full History</div>
				<input id="show-check-history" type="checkbox"  on:change={changeData} checked={showFullHistory}/>
				<div class="div-label">Show Image</div>
				<input id="show-check-image" type="checkbox"  on:change={changeData} checked={showImage}/>
			</div>
		</fieldset>
		<input id="save-button" class="button-save" type="button"  on:click={saveData} value="SAVE"/>
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
.button-save{
	margin-top: 20px;
	margin-left: 15px;
	background-color: #c0c0c0;
	color: black;
	border: none;
	padding: 5px 10px;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	font-size: 14px;
	cursor: pointer;
}
</style>
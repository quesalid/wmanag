<script lang="ts">
   // EXTERNAL
   import {onMount} from "svelte"
   // INTERNAL
   import Wmanag from '../../components/WManag.svelte'
   import {AssistantConf} from '../assistant'
 
   // API INTERFACE
   
   // STORE
   import { mock,module} from '../../ustore.js'
   
  
	onMount(async () => {
		console.log('ASSISTANT MANAGER')
	});

	
	export let  bgcolor = "#ddefde"
	export let barheigth = "60px"
	// WINDOW VARIABLES
	export let width = "900px"
	export let headercolor = bgcolor
	export let disableClose = true
	export let title = "ASSISTANT"
	export let top = '20%'
	export let left = '1%'
	export let minimized = 'off'
	export let toolbardevice:any = []
	export let  draggable = true
	export let  zindex = 4
	export let bordercolor = "#c0c0c0"
	export let boxshadow = "0px 0px 0px 0px #000000"
    // COMPONENT VARIABLES
	export let options = ['','GPT-2','GPT-3','BERT','XLNet','RoBERTa','T5','DialoGPT']
	export let type = ''
	export let model = ''
	export let onClick = (ev:any)=>{
		model = ev.target.value
	}
	export let initialcontext = ''
	

</script>
 

		<div class="assistant-container" style="--top:{barheigth}">
			<Wmanag id="assistantWManager"  
			{title}
			toolbar={toolbardevice} 
			{disableClose} 
			{draggable} 
			{headercolor} 
			{zindex}
			{top}
			{left}
			{minimized}
			{width}>
			scrollable={false}
			{boxshadow}
			{bordercolor}>
			<AssistantConf slot="bodycontent" 
				{options}
				{type}
				{model}
				{onClick}
				{initialcontext}/>
			</Wmanag>
		</div>


<style>
.assistant-container{
		display:flex;
		position:relative;
		margin-top: 3px;
	}

</style>



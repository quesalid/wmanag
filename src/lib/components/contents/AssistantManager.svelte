<script lang="ts">
   // EXTERNAL
   import {onMount} from "svelte"
   import { writable } from "svelte/store";
   // INTERNAL
   import Wmanag from '../../components/WManag.svelte'
 
   // API INTERFACE
   
   // STORE
   import { mock,module} from '../../ustore.js'
   
  


  
	onMount(async () => {
		console.log('ASSISTANT MANAGER')
	});

	

	// WINDOW VARIABLES
	export let width = "900px"
	export let headercolor = '#fff2e8'
	export let disableClose = true
	export let title = "ASSISTANT"
	export let top = '20%'
	export let left = '1%'
	export let minimized = 'off'
	export let toolbardevice:any = []
	export let  draggable = true
	export let  zindex = 4
   
	

</script>
 

		<div class="assistant-container">
			<Wmanag id="containerWManager"  
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
				
			</Wmanag>
		</div>


<style>
.assistant-container{
		display:flex;
		position:relative;
		margin-top: 3px;
	}

</style>



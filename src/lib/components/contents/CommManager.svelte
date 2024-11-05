<script lang="ts">
   // EXTERNAL
   import { navigate } from "svelte-routing";
   import {onMount} from "svelte"
   import { writable } from "svelte/store";
   // INTERNAL
   import Wmanag from '../../components/WManag.svelte'
   import PlaceHolder from '../PlaceHolder.svelte'
   import {ChatSimple, ChatbotComponent} from '../communication'
   // STORE
   import { mock,module, assistant,avatar} from '../../ustore.js'
   // API INTERFACE
   import {query} from '../../script/apiassistant.js'

   const updateToolbar = (toolbar:any) => {
	   const found = toolbar.find((item:any) => item.label == 'Ask')
	   if($assistant && !found)
	   toolbar.push({type:'image',props:{src:'/LLM.png'},function:onClickAskModel,label:"Ask"})
	   if(!$assistant && found)
	   toolbar = toolbar.filter((item:any) => item.label !== 'Ask')
	   return toolbar
	}
   
	// ASSISTANT SUPPORT
	let onClickAskModel = async (ev:any)=>{
		// SEND QUERY TO ASSISTANT
		console.log('ASK MODEL')
		const query1 = {"inputs": "I have an alarm on the panel. What I should do? "}
		const ret = await query(query1)
		console.log('QUERY',ret)
	}
   
	onMount(async () => {
		toolbar = updateToolbar(toolbar)
	});

	let defaultWManager= 'defaultCommWManager'

	export let logoImage = "/ICO_UP2_DATA.png"
	export let  bgcolor = "#ddefde"
	export let barheigth = "60px"
	export let managerid = "commManagerId"
	// WMANAGER VARIABLES
	export let title = 'COMMUNICATION'
	export let toolbar:any = []
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
	export let top = "10px"
	export let left = "10px"
	export let resize = 'both'
	export let minimized = 'off'
	export let scrollable = false
	export let showheader = true
	export let bordercolor = "#c0c0c0"
	export let boxshadow = "0px 0px 0px 0px #000000"
	// COMPONENTS
	//export let chat = ChatSimple
	export let chat = ChatbotComponent
	export let image = $avatar
	
	
	

</script>
 
		<div class="configurator-container" id="{managerid}">
			<Wmanag id="{defaultWManager}"  
				title="{title}" 
				toolbar={toolbar} 
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
				{scrollable}
				{minimized}
				{bordercolor}
				{boxshadow}>
				<svelte:component this={chat} slot="bodycontent" img={image}/>
			</Wmanag>
		</div>

<style>
/*.configurator-container{
		display:flex;
		position:relative;
		top: var(--top);
	}*/

</style>
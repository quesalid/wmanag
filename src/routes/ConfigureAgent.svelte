<script lang="ts">
   // DB FILE HANDLING https://www.npmjs.com/package/jspreadsheet-ce
   // CSS DDODLE https://css-doodle.com/
   // EXTERNAL
   import { navigate } from "svelte-routing";
   import {onMount} from "svelte"
   import { writable } from "svelte/store";
   // INTERNAL
   import {TopBar,Logo,DropDownMenu,AlertMessages,SideMenu,BreadCrumb,ChatBot} from "../lib/components/topbar"
   import { center } from '../lib/components/topbar/notifications';
   import Wmanag from '../lib/components/WManag.svelte'
   import {SimpleTable} from '../lib/components/table'
   import {getAgentColumns} from '../lib/script/utils.js'
   import {dragElement} from '../lib/components/CompUtils.js'
   import {AgentForm,DeleteForm} from '../lib/components/forms'
   // API INTERFACE
   import {getAgents,setAgent,deleteAgent,getDevices} from '../lib/script/apidataconfig.js'
   // STORE
   import { mock,module,navigation,getArrayFromPath,avatar,avatargroups,user,avatarclass,currdevice} from '../lib/ustore.js'
  // UTILITY
   import {getGroups} from '../lib/script/utils.js'

   // ADD SIDEBAR NENU ON USER BASIS
   let  groups = getGroups($module,$user)


   let agentsdata:any = writable([])
   let device:any = {name:''}
	onMount(async () => {
		center.init([
			  'Suspicious login on your server less then a minute ago',
			  'Successful login attempt by @johndoe',
			  'Successful login attempt by @amy',
			  'Suspicious login on your server 7 min',
			  'Suspicious login on your server 11 min ago',
			  'Successful login attempt by @horace',
			  'Suspicious login on your server 14 min ago',
			  'Successful login attempt by @jack'
		])
		// GET AGENT INFO
		let filters:any = [{uid:$currdevice,_type:'eq'}]
		const devices = await getDevices(filters,$mock)
		device = devices.data[0]
		title = 'AGENTS for DEVICE '+device.name
		// GET AGENTS FOR DEVICE
		filters = [{module:$module.toUpperCase(),_type:'eq'},{devuid:$currdevice,_type:'eq'}]
		const ret = await getAgents(filters,$mock)
		$agentsdata = ret.data
		// ADD EVENT LITSENER FOR AGENT CONFIGURATION
		const confMainDiv = document.getElementById("main-configuration-agent-page")
		if(confMainDiv){
			confMainDiv.addEventListener("deviceclicked",async (e:any)=>{
				deviceuid = e.detail
				// NAVIGATE TO AGENT PAGE
				console.log("DEVICE CLICKED ---> ",deviceuid)
			})
			confMainDiv.addEventListener("modelclicked",async (e:any)=>{
				deviceuid = e.detail
				// NAVIGATE TO AGENT PAGE
				console.log("MODEL CLICKED ---> ",deviceuid)
			})
		}
	});

	
	// BAR VARIABLES
	const barheigth = "60px"
	const imgheight = "60px"
	const topbarheight = "90%"
	
	
	const avatarsize = "w-10"
	let deviceuid = ''


	// click Logo
	const onClickLogo = (ev:any)=>{
		navigate(`/`+$module)
		$navigation = getArrayFromPath(`/`+$module)
	}

	let onClickAddDevice = (ev:any)=>{
		const modalEdit = document.getElementById(modalIdSave)
		const addClicked = new CustomEvent("editclicked", { detail: 'NONE' })
		modalEdit?.dispatchEvent(addClicked)
	}
	// EXTERNAL VARIABLES
	export let logoImage = "/ICO_UP2_DATA.png"
	export let  bgcolor = "#ddefde"
	// WINDOW VARIABLES
	export let title = 'AGENTS for DEVICE '+device.name
	export let toolbar = [{type:'image',props:{src:'/ADD.svg'},function:onClickAddDevice,label:"Add"}]
	export let  disableClose = true
	export let draggable = true
	export let zindex = 4
    export let headercolor = bgcolor
	export let top = "10px"
	export let left = "10px"
	export let titlecolor = "#666"
	export let titlefontsize = "15px"
	export let titleweight = "bold"
	export let bodycolor = "#ffffff"
	export let width = "max-content"
	export let height = "max-content"
	export let resize = 'none'
	export let minimized = 'off'
	export let scrollable = false
	export let showheader = true
	export let bordercolor = "#c0c0c0"
	export let boxshadow = "0px 0px 0px 0px #000000"


	let pagesize = true
	let pSize = 8
	let agentdatacolumns = getAgentColumns($module)

	// DIALOG VARIABLES
	let savedialog = AgentForm
	let deletedialog = DeleteForm
	let modalIdSave = "AgentInputDiv"
	let modalIdDel = "DeleteInputDiv"
	let deleteTitle = "Clicking DELETE the agent will be cancelled"
	let save = async (ev:any)=>{
		const target = ev.target
		const cdev = JSON.parse(target.dataset.cdev)
		cdev.module = $module.toLocaleUpperCase()
		// SET DEVICE
		let ret = await setAgent(cdev,$mock)
		// GET UPDATED DEVICE LIST
		const filters:any = [{module:$module.toUpperCase(),_type:'eq'}]
		ret = await getAgents(filters,$mock)
		$agentsdata = ret.data
		// CLOSE FORM DIALOG
		const devInputDiv = document.getElementById(modalIdSave)
		if(devInputDiv)
			devInputDiv.style.display= 'none'
	}
	let del = async (ev:any) =>{
		const target = ev.target
		const uid = target.dataset.uid
		// DELETE DEVICE
		let filters:any = [{uid:uid,_type:'eq'}]
		let ret = await deleteAgent(filters,$mock)
		// GET UPDATED DEVICE LIST
		filters = [{module:$module.toUpperCase(),_type:'eq'}]
		ret = await getAgents(filters,$mock)
		$agentsdata = ret.data
		// CLOSE FORM DIALOG
		const devInputDiv = document.getElementById(modalIdDel)
		if(devInputDiv)
			devInputDiv.style.display= 'none'
	}
	

</script>
 <div id="main-configuration-agent-page">
		<div>
			<TopBar barheight='{barheigth}' bgcolor='{bgcolor}'>
				<div slot="lefttop">
					<Logo logofilename="{logoImage}" imgheight={imgheight} onClick={onClickLogo}>
					</Logo>
				</div>
				<div slot="centertop">
					<BreadCrumb/>
				</div>
				<div slot="righttop" class='flex'>
				<AlertMessages/>
				<ChatBot/>
				<DropDownMenu groups={$avatargroups} image="{$avatar}" 
						imagesize='{avatarsize}'
						message={$user.username}
						messageclass={$avatarclass}>
				</DropDownMenu>
				<SideMenu  topbarheight='{topbarheight}' bind:groups={groups}/>
				</div>
			</TopBar>

		</div>
		<div class="configurator-container" style="--top:{barheigth}">
			<Wmanag id="containerWManager"  
					title="{title}" 
					toolbar={toolbar} 
					{disableClose} 
					{draggable} 
					{headercolor} 
					{zindex}
					{top}
					{left}
					{width}
					{height}
					{showheader}
					{resize}
					{minimized}
					{titlecolor}
					{titlefontsize}
					{titleweight}
					{boxshadow}
					{bordercolor}
					{scrollable}
					{bodycolor}>
				<SimpleTable slot="bodycontent" data={agentsdata} datacolumns={agentdatacolumns} {pagesize} {pSize}/>
			</Wmanag>
		</div>
		<div id="save-device-dialog">
			<svelte:component this={savedialog} bind:modalId={modalIdSave} save={save} {bgcolor}/>
		</div>
		<div id="delete-device-dialog">
			<svelte:component this={deletedialog} bind:modalId={modalIdDel} del={del} {bgcolor} title={deleteTitle}/>
		</div>
</div>

<style>
.configurator-container{
		display:flex;
		position:relative;
		top: var(--top);
	}

</style>



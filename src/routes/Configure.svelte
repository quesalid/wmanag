<script lang="ts">
   // EXTERNAL
   import { navigate } from "svelte-routing";
   import {onMount} from "svelte"
   import { writable } from "svelte/store";
   // INTERNAL
   import {TopBar,
			Logo,
			DropDownMenu,
			AlertMessages,
			SideMenu,
			BreadCrumb,
			DigitalClock} from "../lib/components/topbar"
   import { center } from '../lib/components/topbar/notifications';
   import Wmanag from '../lib/components/WManag.svelte'
   import {SimpleTable} from '../lib/components/table'
   import {getDeviceColumns} from '../lib/script/utils.js'
   import {dragElement} from '../lib/components/CompUtils.js'
   import {DeviceForm,DeleteForm} from '../lib/components/forms'
   // API INTERFACE
   import {getDevices,setDevice,deleteDevice} from '../lib/script/apidataconfig.js'
   import {getSecurityAlerts} from '../lib/script/apisecurity.js'
   // STORE
   import { mock,module,navigation,avatar,getArrayFromPath,currdevice,avatargroups,user,avatarclass} from '../lib/ustore.js'
   // UTILITY
   import {getGroups} from '../lib/script/utils.js'

   // ADD SIDEBAR NENU ON USER BASIS
   let  groups = getGroups($module,$user)
  


   let devicesdata:any = writable([])
	onMount(async () => {
		const retalert = await getSecurityAlerts([],$mock)
		const securityAlerts = retalert.data
		const messages = securityAlerts.map((item:any)=>item.message)
		center.init(messages)
		const filters:any = [{module:$module.toUpperCase(),_type:'eq'}]
		const ret = await getDevices(filters,$mock)
		$devicesdata = ret.data
		// ADD EVENT LITSENER FOR AGENT CONFIGURATION
		const confMainDiv = document.getElementById("main-configuration-page")
		if(confMainDiv){
			confMainDiv.addEventListener("agentclicked",async (e:any)=>{
				// SET CURRENT DEVICE IN STORE
				deviceuid = e.detail
				$currdevice = deviceuid
				// NAVIGATE TO AGENT PAGE
				navigate("/"+$module+"/configure/agent")
				$navigation = getArrayFromPath("/"+$module+"/configure/agent")
			})
		}
	});

	
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
	// TABLE VARIABLES
	export let title = 'DEVICES'
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
	// BAR VARIABLES
	export let  barheigth = "60px"
	export let imgheight = "60px"
	export let  topbarheight = "90%"
	export let  avatarsize = "w-10"

	let pagesize = true
	let pSize = 8
	let devicedatacolumns = getDeviceColumns($module)


	// DIALOG VARIABLES
	let savedialog = DeviceForm
	let deletedialog = DeleteForm
	let modalIdSave = "DeviceInputDiv"
	let modalIdDel = "DeleteInputDiv"
	let deleteTitle = "Clicking DELETE the device will be cancelled"
	let save = async (ev:any)=>{
		const target = ev.target
		const cdev = JSON.parse(target.dataset.cdev)
		cdev.module = $module.toUpperCase()
		// SET DEVICE
		let ret = await setDevice(cdev,$mock)
		// GET UPDATED DEVICE LIST
		const filters:any = [{module:$module.toUpperCase(),_type:'eq'}]
		ret = await getDevices(filters,$mock)
		$devicesdata = ret.data
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
		let ret = await deleteDevice(filters,$mock)
		// GET UPDATED DEVICE LIST
		filters = [{module:$module.toUpperCase(),_type:'eq'}]
		ret = await getDevices(filters,$mock)
		$devicesdata = ret.data
		// CLOSE FORM DIALOG
		const devInputDiv = document.getElementById(modalIdDel)
		if(devInputDiv)
			devInputDiv.style.display= 'none'
	}
	

</script>
 <div id="main-configuration-page">
		<div>
			<TopBar barheight='{barheigth}' bgcolor='{bgcolor}'>
				<div slot="lefttop">
					<div style="display: flex;">
					<Logo logofilename="{logoImage}" imgheight={imgheight} onClick={onClickLogo}>
					</Logo>
					<DigitalClock/>
					</div>
				</div>
				<div slot="centertop">
					<BreadCrumb/>
				</div>
				<div slot="righttop" class='flex'>
				<AlertMessages/>
				<DropDownMenu groups={$avatargroups} image="{$avatar}" 
						imagesize='{avatarsize}'
						message={$user.username?$user.username:undefined}
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
				<SimpleTable slot="bodycontent" data={devicesdata} datacolumns={devicedatacolumns} {pagesize} {pSize}/>
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



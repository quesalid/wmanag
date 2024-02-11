<script lang="ts">
   import { navigate } from "svelte-routing";
   import {onMount} from "svelte"
   import { writable } from "svelte/store";

   import {TopBar,Logo,DropDownMenu,AlertMessages,SideMenu,BreadCrumb} from "../lib/components/topbar"
   import { center } from '../lib/components/topbar/notifications';
   import { mock,module} from '../lib/ustore.js'
   import Wmanag from '../lib/components/WManag.svelte'
   import {SimpleTable} from '../lib/components/table'
   import {getDeviceColumns} from '../lib/script/utils.js'
   import {dragElement} from '../lib/components/CompUtils.js'
   import {DeviceForm,DeleteForm} from '../lib/components/forms'
   // API INTERFACE
   import {getDevices,setDevice,deleteDevice} from '../lib/script/apidataconfig.js'
   
  


   let devicesdata:any = writable([])
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
		const filters:any = [{module:$module.toUpperCase(),type:'eq'}]
		const ret = await getDevices(filters,$mock)
		$devicesdata = ret.data
		// ADD EVENT LITSENER FOR AGENT CONFIGURATION
		const confMainDiv = document.getElementById("main-configuration-page")
		if(confMainDiv){
			confMainDiv.addEventListener("agentclicked",async (e:any)=>{
				deviceuid = e.detail
				// NAVIGATE TO AGENT PAGE
				console.log("AGENT CLICKED ---> ",deviceuid)
			})
		}
	});

	export let logoImage = "/ICO_UP2_DATA.png"
	export let logout = "/datalogin"
	export let  bgcolor = "#ddefde"

	// BAR VARIABLES
	const barheigth = "60px"
	const imgheight = "60px"
	const topbarheight = "90%"
	const avatargroups = [
		[
			{ icon: null, text: `Dashborad` },
			{ icon: null, text: `Profile` },
			{ icon: null, text: `Settings` },
		], [
			{ icon: null, text: `Logout`,link:logout },
		]
	]
	
	const avatarsize = "w-10"
	const avatar = '/PPULICANI.png'
	const avatarmessage = "p.pulicani@up2twin.com"
	const avatarclass = "font-bold text-sm italic"
	let deviceuid = ''


	// click Logo
	const onClickLogo = (ev:any)=>{
		navigate(`/`+$module)
	}

	// TABLE VARIABLES
	const titleagent = 'DEVICES'
	let onClickAddDevice = (ev:any)=>{
		console.log("ONCLICK ADD CONTAINER")
		const modalEdit = document.getElementById(modalIdSave)
		const addClicked = new CustomEvent("editclicked", { detail: 'NONE' })
		modalEdit?.dispatchEvent(addClicked)
	}
	let toolbardevice = [{type:'image',props:{src:'/ADD.svg'},function:onClickAddDevice,label:"Add"}]
	const disableClose = true
	const draggable = true
	let zindex = 4
    let headercolor = bgcolor
	let pagesize = true
	let pSize = 3
	let devicedatacolumns = getDeviceColumns($module)

	// DIALOG VARIABLES
	let savedialog = DeviceForm
	let deletedialog = DeleteForm
	let modalIdSave = "DeviceInputDiv"
	let modalIdDel = "DeleteInputDiv"
	let save = async (ev:any)=>{
		const target = ev.target
		const cdev = JSON.parse(target.dataset.cdev)
		cdev.module = $module.toLocaleUpperCase()
		// SET DEVICE
		let ret = await setDevice(cdev,$mock)
		// GET UPDATED DEVICE LIST
		const filters:any = [{module:$module.toUpperCase(),type:'eq'}]
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
		let filters:any = [{uid:uid,type:'eq'}]
		let ret = await deleteDevice(filters,$mock)
		// GET UPDATED DEVICE LIST
		filters = [{module:$module.toUpperCase(),type:'eq'}]
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
					<Logo logofilename="{logoImage}" imgheight={imgheight} onClick={onClickLogo}>
					</Logo>
				</div>
				<div slot="centertop">
					<BreadCrumb/>
				</div>
				<div slot="righttop" class='flex'>
				<AlertMessages/>
				<DropDownMenu groups={avatargroups} image="{avatar}" 
						imagesize='{avatarsize}'
						message={avatarmessage}
						messageclass={avatarclass}>
				</DropDownMenu>
				<SideMenu  topbarheight='{topbarheight}'/>
				</div>
			</TopBar>

		</div>
		<div class="configurator-container" style="--top:{barheigth}">
			<Wmanag id="containerWManager"  title="{titleagent}" toolbar={toolbardevice} {disableClose} {draggable} {headercolor} {zindex}>
				<SimpleTable slot="bodycontent" data={devicesdata} datacolumns={devicedatacolumns} {pagesize} {pSize}/>
			</Wmanag>
		</div>
		<div id="save-device-dialog">
			<svelte:component this={savedialog} bind:modalId={modalIdSave} save={save} {bgcolor}/>
		</div>
		<div id="delete-device-dialog">
			<svelte:component this={deletedialog} bind:modalId={modalIdDel} del={del} {bgcolor}/>
		</div>
</div>

<style>
.configurator-container{
		display:flex;
		position:relative;
		top: var(--top);
	}

</style>



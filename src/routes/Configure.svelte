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
   
   import {getDeviceColumns} from '../lib/script/utils.js'
  
   import {DeviceForm,DeleteForm} from '../lib/components/forms'
   // API INTERFACE
   import {getDevices,setDevice,deleteDevice} from '../lib/script/apidataconfig.js'
   import {getSecurityAlerts} from '../lib/script/apisecurity.js'
   // STORE
   import { mock,module,navigation,avatar,getArrayFromPath,currdevice,avatargroups,user,avatarclass} from '../lib/ustore.js'
   // UTILITY
   import {getGroups,loadComponent} from '../lib/script/utils.js'

   // EXTERNAL VARIABLES
	export let logoImage = "/ICO_UP2_DATA.png"
	export let  bgcolor = "#ddefde"
	// BAR VARIABLES
	export let  barheigth = "60px"
	export let  imgheight = "60px"
	export let  topbarheight = "90%"
	export let  avatarsize = "w-10"

   // ADD SIDEBAR MENU ON USER BASIS
   let  groups = getGroups($module,$user)
   let components:any = []
   let configure:any = {windows:[]}
   let devicesdata:any = writable([])
   let devicedatacolumns:any = []
   let deviceuid = ''
   let pagesize = true
   let pSize = 8
   let configureManagerId = 'configureManagerId'

   const findWindow = (id:any)=>{
		let profile:any = $user.profile
		let mod = $user.profile.modules.find((item:any) => item.name == $module.toLowerCase())
		let configure:any = mod.windows.configure
		let win = configure.find((item:any) => item.id == id)
		return win
	}

	const getColorScheme = (type:any)=>{
		let colorScheme = {wincolor:"#ddefde"}
		let profile = $user.profile
		let mod = $user.profile.modules.find((item:any) => item.name == $module.toLowerCase())
		let configure:any = mod.windows.configure
		
		if(configure && configure.colorScheme)
			colorScheme = configure.colorScheme
		
		return colorScheme
	}

	// get color scheme
	let colorScheme:any = getColorScheme($module.toUpperCase())

   const loadComponents = async (dashboard:any)=>{
		for(let i=0;i<dashboard.length;i++){
			const win = dashboard[i]
			let props:any = {
				headercolor:colorScheme.wincolor,
				title:win.name?win.name:'DEVICES',
				top:win.top?win.top:'10px',
				left:win.left?win.left:'10px',
				height:win.height?win.height:"max-content",
				width:win.width?win.width:"max-content",
				bgcolor:win.bgcolor?win.bgcolr:'#ddefde',
				titlefontsize:win.titlefontsize?win.titlefontsize:"15px",
				titlecolor:win.titlecolor?win.titlecolor:'#666',
				titleweight:win.titleweight?win.titleweight:"bold",
				bodycolor:win.bodycolor?win.bodycolor:"#ffffff",
				minimized:win.minimized?win.minimized:'off',
				resize:win.resize?win.resize:'none',
				scrollable:win.scrollable?win.scrollable:false,
				showheader:win.showheader?win.showheader:true,
				bordercolor:win.bordercolor?win.bordercolor:"#c0c0c0",
				boxshadow:win.boxshadow?win.boxshadow:"0px 0px 0px 0px #000000",
				zindex:win.zindex?win.zindex:4,
				draggable:win.draggable?win.draggable:true,
				disableClose:win.disableClose?win.disableClose:false,
			}
			if(win.visible == 'visible'){
				try{
					let moduleName = ''
					//let modulePath = '/src/lib/components/contents/index.js'
					// includi i props specifici per il componente che non sono binding
					switch(win.id){
						case 'Configure':
							props.toolbar = [{type:'image',props:{src:'/ADD.svg'},function:onClickAddDevice,label:"Add"}]
							props.pagesize = pagesize?pagesize:true
							props.pSize =pSize?pSize: 8
							props.managerid = configureManagerId
							moduleName = 'ConfigureManager'
							break;
					}
					//const component = await loadComponent(modulePath,moduleName)
					const component = await loadComponent(moduleName)
					components.push({component:component,win:win, props:props})
				}catch(e){
					console.log("Error loading component",e)
				}
			}
		}
		// force redraw
		components = [...components]
		console.log("Loaded Components",components)
	}

	onMount(async () => {
		// A. GET PROFILE DASHBOARD 
		const mod = $user.profile.modules.find((item:any) => item.name == $module.toLowerCase())
		if(mod)
			configure = mod.windows.configure
		
		// A1. LOAD COMPONENTS
		await loadComponents(configure)

		// B. GET SECURITY ALERTS
		const retalert = await getSecurityAlerts([],$mock)
		const securityAlerts = retalert.data
		const messages = securityAlerts.map((item:any)=>item.message)

		// C. GET DEVICES
		const filters:any = [{module:$module.toUpperCase(),_type:'eq'}]
		const ret = await getDevices(filters,$mock)
		$devicesdata = ret.data

		// C1. GET DEVICE COLUMNS
		devicedatacolumns = getDeviceColumns($module)

		// D. ADD EVENT LISTENER FOR AGENT CONFIGURATION
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
	
let screensize = window.innerWidth
$: {
	screensize = window.innerWidth
	// force update
	if(components && devicedatacolumns){
		components = [...components]
		//$devicesdata = $devicesdata
		devicedatacolumns = [...devicedatacolumns]
	}
}

window.onresize = function(event:any) {
	screensize = window.innerWidth
}

let minscreensize = 850
</script>
 <div id="main-configuration-page">
		
			<TopBar barheight='{barheigth}' bgcolor='{bgcolor}'>
				<div slot="lefttop">
					<div style="display: flex;">
					<Logo logofilename="{logoImage}" imgheight={imgheight} onClick={onClickLogo}>
					</Logo>
					{#if screensize > minscreensize}
						<DigitalClock/>
					{/if}
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
		
		<div class="configure-container" style="--top:{barheigth}" id="configure-container-id">
			{#each components as comp}
				{#if comp.win.id == 'Configure'}
						<svelte:component this={comp.component} {...comp.props} devicesdata={devicesdata} bind:devicedatacolumns={devicedatacolumns}/>
				{/if}
			{/each}
		</div>
		<div id="save-device-dialog">
			<svelte:component this={savedialog} bind:modalId={modalIdSave} save={save} {bgcolor}/>
		</div>
		<div id="delete-device-dialog">
			<svelte:component this={deletedialog} bind:modalId={modalIdDel} del={del} {bgcolor} title={deleteTitle}/>
		</div>
</div>

<style>
#configure-container-id{
	display:flex;
	position:relative;
	top: var(--top);
	height: calc( 100vh - 50px );
}
</style>



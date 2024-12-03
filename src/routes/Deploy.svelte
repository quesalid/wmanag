<script lang="ts">
   // EXTERNAL
   import { navigate } from "svelte-routing";
   import {onMount,afterUpdate} from "svelte"
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
   import {getDeviceDeployColumns} from '../lib/script/utils.js'
   import {dragElement} from '../lib/components/CompUtils'
   import {DeployMain,DockerMain} from '../lib/components/contents'
   // API INTERFACE
   import {getDevices,setDevice,deleteDevice} from '../lib/script/apidataconfig.js'
   import {agentGetInfo} from '../lib/script/apidataagent.js'
   // STORE
   import { mock,module, navigation, getArrayFromPath, user,avatar,currdevice,avatargroups,avatarclass} from '../lib/ustore.js'
   // API
   import {getSecurityAlerts} from '../lib/script/apisecurity.js'
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
		// ADD EVENT LISTENER FOR AGENT CONFIGURATION
		const confMainDiv = document.getElementById("main-deploy-page")
		if(confMainDiv){
			confMainDiv.addEventListener("dockerclicked",async (e:any)=>{
				// SET CURRENT DEVICE IN STORE
				deviceuid = e.detail
				$currdevice = deviceuid
				// NAVIGATE TO AGENT PAGE
				console.log(" DOCKER CLICKED: "+$currdevice)
			})
			confMainDiv.addEventListener("sshclicked",async (e:any)=>{
				// SET CURRENT DEVICE IN STORE
				deviceuid = e.detail
				$currdevice = deviceuid
				// NAVIGATE TO AGENT PAGE
				console.log(" SSH CLICKED: "+$currdevice)
			})
		}
	});

	afterUpdate(async () => {
		for(let i=0; i< $devicesdata.length;i++){
			// A. FOR EACH DEVICE CHECK IF SERVER IS RUNNING
			const dev = $devicesdata[i]
			const host = dev.host
			const port = dev.port
			const uid = dev.uid
			// GET IMAGE ELEMENTS
			const deployImg:any = document.getElementById('deploy-'+uid)
			const dockerImg:any = document.getElementById('docker-'+uid)
			const sshImg:any = document.getElementById('ssh-'+uid)
			//console.log(" DEVICE IDS",'deploy-'+uid,'docker-'+uid,'ssh-'+uid)
			//console.log(" DEVICE IMGS",deployImg,dockerImg,sshImg)
			try{
				const ret = await agentGetInfo('https',host,port,$mock)
				// B. IF CONNECTED
				// SET IMAGES
				if(deployImg){
					deployImg.style.backgroundColor = 'lightgreen'
					deployImg.style.borderRadius = '50%'
				}
				if(dockerImg){
					dockerImg.style.backgroundColor = '#ffaaaa'
					dockerImg.style.borderRadius = '50%'
					dockerImg.disabled = true
				}
				if(sshImg){
					sshImg.style.backgroundColor = '#ffaaaa'
					sshImg.style.borderRadius = '50%'
					sshImg.disabled = true
				}
			}catch(error){
				if(deployImg){
					deployImg.style.backgroundColor = '#ffaaaa'
					deployImg.style.borderRadius = '50%'
					deployImg.disabled = true
				}
				if(dockerImg){
					dockerImg.style.backgroundColor = 'lightgreen'
					dockerImg.style.borderRadius = '50%'
				}
				if(sshImg){
					sshImg.style.backgroundColor = 'lightgreen'
					sshImg.style.borderRadius = '50%'
				}
			}
		}
	})

	
	
	
	let deviceuid = ''


	// click Logo
	const onClickLogo = (ev:any)=>{
		navigate(`/`+$module)
		$navigation = getArrayFromPath(`/`+$module)
	}

	// EXTERNAL VARIABLES
	export let logoImage = "/ICO_UP2_DATA.png"
	export let  bgcolor = "#ddefde"
	// WINDOW  VARIABLES
	export let title = 'DEVICES'
    export let disableClose = true
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
	export let toolbar:any = []
	// BAR VARIABLES
	export let  barheigth = "60px"
	export let imgheight = "60px"
	export let  topbarheight = "90%"
	export let avatarsize = "w-10"

	let pagesize = true
	let pSize = 8
	let devicedatacolumns = getDeviceDeployColumns($module)

	// DIALOG VARIABLES
	let deploydialog = DeployMain
	let deployDivName = "deploy-main-container"
	let dockerdialog = DockerMain
	let dockerDivName = "docker-main-container"
	
$: screensize = window.innerWidth

window.onresize = function(event:any) {
	screensize = window.innerWidth
}
let minscreensize = 850
</script>
 <div id="main-deploy-page">
		<div>
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
		</div>
		<div class="configurator-container" style="--top:{barheigth}">
			<Wmanag id="containerWManager"  
				title="{title}"
				{toolbar}
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
		<div>
			<svelte:component this={deploydialog} headercolor={bgcolor}/>
		</div>
		<div>
			<svelte:component this={dockerdialog} headercolor={bgcolor}/>
		</div>
</div>

<style>
.configurator-container{
		display:flex;
		position:relative;
		top: var(--top);
	}

</style>



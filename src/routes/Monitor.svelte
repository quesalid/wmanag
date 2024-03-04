<script lang="ts">
   // EXTERNAL
   import { navigate } from "svelte-routing";
   import {onMount} from "svelte"
   import { writable } from "svelte/store";
   // INTERNAL
   import {TopBar,Logo,DropDownMenu,AlertMessages,SideMenu,BreadCrumb} from "../lib/components/topbar"
   import { center } from '../lib/components/topbar/notifications';
   import Wmanag from '../lib/components/WManag.svelte'
   import {SimpleTable} from '../lib/components/table'
   import {getPointColumns} from '../lib/script/utils.js'
   import {dragElement} from '../lib/components/CompUtils.js'
   import {PointForm,DeleteForm} from '../lib/components/forms'
   import {Chart} from '../lib/components/chart'
   import {BatchDetail} from '../lib/components/contents'
   // API INTERFACE
   import {getDataPoints,
			setDataPoint,
			deleteDataPoint,
			getClonePoints,
			setClonePoint,
			deleteClonePoint,
			getMachines,
			getControllers} from '../lib/script/apidataconfig.js'
   // STORE
   import { mock,module,user,avatar,currdevice,avatargroups,avatarclass,navigation,getArrayFromPath} from '../lib/ustore.js'
   
  


   let pointsdata:any = writable([])
   let pointdatacolumns:any = getPointColumns($module.toUpperCase())
   let machines:any = []
   let controllers:any = []
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
		const filters:any = []
		let ret:any
		let ret1:any
		let ret2:any
		switch($module.toUpperCase()){
			case 'CLONE':
				ret = await getClonePoints(filters,$mock)
				titlepoint = 'BATCH LIST'
				chartdialog = BatchDetail
				modalIdChart = "BatchDetailDiv"
				toolbarpoint = []
				break;
			default:
				titlepoint = 'POINT LIST'
				ret = await getDataPoints(filters,$mock)
				ret1 = await getMachines([],$mock)
				machines = ret1.data
				ret2 = await getControllers([],$mock)
				controllers = ret2.data
				chartdialog = Chart
				modalIdChart = "PointChartDiv"
				toolbarpoint = [{type:'image',props:{src:'/ADD.svg'},function:onClickAddPoint,label:"Add"}]
				// ADD MACHINE NAMES
				for(let i=0;i<ret.data.length;i++){
					const index = machines.findIndex((item:any)=>item.uid == ret.data[i].machine)
					const index1 = controllers.findIndex((item:any)=>item.uid == ret.data[i].controller)
					if(index > -1)
						ret.data[i].machineName = machines[index].name
					else
						ret.data[i].machineName = 'NOTFOUND'
					if(index1 > -1)
						ret.data[i].controllerName = controllers[index1].name
					else
						ret.data[i].controllerName = 'NOTFOUND'
				}
				break;
		}
		pointdatacolumns = await getPointColumns($module.toUpperCase())
		$pointsdata = ret.data
		// ADD EVENT LITSENER FOR AGENT CONFIGURATION
		const monitorMainDiv = document.getElementById("main-monitor-page")
		/*if(monitorMainDiv){
			monitorMainDiv.addEventListener("agentclicked",async (e:any)=>{
				// SET CURRENT DEVICE IN STORE
				deviceuid = e.detail
				$currdevice = deviceuid
				// NAVIGATE TO AGENT PAGE
				console.log("AGENT CLICKED ---> ",deviceuid)
				navigate("/"+$module+"/configure/agent")
				$navigation = getArrayFromPath("/"+$module+"/configure/agent")
			})
		}*/
	});

	export let logoImage = "/ICO_UP2_DATA.png"
	export let logout = "/datalogin"
	export let  bgcolor = "#ddefde"

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

	// TABLE VARIABLES - CALLS PointForm edit with uid = 'NONE'
	let titlepoint = 'POINTS'
	let onClickAddPoint = (ev:any)=>{
		console.log("ONCLICK ADD CONTAINER")
		const modalEdit = document.getElementById(modalIdSave)
		const addClicked = new CustomEvent("editclicked", { detail: 'NONE' })
		modalEdit?.dispatchEvent(addClicked)
	}
	let toolbarpoint = [{type:'image',props:{src:'/ADD.svg'},function:onClickAddPoint,label:"Add"}]
	const disableClose = true
	const draggable = true
	let zindex = 4
    let headercolor = bgcolor
	let pagesize = true
	let pSize = 8
	

	// DIALOG VARIABLES
	let savedialog = PointForm
	let deletedialog = DeleteForm
	let chartdialog = Chart
	let modalIdSave = "PointInputDiv"
	let modalIdDel = "DeleteInputDiv"
	let modalIdChart = "PointChartDiv"
	let deleteTitle = "Clicking DELETE the point will be cancelled"
	let save = async (ev:any)=>{
		const target = ev.target
		const cdev = JSON.parse(target.dataset.cdev)
		// SET POINT - delete added fields
		let ret = await setDataPoint(cdev,$mock)
		// GET UPDATED POINT LIST
		const filters:any = []
		switch($module.toUpperCase()){
			case 'CLONE':
				ret = await setClonePoint(cdev,$mock)
				ret = await getClonePoints(filters,$mock)
				break;
			default:
			    ret = await setDataPoint(cdev,$mock)
				ret = await getDataPoints(filters,$mock)
				for(let i=0;i<ret.data.length;i++){
					const index = machines.findIndex((item:any)=>item.uid == ret.data[i].machine)
					const index1 = controllers.findIndex((item:any)=>item.uid == ret.data[i].controller)
					if(index > -1)
						ret.data[i].machineName = machines[index].name
					else
						ret.data[i].machineName = 'NOTFOUND'
					if(index1 > -1)
						ret.data[i].controllerName = controllers[index1].name
					else
						ret.data[i].controllerName = 'NOTFOUND'
				}
				break;
		}
		$pointsdata = ret.data
		// CLOSE FORM DIALOG
		const pointInputDiv = document.getElementById(modalIdSave)
		if(pointInputDiv)
			pointInputDiv.style.display= 'none'
	}
	let del = async (ev:any) =>{
		const target = ev.target
		const uid = target.dataset.uid
		// DELETE DEVICE
		let filters:any = [{uid:uid,_type:'eq'}]
		let ret = await deleteDataPoint(filters,$mock)
		// GET UPDATED DEVICE LIST
		filters = [{module:$module.toUpperCase(),_type:'eq'}]
		ret = await getDataPoints(filters,$mock)
		$pointsdata = ret.data
		// CLOSE FORM DIALOG
		const pointInputDiv = document.getElementById(modalIdDel)
		if(pointInputDiv)
			pointInputDiv.style.display= 'none'
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
				<DropDownMenu groups={$avatargroups} image="{$avatar}" 
						imagesize='{avatarsize}'
						message={$user.username}
						messageclass={$avatarclass}>
				</DropDownMenu>
				<SideMenu  topbarheight='{topbarheight}'/>
				</div>
			</TopBar>

		</div>
		<div class="configurator-container" style="--top:{barheigth}">
			<Wmanag id="containerWManager"  title="{titlepoint}" toolbar={toolbarpoint} {disableClose} {draggable} {headercolor} {zindex}>
				<SimpleTable slot="bodycontent" data={pointsdata} bind:datacolumns={pointdatacolumns} {pagesize} {pSize}/>
			</Wmanag>
		</div>
		<div id="save-device-dialog">
			<svelte:component this={savedialog} bind:modalId={modalIdSave} save={save} {bgcolor}/>
		</div>
		<div id="delete-device-dialog">
			<svelte:component this={deletedialog} bind:modalId={modalIdDel} del={del} {bgcolor} title={deleteTitle}/>
		</div>
		{#if $module.toUpperCase() == 'DATA' || $module.toUpperCase() == 'CLONE'}
			<div id="delete-device-dialog">
				<svelte:component this={chartdialog} bind:modalId={modalIdChart}  {bgcolor}/>
			</div>
		{/if}
</div>

<style>
.configurator-container{
		display:flex;
		position:relative;
		top: var(--top);
	}

</style>



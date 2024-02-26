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
   // API INTERFACE
   import {getDataPoints,
			setDataPoint,
			deleteDataPoint,
			getClonePoints,
			setClonePoint,
			deleteClonePoint} from '../lib/script/apidataconfig.js'
   // STORE
   import { mock,module,user,avatar,currdevice,avatargroups,avatarclass} from '../lib/ustore.js'
   
  


   let pointsdata:any = writable([])
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
		switch($module.toUpperCase()){
			case 'CLONE':
				ret = await getClonePoints(filters,$mock)
				break;
			default:
				ret = await getDataPoints(filters,$mock)
				break;
		}
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
	}

	// TABLE VARIABLES - CALLS PointForm edit with uid = 'NONE'
	const titlepoint = 'POINTS'
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
	let pointdatacolumns = getPointColumns($module.toUpperCase())

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
		// SET DEVICE
		let ret = await setDataPoint(cdev,$mock)
		// GET UPDATED DEVICE LIST
		const filters:any = []
		ret = await getDataPoints(filters,$mock)
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
				<SimpleTable slot="bodycontent" data={pointsdata} datacolumns={pointdatacolumns} {pagesize} {pSize}/>
			</Wmanag>
		</div>
		<div id="save-device-dialog">
			<svelte:component this={savedialog} bind:modalId={modalIdSave} save={save} {bgcolor}/>
		</div>
		<div id="delete-device-dialog">
			<svelte:component this={deletedialog} bind:modalId={modalIdDel} del={del} {bgcolor} title={deleteTitle}/>
		</div>
		{#if $module.toUpperCase() == 'DATA'}
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



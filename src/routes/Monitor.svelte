<script lang="ts">
   // EXTERNAL
   import { navigate } from "svelte-routing";
   import {onMount} from "svelte"
   import { writable } from "svelte/store";
   // INTERNAL
   import {TopBar,Logo,DropDownMenu,AlertMessages,SideMenu,BreadCrumb, ChatBot, DigitalClock} from "../lib/components/topbar"
   import { center } from '../lib/components/topbar/notifications';
   import {getPointColumns} from '../lib/script/utils.js'
   import {PointForm,DeleteForm} from '../lib/components/forms'
   import {Chart} from '../lib/components/chart'
   import {BatchDetail,SynBatchDetail,MonitorManager} from '../lib/components/contents'
   // API INTERFACE
   import {getDataPoints,
			setDataPoint,
			deleteDataPoint,
			getClonePoints,
			setClonePoint,
			deleteClonePoint,
			getLearnPoints,
			setLearnPoint,
			deleteLearnPoint,
			getEntityControlled,
			getControllers,
			getEntityMain} from '../lib/script/apidataconfig.js'
   // STORE
   import { mock,module,user,avatar,avatargroups,avatarclass,navigation,getArrayFromPath} from '../lib/ustore.js'
   // UTILITY
   import {getGroups} from '../lib/script/utils.js'

   // ADD SIDEBAR NENU ON USER BASIS
   let  groups = getGroups($module,$user)

   
   // EXPORT VARIABLES
   export let logoImage = "/ICO_UP2_DATA.png"
   export let  bgcolor = "#ddefde"
  
    // BAR VARIABLES
	const barheigth = "60px"
	const imgheight = "60px"
	const topbarheight = "90%"
	const avatarsize = "w-10"
	const onClickLogo = (ev:any)=>{
		navigate(`/`+$module)
		$navigation = getArrayFromPath(`/`+$module)
	}

   // WINDOW MANAGER VARIABLES
	let titlepoint = 'POINTS'
	let onClickAddPoint = (ev:any)=>{
		console.log("ONCLICK ADD CONTAINER")
		const modalEdit = document.getElementById(modalIdEdit)
		const addClicked = new CustomEvent("editclicked", { detail: 'NONE' })
		modalEdit?.dispatchEvent(addClicked)
	}
	let toolbarpoint = [{type:'image',props:{src:'/ADD.svg'},function:onClickAddPoint,label:"Add"}]
	const disableClose = true
	const draggable = true
	let zindex = 4
    let headercolor = bgcolor
   // TABLE VARIABLES
   let pointsdata:any = writable([])
   let pointdatacolumns:any = getPointColumns($module.toUpperCase())
   let pagesize = true
   let pSize = 8
   // DIALOG VARIABLES
	let savedialog = PointForm
	let deletedialog = DeleteForm
	let chartdialog = Chart
	let modalIdEdit = "PointInputDiv"
	let modalIdDel = "DeleteInputDiv"
	let modalIdChart = "PointChartDiv"
	let deleteTitle = "Clicking DELETE the point will be cancelled"

   let controlledentities:any = []
   let controllers:any = []
   let mainentities:any = []
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
			    // SWITCH FAMILY
				ret = await getClonePoints(filters,$mock)
				titlepoint = 'BATCH LIST'
				ret1 = await getEntityMain([],$mock)
				mainentities = ret1.data
				chartdialog = BatchDetail
				modalIdChart = "BatchDetailDiv"
				toolbarpoint = []
				// ADD MACHINE NAMES
				for(let i=0;i<ret.data.length;i++){
					const index = mainentities.findIndex((item:any)=>item.uid == ret.data[i].plant)
					if(index > -1)
						ret.data[i].plantName = mainentities[index].name
					else
						ret.data[i].plantName = 'NOTFOUND'
				}
				break;
			case 'LEARN':
			    // SWITCH FAMILY
				ret = await getLearnPoints(filters,$mock)
				titlepoint = 'SIMULATION LIST'
				ret1 = await getEntityMain([],$mock)
				mainentities = ret1.data
				chartdialog = SynBatchDetail
				modalIdChart = "SynBatchDetailDiv"
				toolbarpoint = []
				// ADD MACHINE NAMES
				for(let i=0;i<ret.data.length;i++){
					const index = mainentities.findIndex((item:any)=>item.uid == ret.data[i].plant)
					if(index > -1)
						ret.data[i].plantName = mainentities[index].name
					else
						ret.data[i].plantName = 'NOTFOUND'
				}
				break;
			default:
				titlepoint = 'POINT LIST'
				ret = await getDataPoints(filters,$mock)
				ret1 = await getEntityControlled([],$mock)
				controlledentities = ret1.data
				//console.log("MONITOR CONTROLLED ENTITIES",controlledentities)
				ret2 = await getControllers([],$mock)
				controllers = ret2.data
				chartdialog = Chart
				modalIdChart = "PointChartDiv"
				toolbarpoint = [{type:'image',props:{src:'/ADD.svg'},function:onClickAddPoint,label:"Add"}]
				// ADD MACHINE NAMES
				for(let i=0;i<ret.data.length;i++){
					const index = controlledentities.findIndex((item:any)=>item.uid == ret.data[i].machine)
					const index1 = controllers.findIndex((item:any)=>item.uid == ret.data[i].controller)
					if(index > -1)
						ret.data[i].machineName = controlledentities[index].name
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
	});

	
	
	let edit = async (ev:any)=>{
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
					const index = controlledentities.findIndex((item:any)=>item.uid == ret.data[i].machine)
					const index1 = controllers.findIndex((item:any)=>item.uid == ret.data[i].controller)
					if(index > -1)
						ret.data[i].machineName = controlledentities[index].name
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
		const pointInputDiv = document.getElementById(modalIdEdit)
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
		<MonitorManager
			pointsdata={pointsdata}
			pointdatacolumns={pointdatacolumns}
			titlepoint={titlepoint}
			toolbarpoint={toolbarpoint}
			disableClose={disableClose}
			draggable={draggable}
			headercolor={headercolor}
			zindex={zindex}
			pagesize={pagesize}
			pSize={pSize}
			savedialog={savedialog}
			deletedialog={deletedialog}
			chartdialog={chartdialog}
			modalIdEdit={modalIdEdit}
			modalIdDel={modalIdDel}
			modalIdChart={modalIdChart}
			deleteTitle={deleteTitle}
			edit={edit}
			del={del}
			bgcolor={bgcolor}

		/>
</div>

<style>

</style>



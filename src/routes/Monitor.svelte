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
   import {getPointColumns} from '../lib/script/utils.js'
   import {PointForm,DeleteForm} from '../lib/components/forms'
   import {ChartPoint} from '../lib/components/chart'
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
   import {getSecurityAlerts} from '../lib/script/apisecurity.js'
   // STORE
   import { mock,
			module,
			user,
			avatar,
			avatargroups,
			avatarclass,
			navigation,
			getArrayFromPath} from '../lib/ustore.js'
   // UTILITY
   import {getGroups, loadComponent} from '../lib/script/utils.js'

   // ADD SIDEBAR NENU ON USER BASIS
   let  groups = getGroups($module,$user)

   
    export let logoImage = "/ICO_UP2_DATA.png"
	// WINDOW VARIABLES
	export let  bgcolor = "#ddefde"
	export let titlefontsize = "15px"
	export let titlecolor = "#666"
	export let titleweight = "bold"
	export let bodycolor = "#ffffff"
	
	// BAR VARIABLES
	export let barheigth = "60px"
	export let imgheight = "60px"
	export let topbarheight = "90%"
	export let  avatarsize = "w-10"

	let entityName = 'PLANTS'
	let monitor:any = {windows:[]}

	const onClickLogo = (ev:any)=>{
		navigate(`/`+$module)
		$navigation = getArrayFromPath(`/`+$module)
	}

   // WINDOW MANAGER VARIABLES
	let onClickAddPoint = (ev:any)=>{
		console.log("ONCLICK ADD CONTAINER")
		const modalEdit = document.getElementById(modalIdEdit)
		const addClicked = new CustomEvent("editclicked", { detail: 'NONE' })
		modalEdit?.dispatchEvent(addClicked)
	}
	
	const disableClose = true
	const draggable = true
	let zindex = 4
   // TABLE VARIABLES
   let pointsdata:any = writable([])
   let pointdatacolumns:any = getPointColumns($module.toUpperCase())
   let pagesize = true
   let pSize = 8
   
   // DIALOG VARIABLES
	let modalIdEdit = "PointInputDiv"
	let modalIdDel = "DeleteInputDiv"
	let deleteTitle = "Clicking DELETE the point will be cancelled"

   let controlledentities:any = []
   let controllers:any = []
   let mainentities:any = []


   

	const getColorScheme = (type:any)=>{
		let colorScheme = {wincolor:"#ddefde"}
		let profile = $user.profile
		let mod = $user.profile.modules.find((item:any) => item.name == $module.toLowerCase())
		let monitor:any = mod.windows.monitor
		
		if(monitor && monitor.colorScheme)
			colorScheme = monitor.colorScheme
		
		return colorScheme
	}

	// get color scheme
	let colorScheme:any = getColorScheme($module.toUpperCase())

   // contiene i componenti caricati dinamicamente
	let components:any =[]

	const loadComponents = async (dashboard:any)=>{
		for(let i=0;i<dashboard.length;i++){
			const win = dashboard[i]
			let props:any = {
				headercolor:colorScheme.wincolor,
				title:win.name,
				top:win.top,
				left:win.left,
				height:win.height,
				width:win.width,
				bgcolor:bgcolor,
				titlefontsize:titlefontsize,
				titlecolor:titlecolor,
				titleweight:titleweight,
				zindex:win.zindex?win.zindex:zindex,
				bodycolor:bodycolor,
				showheader:win.showheader?win.showheader:true,
				resize:win.resize?win.resize:'none',
				bordercolor:win.bordercolor?win.bordercolor:"#c0c0c0",
				boxshadow:win.boxshadow?win.boxshadow:"0px 0px 0px 0px #000000",
				minimized:win.minimized?win.minimized:'off',
				draggable:draggable,
				disableClose:disableClose
			}
			if(win.visible == 'visible'){
				try{
					let moduleName = ''
					const filters:any = []
					let ret:any
					let ret1:any
					let ret2:any
					//let modulePath = '/src/lib/components/contents/index.js'
					// includi i props specifici per il componente che non sono binding
					switch(win.id){
						case 'Monitordata':
							props.chartdialog = ChartPoint
							props.savedialog = PointForm
							props.deletedialog = DeleteForm
							props.modalIdChart = "PointChartDiv"
							props.modalIdEdit = "PointInputDiv"
							props.modalIdDel = "DeleteInputDiv"
							props.deleteTitle = deleteTitle
							props.toolbarpoint = [{type:'image',props:{src:'/ADD.svg'},function:onClickAddPoint,label:"Add"}]
							props.edit = edit
							props.del = del
							props.pagesize = pagesize
							props.pSize = pSize
							ret = await getDataPoints(filters,$mock)
							ret1 = await getEntityControlled([],$mock)
							controlledentities = ret1.data
							ret2 = await getControllers([],$mock)
							controllers = ret2.data
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
							$pointsdata = ret.data
							moduleName = 'MonitorManager'
						break;
						case 'Monitorclone':
							props.chartdialog = BatchDetail
							props.savedialog = PointForm
							props.deletedialog = DeleteForm
							props.modalIdChart = "BatchDetailDiv"
							props.modalIdEdit = "PointInputDiv"
							props.modalIdDel = "DeleteInputDiv"
							props.deleteTitle = deleteTitle
							props.toolbarpoint = []
							props.edit = edit
							props.del = del
							props.pagesize = pagesize
							props.pSize = pSize
							ret = await getClonePoints(filters,$mock)
							ret1 = await getEntityMain([],$mock)
							mainentities = ret1.data
							for(let i=0;i<ret.data.length;i++){
								const index = mainentities.findIndex((item:any)=>item.uid == ret.data[i].plant)
								if(index > -1)
									ret.data[i].plantName = mainentities[index].name
								else
									ret.data[i].plantName = 'NOTFOUND'
							}
							$pointsdata = ret.data
							moduleName = 'MonitorManager'
						break;
						case 'Monitorlearn':
						    props.chartdialog = SynBatchDetail
							props.savedialog = PointForm
							props.deletedialog = DeleteForm
							props.modalIdChart = "SynBatchDetailDiv"
							props.modalIdEdit = "PointInputDiv"
							props.modalIdDel = "DeleteInputDiv"
							props.deleteTitle = deleteTitle
							props.toolbarpoint = []
							props.edit = edit
							props.del = del
							props.pagesize = pagesize
							props.pSize = pSize
							ret = await getLearnPoints(filters,$mock)
							ret1 = await getEntityMain([],$mock)
							mainentities = ret1.data
							$pointsdata = ret.data
							for(let i=0;i<ret.data.length;i++){
								const index = mainentities.findIndex((item:any)=>item.uid == ret.data[i].plant)
								if(index > -1)
									ret.data[i].plantName = mainentities[index].name
								else
									ret.data[i].plantName = 'NOTFOUND'
							}
							moduleName = 'MonitorManager'
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
		console.log("Loaded Components monitor",components)
	}



	onMount(async () => {
		const retalert = await getSecurityAlerts([],$mock)
		const securityAlerts = retalert.data
		const messages = securityAlerts.map((item:any)=>item.message)
		center.init(messages)

		// A. GET PROFILE DASHBOARD 
		const mod = $user.profile.modules.find((item:any) => item.name == $module.toLowerCase())
		if(mod)
			monitor = mod.windows.monitor

		// A1. LOAD COMPONENTS
		await loadComponents(monitor)

		pointdatacolumns =  getPointColumns($module.toUpperCase())
	})

	
	
	let edit = async (ev:any)=>{
		const target = ev.target
		const cdev = JSON.parse(target.dataset.cdev)
		// SET POINT - delete added fields
		//let ret = await setDataPoint(cdev,$mock)
		let ret:any
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
		let ret:any
		let mod = $module.toUpperCase()
		switch(mod){
			case 'CLONE':
				ret = await deleteClonePoint(filters,$mock)
				filters = [{module:mod,_type:'eq'}]
				ret = await getClonePoints(filters,$mock)
				$pointsdata = ret.data
				break;
			default:
				ret = await deleteDataPoint(filters,$mock)
				// GET UPDATED DEVICE LIST
				filters = [{module:mod,_type:'eq'}]
				ret = await getDataPoints(filters,$mock)
				$pointsdata = ret.data
				break;
		}
		// CLOSE FORM DIALOG
		const pointInputDiv = document.getElementById(modalIdDel)
		if(pointInputDiv)
			pointInputDiv.style.display= 'none'
	}

	
let screensize = window.innerWidth
$: {
	screensize = window.innerWidth
	// force update
	if(components && pointdatacolumns){
		components = [...components]
		//$devicesdata = $devicesdata
		pointdatacolumns = [...pointdatacolumns]
	}
}

window.onresize = function(event:any) {
	screensize = window.innerWidth
}

let minscreensize = 850

</script>
 <div id="main-monitor-page">
			<TopBar barheight='{barheigth}' bgcolor='{bgcolor}'>
				<div slot="lefttop">
					<div style="display: flex; viewport-fit: 100%;">
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

		<div class="monitor-container" style="--top:{barheigth}" id="monitor-container-id">
			{#each components as Component}
				{#if Component.win.id == 'Monitordata' || Component.win.id == 'Monitorclone' || Component.win.id == 'Monitorlearn'}
					<svelte:component this={Component.component} {...Component.props} pointsdata={pointsdata} bind:pointdatacolumns={pointdatacolumns}/>
				{/if}
			{/each}
		</div>
</div>

<style>
.monitor-container{
	display:flex;
	position:relative;
	top: var(--top);
	height: calc( 100vh - 50px );
}
</style>



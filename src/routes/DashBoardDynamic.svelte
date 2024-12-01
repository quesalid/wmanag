<script lang="ts">
   // EXTERN IMPORT
   import { navigate } from "svelte-routing";
   import {onMount} from "svelte"
   import { writable } from "svelte/store";
   // INTERN IMPORT
   import {TopBar,
			Logo,
			DropDownMenu,
			AlertMessages,
			SideMenu,
			BreadCrumb,
			DigitalClock} from "../lib/components/topbar"
   import {ChartPoint} from '../lib/components/chart'
   //Managers
   import {DonutClicked,
			BatchDetail,
			SynBatchDetail,} from '../lib/components/contents'
   import { center } from '../lib/components/topbar/notifications';
   // UTILS
   import {setConicData, getPointColumns, getDataPointColumnReduced} from '../lib/script/utils.js'
   //API
   import {getEntityMain,
			getDevices,
			getAgents,
			getDataPoints,
			getEntityControlled,
			getControllers,
			getLearnPoints,
			getClonePoints,
			getSectionData,
			getTwinData} from '../lib/script/apidataconfig.js'
   import {getSecurityAlerts} from '../lib/script/apisecurity.js'
   // STORE
   import {module, 
			mock,
			navigation,
			getArrayFromPath, 
			avatar,
			avatargroups,
			avatarclass,
			user,
			getEntityNames,
			family} from '../lib/ustore.js'

   // UTILITY
   import {getGroups, loadComponent} from '../lib/script/utils.js'


   // ADD SIDEBAR NENU ON USER BASIS
   let  groups = getGroups($module,$user)
   
	let plants:any = []
	let devices:any = []
	let agents:any = []
	let dashboard:any = {windows:[]}
	
	const findWindow = (id:any)=>{
		let profile:any = $user.profile
		let mod = $user.profile.modules.find((item:any) => item.name == $module.toLowerCase())
		let dashboard:any = mod.windows.dashboard
		let win = dashboard.find((item:any) => item.id == id)
		return win
	}

	const getColorScheme = (type:any)=>{
		let colorScheme = {wincolor:"#ddefde"}
		let profile = $user.profile
		let mod = $user.profile.modules.find((item:any) => item.name == $module.toLowerCase())
		let dashboard:any = mod.windows.dashboard
		
		if(dashboard && dashboard.colorScheme)
			colorScheme = dashboard.colorScheme
		
		return colorScheme
	}

	// Get configured parameters from profile window
	const mapapp = findWindow('Map')
	
	let mapcenter = mapapp && mapapp.params && mapapp.params.center? [mapapp.params.center.lon,mapapp.params.center.lat]:[-0.12755,51.507222]
	let mapzoom = mapapp && mapapp.params && mapapp.params.zoom? mapapp.params.zoom: 10
	let mapzoomfactor = mapapp && mapapp.params && mapapp.params.zoomfactor? mapapp.params.zoomfactor: 3
	let markeroffset = mapapp && mapapp.params && mapapp.params.markeroffset? mapapp.params.markeroffset: 0.000015
	let mappitch = mapapp && mapapp.params && mapapp.params.pitch? mapapp.params.pitch: 0
	let mapbearing = mapapp && mapapp.params && mapapp.params.bearing? mapapp.params.bearing: 0

	const fsimapp = findWindow('Firesim')
	let fsiminitlat = fsimapp && fsimapp.params && fsimapp.params.initlat? fsimapp.params.initlat: 45.0
	let fsiminitlon = fsimapp && fsimapp.params && fsimapp.params.initlon? fsimapp.params.initlon: 7.0
	let fsiminitzoom = fsimapp && fsimapp.params && fsimapp.params.initzoom? fsimapp.params.initzoom: 10
	let fsimmaxzoom = fsimapp && fsimapp.params && fsimapp.params.maxzoom? fsimapp.params.maxzoom: 19
	let fswidth = fsimapp && fsimapp.params && fsimapp.params.width? fsimapp.params.width: '100%'
	let fsheight = fsimapp && fsimapp.params && fsimapp.params.height? fsimapp.params.height: '100vh'
	let cellSize = fsimapp && fsimapp.params && fsimapp.params.cellSize? fsimapp.params.cellSize: 0.1
	let bbox = fsimapp && fsimapp.params && fsimapp.params.bbox? fsimapp.params.bbox: [6.5, 45, 7.5, 46]
	
	const waterapp = findWindow('Netmap')
	let wminitlon = waterapp && waterapp.params && waterapp.params.initlon? waterapp.params.initlon: 7.0
	let wminitlat = waterapp && waterapp.params && waterapp.params.initlat? waterapp.params.initlat: 45.0
	let wminitzoom = waterapp && waterapp.params && waterapp.params.initzoom? waterapp.params.initzoom: 10
	let wmmaxzoom = waterapp && waterapp.params && waterapp.params.maxzoom? waterapp.params.maxzoom: 19
	let wmwidth = waterapp && waterapp.params && waterapp.params.width? waterapp.params.width: '100%'
	let wmheight = waterapp && waterapp.params && waterapp.params.height? waterapp.params.height: '100vh'

	// get color scheme
	let colorScheme:any = getColorScheme($module.toUpperCase())
	
	// pointdata for AlarmManager and MonitorManager
	let pointsdata:any = writable([])
    let pointdatacolumns:any = getDataPointColumnReduced($module.toUpperCase())
	let alarmsdata:any = writable([])
	let chartdialog:any = ChartPoint
	let modalIdChart:any = "PointChartDiv"
	// markers for MapManager
	let markers:any = []
	let key = 0

	let machines:any = []
	let controllers:any = []
	// VARIABLES FOR LEAFLET MAP
	let sectionData:any = []
	let psize = 2
	let map:any
	let twindata:any
	let twindataarray:any = []

	const getAlarmData = async ()=>{
		 return new Promise(async (resolve, reject) => {
				const filters:any = [{module:$module.toUpperCase(),_type:'eq'},{type:'ALARM',_type:'eq'},{lastvalue:'ON',_type:'eq'}]
				const pagination:any = {_order:{lasttime:"DESC"},_offset:0,_limit:null}
				// Here we get the data from the API
				let ret:any = []
				switch($module.toUpperCase()){
					case 'DATA':
						ret = await getDataPoints(filters,$mock,pagination)
						break;
					case 'CLONE':
						ret = await getClonePoints(filters,$mock,pagination)
						break;
					case 'LEARN':
						ret = await getLearnPoints(filters,$mock,pagination)
						break;
					case 'AI':
						ret = []
						break;
				}
				if(ret && ret.data){
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
					resolve(ret.data)
				}else{
					resolve([])
				}
		})
	}

	const getPoints = async ()=>{
		return new Promise(async (resolve, reject) => {
			const filters:any = [{module:$module.toUpperCase(),_type:'eq'}]
			const pagination:any = {_order:{lasttime:"DESC"},_offset:0,_limit:null}
			// Here we get the data from the API
			let ret:any = []
			switch($module.toUpperCase()){
				case 'DATA':
					ret = await getDataPoints(filters,$mock,pagination.$pointsdata)
					pointdatacolumns = getDataPointColumnReduced($module.toUpperCase())
					chartdialog = ChartPoint
					modalIdChart = "PointChartDiv"
					break;
				case 'CLONE':
					ret = await getClonePoints(filters,$mock,pagination.$pointsdata)
					pointdatacolumns = getDataPointColumnReduced($module.toUpperCase())
					chartdialog = BatchDetail
					modalIdChart = "BatchDetailDiv"
					break;
					case 'LEARN':
					ret = await getLearnPoints(filters,$mock,pagination,$pointsdata)
					pointdatacolumns = getDataPointColumnReduced($module.toUpperCase())
					chartdialog = SynBatchDetail
					modalIdChart = "SynBatchDetailDiv"
					break;
					case 'AI':
					ret = []
					break;
			}
			// check if ret data not empty
			if(ret && ret.data){
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
				resolve(ret.data)
			}else{
				resolve([])
			}
		})
	
	}

	// contiene i componenti caricati dinamicamente
	let components:any =[]

	const loadComponents = async (dashboard:any)=>{
		for(let i=0;i<dashboard.length;i++){
			const win = dashboard[i]
			let props:any = {
				headercolor:colorScheme.wincolor,
				title:entityName,
				top:win.top,
				left:win.left,
				height:win.height,
				width:win.width,
				bgcolor:bgcolor,
				titlefontsize:titlefontsize,
				titlecolor:titlecolor,
				titleweight:titleweight,
				bodycolor:bodycolor,
				minimized:win.minimized?win.minimized:'off'
			}
			if(win.visible == 'visible'){
				try{
					let moduleName = ''
					//let modulePath = '/src/lib/components/contents/index.js'
					// includi i props specifici per il componente che non sono binding
					switch(win.id){
						case 'Map':
							props.initZoom = mapzoom
							props.initCenter = mapcenter
							props.zoomfactor = mapzoomfactor
							props.pitch = mappitch
							props.bearing = mapbearing
							props.managerid = mapManagerId
							moduleName = 'MapManager'
							break;
						case 'Donut':
							moduleName = 'DonutManager'
							props.managerid = donutManagerId
							break;
						case 'Alarms':
							props.psize = 9
							props.resize = 'both'
							props.doAction = doAction
							props.modalIdEdit = modalIdActionDiv
							props.managerid = alarmManagerId
							moduleName = 'AlarmManager'
							break;
						case 'Monitor':
							props.pointsdata = pointsdata
							props.chartdialog = chartdialog
							props.modalIdChart = modalIdChart
							props.managerid = monitorManagerId
							moduleName = 'MonitorManager'
							break;
						case 'Communication':
							props.resize = 'both'
							props.showheader = true
							props.params = win.params
							props.managerid = commManagerId
							moduleName = 'CommManager'
							break;
						case 'Chart':
							props.draggable = true
							props.managerid = chartManagerId
							moduleName = 'ChartManager'
							break;
						case 'Chartchoice':
							props.draggable = false
							props.showheader = false
							props.resize = 'none'
							props.zindex = 4
							props.managerid = chartChoiceManagerId
							moduleName = 'ChartChoiceManager'
							break;
						case 'Firesim':
							props.initlat = fsiminitlat
							props.initlon = fsiminitlon
							props.initzoom = fsiminitzoom
							props.maxzoom = fsimmaxzoom
							props.cellSize = cellSize
							props.bbox = bbox
							props.fswidth = fswidth
							props.fsheight = fsheight
							props.managerid = fireSimManagerId
							moduleName = 'FireSimManager'
							break;
						case 'Netmap':
							props.initlat = wminitlat
							props.initlon = wminitlon
							props.initzoom = wminitzoom
							props.maxzoom = wmmaxzoom
							props.fswidth = wmwidth
							props.fsheight = wmheight
							props.managerid = waterMapManagerId
							moduleName = 'NetMapManager'
							break;
						case 'Section':
							props.initlat = wminitlat
							props.initlon = wminitlon
							props.initzoom = wminitzoom
							props.twinwin = 'defaultTwinManager'
							props.d3win = 'defaultD3Manager'
							props.managerid = sectionManagerId
							moduleName = 'SectionManager'
							break;
						case 'Asset':
							props.containerClass='map-container-maplibre'
							props.d3win = 'defaultD3LibreManager'
							props.managerid = sectionManagerId
							moduleName = 'AssetManager'
							break;
						case 'Twin':
							props.managerid = twinManagerId
							moduleName = 'TwinManager'
							break;
						case 'Assetgraph':
							props.zindex = 4
							props.managerid = assetGraphManagerId
							moduleName = 'AssetGraphManager'
							break;
						case 'D3':
							props.managerid = d3ManagerId
							moduleName = 'D3Manager'
							break;
						case 'D3Libre':
							props.containerClass='map-container-maplibre'
							props.managerid= d3ManagerId
							moduleName = 'D3LibreManager'
							break;
						case 'AIManager':
							props.managerid = twinManagerId
							moduleName = 'AIManager'
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
		console.log("Loaded Components",components)
	}

	onMount(async () => {
		const retalert = await getSecurityAlerts([],$mock)
		const securityAlerts = retalert.data
		const messages = securityAlerts.map((item:any)=>item.message)
		center.init(messages)
		// A. GET PROFILE DASHBOARD 
		const mod = $user.profile.modules.find((item:any) => item.name == $module.toLowerCase())
		if(mod)
			dashboard = mod.windows.dashboard

		// A1. LOAD COMPONENTS
		await loadComponents(dashboard)

		// B. GET ENTITY NAMES BY APP FAMILY
		const ret = getEntityNames($family)
		entityName = ret.main.plural.toUpperCase()
		
		// C. GET DONUT BY MODULE TYPE
		donut = await getDonutByType()
		const donutDiv = document.getElementById(donut.id)
		const donutRedraw = new CustomEvent("donutredraw", { detail: 'redraw' })
		donutDiv?.dispatchEvent(donutRedraw)
		key = key+1

		// C1. GET MACHINES
		const retmachines = await getEntityControlled([],$mock)
		machines = retmachines.data
		// C2. GET CONTROLLERS
		const retcontrollers = await getControllers([],$mock)
		controllers = retcontrollers.data
		// D. GET POINTS DATA
		$pointsdata = await getPoints()
		// E. GET ALARMS DATA
		$alarmsdata = await getAlarmData()
		// E1. FILTER OUT ALARMS FROM pointdata
		$pointsdata = $pointsdata.filter((item:any)=>item.type != 'ALARM')
		// F. GET SECTION COORDS
		//const retsc = await getSectionCoords([],$mock)
		//sectionCoords = retsc.data

		// F1. GET TWIN DATA
		const twinName = mod.data && mod.data.twinSelector?mod.data.twinSelector:'defaultTwinManager'
		const filters = [{name:twinName,_type:'eq'}]
		const rettwin = await getTwinData(filters,$mock)
		twindataarray = rettwin.data
		// se l'array contiene un elemento assegna le sezioni del primo elemento a sectionCoords
		if(twindataarray.length > 0){
			twindata = twindataarray[0]
			sectionData = twindata.sections
		}
		
		const findFreeOffset:any = (lon:any,lat:any,machine='')=>{
			for(let i=0;i<$alarmsdata.length;i++){
				const m = $alarmsdata[i]
				const foundMarker = markers.find((item:any)=>item.lngLat[0] == lon && item.lngLat[1] == lat)
				if(foundMarker){
					let lonoffset = markeroffset
					lon+=lonoffset
				}else{
					break
				}
			}
			return [lon,lat]
		}
		
			for(let i=0; i<$alarmsdata.length;i++){
				const m = $alarmsdata[i]
				let ilon = m.lon?m.lon:mapcenter[0]
				let ilat = m.lat?m.lat:mapcenter[1]
				const [lon,lat] = findFreeOffset(ilon,ilat,m.machineName)
				
				markers.push({
					lngLat:[lon,lat],
					name:m.tag,
					description:m.description,
					uid: m.uid,
					machine:m.machineName,
					marker:null
				})
			}
			
		
	});

	export let logoImage = "/ICO_UP2_DATA.png"
	// WINDOW VARIABLES
	export let  bgcolor = "#ddefde"
	export let titlefontsize = "15px"
	export let titlecolor = "#666"
	export let titleweight = "bold"
	export let bodycolor = "#ffffff"
	export let bordercolor = "#c0c0c0"
	let transparentcolor = "rgba(0,0,0,0)"
	// BAR VARIABLES
	export let barheigth = "60px"
	export let imgheight = "60px"
	export let topbarheight = "90%"
	export let  avatarsize = "w-10"

	let entityName = 'PLANTS'
	let titleChart = 'GRAPH'
	let titleAlarms = 'ALARMS'
	let titleMonitor = 'MONITOR'
	let titleComm = 'COMMUNICATION'
	let titleFiresim = 'FIRE SIMULATION'
	
	


	// DONUT
	const donut3 = {
		id:"donut-deafult",
		dbTitle: "",
		donutWidth: '300px',
		donutHeight: '300px',
		pageId:"dashboard-container-id",
		showTitle:true,
		conicData: [
		]
	}
	let donut:any = donut3

	// click Logo
	const onClickLogo = (ev:any)=>{
		navigate(`/`+$module)
		$navigation = getArrayFromPath(`/`+$module)
	}

	const getDonutByType = async ()=>{
		let dbret:any
		let filters:any =[]

		dbret = await getEntityMain(filters,$mock)
		plants = dbret.data
		dbret = await getDevices(filters,$mock)
		devices = dbret.data
		dbret = await getAgents(filters,$mock)
		agents = dbret.data
		
		let conicData:any = []
		let ret:any = {}
		switch($module.toUpperCase()){
			case 'DATA':
				ret.dbTitle = "AGENTS"
				ret.donutWidth = '280px'
				ret.donutHeight = '280px'
				conicData = setConicData(agents,devices,plants,'AGENTS')
				ret.conicData = conicData
				break;
			case 'CLONE':
				ret.dbTitle = "RECORDERS"
				ret.donutWidth = '300px'
				ret.donutHeight = '300px'
				conicData = setConicData(agents,devices,plants,'RECORDERS')
				ret.conicData = conicData
				break;
			case 'LEARN':
				ret.dbTitle = "PLAYERS"
				ret.donutWidth = '300px'
				ret.donutHeight = '300px'
				conicData = setConicData(agents,devices,plants,'PLAYERS')
				ret.conicData = conicData
				break;
			case 'AI':
				ret.dbTitle = "MODELS"
				ret.donutWidth = '300px'
				ret.donutHeight = '300px'
				conicData = setConicData(agents,devices,plants,'MODELS')
				ret.conicData = conicData
				break;	
		}
		ret.id = "donut-default-id"
		ret.donutWidth = '220px'
		ret.donutHeight = '220px'
		ret.pageId = "donutClickedDiv"
		ret.showTitle =true
		return(ret)
	}

	// MANAGER IDS
	let fireSimManagerId = 'fireSimManagerId'
	let waterMapManagerId = 'waterMapManagerId'
	let sectionManagerId = 'sectionManagerId'
	let mapManagerId = 'mapManagerId'
	let alarmManagerId = 'alarmManagerId'
	let donutManagerId = 'donutManagerId'
	let monitorManagerId = 'monitorManagerId'
	let commManagerId = 'commManagerId'
	let chartManagerId = 'chartManagerId'
	let modalIdActionDiv = "AlarmActionDiv"
	let chartChoiceManagerId = 'chartChoiceManagerId'
	let twinManagerId = 'twinManagerId'
	let d3ManagerId = 'd3ManagerId'
	let assetGraphManagerId = 'assetGraphManagerId'

	// Container event managers
	/*ALARM CONTAINER DO ACTION
		Receive alarm object in cdev
		A. Send alarm action to map manager
		B. Change alarmsdata value
		C. Change origin element class
		D. Save action in alarm history
	*/
	const  doAction =  (ev:any)=>{
		const target = ev.target
		const cdev = target.dataset.cdev
		const originid = target.dataset.originid
		const alarmaction = JSON.parse(cdev)
		
		// A. Send alarm action to map manager
		const mapDiv = document.getElementById(mapManagerId)
		const alarmActionlicked = new CustomEvent("alarmaction", { detail: { uid: alarmaction.alarmuid, action:alarmaction.action } })
		mapDiv?.dispatchEvent(alarmActionlicked)
		// B. Change alarmsdata value
		const index = $alarmsdata.findIndex((item:any)=>item.uid == alarmaction.alarmuid)
		if(index > -1){
			$alarmsdata[index].lastvalue = alarmaction.status
			$alarmsdata = [...$alarmsdata]
		}
		// C. Change origin element class
		changeOriginClass(originid,alarmaction.action)

		// Close dave panel
		const thisDiv = document.getElementById(modalIdActionDiv)
		if(thisDiv)
			thisDiv.style.display = 'none'
	}

	const alarmTextClasses =[
	{action:'ACKNOWLEDGE',color:'orange'},
	{action:'RESUME',color:'red'},
	{action:'SUSPEND',color:'fuchsia'},
	{action:'DROP',color:'green'},
]
	const changeOriginClass = (originid:any,action:any) =>{
		const origin = document.getElementById(originid)
		const color = alarmTextClasses.find((item:any)=>item.action == action)
		if(origin){
			origin.style.color = color?color.color:'gray'
			if(action == 'RESUME'){
				origin.classList.add("blinking-text")
				origin.classList.remove("unblinking-text")
			}else{
				origin.classList.add("unblinking-text")
				origin.classList.remove("blinking-text")
			}
		}
	}

let screensize = window.innerWidth
$: {
	screensize = window.innerWidth
	// force update
	if(components)
	components = [...components]
	
}

window.onresize = function(event:any) {
	screensize = window.innerWidth
}
let minscreensize = 850
</script>
<div id="main-dashboard-page">
		
			<TopBar barheight='{barheigth}' bgcolor='{bgcolor}'>
				<div slot="lefttop">
					<div style="display: flex;">
					<Logo logofilename="{logoImage}" imgheight={imgheight} onClick={onClickLogo}>
					</Logo>
					<!-- if screen size < 200 don't show Digital Clock -->
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

		
		<div class="dashboard-container" style="--top:{barheigth}" id="dashboard-container-id">
			{#each components as Component}
				{#if Component.win.id == 'Donut'}
					<svelte:component this={Component.component} {...Component.props} bind:donut={donut} bind:key={key}/>
				{:else if Component.win.id == 'Map'}
					<svelte:component this={Component.component} {...Component.props} bind:mapdata={$alarmsdata} bind:markers={markers}/>
				{:else if Component.win.id == 'Alarms'}
					<svelte:component this={Component.component} {...Component.props} bind:alarmsdata={alarmsdata}/>
				{:else if Component.win.id == 'Monitor'}
					<svelte:component this={Component.component} {...Component.props} bind:pointdatacolumns={pointdatacolumns}/>
				{:else if Component.win.id == 'Netmap'}
					<svelte:component this={Component.component} {...Component.props} bind:sectionData={sectionData} bind:map={map}/>
				{:else if Component.win.id == 'Section'}
					<svelte:component this={Component.component} {...Component.props} bind:twindata={twindata} bind:sectionData={sectionData} bind:map={map}/>
				{:else if Component.win.id == 'Asset'}
					<svelte:component this={Component.component} {...Component.props} bind:twindata={twindata}/>
				{:else}
					<svelte:component this={Component.component} {...Component.props}/>
				{/if}
			{/each}
		</div>
</div>


	<DonutClicked />


<style>
.dashboard-container{
	display:flex;
	position:relative;
	top: var(--top);
	height: calc( 100vh - 50px );
}

.dashboard-container-modal{
	position:absolute;
	top:0px;
}

</style>



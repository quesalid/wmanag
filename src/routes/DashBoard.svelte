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
			ChatBot,
			DigitalClock} from "../lib/components/topbar"
   //Managers
   import {AlarmManager,
			MapManager,
			DonutClicked,
			DonutManager,
			MonitorManager,
			CommManager,
			ChartManager,
			ChartChoiceManager} from '../lib/components/contents'
   import { center } from '../lib/components/topbar/notifications';
   // UTILS
   import {setConicData, getPointColumns, getDataPointColumnReduced} from '../lib/script/utils.js'
   //API
   import {getEntityMain,getDevices,getAgents,getDataPoints,getEntityControlled,getControllers} from '../lib/script/apidataconfig.js'
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
   import {getGroups} from '../lib/script/utils.js'

   // ADD SIDEBAR NENU ON USER BASIS
   let  groups = getGroups($module,$user)
   
	let plants:any = []
	let devices:any = []
	let agents:any = []
	let dashboard:any = {windows:[]}
	
	const findWindow = (id:any)=>{
		let profile = $user.profile
		let dashboards = profile.dashboard.find((item:any) => item.module == $module.toUpperCase())
		if(!dashboards)
			dashboards = profile.find((item:any) => item.module == 'DEFAULT')
		let win = dashboards.windows.find((item:any) => item.id == id)
		return win
	}

	const getColorScheme = (type:any)=>{
		let colorScheme = {wincolor:"#ddefde"}
		let profile = $user.profile
		let dashboards = profile.dashboard.find((item:any) => item.module == $module.toUpperCase())
		
		if(dashboards && dashboards.colorScheme)
			colorScheme = dashboards.colorScheme
		
		return colorScheme
	}

	// Get configured app windows from profile
	const mapapp = findWindow('Map')
	
	let mapcenter = mapapp && mapapp.params && mapapp.params.center? [mapapp.params.center.lon,mapapp.params.center.lat]:[-0.12755,51.507222]
	let mapzoom = mapapp && mapapp.params && mapapp.params.zoom? mapapp.params.zoom: 10
	let mapzoomfactor = mapapp && mapapp.params && mapapp.params.zoomfactor? mapapp.params.zoomfactor: 3
	let markeroffset = mapapp && mapapp.params && mapapp.params.markeroffset? mapapp.params.markeroffset: 0.000015
	let mappitch = mapapp && mapapp.params && mapapp.params.pitch? mapapp.params.pitch: 0
	let mapbearing = mapapp && mapapp.params && mapapp.params.bearing? mapapp.params.bearing: 0

	
	

	// get color scheme
	let colorScheme:any = getColorScheme($module.toUpperCase())
	
	let pointsdata:any = writable([])
    let pointdatacolumns:any = getDataPointColumnReduced()
	
	
	let alarmsdata:any = writable([])
	let markers:any = []
	
	let key = 0

	let machines:any = []
	let controllers:any = []

	let psize = 3

	const getAlarmData = async ()=>{
		 return new Promise(async (resolve, reject) => {
				const filters:any = [{module:$module.toUpperCase(),_type:'eq'},{type:'ALARM',_type:'eq'},{lastvalue:'ON',_type:'eq'}]
				const pagination:any = {_order:{lasttime:"DESC"},_offset:0,_limit:null}
				// Here we get the data from the API
				const ret = await getDataPoints(filters,$mock,pagination,$pointsdata)
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
		})
	}

	const getPoints = async ()=>{
		return new Promise(async (resolve, reject) => {
			const filters:any = [{module:$module.toUpperCase(),_type:'eq'}]
			const pagination:any = {_order:{lasttime:"DESC"},_offset:0,_limit:null}
			// Here we get the data from the API
			const ret = await getDataPoints(filters,$mock,pagination,$pointsdata)
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
		})
	
	}


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
		// A. GET PROFILE DASHBOARD
		dashboard = $user.profile.dashboard.find((item:any) => item.module == $module.toUpperCase())
		if(!dashboard)
			dashboard = $user.profile.dashboard.find((item:any) => item.module == 'DEFAULT')
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
			//console.log("FREE OFFSET",lon,lat,machine)
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

	// BAR VARIABLES
	const barheigth = "60px"
	const imgheight = "60px"
	const topbarheight = "90%"
	let entityName = 'PLANTS'
	
	const avatarsize = "w-10"


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
	let mapManagerId = 'mapManagerId'
	let alarmManagerId = 'alarmManagerId'
	let donutManagerId = 'donutManagerId'
	let monitorManagerId = 'monitorManagerId'
	let commManagerId = 'commManagerId'
	let chartManagerId = 'chartManagerId'
	let modalIdActionDiv = "AlarmActionDiv"
	let chartChoiceManagerId = 'chartChoiceManagerId'

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
	
</script>
<div id="main-dashboard-page">
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
		<div class="dashboard-container" style="--top:{barheigth}" id="dashboard-container-id">
			{#if dashboard}
				{#each dashboard.windows as Window}
					{#if Window.id == 'Donut' && Window.visible == 'visible'}
						<DonutManager 
							bind:donut={donut} 
							bind:key={key} 
							top={Window.top} 
							left={Window.left}
							bgcolor = {bgcolor}
							{titlefontsize}
							{titlecolor}
							{titleweight}
							{bodycolor}
							managerid= {donutManagerId}
						/>
					{/if}
					{#if Window.id == 'Map'  && Window.visible == 'visible'}
						<MapManager 
							headercolor={colorScheme.wincolor}  
							title="{entityName}" 
							minimized="off" 
							top={Window.top} 
							left={Window.left}
							height={Window.height}
							bgcolor = {bgcolor}
							{titlefontsize}
							{titlecolor}
							{titleweight}
							{bodycolor}
							bind:mapdata={$alarmsdata}
							bind:markers={markers}
							initZoom = {mapzoom}
							initCenter = {mapcenter}
							zoomfactor = {mapzoomfactor}
							pitch = {mappitch}
							bearing = {mapbearing}
							managerid= {mapManagerId}
						/>
					{/if}
					{#if Window.id == 'Alarms'  && Window.visible == 'visible'}
						<AlarmManager 
							left={Window.left}
							top={Window.top}
							headercolor={colorScheme.wincolor} 
							pSize={9} 
							bind:height={Window.height}
							width={Window.width}
							bind:alarmsdata={alarmsdata}
							resize="both"
							{bgcolor}
							{titlefontsize}
							{titlecolor}
							{titleweight}
							{bodycolor}
							{doAction}
							managerid= {alarmManagerId}
							modalIdEdit = {modalIdActionDiv}
						/>
					{/if}
					{#if Window.id == 'Monitor'  && Window.visible == 'visible'}
						<MonitorManager 
							left={Window.left} 
							top={Window.top}
							width={Window.width}
							headercolor={colorScheme.wincolor} 
							pSize={psize} 
							height={Window.height}
							pointsdata={pointsdata}
							pointdatacolumns={pointdatacolumns}
							{bgcolor}
							{titlefontsize}
							{titlecolor}
							{titleweight}
							{bodycolor}
							managerid = {monitorManagerId}
						/>
					{/if}
					{#if Window.id == 'Communication'  && Window.visible == 'visible'}
						<CommManager 
							left={Window.left} 
							top={Window.top}
							width={Window.width}
							headercolor={colorScheme.wincolor}  
							height={Window.height}
							{bgcolor}
							{titlefontsize}
							{titlecolor}
							{titleweight}
							{bodycolor}
							managerid = {commManagerId}
						/>
					{/if}
					{#if Window.id == 'Chart'  && Window.visible == 'visible'}
						<ChartManager 
							left={Window.left} 
							top={Window.top}
							width={Window.width}
							headercolor={colorScheme.wincolor}  
							height={Window.height}
							draggable={true}
							{bgcolor}
							{titlefontsize}
							{titlecolor}
							{titleweight}
							{bodycolor}
							managerid = {chartManagerId}
						/>
					{/if}
					{#if Window.id == 'Chartchoice'  && Window.visible == 'visible'}
						<ChartChoiceManager 
							left={Window.left} 
							top={Window.top}
							width={Window.width}
							headercolor={colorScheme.wincolor}  
							height={Window.height}
							draggable = {false}
							showheader = {false}
							bordercolor = ""
							resize="none"
							zindex={4}
							{bgcolor}
							{titlefontsize}
							{titlecolor}
							{titleweight}
							bodycolor=""
							managerid = {chartChoiceManagerId}
						/>
					{/if}
				{/each}
			{/if}
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



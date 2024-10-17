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
			CommManager} from '../lib/components/contents'
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
		console.log('COLOR DASH',dashboards)
		if(dashboards && dashboards.colorScheme)
			colorScheme = dashboards.colorScheme
		console.log('COLOR SCHEME',colorScheme)
		return colorScheme
	}

	// Get configured app windows
	let alarmapp = findWindow('Alarms')
	const donutapp = findWindow('Donut')
	const mapapp = findWindow('Map')
	const monitorapp = findWindow('Monitor')
	const commapp = findWindow('Communication')

	let alarmheight = alarmapp && alarmapp.height? alarmapp.height:'450px'
	let alarmwidth  = alarmapp && alarmapp.width? alarmapp.width: '750px'
	let alarmtop = alarmapp && alarmapp.top? alarmapp.top:'10px'
	let alarmleft = alarmapp && alarmapp.left? alarmapp.left:'10px'

	let donutheight = donutapp && donutapp.height? donutapp.height:'300px'
	let donutwidth  = donutapp && donutapp.width? donutapp.width: '300px'
	let donuttop = donutapp && donutapp.top? donutapp.top:'10px'
	let donutleft = donutapp && donutapp.left? donutapp.left:'10px'

	let mapheight = mapapp && mapapp.height? mapapp.height:'max-content'
	let mapwidth  = mapapp && mapapp.width? mapapp.width: '600px'
	let maptop = mapapp && mapapp.top? mapapp.top:'10px'
	let mapleft = mapapp && mapapp.left? mapapp.left:'10px'

	let monitorheight = monitorapp && monitorapp.height? monitorapp.height:'max-content'
	let monitorwidth  = monitorapp && monitorapp.width? monitorapp.width: 'max-content'
	let monitortop = monitorapp && monitorapp.top? monitorapp.top:'10px'
	let monitorleft = monitorapp && monitorapp.left? monitorapp.left:'10px'

	let commheight = commapp && commapp.height? commapp.height:'max-content'
	let commwidth  = commapp && commapp.width? commapp.width: 'max-content'
	let commtop = commapp && commapp.top? commapp.top:'10px'
	let commleft = commapp && commapp.left? commapp.left:'10px'

	// get color scheme
	let colorScheme:any = getColorScheme($module.toUpperCase())
	
	let pointsdata:any = writable([])
    let pointdatacolumns:any = getDataPointColumnReduced()
	
	
	let alarmsdata:any = writable([])
	
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
		// D. GET ALARMS DATA
		$alarmsdata = await getAlarmData()
		console.log('ALARMS DATA',$alarmsdata)

	});

	export let logoImage = "/ICO_UP2_DATA.png"
	export let  bgcolor = "#ddefde"

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

</script>
<div>
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
				<SideMenu  topbarheight='{topbarheight}'/>
				</div>
			</TopBar>

		</div>
		<div class="dashboard-container" style="--top:{barheigth}" id="dashboard-container-id">
			{#if dashboard}
				{#each dashboard.windows as Window}
					{#if Window.id == 'Donut'}
						<DonutManager 
							bgcolor={colorScheme.wincolor} 
							bind:donut={donut} 
							bind:key={key} 
							top={Window.top} 
							left={Window.left}
						/>
					{/if}
					{#if Window.id == 'Map'}
						<MapManager 
							headercolor={colorScheme.wincolor}  
							title="{entityName}" 
							minimized="off" 
							top={Window.top} 
							left={Window.left}
							height={mapheight}
						/>
					{/if}
					{#if Window.id == 'Alarms'}
						<AlarmManager 
							left="620px" 
							headercolor={colorScheme.wincolor} 
							pSize={9} 
							bind:height={alarmheight}
							width={alarmwidth}
							bind:alarmsdata={alarmsdata}
							resize="both"
						/>
					{/if}
					{#if Window.id == 'Monitor'}
						<MonitorManager 
							left={monitorleft} 
							top={monitortop}
							width={monitorwidth}
							headercolor={colorScheme.wincolor} 
							pSize={psize} 
							height={monitorheight}
							pointsdata={pointsdata}
							pointdatacolumns={pointdatacolumns}
						/>
					{/if}
					{#if Window.id == 'Communication'}
						<CommManager 
							left={commleft} 
							top={commtop}
							width={commwidth}
							headercolor={colorScheme.wincolor}  
							height={commheight}
						/>
					{/if}
				{/each}
			{/if}
		</div>

</div>


	<DonutClicked />


<style>
.dashboard-container{
	display:block;
	position:relative;
	top: var(--top);
	overflow-y: auto;
	height: calc( 100vh - 50px );
}

.dashboard-container-modal{
	position:absolute;
	top:0px;
}

</style>



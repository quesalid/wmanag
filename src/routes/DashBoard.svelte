<script lang="ts">
   // EXTERN IMPORT
   import { navigate } from "svelte-routing";
   import {onMount} from "svelte"
   // INTERN IMPORT
   import {TopBar,Logo,DropDownMenu,AlertMessages,SideMenu,BreadCrumb} from "../lib/components/topbar"
   //import Donut from "../lib/components/donut/Donut.svelte"
   import {AlarmManager,MapManager,DonutClicked,DonutManager} from '../lib/components/contents'
   //import WManag from '../lib/components/WManag.svelte'
   import { center } from '../lib/components/topbar/notifications';
   // UTILS
   import {setConicData} from '../lib/script/utils.js'
   //API
   import {getEntityMain,getDevices,getAgents} from '../lib/script/apidataconfig.js'
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

	
	let dashboard:any = $user.profile.dashboard.find((item:any) => item.name == 'DEFAULT')
	
	let key = 0
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

	});

	export let logoImage = "/ICO_UP2_DATA.png"
	export let logout = "/datalogin"
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
				ret.donutHeight = '280'
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
		<div class="dashboard-container" style="--top:{barheigth}" id="dashboard-container-id">
			{#if dashboard}
				{#each dashboard.windows as Window}
					{#if Window.id == 'Donut'}
						<DonutManager bgcolor={bgcolor} bind:donut={donut} bind:key={key} top={Window.top} left={Window.left}/>
					{/if}
					{#if Window.id == 'Map'}
						<MapManager headercolor={bgcolor}  title="{entityName}" minimized="off" top={Window.top} left={Window.left}/>
					{/if}
					{#if Window.id == 'Alarms'}
						<AlarmManager left="620px" headercolor={bgcolor} pSize={9}/>
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



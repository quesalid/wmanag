<script lang="ts">
   // EXTERN IMPORT
   import { navigate } from "svelte-routing";
   import {onMount} from "svelte"
   // INTERN IMPORT
   import {TopBar,Logo,DropDownMenu,AlertMessages,SideMenu,BreadCrumb} from "../lib/components/topbar"
   import Donut from "../lib/components/donut/Donut.svelte"
   import {AlarmManager,MapManager,DonutClicked} from '../lib/components/contents'
   import WManag from '../lib/components/WManag.svelte'
   import { center } from '../lib/components/topbar/notifications';

   // UTILS
   import {setConicData} from '../lib/script/utils.js'
   //API
   import {getPlants,getDevices,getAgents} from '../lib/script/apidataconfig.js'
   // STORE
   import {module, mock, currentplant,avatargroups,user} from '../lib/ustore.js'
   
 
  

    let donutListener:any
	let plants:any = []
	let devices:any = []
	let agents:any = []
	
	let pippo = 0
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
		let ret = await getPlants(filters,$mock)
		plants = ret.data
		ret = await getDevices(filters,$mock)
		devices = ret.data
		ret = await getAgents(filters,$mock)
		agents = ret.data
		console.log("AGENTS FOR DONUT",agents)
		/*const dashboardDiv = document.getElementById("dashboard-container-id")
		// REMOVE EVENT LISTENER IF EXISTS
		if(donutListener && dashboardDiv)
			dashboardDiv.removeEventListener("donutclicked",donutListener)
		// ADD EVENT LISTENER FOR DONUTS
		if(dashboardDiv){
			donutListener = dashboardDiv.addEventListener("donutclicked",async (e:any)=>{
			   console.log("DONUT CLICKED",e.detail)
			   // GET PLANT ID
			   donutid = e.detail
			   const plant = plants.find((item:any)=>{item.uid == donutid})
			   const pname = plant?plant.name:''
			   donuttitle = 'AGENT FOR PLANT '+pname
			   // GET send Event to display donutClickedDiv
			   const donutDiv = document.getElementById("donutClickedDiv")
			   if(donutDiv)
					donutDiv.style.display='block'

			})
		}*/
		donut = getDonutByType()
		const donutDiv = document.getElementById(donut.id)
		const donutRedraw = new CustomEvent("donutredraw", { detail: 'redraw' })
		donutDiv?.dispatchEvent(donutRedraw)
		pippo = pippo+1

	});

	export let logoImage = "/ICO_UP2_DATA.png"
	export let logout = "/datalogin"
	export let  bgcolor = "#ddefde"

	// BAR VARIABLES
	const barheigth = "60px"
	const imgheight = "60px"
	const topbarheight = "90%"
	
	
	const avatarsize = "w-10"
	const avatar = '/PPULICANI.png'
	const avatarclass = "font-bold text-sm italic"

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
	let donutid = ''
	let donuttitle = 'DONUT CLICKED'

	// click Logo
	const onClickLogo = (ev:any)=>{
		navigate(`/`+$module)
	}

	const getDonutByType = ()=>{
		// TEST setConicData
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
				<DropDownMenu groups={$avatargroups} image="{avatar}" 
						imagesize='{avatarsize}'
						message={$user.username}
						messageclass={avatarclass}>
				</DropDownMenu>
				<SideMenu  topbarheight='{topbarheight}'/>
				</div>
			</TopBar>

		</div>
		<div class="dashboard-container" style="--top:{barheigth}" id="dashboard-container-id">
				<WManag id="donutManager" 
						title="{donut.dbTitle}" 
						disableClose={true}
						draggable={true} 
						headercolor={bgcolor}
						width={donut.donutWidth+' +10'}
						top={$module.toUpperCase() == 'DATA'?'380px':'10px'}
						left="1%"
						minimized="off"
						resize='both'>
						<div class="flex flex-col min-h-200 min-w-1" slot="bodycontent">
						    {#key pippo}
								<Donut donut={donut}/>
							{/key}
						</div>
					</WManag>
				{#if $module.toUpperCase() == 'DATA'}
					<MapManager headercolor={bgcolor} left="1%" top="0%" title="PLANTS" minimized="off"/>
					<AlarmManager left="620px" headercolor={bgcolor} pSize={9}/>
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



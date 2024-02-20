<script lang="ts">
   import { navigate } from "svelte-routing";
   import {TopBar,Logo,DropDownMenu,AlertMessages,SideMenu,ComboList,BreadCrumb} from "../lib/components/topbar"
   import Donut from "../lib/components/donut/Donut.svelte"
   import MapManager from '../lib/components/contents/MapManager.svelte'
   import { center } from '../lib/components/topbar/notifications';
   import {onMount} from "svelte"
   import {combolist} from '../lib/components/topbar/combolist'
   import {getPlants} from '../lib/script/apidataconfig.js'
   import {module, mock, currentplant} from '../lib/ustore.js'
   
 
  

    let donutListener:any
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
		const ret = await getPlants(filters,$mock)
		combolist.init(ret.data)
		const dashboardDiv = document.getElementById("dashboard-container-id")
		// REMOVE EVENT LISTENER IF EXISTS
		if(donutListener && dashboardDiv)
			dashboardDiv.removeEventListener("donutclicked",donutListener)
		// ADD EVENT LISTENER FOR DONUTS
		if(dashboardDiv){
			donutListener = dashboardDiv.addEventListener("donutclicked",async (e:any)=>{
			   console.log("DONUT CLICKED",e.detail)	

			})
		}
	});

	export let logoImage = "/ICO_UP2_DATA.png"
	export let logout = "/datalogin"
	export let  bgcolor = "#ddefde"

	// BAR VARIABLES
	const barheigth = "60px"
	const imgheight = "60px"
	const topbarheight = "90%"
	const avatargroups:any = [
		[
			{ icon: null, text: `Dashborad` },
			{ icon: null, text: `Profile` },
			{ icon: null, text: `Settings` },
		], [
			{ icon: null, text: `Logout`,link:logout },
		]
	]
	
	const avatarsize = "w-10"
	const avatar = '/PPULICANI.png'
	const avatarmessage = "p.pulicani@up2twin.com"
	const avatarclass = "font-bold text-sm italic"

	// DONUT
	const donut1 = {
		id:"donut1",
		dbTitle: "AGENTS",
		donutWidth: '300px',
		donutHeight: '300px',
		pageId:"dashboard-container-id",
		conicData: [
			{color:'#888',bgcolor:'#A9DC62',start:0,end:45,label:"<img src='AVATAR.svg' alt='PIPPO'/>",sectorid:'SECTOR0'},
			{color:'#888',bgcolor:'#FF6188',start:45,end:120,label:"<img src='AVATAR.svg' alt='PIPPO'/>",sectorid:'SECTOR10'},
			{color:'#888',bgcolor:'#B9DCCC',start:120,end:360,label:"<img src='AVATAR.svg' alt='PIPPO'/>",sectorid:'SECTOR13'}
		]
	}

	const donut2 = {
		id:"donut2",
		dbTitle: "PLANTS",
		donutWidth: '300px',
		donutHeight: '300px',
		pageId:"dashboard-container-id",
		conicData: [
			{color:'#888',bgcolor:'#A9DC62',start:0,end:67,label:"<img src='MACHINE.svg' alt='PIPPO'/>",sectorid:'MACHINE'},
			{color:'#888',bgcolor:'#FF6188',start:67,end:203,label:"<img src='CONTROLLER.svg' alt='PIPPO'/>",sectorid:'CONTROLLER'},
			{color:'#888',bgcolor:'#B9DCCC',start:203,end:360,label:"<img src='FACTORY.svg' alt='PIPPO'/>",sectorid:'FACTORY'}
		]
	}

	const donut3 = {
		id:"donut3",
		dbTitle: "MODELS",
		donutWidth: '300px',
		donutHeight: '300px',
		pageId:"dashboard-container-id",
		conicData: [
			{color:'#888',bgcolor:'#A9DC62',start:0,end:67,label:"<img src='NEURALNETWORK.svg' alt='PIPPO'/>",sectorid:'NN'},
			{color:'#888',bgcolor:'#FF6188',start:67,end:203,label:"<img src='BAYESGRAPH.svg' alt='PIPPO'/>",sectorid:'BAYES'},
			{color:'#888',bgcolor:'#B9DCCC',start:203,end:360,label:"<img src='SYSDYN.svg' alt='PIPPO'/>",sectorid:'SYSDYN'}
		]
	}

	const donut4 = {
		id:"donut4",
		dbTitle: "RECORDERS",
		donutWidth: '300px',
		donutHeight: '300px',
		pageId:"dashboard-container-id",
		conicData: [
			{color:'#888',bgcolor:'#A9DC62',start:0,end:67,label:"<img src='RECORDER.svg' alt='PIPPO'/>",sectorid:'RECORDER'},
			{color:'#888',bgcolor:'#FF6188',start:67,end:203,label:"<img src='PLAYER.svg' alt='PIPPO'/>",sectorid:'PLAYER'},
		]
	}

	

	// click Logo
	const onClickLogo = (ev:any)=>{
		console.log("LOGO CLICKED",$currentplant)
		navigate(`/`+$module)
	}

	const getDonutByType = ()=>{
		switch($module.toUpperCase()){
			case 'DATA':
			    return(donut2)
				break;
			case 'CLONE':
				return(donut4)
			case 'LEARN':
				return(donut4)
				break;
			case 'AI':
				return(donut3)
				break
		}
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
				<DropDownMenu groups={avatargroups} image="{avatar}" 
						imagesize='{avatarsize}'
						message={avatarmessage}
						messageclass={avatarclass}>
				</DropDownMenu>
				<SideMenu  topbarheight='{topbarheight}'/>
				</div>
			</TopBar>

		</div>
		<div class="dashboard-container" style="--top:{barheigth}" id="dashboard-container-id">
			{#if $module.toUpperCase() == 'DATA'}
				<MapManager headercolor={bgcolor} left="30%" top="8%" title="PLANTS"/>
			{:else}
				<Donut donut={getDonutByType()}/>
			{/if}
			<Donut donut={donut1}/>
		</div>
		
</div>

<style>
.dashboard-container{
	display:flex;
	position:relative;
	top: var(--top);
}

</style>



<script lang="ts">
   // EXTERN IMPORT
   import { navigate } from "svelte-routing";
   import {onMount} from "svelte"
   // INTERN IMPORT
   import {TopBar,
			Logo,
			DropDownMenu,
			AlertMessages,
			SideMenu,
			BreadCrumb,
			ChatBot,
			DigitalClock} from "../lib/components/topbar"
   import { center } from '../lib/components/topbar/notifications';
   import {DashBoardConfigManager, DragManager} from '../lib/components/contents'
   // STORE
   import {module, 
			mock, 
			avatar,
			navigation,
			getArrayFromPath,
			avatargroups,
			avatarclass,
			user} from '../lib/ustore.js'
   
   // API
   import {setProfile,getSecurityAlerts} from '../lib/script/apisecurity.js'
   // UTILITY
   import {getGroups} from '../lib/script/utils.js'

   // ADD SIDEBAR NENU ON USER BASIS
   let  groups = getGroups($module,$user)
  
	let widgets:any
	
	onMount(async () => {
		const retalert = await getSecurityAlerts([],$mock)
		const securityAlerts = retalert.data
		const messages = securityAlerts.map((item:any)=>item.message)
		center.init(messages)
		const filters:any = []
		$navigation = getArrayFromPath("/"+$module+"/dashboardconfig")
		let profileDahboard:any = $user.profile.dashboard.find((item:any)=>item.module == $module.toUpperCase())
		widgets = JSON.parse(JSON.stringify(profileDahboard.windows))
		console.log("DASHBOARD CONFIG WIDGETS",widgets)
			
	});

	export let logoImage = "/ICO_UP2_DATA.png"
	export let  bgcolor = "#ddefde"
	// BAR VARIABLES
	export let  barheigth = "60px"
	export let  barheigth1 = "55px"
	export let imgheight = "60px"
	export let  topbarheight = "90%"
	export let  avatarsize = "w-10"

	// click Logo
	const onClickLogo = (ev:any)=>{
		navigate(`/`+$module)
		$navigation = getArrayFromPath(`/`+$module)
	}

	let saveDashboard = async (ev:any,locwidgets:any)=>{
		// SET PROFILE IN STORE
		const index = $user.profile.dashboard.findIndex((item:any) => item.module == $module.toUpperCase())
		// FILTER WIDGETS
		let filteredWidgets = JSON.parse(JSON.stringify(locwidgets))
		widgets = filteredWidgets
		console.log("FILTERED WIDGETS",filteredWidgets)
		if(index > -1)
			$user.profile.dashboard[index].windows = filteredWidgets
		else{
			let dash:any = {
                module: $module.toUpperCase(),
                windows: filteredWidgets
            }
			$user.profile.dashboard.push(dash)
		}
		//console.log(" USER PROFILE DASHBOARD", $user.profile.dashboard)
		// SET PROFILE IN DB
		const ret = await setProfile($user.profile,$user.uid,$mock)
	}
</script>
<div id="main-dashboard-config-page">
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
		<div class="dashboard-container" style="--top:{barheigth1}" id="dashboard-container-id">
				<!--DashBoardConfigManager bind:widgets={widgets} bind:saveDashboard={saveDashboard}/-->
				<DragManager  bind:widgets={widgets} bind:saveDashboard={saveDashboard}/>
			
		</div>

</div>


<style>
.dashboard-container{
	display:block;
	position:relative;
	top: calc(var(--top));
	overflow-y: auto;
	height: calc( 100vh - 50px );
}

.dashboard-container-modal{
	position:absolute;
	top:0px;
}

</style>



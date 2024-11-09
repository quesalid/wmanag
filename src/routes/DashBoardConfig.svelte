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
			DigitalClock} from "../lib/components/topbar"
   import { center } from '../lib/components/topbar/notifications';
   import {DashboardConfigurator} from '../lib/components/dashboard/'
   import type {Widget} from '../lib/components/dashboard/'
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
	let compid = "DashboardConfiguratorId"
	let scale = 1
	
	onMount(async () => {
		const retalert = await getSecurityAlerts([],$mock)
		const securityAlerts = retalert.data
		const messages = securityAlerts.map((item:any)=>item.message)
		center.init(messages)
		const filters:any = []
		$navigation = getArrayFromPath("/"+$module+"/dashboardconfig")
		let profileDahboard:any = $user.profile.dashboard.find((item:any)=>item.module == $module.toUpperCase())
		widgets = JSON.parse(JSON.stringify(profileDahboard.windows))
		console.log("WIDGETS",widgets,$module)
		// sleep 300ms to allow the dashboard to be mounted
		await new Promise(r => setTimeout(r, 300));
		// dispatch custom event to DashboardConfiguratorId
		const event = new CustomEvent('dashmounted', {detail: {windows:widgets}})
		document.getElementById(compid)?.dispatchEvent(event)
			
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

  const fromWidgetToWin = (widgets:Widget[],scale:any) => {
	  return widgets.map((w:Widget) => {
	  return {
          id: w.id,
          name: w.name,
          width: w.width?Math.round(w.width/scale)+"px":'0px',
          height: w.normalHeight?Math.round(w.normalHeight/scale)+"px":'0px',
          top: w.top?Math.round(w.top/scale)+"px":'0px',
          left: w.left?Math.round(w.left/scale)+"px":'0px',
          image: w.image,
          minimized: w.minimized,
          visible: "hidden",
		  params: w.params?w.params:null
      }
   })
  }

	

  let saveDashboard = (ev:any, dwidgets:any,avwidgets:any) => {
	  console.log("SAVE DASHBOARD",dwidgets,avwidgets)
		const index = $user.profile.dashboard.findIndex((item:any) => item.module == $module.toUpperCase())
		const visibleWindows = fromWidgetToWin(dwidgets,scale)
		const hiddenWindows = fromWidgetToWin(avwidgets,scale)
		// add visible property
		visibleWindows.forEach(w => w.visible = "visible")
		// merge windows
		const windows = [...visibleWindows, ...hiddenWindows]
		if(index > -1)
			$user.profile.dashboard[index].windows = windows
		else{
			let dash:any = {
                module: $module.toUpperCase(),
                windows: windows
            }
			$user.profile.dashboard.push(dash)
		}
	
  }
  
$: screensize = window.innerWidth

window.onresize = function(event:any) {
	screensize = window.innerWidth
}
let minscreensize = 850
</script>
<div id="main-dashboard-config-page">
		<div>
			<TopBar barheight='{barheigth}' bgcolor='{bgcolor}'>
				<div slot="lefttop">
					<div style="display: flex;">
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
		</div>
		<div class="dashboard-container" style="--top:{barheigth1}" id="dashboard-container-id">
				<DashboardConfigurator bind:windows={widgets} saveDashboard={saveDashboard} bind:scale={scale}/>
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



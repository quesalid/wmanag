<script lang="ts">
   // EXTERN IMPORT
   import { navigate } from "svelte-routing";
   import {onMount} from "svelte"
   // INTERN IMPORT
   import {TopBar,Logo,DropDownMenu,AlertMessages,SideMenu,BreadCrumb} from "../lib/components/topbar"
   import { center } from '../lib/components/topbar/notifications';
   import {DashBoardConfigManager} from '../lib/components/contents'
   // STORE
   import {module, 
			mock, 
			avatar,
			navigation,
			getArrayFromPath,
			avatargroups,
			avatarclass,
			user} from '../lib/ustore.js'
   
   import {getWidgetsByModule} from '../lib/script/utils.js'
   // API
   import {setProfile} from '../lib/script/apisecurity.js'
  
	let widgets:any
	
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
		$navigation = getArrayFromPath("/"+$module+"/dashboardconfig")
		widgets = JSON.parse(JSON.stringify(getWidgetsByModule($module.toUpperCase())))
		//console.log("DASHBOARD CONFIG USER",$user)
		let profileDahboard:any = $user.profile.dashboard.find((item:any)=>item.module == $module.toUpperCase())
		if(!profileDahboard)
			profileDahboard = $user.profile.dashboard.find((item:any)=>item.module == "DEFAULT")
		const dashWidgets = profileDahboard.windows
		for(let i=0;i<dashWidgets.length;i++){
			let w = dashWidgets[i]
			let index = widgets.findIndex((item:any)=>item.id == w.id)
			if(index > -1){
				widgets[index].included = true
				widgets[index].top = dashWidgets[i].top
				widgets[index].left = dashWidgets[i].left
			}
		}
		//console.log("W I D G E T S",widgets,dashWidgets,$user)
			
	});

	export let logoImage = "/ICO_UP2_DATA.png"
	export let  bgcolor = "#ddefde"

	// BAR VARIABLES
	const barheigth = "60px"
	const barheigth1 = "55px"
	const imgheight = "60px"
	const topbarheight = "90%"
	const avatarsize = "w-10"

	// click Logo
	const onClickLogo = (ev:any)=>{
		navigate(`/`+$module)
		$navigation = getArrayFromPath(`/`+$module)
	}

	let saveDashboard = async (ev:any)=>{
		// SET PROFILE IN STORE
		const index = $user.profile.dashboard.findIndex((item) => item.module == $module.toUpperCase())
		//console.log(" USER PROFILE DASHBOARD INDEX", index,widgets)
		// FILTER WIDGETS
		let filteredWidgets = JSON.parse(JSON.stringify(widgets.filter((item:any)=>item.included)))
		if(index > -1)
			$user.profile.dashboard[index].windows = filteredWidgets
		else{
			let dash = {
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
				<DropDownMenu groups={$avatargroups} bind:image="{$avatar}" 
						imagesize='{avatarsize}'
						message={$user.username}
						messageclass={$avatarclass}>
				</DropDownMenu>
				<SideMenu  topbarheight='{topbarheight}'/>
				</div>
			</TopBar>

		</div>
		<div class="dashboard-container" style="--top:{barheigth1}" id="dashboard-container-id">
				<DashBoardConfigManager bind:widgets={widgets} bind:saveDashboard={saveDashboard}/>
			
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



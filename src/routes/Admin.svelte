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
   import Tab from '../lib/components/tabs/Tab.svelte'
   import { center } from '../lib/components/topbar/notifications';
   import {UserManager,DbManager,LogManager} from '../lib/components/contents'
   // STORE
   import {module, mock, avatar,currentmainentity,navigation,getArrayFromPath,avatargroups,avatarclass,user,role} from '../lib/ustore.js'
   // API
   import {getSecurityAlerts} from '../lib/script/apisecurity.js'
   // UTILITY
   import { isUserAdmin,getGroups} from '../lib/script/utils.js'
   
   // ADD SIDEBAR NENU ON USER BASIS
   let  groups = getGroups($module,$user)
	
	onMount(async () => {
		// INIT NOTIFICATIONS
		const retalert = await getSecurityAlerts([],$mock)
		const securityAlerts = retalert.data
		const messages = securityAlerts.map((item:any)=>item.message)
		center.init(messages)
		const filters:any = []
		$navigation = getArrayFromPath("/"+$module+"/admin")
		// SET FOCUS ON FIRST MENU AND SHOW REALTED DIV ON MOUNT
		if(items.length > 0){
			const fitem = document.getElementById(items[0].id)
			if(fitem)
				fitem.focus()
			const ditem = document.getElementById("div-"+items[0].id)
			if(ditem)
				ditem.style.display='block'
		}
		
	});

	export let logoImage = "/ICO_UP2_DATA.png"
	export let  bgcolor = "#ddefde"
	export let innertop = "58px"
	// BAR VARIABLES
	export let barheigth = "60px"
	export let barheigth1 = "55px"
	export let imgheight = "60px"
	export let topbarheight = "90%"
	export let  avatarsize = "w-10"
	


	// EXPORTS
	let items:any = [
		{name:'users',status:'active',order:'first',id:"tab-item-admin-users",component:UserManager},
		{name:'logs',status:'active',order:'last',id:"tab-item-admin-logs",component:LogManager},
		{name:'database',status:'active',order:'middle',id:"tab-item-admin-database",component:DbManager},
	]
	let tabclass = "tab-item-class"
    let divclass = "div-item-class"

	// click Logo
	const onClickLogo = (ev:any)=>{
		navigate(`/`+$module)
		$navigation = getArrayFromPath(`/`+$module)
	}

	
</script>
{#if isUserAdmin($role)}
	<div id="main-admin-page">
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
					<Tab {items} {tabclass} {divclass} top={innertop}/>
			
			</div>

	</div>
{/if}



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



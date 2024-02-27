<script lang="ts">
   // EXTERN IMPORT
   import { navigate } from "svelte-routing";
   import {onMount} from "svelte"
   // INTERN IMPORT
   import {TopBar,Logo,DropDownMenu,AlertMessages,SideMenu,BreadCrumb} from "../lib/components/topbar"
   import Tab from '../lib/components/tabs/Tab.svelte'
   import { center } from '../lib/components/topbar/notifications';
   import WManag from '../lib/components/WManag.svelte'
   import {UserManager,AlarmManager,DbManager} from '../lib/components/contents'
   //API
   import {getPlants,getDevices,getAgents} from '../lib/script/apidataconfig.js'
   // STORE
   import {module, mock, avatar,currentplant,navigation,getArrayFromPath,avatargroups,avatarclass,user} from '../lib/ustore.js'
   
 
  

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
	export let logout = "/datalogin"
	export let  bgcolor = "#ddefde"

	// BAR VARIABLES
	const barheigth = "60px"
	const barheigth1 = "55px"
	const imgheight = "60px"
	const topbarheight = "90%"
	
	const avatarsize = "w-10"
	


	// EXPORTS
	let items:any = [
		{name:'users',status:'active',order:'first',id:"tab-item-admin-users",component:UserManager},
		{name:'database',status:'active',order:'middle',id:"tab-item-admin-database",component:DbManager},
		{name:'logs',status:'active',order:'last',id:"tab-item-admin-logs",component:WManag},
	]
	let tabclass = "tab-item-class"
    let divclass = "div-item-class"

	// click Logo
	const onClickLogo = (ev:any)=>{
		navigate(`/`+$module)
		$navigation = getArrayFromPath(`/`+$module)
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
		<div class="dashboard-container" style="--top:{barheigth1}" id="dashboard-container-id">
				<Tab {items} {tabclass} {divclass}/>
			
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



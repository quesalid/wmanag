<script lang="ts">
   // EXTERN IMPORT
   import { navigate } from "svelte-routing";
   import {onMount} from "svelte"
   // INTERN IMPORT
   import {TopBar,Logo,DropDownMenu,AlertMessages,SideMenu,BreadCrumb} from "../lib/components/topbar"
   import {AlarmManager} from '../lib/components/contents'
   import Tab from '../lib/components/tabs/Tab.svelte'
   import { center } from '../lib/components/topbar/notifications';

   //API
   import {getPlants,getDevices,getAgents} from '../lib/script/apidataconfig.js'
   // STORE
   import {module, mock, currentplant,navigation,getArrayFromPath,avatargroups,avatarclass,user} from '../lib/ustore.js'
   
 
  

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
		
	});

	export let logoImage = "/ICO_UP2_DATA.png"
	export let logout = "/datalogin"
	export let  bgcolor = "#ddefde"

	// BAR VARIABLES
	const barheigth = "60"
	const imgheight = "60px"
	const topbarheight = "90%"
	
	const avatarsize = "w-10"
	const avatar = '/PPULICANI.png'


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
	let title = 'ADMIN'
	let width = '98%'

	// click Logo
	const onClickLogo = (ev:any)=>{
		navigate(`/`+$module)
	}

	
</script>
<div>
		<div>
			<TopBar barheight='{barheigth+"px"}' bgcolor='{bgcolor}'>
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
						messageclass={$avatarclass}>
				</DropDownMenu>
				<SideMenu  topbarheight='{topbarheight}'/>
				</div>
			</TopBar>

		</div>
		<div class="dashboard-container" style="--top:{barheigth}" id="dashboard-container-id">
				<Tab />
			
		</div>

</div>


<style>
.dashboard-container{
	display:block;
	position:relative;
	top: calc(var(--top) - 10px);
	overflow-y: auto;
	height: calc( 100vh - 50px );
}

.dashboard-container-modal{
	position:absolute;
	top:0px;
}

</style>



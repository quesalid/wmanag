<script lang="ts">
   import { navigate } from "svelte-routing";
   import {TopBar,Logo,DropDownMenu,AlertMessages,SideMenu,ComboList,BreadCrumb} from "../lib/components/topbar"
   import Donut from "../lib/components/donut/Donut.svelte"
   import { center } from '../lib/components/topbar/notifications';
   import {onMount} from "svelte"
   import {combolist} from '../lib/components/topbar/combolist'
   import {getPlants} from '../lib/script/apidataconfig.js'
   import {module, mock, currentplant} from '../lib/ustore.js'
   
 
  


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
	});

	export let logoImage = "/ICO_UP2_DATA.png"
	export let logout = "/datalogin"
	export let  bgcolor = "#ddefde"

	// BAR VARIABLES
	const barheigth = "60px"
	const imgheight = "60px"
	const topbarheight = "90%"
	const avatargroups = [
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
		conicData: [
			{color:'#A9DC62',start:0,end:45},
			{color:'#FF6188',start:45,end:120},
			{color:'#B9DCCC',start:120,end:360}
		]
	}

	const donut2 = {
		id:"donut2",
		dbTitle: "PLANTS",
		donutWidth: '150px',
		donutHeight: '150px',
		conicData: [
			{color:'#A9DC62',start:0,end:67},
			{color:'#FF6188',start:67,end:203},
			{color:'#B9DCCC',start:203,end:360}
		]
	}

	

	// click Logo
	const onClickLogo = (ev:any)=>{
		console.log("LOGO CLICKED",$currentplant)
		navigate(`/`+$module)
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
		<div class="pippo" style="--top:{barheigth}">
			<Donut donut={donut1}/>
			<Donut donut={donut2}/>
		</div>
		
</div>

<style>
.pippo{
	display:flex;
	position:relative;
	top: var(--top);
}

</style>



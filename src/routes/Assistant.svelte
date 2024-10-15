<script lang="ts">
   import { navigate } from "svelte-routing";
   import {TopBar,Logo,DropDownMenu,AlertMessages,SideMenu,BreadCrumb,ChatBot} from "../lib/components/topbar"
   import { center } from '../lib/components/topbar/notifications';
   import {onMount} from "svelte"
   import {getEntityMain} from '../lib/script/apidataconfig.js'
   import {module, 
			mock,
			avatar,avatargroups,
			avatarclass,
			user,
			navigation,
			getArrayFromPath,
			assistant} from '../lib/ustore.js'
   import Breadcrumb from "../lib/components/topbar/BreadCrumb.svelte";
   // MANAGER
   import {AssistantManager, AlarmManager} from '../lib/components/contents'
   import Switch from "../lib/components/switch/Switch.svelte"
   


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
		const ret = await getEntityMain(filters,$mock)
	});

	export let logoImage = "/ICO_UP2_DATA.png"
	export let  bgcolor = "#ddefde"
	

	// BAR VARIABLES
	const barheigth = "60px"
	const imgheight = "60px"
	const topbarheight = "90%"
	
	
	const avatarsize = "w-10"
	// GRAPH VARIABLES
    let defaultNodes: any[] = [];
	let graph:any
	

	

	

	// click Logo
	const onClickLogo = (ev:any)=>{
		navigate(`/`+$module)
		$navigation = getArrayFromPath(`/`+$module)
	}

	const onCheck = async (ev:any)=>{
		// send custom event toggleassistant to ChatBot
		const event = new CustomEvent('toggleassistant', {detail: {status: ev.target.checked}});
		document.dispatchEvent(event)
		$assistant = ev.target.checked
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
					<Breadcrumb/>
				</div>
				<div slot="righttop" class='flex'>
				<AlertMessages/>
				<ChatBot/>
				<DropDownMenu groups={$avatargroups} image="{$avatar}" 
						imagesize='{avatarsize}'
						message={$user.username}
						messageclass={$avatarclass}>
				</DropDownMenu>
				<SideMenu  topbarheight='{topbarheight}'/>
				</div>
			</TopBar>
		</div>
		<div class="assistant-container" style="--top:{barheigth}" id="dashboard-container-id">
			<!--AssistantManager  headercolor={bgcolor} /-->
			<div class="assistant-configure">
				<fieldset style="padding:10px; border:2px solid #4238ca; background:#ffffff; width:70%">
					<legend style="font-weight:bold"> Assistant Configuration </legend>
					<div class="div-label">Assistant ON/OFF</div>
					<Switch height='20px' width="45px" {onCheck} checked={$assistant}/>
				</fieldset>
			</div>
		</div>
</div>

<style>
.assistant-container{
	display:block;
	position:relative;
	top: var(--top);
	overflow-y: auto;
	height: calc( 100vh - 50px );
}

.assistant-configure{
	display:flex;
	margin: 10px;
}
.div-label{
	margin-left: 5px;
	margin-right: 5px;
}
</style>



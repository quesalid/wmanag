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
			getArrayFromPath} from '../lib/ustore.js'
   import Breadcrumb from "../lib/components/topbar/BreadCrumb.svelte";
   // MANAGER
   import {AssistantManager, AlarmManager} from '../lib/components/contents'


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
			<AssistantManager  headercolor={bgcolor} />
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

</style>



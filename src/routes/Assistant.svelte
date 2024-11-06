<script lang="ts">
   import { navigate } from "svelte-routing";
   import {TopBar,
			Logo,
			DropDownMenu,
			AlertMessages,
			SideMenu,
			BreadCrumb,
			DigitalClock} from "../lib/components/topbar"
   import { center } from '../lib/components/topbar/notifications';
   import {onMount} from "svelte"
   import {getEntityMain} from '../lib/script/apidataconfig.js'
   // STORE
   import {module, 
			mock,
			avatar,avatargroups,
			avatarclass,
			user,
			navigation,
			getArrayFromPath,
			assistant} from '../lib/ustore.js'
    // API
   import {getSecurityAlerts} from '../lib/script/apisecurity.js'
   // MANAGER
   import {AssistantManager} from '../lib/components/contents'
   // UTILITY
   import { getGroups} from '../lib/script/utils.js'
   

   // ADD SIDEBAR NENU ON USER BASIS
   let  groups = getGroups($module,$user)

	onMount(async () => {
		const retalert = await getSecurityAlerts([],$mock)
		const securityAlerts = retalert.data
		const messages = securityAlerts.map((item:any)=>item.message)
		center.init(messages)
		const filters:any = []
		const ret = await getEntityMain(filters,$mock)
	});

	export let logoImage = "/ICO_UP2_DATA.png"
	export let  bgcolor = "#ddefde"
	// BAR VARIABLES
	export let barheigth = "60px"
	export let  imgheight = "60px"
	export let  topbarheight = "90%"
	export let  avatarsize = "w-10"

	// ASSISTANT VARIABLES
	let  options = [
		{type:'SIMPLE',name:'Semplice'},
		{type:'GENERATIVE', name:'LLM'},
		{type:'REINFORCEMENT_LEARNING',name:'LLM+'},
		{type:'HUMAN',name:'Umano'},
	]
	let type = ''
	let model = ''
	let onClick = (ev:any)=>{
		model = ev.target.value
	}
    let initialcontext = ''
	const placeholder = "Insert or upload initial context..."
	

	

	

	// click Logo
	const onClickLogo = (ev:any)=>{
		navigate(`/`+$module)
		$navigation = getArrayFromPath(`/`+$module)
	}


</script>
<div id="main-assistant-page">
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
		<div class="assistant-container" style="--top:{barheigth}" id="dashboard-container-id">
			<!--AssistantManager  headercolor={bgcolor} /-->
			<AssistantManager
			{bgcolor}/>
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



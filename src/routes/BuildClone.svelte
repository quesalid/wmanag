<script lang="ts">
   // EXTERNAL
   import { navigate } from "svelte-routing";
   import {onMount,afterUpdate} from "svelte"
   import { writable } from "svelte/store";
   // INTERNAL
   import {TopBar,
			Logo,
			DropDownMenu,
			AlertMessages,
			SideMenu,
			BreadCrumb,
			ChatBot,
			DigitalClock} from "../lib/components/topbar"
   import { center } from '../lib/components/topbar/notifications';
   //import Modeler from '../lib/components/modeler/Modeler.svelte'
   // U S E    https://svelteflow.dev/  for the editor
    import EDITOR from '../lib/components/svelteflow/Editor.svelte'
   // STORE
   import { mock,module, navigation, getArrayFromPath, user,avatar,avatargroups,avatarclass} from '../lib/ustore.js'
   // API
   import {getSecurityAlerts} from '../lib/script/apisecurity.js'
    // UTILITY
   import { getGroups} from '../lib/script/utils.js'

   // ADD SIDEBAR NENU ON USER BASIS
   let  groups = getGroups($module,$user)

   let devicesdata:any = writable([])
	onMount(async () => {
		const retalert = await getSecurityAlerts([],$mock)
		const securityAlerts = retalert.data
		const messages = securityAlerts.map((item:any)=>item.message)
		center.init(messages)
	});


	export let logoImage = "/ICO_UP2_DATA.png"
	export let  bgcolor = "#ddefde"
	let editor:any
	let graph:any
	// BAR VARIABLES
	export let  barheigth = "60px"
	export let  imgheight = "60px"
	export let  topbarheight = "90%"
	export let  avatarsize = "w-10"
	export let barheigth1 = "55px"


	// click Logo
	const onClickLogo = (ev:any)=>{
		navigate(`/`+$module)
		$navigation = getArrayFromPath(`/`+$module)
	}

	

	const load = async (ev:any)=>{
		console.log("BUILDDATA LOADDATAFLOW")
	}

	const save = async (ev:any)=>{
		console.log(" BUILD DATA SAVEDATAFLOW")
	}

	

</script>
 <div id="main-build-clone-page">
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
		<div class="configurator-container" style="--top:{barheigth}">
			<!--Modeler /-->
			<EDITOR load={load} save={save} maintop = {barheigth1} editortype="clone"/>
		</div>
		
</div>

<style>

</style>



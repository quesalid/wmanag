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
   import {getEntityMain,
		   setEntityArea,
		   setCompany,
		   setEntityMain,
		   setEntityLocal,
		   setEntityControlled,
		   setController} from '../lib/script/apidataconfig.js'
	// STORE
   import {module, 
			mock,
			avatar,avatargroups,
			avatarclass,
			user,
			navigation,
			getArrayFromPath} from '../lib/ustore.js'
   // API
   import {getSecurityAlerts} from '../lib/script/apisecurity.js'
   import EDITOR from '../lib/components/svelteflow/Editor.svelte'
   // UTILITY
   import {getGroups} from '../lib/script/utils.js'

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
	let editor:any
	// BAR VARIABLES
	export let barheigth = "60px"
	export let imgheight = "60px"
	export let  topbarheight = "90%"
	export let  avatarsize = "w-10"
	export let barheigth1 = "55px"
	// GRAPH VARIABLES
    


	const load = async (ev:any)=>{
		console.log("BUILDDATA LOADDATAFLOW")
	}

	const save = async (ev:any)=>{
		console.log(" BUILD DATA SAVEDATAFLOW")
	}


	// click Logo
	const onClickLogo = (ev:any)=>{
		navigate(`/`+$module)
		$navigation = getArrayFromPath(`/`+$module)
	}
$: screensize = window.innerWidth

window.onresize = function(event:any) {
	screensize = window.innerWidth
}
let minscreensize = 850
</script>
<div id="main-build-data-page">
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
		<div class="editor-container"  id="editor-container-id">
			<EDITOR load={load} save={save} maintop = {barheigth1} editortype="data"/>
		</div>
</div>

<style>


</style>



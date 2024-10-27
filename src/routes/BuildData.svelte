<script lang="ts">
   import { navigate } from "svelte-routing";
   import {TopBar,
			Logo,
			DropDownMenu,
			AlertMessages,
			SideMenu,
			BreadCrumb,
			ChatBot,
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
   // U S E    https://svelteflow.dev/  for the editor
   import EDITOR from '../lib/components/drawflow/editor.svelte'
   import EDITORUTILS from '../lib/components/drawflow/grapheditor.js'
   import {fromFlowToDb,fromGraphToFlow} from '../lib/script/flow/flowmap.js'
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
	// GRAPH VARIABLES
    let defaultNodes: any[] = [];
	let graph:any


	let exp = async (ev:any)=>{
		let expdata = editor.export()
		console.log("EXPDATA",expdata)
		const filestring = JSON.stringify(expdata)
		EDITORUTILS.uploadFile(filestring,'DATA-TEST.json')
	}

	const imp = (e:any|undefined)=>{
		const element = document.getElementById("file-data-input")
		if(element)
			element.click()
	}

	const load = async (ev:any)=>{
		const graphid = ev.target.value
		const graphtext = ev.target.options[ev.target.selectedIndex].dataset.graph
		if(graphtext){
			graph = JSON.parse(graphtext)
		}
		console.log("GRAPH SELECT",graphid,graph)
	}

	const save = async (ev:any)=>{
		console.log("SAVEDATAFLOW")
		let expdata = await editor.export()
		const flow = fromGraphToFlow(expdata)
		const objs = await fromFlowToDb(flow)
		console.log("SAVED OBJS",objs)
		// Save objs to db
		for(let i=0;i<objs.length;i++){
			const obj = objs[i]
			switch (obj.type) {
				case 'company':
					await setCompany(obj.obj,$mock)
					break;
				case 'infrastructure':
				case 'factory':
					await setEntityMain(obj.obj,$mock)
					break;
				case 'department':
				case 'area':
					await setEntityArea(obj.obj,$mock)
					break;
				case 'section':
				case 'line':
					await setEntityLocal(obj.obj,$mock)
					break;
				case 'machine':
				case 'asset':
					await setEntityControlled(obj.obj,$mock)
					break;
				case 'controller':
					await setController(obj.obj,$mock)
					break;
				default:
					break;
			}
		}
	}


	// click Logo
	const onClickLogo = (ev:any)=>{
		navigate(`/`+$module)
		$navigation = getArrayFromPath(`/`+$module)
	}

</script>
<div id="main-build-data-page">
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
		<div style="width:100%;display:flex;justify-content:right;align-items: right;">
			<EDITOR bind:editor={editor} 
				top={barheigth}
				{exp}
				{imp}
				{save}
				bind:graph={graph}/>
	</div>
</div>

<style>


</style>



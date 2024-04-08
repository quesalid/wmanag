<script lang="ts">
   // EXTERNAL
   import { navigate } from "svelte-routing";
   import {onMount,afterUpdate} from "svelte"
   import { writable } from "svelte/store";
   // INTERNAL
   import {TopBar,Logo,DropDownMenu,AlertMessages,SideMenu,BreadCrumb} from "../lib/components/topbar"
   import { center } from '../lib/components/topbar/notifications';
   //import Modeler from '../lib/components/modeler/Modeler.svelte'
   import EDITOR from '../lib/components/drawflow/editor.svelte'
   import EDITORUTILS from '../lib/components/drawflow/grapheditor.js'
   import {fromGraphToFlow} from '../lib/script/flow/flowmap.js'
   // STORE
   import { mock,module, navigation, getArrayFromPath, user,avatar,avatargroups,avatarclass} from '../lib/ustore.js'
   
  


   let devicesdata:any = writable([])
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
		
	});


	export let logoImage = "/ICO_UP2_DATA.png"
	export let  bgcolor = "#ddefde"
	let editor:any

	// BAR VARIABLES
	const barheigth = "60px"
	const imgheight = "60px"
	const topbarheight = "90%"
	
	
	const avatarsize = "w-10"
	let deviceuid = ''


	// click Logo
	const onClickLogo = (ev:any)=>{
		navigate(`/`+$module)
		$navigation = getArrayFromPath(`/`+$module)
	}

	// TABLE VARIABLES
	const titleagent = 'DEVICES'
    const disableClose = true
	const draggable = true
	let zindex = 4
    let headercolor = bgcolor
	let pagesize = true
	let pSize = 8
	

	let exp = async (ev:any)=>{
		let expdata = editor.export()
		console.log("EXPDATA",expdata)
		const filestring = JSON.stringify(expdata)
		EDITORUTILS.uploadFile(filestring,'DATA-TEST.json')
		buildModel()
	}

	const imp = (e:any|undefined)=>{
		const element = document.getElementById("file-data-input")
		if(element)
			element.click()
	}

	const buildModel = ()=>{
		let expdata = editor.export()
		fromGraphToFlow(expdata)
	}


</script>
 <div id="main-deploy-page">
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
		<div class="configurator-container" style="--top:{barheigth}">
			<!--Modeler /-->
			<EDITOR bind:editor={editor} 
				{exp}
				{imp}/>
		</div>
		
</div>

<style>
.configurator-container{
		display:flex;
		position:relative;
		top: var(--top);
	}

</style>



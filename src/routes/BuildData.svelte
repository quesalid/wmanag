<script lang="ts">
   import { navigate } from "svelte-routing";
   import {TopBar,Logo,DropDownMenu,AlertMessages,SideMenu,BreadCrumb,ChatBot} from "../lib/components/topbar"
   import { center } from '../lib/components/topbar/notifications';
   import {onMount} from "svelte"
   import {getEntityMain,
		   setEntityArea,
		   setCompany,
		   setEntityMain,
		   setEntityLocal,
		   setEntityControlled,
		   setController} from '../lib/script/apidataconfig.js'
   import {module, 
			mock,
			avatar,avatargroups,
			avatarclass,
			user,
			navigation,
			getArrayFromPath} from '../lib/ustore.js'

   import EDITOR from '../lib/components/drawflow/editor.svelte'
   import EDITORUTILS from '../lib/components/drawflow/grapheditor.js'
   import Breadcrumb from "../lib/components/topbar/BreadCrumb.svelte";
   import {fromFlowToDb,fromGraphToFlow} from '../lib/script/flow/flowmap.js'


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
	let editor:any

	// BAR VARIABLES
	const barheigth = "60px"
	const imgheight = "60px"
	const topbarheight = "90%"
	
	
	const avatarsize = "w-10"
	// GRAPH VARIABLES
    let defaultNodes: any[] = [];
	let graph:any
	

	/*let typeOptions = [
		{value:"COMPANY",options:{level:'level1',color:'#ffff80'}},
		{value:"PLANT",options:{level:'level2',color:'#80ff80',image:'FACTORY.png'}},
		{value:"DEPARTMENT",options:{level:'level3',color:'#ff80ff'}},
		{value:"LINE",options:{level:'level4',color:'#8080ff'}},
		{value:"MACHINE",options:{level:'level5',color:'#ff00ff'}},
		{value:"CONTROLLER",options:{level:'level6',color:'#ffc800'}}
	]

	
	let panel = [
		{type:'text',subtype:'',name:'name',option:'COMPANY'},
		{type:'date',subtype:'',name:'createdAt',option:'COMPANY'},
		{type:'text',subtype:'',name:'name',option:'PLANT'},
		{type:'text',subtype:'',name:'address',option:'PLANT'},
		{type:'text',subtype:'',name:'name',option:'DEPARTMENT'},
		{type:'text',subtype:'',name:'description',option:'DEPARTMENT'},
		{type:'text',subtype:'',name:'name',option:'LINE'},
		{type:'text',subtype:'',name:'description',option:'LINE'},
		{type:'text',subtype:'',name:'name',option:'MACHINE'},
		{type:'text',subtype:'',name:'description',option:'MACHINE'},
		{type:'text',subtype:'',name:'supplier',option:'MACHINE'},
		{type:'text',subtype:'',name:'name',option:'CONTROLLER'},
		{type:'text',subtype:'',name:'description',option:'CONTROLLER'},
		{type:'text',subtype:'',name:'model',option:'CONTROLLER'},
		{type:'text',subtype:'ip',name:'ip',option:'CONTROLLER'},
		{type:'number',subtype:'',name:'port',option:'CONTROLLER'},
		{type:'text',subtype:'',name:'hostname',option:'CONTROLLER'},
		{type:'select',subtype:'select',name:'driver',option:'CONTROLLER',options:[
			{name:'s7'},
			{name:'ethip'},
			{name:'modbus'},
			{name:'opcua'},
			{name:'mqtt'},
			{name:'rest'},
			{name:'soap'},
			{name:'opcda'},
			{name:'bacnet'}
		]},
	]*/


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



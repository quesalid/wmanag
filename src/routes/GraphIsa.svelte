<script lang="ts">
   import {TopBar,Logo,DropDownMenu,AlertMessages,SideMenu,ComboList} from "../lib/components/topbar"
   import { center } from '../lib/components/topbar/notifications';
   import {onMount} from "svelte"
   import {combolist} from '../lib/components/topbar/combolist'
   import {getPlants} from '../lib/script/apidataconfig.js'
   import {token, mock, currentplant} from '../lib/ustore.js'

   import { GraphEditor,
			IsaNode,
			IsaDataPanel,
			LoadGraph,
			SaveGraph,
			DeleteGraph} from '../lib/components/graph'

    import { uploadFile} from '../lib/components/graph/GraphUtils.js'


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
			{ icon: null, text: `Logout` },
		]
	]
	
	const avatarsize = "w-10"
	const avatar = 'PPULICANI.png'
	const avatarmessage = "p.pulicani@up2twin.com"
	const avatarclass = "font-bold text-sm italic"
	const bgcolor = "#fff2e8"

	// GRAPH VARIABLES
	
	
    let defaultNodes: any[] = [];
	let contextmenu = 'myContext'
	let currentnode = {}
	let editnode:any = {}
	let graph = {nodes:[],edges:[],name:''}
	let graphs:any = []
	let innernode = IsaNode
	

	let typeOptions = [
		{value:"COMPANY",options:{level:'level1',color:'#ffff80'}},
		{value:"PLANT",options:{level:'level2',color:'#80ff80'}},
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
	]

	// LIST OF DATA FIELDS NOT EDITABLE
	const filterKey = ['level','nodetype']
	

	const exportData = async ()=>{
		let expdata = []
		let namecomp = editnode.label
		const array = editnode.data
		console.log(editnode.data)
		for(let i=0;i< array.length;i++){
			const param = array[i]
			if(!param.subgraph)
				expdata.push(param)
			if(param.key == 'nodetype')
				namecomp = param.value
			if(param.key == 'name')
				namecomp += '-'+param.value
		}
		console.log("EXPDATA",expdata,array)
		const filestring = JSON.stringify(expdata)
		// default data export json name = DATA.json
		uploadFile(filestring,'DATA-'+namecomp+'.json')
	}

	const importData = (e:any|undefined)=>{
		const element = document.getElementById("file-data-input")
		if(element)
			element.click()
	}

	const graphSelect = async (ev:any)=>{
		const graphid = ev.target.value
		const graphtext = ev.target.options[ev.target.selectedIndex].dataset.graph
		if(graphtext){
			graph = JSON.parse(graphtext)
		}
		console.log("GRAPH SELECT",graphid,graph)
	}

	const submitQuery = async (ev:any|undefined)=>{
		const elem:any = document.getElementById("ggraph-search") 
		const query = elem?elem.value:''
	
		graphs = [
			{id:'s3547dslfh6dfhcxtuw3797jhas',name:'GRAPH1',graph:{nodes:[],edges:[]}},
			{id:'fr57945taiqd6gvxt67rtu9rt0p',name:'GRAPH2',graph:{nodes:[],edges:[]}},
		]
	
		console.log("SUBMIT QUERY",query)

		const select = document.getElementById("ggraph-select")
		if(select){
			select.style.visibility = "visible";
		}
	}

	const saveQuery = async (ev:any|undefined)=>{
		console.log("SAVE GRAPH",graph)
	}

	const deleteQuery = async (ev:any|undefined)=>{
		console.log("DELETE GRAPH",graph)
	}

	//const options = {datacomp:'ISA'}
	const options = {datacomp:'ISA',svgtop:50,svgleft:0,svgwidth:1200,svgheight:550}

	// click Logo
	const onClickLogo = (ev:any)=>{
		console.log("LOGO CLICKED",$currentplant)
	}

</script>
<div>
		<div>
			<TopBar barheight='{barheigth}' bgcolor='{bgcolor}'>
				<div slot="lefttop">
					<Logo logofilename="ICO_UP2_DATA.png" imgheight={imgheight} onClick={onClickLogo}>
					</Logo>
				</div>
				<div slot="centertop">
					<ComboList data={$combolist}/>
				</div>
				<div slot="righttop" class='flex'>
				<SideMenu  topbarheight='{topbarheight}'/>
				<AlertMessages/>
				<DropDownMenu groups={avatargroups} image="{avatar}" 
						imagesize='{avatarsize}'
						message={avatarmessage}
						messageclass={avatarclass}>
				</DropDownMenu>
				</div>
			</TopBar>
		</div>
		<div style="width:100%;display:flex;justify-content:right;align-items: right;">
			<GraphEditor bind:graph={graph} typeOptions={typeOptions}  bind:editnode={editnode} innernode={innernode} options={options}>
				<IsaDataPanel slot="data" id="defaultDataMenuContainer" bind:node={editnode} bind:graph={graph} filterKey={filterKey} exp={exportData} imp={importData} panel={panel}/>
				<LoadGraph slot="importgraph" id="defaultLoadGraphContainer" bind:graph={graph} bind:graphs={graphs} submitQuery={submitQuery} graphSelect={graphSelect}/>"
				<SaveGraph slot="savegraph" id="defaultSaveGraphContainer" bind:graph={graph}  saveQuery={saveQuery} />"
				<DeleteGraph slot="deletegraph" id="defaultDeleteGraphContainer" bind:graph={graph}  deleteQuery={deleteQuery} />"
				<!-- ADD LOAD,SAVE AND DELETE PANELS-->
			</GraphEditor>
	</div>
    </div>

<style>


</style>



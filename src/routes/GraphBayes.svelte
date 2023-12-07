<script lang="ts">
   // ADD TOP BAR
	import {TopBar,Logo,DropDownMenu,AlertMessages,SideMenu,ComboList} from "../lib/components/topbar"
	import { center } from '../lib/components/topbar/notifications';
	import {onMount} from "svelte"


   import { GraphEditor,
			BayesNode,
			BayesDataPanel,
			BayesDistrPanel,
			BayesDistrDefPanel,
			LoadGraph,
			SaveGraph,
			DeleteGraph} from '../lib/components/graph'

    import { loadData, uploadFile} from '../lib/components/graph/GraphUtils.js'

	onMount(() => {
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
	let graphs:any[] = []
	let innernode = BayesNode
	let typeOptions = [
		{value:"DISCRETE",options:{level:'level1'}},
		{value:"CONTINUOUS",options:{level:'level1'}}
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
	const options = {datacomp:'BAYES',svgtop:50,svgleft:0,svgwidth:1200,svgheight:550}

</script>

    <div>
		<div>
			<TopBar barheight='{barheigth}' bgcolor='{bgcolor}'>
				<div slot="lefttop">
					<Logo logofilename="ICO_UP2_DATA.png" imgheight={imgheight}>
					</Logo>
				</div>
				<div slot="centertop">
					<ComboList />
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
			<GraphEditor  bind:graph={graph} typeOptions={typeOptions}  bind:editnode={editnode} innernode={innernode} options={options}>
				<BayesDataPanel slot="data" id="defaultDataMenuContainer" bind:graph={graph} bind:node={editnode}  exp={exportData} imp={importData}/>
				<BayesDistrPanel slot="distribution" id="defaultDistributionMenuContainer" bind:graph={graph} bind:node={editnode}  exp={exportData} imp={importData}/>
				<BayesDistrDefPanel slot="distributiondef" id="defaultDistributionDefContainer" bind:graph={graph} bind:node={editnode}  exp={exportData} imp={importData}/>
				<LoadGraph slot="importgraph" id="defaultLoadGraphContainer" bind:graph={graph} bind:graphs={graphs} submitQuery={submitQuery} graphSelect={graphSelect}/>"
				<SaveGraph slot="savegraph" id="defaultSaveGraphContainer" bind:graph={graph}  saveQuery={saveQuery} />"
				<DeleteGraph slot="deletegraph" id="defaultDeleteGraphContainer" bind:graph={graph}  deleteQuery={deleteQuery} />"
				<!-- ADD LOAD,SAVE AND DELETE PANELS-->
			</GraphEditor>
		</div>
    </div>

<style>


</style>



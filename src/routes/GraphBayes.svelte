<script lang="ts">
   // ADD TOP BAR
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
	// STORE
	import {module,mock,avatargroups,avatar,user,avatarclass, navigation, getArrayFromPath} from '../lib/ustore.js'
	 // API
   import {getSecurityAlerts} from '../lib/script/apisecurity.js'
   import { GraphEditor,
			BayesNode,
			BayesDataPanel,
			BayesDistrPanel,
			BayesDistrDefPanel,
			LoadGraph,
			SaveGraph,
			DeleteGraph} from '../lib/components/graph'

    import { uploadFile} from '../lib/components/graph/GraphUtils.js'
	// UTILITY
   import {getGroups} from '../lib/script/utils.js'

   // ADD SIDEBAR NENU ON USER BASIS
   let  groups = getGroups($module,$user)

	onMount(async () => {
		const retalert = await getSecurityAlerts([],$mock)
		const securityAlerts = retalert.data
		const messages = securityAlerts.map((item:any)=>item.message)
		center.init(messages)
	});

	export let logoImage = "/ICO_UP2_DATA.png"
	export let logout = "/datalogin"
	export let  bgcolor = "#ddefde"
	// BAR VARIABLES
	export let  barheigth = "60px"
	export let imgheight = "60px"
	export let  topbarheight = "90%"
	export let  avatarsize = "w-10"
	

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

    <div id="main-graph-bayes-page">
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



<script lang="ts">
// EXTERNAL
import { onMount} from "svelte"
import { writable } from 'svelte/store';
// INTERNAL
import Wmanag from '../WManag.svelte'
import WindowFooter from './WindowFooter.svelte'
import Spinner from '../spinner/RingLoader.svelte'
import FlipDivList from './FlipDivList.svelte'
import {showHideLoader} from "../CompUtils.js"
// API
import {agentGetInfo, 
		agentLogin,
		agentAddScanner,
		agentAddFileScanner,
		agentAddHist,
		agentRemoveScanner,
		agentRemoveHist,
		agentStartScanner,
		agentStartHist,
		agentStopScanner,
		agentStopHist,
		agentGetScanner,
		agentGetHist} from '../../script/apidataagent'
import {getAgents,getDevices} from '../../script/apidataconfig.js'
import { sleep } from "../../script/api";
// USTORE
import {token, mock, currdevice,module} from '../../ustore.js'

let eventListener:any 
onMount(async () => {

		const confMainDiv = document.getElementById("deploy-main-container")
		// REMOVE EVENT LISTENER IF EXISTS
		if(eventListener && confMainDiv)
			confMainDiv.removeEventListener("deployclicked",eventListener)
		if(confMainDiv){
			eventListener = confMainDiv.addEventListener("deployclicked",async (e:any)=>{
				confagents = []
				edgeagents = []
				flattenagents = []
				agents=[]
				showHideLoader(loaderid,pageid,false)
				// SET CURRENT DEVICE IN STORE
				deviceuid = e.detail
				$currdevice = deviceuid
				// NAVIGATE TO AGENT PAGE
				console.log(" DEPLOY CLICKED: "+$currdevice)
				confMainDiv.style.display="block"
				// GET CURRENT DEVICE
				const filters:any = [{uid:$currdevice,_type:'eq'}]
				const ret = await getDevices(filters,$mock)
				const found = ret.data.find((item:any)=> {return(item.uid == $currdevice)})
				console.log("DEPLOY MAIN FOUND", found)
				deviceuid = $currdevice
				title += found.name
				devicename = found.name
			})
		}
})

// EXPORTS
export let  headercolor = "#f4e2d2"

let deviceuid = 'abc-1'
let devicename = ''
let pagesize = false
let spinnermessage = "Could take some time...."
let title = "DEPLOY MANAGEMENT - DEVICE SERVER "
let footermessage = "manage agents"
const disableClose = false
const draggable = true
let defaultWManager = 'defaultWDeploy'
let userid = ''
let password = ''
let host = '127.0.0.1'
let port = '8080'
let agentInfo = {}
let devtoken = ''
let dragElem:any = {}
let loaderid = "loading-page-id"
let pageid = defaultWManager
let confagents:any = []
let edgeagents = []
let flattenagents:any = []


let agents:any = []

let startAgent = async (agent:any)=>{
	const confagent = confagents.find((a:any)=>a.name == agent.name)
	if(confagent){
		switch(confagent.type){
			case 'SCANNER':
				await agentStartScanner('https',host,port,devtoken,confagent.name,$mock)
				break
			case 'HISTORIAN':
				await agentStartHist('https',host,port,devtoken,confagent.name,$mock)
				break
		}
	}
	agents = await onDepUndep(confagents)
}
let stopAgent = async (agent:any)=>{
	const confagent = confagents.find((a:any)=>a.name == agent.name)
	if(confagent){
		switch(confagent.type){
			case 'SCANNER':
				await agentStopScanner('https',host,port,devtoken,confagent.name,$mock)
				break
			case 'HISTORIAN':
				await agentStopHist('https',host,port,devtoken,confagent.name,$mock)
				break
		}
	}
	agents = await onDepUndep(confagents)
}
let deployAgent = async (agent:any)=>{
	const confagent = confagents.find((a:any)=>a.name == agent.name)
	if(confagent){
		switch(confagent.type){
			case 'SCANNER':
				await agentAddScanner('https',host,port,devtoken,confagent,$mock)
				break
			case 'FILESCANNER':
				await agentAddFileScanner('https',host,port,devtoken,confagent,$mock)
				break
			case 'HISTORIAN':
				await agentAddHist('https',host,port,devtoken,confagent,$mock)
				break
		}
	}
	agents = await onDepUndep(confagents)
	
}
let undeployAgent = async (agent:any)=>{
	const confagent = flattenagents.find((a:any)=>a.name == agent.name)
	if(confagent){
		switch(confagent.type){
			case 'SCANNER':
				await agentRemoveScanner('https',host,port,devtoken,confagent.name,$mock)
				break
			case 'HISTORIAN':
				await agentRemoveHist('https',host,port,devtoken,confagent.name,$mock)
				break
		}
	}
	agents = await onDepUndep(confagents)
}

const onClickGetText = async (ev:any)=>{
	switch(ev.target.id){
		case "device-userid":
			userid = ev.target.value
			break
		case "device-password":
			password = ev.target.value
			break;
	}
	if(userid && userid != '' && password && password != ''){
		const image:any = document.getElementById('login-submit')
		image.removeAttribute('disabled')
		image.style.cursor='pointer'
	}else{
		const image:any = document.getElementById('login-submit')
		image.setAttribute('disabled',"true")
		image.style.cursor='not-allowed'
	}
}

const onClickSubmit = async (ev:any)=>{
	try{
		showHideLoader(loaderid,pageid,true)
		let res = await agentGetInfo('https',host,port,$mock)
		agentInfo = res.data
		res = await agentLogin('https',host,port,userid,password,$mock)
		if(res.error != null){
					footermessage = 'ERROR LOGGING '+res.error
		}else{
			devtoken = res.data.token.split(' ')[1]
			// LOGGED IN - PROCEED TO GET AGENTS
			// A. LOAD AGENT FROM CONFIGURATION REPOSITORY
			let filters = [{uid:'devuid',_type:'eq'},{module:$module.toUpperCase(),_type:'eq'}]
			res  = await getAgents(filters,$mock)
			confagents = res.data
			//console.log("CONFIG AGENTS",confagents)

			agents = await onDepUndep(confagents)

			//console.log("FLATTENED AGENTS",agents)
			
		}
	}catch(e){
		console.log("ERROR",e)
		footermessage = 'ERROR LOGGING INTO SERVER '+e
	}
	showHideLoader(loaderid,pageid,false)
}

let toolbar = [
	{type:'text',props:{id:"device-userid",value:'',size:20},function:onClickGetText,label:"Userid"},
	{type:'password',props:{value:'',id:"device-password"},function:onClickGetText,label:'Password'},
	{type:'button',props:{value:'\u2BC8',id:"login-submit",fsize:"small"},function:onClickSubmit,label:'',disabled:false},
]

 const onDepUndep = async (confagents:any)=>{
		try{
			//console.log("CONFAGENTS",confagents)
			let res = await agentGetScanner('https',host,port,devtoken,null,$mock)
			const scanners = res.data
			res = await agentGetHist('https',host,port,devtoken,null,$mock)
			const hists = res.data
			edgeagents = [...scanners,...hists]
			//console.log("EDGE AGENTS",edgeagents)
			// C. COMPARE AGENTS LIST
			var ids = new Set(confagents.map((d:any) => d.name));
			flattenagents = [...confagents, ...edgeagents.filter(d => !ids.has(d.name))];
			//console.log("FLATTENED AGENTS",flattenagents)
			for(let i=0;i< flattenagents.length;i++){
				const agent = flattenagents[i]
				const confagent = confagents.find((a:any)=>a.name == agent.name)
				const edgeagent = edgeagents.find((a:any)=>a.name == agent.name)
				if(confagent && edgeagent){
					//console.log("AGENT",agent.name,"IS IN STORE AND LOADED")
					agent.instore = true
					agent.loaded = true
					agent.status = edgeagent.status
				}else if(confagent && !edgeagent){
					//console.log("AGENT",agent.name,"IS IN STORE AND NOT LOADED")
					agent.instore = true
					agent.loaded = false
				}else if(!confagent && edgeagent){
					//console.log("AGENT",agent.name,"IS NOT IN STORE AND LOADED")
					agent.instore = false
					agent.loaded = true
					agent.status = edgeagent.status
				}else{
					//console.log("AGENT",agent.name,"IS NOT IN STORE AND NOT LOADED")
					agent.instore = false
					agent.loaded = false
				}
			}
		return(flattenagents)
		}catch(e){
			console.log("ERROR",e)
			footermessage = 'ERROR LOGGING INTO SERVER '+e
		}
 }

 const closeModal = (ev:any) =>{
	 const divCont = document.getElementById("deploy-main-container")
	 if(divCont)
		divCont.style.display = 'none'
 }
</script>

	<div class="deploycontainer relative w-fit h-fit block" id="deploy-main-container">
		<Wmanag id="{defaultWManager}" 
				bind:dragE={dragElem} 
				title="{title}" 
				width="900px" 
				top="5%" 
				left="20%" 
				toolbar={toolbar} 
				closeMenu={closeModal}
				{disableClose} 
				{draggable} 
				{headercolor}>
				<FlipDivList slot="bodycontent" 
					bind:dragelem={dragElem} 
					bind:agents={agents}
					{startAgent}
					{stopAgent}
					{deployAgent}
					{undeployAgent}
					bind:device={devicename}
					/>
				<WindowFooter slot="footercontent" message={footermessage}/>
		</Wmanag>
		<!-- MODAL WINDOW WITH SPINNER -->
		<div class="position-absolute z-10 flex border-1 -t-1  bg-white justify-center items-center border-solid border-1" id="loading-page-id">
			<!--div class="spinner-wrapper"-->
				<Spinner message={spinnermessage}/>
			<!--/div-->
		</div>
	</div>
	
<style>
.deploycontainer{
  display: none;
  position: absolute; /* Stay in place */
  z-index: 999; /* Sit on top */
  padding: 10%; /* Location of the box */
  width: 100%; /* Full width */
  min-width: 200px; /* Full width */
  height: 100%; /* Full height */
  background-color: var(--background-color);
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

#loading-page-id{
	position: absolute;
	width: 70%;
	height: 95%;
}
</style>





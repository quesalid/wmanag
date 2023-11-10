<script lang="ts">

import { onMount} from "svelte"
import Wmanag from '../lib/components/WManag.svelte'
import WindowFooter from '../lib/components/contents/WindowFooter.svelte'
import Spinner from '../lib/components/spinner/RingLoader.svelte'
import {token, mock} from '../lib/ustore.js'
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
		agentGetHist} from '../lib/script/apidataagent.js'
import {getAgents} from '../lib/script/apidataconfig.js'
import FlipDivList from '../lib/components/contents/FlipDivList.svelte'
import {showHideLoader} from "../lib/components/CompUtils.js"



import { writable } from 'svelte/store';
import { sleep } from "../lib/script/api";



let deviceuid = 'abc-1'
let devicename = "DEFAULTSERVER"
let pagesize = false
let spinnermessage = "Could take some time...."
let title = "DEPLOY MANAGEMENT - DEVICE SERVER "+devicename
let footermessage = "manage agents"
const disableClose = true
const draggable = true
const headercolor = "#f4e2d2"
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
let confagents = []
let edgeagents = []
let flattenagents = []


let agents = []

let startAgent = async (agent:any)=>{console.log("START AGENT FROM WINDOW",agent.name),await sleep(2000)}
let stopAgent = async (agent:any)=>{console.log("STOP AGENT FROM WINDOW",agent.name),await sleep(2000)}
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
			case 'HIST':
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
			let filters = [{deviceuid:deviceuid,type:'eq'}]
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
	{type:'button',props:{value:'\u2BC8',id:"login-submit",fsize:"small"},function:onClickSubmit,label:'',disabled:true},
]



onMount(async () => {
	showHideLoader(loaderid,pageid,false)
	$mock = true
 })

 const onDepUndep = async (confagents:any)=>{
		try{
			console.log("CONFAGENTS",confagents)
			let res = await agentGetScanner('https',host,port,devtoken,null,$mock)
			const scanners = res.data
			res = await agentGetHist('https',host,port,devtoken,null,$mock)
			const hists = res.data
			edgeagents = [...scanners,...hists]
			console.log("EDGE AGENTS",edgeagents)
			// C. COMPARE AGENTS LIST
			var ids = new Set(confagents.map(d => d.name));
			flattenagents = [...confagents, ...edgeagents.filter(d => !ids.has(d.name))];
			console.log("FLATTENED AGENTS",flattenagents)
			for(let i=0;i< flattenagents.length;i++){
				const agent = flattenagents[i]
				const confagent = confagents.find((a:any)=>a.name == agent.name)
				const edgeagent = edgeagents.find((a:any)=>a.name == agent.name)
				if(confagent && edgeagent){
					//console.log("AGENT",agent.name,"IS IN STORE AND LOADED")
					agent.instore = true
					agent.loaded = true
				}else if(confagent && !edgeagent){
					//console.log("AGENT",agent.name,"IS IN STORE AND NOT LOADED")
					agent.instore = true
					agent.loaded = false
				}else if(!confagent && edgeagent){
					//console.log("AGENT",agent.name,"IS NOT IN STORE AND LOADED")
					agent.instore = false
					agent.loaded = true
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


</script>

	<div class="docker-manager-div">
		<Wmanag id="{defaultWManager}" bind:dragE={dragElem} title="{title}" toolbar={toolbar} {disableClose} {draggable} {headercolor}>
			<FlipDivList slot="bodycontent" 
			    bind:dragelem={dragElem} 
				bind:agents={agents}
				{startAgent}
				{stopAgent}
				{deployAgent}
				{undeployAgent}
				/>
			<WindowFooter slot="footercontent" message={footermessage}/>
		</Wmanag>
		<!-- MODAL WINDOW WITH SPINNER -->
		<div class="loading" id="loading-page-id">
			<!--div class="spinner-wrapper"-->
				<Spinner message={spinnermessage}/>
			<!--/div-->
		</div>
	</div>
	
<style>
.docker-manager-div{
	position: relative;
	width: 500px;
	height: fit-content;
	display: block;
}
#pem-file-input{
	visibility:hidden;
}
.loading {
  position: absolute;
  z-index: 999;
  top: -3px;
  height:620px;
  width:1100px;
  background: rgba( 255, 255, 255, .9 );
  display:flex;
  justify-content: center;
  align-items: center;
  border: solid, 1px;
}

</style>





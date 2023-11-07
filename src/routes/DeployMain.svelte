<script lang="ts">

import { onMount} from "svelte"
import Wmanag from '../lib/components/WManag.svelte'
import WindowFooter from '../lib/components/contents/WindowFooter.svelte'
import Spinner from '../lib/components/spinner/RingLoader.svelte'
import {token, mock} from '../lib/ustore.js'
import {agentGetInfo, agentLogin} from '../lib/script/apidataagent.js'
import FlipDiv from '../lib/components/contents/FlipDiv.svelte'


import { writable } from 'svelte/store';
import { sleep } from "../lib/script/api";


let deviceserver = "DEFAULTSERVER"
let pagesize = false
let spinnermessage = "Could take some time...."
let title = "DEPLOY MANAGEMENT - DEVICE SERVER "+deviceserver
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
		showHideLoader(true)
		let res = await agentGetInfo('https',host,port,$mock)
		agentInfo = res.data
		console.log("AGENT INFO",agentInfo)
		res = await agentLogin('https',host,port,userid,password,$mock)
		if(res.error != null){
					footermessage = 'ERROR LOGGING '+res.error
		}else{
			devtoken = res.data.token.split(' ')[1]
			console.log("DEV TOKEN",devtoken)
		}
	}catch(e){
		console.log("ERROR",e)
		footermessage = 'ERROR LOGGING INTO SERVER '+e
	}
	showHideLoader(false)
}

let toolbar = [
	{type:'text',props:{id:"device-userid",value:'',size:20},function:onClickGetText,label:"Userid"},
	{type:'password',props:{value:'',id:"device-password"},function:onClickGetText,label:'Password'},
	{type:'button',props:{value:'\u2BC8',id:"login-submit",fsize:"small"},function:onClickSubmit,label:'',disabled:true},
]



onMount(async () => {
	showHideLoader(false)
	$mock = true
	
 })

 const showHideLoader = (show:boolean)=>{
 const loader:any = document.getElementById('loading-page-id')
 const wManafer = document.getElementById(defaultWManager)
 // GET BOUNDING RECT
 let rect = wManafer.getBoundingClientRect();
 // MOVE LOADER RESPECT TO WINDOW
	if(loader){
		loader.style.top = rect.top+'px'
		loader.style.left = rect.left+'px'
		if(show)
			loader.style.display = "flex"
		else
			loader.style.display = "none"
	}
}




</script>

	<div class="docker-manager-div">
		<Wmanag id="{defaultWManager}" title="{title}" toolbar={toolbar} {disableClose} {draggable} {headercolor}>
			<FlipDiv slot="bodycontent" />
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





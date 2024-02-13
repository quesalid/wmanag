<script lang="ts">
import { onMount} from "svelte"
import Spinner from '../spinner/RingLoader.svelte'
import {dragElement, showHideLoader} from '../CompUtils.js'
import Switch from "../switch/Switch.svelte"



const sleep = function (ms:any) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export let agent:any = {
}
export let colorleft = "#f0f0f0"
export let colorrightstart = "#afffaf"
export let colorrightstop = "#ffffaf"
export let colorrightstopnostore = "#ff2f2f"
export let dragelem:any = {}

export let startAgent = async (agent:any)=>{console.log("START AGENT",agent.name),await sleep(2000)}
export let stopAgent = async (agent:any)=>{console.log("STOP AGENT",agent.name),await sleep(2000)}
export let deployAgent = async (agent:any)=>{console.log("DEPLOY AGENT",agent.name),await sleep(2000)}
export let undeployAgent = async (agent:any)=>{console.log("UNDEPLOY AGENT",agent.name),await sleep(2000)}


let onClickDeploy = async (ev:any)=>{
	const leftelem = document.getElementById(agent.name+'-left-hide')
	const rightelem = document.getElementById(agent.name+'-right-hide')
	const switchright = document.getElementById(agent.name+'-lower-content-right')
	showHideLoaderFlip(loaderidleft,pageidleft,true,dragelem)
	await deployAgent(agent)
	if(leftelem && rightelem && switchright){
		leftelem.style.visibility = "hidden"
		rightelem.style.visibility = "visible"
		switchright.style.visibility = "visible"
	}
	showHideLoaderFlip(loaderidleft,pageidleft,false,dragelem)

}
let onClickUndeploy = async (ev:any)=>{
	const agentname = ev.target.id.split('-')[0]
	const rightelem = document.getElementById(agent.name+'-right-hide')
	const leftelem = document.getElementById(agent.name+'-left-hide')
	const switchright = document.getElementById(agent.name+'-lower-content-right')
	showHideLoaderFlip(loaderidright,pageidright,true,dragelem)
	await undeployAgent(agent)
	if(leftelem && rightelem && switchright){
		switchright.style.visibility = "hidden"
		leftelem.style.visibility = "visible"
		rightelem.style.visibility = "hidden"
	}
	showHideLoaderFlip(loaderidright,pageidright,false,dragelem)

}

const onCheck = async (ev:any)=>{
	const leftelem:any = document.querySelector('#'+agent.name+'-upper-content-left')
	const colorstop = agent.instore?colorrightstop:colorrightstopnostore
	if(leftelem){
		const image:any = document.getElementById(agent.name+'-unload-image')
		showHideLoaderFlip(loaderidright,pageidright,true,dragelem)
		
		if(ev.target.checked){
			await startAgent(agent)
			leftelem.style.setProperty('--background-color', colorrightstart);
			// DISABLE UNLOAD BUTTON
			if(image){
				image.disabled = true
				image.style.opacity = 0.3
				image.style.cursor = 'not-allowed'
			}
		}
		else{
			await stopAgent(agent)
			leftelem.style.setProperty('--background-color', colorstop);
			// ENABLE UNLOAD BUTTON
			if(image){
				image.disabled = false
				image.style.opacity = 1.0
				image.style.cursor = 'pointer'
			}
		}
		showHideLoaderFlip(loaderidright,pageidright,false,dragelem)
	}
}

const getText = (item:any)=>{
	if(!item)
		return ""
	const text = item.driver + ":" + item.server + "." + item.port
	return text
}

let loaderidleft =  agent.name+"spinner-left-id"
let loaderidright =  agent.name+"spinner-right-id"
let pageidleft = agent.name+'-left-hide'
let pageidright = agent.name+'-right-hide'

const showLoaded = ()=>{
	const leftelem:any = document.getElementById(agent.name+'-left-hide')
	const rightelem:any = document.getElementById(agent.name+'-right-hide')
		if(agent.loaded){
			if(leftelem)
				leftelem.style.visibility = "hidden"
			if(rightelem)
				rightelem.style.visibility = "visible"
		else{
			if(leftelem)
				leftelem.style.visibility = "visible"
			if(rightelem)
				rightelem.style.visibility = "hidden"
		}
	}
	if(!leftelem){
		const left = document.getElementById(agent.name+'flip-div-left')
		if(left){
			left.style.border = "none"
		}
	}
}

const showHideLoaderFlip = (loaderid:any, pageid:any, show:any, options:any=null) =>{
	const offset = {top:14,left:12}
	showHideLoader(loaderid,pageid,show,true,dragelem,offset)
}

const getBackground = (agent:any)=>{
	let color = ''
	if(agent.status == 'START')
		color =  colorrightstart
	else if(agent.instore)
		color =  colorrightstop
	else 
		color =  colorrightstopnostore
	return(color)
}


onMount(()=>{
	showHideLoaderFlip(loaderidleft,pageidleft,false,dragelem)
	showHideLoaderFlip(loaderidright,pageidright,false,dragelem)
	showLoaded()
})

</script>

	<div class="flip-div-wrapper flex justify-center m-1 overflow-y-auto h-fit">
		<div class="flip-div">
			<div class="inside-flip-div left" id="{agent.name+'flip-div-left'}">
				{#if agent.instore}
					<div class="inside-flip-hide-left" id="{agent.name+'-left-hide'}">
						<div class="upper-content left" style="--background-color: {colorleft} ;" >
							<div class="upper-content-left left">
								AGENT: <span class="agent-name">{agent.name}</span> TYPE: {agent.type}
								<br><span class="agent-description">{agent.description}</span>
							</div>
							<div class="upper-content-right left">
								<input type="image" src="/DARROWRIGHT.svg" alt="ALT IMAGE" height="25" on:click={onClickDeploy}/>
							</div>
						</div>
						<div class="middle-content left">
							SOURCE: {getText(agent.source)} <br>DEST: {getText(agent.destination)}
						</div>
						<div class="lower-content left" style="--background-color: {colorleft} ;">
						</div>
					</div>
					<div class="spinner-class" id="{agent.name+'spinner-left-id'}">
						<Spinner />
					</div>
				{/if}
			</div>
			<div class="inside-flip-div right">
				<div class="inside-flip-hide-right" id="{agent.name+'-right-hide'}">
					<div class="upper-content right" id="{agent.name+'-upper-content-left'}" style="--background-color: {getBackground(agent)} ;">
						<div class="upper-content-left right">
							<input disabled={agent.status =='START'?true:false} class="{agent.status =='START'?'imagestarted':'imagestopped'}" type="image" id="{agent.name+'-unload-image'}"  src="{agent.instore?'/DARROWLEFT.svg':'/CROSS.svg'}" alt="ALT IMAGE" height="25" on:click={onClickUndeploy}/>
						</div>
						<div class="upper-content-right right">
							AGENT: <span class="agent-name">{agent.name}</span> TYPE: {agent.type}
							<br><span class="agent-description">{agent.description}</span>
						</div>
					</div>
					<div class="middle-content right">
						SOURCE: {getText(agent.source)} <br>DEST: {getText(agent.destination)}
					</div>
					<div class="lower-content right" id="{agent.name+'-lower-content-right'}" style="--background-color: {colorleft} ;">
						<Switch height='20px' width="35px" {onCheck} checked={agent.status =='START'?true:false}/>
					</div>
				</div>
				<div class="spinner-class" id="{agent.name+'spinner-right-id'}">
					<Spinner />
				</div>
			</div>
		</div>
	</div>

<style>
.flip-div-wrapper{
	/*display:flexbox;
	justify-content:center ;
	margin: 4px;
	overflow-y:auto ;
	height: fit-content;*/
}
.flip-div{
	display:flex;
	width: 900px;
	height: 120px;
	justify-content:space-evenly ;
}

.inside-flip-div{
	width:60%;
	height: 90%;
	border: 1px solid #aaa;
	background-color: #fff;
	margin: 3px;
}
.inside-flip-hide-left{
	height:100%;
}

.inside-flip-hide-right{
	height:100%;
	visibility: hidden;
}

.upper-content{
	display:flex;
	width: 100%;
	height: 44%;
	border-bottom: 1px solid #000;
	border-radius: 10px ;
	text-align: center;
	
}
.upper-content .left{
	background-color: var(--background-color);
}
.upper-content .right{
	background-color: var(--background-color);
}

.imagestarted{
	opacity: 0.3;
	cursor:not-allowed;
}

.middle-content{
	width: 100%;
	height: 36%;
	border-bottom: 1px solid #333;
	background-color: #fff;
	text-align: center;
}
/*.middle-content.right{
	text-align: right;
}*/
.lower-content{
	width: 100%;
	height: 20%;
	border-bottom: 1px solid #333;
	background-color: var(--background-color);
	display:flex;
	justify-content: center;
	align-items: center;
}
.lower-content.right{
	background-color: var(--background-color);
}
.upper-content-left.left{
	height:100%;
	width: 90%;
	/*border-right: 1px solid #000;*/
}
.upper-content-right.left{
	height:100%;
	width: 10%;
	display: flex;
    justify-content: center;
    align-items: center;
}
.upper-content-left.right{
	height:100%;
	width: 10%;
	display: flex;
    justify-content: center;
    align-items: center;
}
.upper-content-right.right{
	height:100%;
	width: 90%;
	text-align: center;
}
.agent-name{
	font-weight: bold;
}
.agent-description{
	font-weight: 600;
}
.spinner-class {
  position:absolute;
  /*z-index: 999;*/
  top: -3px;
  height:110px;
  width:48%;
  background: rgba( 255, 255, 255, .9 );
  display:flex;
  justify-content: center;
  align-items: center;
  border: solid, 1px;
}
</style>
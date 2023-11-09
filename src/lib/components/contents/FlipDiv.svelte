<script lang="ts">
import { onMount} from "svelte"
import Spinner from '../spinner/RingLoader.svelte'
import {dragElement, showHideLoader} from '../CompUtils.js'
import {sleep} from "../../script/api.js"
import Switch from "./Switch.svelte"

export let agent:any = {
}
export let colorleft = "#f0f0f0"
export let colorrightstart = "#afffaf"
export let colorrightstop = "#ffffaf"
export let colorrightstopnostore = "#ff2f2f"
export let dragelem:any = {}

export let onClickDeploy = async (ev:any)=>{
	console.log("DEPLOY CLICKED",ev.target)
	const leftelem = document.getElementById(agent.agent+'-left-hide')
	const rightelem = document.getElementById(agent.agent+'-right-hide')
	const switchright = document.getElementById(agent.agent+'-lower-content-right')
	showHideLoaderFlip(loaderidleft,pageidleft,true,dragelem)
	await sleep(2000)
	if(leftelem && rightelem && switchright){
		leftelem.style.visibility = "hidden"
		rightelem.style.visibility = "visible"
		switchright.style.visibility = "visible"
	}
	showHideLoaderFlip(loaderidleft,pageidleft,false,dragelem)

}
export let onClickUndeploy = async (ev:any)=>{
	console.log("UNDEPLOY CLICKED",ev.target)
	const agentname = ev.target.id.split('-')[0]
	
	const rightelem = document.getElementById(agent.agent+'-right-hide')
	const leftelem = document.getElementById(agent.agent+'-left-hide')
	const switchright = document.getElementById(agent.agent+'-lower-content-right')
	showHideLoaderFlip(loaderidright,pageidright,true,dragelem)
	await sleep(2000)
	if(leftelem && rightelem){
		switchright.style.visibility = "hidden"
		leftelem.style.visibility = "visible"
		rightelem.style.visibility = "hidden"
	}
	showHideLoaderFlip(loaderidright,pageidright,false,dragelem)

}

export const onCheck = async (ev:any)=>{
	const leftelem:any = document.querySelector('#'+agent.agent+'-upper-content-left')
	const colorstop = agent.instore?colorrightstop:colorrightstopnostore
	if(leftelem){
		const image:any = document.getElementById(agent.agent+'-unload-image')
		showHideLoaderFlip(loaderidright,pageidright,true,dragelem)
		await sleep(2000)
		if(ev.target.checked){
			leftelem.style.setProperty('--background-color', colorrightstart);
			// DISABLE UNLOAD BUTTON
			if(image){
				image.disabled = true
				image.style.opacity = 0.3
				image.style.cursor = 'not-allowed'
			}
		}
		else{
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

let loaderidleft =  agent.agent+"spinner-left-id"
let loaderidright =  agent.agent+"spinner-right-id"
let pageidleft = agent.agent+'-left-hide'
let pageidright = agent.agent+'-right-hide'

const showLoaded = ()=>{
	const leftelem = document.getElementById(agent.agent+'-left-hide')
	const rightelem = document.getElementById(agent.agent+'-right-hide')
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
		const left = document.getElementById(agent.agent+'flip-div-left')
		if(left){
			left.style.border = "none"
		}
	}
}

const showHideLoaderFlip = (loaderid:any, pageid:any, show:any, options:any=null) =>{
	console.log("SHOW HIDE LOADER",dragelem)
	const offset = {top:10,left:10}
	showHideLoader(loaderid,pageid,show,true,dragelem,offset)
}


onMount(()=>{
	showHideLoaderFlip(loaderidleft,pageidleft,false,dragelem)
	showHideLoaderFlip(loaderidright,pageidright,false,dragelem)
	showLoaded()
})

</script>

	<div class="flip-div-wrapper">
		<div class="flip-div">
			<div class="inside-flip-div left" id="{agent.agent+'flip-div-left'}">
				{#if agent.instore}
					<div class="inside-flip-hide-left" id="{agent.agent+'-left-hide'}">
						<div class="upper-content left" style="--background-color: {colorleft} ;" >
							<div class="upper-content-left left">
								AGENT: <span class="agent-name">{agent.agent}</span> TYPE: {agent.type}
								<br>{agent.description}
							</div>
							<div class="upper-content-right left">
								<input type="image" src="/DARROWRIGHT.svg" alt="ALT IMAGE" height="25" on:click={onClickDeploy}/>
							</div>
						</div>
						<div class="middle-content left">
							SOURCE: {agent.source} <br>DEST: {agent.destination}
						</div>
						<div class="lower-content left" style="--background-color: {colorleft} ;">
						</div>
					</div>
					<div class="spinner-class" id="{agent.agent+'spinner-left-id'}">
						<Spinner />
					</div>
				{/if}
			</div>
			<div class="inside-flip-div right">
				<div class="inside-flip-hide-right" id="{agent.agent+'-right-hide'}">
					<div class="upper-content right" id="{agent.agent+'-upper-content-left'}" style="--background-color: {agent.instore?colorrightstop:colorrightstopnostore} ;">
						<div class="upper-content-left right">
							<input type="image" id="{agent.agent+'-unload-image'}"  src="{agent.instore?'/DARROWLEFT.svg':'/CROSS.svg'}" alt="ALT IMAGE" height="25" on:click={onClickUndeploy}/>
						</div>
						<div class="upper-content-right right">
							AGENT: <span class="agent-name">{agent.agent}</span> TYPE: {agent.type}
							<br>{agent.description}
						</div>
					</div>
					<div class="middle-content right">
						SOURCE: {agent.source} <br>DEST: {agent.destination}
					</div>
					<div class="lower-content right" id="{agent.agent+'-lower-content-right'}" style="--background-color: {colorleft} ;">
						<Switch height='20px' width="35px" {onCheck}/>
					</div>
				</div>
				<div class="spinner-class" id="{agent.agent+'spinner-right-id'}">
					<Spinner />
				</div>
			</div>
		</div>
	</div>

<style>
.flip-div-wrapper{
	display:flexbox;
	justify-content:center ;
	margin: 4px;
	overflow-y:auto ;
	height: fit-content;
}
.flip-div{
	display:flex;
	width:800px;
	height: 120px;
	justify-content:space-evenly ;
}

.inside-flip-div{
	width:40%;
	height: 90%;
	border: 1px solid #333;
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
.spinner-class {
  position:absolute;
  /*z-index: 999;*/
  top: -3px;
  height:113px;
  width:323px;
  background: rgba( 255, 255, 255, .9 );
  display:flex;
  justify-content: center;
  align-items: center;
  border: solid, 1px;
}
</style>
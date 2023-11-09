<script lang="ts">
import { onMount} from "svelte"
import Spinner from '../spinner/RingLoader.svelte'
import {showHideLoader} from '../CompUtils.js'
import {sleep} from "../../script/api.js"
import Switch from "./Switch.svelte"

export let scanner:any = {
	agent: "SCANNER01",
	type: "SCANNER",
	description: "Descrizione dello scanner",
	source:"s7-127.0.0.1:502",
	destination:"mqtt-127.0.0.1:8883",
	loaded:true,
}
export let colorleft = "#f0f0f0"
export let colorrightstart = "#afffaf"
export let colorrightstop = "#ffffaf"
export let colorrightstopnostore = "#ff2f2f"

export let onClickDeploy = async (ev:any)=>{
	console.log("DEPLOY CLICKED",ev.target)
	const leftelem = document.getElementById(scanner.agent+'-left-hide')
	const rightelem = document.getElementById(scanner.agent+'-right-hide')
	showHideLoader(loaderidleft,pageidleft,true,{top:100})
	await sleep(2000)
	showHideLoader(loaderidleft,pageidleft,false,{top:100})
	if(leftelem && rightelem){
		leftelem.style.visibility = "hidden"
		rightelem.style.visibility = "visible"
	}
}
export let onClickUndeploy = async (ev:any)=>{
	console.log("UNDEPLOY CLICKED",ev.target)
	const rightelem = document.getElementById(scanner.agent+'-right-hide')
	const leftelem = document.getElementById(scanner.agent+'-left-hide')
	showHideLoader(loaderidright,pageidright,true,{top:100})
	await sleep(2000)
	showHideLoader(loaderidright,pageidright,false,{top:100})
	if(leftelem && rightelem){
		leftelem.style.visibility = "visible"
		rightelem.style.visibility = "hidden"
	}
}

export const onCheck = (ev:any)=>{
	const leftelem:any = document.querySelector('#'+scanner.agent+'-upper-content-left')
	const colorstop = scanner.instore?colorrightstop:colorrightstopnostore
	if(leftelem){
		const image:any = document.getElementById(scanner.agent+'-unload-image')
		if(ev.target.checked){
			leftelem.style.setProperty('--background-color', colorrightstart);
			// DISABLE UNLOAD BUTTON
			if(image)
				image.disabled = true
				image.style.opacity = 0.3
				image.style.cursor = 'not-allowed'
		}
		else{
			leftelem.style.setProperty('--background-color', colorstop);
			// ENABLE UNLOAD BUTTON
			if(image)
				image.disabled = false
				image.style.opacity = 1.0
				image.style.cursor = 'pointer'
		}
	}
}

let loaderidleft =  scanner.agent+"spinner-left-id"
let loaderidright =  scanner.agent+"spinner-right-id"
let pageidleft = scanner.agent+'-left-hide'
let pageidright = scanner.agent+'-right-hide'

const showLoaded = ()=>{
	const leftelem = document.getElementById(scanner.agent+'-left-hide')
	const rightelem = document.getElementById(scanner.agent+'-right-hide')
		if(scanner.loaded){
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
		const left = document.getElementById(scanner.agent+'flip-div-left')
		if(left){
			left.style.border = "none"
		}
	}
}


onMount(()=>{
	showHideLoader(loaderidleft,pageidleft,false,true)
	showHideLoader(loaderidright,pageidright,false,true)
	showLoaded()
})

</script>

	<div class="flip-div-wrapper">
		<div class="flip-div">
			<div class="inside-flip-div left" id="{scanner.agent+'flip-div-left'}">
				{#if scanner.instore}
					<div class="inside-flip-hide-left" id="{scanner.agent+'-left-hide'}">
						<div class="upper-content left" style="--background-color: {colorleft} ;" >
							<div class="upper-content-left left">
								AGENT: <span class="agent-name">{scanner.agent}</span> TYPE: {scanner.type}
								<br>{scanner.description}
							</div>
							<div class="upper-content-right left">
								<input type="image" src="/DARROWRIGHT.svg" alt="ALT IMAGE" height="25" on:click={onClickDeploy}/>
							</div>
						</div>
						<div class="middle-content left">
							SOURCE: {scanner.source} <br>DEST: {scanner.destination}
						</div>
						<div class="lower-content left" style="--background-color: {colorleft} ;">
						</div>
					</div>
					<div class="spinner-class" id="{scanner.agent+'spinner-left-id'}">
						<Spinner />
					</div>
				{/if}
			</div>
			<div class="inside-flip-div right">
				<div class="inside-flip-hide-right" id="{scanner.agent+'-right-hide'}">
					<div class="upper-content right" id="{scanner.agent+'-upper-content-left'}" style="--background-color: {scanner.instore?colorrightstop:colorrightstopnostore} ;">
						<div class="upper-content-left right">
							<input type="image" id="{scanner.agent+'-unload-image'}"  src="{scanner.instore?'/DARROWLEFT.svg':'/CROSS.svg'}" alt="ALT IMAGE" height="25" on:click={onClickUndeploy}/>
						</div>
						<div class="upper-content-right right">
							AGENT: <span class="agent-name">{scanner.agent}</span> TYPE: {scanner.type}
							<br>{scanner.description}
						</div>
					</div>
					<div class="middle-content right">
						SOURCE: {scanner.source} <br>DEST: {scanner.destination}
					</div>
					<div class="lower-content right" style="--background-color: {colorleft} ;">
						<Switch height='20px' width="35px" {onCheck}/>
					</div>
				</div>
				<div class="spinner-class" id="{scanner.agent+'spinner-right-id'}">
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
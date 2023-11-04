<script lang="ts">

import { onMount} from "svelte"
import Wmanag from '../lib/components/WManag.svelte'
import DockerManag from '../lib/components/contents/DockerManag.svelte'
import WindowFooter from '../lib/components/contents/WindowFooter.svelte'
import Spinner from '../lib/components/spinner/RingLoader.svelte'
import {token, mock} from '../lib/ustore.js'
import {setDockerEnv, dockerCreate, dockerInfo, dockerListContainers,dockerListImages} from '../lib/script/apidocker.js'
import { writable } from 'svelte/store';


let cafile
let certfile
let keyfile
let reqfile
let host = "127.0.0.1"
let port = "2376"
let title = "DOCKER MANAGEMENT - DAEMON: "+host+":"+port
let footermessage = "load certificate files"
let imagedatarows:any = [];
let containerdatarows:any = [];
let contdatarows:any = writable(containerdatarows);
let imdatarows:any = writable(imagedatarows);
const disableClose = true
const draggable = true
const zindex = 4
const headercolor = "#f4e2d2"

onMount(async () => { 
	$mock = true
	showSpinner(true)
	
 })

const showSpinner = (spinner:boolean) =>{
	const elements = document.getElementsByClassName("docker-container")
	const elements2 = document.getElementsByClassName("spinner-wrapper")
	if(elements.length>0){
		const elem = elements[0]
		if(spinner)
			elem.style.display = "none"
		else
			elem.style.display = "flex"
	}
	if(elements2.length>0){
		const elem = elements2[0]
		if(spinner)
			elem.style.display = "flex"
		else
			elem.style.display = "none"
	}
}
// Click on file download button
const onClickFile = (ev:any)=>{
	showSpinner(true)
	reqfile = ev.target.id
	const target = document.getElementById("pem-file-input")
	target.click()
}

// Click on submit button
const onClickSubmit = async (ev:any)=>{
	let button = document.getElementById('docker-submit')
	const caelem = document.getElementById("ca-file-input")
	const certelem = document.getElementById("cert-file-input")
	const keyelem = document.getElementById("key-file-input")
	button.setAttribute('disabled',"true")
	caelem.value = "CA"
	certelem.value = "CERT"
	keyelem.value = "KEY"
	cafile = null
	certfile = null
	keyfile = null
	reqfile = null
	// Submit to docker daemon
	footermessage = "connection to daemon "+host+":"+port
	let res
	try{
		const env = {
				DOCKER_HOST: host
			}
		await setDockerEnv(env,$mock)
		res = await dockerCreate(cafile,certfile,keyfile,$mock)
		res = await dockerInfo($mock)
		switch(res.code){
				case 'ERR_OSSL_PEM_NO_START_LINE':
					footermessage = ' NOT CONNECTED '+res.code + ' check certs files'
					//statuscolor = 'red'
					break;
				default:
					if(res.errno || res.code){
						footermessage = ' NOT CONNECTED '+res.code
					}
					else{ 
						footermessage = ' CONNECTED Architecture: '+res.data.Architecture + '  OS Type: '+res.data.OSType + '  OS: '+res.data.OperatingSystem +'  OS Version: '+res.data.OSVersion+ '  Server Version: '+res.data.ServerVersion 
						res = await dockerListContainers({all:true},$mock)
						res = res.data
						if(Array.isArray(res)){
							$contdatarows = res
							for(let i =0; i< $contdatarows.length;i++) 
								$contdatarows[i].Created = new Date($contdatarows[i].Created).toISOString()
						}
						res = await dockerListImages({all:true},$mock)
						res = res.data
						if(Array.isArray(res)){
							$imdatarows = res
							for(let i =0; i< $imdatarows.length;i++) 
								$imdatarows[i].Created = new Date($imdatarows[i].Created).toISOString()
						}
						showSpinner(false)
					}
					break
			}
	}
	catch(error){
		console.log("ERROR", error)
		footermessage = "connection error "+host+":"+port
	}
}



let toolbar = [
	{type:'button',props:{value:'CA',id:"ca-file-input"},function:onClickFile,label:''},
	{type:'button',props:{value:'CERT',id:"cert-file-input"},function:onClickFile,label:''},
	{type:'button',props:{value:'KEY',id:"key-file-input"},function:onClickFile,label:''},
	{type:'button',props:{value:'INVIA',id:"docker-submit"},function:onClickSubmit,label:'',disabled:true},
]

// Read file from file input
const readFile = async (ev:any)=>{
	try{
			let file = await ev.target.files[0].arrayBuffer();
			let button = document.getElementById('docker-submit')
			let element = document.getElementById(reqfile)
			element.value = ev.target.files[0].name
			let ui8 = new Uint8Array(file);
			const fileContent = [...ui8]
			switch(reqfile){
				case "ca-file-input":
					cafile = fileContent
					break;
				case "cert-file-input":
					certfile = fileContent
					break;
				case "key-file-input":
					keyfile = fileContent
					break;
				
			}
			// Enable submit button
			const caelem = document.getElementById("ca-file-input")
			const certelem = document.getElementById("cert-file-input")
			const keyelem = document.getElementById("key-file-input")
			if(caelem.value!='CA'&& certelem.value!='CERT'&& keyelem.value!='KEY'){
				button.removeAttribute('disabled')
				button.style.cursor='pointer'
			}
		}catch(error){
			console.log("READ FILE ERROR", error)
		}
}

const onClickContainerStart = async (ev:any)=>{
	console.log("ONCLICK CONTAINER START",ev.target)
}

</script>

	<div class="home-div">
		<Wmanag id="defaultWManager" title="{title}" toolbar={toolbar} {disableClose} {draggable} {headercolor}>
			    
				<Spinner slot="spinner" />
				
				<DockerManag slot="bodycontent" {zindex} {headercolor} contdatarows={contdatarows} imdatarows={imdatarows} {onClickContainerStart}/>
				
			<WindowFooter slot="footercontent" message={footermessage}/>
		</Wmanag>
		<input id="pem-file-input" type="file" accept=".pem"  on:change={readFile}>
	</div>
<style>
.home-div{
	position: relative;
	width: 500px;
	height: fit-content;
	display: block;
}
#pem-file-input{
	visibility:hidden;
}

</style>



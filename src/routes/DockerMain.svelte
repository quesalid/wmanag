<script lang="ts">
// http://port.us.org/docs/API.html
import { onMount} from "svelte"
import Wmanag from '../lib/components/WManag.svelte'
import DockerManag from '../lib/components/contents/DockerManag.svelte'
import WindowFooter from '../lib/components/contents/WindowFooter.svelte'
import Spinner from '../lib/components/spinner/RingLoader.svelte'
import {token, mock} from '../lib/ustore.js'
import {setDockerEnv, 
	dockerCreate, 
	dockerInfo, 
	dockerListContainers,
	dockerListImages,
	dockerDelete,
	dockerCreateContainer,
	dockerStartContainer,
	dockerStopContainer,
	dockerPullImage,
	dockerRemoveContainer,
	dockerRemoveImage} from '../lib/script/apidocker.js'

import { writable } from 'svelte/store';
import { sleep } from "../lib/script/api";
import {showHideLoader} from "../lib/components/CompUtils.js"


let cafile
let certfile
let keyfile
let reqfile:any
let host = "127.0.0.1"
let port = "2376"
let title = "DOCKER MANAGEMENT - DAEMON: "+host+":"+port
let footermessage = "load certificate files"
let imagedatarows:any = [];
let containerdatarows:any = [];
let contdatarows:any = writable(containerdatarows);
let imdatarows:any = writable(imagedatarows);
const disableClose = false
const draggable = true
const zindex = 4
const headercolor = "#f4e2d2"
let dockeruid = ""
let selectedImage = ""
let selectedNetwork = ""
let selectedImagePull = ""
let portMap = ""
let toolbarcontainer:any =[]
let toolbarimage:any =[]
let defaultWManager = 'defaultWDocker'
let pagesize = false
let spinnermessage = "Could take some time...."
let loaderid = "loading-page-id"
let pageid = defaultWManager

onMount(async () => {
	adjustPosition()
	showHideLoader(loaderid,pageid,false)
	$mock = true
	
 })


const resetFields = ()=>{
	const image:any = document.getElementById('addcontainerimage')
	image.setAttribute('disabled',"true")
	image.style.cursor='not-allowed'
	const imagepullimage:any = document.getElementById('imagepullimage')
	imagepullimage.setAttribute('disabled',"true")
	imagepullimage.style.cursor='not-allowed'
	const imageselect:any = document.getElementById('imageselect')
	imageselect.value = 'Select option'
	const networkselect:any = document.getElementById('networkselect')
	networkselect.value = 'Select option'
	const portmap:any = document.getElementById('portmap')
	portmap.value = ''
	const imagepull:any = document.getElementById('imagepull')
	imagepull.value = ''
}

/**
 * Click file download hidden button
 * @param ev
 */
const onClickFile = async (ev:any)=>{
	try{
		await dockerDelete(dockeruid,$mock)
	}catch(error){
		console.log("ERROR", error)
	}
	reqfile = ev.target.id
	const target = document.getElementById("pem-file-input")
	footermessage = "load certificate files"
	if(target)
		target.click()
}

/**
 * Click submit button
 * @param ev
 */
const onClickSubmit = async (ev:any)=>{
	let button:any = document.getElementById('docker-submit')
	const caelem:any = document.getElementById("ca-file-input")
	const certelem:any = document.getElementById("cert-file-input")
	const keyelem:any = document.getElementById("key-file-input")
	button.setAttribute('disabled',"true")
	button.style.cursor='not-allowed'
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
	showHideLoader(loaderid,pageid,true)
	try{
		const env = {
				DOCKER_HOST: host
			}
		await setDockerEnv(env,$mock)
		res = await dockerCreate(cafile,certfile,keyfile,$mock)
		console.log("DOCERID",res.data)
		dockeruid = res.data.uid
		res = await dockerInfo(dockeruid,$mock)
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
						res = await dockerListContainers({all:true,uid:dockeruid},$mock)
						res = res.data
						if(Array.isArray(res)){
							$contdatarows = res
							for(let i =0; i< $contdatarows.length;i++) 
								$contdatarows[i].Created = new Date($contdatarows[i].Created).toISOString()
						}
						res = await dockerListImages({all:true,uid:dockeruid},$mock)
						res = res.data
						if(Array.isArray(res)){
							$imdatarows = res
							for(let i =0; i< $imdatarows.length;i++){
								$imdatarows[i].Created = new Date($imdatarows[i].Created).toISOString()
								if($imdatarows[i].RepoTags[0] == '<none>:<none>')
									$imdatarows[i].Name = $imdatarows[i].Id
								else
									$imdatarows[i].Name = $imdatarows[i].RepoTags[0]
								
							}
						}
						updateToolbarContainer()
						adjustPosition()
					}
					break
			}
	}
	catch(error){
		console.log("ERROR", error)
		footermessage = "connection error "+host+":"+port
	}
	showHideLoader(loaderid,pageid,false)
}

/**
 * Update container toolbar options
 */
const updateToolbarContainer = ()=>{
	const index = toolbarcontainer.findIndex((item:any)=>item.props.id=='imageselect')
	if(index>=0){
		toolbarcontainer[index].props.options = []
		for(let i =0; i< $imdatarows.length;i++) {
			const opt = {value:$imdatarows[i].RepoTags[0],label:$imdatarows[i].RepoTags[0]}
			toolbarcontainer[index].props.options.push(opt)
		}
	}
	toolbarcontainer = toolbarcontainer
}

/**
 * adjust image container position relative to window container
 */
const adjustPosition = ()=>{
	const wcont = document.getElementById('containerWManager')
	const icont = document.getElementById('imageWManager')
	var crect = wcont?wcont.getBoundingClientRect():null;
	var irect = icont?icont.getBoundingClientRect():null;
	let newtop = 0
	if(crect)
	   newtop = crect.height + 20
	if(icont)
		icont.style.top = newtop+"px"
}

/**
 * Get port binding from portmap
 * @param portmap
 */
const getPortBinding = (portmap:string)=>{
	// PORTMAP FORMAT: port:hostport,port:hostport
	const portbinding:any = {}
	if(portmap && portmap != ''){
		const portmaparray = portmap.split(',')
		for(let i =0; i< portmaparray.length;i++){
			const portmapitem = portmaparray[i].split(':')
			if(portmapitem.length == 2){
				const port = portmapitem[0]
				const hostport = portmapitem[1]
				portbinding[port+'/tcp'] = [{HostPort:hostport}]
			}
		}
	}
	return portbinding
}

/**
 * Call for add container
 * @param ev
 */
const onClickAddContainer = async (ev:any)=>{
	if(dockeruid && dockeruid != ''){
		try{
			showHideLoader(loaderid,pageid,true)
			const containeroptions = {
				  Image: selectedImage,
				  AttachStdin: false,
				  AttachStdout: false,
				  AttachStderr: false,
				  Tty: false,
				  OpenStdin: false,
				  StdinOnce: false,
				  name:'',
				  ExposedPorts:{},
				  HostConfig:{
					  NetworkMode:selectedNetwork,
					  PortBindings:getPortBinding(portMap)
				  }
			}
			let res = await dockerCreateContainer(dockeruid,containeroptions,$mock)
			if(res.statusCode && res.statusCode != 200){
					footermessage = 'ERROR CREATING CONTAINER '+res.json.message
			}else{
				res = await dockerListContainers({all:true,uid:dockeruid},$mock)
				res = res.data
				if(Array.isArray(res)){
					$contdatarows = res
					for(let i =0; i< $contdatarows.length;i++) 
						$contdatarows[i].Created = new Date($contdatarows[i].Created).toISOString()
				}
				$contdatarows = $contdatarows
				footermessage = "CONTAINER CREATED "
				// RESET FIELDS
				resetFields()
			}
			updateToolbarContainer()
			await sleep(200)
			adjustPosition()
		}catch(error){
			console.log("ERROR", error)
			footermessage = 'ERROR ADDING CONTAINER '+error
		}
		showHideLoader(loaderid,pageid,false)
	}
	else
		console.log("ERROR")
}

/**
 * Call for add image
 * @param ev
 */
const onClickAddImage = async (ev:any)=>{
	if(dockeruid && dockeruid != ''){
		try{
			showHideLoader(loaderid,pageid,true)
			await sleep(5000)
			let res = await dockerPullImage(dockeruid,selectedImagePull,$mock)
			if(res.statusCode && res.statusCode != 200){
					footermessage = 'ERROR PULLING IMAGE '+res.json.message
			}else{
				res = await dockerListImages({all:true,uid:dockeruid},$mock)
				res = res.data
				if(Array.isArray(res)){
					$imdatarows = res
					for(let i =0; i< $imdatarows.length;i++){
						$imdatarows[i].Created = new Date($imdatarows[i].Created).toISOString()
						if($imdatarows[i].RepoTags[0] == '<none>:<none>')
									$imdatarows[i].Name = $imdatarows[i].Id
								else
									$imdatarows[i].Name = $imdatarows[i].RepoTags[0]
					}

				}
				$imdatarows = $imdatarows
				footermessage = "IMAGE PULLED " + selectedImagePull
				resetFields()
			}
			updateToolbarContainer()
			await sleep(200)
			adjustPosition()
		}catch(error){
			console.log("ERROR", error)
			footermessage = 'ERROR PULLING IMAGE '+error
		}
		showHideLoader(loaderid,pageid,false)
	}
}

const onClickGetSelect = async (ev:any)=>{
	switch(ev.target.id){
		case "imageselect":
			selectedImage = ev.target.value
			break;
		case "networkselect":
			selectedNetwork = ev.target.value
			const portmap:any = document.getElementById('portmap')
			const portmaplabel:any = document.getElementById('label-portmap')
			if(selectedNetwork == 'bridge')
			{
				// SET PORT MAP VISIBLE
				if(portmap)
					portmap.style.visibility = "visible"
				if(portmaplabel)
					portmaplabel.style.visibility = "visible"
			}else{
				// SET PORT MAP HIDDEN
				if(portmap)
					portmap.style.visibility = "hidden"
				if(portmaplabel)
					portmaplabel.style.visibility = "hidden"
			}
			break;
	}
	if(selectedImage && selectedImage!='' && selectedNetwork && selectedNetwork != ''){
		const image:any = document.getElementById('addcontainerimage')
		image.removeAttribute('disabled')
		image.style.cursor='pointer'
	}else{
		const image:any = document.getElementById('addcontainerimage')
		image.setAttribute('disabled',"true")
		image.style.cursor='not-allowed'
	}
}

const onClickGetText = async (ev:any)=>{
	switch(ev.target.id){
		case "imagepull":
			selectedImagePull = ev.target.value
			if(selectedImagePull && selectedImagePull!=''){
				const image:any = document.getElementById('imagepullimage')
				image.removeAttribute('disabled')
				image.style.cursor='pointer'
			}else{
				const image:any = document.getElementById('imagepullimage')
				image.setAttribute('disabled',"true")
				image.style.cursor='not-allowed'
			}
			break
		case "portmap":
			portMap = ev.target.value
			break;
	}
}

let toolbar = [
	{type:'button',props:{value:'CA',id:"ca-file-input"},function:onClickFile,label:''},
	{type:'button',props:{value:'CERT',id:"cert-file-input"},function:onClickFile,label:''},
	{type:'button',props:{value:'KEY',id:"key-file-input"},function:onClickFile,label:''},
	{type:'button',props:{value:'\u2BC8',id:"docker-submit",fsize:"small"},function:onClickSubmit,label:'',disabled:true},
]

const networkoptions:any = [
	{value:'bridge',label:'bridge'},
	{value:'host',label:'host'},
	{value:'none',label:'none'},
	{value:'container',label:'container'},
]
toolbarcontainer = [
	{type:'image',props:{id:'addcontainerimage',src:'/ADD.svg'},function:onClickAddContainer,label:"Add",disabled:true},
	{type:'select',props:{id:"imageselect",options:[]},function:onClickGetSelect,label:"Image",value:''},
	{type:'select',props:{id:"networkselect",options:networkoptions},function:onClickGetSelect,label:"Network",value:''},
	{type:'text',props:{id:"portmap",value:'',size:20,visibility:'hidden'},function:onClickGetText,label:"Portmap"},
]
toolbarimage = [
	{type:'image',props:{id:'imagepullimage',src:'/ADD.svg'},function:onClickAddImage,label:"Add",disabled:true},
	{type:'text',props:{id:"imagepull",value:'',size:35},function:onClickGetText,label:"Pull"},
]

/**
 * Read cert files from local file system
 * @param ev
 */
const readFile = async (ev:any)=>{
	try{
			let file:any = await ev.target.files[0].arrayBuffer();
			let button:any = document.getElementById('docker-submit')
			let element:any = document.getElementById(reqfile)
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
			const caelem:any = document.getElementById("ca-file-input")
			const certelem:any = document.getElementById("cert-file-input")
			const keyelem:any = document.getElementById("key-file-input")
			if(caelem.value!='CA'&& certelem.value!='CERT'&& keyelem.value!='KEY'){
				button.removeAttribute('disabled')
				button.style.cursor='pointer'
			}
		}catch(error){
			console.log("READ FILE ERROR", error)
		}
}

/**
 * Call for start container
 * @param ev
 */
const onClickContainerStart = async (ev:any)=>{
	const elem = ev.target
	const id = elem.dataset.uid
	if(dockeruid && dockeruid != '' && id){
		try{
			let res = await dockerStartContainer(dockeruid,id,$mock)
			if(res.statusCode && res.statusCode != 200){
					footermessage = 'ERROR STARTING CONTAINER '+res.json.message
			}else{
				res = await dockerListContainers({all:true,uid:dockeruid},$mock)
				res = res.data
				if(Array.isArray(res)){
					$contdatarows = res
					for(let i =0; i< $contdatarows.length;i++) 
						$contdatarows[i].Created = new Date($contdatarows[i].Created).toISOString()
				}
				$contdatarows = $contdatarows
				footermessage = "CONTAINER STARTED " + id
			}
			updateToolbarContainer()
			await sleep(200)
			adjustPosition()
		}catch(error){
			console.log("ERROR", error)
			footermessage = 'ERROR STARTING CONTAINER '+error
		}
	}
}

/**
 * Call for stop container
 * @param ev
 */
const onClickContainerStop = async (ev:any)=>{
	const elem = ev.target
	const id = elem.dataset.uid
	if(dockeruid && dockeruid != '' && id){
		try{
			let res = await dockerStopContainer(dockeruid,id,$mock)
			if(res.statusCode && res.statusCode != 200){
					footermessage = 'ERROR STOPING CONTAINER '+res.json.message
			}else{
				res = await dockerListContainers({all:true,uid:dockeruid},$mock)
				res = res.data
				if(Array.isArray(res)){
					$contdatarows = res
					for(let i =0; i< $contdatarows.length;i++) 
						$contdatarows[i].Created = new Date($contdatarows[i].Created).toISOString()
				}
				$contdatarows = $contdatarows
				footermessage = "CONTAINER STOPPED " + id
			}
			updateToolbarContainer()
			await sleep(200)
			adjustPosition()
		}catch(error){
			console.log("ERROR", error)
			footermessage = 'ERROR STOPPING CONTAINER '+error
		}
	}
}
const onClickContainerDelete = async (ev:any)=>{
	const elem = ev.target
	const id = elem.dataset.uid
	if(dockeruid && dockeruid != '' && id){
		try{
			showHideLoader(loaderid,pageid,true)
			let res = await dockerRemoveContainer(dockeruid,id,$mock)
			if(res.statusCode && res.statusCode != 200){
					footermessage = 'ERROR REMOVING CONTAINER '+res.json.message
			}else{
				res = await dockerListContainers({all:true,uid:dockeruid},$mock)
				res = res.data
				if(Array.isArray(res)){
					$contdatarows = res
					for(let i =0; i< $contdatarows.length;i++) 
						$contdatarows[i].Created = new Date($contdatarows[i].Created).toISOString()
				}
				$contdatarows = $contdatarows
				footermessage = "CONTAINER REMOVED " + id
			}
			updateToolbarContainer()
			await sleep(200)
			adjustPosition()
		}catch(error){
			footermessage = 'ERROR REMOVING CONTAINER '+error
			console.log("ERROR", error)
		}
		showHideLoader(loaderid,pageid,false)
	}
}

const onClickImageDelete = async (ev:any)=>{
	const elem = ev.target
	const id = elem.dataset.uid
	if(dockeruid && dockeruid != '' && id){
		try{
			showHideLoader(loaderid,pageid,true)
			let res = await dockerRemoveImage(dockeruid,id,$mock)
			if(res.statusCode && res.statusCode != 200){
					footermessage = 'ERROR REMOVING CONTAINER '+res.json.message
			}else{
				res = await dockerListImages({all:true,uid:dockeruid},$mock)
				res = res.data
				if(Array.isArray(res)){
					$imdatarows = res
					for(let i =0; i< $imdatarows.length;i++){
						$imdatarows[i].Created = new Date($imdatarows[i].Created).toISOString()
						if($imdatarows[i].RepoTags[0] == '<none>:<none>')
									$imdatarows[i].Name = $imdatarows[i].Id
								else
									$imdatarows[i].Name = $imdatarows[i].RepoTags[0]
					}
				}
				$imdatarows = $imdatarows
				footermessage = "IMAGE DELETED " + id
			}
			updateToolbarContainer()
			await sleep(200)
			adjustPosition()
		}catch(error){
			console.log("ERROR", error)
			footermessage = 'ERROR DELETING IMAGE '+error
		}
		showHideLoader(loaderid,pageid,false)
	}
}

const closeModal = (ev:any) =>{
	 const divCont = document.getElementById("docker-manager-div-id")
	 if(divCont)
		divCont.style.display = 'none'
 }
</script>

	<div class="docker-manager-div" id="docker-manager-div-id">
		<Wmanag id="{defaultWManager}" 
			title="{title}" 
			toolbar=toolbar
			closeMenu={closeModal}
			top="5%" 
			left="20%" 
			{disableClose} 
			{draggable} 
			{headercolor}>
			<DockerManag slot="bodycontent" {zindex} {headercolor} 
					bind:contdatarows={contdatarows} bind:imdatarows={imdatarows} 
					{onClickContainerStart} {onClickContainerStop} {onClickContainerDelete} {onClickImageDelete} {pagesize}
					bind:toolbarcontainer={toolbarcontainer} 
					bind:toolbarimage={toolbarimage}/>
			<WindowFooter slot="footercontent" message={footermessage}/>
		</Wmanag>
		<input id="pem-file-input" type="file" accept=".pem"  on:change={readFile}>
		<!-- MODAL WINDOW WITH SPINNER -->
		<div class="loading" id="loading-page-id">
			<!--div class="spinner-wrapper"-->
				<Spinner message={spinnermessage}/>
			<!--/div-->
		</div>
	</div>
	
<style>
/*.docker-manager-div{
	position: relative;
	width: 500px;
	height: fit-content;
	display: block;
}*/
.docker-manager-div{
  /*display: none;*/
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
#pem-file-input{
	visibility:hidden;
}
.loading {
  position: absolute;
  z-index: 999;
  top: -20px;
  height:620px;
  width:1100px;
  background: rgba( 255, 255, 255, .9 );
  display:flex;
  justify-content: center;
  align-items: center;
  border: solid, 1px;
}

</style>





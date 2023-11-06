<script lang="ts">
// https://blog.logrocket.com/min-max-clamp-css-functions/

import { onMount} from "svelte";
import { writable } from "svelte/store";

import {dragElement} from '../CompUtils.js'
import Wmanag from '../WManag.svelte'
import SimpleTable from './SimpleTable.svelte'


export let onClickAddContainer = (ev:any)=>{console.log("ONCLICK ADD CONTAINER")}
export let onClickAddImage = (ev:any)=>{console.log("ONCLICK ADD IMAGE")}
export let onClickContainerStart = (ev:any)=>{console.log("ONCLICK CONTAINER START",ev.target)}
export let onClickContainerStop = (ev:any)=>{console.log("ONCLICK CONTAINER STOP")}
export let onClickContainerDelete = (ev:any)=>{console.log("ONCLICK CONTAINER DELETE")}
export let onClickImageDelete = (ev:any)=>{console.log("ONCLICK IMAGE DELETE")}
export let contdatarows = writable([])
export let imdatarows = writable([])
export let zindex = 4
export let headercolor = "#e9e9e9"
export let toolbarcontainer = [{type:'image',props:{src:'/ADD.svg'},function:onClickAddContainer,label:"Add"}]
export let toolbarimage = [{type:'image',props:{src:'/ADD.svg'},function:onClickAddImage,label:"Add"},]
export let containers = []
export let images = []


onMount(async () => { 
	
 })


let toolbar = [
]

const disableClose = true
const draggable = true
const titlecontainer = 'CONTAINERS'
const titleimages = 'IMMAGINI'
const topimage = '80px'
const voidfunction = ()=>{return ""}


let containerdatacolumns = [
	  {
		header: 'Image',
		accessor: 'Image',
	  },
	  {
		header: 'Created',
		accessor: 'Created',
	  },
	  {
		header: 'State',
		accessor: 'State',
	  },
	  {
		  header: 'Start',
		  accessor: voidfunction,
		  renderdef:{type:'image',params:{image:'/START.svg',onClick:onClickContainerStart},idtag:'Id'}
	  },
	  {
		  header: 'Stop',
		  accessor: voidfunction,
		  renderdef:{type:'image',params:{image:'/STOP.svg',onClick:onClickContainerStop},idtag:'Id'}
	  },
	  {
		  header: 'Delete',
		  accessor: voidfunction,
		  renderdef:{type:'image',params:{image:'/DELETE.svg',onClick:onClickContainerDelete},idtag:'Id'}
	  }
  ];

  

  let imagedatacolumns = [
	  {
		header: 'Name',
		accessor: 'Name',
	  },
	  {
		header: 'Created',
		accessor: 'Created',
	  },
	  {
		  header: 'Delete',
		  accessor: voidfunction,
		  renderdef:{type:'image',params:{image:'/DELETE.svg',onClick:onClickImageDelete},idtag:'Id'}
	  }
  ];

  

</script>

	<div class="docker-container">
		<Wmanag id="containerWManager"  title="{titlecontainer}" toolbar={toolbarcontainer} {disableClose} {draggable} {headercolor} {zindex}>
			<SimpleTable slot="bodycontent" data={contdatarows} datacolumns={containerdatacolumns}/>
		</Wmanag>
		<Wmanag id="imageWManager"  title="{titleimages}" toolbar={toolbarimage} {disableClose} {draggable} {zindex} {headercolor} top={topimage}>
			<SimpleTable slot="bodycontent" bind:data={imdatarows} datacolumns={imagedatacolumns}/>
		</Wmanag>	
	</div>

<style>
	.docker-container{
		position: relative;
		width: 1000px;
		height:min(500px,500px);
	}
</style>
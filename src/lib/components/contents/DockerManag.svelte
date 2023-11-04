<script lang="ts">
// https://blog.logrocket.com/min-max-clamp-css-functions/

import { onMount} from "svelte";
import { writable } from "svelte/store";

import {dragElement} from '../CompUtils.js'
import Wmanag from '../WManag.svelte'
import SimpleTable from './SimpleTable.svelte'


onMount(async () => { 
	
 })

export const onClickAddContainer = (ev:any)=>{
	console.log("ONCLICK ADD CONTAINER")
	$contdatarows.push({ image: 'quesalid/up2agentdata:main', created: '2016-07-07T01:15:55.000Z',state:'Running'})
	$contdatarows = $contdatarows
		
}

export const onClickAddImage = (ev:any)=>{
	console.log("ONCLICK ADD IMAGE")
	$imdatarows.push({ id: 'sha256:e216a057b1cb1efc11f8a268f37ef62083e70b1b38323ba252e25ac88904a7e8', created: '2016-07-07T01:15:55.000Z'},)
	$imdatarows = $imdatarows
}



let toolbar = [
]

export let zindex = 4
export let headercolor = "#e9e9e9"
export let toolbarcontainer = [{type:'image',props:{src:'/ADD.svg'},function:onClickAddContainer,label:"Add"}]
export let toolbarimage = [{type:'image',props:{src:'/ADD.svg'},function:onClickAddImage,label:"Add"},]
export let containers = []
export let images = []

const disableClose = true
const draggable = true
const titlecontainer = 'CONTAINERS'
const titleimages = 'IMMAGINI'
const topimage = '80px'



const voidfunction = ()=>{return ""}

export let onClickContainerStart = (ev:any)=>{console.log("ONCLICK CONTAINER START",ev.target)}
export let onClickContainerStop = (ev:any)=>{console.log("ONCLICK CONTAINER STOP")}
export let onClickContainerDelete = (ev:any)=>{console.log("ONCLICK CONTAINER DELETE")}
export let onClickImageDelete = (ev:any)=>{console.log("ONCLICK IMAGE DELETE")}
export let contdatarows = writable([])
export let imdatarows = writable([])




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
		  renderdef:{type:'image',params:{image:'/START.svg',onClick:onClickContainerStart}}
	  },
	  {
		  header: 'Stop',
		  accessor: voidfunction,
		  renderdef:{type:'image',params:{image:'/STOP.svg',onClick:onClickContainerStop}}
	  },
	  {
		  header: 'Delete',
		  accessor: voidfunction,
		  renderdef:{type:'image',params:{image:'/DELETE.svg',onClick:onClickContainerDelete}}
	  }
  ];

  

  let imagedatacolumns = [
	  {
		header: 'Id',
		accessor: 'Id',
	  },
	  {
		header: 'Created',
		accessor: 'Created',
	  },
	  {
		  header: 'Delete',
		  accessor: voidfunction,
		  renderdef:{type:'image',params:{image:'/DELETE.svg',onClick:onClickImageDelete}}
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
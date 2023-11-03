<script lang="ts">
// https://blog.logrocket.com/min-max-clamp-css-functions/

import { onMount} from "svelte";
    import App from "../../../App.svelte";

import {dragElement} from '../CompUtils.js'
import Wmanag from '../WManag.svelte'
import SimpleTable from './SimpleTable.svelte'


onMount(async () => { 
	
 })

const onClickPlus = (ev:any)=>{
	console.log("ONCLICK PLUS")
}

const onClickMinus = (ev:any)=>{
	console.log("ONCLICK MINUS")
}

const onClickX = (ev:any)=>{
	console.log("ONCLICK X")
}

let toolbar = [
	{type:'button',value:'+',function:onClickPlus},
	{type:'button',value:'-',function:onClickMinus,label:'Minus'},
	{type:'button',value:'x',function:onClickX},
]

export let zindex = 4
export let headercolor = "#e9e9e9"
export let toolbarcontainer = []
export let toolbarimage = []
export let containers = []
export let images = []

const disableClose = true
const draggable = true
const titlecontainer = 'CONTAINERS'
const titleimages = 'IMMAGINI'
const topimage = '80px'

let containerdatarows = [
		{ image: 'quesalid/up2agentdata:latest', created: '2016-07-07T01:15:55.000Z',state:'Exited' },
  ];

const voidfunction = ()=>{return ""}
const onClickContainerStart = (ev:any)=>{
	console.log("ONCLICK CONTAINER START")
}

let containerdatacolumns = [
	  {
		header: 'Image',
		accessor: 'image',
	  },
	  {
		header: 'Created',
		accessor: 'created',
	  },
	  {
		header: 'State',
		accessor: 'state',
	  },
	  {
		  header: 'Start',
		  accessor: voidfunction,
		  renderdef:{type:'image',params:{image:'/START.svg',onClick:onClickContainerStart}}
	  },
	  {
		  header: 'Stop',
		  accessor: voidfunction,
		  renderdef:{type:'image',params:{image:'/STOP.svg'}}
	  },
	  {
		  header: 'Delete',
		  accessor: voidfunction,
		  renderdef:{type:'image',params:{image:'/DELETE.svg'}}
	  }
  ];

  let imagedatarows = [
		{ id: 'sha256:e216a057b1cb1efc11f8a268f37ef62083e70b1b38323ba252e25ac88904a7e8', created: '2016-07-07T01:15:55.000Z'},
  ];

  let imagedatacolumns = [
	  {
		header: 'Id',
		accessor: 'id',
	  },
	  {
		header: 'Created',
		accessor: 'created',
	  },
	  {
		  header: 'Delete',
		  accessor: voidfunction,
		  renderdef:{type:'image',params:{image:'/DELETE.svg'}}
	  }
  ];


</script>

	<div class="docker-container">
			<Wmanag id="containerWManager" title="{titlecontainer}" toolbar={toolbarcontainer} {disableClose} {draggable} {headercolor} {zindex}>
				<SimpleTable slot="bodycontent" datarows={containerdatarows} datacolumns={containerdatacolumns}/>
			</Wmanag>
			<Wmanag id="imageWManager" title="{titleimages}" toolbar={toolbarimage} {disableClose} {draggable} {zindex} {headercolor} top={topimage}>
				<SimpleTable slot="bodycontent" datarows={imagedatarows} datacolumns={imagedatacolumns}/>
			</Wmanag>
	</div>

<style>
	.docker-container{
		position: relative;
		width: 1000px;
		height:min(500px,500px);
	}
</style>
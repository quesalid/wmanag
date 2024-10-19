<script lang='ts'>
import {onMount} from 'svelte';

export let widgets = [
	{id:'Donut',top:'0px',left:'0px',included:false},
	{id:'Map',top:'0px',left:'0px',included:true},
	{id:'Alarms',top:'0px',left:'0px',included:false},
]

export let saveDashboard = (ev:any)=>{
	console.log("SAVE DASHBOARD")
}

// OBSERVERS
const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
	 console.log("RESIZE OBSERVER",entry.contentBoxSize)
    if (entry.contentBoxSize) {
      /*const contentBoxSize = entry.contentBoxSize[0];
      h1Elem.style.fontSize = `${Math.max(
        1.5,
        contentBoxSize.inlineSize / 200,
      )}rem`;
      pElem.style.fontSize = `${Math.max(
        1,
        contentBoxSize.inlineSize / 600,
      )}rem`;
    } else {
      h1Elem.style.fontSize = `${Math.max(
        1.5,
        entry.contentRect.width / 200,
      )}rem`;
      pElem.style.fontSize = `${Math.max(1, entry.contentRect.width / 600)}rem`;*/
    }
  }
  });

  // On mount set resize observer or each widget
  onMount(() => {
	for(let i=0;i<widgets.length;i++){
		const widget = document.getElementById(widgets[i].id)
		if(widget){
			resizeObserver.observe(widget);
		}
	}
  });


const setTargetProperties = (ev:any)=>{
	const id = ev.target.id
	const title:any = document.getElementById('title-'+id)
	if(title)
		ev.currentTarget.removeChild(title)
	const child:any = document.getElementById('img-'+id)
	if(!child){
		let img:any
		img = document.createElement("img")
		img.id = 'img-'+id
		img.src=("/dashboard/"+id+'.png')
		img.draggable = false
		ev.currentTarget.appendChild(img)
	}
	ev.currentTarget.style.backgroundColor = 'white';
	ev.currentTarget.style.border = '2px solid blue';
	ev.currentTarget.style.width = 'fit-content';
	ev.currentTarget.style.height = 'fit-content';
	ev.currentTarget.style.resize='both'
	ev.currentTarget.style.overflow='auto'
   
}

const unsetTargetProperties = (draggableElement:any)=>{
	const child:any = document.getElementById('img-'+draggableElement.id)
	if(child)
		draggableElement.removeChild(child)
	const title:any = document.getElementById('title-'+draggableElement.id)
	if(!title){
		let title:any
		title = document.createElement("div")
		title.id = 'title-'+draggableElement.id
		title.innerHTML = draggableElement.id
		draggableElement.appendChild(title)
	}
	draggableElement.style.border = 'none';
	draggableElement.style.width = '100%';
	draggableElement.style.height = 'fit-content';
	draggableElement.style.position='static'
	draggableElement.style.top='initial'
	draggableElement.style.left='initial'
	draggableElement.style.backgroundColor = '#DDEFDE';
}

const findPos = (ev:any,element:any) =>{
	const clientRect = element.getBoundingClientRect();
	let x = ev.clientX - clientRect.left// - clientX
	let y = ev.clientY - clientRect.top -5 //- clientY 
    return { x: x, y: y };
}
const dragStart = (ev:any) =>{
	const id = ev.target.id
	ev.dataTransfer.clearData();
	ev.dataTransfer.setData('text/plain',id);
	setTargetProperties(ev)
	//ADD LISTENERS
}
const dragOver = (ev:any) =>{
	ev.preventDefault();
}
const dragOverCol = (ev:any) =>{
	ev.preventDefault();
}
const drop = (ev:any) =>{
	const id = ev.dataTransfer.getData('text');
	// get draggable element
	const draggableElement:any = document.getElementById(id)
	draggableElement.style.position='absolute'
	// get dropzone element
	const dropzone:any = document.getElementById("screen-drop-zone-id")
	// ADJUST COORDS
	const pos:any = findPos(ev,dropzone);
	draggableElement.style.top=pos.y+'px'
	draggableElement.style.left=pos.x+'px'
	// STORE STATUS AND POSITION IN WIDGETS
	const idx = widgets.findIndex((item:any)=> item.id == draggableElement.id)
	if(idx > -1){
		// NEED RESCALING !!
		widgets[idx].top = draggableElement.style.top
		widgets[idx].left = draggableElement.style.left
		widgets[idx].included = true
	}
	// append dragged element to dropzone
	dropzone.appendChild(draggableElement);
}

const dropCol = (ev:any) =>{
	const id = ev.dataTransfer.getData('text');
	// get draggable element
	const draggableElement:any = document.getElementById(id)
	unsetTargetProperties(draggableElement)
	// get dropzone element
	const dropzone:any = document.getElementById("draggable-list")
	// STORE STATUSIN WIDGETS
	const idx = widgets.findIndex((item:any)=> item.id == draggableElement.id)
	if(idx > -1){
		// NEED RESCALING !!
		widgets[idx].included = false
	}
	// append dragged element to dropzone
	dropzone.appendChild(draggableElement);
}

const dragEnd = (ev:any)=>{
	console.log("ON DRAG END",ev.clientX,ev.clientY)
}



</script>

<div class="wrapper">
	<div class="col-container">
		 <input type='button' value='Save Dashboard' on:click={saveDashboard}/>
		 <!-- svelte-ignore a11y-no-static-element-interactions -->
		 <div class="col" id="draggable-list" on:dragover={dragOverCol} on:drop={dropCol}>
			{#each widgets as Widget}
				{#if !Widget.included}
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<div class="db-draggable-item" draggable="true" on:dragstart={dragStart} on:dragend={dragEnd} id="{Widget.id}" >
						<div id={"title-"+Widget.id}>{Widget.id}</div>
					</div>
				{/if}
			{/each}	
		 </div>
	</div>
		 <!-- svelte-ignore a11y-no-static-element-interactions -->
		 <!-- svelte-ignore a11y-click-events-have-key-events -->
		 <div class="screen-drop-zone" 
				id="screen-drop-zone-id"  
				on:dragover={dragOver} 
				on:drop={drop}
				 >
				{#each widgets as Widget}
					{#if Widget.included}
						<div class="db-draggable-item included" 
								draggable="true" 
								on:dragstart={dragStart} 
								on:dragend={dragEnd} 
								id="{Widget.id}" 
								style="top:{Widget.top};left:{Widget.left};">
							<img id={"img-"+Widget.id} 
								src={"/dashboard/"+Widget.id+".png"}
								alt="Widget.id" 
								draggable='false'/>
						</div>
					{/if}
				{/each}	
	     </div>
	</div>
<style>
.wrapper {
  width: 100%;
  height: calc(100vh - 67px);
  display: flex;
}
.col-container{
	display:flexbox;
}
.col-container input[type='button']{
	padding: 3px;
	border: 1px solid;
	border-radius: 3px;
	margin-top: 10px;
	font-weight: 600 ;
	cursor:pointer;
}
.col {
  overflow: auto;
  width: 300px;
  height: 100%;
 /* border: 1px solid #999999;*/
}
.screen-drop-zone{
	display:flexbox;
	position:relative;
	margin: 20px;
	width: calc(100% - 400px);
	height: calc(100% - 100px);
	border: 1px solid #999999;
	background:whitesmoke url('/grid_20.png') repeat;
	padding: 0%;
}
.db-draggable-item {
  background-color: #DDEFDE;
  font-weight: normal;
  margin-bottom: 10px;
  margin-top: 10px;
  padding: 10px;
  font-weight: bold;
  cursor:grab;
}
.included{
	position:absolute;
	width:fit-content;
	height:fit-content;
	border:2px solid blue;
	background-color: white;
	resize:both;
	overflow:auto ;
}
</style>
<script lang='ts'>
import {onMount} from 'svelte';

export let widgets = [
	{id:'Donut',top:'0px',left:'0px',visible:"visible"},
	{id:'Map',top:'0px',left:'0px',visible:"visible"},
	{id:'Alarms',top:'0px',left:'0px',visible:"visible"},
]

export let saveDashboard = (ev:any)=>{
	console.log("SAVE DASHBOARD")
}

let dzWidth = 1200;
// OBSERVERS
const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const dashboardWidth = dzWidth;
    const dropZoneWidth = entry.target.offsetParent.offsetWidth;
    const scale = dashboardWidth / dropZoneWidth;

    const width = entry.contentRect.width * scale;
    const height = entry.contentRect.height * scale;

    // Riscalare e aggiornare le dimensioni nel widget
    const idx = widgets.findIndex((item: any) => item.id == entry.target.id);
    if (idx > -1) {
      widgets[idx].width = width + 'px';
      widgets[idx].height = height + 'px';
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
		// set image width/height rescaled
		ev.currentTarget.appendChild(img)
	}
	ev.currentTarget.style.backgroundColor = 'white';
	ev.currentTarget.style.border = '2px solid blue';
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
	draggableElement.style.resize='none'
}

const findPos = (ev: any, element: any) => {
  const clientRect = element.getBoundingClientRect();
  const widgetRect = ev.target.getBoundingClientRect();
  let x = ev.clientX - clientRect.left;
  let y = ev.clientY - clientRect.top;

  console.log("X", x, "Y", y, "W", widgetRect.width, "H", widgetRect.height, "CW", clientRect.width, "CH", clientRect.height)
  // if current x + widget width > dropzone width
  if (x + widgetRect.width > element.clientWidth) {
	x = element.clientWidth - widgetRect.width;
  }
  // if current y + widget height > dropzone height
  if (y + widgetRect.height > element.clientHeight) {
	  y = element.clientHeight - widgetRect.height;
  }

  // Limita le coordinate ai bordi della screen-drop-zone
  /*const maxX = element.clientWidth - ev.target.offsetWidth;
  const maxY = element.clientHeight - ev.target.offsetHeight;

  if (x < 0) x = 0;
  if (y < 0) y = 0;
  if (x > maxX) x = maxX;
  if (y > maxY) y = maxY;*/

  return { x, y };
};

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
/*const drop = (ev:any) =>{
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
		widgets[idx].visible = "visible"
	}
	// append dragged element to dropzone
	dropzone.appendChild(draggableElement);
}*/
const drop = (ev: any) => {
  const id = ev.dataTransfer.getData('text');
  const draggableElement: any = document.getElementById(id);
  draggableElement.style.position = 'absolute';

  const dropzone: any = document.getElementById("screen-drop-zone-id");

  // Calcola il rapporto tra l'area di configurazione e l'area reale della dashboard
  const dashboardWidth = dzWidth;
  const dropZoneWidth = dropzone.offsetWidth;
  const scale = dashboardWidth / dropZoneWidth;

  // Ottieni la posizione in cui è stato rilasciato
  const pos = findPos(ev, dropzone);
  const scaledX = pos.x * scale;
  const scaledY = pos.y * scale;

  draggableElement.style.top = scaledY + 'px';
  draggableElement.style.left = scaledX + 'px';

  const idx = widgets.findIndex((item: any) => item.id == draggableElement.id);
  if (idx > -1) {
    widgets[idx].top = draggableElement.style.top;
    widgets[idx].left = draggableElement.style.left;
    widgets[idx].visible = "visible";
  }

  dropzone.appendChild(draggableElement);
};

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
		widgets[idx].visible = "hidden"
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
				{#if Widget.visible == "hidden"}
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<div class="db-draggable-item" 
							draggable="true" 
							on:dragstart={dragStart} 
							on:dragend={dragEnd} 
							id="{Widget.id}" >
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
				on:drop={drop}>
				{#each widgets as Widget}
					{#if Widget.visible == "visible"}
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
/*.screen-drop-zone{
	display:flexbox;
	position:relative;
	margin: 20px;
	width: calc(100% - 400px);
	height: calc(100% - 100px);
	border: 1px solid #999999;
	background:whitesmoke url('/grid_20.png') repeat;
	padding: 0%;
}*/
.screen-drop-zone {
  display: flex;
  position: relative;
  width: calc(75vw); /* Usa il 80% della larghezza del viewport */
  height: calc(75vh); /* Usa il 80% dell'altezza del viewport */
  margin: auto; /* Centra verticalmente e orizzontalmente */
  border: 1px solid #999999;
  background: whitesmoke url('/grid_20.png') repeat;
  padding: 0%;
  overflow: hidden; /* Evita che i widget escano dall'area visibile */
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
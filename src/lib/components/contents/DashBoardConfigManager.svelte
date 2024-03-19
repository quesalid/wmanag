<script lang='ts'>


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
	// append dragged element to dropzone
	dropzone.appendChild(draggableElement);
}

const dragEnd = (ev:any)=>{
	console.log("ON DRAG END",ev.clientX,ev.clientY)
}

const onClick = (ev:any) =>{
	console.log("MOUSE CLICK",ev.clientX,ev.clientY)
}

const saveDashboard = (ev:any)=>{
	console.log("SAVE DASHBOARD")
}

</script>

<div class="wrapper">
	<div class="col-container">
		 <input type='button' value='Save Dashboard' on:click={saveDashboard}/>
		 <!-- svelte-ignore a11y-no-static-element-interactions -->
		 <div class="col" id="draggable-list" on:dragover={dragOverCol} on:drop={dropCol}>
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div class="db-draggable-item" draggable="true" on:dragstart={dragStart} on:dragend={dragEnd} id="Map" >
					<div id="title-Map">Map</div>
				</div>
				 
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div class="db-draggable-item" draggable="true" on:dragstart={dragStart} on:dragend={dragEnd}  id="Alarms" >
					<div id="title-Alarms">Alarms</div>
				</div>
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div class="db-draggable-item" draggable="true" on:dragstart={dragStart} on:dragend={dragEnd}  id="Donut" >
					<div id="title-Donut">Donut</div>
				</div>	
		 </div>
	</div>
		 <!-- svelte-ignore a11y-no-static-element-interactions -->
		 <!-- svelte-ignore a11y-click-events-have-key-events -->
		 <div class="screen-drop-zone" 
				id="screen-drop-zone-id"  
				on:dragover={dragOver} 
				on:drop={drop}
				 >

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
</style>
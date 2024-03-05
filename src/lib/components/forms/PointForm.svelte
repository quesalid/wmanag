<script lang="ts">
// EXTERNAL
import {onMount} from "svelte"
// INTERNAL 
import {getPointTemplate} from '../../script/utils.js'
import {PointDataForm,PointAiForm,PointLearnForm,PointCloneForm} from './'
// API
import {getDataPoints,getClonePoints} from '../../script/apidataconfig.js'
// STORE
import {mock, module} from '../../ustore.js'

onMount(async () => {
		// GET MYSELF
		const pointForm = document.getElementById(modalId)
		if(pointForm){
			pointForm.addEventListener("editclicked",async (e:any)=>{
				pointForm.style.display='block'
				uid = e.detail
				// GET POINTS
				const filters:any = [{uid:uid,_type:'eq'},{module:$module.toUpperCase(),_type:'eq'}]
				let ret
				switch($module.toUpperCase()){
					case 'CLONE':
						ret = await getClonePoints(filters,$mock)
						pointform = PointCloneForm
						break;
					case 'AI':
						ret = await getClonePoints(filters,$mock)
						pointform = PointAiForm
						break;
					case 'LEARN':
						ret = await getClonePoints(filters,$mock)
						pointform = PointLearnForm
						break;
					case 'DATA':
						pointform = PointDataForm
						ret = await getDataPoints(filters,$mock)
						break;
				}
				const found = ret.data.find((item:any)=> {return(item.uid == uid)})
				if(found){
					point = found
					const name = point?point.tag:''
					title = "point "+name
				}
				else{
					point = newpoint
					title = "AGENT "+$module
				}
			})
		}
	});



const exit = (ev:any)=>{
	const thisDiv = document.getElementById(modalId)
	if(thisDiv)
		thisDiv.style.display = 'none'
}
// EXPORTS
export let modalId = "PointInputDiv"
export let  bgcolor = "#ddefde"
export let save = (ev:any)=>{
	const target = ev.target
	const cdev = target.dataset.cdev
	console.log("SAVE POINT: ",uid)
}
export let mod = 'DATA'


let newpoint = getPointTemplate($module.toUpperCase())
let point = newpoint
let title = "POINT "+ mod
let uid = ''
let pointform:any = PointDataForm

</script>
<div class="modal" id={modalId} style="--background-color:{bgcolor}">
	<form class="device-form">
		<section>
			<h3>{title}</h3>
		</section>
		<svelte:component this={pointform} bind:point={point} title={title}/>
		<div class="button-div">
			<div><span class="req">*</span> - Required field</div>
			<div style="margin-left:auto;">
				<input class="formbutton" data-cdev={JSON.stringify(point)} type="button" value="SAVE" on:click={save}>
				<input class="formbutton" type="button" value="EXIT" on:click={exit}>
			</div>
		</div>
	</form>
</div>
<style>
.modal{
  display: none;
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
.device-form{
	color: #444;
	background-color: #fff;
	padding:0.4em;
	border-radius: 10px;
}
section{
	margin: 3px;
	font-weight: bold ;
}
fieldset {
	color: #999;
	border: 1px solid;
	border-radius: 2px;
	margin: 3px;
}
label{
	color: #444;
	margin: 2px;
	font-weight:600 ;
}
input{
	color: #444;
}
.formbutton{
	padding: 0px 3px 0px 3px;
	margin-right: 5px;
	color: #444;
	border: 1px solid;
	border-radius: 20%;
	background-color: #ccc ;
}
.formbutton:hover{
	cursor:pointer;
}
.button-div{
	display:flex;
	justify-content:space-between;
	margin-top: 2em;
}
select{
	color: #444;
}
legend{
	margin-left:5px;
}
.req {
  color: red;
}
</style>
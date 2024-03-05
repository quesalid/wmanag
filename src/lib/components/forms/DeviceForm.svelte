<script lang="ts">
// EXTERNAL
import {onMount} from "svelte"
import { v4 as uuidv4 } from 'uuid';
// INTRNAL
import {getDeviceTemplate} from '../../script/utils.js'
// API
import {getDevices,getPlants,getDepartments,getLines} from '../../script/apidataconfig.js'
// STORE
import {token, mock, currentplant} from '../../ustore.js'

onMount(async () => {
		// GET MYSELF
		const deviceForm = document.getElementById(modalId)
		if(deviceForm){
			deviceForm.addEventListener("editclicked",async (e:any)=>{
				deviceForm.style.display='block'
				uid = e.detail
				// GET DEVICES
				const filters:any = [{uid:uid,_type:'eq'}]
				const ret = await getDevices(filters,$mock)
				const found = ret.data.find((item:any)=> {return(item.uid == uid)})
				const filters1:any = []
				let ret1:any
				// GET PLANTS
				ret1 = await getPlants(filters1,$mock)
				plants = ret1.data
				// GET DEPARTMENTS
				ret1 = await getDepartments(filters1,$mock)
				departments = ret1.data
				// GET LINES
				ret1 = await getLines(filters1,$mock)
				lines = ret1.data
				console.log("RETURN ",found)
				if(found){
					device = found
					title = "DEVICE"
				}
				else{
					newdevice.uid = uuidv4()
					device = newdevice
					title = "NEW DEVICE"
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
export let modalId = "DeviceInputDiv"
export let  bgcolor = "#ddefde"
export let save = (ev:any)=>{
	const target = ev.target
	const cdev = target.dataset.cdev
	console.log("SAVE DEVICE: ",uid)
}

let newdevice:any = getDeviceTemplate()
let device:any = newdevice
let title = "DEVICE"
let uid = ''
let plants:any = []
let departments:any = []
let lines:any = []

const filterDepts = async (ev:any) =>{
	const target = ev.target
	console.log(target.value)
	const filters = [{plant:target.value,_type:'eq'}]
	const ret = await getDepartments(filters,$mock)
	departments = ret.data
	const itemList = departments.map(({uid}:any) => uid);
	// RELOAD LINES
	const ret1 =  await getLines([],$mock)
	lines = ret1.data
	lines = lines.filter((item:any) => itemList.includes(item.department))
}

const filterLines = async (ev:any) =>{
	const target = ev.target
	console.log(target.value)
	const filters = [{department:target.value,_type:'eq'}]
	const ret = await getLines(filters,$mock)
	lines = ret.data
}

</script>
<div class="modal" id={modalId} style="--background-color:{bgcolor}">
	<form class="device-form">
		<section>
			<h3>{title}</h3>
		</section>
		<fieldset>
			<legend>IDENTIFICATION</legend>
			<label for="device-name">Name<span class="req">*</span>:</label>
			<input type="text" id="device-name" name="name" bind:value={device.name}>
			<label for="device-plant">Plant<span class="req">*</span>:</label>
			<select name="plant" id="device-plant" bind:value={device.plant} on:change={filterDepts}>
				{#each plants as plant}
					<option value="{plant.uid}">{plant.name}</option>
				{/each}
			</select>
			<label for="device-department">Department:</label>
			<select name="department" id="device-department" bind:value={device.localization.department} on:change={filterLines}>
				{#each departments as dept}
					<option value="{dept.uid}">{dept.name}</option>
				{/each}
			</select>
			<label for="device-line">Line:</label>
			<select name="line" id="device-line" bind:value={device.localization.line}>
				{#each lines as line}
					<option value="{line.uid}">{line.name}</option>
				{/each}
			</select>
			<label for="device-description">Description:</label>
			<input type="text" id="device-description" name="description" bind:value={device.description}>
		</fieldset>
		<fieldset>
			<legend>NETWORK and ENVIRONMENT</legend>
			<label for="device-host">Host/IP<span class="req">*</span>:</label>
			<input type="text" id="device-host" name="host" bind:value={device.host}>
			<label for="device-port">Port:</label>
			<input type="text" id="device-port" name="port" bind:value={device.port}>
			<label for="device-type">Type:</label>
			<select name="type" id="device-type" bind:value={device.type}>
				<option value="HW">HW</option>
				<option value="VM">VM</option>
			</select>
			<label for="device-os">OS:</label>
			<select name="os" id="device-os" bind:value={device.os}>
				<option value="WIN-10">WIN-10</option>
				<option value="WIN-11">WIN-11</option>
				<option value="UBUNTU">UBUNTU</option>
				<option value="RASPI">RASPI</option>
			</select>
			<label for="device-osver">OS ver:</label>
			<input type="text" id="device-osver" name="osver" bind:value={device.osver}>
		</fieldset>
		<fieldset>
			<legend>SECURITY</legend>
			<label for="device-userid">Userid:</label>
			<input type="text" id="device-userid" name="userid" bind:value={device.userid}>
			<label for="device-password">Password:</label>
			<input type="password" id="device-password" name="password" bind:value={device.password}>
		</fieldset>
		<fieldset>
			<legend>DETAILS</legend>
			<label for="device-mac">MAC:</label>
			<input type="text" id="device-mac" name="mac" bind:value={device.hwdetails.mac}>
			<label for="device-brand">Brand:</label>
			<input type="text" id="device-brand" name="brand" bind:value={device.hwdetails.brand}>
			<label for="device-model">Model:</label>
			<input type="text" id="device-model" name="model" bind:value={device.hwdetails.model}>
			<label for="device-model">Serial N:</label>
			<input type="text" id="device-model" name="model" bind:value={device.hwdetails.serial}>
		</fieldset>
		<div class="button-div">
			<div><span class="req">*</span> - Required field</div>
			<div style="margin-left:auto;">
				<input class="formbutton" data-cdev={JSON.stringify(device)} type="button" value="SAVE" on:click={save}>
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
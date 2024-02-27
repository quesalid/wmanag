<script lang="ts">
// EXTERNAL
import {onMount} from "svelte"
import { v4 as uuidv4 } from 'uuid';
// INTRNAL
import {getUserTemplate,downloadDataUrl} from '../../script/utils.js'
// API
import {getUsers} from '../../script/apisecurity.js'
// STORE
import {token, mock, currentplant} from '../../ustore.js'

let avatar = ''
onMount(async () => {
		// GET MYSELF
		const avatarForm = document.getElementById(modalId)
		if(avatarForm){
			avatarForm.addEventListener("editclicked",async (e:any)=>{
				avatarForm.style.display='block'
				uid = e.detail
				// GET USER
				const filters:any = [{uid:uid,_type:'eq'}]
				const ret = await getUsers(filters,$mock)
				const found = ret.data.find((item:any)=> {return(item.uid == uid)})
				console.log(" F O U N D ---->",found.profile)
				if(found)
					usr=found
				avatar = found.profile.avatar
			})
		}
	});

const exit = (ev:any)=>{
	console.log("EXIT")
	const thisDiv = document.getElementById(modalId)
	if(thisDiv)
		thisDiv.style.display = 'none'
}
// EXPORTS
export let modalId = "UserAvatarDiv"
export let  bgcolor = "#ddefde"
export let save = (ev:any)=>{
	const target = ev.target
	const cdev = target.dataset.cdev
	console.log("SAVE AVATAR: ",uid)
}

let newusr:any = getUserTemplate()
let usr:any = newusr
let title = "CHANGE AVATAR"
let uid = ''

const downloadData = async (e:any|undefined)=>{
		let file = e.target.files[0]
		const result = await downloadDataUrl(file)
		console.log("RESULT",file.name)
		avatar = usr.profile.avatar = '/'+file.name
	}


</script>
<div class="modal" id={modalId} style="--background-color:{bgcolor}">
	<form class="device-form">
		<section>
			<h3>{title}</h3>
		</section>
		<fieldset style="padding-bottom:10px;">
			<legend>AVATAR</legend>
			<label for="user-avatar">Avatar:</label>
			<input type="text" disabled id="user-avatar" name="avatar" bind:value={usr.profile.avatar}>
			<input class="avatar-image" type="image" disabled id="user-avatar" name="avatar" src="{avatar}" alt="avatar">
			<input class="avatar-file" id="avatar-file-picker" type="file" accept=".png,.svg,.jpg" on:change={downloadData}>
		</fieldset>
		<div class="button-div">
			<div style="margin-left:auto;">
				<input class="formbutton" data-cdev={JSON.stringify(usr)} type="button" value="SAVE" on:click={save}>
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
  padding: 5%; /* Location of the box */
  top:0%;
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
	width:50%;
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
.avatar-image{
	width: 30px;
	border: 1px solid;
	border-radius: 50%;
}
.avatar-file{
	margin-left: 30px;
}
</style>
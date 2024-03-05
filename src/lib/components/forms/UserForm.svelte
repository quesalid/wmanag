<script lang="ts">
// EXTERNAL
import {onMount} from "svelte"
import { v4 as uuidv4 } from 'uuid';
// INTRNAL
import {getUserTemplate} from '../../script/utils.js'
// API
import {getUsers} from '../../script/apisecurity.js'
// STORE
import {token, mock, currentplant} from '../../ustore.js'

onMount(async () => {
		// GET MYSELF
		const userForm = document.getElementById(modalId)
		if(userForm){
			userForm.addEventListener("editclicked",async (e:any)=>{
				userForm.style.display='block'
				uid = e.detail
				// GET DEVICES
				const filters:any = [{uid:uid,_type:'eq'}]
				const ret = await getUsers(filters,$mock)
				const found = ret.data.find((item:any)=> {return(item.uid == uid)})
				const filters1:any = []
				let ret1:any
				if(found){
					usr = found
					title = "USER"
				}
				else{
					usr.uid = uuidv4()
					usr = newusr
					usr.profile.uid = usr.uid
					title = "NEW USER"
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
export let modalId = "UserInputDiv"
export let  bgcolor = "#ddefde"
export let save = (ev:any)=>{
	const target = ev.target
	const cdev = target.dataset.cdev
	console.log("SAVE USER: ",uid)
}

let newusr:any = getUserTemplate()
let usr:any = newusr
let title = "USER"
let uid = ''



</script>
<div class="modal" id={modalId} style="--background-color:{bgcolor}">
	<form class="device-form">
		<section>
			<h3>{title}</h3>
		</section>
		<fieldset>
			<legend>IDENTIFICATION</legend>
			<label for="user-name">Name<span class="req">*</span>:</label>
			<input type="text" id="user-name" name="name" bind:value={usr.name}>
			<label for="user-surname">Surname<span class="req">*</span>:</label>
			<input type="text" id="user-surname" name="surname" bind:value={usr.surname}>
			<label for="user-username">Userid<span class="req">*</span>:</label>
			<input type="text" id="user-username" name="username" bind:value={usr.username}>
			<label for="user-password">Password<span class="req">*</span>:</label>
			<input type="password" id="user-password" name="password" bind:value={usr.password}>
		</fieldset>
		<fieldset>
			<legend>ROLE/STATUS</legend>
			<label for="user-role">Role:</label>
			<select name="role" id="user-role" bind:value={usr.role}>
				<option value="SADMIN">SADMIN</option>
				<option value="ADMIN">ADMIN</option>
				<option value="USER">USER</option>
			</select>
			<label for="user-status">Status:</label>
			<select name="status" id="user-status" bind:value={usr.status}>
				<option value="active">active</option>
				<option value="pending">pending</option>
				<option value="inactive">inactive</option>
			</select>
		</fieldset>
		<fieldset>
			<legend>PROFILE</legend>
			<label for="user-avatar">Avatar:</label>
			<input type="text" disabled id="user-avatar" name="avatar" bind:value={usr.profile.avatar}>
			<label for="user-role">Language:</label>
			<select name="language" id="user-language" bind:value={usr.profile.language}>
				<option value="en">en</option>
				<option value="fr">fr</option>
				<option value="it">it</option>
				<option value="de">de</option>
				<option value="pt">pt</option>
			</select>
		</fieldset>
		<div class="button-div">
			<div><span class="req">*</span> - Required field</div>
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
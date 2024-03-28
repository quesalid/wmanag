<script lang="ts">
// EXTERNAL
import {onMount} from 'svelte'
import { writable } from "svelte/store";
// INTERNAL
import Wmanag from '../WManag.svelte'
import {SimpleTable} from '../table'
import {getUserColumns} from '../../script/utils.js'
import {UserForm,DeleteForm,AvatarForm} from '../forms'
// STORE
import {token, mock, currentmainentity,avatar,user} from '../../ustore.js'
// API INTERFACE
import {getUsers,setUser,deleteUser,setAvatar} from '../../script/apisecurity.js'


export let  bgcolor = "#ddefde"


let userdata:any = writable([])
onMount(async () => { 
	const filters:any = []
    const ret = await getUsers(filters,$mock)
	$userdata = ret.data
})


const disableClose = true
const draggable = true
const top = '60px'
const left= '100px'
let zindex = 4
let headercolor = bgcolor
let pagesize = true
let pSize = 8
let userdatacolumns = getUserColumns()

let onClickAddUser = (ev:any)=>{
		const modalEdit = document.getElementById(modalIdSave)
		const addClicked = new CustomEvent("editclicked", { detail: 'NONE' })
		modalEdit?.dispatchEvent(addClicked)
	}
const titleuser = 'USERS'
let toolbardevice = [{type:'image',props:{src:'/ADD.svg'},function:onClickAddUser,label:"Add"}]
// DIALOG VARIABLES
let savedialog = UserForm
let deletedialog = DeleteForm
let saveavdialog = AvatarForm
let modalIdSave = "UserInputDiv"
let modalIdDel = "DeleteInputDiv"
let modalAvSave = "UserAvatarDiv"
let deleteTitle = "Clicking DELETE the user will be cancelled"
let save = async (ev:any)=>{
	const target = ev.target
	const cdev = JSON.parse(target.dataset.cdev)
	// SET USER
	let ret = await setUser(cdev,$mock)
	// GET UPDATED DEVICE LIST
	const filters:any = []
	ret = await getUsers(filters,$mock)
	$userdata = ret.data
	// CLOSE FORM DIALOG
	const usrInputDiv = document.getElementById(modalIdSave)
	if(usrInputDiv)
		usrInputDiv.style.display= 'none'
}
let del = async (ev:any) =>{
	const target = ev.target
	const uid = target.dataset.uid
	// DELETE DEVICE
	let filters:any = [{uid:uid,_type:'eq'}]
	let ret = await deleteUser(filters,$mock)
	// GET UPDATED DEVICE LIST
	filters = []
	ret = await getUsers(filters,$mock)
	$userdata = ret.data
	// CLOSE FORM DIALOG
	const usrInputDiv = document.getElementById(modalIdDel)
	if(usrInputDiv)
		usrInputDiv.style.display= 'none'
}
let saveav = async (ev:any)=>{
	const target = ev.target
	const cdev = JSON.parse(target.dataset.cdev)
	// SET AVATAR
	let ret1 = await setAvatar(cdev.uid,cdev.profile.avatar,$mock)
	// CHECK IF CHANGED AVATATAR BELONGS TO CURRENT USER
	if(cdev.uid == $user.uid)
		$avatar = cdev.profile.avatar
	// GET UPDATED DEVICE LIST
	let filters:any = []
	let ret = await getUsers(filters,$mock)
	$userdata = ret.data
	// CLOSE FORM DIALOG
	const usrAvatarDiv = document.getElementById(modalAvSave)
	if(usrAvatarDiv)
		usrAvatarDiv.style.display= 'none'
}
</script>

<div class="user-manager">
	<Wmanag id="containerWManager"  
		title="{titleuser}" 
		toolbar={toolbardevice}
		{disableClose} 
		{draggable} 
		{headercolor} 
		{zindex}
		{top}
		{left}>
	<SimpleTable slot="bodycontent" data={userdata} datacolumns={userdatacolumns} {pagesize} {pSize}/>
	</Wmanag>
</div>
<div id="save-user-dialog">
	<svelte:component this={savedialog} bind:modalId={modalIdSave} save={save} {bgcolor}/>
</div>
<div id="save-avatar-dialog">
	<svelte:component this={saveavdialog} bind:modalId={modalAvSave} save={saveav} {bgcolor}/>
</div>
<div id="delete-user-dialog">
	<svelte:component this={deletedialog} bind:modalId={modalIdDel} del={del} {bgcolor} title={deleteTitle} padding='10%'/>
</div>


<style>
#save-user-dialog{
	display:absolute;
	top: 0px;
}
</style>
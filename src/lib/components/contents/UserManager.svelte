<script lang="ts">
// EXTERNAL
import {onMount} from 'svelte'
import { writable } from "svelte/store";
// INTERNAL
import Wmanag from '../WManag.svelte'
import {SimpleTable} from '../table'
import {getUserColumns} from '../../script/utils.js'
// STORE
import {token, mock, currentplant} from '../../ustore.js'
// API INTERFACE
import {getUsers,setUser,deleteUser} from '../../script/apisecurity.js'


export let  bgcolor = "#ddefde"


let userdata:any = writable([])
onMount(async () => { 
	const filters:any = []
    const ret = await getUsers(filters,$mock)
	$userdata = ret.data
	console.log("USERS",$userdata)
})

let modalIdSave = "UserInputDiv"
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


<style>
</style>
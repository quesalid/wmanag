<script lang="ts">
// GOACCESS LOG MANAGER https://goaccess.io/man#custom-log
// WEB SOCKET https://gwsocket.io/man
// SSE https://ably.com/blog/websockets-vs-sse
// EXTERNAL
import {onMount} from 'svelte'
import { writable } from "svelte/store";
// INTERNAL
import Wmanag from '../WManag.svelte'
import {SimpleTable} from '../table'
import {getLogColumns,logToObject} from '../../script/utils.js'
import {UserForm,DeleteForm,AvatarForm} from '../forms'
// STORE
import {token, mock, currentplant} from '../../ustore.js'
// API INTERFACE
import {getLogs} from '../../script/apisecurity.js'


export let  bgcolor = "#ddefde"


let logs:any = writable([])
onMount(async () => { 
	const filters:any = []
    const ret = await getLogs(filters,$mock)
	// PARSE LOGS TO OBJECTS
	const lobjs:any = []
	for(let i=0;i<ret.data.length;i++){
		const lobj = logToObject(ret.data[i])
		lobjs.push(lobj)
	}
	$logs = lobjs
})


const disableClose = true
const draggable = true
const top = '60px'
const left= '100px'
let zindex = 4
let headercolor = bgcolor
let pagesize = true
let pSize = 8
let logcolumns = getLogColumns()

let onClickAddUser = (ev:any)=>{
		const modalEdit = document.getElementById(modalIdSave)
		const addClicked = new CustomEvent("editclicked", { detail: 'NONE' })
		modalEdit?.dispatchEvent(addClicked)
	}
const titlelog = 'LOGS'
let toolbardevice:any = []
// DIALOG VARIABLES
let showdialog = UserForm

let modalIdSave = "UserInputDiv"
let modalIdDel = "DeleteInputDiv"
let modalAvSave = "UserAvatarDiv"
let deleteTitle = "Clicking DELETE the user will be cancelled"


</script>

<div class="user-manager">
	<Wmanag id="logWManager"  
		title="{titlelog}" 
		toolbar={toolbardevice}
		{disableClose} 
		{draggable} 
		{headercolor} 
		{zindex}
		{top}
		{left}>
	<SimpleTable slot="bodycontent" data={logs} datacolumns={logcolumns} {pagesize} {pSize}/>
	</Wmanag>
</div>
<!--div id="save-user-dialog">
	<svelte:component this={showdialog} bind:modalId={modalIdSave} {bgcolor}/>
</!--div-->



<style>
#save-user-dialog{
	display:absolute;
	top: 0px;
}
</style>
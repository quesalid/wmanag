<script lang="ts">
// EXTERNAL
import {onMount} from 'svelte'
import { writable } from "svelte/store";
// INTERNAL
import Wmanag from '../WManag.svelte'
import Tab from '../tabs/Tab.svelte'
import TreeView from '../treeview/TreeView.svelte'
import {DbInformationForm} from '../forms'
// STORE
import {token, mock, currentplant} from '../../ustore.js'
// API INTERFACE

export let  bgcolor = "#ddefde"



onMount(async () => { 
	
})


const disableClose = true
const disableMinimize = true
const draggable = false
let zindex = 4
let headercolor = bgcolor

const showSchema = () =>{
	const schematitle = document.getElementById("title-WManagerSchema")
	if(schematitle)
		schematitle.innerHTML='SCHEMAS'
}

const showAdmin = () =>{
	const schematitle = document.getElementById("title-WManagerSchema")
	if(schematitle)
		schematitle.innerHTML='ADMINISTRATION'
}
// SCHEMA
let items:any = [
		{name:'Schemas',component:TreeView,status:'active',order:'first',id:"tab-item-schema-database",clickFunction:showSchema},
		{name:'Administration',status:'active',order:'last',id:"tab-item-admin-database",clickFunction:showAdmin},
	]

export let tabclass = "tab-item-class-db"
export let divclass = "div-item-class-db"

// INFORMATIONS

// QUERY

// OUTPUT
</script>

<div class="user-manager">
	<Wmanag id="WManagerSchema"  
		title="SCHEMAS"
		top='58px'
		left='3px'
		height='400px'
		width='400px'
		{disableClose}
		{disableMinimize}
		{draggable} 
		{headercolor} 
		{zindex}
	>
		<Tab {items} slot="bodycontent" {tabclass} {divclass}/>
	</Wmanag>
	<Wmanag id="WManagerInformation"  
		title="INFORMATIONS"
		top='458px'
		left='3px'
		height='200px'
		width='400px'
		{disableClose}
		{disableMinimize}
		{draggable} 
		{headercolor} 
		{zindex}
	>
		<DbInformationForm  slot="bodycontent" />
	</Wmanag>
	<Wmanag id="WManagerSQL"  
		title="QUERY"
		top='58px'
		left='402px'
		height='250px'
		width='600px'
		{disableClose}
		{disableMinimize}
		{draggable} 
		{headercolor} 
		{zindex}
	>
	</Wmanag>
	<Wmanag id="WManagerOutput"  
		title="OUTPUT"
		top='308px'
		left='402px'
		height='350px'
		width='600px'
		{disableClose}
		{disableMinimize}
		{draggable} 
		{headercolor} 
		{zindex}
	>
	</Wmanag>
</div>


<style>
</style>
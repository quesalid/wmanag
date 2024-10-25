<script lang="ts">
// EXTERNAL
import {onMount} from 'svelte'
import { writable } from "svelte/store";
import { Parser }  from'node-sql-parser'
// INTERNAL
import Wmanag from '../WManag.svelte'
import Tab from '../tabs/Tab.svelte'
import TreeViewDb from '../treeview/TreeViewDb.svelte'
import {DbInformationForm,DbQueryForm,DbOutputForm} from '../forms'
// STORE
import {token, mock, currentmainentity} from '../../ustore.js'
// API INTERFACE


onMount(async () => { 
	
})

let defaultWManagerSchema = "WManagerSchema"
let defaultWManagerInformation = "WManagerInformation"
let defaultWManagerSQL = "WManagerSQL"
let defaultWManagerOutput = "WManagerOutput"

// EXTERNAL VARIABLES
// WINDOW VARIABLES
export let  bgcolor = "#ddefde"
export let titlefontsize = "13px"
export let titlecolor = "#666"
export let titleweight = "bold"
export let bodycolor = "#ffffff"
export let disableClose = true
export let  disableMinimize = true
export let  draggable = false
export let zindex = 4
export let headercolor = bgcolor

// QUERY ALTS
const executeQuery = ()=>{
	try{
		const ast = parser.astify(param)
		console.log("EXECUTE QUERY",ast)
		result = "Query executed"
	}catch(error){
		console.log("SQL SYNTAX ERROR",error)
		result= "Syntax error"
	}
}
const clearQuery = ()=>{
	param=''
	result=''
	console.log("CLEAR QUERY")
}
let queryform = DbQueryForm
let querytitle = "SQL QUERY"
const sqltoolbar = [
	{type:'image',props:{src:'/START.svg'},function:executeQuery,label:"Execute"},
	{type:'image',props:{src:'/CLEAR.svg'},function:clearQuery,label:"Clear"},
]
let toolbarquery = sqltoolbar

const showSchema = () =>{
	const schematitle = document.getElementById("title-WManagerSchema")
	if(schematitle){
		schematitle.innerHTML='SCHEMAS'
		queryform = DbQueryForm
		toolbarquery = sqltoolbar
		querytitle = "SQL QUERY"
	}
}

const showAdmin = () =>{
	const schematitle = document.getElementById("title-WManagerSchema")
	if(schematitle){
		schematitle.innerHTML='ADMINISTRATION'
		querytitle = "ADMIN"
	}
}
// SCHEMA
let items:any = [
		{name:'Schemas',component:TreeViewDb,status:'active',order:'first',id:"tab-item-schema-database",clickFunction:showSchema},
		{name:'Administration',status:'active',order:'last',id:"tab-item-admin-database",clickFunction:showAdmin},
	]

export let tabclass = "tab-item-class-db"
export let divclass = "div-item-class-db"

// INFORMATIONS

// QUERY
let query = ''
let param = ''
const parser = new Parser()


// OUTPUT
let result = ''
</script>

<div class="user-manager">
	<Wmanag id="{defaultWManagerSchema}"  
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
		{titlefontsize}
		{titlecolor}
		{titleweight}
		{bodycolor}>
		<Tab {items} slot="bodycontent" {tabclass} {divclass}/>
	</Wmanag>
	<Wmanag id="{defaultWManagerInformation}"  
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
		{titlefontsize}
		{titlecolor}
		{titleweight}
		{bodycolor}>
		<DbInformationForm  slot="bodycontent" />
	</Wmanag>
	<Wmanag id="{defaultWManagerSQL}"  
		title="{querytitle}"
		top='58px'
		left='402px'
		height='350px'
		width='800px'
		toolbar= {toolbarquery}
		{disableClose}
		{disableMinimize}
		{draggable} 
		{headercolor} 
		{zindex}
		{titlefontsize}
		{titlecolor}
		{titleweight}
		{bodycolor}>
	<svelte:component slot="bodycontent" this={queryform} bind:param={param}/>
	</Wmanag>
	<Wmanag id="{defaultWManagerOutput}"  
		title="OUTPUT"
		top='408px'
		left='402px'
		height='250px'
		width='800px'
		{disableClose}
		{disableMinimize}
		{draggable} 
		{headercolor} 
		{zindex}
		{titlefontsize}
		{titlecolor}
		{titleweight}
		{bodycolor}>
	<DbOutputForm  slot="bodycontent" bind:query={param} bind:result={result}/>
	</Wmanag>
</div>


<style>
</style>
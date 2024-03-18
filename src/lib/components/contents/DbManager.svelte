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
	>
	<svelte:component slot="bodycontent" this={queryform} bind:param={param}/>
	</Wmanag>
	<Wmanag id="WManagerOutput"  
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
	>
	<DbOutputForm  slot="bodycontent" bind:query={param} bind:result={result}/>
	</Wmanag>
</div>


<style>
</style>
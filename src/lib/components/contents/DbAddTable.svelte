<script lang="ts">
 import classNames from 'classnames'
 import SimpleTable from '../table/SimpleTable.svelte'
 import { writable } from "svelte/store";
 import {mock} from '../../ustore.js'
 import {dbConnect, 
	dbGetTables, 
	dbCreateTable,
	dbModifyTable, 
	dbDeleteTable,
	dbGetTable,
	dbDisconnect} from '../../script/apidb.js'

 export let divClass = 'w-full'
 export let datarows:any = []
 export let tables:any = []
 export let tablename:any = ''
 export let op = 'add'
 export let dbconnection = null

 const newrow = {name:'',type:'TEXT',notnull:'false',primarykey:'false',autoincrement:'false',unique:'false',default:''}

 const voidfunction = ()=>{return ""}
 const onClickCheck = (ev:any)=>{console.log("ONCLICK CHECK",ev.target)}
 const onChangeSelect = (ev:any)=>{console.log("ON CHANGE SELECT",ev.target)}
 const onChangeText = (ev:any)=>{console.log("ON CHANGE TEXT",ev.target)}
 const addClick = (ev:any)=>{
	 console.log("ADD CLICK",ev.target)
	 datarows.update((rows:any)=>{
		 rows.push(newrow)
		 return rows
	 })
 }
 const removeClick = (ev:any)=>{
	 console.log("REMOVE CLICK",ev.target)
	 datarows.update((rows:any)=>{
		 rows.pop()
		 return rows
	 })
 }
 const upClick = (ev:any)=>{console.log("UP CLICK",ev.target)}
 const downClick = (ev:any)=>{console.log("DOWN CLICK",ev.target)}
 const topClick = (ev:any)=>{console.log("TOP CLICK",ev.target)}
 const bottomClick = (ev:any)=>{console.log("BOTTOM CLICK",ev.target)}
 const saveClick = (ev:any)=>{console.log("SAVE CLICK",ev.target)}
 const createClick = async (ev:any)=>{
	 console.log("SAVE CLICK",ev.target)
	 await dbCreateTable(dbconnection,tablename,datarows,mock)
	 const ret = await dbGetTables(dbconnection,mock)
	 tables.set(ret.data)
 }
 const deleteClick = async (ev:any)=>{
	 console.log("DELETE CLICK",ev.target)
	 await dbDeleteTable(dbconnection,tablename,mock)
	 const ret = await dbGetTables(dbconnection,mock)
	 tables.set(ret.data)
 }


 export let datacolumns:any = [
	  {
		header: 'Nome',
		accessor: voidfunction,
		renderdef:{type:'text',params:{onClick:onChangeText},idtag:'name',uid:'name'}
	  },
	  {
		header: 'Tipo',
		accessor: voidfunction,
		renderdef:{type:'select',params:{options:['TEXT','INTEGER','BLOB','REAL','BOOLEAN'],onClick:onChangeSelect},idtag:'type',uid:'name'}
	  },
	  {
		header: 'NN',
		accessor: voidfunction,
		renderdef:{type:'checkbox',params:{onClick:onClickCheck},idtag:'notnull',uid:'name'}
	  },
	  {
		header: 'CP',
		accessor: voidfunction,
		 renderdef:{type:'checkbox',params:{onClick:onClickCheck},idtag:'primarykey',uid:'name'}
	  },
	  {
		header: 'AI',
		accessor: voidfunction,
		 renderdef:{type:'checkbox',params:{onClick:onClickCheck},idtag:'autoincrement',uid:'name'}
	  },
	  {
		header: 'U',
		accessor: voidfunction,
		renderdef:{type:'checkbox',params:{onClick:onClickCheck},idtag:'unique',uid:'name'}
	  },
	  {
		header: 'Default',
		accessor: 'default',
	  }
  ];

  const setTablename = (ev:any)=>{
	  tablename = ev.target.value
	  console.log("SET TABLENAME",tablename)
	  
  }

  let localdatarows = []
</script>

<!--div class={classNames(divClass, $$props.class)}-->
<div class="w-full">
	{#if op =='add'}
		<label for="table-name-input" class="text-sm font-medium text-gray-700">Table Name</label>
		<input type="text" id="table-name-input"  class=""  on:change={setTablename}/>
	{:else}
	<label for="table-name-input" class="text-sm font-medium text-gray-700">Select table</label>
		<select id="table-name-input"  class=""  bind:value={tablename}>
			{#each $tables as table}
				<option value={table}>{table}</option>
			{/each}
		</select>
	{/if}
	<div class="flex">
		<!-- ADD TOOLMENU -->
		{#if op !='delete'}
		<input class="m-1" type="button" on:click={addClick} id="add-field-input" disabled={(!tablename || tablename =='') && op =='add'?true:false} value="ADD FIELD"/>
		<input class="m-1" type="button" on:click={removeClick} id="remove-field-input" disabled={(!tablename || tablename =='') && op =='add'?true:false} value="REMOVE FIELD"/>
		<input class="m-1" type="button" on:click={upClick} id="up-field-input" disabled={(!tablename || tablename =='') && op =='add'?true:false} value="MOVE UP"/>
		<input class="m-1" type="button" on:click={downClick} id="down-field-input" disabled={(!tablename || tablename =='') && op=='add'?true:false}  value="MOVE DOWN"/>
		<input class="m-1" type="button" on:click={topClick} id="top-field-input" disabled={(!tablename || tablename =='') && op =='add'?true:false}  value="MOVE TOP"/>
		<input class="m-1" type="button" on:click={bottomClick} id="bottom-field-input" disabled={(!tablename || tablename =='') && op =='add'?true:false} value="MOVE BOTTOM"/>
	    {/if}
	</div>
	<div style="visibility:{op !='delete'?'visible':'hidden'};">
		
			<SimpleTable  bind:data={datarows} datacolumns={datacolumns} showpag={false} pSize={30}/>
		
	</div>
	<div>
		{#if op =='modify'}
			<input class="m-1" type="button" on:click={saveClick} id="button-save-table" value="SAVE TABLE"/>
		{:else if op=='add'}
			<input class="m-1" type="button" on:click={createClick} id="button-save-table" disabled={(!tablename || tablename =='') && op =='add'?true:false} value="CREATE TABLE"/>
		{:else}
			<input class="m-1" type="button" on:click={deleteClick} id="button-delete-table"  value="DELETE TABLE"/>
		{/if}
	</div>
</div>

<style>
  .w-full{
	width:100%;
  }
  .flex{
	  display:flex;
  }
.m-1{
	  margin: 0.25rem;
  }
 
</style>
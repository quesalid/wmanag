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
 export let datarows:any = writable([])
 export let tables:any = writable([])
 export let tablename:any = writable('')
 export let op = 'add'
 export let dbconnection = writable(null)

 const newrow = {name:'',type:'TEXT',notnull:'false',primarykey:'false',autoincrement:'false',unique:'false',default:''}

 const voidfunction = ()=>{return ""}
 const onClickCheck = (ev:any)=>{console.log("ONCLICK CHECK",ev.target)}
 const onChangeSelect = (ev:any)=>{console.log("ON CHANGE SELECT",ev.target)}
 export let addClick = (ev:any)=>{
	 console.log("ADD CLICK",ev.target,$datarows)
	 /*datarows.update((data:any)=>{
		 data.push(newrow)
		 return data
	 })*/
	 $datarows.push(newrow)
	 $datarows = $datarows
 }
 const removeClick = (ev:any)=>{
	 console.log("REMOVE CLICK",ev.target)
	 /*datarows.update((data:any)=>{
		 data.pop()
		 return data
	 })*/
	$datarows.pop()
	$datarows = $datarows
 }
 const upClick = (ev:any)=>{console.log("UP CLICK",ev.target)}
 export let downClick = (ev:any)=>{console.log("DOWN CLICK",ev.target)}
 export let  topClick = (ev:any)=>{console.log("TOP CLICK",ev.target)}
 export let  bottomClick = (ev:any)=>{console.log("BOTTOM CLICK",ev.target)}
 export let  saveClick = (ev:any)=>{console.log("SAVE CLICK",ev.target)}
 export let  createClick = async (ev:any)=>{console.log("SAVE CLICK",ev.target)}
 export let  deleteClick = async (ev:any)=>{console.log("DELETE CLICK",ev.target)}

 // FIELD UPDATERS

 const onChangeText = (rowDataId, columnId, newValue) => {
	console.log("ON CHANGE TEXT",rowDataId, columnId, newValue)
	const idx = parseInt(rowDataId);
    const currentItem = $datarows[idx];
    const key = columnId; // Cast as `keyof YourDataItem`
    const newItem = {...currentItem, [key]: newValue};
    //console.log(newItem);
    $datarows[idx] = newItem;
    $datarows = $datarows;
  }

  const onChangeCheck = (rowDataId, columnId, newValue) => {
	console.log("ON CHANGE CHECK",rowDataId, columnId, newValue)
	const idx = parseInt(rowDataId);
    const currentItem = $datarows[idx];
    const key = columnId; // Cast as `keyof YourDataItem`
    const newItem = {...currentItem, [key]: newValue};
    //console.log(newItem);
    $datarows[idx] = newItem;
    $datarows = $datarows;
  }

 export let datacolumns:any = [
	  {
		header: 'Nome',
		accessor: 'name',
		renderdef:{type:'editext',params:{onClick:onChangeText},idtag:'name',uid:'name'}
	  },
	  {
		header: 'Tipo',
		accessor: voidfunction,
		renderdef:{type:'select',params:{options:['TEXT','INTEGER','BLOB','REAL','BOOLEAN'],onClick:onChangeSelect},idtag:'type',uid:'name'}
	  },
	  {
		header: 'NN',
		accessor: 'notnull',
		renderdef:{type:'editcheckbox',params:{onClick:onChangeCheck},idtag:'notnull',uid:'notnull'}
	  },
	  {
		header: 'CP',
		accessor: 'primarykey',
		 renderdef:{type:'editcheckbox',params:{onClick:onChangeCheck},idtag:'primarykey',uid:'primarykey'}
	  },
	  {
		header: 'AI',
		accessor: 'autoincrement',
		 renderdef:{type:'editcheckbox',params:{onClick:onChangeCheck},idtag:'autoincrement',uid:'autoincrement'}
	  },
	  {
		header: 'U',
		accessor: 'unique',
		renderdef:{type:'editcheckbox',params:{onClick:onChangeCheck},idtag:'unique',uid:'unique'}
	  },
	  {
		header: 'Default',
		accessor: 'default',
	  }
  ];

  export let  setTablename = (ev:any)=>{console.log("SET TABLENAME",$tablename)}

  export let  setTablenameAdd = (ev:any)=>{
	  $tablename = ev.target.value
	  console.log("SET TABLENAME ADD",$tablename)
	  
  }

  let localdatarows = []
</script>

<!--div class={classNames(divClass, $$props.class)}-->
<div class="w-full">
	{#if op =='add'}
		<label for="table-name-input" class="text-sm font-medium text-gray-700">Table Name</label>
		<input type="text" id="table-name-input"  class=""  on:change={setTablenameAdd}/>
	{:else}
	<label for="table-name-input" class="text-sm font-medium text-gray-700">Select table</label>
		<select id="table-name-input"  class=""  on:change={setTablename}>
			{#each $tables as table}
				{#if table == $tablename}
					<option value={table} selected>{table}</option>
				{:else}
					<option value={table}>{table}</option>
				{/if}
			{/each}
		</select>
	{/if}
	<div class="flex">
		<!-- ADD TOOLMENU -->
		{#if op !='delete'}
		<input class="m-1" type="button" on:click={addClick} id="add-field-input" disabled={(!$tablename || $tablename =='') && op =='add'?true:false} value="ADD FIELD"/>
		<input class="m-1" type="button" on:click={removeClick} id="remove-field-input" disabled={(!$tablename || $tablename =='') && op =='add'?true:false} value="REMOVE FIELD"/>
		<input class="m-1" type="button" on:click={upClick} id="up-field-input" disabled={(!$tablename || $tablename =='') && op =='add'?true:false} value="MOVE UP"/>
		<input class="m-1" type="button" on:click={downClick} id="down-field-input" disabled={(!$tablename || $tablename =='') && op=='add'?true:false}  value="MOVE DOWN"/>
		<input class="m-1" type="button" on:click={topClick} id="top-field-input" disabled={(!$tablename || $tablename =='') && op =='add'?true:false}  value="MOVE TOP"/>
		<input class="m-1" type="button" on:click={bottomClick} id="bottom-field-input" disabled={(!$tablename || $tablename =='') && op =='add'?true:false} value="MOVE BOTTOM"/>
	    {/if}
	</div>
	<div style="visibility:{op !='delete'?'visible':'hidden'};">
		
			<SimpleTable  bind:data={datarows} datacolumns={datacolumns} showpag={false} pSize={30}/>
		
	</div>
	<div>
		{#if op =='modify'}
			<input class="m-1" type="button" on:click={saveClick} id="button-save-table" value="SAVE TABLE"/>
		{:else if op=='add'}
			<input class="m-1" type="button" on:click={createClick} id="button-save-table" disabled={(!$tablename || $tablename =='') && op =='add'?true:false} value="CREATE TABLE"/>
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
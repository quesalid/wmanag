<script lang="ts">
 import classNames from 'classnames'
 import {SimpleTable} from '../table'
 import { writable } from "svelte/store";
 import {mock} from '../../ustore.js'


 export let divClass = 'w-full'
 export let datarows:any = writable([])
 export let tables:any = writable([])
 export let tablename:any = writable('')
 export let datacolumns:any = []

 const onClickCheck = (ev:any)=>{console.log("ONCLICK CHECK",ev.target)}
 
 const removeClick = (ev:any)=>{
	 console.log("REMOVE CLICK",ev.target)
	$datarows.pop()
	$datarows = $datarows
 }
 export let  upClick = (ev:any)=>{console.log("UP CLICK",ev.target)}
 export let downClick = (ev:any)=>{console.log("DOWN CLICK",ev.target)}
 export let  topClick = (ev:any)=>{console.log("TOP CLICK",ev.target)}
 export let  bottomClick = (ev:any)=>{console.log("BOTTOM CLICK",ev.target)}
 export let  saveClick = (ev:any)=>{console.log("SAVE CLICK",ev.target)}
 export let  setTablename = (ev:any)=>{console.log("SET TABLENAME",$tablename)}
 export let addClick = (ev:any)=>{console.log("ADD CLICK",ev.target)}
 
</script>

<div class="w-full">
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
	<div class="flex">
		<!-- ADD TOOLMENU -->
		
		<input class="m-1" type="button" on:click={addClick} id="add-field-input" disabled={(!$tablename || $tablename =='')} value="ADD RECORD"/>
		<input class="m-1" type="button" on:click={removeClick} id="remove-field-input" disabled={(!$tablename || $tablename =='') } value="REMOVE RECORD"/>
		<input class="m-1" type="button" on:click={upClick} id="up-field-input" disabled={(!$tablename || $tablename =='')} value="MOVE UP"/>
		<input class="m-1" type="button" on:click={downClick} id="down-field-input" disabled={(!$tablename || $tablename =='')}  value="MOVE DOWN"/>
		<input class="m-1" type="button" on:click={topClick} id="top-field-input" disabled={(!$tablename || $tablename =='')}  value="MOVE TOP"/>
		<input class="m-1" type="button" on:click={bottomClick} id="bottom-field-input" disabled={(!$tablename || $tablename =='')} value="MOVE BOTTOM"/>
	</div>
	<div >
			<SimpleTable  bind:data={datarows} datacolumns={datacolumns} showpag={true} pSize={5}/>
	</div>
	<div>
			<input class="m-1" type="button" on:click={saveClick} id="button-save-table" value="SAVE TABLE"/>	
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
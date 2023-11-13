<script lang="ts">
 import classNames from 'classnames'
 import SimpleTable from '../table/SimpleTable.svelte'
 import { writable } from "svelte/store";

 export let divClass = 'w-full'
 export let datarows:any = []
 export let datacolumns:any = writable([
	  {
		header: 'Nome',
		accessor: 'name',
	  },
	  {
		header: 'Tipo',
		accessor: 'type',
	  },
	  {
		header: 'NN',
		accessor: 'notnull',
	  },
	  {
		header: 'CP',
		accessor: 'primarykey',
	  },
	  {
		header: 'AI',
		accessor: 'autoincrement',
	  },
	  {
		header: 'U',
		accessor: 'unique',
	  },
	  {
		header: 'Default',
		accessor: 'default',
	  }
  ]);

</script>

<!--div class={classNames(divClass, $$props.class)}-->
<div class="w-full">
	<SimpleTable  bind:data={datarows} datacolumns={datacolumns} showpag={false}/>
</div>

<style>
  .w-full{
	width:100%;
  }
</style>
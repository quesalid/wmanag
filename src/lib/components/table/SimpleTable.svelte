﻿<script lang="ts">
  import { createTable, Subscribe, Render, createRender } from 'svelte-headless-table';
  import { addSortBy,addPagination,addTableFilter } from 'svelte-headless-table/plugins';
  import ImageRender from './ImageRender.svelte'
  import ImageRenderDynamic from './ImageRenderDynamic.svelte'
  import CheckRender from './CheckRender.svelte'
  import SelectRender from './SelectRender.svelte'
  import TextRender from './TextRender.svelte'
  import EditTextRender from './EditTextRender.svelte'
  import EditCheckRender from './EditCheckRender.svelte'

  export let data:any = [
		{ name: 'Ada Lovelace', age: 21 },
		{ name: 'Barbara Liskov', age: 52 },
		{ name: 'Richard Hamming', age: 38 },
  ];
  export let datacolumns:any = [
	  {
		header: 'Name',
		accessor: 'name',
	  },
	  {
		header: 'Age',
		accessor: 'age',
	  }
  ];

  export let pagesize = true;
  export let showpag = true;
  export let pSize = 2;

  const getColumns = (datacolumns:any) => {
	  let columns = []
	  for (let i = 0; i < datacolumns.length; i++) {
		  if(datacolumns[i].renderdef){
			  datacolumns[i].cell = getRenderer(datacolumns[i].renderdef.type,datacolumns[i].renderdef.idtag,datacolumns[i].renderdef.uid,datacolumns[i].renderdef.params)
		  }
		  columns.push(table.column(datacolumns[i]))
	  }
	  return columns
  }

  

  const getRenderer = (type:any,idtag:any,uid:any,params:any)=>{
	  let ret
	  switch(type){
		  case 'image':
			ret = ({row})=>{
				params.uid = row.original['uid']
				return createRender(ImageRender,{...params})
			}
			break;
		  case 'imagedynamic':
			ret = ({row})=>{
				params.uid = row.original['uid']
				params.image = row.original.profile.avatar
				return createRender(ImageRenderDynamic,{...params})
			}
			break;
		  case 'checkbox':
			ret = ({row})=>{
				const keys = Object.keys(row.original)
				const key = keys.find((k)=>k==idtag)
				params.uid = row.original['uid']
				if(key)
					params.value = row.original[key]
				return createRender(CheckRender,{...params})
			}
			break;
		  case 'select':
			ret = ({row})=>{
				const keys = Object.keys(row.original)
				const key = keys.find((k)=>k==idtag)
				params.uid = row.original['uid']
				if(key)
					params.type = row.original[key]
				return createRender(SelectRender,{...params})
			}
			break;
		  case 'text':
			ret = (({row})=>{
				const keys = Object.keys(row.original)
				const key = keys.find((k)=>k==idtag)
				params.uid = row.original['uid']
				if(key)
					params.value = row.original[key]
				return createRender(TextRender,{...params})
			})
			break;
			case 'editext':
			ret = (({row,column})=>{
				const keys = Object.keys(row.original)
				const key = keys.find((k)=>k==idtag)
				params.uid = row.original['uid']
				if(key){
					params.value = row.original[key]
					params.key = column.id
				}
				//console.log("EDIT TEXT RENDER",params,row.id,column.id)
				return createRender(EditTextRender,{...params})
			})
			break;
			case 'editcheckbox':
			ret = ({row,column})=>{
				const keys = Object.keys(row.original)
				const key = keys.find((k)=>k==idtag)
				params.uid = row.original['uid']
				if(key){
					params.value = row.original[key]
					params.key = column.id
				}
				//console.log("EDIT CHECK  RENDER",params,row.id,column.id)
				return createRender(EditCheckRender,{...params})
			}
			break;
		  default:
		    break;
	  }
	  return ret
  }

  //const datarows = readable(data);

 const table = createTable(data, {
    sort: addSortBy(),
	page: addPagination(),
	tableFilter: addTableFilter(),
  });

  const columns = table.createColumns(getColumns(datacolumns))

  const { visibleColumns, headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } = table.createViewModel(columns);
  const { sortKeys } = pluginStates.sort;
  const { filterValue } = pluginStates.tableFilter;
  const { pageIndex, pageCount, pageSize, hasNextPage, hasPreviousPage } = pluginStates.page;

  $pageSize = pSize

</script>

    <table {...$tableAttrs}>
	  <thead>
			{#each $headerRows as headerRow (headerRow.id)}
				<Subscribe rowAttrs={headerRow.attrs()} let:rowAttrs>
					<tr {...rowAttrs}>
						{#each headerRow.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
								<th {...attrs} on:click={props.sort.toggle}>
									<Render of={cell.render()} />
									{#if props.sort.order === 'asc'}
									⬇️
									{:else if props.sort.order === 'desc'}
									⬆️
									{/if}
								</th>
							</Subscribe>
						{/each}
					</tr>
				</Subscribe>
			{/each}
			<tr>
				<th class="th-input-search" colspan={$visibleColumns.length}>
					<input class="input-search" type="text" bind:value={$filterValue} placeholder="Search rows..." />
				</th>
			</tr>
		</thead>
		<tbody {...$tableBodyAttrs}>
			{#each $pageRows as row (row.id)}
				<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
					<tr {...rowAttrs}>
						{#each row.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs>
								<td {...attrs}>
									<Render of={cell.render()} />
								</td>
							</Subscribe>
						{/each}
					</tr>
				</Subscribe>
			{/each}
		</tbody>
</table>


{#if showpag}
	<div class="pagination-div">
		<div>
		  <button
			on:click={() => $pageIndex--}
			disabled={!$hasPreviousPage} style="font-weight:bold;font-size:15px;margin-left:2px;">🞀</button
		  >
		  {$pageIndex + 1} out of {$pageCount}
		  <button
			on:click={() => $pageIndex++}
			disabled={!$hasNextPage} style="font-weight:bold;font-size:15px;">🞂</button
		  >
		</div>
		{#if pagesize}
		   <div>
			<label for="page-size" style="margin-top:5px;margin-right:3px;margin-left:3px;">Page size</label>
			<input id="page-size" size="8" type="number" min={1} bind:value={$pageSize} />
		   </div>
		{/if}
	</div>
{/if}


<style>
	table {
			border-spacing: 0;
			border-top: 1px solid black;
			border-left: 1px solid black;
			margin: 0.5rem;
		}
		th, td {
			border-bottom: 1px solid black;
			border-right: 1px solid black;
			padding: 0.5rem;
		}
		th{
			background-color: #e9e9e9;
		}
		.th-input-search{
			background-color: #fff;
		}
		.input-search{
			width: 100%;
		}
	.pagination-div{
		display:flex;
		vertical-align: middle;
		margin: 0.3rem;
		border: 1px solid;
	}
	#page-size{
		border: 1px solid;
	}
</style>
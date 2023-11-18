<script lang="ts">
  import {onMount} from 'svelte'
  import { writable } from "svelte/store";
  import { TabWrapper, TabHead, TabHeadItem , TabContentItem } from '../lib/components/tabs'
  import { ToolbarWrapper, ToolbarItem, ToolbarHead, ToolbarContentItem } from '../lib/components/toolbar'
  import WindowFooter from '../lib/components/contents/WindowFooter.svelte'
  import DbAddTable from '../lib/components/contents/DbAddTable.svelte'
  import {mock} from '../lib/ustore.js'
  import {dbConnect, 
    dbGetTables, 
    dbCreateTable,
    dbModifyTable, 
    dbDeleteTable,
    dbGetTable,
    dbDisconnect} from '../lib/script/apidb.js'

  export let connectionString = 'sqlite://test.db'
  
  export let tree = {
		label: "Tabelle", name:'Tabelle',children: [
			{label: "event", name: "event", type:'TABLE',children: [
				{label: "uid",name: "uid", type:'TEXT',schema:"'uid' TEXT PRIMARY KEY"},
				{label: "start",name: "start", type:'TEXT',schema:"'start' TEXT"},
                {label: "startInputType",name: "startInputType", type:'TEXT',schema:"'startInputType' TEXT DEFAULT 'local'"},
                {label: "startOutputType",name: "startOutputType", type:'TEXT',schema:"'startOutputType' TEXT DEFAULT 'utc'"},
                {label: "duration",name: "duration", type:'TEXT',schema:"'duration' TEXT"},
                {label: "title",name: "title", type:'TEXT',schema:"'title' TEXT"},
			]},
			{label: "group", name: "group", type:'TABLE',children: [
				{label: "uid",name: "uid", type:'TEXT',schema:"'uid' TEXT PRIMARY KEY"},
				{label: "name",name: "name", type:'TEXT',schema:"'name' TEXT NOT NULL"},
				{label: "type",name: "type", type:'TEXT',schema:"'type' TEXT DEFAULT 'USER'"},
                {label: "description",name: "description", type:'TEXT',schema:"'description' TEXT"},
			]},
		],
	}

  let activeTabValue = 1;
  $mock = true
  onMount(async () => {
	try{
        // CONNECT TO DB
        let ret= await dbConnect(connectionString,mock)
        dbconnection = ret.data
        // GET TABLES
        ret = await dbGetTables(dbconnection,mock)
        $tables = ret.data
    }catch(error){
	  console.log("ERROR",error)
	}
  })

  const handleClick = (tabValue) => () => {
    activeTabValue = tabValue;
  };

  let activeToolbarValue1 = 1;
   const handleClickToolbar1 =  (tabValue) => async() => {
    activeToolbarValue1 = tabValue;
    switch(tabValue){
		case 1:
			title = "CREATE TABLE"
            $datarows = []
            op='add'
			break;
		case 2:
			title = "MODIFY TABLE"
            try{
            const ret = await dbGetTable(dbconnection,tablename,mock)
            /*$datarows = [
                {name:'uid',type:'TEXT',notnull:'false',primarykey:'true',autoincrement:'false',unique:'false',default:''},
                {name:'start',type:'TEXT',notnull:'false',primarykey:'false',autoincrement:'false',unique:'false',default:''},
                {name:'nlsubscription',type:'BOOLEAN',notnull:'false',primarykey:'false',autoincrement:'false',unique:'false',default:'false'}
                ]*/
                $datarows = ret.data
            }catch(error){
				//console.log("ERROR",error)
                $datarows = []
			}
            op='modify'
			break;
		case 3:
			title = "DELETE TABLE"
            try{
            const ret = await dbGetTable(dbconnection,tablename,mock)
                $datarows = ret.data
            }catch(error){
				//console.log("ERROR",error)
                $datarows = []
			}
			op='delete'
			break;
	}
    //dialogVisibility = 'visible'
  };

  let activeToolbarValue2 = 1;
   const handleClickToolbar2 = (tabValue) => () => {
    activeToolbarValue2 = tabValue;
  };

  let activeToolbarValue3 = 1;
   const handleClickToolbar3 = (tabValue) => () => {
    activeToolbarValue3 = tabValue;
  };

  let activeToolbarValue4 = 1;
   const handleClickToolbar4 = (tabValue) => () => {
    activeToolbarValue4 = tabValue;
  };

  const defaultManager = 'defaultDBDialog'
  let dialogVisibility = 'hidden'
  const disableClose = true
  const draggable = false
  const toolbar = []
  let title = "WINDOW TITLE"
  let innernode = DbAddTable
  let datarows = writable([])
  let tables = writable([])
  let dbconnection = writable('')
  let op = 'add'
  let tablename = writable('')
  

  
</script>

<TabWrapper tabStyle='underline' let:tabStyle>
  <TabHead {tabStyle}>
    <TabHeadItem id={1} {tabStyle} on:click={handleClick(1)} activeTabValue={activeTabValue}>Struttura database</TabHeadItem>
    <TabHeadItem id={2} {tabStyle} on:click={handleClick(2)} activeTabValue={activeTabValue}>Naviga dati</TabHeadItem>
    <TabHeadItem id={3} {tabStyle} on:click={handleClick(3)} activeTabValue={activeTabValue}>Esegui SQL</TabHeadItem>
    <TabHeadItem id={4} {tabStyle} on:click={handleClick(4)} activeTabValue={activeTabValue}>Backup/Import/Export</TabHeadItem>
  </TabHead>
  <TabContentItem id={1} activeTabValue={activeTabValue}>
      <ToolbarWrapper tabStyle='underline' let:tabStyle>
		 <ToolbarHead {tabStyle}>
            <ToolbarItem id={1} {tabStyle} on:click={handleClickToolbar1(1)} activeToolbarValue={activeToolbarValue1}>Crea Tabella</ToolbarItem>
            <ToolbarItem id={2} {tabStyle} on:click={handleClickToolbar1(2)} activeToolbarValue={activeToolbarValue1}>Modifica Tabella</ToolbarItem>
            <ToolbarItem id={3} {tabStyle} on:click={handleClickToolbar1(3)} activeToolbarValue={activeToolbarValue1}>Elimina Tabella</ToolbarItem>
        </ToolbarHead>
        <ToolbarContentItem id={1} activeToolbarValue={activeToolbarValue1}>
            <!-- CREATE TABLE-->
        </ToolbarContentItem>
        <ToolbarContentItem id={2} activeToolbarValue={activeToolbarValue1}>
             <!-- MODIFY TABLE-->
        </ToolbarContentItem>
        <ToolbarContentItem id={3} activeToolbarValue={activeToolbarValue1}>
            <!-- DELETE TABLE-->
        </ToolbarContentItem>
      </ToolbarWrapper>
      <DbAddTable
                datarows={datarows}
                bind:op={op}
                bind:tablename={tablename}
                bind:tables={tables}
                bind:dbconnection={dbconnection}
                />
  </TabContentItem>
  <TabContentItem id={2} activeTabValue={activeTabValue}>
      <ToolbarWrapper tabStyle='underline' let:tabStyle>
        <ToolbarHead {tabStyle}>
            <ToolbarItem id={1} {tabStyle} on:click={handleClickToolbar2(1)} activeToolbarValue={activeToolbarValue2}>Tabella</ToolbarItem>
        </ToolbarHead>
        <ToolbarContentItem id={1} activeToolbarValue={activeToolbarValue2}> Toolbar Content 2.1 </ToolbarContentItem>
      </ToolbarWrapper>
  </TabContentItem>
  <TabContentItem id={3} activeTabValue={activeTabValue}>
    <ToolbarWrapper tabStyle='underline' let:tabStyle>
        <ToolbarHead {tabStyle}>
            <ToolbarItem id={1} {tabStyle} on:click={handleClickToolbar3(1)} activeToolbarValue={activeToolbarValue3}>Open SQL File</ToolbarItem>
             <ToolbarItem id={2} {tabStyle} on:click={handleClickToolbar3(2)} activeToolbarValue={activeToolbarValue3}>Esegui SQL</ToolbarItem>
        </ToolbarHead>
        <ToolbarContentItem id={1} activeToolbarValue={activeToolbarValue3}> Toolbar Content 3.1 </ToolbarContentItem>
        <ToolbarContentItem id={2} activeToolbarValue={activeToolbarValue3}> Toolbar Content 3.2 </ToolbarContentItem>
      </ToolbarWrapper>
  </TabContentItem>
  <TabContentItem id={4} activeTabValue={activeTabValue}>
    <ToolbarWrapper tabStyle='underline' let:tabStyle>
        <ToolbarHead {tabStyle}>
            <ToolbarItem id={1} {tabStyle} on:click={handleClickToolbar4(1)} activeToolbarValue={activeToolbarValue4}>Backup</ToolbarItem>
            <ToolbarItem id={2} {tabStyle} on:click={handleClickToolbar4(2)} activeToolbarValue={activeToolbarValue4}>Import</ToolbarItem>
            <ToolbarItem id={3} {tabStyle} on:click={handleClickToolbar4(3)} activeToolbarValue={activeToolbarValue4}>Export</ToolbarItem>
        </ToolbarHead>
      </ToolbarWrapper>
      <ToolbarContentItem id={1} activeToolbarValue={activeToolbarValue4}> Toolbar Content 4.1 </ToolbarContentItem>
      <ToolbarContentItem id={2} activeToolbarValue={activeToolbarValue4}> Toolbar Content 4.2 </ToolbarContentItem>
      <ToolbarContentItem id={3} activeToolbarValue={activeToolbarValue4}> Toolbar Content 4.3 </ToolbarContentItem>
  </TabContentItem>
</TabWrapper>




<style>

</style>
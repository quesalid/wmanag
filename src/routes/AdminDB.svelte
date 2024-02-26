<script lang="ts">
  import {onMount} from 'svelte'
  import { writable } from "svelte/store";
  import { TabWrapper, TabHead, TabHeadItem , TabContentItem } from '../lib/components/tabs'
  import { ToolbarWrapper, ToolbarItem, ToolbarHead, ToolbarContentItem } from '../lib/components/toolbar'
  import WindowFooter from '../lib/components/contents/WindowFooter.svelte'
  import DbNavigate from '../lib/components/contents/DbNavigate.svelte'
  import DbAddTable from '../lib/components/contents/DbAddTable.svelte'
  import {mock} from '../lib/ustore.js'
  import {dbConnect, 
    dbGetTables, 
    dbCreateTable,
    dbModifyTable, 
    dbDeleteTable,
    dbGetTable,
    dbGetNewRow,
    dbUpsertToTable,
    dbDisconnect} from '../lib/script/apidb.js'

  export let connectionString = 'sqlite://test.db'

  const defaultManager = 'defaultDBDialog'
  let dialogVisibility = 'hidden'
  const disableClose = true
  const draggable = false
  const toolbar = []
  let title = "WINDOW TITLE"
  let innernode = DbAddTable
  let metadatarows:any = writable([])
  let datarows:any = writable([])
  let tables:any = writable([])
  let dbconnection = writable('')
  let op = 'add'
  let tablename:any = writable('')
  
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

    const onChangeText = (rowDataId:any, columnId:any, newValue:any) => {
	    const idx = parseInt(rowDataId);
        const currentItem = $metadatarows[idx];
        const key = columnId; // Cast as `keyof YourDataItem`
        const newItem = {...currentItem, [key]: newValue};
        //console.log(newItem);
        $metadatarows[idx] = newItem;
        $metadatarows = $metadatarows;
  }

  const onChangeCheck = (rowDataId:any, columnId:any, newValue:any) => {
	const idx = parseInt(rowDataId);
    const currentItem = $metadatarows[idx];
    const key = columnId; // Cast as `keyof YourDataItem`
    const newItem = {...currentItem, [key]: newValue};
    //console.log(newItem);
    $metadatarows[idx] = newItem;
    $metadatarows = $metadatarows;
  }

  const onChangeTextNav = (rowDataId:any, columnId:any, newValue:any) => {
	    const idx = parseInt(rowDataId);
        const currentItem = $datarows[idx];
        const key = columnId; // Cast as `keyof YourDataItem`
        console.log("ON CHANGE TEXT NAV",currentItem,key,newValue)
        const newItem = {...currentItem, [key]: newValue};
        //console.log(newItem);
        $datarows[idx] = newItem;
        $datarows = $datarows;
  }


const voidfunction = ()=>{return ""}
const onChangeSelect = (ev:any)=>{console.log("ON CHANGE SELECT",ev.target)}
let datacolumnsnavigate:any = []

let datacolumnscreate:any = [
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
		renderdef:{type:'editext',params:{onClick:onChangeText},idtag:'default',uid:'default'}
	  }
  ];

  

  let getColumnsDefinition = async (columns:any)=>{
       return new Promise(async (resolve, reject) => {
	  let ret = []
      let type ='editext'
      for(let column of columns){
          switch(column){
              case 'TEXT':
                type='editext'
                break;
              case 'INTEGER':
                type='editext'
			    break;
              case 'BLOB':
                type='editext'
			    break;
              case 'REAL':
                type='editext'
			    break;
              case 'BOOLEAN':
                type='editcheckbox'
			    break;
              default:
                break;
          }
		  ret.push({
			header: column.name,
			accessor: column.name,
			renderdef:{type:type,params:{onClick:onChangeTextNav},idtag:column.name,uid:column.name}
		  })
      }
	  resolve( ret)
      })
  }

  let activeTabValue = 1;
  $mock = true
  onMount(async () => {
	try{
        // CONNECT TO DB
        let ret= await dbConnect(connectionString,$mock)
        $dbconnection = ret.data
        // GET TABLES
        ret = await dbGetTables($dbconnection,$mock)
        $tables = ret.data
    }catch(error){
	  console.log("ERROR",error)
	}
  })

  const handleClick = (tabValue:any) => async () => {
    activeTabValue = tabValue;
    switch(tabValue){
        case 1:
            await handleClickToolbar1(activeToolbarValue1)()
            break
        case 2:
            await handleClickToolbar2(activeToolbarValue2)()
            break;
        case 3:
            await handleClickToolbar3(activeToolbarValue3)()
            break;
        case 4:
            await handleClickToolbar4(activeToolbarValue4)()
            break;
    }
  }
		

  let activeToolbarValue1 = 1;
   const handleClickToolbar1 =  (tabValue:any) => async() => {
    activeToolbarValue1 = tabValue;
    switch(tabValue){
		case 1:
            console.log("CREATE TABLE",$tables,$tablename)
			title = "CREATE TABLE"
            $metadatarows = []
            op='add'
			break;
		case 2:
			title = "MODIFY TABLE"
            try{
                const ret = await dbGetTable($dbconnection,$tablename,$mock)
                console.log("MODIFY TABLE",$tables,$tablename,ret.data)
                $metadatarows =ret.data.columns
                console.log("MODIFY TABLE",$metadatarows)
            }catch(error){
                console.log("MODIFY TABLE ERROR")
                $metadatarows = []
			}
            op='modify'
			break;
		case 3:
			title = "DELETE TABLE"
            try{
                const ret = await dbGetTable($dbconnection,$tablename,$mock)
                $metadatarows = ret.data.columns
            }catch(error){
				console.log("DELETE TABLE ERROR")
                 $metadatarows = []
			}
			op='delete'
			break;
	}
    //dialogVisibility = 'visible'
  };

  let activeToolbarValue2 = 1;
   const handleClickToolbar2 = (tabValue:any) => async () => {
    activeToolbarValue2 = tabValue;
    try{
    switch(tabValue){
		case 1:
            const ret = await dbGetTable($dbconnection,$tablename,$mock)
            const retcols = await getColumnsDefinition(ret.data.columns)
            console.log("NAVIGATE TABLE ",ret)
            datacolumnsnavigate =  retcols
            console.log("NAVIGATE TABLE COLUMNS",datacolumnsnavigate)
            $datarows =  ret.data.rows
            console.log("NAVIGATE TABLE ROWS",$datarows)
			break;
    }
    }catch(error){
		console.log("NAVIGATE TABLE ERROR")
		$datarows = []
	}
  };

  let activeToolbarValue3 = 1;
   const handleClickToolbar3 = (tabValue:any) => () => {
    activeToolbarValue3 = tabValue;
  };

  let activeToolbarValue4 = 1;
   const handleClickToolbar4 = (tabValue:any) => () => {
    activeToolbarValue4 = tabValue;
  };

  
 const downClick = (ev:any)=>{console.log("DOWN CLICK",ev.target)}
 const  topClick = (ev:any)=>{console.log("TOP CLICK",ev.target)}
 const  bottomClick = (ev:any)=>{console.log("BOTTOM CLICK",ev.target)}
 const  createClick = async (ev:any)=>{
     try{
	     await dbCreateTable($dbconnection,$tablename,$metadatarows,$mock)
	     const ret = await dbGetTables($dbconnection,$mock)
	     $tables = ret.data
     }catch(error){
         console.log("CREATE TABLE ERROR")
     }
 }
 const  deleteClick = async (ev:any)=>{
     try{
	 await dbDeleteTable($dbconnection,$tablename,$mock)
	 const ret = await dbGetTables($dbconnection,$mock)
	 $tables = ret.data
     $tablename = ''
     if($tables.length>0)
		$tablename = $tables[0]
     }catch(error){
		 console.log("DELETE TABLE ERROR")
	 }
	
 }
 const  saveClick = async (ev:any)=>{
     try{
	     await dbModifyTable($dbconnection,$tablename,$metadatarows,$mock)
	     const ret = await dbGetTables($dbconnection,$mock)
	     $tables = ret.data
     }catch(error){
         console.log("SAVE TABLE ERROR")
     }
 }

 const saveClickNavigate = async (ev:any)=>{
	 try{
         console.log("SAVE TABLE ROWS",$datarows)
	     await dbUpsertToTable($dbconnection,$tablename,$datarows,$mock)
	     const ret = await dbGetTables($dbconnection,$mock)
	     $tables = ret.data
	 }catch(error){
		 console.log("SAVE TABLE ROWS ERROR")
	 }
 }

 let addClick = (ev:any)=>{
     const newrow = {name:'',type:'TEXT',notnull:'false',primarykey:'false',autoincrement:'false',unique:'false',default:''}
	 $metadatarows.push(newrow)
	 $metadatarows = $metadatarows
 }

 let addClickNavigate= async (ev:any)=>{
     const ret = await dbGetNewRow($dbconnection,$tablename,$mock)
	 $datarows.push(ret.data)
     console.log("ADD CLICK NAVIGATE",$datarows)
	 $datarows = $datarows
 }

 const  setTablename = async (ev:any)=>{
	  $tablename = ev.target.value
      try{
            const ret = await dbGetTable($dbconnection,$tablename,$mock)
            $metadatarows = ret.data.columns
        }catch(error){
            console.log("SET TABLENAME ERROR")
            $metadatarows = []
	  }
  }

  let  setTablenameAdd = (ev:any)=>{
	  $tablename = ev.target.value
      $metadatarows = []
	  
  }

  const  setTablenameNavigate = async (ev:any)=>{
	  $tablename = ev.target.value
      
  }
  
</script>

<TabWrapper tabStyle='underline' let:tabStyle>
<div>
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
                bind:metadatarows={metadatarows}
                bind:op={op}
                bind:tablename={tablename}
                bind:tables={tables}
                bind:metadatacolumns={datacolumnscreate}
                createClick={createClick}
                deleteClick={deleteClick}
                addClick={addClick}
                saveClick={saveClick}
                setTablename={setTablename}
                setTablenameAdd={setTablenameAdd}
                />
  </TabContentItem>
  <TabContentItem id={2} activeTabValue={activeTabValue}>
      <ToolbarWrapper tabStyle='underline' let:tabStyle>
        <ToolbarHead {tabStyle}>
            <ToolbarItem id={1} {tabStyle} on:click={handleClickToolbar2(1)} activeToolbarValue={activeToolbarValue2}>Tabella</ToolbarItem>
        </ToolbarHead>
        <ToolbarContentItem id={1} activeToolbarValue={activeToolbarValue2}> 
        </ToolbarContentItem>
      </ToolbarWrapper>
      <DbNavigate
                bind:datarows={datarows}
                bind:tablename={tablename}
                bind:tables={tables}
                bind:datacolumns={datacolumnsnavigate}
                addClick={addClickNavigate}
                setTablename = {setTablenameNavigate}
                saveClick ={saveClickNavigate}
                />
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
  </div>
</TabWrapper>




<style>

</style>
<script lang="ts">
  import { TabWrapper, TabHead, TabHeadItem , TabContentItem } from '../lib/components/tabs'
  import { ToolbarWrapper, ToolbarItem, ToolbarHead, ToolbarContentItem } from '../lib/components/toolbar'
  import {TreeView,TreeWrapper} from '../lib/components/tree'
  import WManag from '../lib/components/WManag.svelte'
  import WindowFooter from '../lib/components/contents/WindowFooter.svelte'

  export let tree = {
		label: "Tabelle", name:'Tabelle', children: [
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
  const handleClick = (tabValue) => () => {
    activeTabValue = tabValue;
  };

  let activeToolbarValue1 = 1;
   const handleClickToolbar1 = (tabValue) => () => {
    activeToolbarValue1 = tabValue;
    switch(tabValue){
		case 1:
			title = "CREATE TABLE"
			break;
		case 2:
			title = "MODIFY TABLE"
			break;
		case 3:
			title = "DELETE TABLE"
			break;
	}
    dialogVisibility = 'visible'
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
       <TreeWrapper>
		    <TreeView {tree}/>
       </TreeWrapper>
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

<!--div class="dialog-window-container" id="{wmParentId}"-->
	<WManag id="{defaultManager}" {draggable} 
    toolbar={toolbar} 
    top="2px" 
    left="2px" 
    width="99%" 
    height="99%"
    {title}
    bind:visibility="{dialogVisibility}">
        
	</WManag>
<!--/!--div-->

<style>
.dialog-window-container{
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  visibility:hidden;
  z-index: 10; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}
</style>
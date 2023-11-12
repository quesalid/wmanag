<script lang="ts">
  import { TabWrapper, TabHead, TabHeadItem , TabContentItem } from '../lib/components/tabs'
  import { ToolbarWrapper, ToolbarItem, ToolbarHead } from '../lib/components/toolbar'
  let activeTabValue = 1;
 
  const handleClick = (tabValue) => () => {
    activeTabValue = tabValue;
  };

  let activeToolbarValue1 = 1;
   const handleClickToolbar1 = (tabValue) => () => {
    activeToolbarValue1 = tabValue;
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
      </ToolbarWrapper>
  </TabContentItem>
  <TabContentItem id={2} activeTabValue={activeTabValue}>
      <ToolbarWrapper tabStyle='underline' let:tabStyle>
        <ToolbarHead {tabStyle}>
            <ToolbarItem id={1} {tabStyle} on:click={handleClickToolbar2(1)} activeToolbarValue={activeToolbarValue2}>Tabella</ToolbarItem>
        </ToolbarHead>
      </ToolbarWrapper>
  </TabContentItem>
  <TabContentItem id={3} activeTabValue={activeTabValue}>
    <ToolbarWrapper tabStyle='underline' let:tabStyle>
        <ToolbarHead {tabStyle}>
            <ToolbarItem id={1} {tabStyle} on:click={handleClickToolbar3(1)} activeToolbarValue={activeToolbarValue3}>Open SQL File</ToolbarItem>
             <ToolbarItem id={2} {tabStyle} on:click={handleClickToolbar3(2)} activeToolbarValue={activeToolbarValue3}>Esegui SQL</ToolbarItem>
        </ToolbarHead>
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
  </TabContentItem>
</TabWrapper>
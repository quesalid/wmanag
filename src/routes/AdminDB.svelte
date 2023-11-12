<script lang="ts">
  import { TabWrapper, TabHead, TabHeadItem , TabContentItem } from '../lib/components/tabs'
  let activeTabValue = 1;
  const handleClick = (tabValue) => () => {
    activeTabValue = tabValue;
  };
  
</script>

<TabWrapper tabStyle='underline' let:tabStyle>
  <TabHead {tabStyle}>
    <TabHeadItem id={1} {tabStyle} on:click={handleClick(1)} activeTabValue={activeTabValue}>Struttura database</TabHeadItem>
    <TabHeadItem id={2} {tabStyle} on:click={handleClick(2)} activeTabValue={activeTabValue}>Naviga dati</TabHeadItem>
    <TabHeadItem id={3} {tabStyle} on:click={handleClick(3)} activeTabValue={activeTabValue}>Esegui SQL</TabHeadItem>
    <TabHeadItem id={4} {tabStyle} on:click={handleClick(4)} activeTabValue={activeTabValue}>Backup/Import/Export</TabHeadItem>
  </TabHead>
  <TabContentItem id={1} activeTabValue={activeTabValue}>Tab 1 content</TabContentItem>
  <TabContentItem id={2} activeTabValue={activeTabValue}>Tab 2 content</TabContentItem>
  <TabContentItem id={3} activeTabValue={activeTabValue}>Tab 3 content</TabContentItem>
  <TabContentItem id={4} activeTabValue={activeTabValue}>Tab 4 content</TabContentItem>
</TabWrapper>
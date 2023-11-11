<script lang="ts">
  import { TabWrapper, TabHead, TabHeadItem , TabContentItem } from '../lib/components/tabs'
  let activeTabValue = 1;
  let activeTabValue2 = 1;
  const handleClick = (tabValue) => () => {
    activeTabValue = tabValue;
  };
  const handleClick2 = (tabValue) => () => {
    activeTabValue2 = tabValue;
  };
</script>

<TabWrapper tabStyle='underline' let:tabStyle>
  <TabHead {tabStyle}>
    <TabHeadItem id={1} {tabStyle} on:click={handleClick2(1)} activeTabValue={activeTabValue2}>Struttura database</TabHeadItem>
    <TabHeadItem id={2} {tabStyle} on:click={handleClick2(2)} activeTabValue={activeTabValue2}>Naviga dati</TabHeadItem>
    <TabHeadItem id={3} {tabStyle} on:click={handleClick2(3)} activeTabValue={activeTabValue2}>Esegui SQL</TabHeadItem>
  </TabHead>
  <TabContentItem id={1} activeTabValue={activeTabValue2}>Tab 1 content</TabContentItem>
  <TabContentItem id={2} activeTabValue={activeTabValue2}>Tab 2 content</TabContentItem>
  <TabContentItem id={3} activeTabValue={activeTabValue2}>Tab 3 content</TabContentItem>
</TabWrapper>
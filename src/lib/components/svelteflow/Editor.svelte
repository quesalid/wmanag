<script lang="ts">
  import { SvelteFlowProvider } from '@xyflow/svelte';

  import Flow from './Flow.svelte';
  import FlowClone from './FlowClone.svelte';
  import DnDProvider from './DnDProvider.svelte';

  // EXTRENAL VARIABLES
  export let maintop = "55px"
  export let load = (ev:any) =>{
      console.log("LOAD GRAPH")
  }
  export let save = (ev:any) =>{
      console.log("SAVE GRAPH")
  }
  export let editortype = "data"
</script>

<SvelteFlowProvider>
  <DnDProvider>
    {#if editortype == "clone"}
        <FlowClone {load} {save} maintop = {maintop}/>
    {:else}
        <Flow {load} {save} maintop = {maintop}/>
	{/if}
  </DnDProvider>
</SvelteFlowProvider>

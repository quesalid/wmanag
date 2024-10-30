<script lang="ts">
  import { SvelteFlowProvider } from '@xyflow/svelte';

  import Flow from './Flow.svelte';
  import DnDProvider from './DnDProvider.svelte';

  // EXTRENAL VARIABLES
  export let maintop = "55px"
  export let load = (ev:any) =>{
      console.log("LOAD GRAPH")
  }
  export let save = (ev:any) =>{
      console.log("SAVE GRAPH")
  }
</script>

<SvelteFlowProvider>
  <DnDProvider>
    <Flow {load} {save} maintop = {maintop}/>
  </DnDProvider>
</SvelteFlowProvider>

<script lang="ts">
  import { SvelteFlowProvider } from '@xyflow/svelte';

  import Flow from './Flow.svelte';
  import DnDProvider from './DnDProvider.svelte';
  import {MainEntityNode, 
            AreaEntityNode, 
            LocalEntityNode,
            ControlledEntityNode,
            ControllerNode,
            PhaseNode,
            TaskNode,
            ProcessNode} from './nodes';

  // EXTRENAL VARIABLES
  export let maintop = "55px"
  export let load = (ev:any) =>{
      console.log("LOAD GRAPH")
  }
  export let save = (ev:any) =>{
      console.log("SAVE GRAPH")
  }
  export let editortype = "data"

let nodeTypesNames = editortype=='data'? ['mainEntity','areaEntity','localEntity','controlledEntity','controller'] : ['process','phase','task']

  export
let  nodeTypes = editortype=='data'? {
    mainEntity: MainEntityNode,
    areaEntity: AreaEntityNode,
    localEntity: LocalEntityNode,
    controlledEntity: ControlledEntityNode,
    controller: ControllerNode,
  }: {
    phase: PhaseNode,
    task: TaskNode,
    process: ProcessNode
  };
</script>

<SvelteFlowProvider>
  <DnDProvider>
   
        <Flow {load} {save} maintop = {maintop} nodeTypesNames={nodeTypesNames} {nodeTypes}/>
	
  </DnDProvider>
</SvelteFlowProvider>

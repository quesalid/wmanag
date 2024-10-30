<script lang="ts">
import { useEdges,useNodes } from '@xyflow/svelte';
  //import { useDnD,useNodes,useEdges, getNodeColor } from './utils';
  import { useDnD, getNodeColor } from './utils';
  import './flowstyles.css'

  // EXPORT VARIABLE
  export let nodePanelId = 'NodePanelId'

  //const type = useDnD();
  const dndobject = useDnD()
  const nodes = useNodes();
  const edges = useEdges();

  const onDragStart = (event: DragEvent, nodeType: string, nodeColor:string) => {
    if (!event.dataTransfer) {
      return null;
    }
    const dob = {type:nodeType,color:nodeColor}
    //type.set(nodeType);
    dndobject.set(dob)

    event.dataTransfer.effectAllowed = 'move';
  };
  // EXPORT FILE
  const exp = (ev:any) => {
	const data = {nodes: $nodes, edges: $edges};
    const a = document.createElement('a');
    const file = new Blob([JSON.stringify(data)], {type: 'application/json'});
    a.href = URL.createObjectURL(file);
    a.download = 'flow.json';
    a.click();

  }

  const imp = (ev:any) => {
    
	const input = document.createElement('input');
	input.type = 'file';
	input.accept = '.json';
	input.onchange = (e) => {
	  const file = (e.target as HTMLInputElement).files?.[0];
	  if (file) {
		const reader = new FileReader();
		reader.onload = (e) => {
          // clear current graph before import
          const nodePanel = document.getElementById(nodePanelId)
          const hideClicked = new CustomEvent("hidenodepanel", { detail: '' })
          nodePanel?.dispatchEvent(hideClicked)
		  const data = JSON.parse(e.target?.result as string);
		  $nodes = data.nodes;
		  $edges = data.edges;
		};
		reader.readAsText(file);
	  }
	};
	input.click();
  }
  // Clear Graph
  const clear = (ev:any) =>{
      $nodes = []
      $edges = []
      // send event to clear node panel
      const nodePanel = document.getElementById(nodePanelId)
      const hideClicked = new CustomEvent("hidenodepanel", { detail: '' })
      nodePanel?.dispatchEvent(hideClicked)
  }
  // Load graph
  export let load = (ev:any) =>{
      console.log("LOAD GRAPH")
  }
  // save graph
  export let save = (ev:any) =>{
      console.log("SAVE GRAPH")
  }
</script>

<aside>
  <div class="aside-label">MENU.</div>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="aside-menuaction" on:click={imp}>Import</div>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="aside-menuaction" on:click={exp}>Export</div>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="aside-menuaction" on:click={load}>Load</div>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="aside-menuaction" on:click={save}>Save</div>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="aside-menuaction" on:click={clear}>Clear</div>
  <div class="aside-nodes-container">
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div style="background-color: {getNodeColor('mainEntity')} ;"
      class="custom-entity-node aside-node"
      on:dragstart={(event) => onDragStart(event, 'mainEntity',getNodeColor('mainEntity'))}
      draggable={true}
    >
      Main Entity
    </div>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div  style="background-color: {getNodeColor('areaEntity')} ;"
      class="custom-entity-node aside-node"
      on:dragstart={(event) => onDragStart(event, 'areaEntity',getNodeColor('areaEntity'))}
      draggable={true}
    >
      Area Entity
    </div>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div  style="background-color: {getNodeColor('localEntity')} ;"
      class="custom-entity-node aside-node"
      on:dragstart={(event) => onDragStart(event, 'localEntity',getNodeColor('localEntity'))}
      draggable={true}
    >
      Local Entity
    </div>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div  style="background-color: {getNodeColor('controlledEntity')} ;"
      class="custom-entity-node aside-node"
      on:dragstart={(event) => onDragStart(event, 'controlledEntity',getNodeColor('controlledEntity'))}
      draggable={true}
    >
      Controlled Entity
    </div>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div  style="background-color: {getNodeColor('controller')} ;"
      class="custom-entity-node aside-node"
      on:dragstart={(event) => onDragStart(event, 'controller',getNodeColor('controller'))}
      draggable={true}
    >
      Controller
    </div>
  </div>
</aside>

<style>
  
</style>

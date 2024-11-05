<script lang="ts">
  import { useEdges,useNodes } from '@xyflow/svelte';
  // import uuid
  import { v4 as uuidv4 } from 'uuid';
  //import { useDnD,useNodes,useEdges, getNodeColor } from './utils';
  import { useDnD, getNodeColor, getNodeLabel } from './utils';
  import './flowstyles.css'

  // EXPORT VARIABLE
  export let nodePanelId = 'NodePanelId'
  export let flowId = "MainEditorDiv"

  //const type = useDnD();
  const dndobject = useDnD()
  const nodes = useNodes();
  const edges = useEdges();

  const onDragStart = (event: DragEvent, nodeType: string, nodeColor:string|null) => {
    if (!event.dataTransfer) {
      return null;
    }
    const dob = {type:nodeType,color:nodeColor}
    //type.set(nodeType);
    dndobject.set(dob)

    event.dataTransfer.effectAllowed = 'move';
  };
  // Export json file
  const exp = (ev:any) => {
    // traverse nodes and add uid to internal data if not present
    $nodes.forEach((node:any) => {
	  if (!node.data.internalData.uid) {
		node.data.internalData.uid = uuidv4();
	  }
	});
    // add parent uid to internal data
    /*  addParentUidToData($nodes, $edges, 'areaEntity', 'plant');
      addParentUidToData($nodes, $edges, 'localEntity', 'department')
      addParentUidToData($nodes, $edges, 'controlledEntity', 'line')
      addParentUidToData($nodes, $edges, 'controller', 'machine')*/

    addParentUidToDataArray($nodes, $edges, 'task', 'parenttask');

	const data = {nodes: $nodes, edges: $edges};
    const a = document.createElement('a');
    const file = new Blob([JSON.stringify(data)], {type: 'application/json'});
    a.href = URL.createObjectURL(file);
    a.download = 'flow.json';
    a.click();

  }
  // Import json file
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
          // set node width and height equal to measured width and height
		  $nodes = data.nodes;
		  $edges = data.edges;
          // send event to resize nodes
          const nodeFlow = document.getElementById(flowId)
          const importClicked = new CustomEvent("importflow", { detail: '' })
          nodeFlow?.dispatchEvent(importClicked)
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
  // Load graph from db
  export let load = (ev:any) =>{
      console.log("LOAD GRAPH")
  }
  // Save graph to db
  export let save = (ev:any) =>{
      console.log("SAVE GRAPH")
  }
  // UTILITIES
  const addParentUidToDataArray = (nodes:any, edges:any, type:any, field:any) => {
	// for each node of type type, find its parent and add the parent's uid to its internal data at field field
    nodes.forEach((node:any) => {
	  if (node.type === type) {
          const parentEdge = edges.find((edge:any) => edge.target === node.id);
          if (parentEdge) {
			const parentNode = nodes.find((n:any) => n.id === parentEdge.source);
			if (parentNode) {
              // if field not exists or if not array
              if (!node.data.internalData[field] || !Array.isArray(node.data.internalData[field])) {
                  // add field as an array
                  node.data.internalData[field] = [];
              }
              // push parent uid to field
			  node.data.internalData[field].push(parentNode.data.internalData.uid);
			}
		  }
      }
    });
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
    <div style="background-color: {getNodeColor('process')} ;"
      class="custom-entity-node aside-node"
      on:dragstart={(event) => onDragStart(event, 'process',getNodeColor('process'))}
      draggable={true}
    >
      {getNodeLabel('process')}
    </div>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div style="background-color: {getNodeColor('phase')} ;"
      class="custom-entity-node aside-node"
      on:dragstart={(event) => onDragStart(event, 'phase',getNodeColor('phase'))}
      draggable={true}
    >
      {getNodeLabel('phase')}
    </div>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div style="background-color: {getNodeColor('task')} ;"
      class="custom-entity-node aside-node"
      on:dragstart={(event) => onDragStart(event, 'task',getNodeColor('task'))}
      draggable={true}
    >
      {getNodeLabel('task')}
    </div>
  </div>
</aside>

<style>
  
</style>

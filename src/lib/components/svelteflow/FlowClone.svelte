<script lang="ts">
  // EXTERNAL
  import { onDestroy, setContext, onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { v4 as uuidv4 } from 'uuid';
  import {
    SvelteFlow,
    Controls,
    Background,
    BackgroundVariant,
    MiniMap,
    useSvelteFlow,
    type Node,
    type Edge,
    Position,
    Panel
  } from '@xyflow/svelte';

  import '@xyflow/svelte/dist/style.css';
  
  // INTERNAL
  import Sidebar from './SidebarClone.svelte';
  import ContextMenu from './ContextMenu.svelte';
  import { PhaseNode,
           TaskNode} from './nodes';
  import {NodePanel} from './panels'
  import { useDnD, getNodeColor } from './utils';
  import './flowstyles.css'
    import Admin from '../../../routes/Admin.svelte';

  const nodeDefaults = {
    sourcePosition: Position.Right,
    targetPosition: Position.Left
  };

  // EXTRENAL VARIABLES
  export let maintop = "55px"
  export let load = (ev:any) =>{
      console.log("LOAD GRAPH")
  }
  export let save = (ev:any) =>{
      console.log("SAVE GRAPH")
  }
  export let flowId = "MainEditorDiv"

  onMount(() => {
	// add event listener for resize nodes on import
	const nodeFlow = document.getElementById(flowId)
    nodeFlow?.addEventListener('importflow', async (event:any) => {
        // sleep 300ms to wait for the nodes to be rendered
        setTimeout(() => { 
            // for each node set the width and height of corresponding element
            $nodes.forEach((node:any) => {
			    const element = document.getElementById(node.id) as HTMLElement;
			    if(element && node.width && node.height){
				    element.style.width = `${node.width - 5}px`;
				    element.style.height = `${node.height - 5}px`;
			    }
		    })
        }, 300)
    })
  })

  // INTERNAL VARIABLES
  let nodePanelId = 'NodePanelId'

  const nodeTypes = {
    phase: PhaseNode,
    task: TaskNode
  };

  // Nodes and Edges
  export let nodes:any = writable([]);

  setContext('nodes', nodes);

  export let edges:any = writable([]);

   setContext('edges', edges);

    onDestroy(() => {
    //nodes.set(null);
    //edges.set(null);
  });

  // ***** Manage Drag and Drop *****
  const { screenToFlowPosition } = useSvelteFlow();

  //const type = useDnD();
  const dndobject = useDnD()

  const onDragOver = (event: DragEvent) => {
    event.preventDefault();
    parentId=null
    const target = event.target as HTMLElement
    if(event.target&& target.id){
         // find the node
         const node = $nodes.find((n:any) => n.id === target.id);
         if(node){
			 parentId=node.id
             parentDimension = {x:Math.round(target.clientWidth/2),y:Math.round(target.clientHeight/2)}
             
		 }
    }
	//console.log("PARENT NODE: ",target.id, target.clientHeight, target.clientWidth)
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }
  };

  let nodTyp:any = writable(null)
  let nodCol:any = writable(null)
  let internalData:any = writable({})
  let parentId:any =null
  let parentDimension = {x:0,y:0}

  const onDrop = (event: DragEvent) => {
    event.preventDefault();
    /*if (!$type) {
      return;
    }*/
    if (!$dndobject.type) {
      return;
    }else{
        $nodTyp = $dndobject.type
        $nodCol = $dndobject.color
    }

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY
    });

    const newid = uuidv4()
    $internalData = {}

    const nodeStyle =
    'background: rgb(0,0,0,0); border: 2px solid #ccc; border-radius: 3px; font-size: xx-small;';

    const newNode:any = {
      id: newid,
      //type: $type,
      type: $nodTyp,
      parentId: parentId,
      position:parentId?parentDimension:position,
      extent:parentId?'parent':undefined,
      style:$nodTyp=='phase'?nodeStyle:undefined,
      data: { label: $nodTyp, 
              color: $nodCol, 
              spanid:'span-'+newid, 
              internalData:$internalData, 
              divid:newid 
      },
      origin: [0.5, 0.0],
      ...nodeDefaults
    } satisfies Node;
    $nodes.push(newNode);
    $nodes = $nodes;
    // Hide panel on drop
    const nodePanel = document.getElementById(nodePanelId)
    const hideClicked = new CustomEvent("hidenodepanel", { detail: '' })
    nodePanel?.dispatchEvent(hideClicked)
  };

  // ***** Manage Context Menu *****
  let menu: { id: string; top?: number; left?: number; right?: number; bottom?: number } | null;
  let width: number;
  let height: number;

  function handleContextMenu({ detail: { event, node } }) {
    // Prevent native context menu from showing
    event.preventDefault();
    // Calculate position of the context menu. We want to make sure it
    // doesn't get positioned off-screen.
    menu = {
      id: node.id,
      top: event.clientY < height - 200 ? event.clientY : undefined,
      left: event.clientX < width - 200 ? event.clientX : undefined,
      right: event.clientX >= width - 200 ? width - event.clientX : undefined,
      bottom: event.clientY >= height - 200 ? height - event.clientY : undefined
    };
  }

  // Close the context menu if it's open whenever the window is clicked.
  function handlePaneClick() {
    menu = null;
  }
</script>

<div id="MainEditorDiv" style="top:{maintop};" bind:clientWidth={width} bind:clientHeight={height}>
  <Sidebar {load} {save} flowId={flowId}/>
  <SvelteFlow {nodes} 
               {edges} 
               fitView 
                on:dragover={onDragOver} 
                on:drop={onDrop}
                on:nodecontextmenu={handleContextMenu}
                on:paneclick={handlePaneClick}
                {nodeTypes}>
    <Controls />
    <Background variant={BackgroundVariant.Dots} />
    {#if menu}
      <ContextMenu
        onClick={handlePaneClick}
        id={menu.id}
        top={menu.top}
        left={menu.left}
        right={menu.right}
        bottom={menu.bottom}
      />
    {/if}
    <MiniMap />
    <Panel position="top-right">
        <NodePanel id={nodePanelId}/>
    </Panel>
  </SvelteFlow>
</div>

<style>
</style>

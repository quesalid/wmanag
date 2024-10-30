<script lang="ts">
  import { Handle, Position, type NodeProps } from '@xyflow/svelte';
  import type { Writable } from 'svelte/store';
  import '../flowstyles.css'
 
  type $$Props = NodeProps;
  
  export let data: any
 
</script>
 
<div class="custom-entity-node">
  <div style="background-color: {data.color} ;">
		<span id={data.spanid}>{data.label}</span>
  </div>
  <div />
  <Handle type="source" position={Position.Right} />
</div>
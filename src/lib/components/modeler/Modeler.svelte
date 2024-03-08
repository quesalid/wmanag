<script lang="ts">
// EXTERN IMPORT
import {onMount} from "svelte"
import Modeler from 'bpmn-js/lib/Modeler'
import 'bpmn-js/dist/assets/bpmn-js.css'
import "bpmn-js/dist/assets/diagram-js.css"
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css"

let modeler:any
onMount(async () => {
		modeler = new Modeler({ container: '#modeler-canvas-id' });
		const powBy = document.getElementsByClassName("bjs-powered-by")
		if(powBy.length >0)
			powBy[0].style['pointer-events']='none'
		console.log("POWERED BY",powBy[0].href)
	});
</script>

	<div class="modeler-canvas-class" id="modeler-canvas-id">
	</div>

<style>
.modeler-canvas-class{
	width:100%;
	height:400px;
}
</style>
<script lang="ts">
import * as echarts from 'echarts';
import { onMount } from 'svelte';

export let section:any
export let options:any = [
	{name:"salisano.1.0",component:"TwinInfo"},
	{name:"salisano.1.1",component:"TwinSimulation"},
	{name:"salisano.1.2",component:"TwinStats"}
]


 onMount(() => {
    
  });
  
const showModel = (ev:any) => {
	console.log("TWIN MODEL",ev.target.value)
}


</script>
		<div class="twin-model-main" >
			<div class="twin-modelheader">
				<label for="twin-model-select">Model</label>
				<select id="twin-model-select" class="twin-model-select" on:change={showModel}>
				{#each options as option}
					<option value={option.name}>{option.name}</option>
				{/each}
			</select>
		    </div>
			<div class="twin-model-body">
		    </div>
			<div class="twin-model-footer">
		    </div>
		</div>
<style>
</style>
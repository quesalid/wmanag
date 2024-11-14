<script lang="ts">
import { onMount } from 'svelte'
import type { View, VisualizationSpec } from 'svelte-vega';
import { VegaLite } from 'svelte-vega';
// INTERNAL
import sections from '../../script/mocksectcoords'

export let sectionName = '';

let data:any
let specVL:VisualizationSpec[]

onMount(() => {
	// add event listner from the parent component
	specVL = sections.getVegaSpecs(sectionName).length?  sections.getVegaSpecs(sectionName) as VisualizationSpec[]: specVL
	data = sections.getVegaData(sectionName)? sections.getVegaData(sectionName): data
})


$: {
	specVL = sections.getVegaSpecs(sectionName).length > 0?  sections.getVegaSpecs(sectionName) as VisualizationSpec[]:[ {type:'area',spec:defaultspecVL}]
	data = sections.getVegaData(sectionName)? sections.getVegaData(sectionName): defaultdata
	viewVL ? console.log('Vega-Lite view: ', specVL, data):'';
}

let viewVL: View | undefined 
let  defaultdata:any = {
		table: [
			{ giorno: '2024-11-04', power: 28 },
			{ giorno: '2024-11-05', power: 27.3 },
			{ giorno: '2024-11-06', power: 28.1 },
			{ giorno: '2024-11-07', power: 28.3 },
			{ giorno: '2024-11-08', power: 27.9 },
			{ giorno: '2024-11-09', power: 27 },
			{ giorno: '2024-11-10', power: 27.5 },
			{ giorno: '2024-11-11', power: 26.5 },
			{ giorno: '2024-11-12', power: 25.8 },
			{ giorno: '2024-11-13', power: 28.1 },
		]
	};


let defaultspecVL: VisualizationSpec = {
		$schema: 'https://vega.github.io/schema/vega-lite/v5.json',
		data: {
			name: 'table'
		},
		"width": 300,
		mark: {
			type:'area',
			"line": {
				"color": "darkgreen"
				},
			"color": {
			  "x1": 1,
			  "y1": 1,
			  "x2": 1,
			  "y2": 0,
			  "gradient": "linear",
			  "stops": [
				{
				  "offset": 0,
				  "color": "white"
				},
				{
				  "offset": 1,
				  "color": "darkgreen"
				}
			  ]
			}
		},
		encoding: {
			x: { field: 'giorno', type: 'temporal' },
			y: { field: 'power', type: 'quantitative' }
		}
	};


const options= {
	actions: false,
};

</script>

 <div class="section-stats-class" id="twin-stats-div">
	{#each specVL as spec}
		<VegaLite bind:data={data} bind:spec={spec.spec} bind:view={viewVL} options={options}/> 
	{/each}
 </div>

<style>
.section-stats-class{
	display:flex;
}
</style>
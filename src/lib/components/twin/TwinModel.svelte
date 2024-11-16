<script lang="ts">
import * as echarts from 'echarts';
import { onMount } from 'svelte';
import BrainModel from './BrainModel.svelte'

export let section:any = {name:null,image:null}

let sizearray:any = [1,1,1,1]
let levels = sizearray.slice(1,sizearray.length-1)

 onMount(() => {
    if(section && section.twin && section.twin.model ){
		conf.networkType = section.twin.model.type;
		conf.size = section.twin.model.size;
		if(section.twin.model.input_vector && section.twin.model.input_vector.length > 0){
			// map input_vector to _inputs
			conf._inputs = section.twin.model.input_vector.map((item:any) => item.label).join(',');
		}
		sizearray = conf.size.split(',').map((item:any) => parseInt(item));
		levels = sizearray.slice(1,sizearray.length-1)
	}
  });
  
let conf:any ={
	networkType: 'FeedForward',
	size: '10,8,6,3',
	_inputs: 'a1,b1,c,d,e,f,g,h,i,j',
	_extinputs: 'a1,b1,c,d,e,f,g,h,i,j',
};

$: {
	if(section && section.twin && section.twin.model && conf ){
		conf.networkType = section.twin.model.type;
		conf.size = section.twin.model.size;
		if(section.twin.input_vector && section.twin.input_vector.length > 0){
			// map input_vector to _inputs
			conf._inputs = section.twin.input_vector.map((item:any) => item.label).join(',');
			conf._extinputs = section.twin.input_vector
		}
		sizearray = conf.size.split(',').map((item:any) => parseInt(item));
		levels = sizearray.slice(1,sizearray.length-1)
		conf=conf
	}
}


</script>
		<div class="twin-model-main" >
			<div class="twin-model-left">
				<fieldset style="padding:5px; border:1px solid #4238ca; background:#ffffff;">
					<legend style="color:#4238ca;">Parametri Modello</legend>
					<div class="twin-model-main-item">
						<div class='twin-model-main-label'>Tipo:</div>
						<input class='twin-model-main-value' disabled type="text"  name="type" value="{conf.networkType}">
					</div>
					<div class="twin-model-main-item">
						<div class='twin-model-main-label'>Inputs:</div>
						<input class='twin-model-main-value' disabled type="text"  name="type" value="{sizearray[0]}">
					</div>
					<div class="twin-model-main-item">
						<div class='twin-model-main-label'>Outputs:</div>
						<input class='twin-model-main-value' disabled type="text"  name="type" value="{sizearray[sizearray.length-1]}">
					</div>
					<div class="twin-model-main-item">
						<div class='twin-model-main-label'>Livelli:</div>
						<input class='twin-model-main-value' disabled type="text"  name="type" value="{sizearray.length-2}">
					</div>
					{#if levels.length > 0}
						{#each levels as level, index}
							<div class="twin-model-main-item">
								<div class='twin-model-main-label'>Nodi livello {index+1}:</div>
								<input class='twin-model-main-value' disabled type="text"  name="type" value="{level}">
							</div>
						{/each}
					{/if}
				</fieldset>
			</div>
			<div class="twin-model-right">
				<BrainModel bind:conf={conf}/>
			</div>
		</div>
		
<style>
.twin-model-main{
	display:flex;
	justify-content:space-between;
}
.twin-model-left{
	width:40%;
	
}
.twin-model-right{
	display:flex;
	justify-content:left;
	
	width:60%;
}
.twin-model-main-item{
	display:flex;
	justify-content:space-between;
}

</style>
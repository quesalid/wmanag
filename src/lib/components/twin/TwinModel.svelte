<script lang="ts">
import * as echarts from 'echarts';
import { onMount } from 'svelte';
import BrainModel from './BrainModel.svelte'

export let section:any = {name:null,image:null}

 onMount(() => {
    if(section && section.twin && section.twin.model ){
		conf.networkType = section.twin.model.type;
		conf.size = section.twin.model.size;
		if(section.twin.model.input_vector && section.twin.model.input_vector.length > 0){
			// map input_vector to _inputs
			conf._inputs = section.twin.model.input_vector.map((item:any) => item.label).join(',');
		}
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
		conf=conf
	}
}


</script>
		<div class="twin-model-main" >
			<div class="twin-model-left">
			</div>
			<div class="twin-model-right">
				<BrainModel bind:conf={conf}/>
			</div>
		</div>
		
<style>
.twin-model-main{
	display:flex;
}
.twin-model-left{
	width:40%;
}
.twin-model-right{
	width:60%;
}
</style>
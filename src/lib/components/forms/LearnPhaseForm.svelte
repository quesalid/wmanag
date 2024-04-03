<script lang="ts">
import {onMount} from 'svelte'
import{DrawFreezeDryer,DrawPreparer} from '../konva'
let phase:any ={type:'MATPREP'}

let component = DrawPreparer

onMount(async () => {
	const konvaForm:any = document.getElementById("konva-animation-id")
	konvaForm.addEventListener("donutclicked",async (e:any)=>{
		console.log("PHASE FORM phase",e.detail)
		switch(e.detail.type){
			case'FREEZEDRYING':
				component = DrawFreezeDryer
				break;
			default:
				component = DrawPreparer
				break;
		}
		phase = e.detail
	})
})
</script>

<section class="konva-animation-form" id="konva-animation-id">
	<svelte:component this={component} phase={phase}/>
</section>

<style>
.konva-animation-form{
	margin: 3px;
}
</style>
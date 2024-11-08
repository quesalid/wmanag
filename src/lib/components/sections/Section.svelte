<script lang="ts">


export let sections:any = []
export let map:any
export let initlat = 45.0;
export let initlon = 7.0;
export let initzoom = 10;


const fly = (ev:any) => {
	let section = sections[parseInt(ev.target.id)]
	if(map && section)
	    section.flyto(map)
	const style ={color:'#ff0000',weight:3,opacity:1.0}
	section.toggleStyle(map,style)
	
}

const reset = (ev:any) => {
	for(let i=0;i<sections.length;i++) {
		let section = sections[i]
		const style ={color:'#0000ff',weight:3,opacity:1.0}
		section.toggleStyle(map,style)
	}
	map.setView([initlat, initlon], initzoom)
}
</script>
 <div>
    <input type="button" id={"reset"} value="Reset" on:click={reset}/>
	{#each sections as section, idx}
		<div>{section.name}</div>
		<input type="button" id={idx+""} value="Show" on:click={fly}/>
	{/each}
 </div>

<style>
</style>
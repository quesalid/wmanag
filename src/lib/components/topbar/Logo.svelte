<script lang="ts">
export let logofilename = "logo.png"
export let onClick = (ev:any)=>{console.log("CLICKED",ev)}
export let imgheight = "30px"
</script>

<input  type="image" height='{imgheight}' alt="Logo" src="{logofilename}" on:click={onClick}/>

<style>
</style>
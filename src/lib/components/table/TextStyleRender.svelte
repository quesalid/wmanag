<script lang="ts">

export let image:any = "/BUDDY.png"
export let style  = "enabled;"
export let onClick:any = null
export let name = 'text-generic'
export let uid = ''
export let value = ''
export let height:any = "25"
export let classname = "image-tool-component"

</script>
	<div class="text-tool-component-div">
		<button style="{style}" class="text-tool-component {classname} " on:click={onClick}>{value}</button>
		<!--div style="{style}" class="text-tool-component {classname} " on:click={onClick}>{value}</!--div-->
	</div>
<style>


.text-tool-component-div {
	margin: 2px 2px 2px 2px;
	opacity: 0.8;
	text-align: center;
}


</style>
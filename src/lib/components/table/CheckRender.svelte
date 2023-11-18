<script lang="ts">

export let style  = "enabled;"
export let onClick = null
export let name = 'img-generic'
export let value = ''
export let uid = ''
export let classname = "check-tool-component"

</script>

	<div class="image-tool-component-div">
		<input type="checkbox"  style="{style}" class="image-tool-component {classname}"  checked={value=='true'?true:false} on:click={onClick?onClick:null}/>
	</div>

<style>

.check-tool-component-div {
	margin: 2px 2px 2px 2px;
	text-align: center;
}


</style>
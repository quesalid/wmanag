<script lang="ts">

export let message = 'footer message';
export let onClick = (ev:any) => {console.log("clicked")}
export let enablebutton = false
export let buttonname = 'CLOSE'
</script>


<div class="div-footer-container">
	<span>Message: {message}</span>
	{#if enablebutton}
		<input class="exit-button" type="button" value="{buttonname}" on:click={onClick}>
	{/if}
</div>

<style>
.div-footer-container{
	display:flex;
	background-color: #f0f0f0;
	margin: 2px;
	width:100%;
	justify-content: space-between ;
}

.exit-button:hover{
	cursor:pointer;
}
</style>
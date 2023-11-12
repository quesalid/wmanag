<script lang="ts">
  export let activeTabValue;
  export let id;
  export let contentDivClass = 'p-1 bg-gray-50 rounded-lg dark:bg-gray-300';
</script>

{#if activeTabValue === id}
  <div class={contentDivClass} id="{id}-tabitem" role="tabpanel" aria-labelledby="{id}-tab">
    <slot />
  </div>
{/if}
<style>
  .p-4{
	padding:1.5rem;
  }
  .p-1{
	padding:0.5rem;
  }
.bg-gray-50{
	background-color:#f9fafb;
  }
.rounded-lg{
	border-radius:0.5rem;
  }
.dark:bg-gray-300{
	background-color:#d1d5db;
  }


</style>
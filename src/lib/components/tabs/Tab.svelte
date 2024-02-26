<script lang='ts'>
   
export let items:any = [
    {name:'Home',status:'active'},
    {name:'Menu 1',status:'inaactive'},
    {name:'Menu 2',status:'inaactive'},
    {name:'Menu 3',status:'inaactive'},
]

const aclass = "my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
</script>
<div>
<ul class="mb-5 flex list-none flex-row flex-wrap border-b-1 pl-0">
    {#each items as item}
        {#if item.status == 'active'}
            <li>
                <a href="#" class="{aclass}">{item.name}</a>
            </li>
        {:else}
            <li>
                <a href="#" class={aclass} >{item.name}</a>
            </li>
        {/if}
    {/each}
  </ul>
</div>
<style>
</style>
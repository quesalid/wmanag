<script lang='ts'>

export let items:any = [
    
]

export let tabclass = "tab-item-class"
export let divclass = "div-item-class"

const onClickItem = (ev:any) =>{
    const target = ev.target
    const itms = document.getElementsByClassName(tabclass)
    const dvs = document.getElementsByClassName(divclass)
    const cdiv = document.getElementById("div-"+target.id)
    for(const i of itms){
        i.classList.remove("bg-white")
    }
    target.classList.add("bg-white")
    for(const i of dvs){
        (i as any).style.display = 'none'
    }
    if(cdiv)
        cdiv.style.display = 'block'
    // APPLY CLICK FUNCTION FROM PARENT IF PRESENT
 
    const found = items.find((itm:any)=>itm.id == target.id)
    if(found && found.clickFunction){
        found.clickFunction()
    }
}

const aclass = tabclass +" bg-neutral-100 my-2 block border-x-0 border-b-2 border-t-0 border-trasparent divide-x px-7 pb-2 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-white focus:isolate focus:border-transparent focus:bg-white data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
</script>
<div>
<ul class="mb-5 flex list-none flex-row flex-wrap pl-0">
    {#each items as item}
        {#if item.status == 'active'}
            <li>
                <a id="{item.id}" href="#" class="{aclass}" on:click={onClickItem}>{item.name}</a>
            </li>
        {:else}
            <li>
                <a id="{item.id}" href="#" class={aclass} on:click={onClickItem}>{item.name}</a>
            </li>
        {/if}
    {/each}
  </ul>
  {#each items as item}
    <div class="{divclass}" id={"div-"+item.id}>
        {#if item.component}
            <svelte:component this={item.component} top="100px" id="wManager-{item.id}"/>
        {/if}
    </div>
  {/each}
</div>
<style>
.tab-item-class{
    display:block
}
.div-item-class{
    display:none;
}
</style>
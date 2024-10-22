<script lang="ts">
import { onMount, onDestroy } from 'svelte';
import { DragLib} from '.';

let draggedItem: any;
onMount (() => {
	draggedItem = document.getElementById('dragged-item');
    const parent = document.getElementById('drag-container');
    console.log("Set DnD on element")
    DragLib.DnD(draggedItem,parent);
});

 onDestroy(() => {
    // Detach created objects
    if(draggedItem)
      DragLib.RemoveDnD(draggedItem);
    
 })
    
</script>

<div class="container" id="drag-container">
    <!-- Primo div (div1) -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    
    <div class="div-box" id="drop-box">
        <div class="item" 
            id="dragged-item">
                Item1
        </div>
    </div>

    <!-- Secondo div (div2) -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!--div 
        class="div-box"
        on:drop="{(event) => handleDrop(event, itemsDiv2)}"
        on:dragover="{handleDragOver}"
        id="DIV2SOURCE">
        {#each itemsDiv2 as item (item)}
            <div
                class="item"
                draggable="true"
                style="top: {item.y}px; left: {item.x}px;"
                on:dragstart="{(event) => handleDragStart(event, item, itemsDiv2)}"
                on:drag="{handleDrag}">
                {item.text}
            </div>
        {/each}
    </!--div-->
   
</div>


<style>
    .container {
        display: flex;
        justify-content: space-around;
        width: 100%;
        margin-top: 20px;
    }

    .div-box {
        width: 200px;
        height: 300px;
        border: 2px solid #000;
        padding: 10px;
        overflow-y: auto;
    }

    .item {
        width: 100px;
        height: 30px;
        background-color: #f0f0f0;
        border: 1px solid #ccc;
        cursor: grab;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: top 0.1s, left 0.1s;
    }
</style>


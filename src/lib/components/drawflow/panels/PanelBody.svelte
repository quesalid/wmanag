<script lang="ts">

/*import CodeMirror from "svelte-codemirror-editor";
import { javascript } from "@codemirror/lang-javascript";*/

export let node:any ={name:'',callback:'',data:{}}

let value='function(input,output){\n}'
// On node name change set node html title 
const setTitle = (ev:any)=>{
    console.log("PANEL BODY", node)
    // GET NODE
    const nodeDiv = document.getElementById('title-box-'+node.id)
    if(nodeDiv){
        if(typeof(ev.target.dataset.name) == 'string' && ev.target.dataset.name == 'name'){
            nodeDiv.innerHTML=ev.target.value
            const split = node.html.split('</div>')
            const add = split.length >0?split[1]:''
            node.html = nodeDiv.outerHTML +add
        }
    }
}

const capitalizeFirstLetter = (string:any) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const changeColor = (ev:any)=>{
    const key = ev.target.dataset.name
    node.data[key].value = ev.target.value
}
</script>
    
    <!--div class="drawflow-panel-body-container-class"-->
    {#each Object.keys(node.data) as Key}
        <div class="drawflow-panel-body-container-item">
            {#if node.data[Key].type == 'text'}
            <span style="margin-right:10px;">{capitalizeFirstLetter(Key)}:</span>
                <input  data-name="{Key}" type='text' size="23" bind:value='{node.data[Key].value}' on:change={setTitle}/>
            {:else if node.data[Key].type == 'selection'}
                <span style="margin-right:10px;">{capitalizeFirstLetter(Key)}:</span>
                <select data-name="{Key}" name="nodetype" id="nodetype-select" on:change={setTitle} bind:value={node.data[Key].value}>
                    {#each node.data[Key].options as Option}
                        <option value='{Option}' selected>{Option}</option>
                    {/each}
                </select>
            {:else if node.data[Key].type == 'number'}
                <span style="margin-right:10px;">{capitalizeFirstLetter(Key)}:</span>
                <input  data-name="{Key}" type='number' size="23" bind:value='{node.data[Key].value}'/>
            {:else if node.data[Key].type == 'color'}
                <span style="margin-right:10px;">{capitalizeFirstLetter(Key)}:</span>
                <input  data-name="{Key}" type='color' size="23" value='{node.data[Key].value}' on:change={changeColor}/>
            {:else if node.data[Key].type == 'file'}
                <span style="margin-right:10px;">{capitalizeFirstLetter(Key)}:</span>
                <input  data-name="{Key}" type='file' size="23" bind:value='{node.data[Key].value}' accept="image/*"/>
            {/if}
        </div>
    {/each}
         <div class="drawflow-panel-body-container-item">
            <!--CodeMirror bind:value lang={javascript()} /-->
        </div>
    <!--/!--div-->

<style>
:global(.drawflow-panel-body-container-item){
    display:flex;
    justify-content: space-between;
    margin-right: auto;
    margin-top: 2px;
}
:global(.drawflow-panel-body-container-item input){
    border:1px solid;
    padding-left: 2px;
    font-size:medium;
}
:global(.drawflow-panel-body-container-item input[type="number"]){
    border:1px solid;
    padding-left: 2px;
    font-size:medium;
}
:global(.drawflow-panel-body-container-item select){
    width: 189px;
    font-size:small;
    border:1px solid;
    padding-left: 2px;
}
</style>

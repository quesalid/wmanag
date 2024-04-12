<script lang="ts">

export let node:any ={name:'',callback:'',data:{}}
export let nodes:any = {}


const getNodeName = (id:any)=>{
    console.log("getNodeName",nodes,id)
    const keys = Object.keys(nodes)
    const found = keys.find((item:any)=>item == id)
    if(found){
        for (let i = 0; i < keys.length; i++) {
        const div = document.getElementById('title-box-' + found)
        if (div)
            return(div.innerHTML)
        }
    }
    return("NotFound")
}

const setInputMessage = (ev:any) =>{
    console.log("SET INPUT MESSAGE", ev.target)
}

const setOutputMessage = (ev:any) =>{
    console.log("SET OUTPUT MESSAGE", ev.target)
}
</script>
    
    <!--div class="drawflow-panel-body-container-class"-->
    {#if node.inputs}
    <div class='message-input-title'>Inputs
        {#each Object.keys(node.inputs) as Key}
            {#if node.inputs[Key] && node.inputs[Key].connections}
                {#each node.inputs[Key].connections as Connection}
                    <div class="drawflow-panel-body-container-message">
                        <span style="margin-right:10px;">{getNodeName(Connection.node)}:</span>
                        <input type="input" value={Connection.message?Connection.message.id:'insertmessage'} on:change={setInputMessage}/>
                    </div>
                {/each}
            {/if}
        {/each}
    </div>
    {/if}
    {#if node.outputs}
     <div class='message-input-title'>Outputs
        {#each Object.keys(node.outputs) as Key}
            {#if node.outputs[Key] && node.outputs[Key].connections}
                {#each node.outputs[Key].connections as Connection}
                    <div class="drawflow-panel-body-container-message">
                        <span style="margin-right:10px;">{getNodeName(Connection.node)}:</span>
                        <input type="input" value={Connection.message?Connection.message.id:'insertmessage'} on:change={setOutputMessage}/>
                    </div>
                {/each}
            {/if}
        {/each}
    </div>  
    {/if}
    <!--/!--div-->

<style>
.message-input-title{
    font-weight: 600;
}
:global(.drawflow-panel-body-container-message){
    display:flex;
    font-weight:normal;
    background-color: #FFFFFF;
    justify-content: space-between ;
    margin-top:3px;
    margin-left: auto;
}
:global(.drawflow-panel-body-container-message span){
    color: #666666;
    font-weight: 600;
    font-style: italic;
}
</style>

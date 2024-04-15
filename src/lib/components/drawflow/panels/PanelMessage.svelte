<script lang="ts">
import {module} from '../../../ustore.js'

export let node:any ={name:'',callback:'',data:{}}
export let nodes:any = {}


const getNodeName = (id:any)=>{
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

/*const setInputMessage = (ev:any) =>{
    const connode = ev.target.dataset.connode
    const inputkey =  ev.target.dataset.inputkey
    const type =  ev.target.dataset.type
    let found:any
    const inputs = node.inputs
    const outputs = node.outputs
    let keys:any
    let input:any
    let output:any
    let connections:any
    switch(type){
        case 'INPUT':
            keys = Object.keys(inputs)
            found = keys.find((item:any) => item == inputkey)
            input = inputs[found]
            connections = input.connections
            break;
        case 'OUTPUT':
            keys = Object.keys(outputs)
            found = keys.find((item:any) => item == inputkey)
            output = outputs[found]
            connections = output.connections
            break
    }
     console.log("SET OUTPUT MESSAGE", connode,inputkey,type,connections)
}*/

const setOutputMessage = (ev:any) =>{
    const connode = ev.target.dataset.connode
    const inputkey =  ev.target.dataset.inputkey
    const type =  ev.target.dataset.type
    let found:any
    //const inputs = node.inputs
    const outputs = node.outputs
    let keys:any
    //let input:any
    let output:any
    let connection:any
   switch(type){
        /*case 'INPUT':
            keys = Object.keys(inputs)
            found = keys.find((item:any) => item == inputkey)
            input = inputs[found]
            connections = input.connections
            break;*/
        case 'OUTPUT':
            keys = Object.keys(outputs)
            found = keys.find((item:any) => item == inputkey)
            output = outputs[found]
            connection = output.connections.find((item:any) => item.node == connode)
            if(connection){
                connection.message.value = ev.target.value
            }
            break
    }
    console.log("SET OUTPUT MESSAGE", connode,inputkey,type,connection)
}
</script>
    
    <!--div class="drawflow-panel-body-container-class"-->
    <!--
    {#if node.inputs}
    <div class='message-input-title'>Inputs
        {#each Object.keys(node.inputs) as Key}
            {#if node.inputs[Key] && node.inputs[Key].connections}
                {#each node.inputs[Key].connections as Connection}
                    <div class="drawflow-panel-body-container-message">
                        <span style="margin-right:10px;">{getNodeName(Connection.node)}:</span>
                        <input type="input" data-type={"INPUT"} data-connode={Connection.node} data-inputkey={Key} value={Connection.message?Connection.message.value:'insertmessage'} on:change={setInputMessage}/>
                    </div>
                {/each}
            {/if}
        {/each}
    </div>
    {/if}
    -->
    {#if node.outputs && $module.toUpperCase() == 'CLONE'}
     <div class='message-input-title'>Output Messages
        {#each Object.keys(node.outputs) as Key}
            {#if node.outputs[Key] && node.outputs[Key].connections}
                {#each node.outputs[Key].connections as Connection}
                    <div class="drawflow-panel-body-container-message">
                        <span style="margin-right:10px;">{getNodeName(Connection.node)}:</span>
                        <input type="input" data-type={"OUTPUT"}  data-connode={Connection.node} data-inputkey={Key} value={Connection.message?Connection.message.value:'insertmessage'} on:change={setOutputMessage}/>
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

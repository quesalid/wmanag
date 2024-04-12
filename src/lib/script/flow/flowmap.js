import FlowGraph from './flowgraph.js'
import FLOWNODE from './flownode.js'
/**
 * Get flow from graph
 * @param {any} graph
 */
export const fromGraphToFlow = (graph, name = 'currentflow') => {
    const gopts = {name:name,nodes:null,guienabled:true}
    const flow = new FlowGraph(gopts)
    const keys = Object.keys(graph.drawflow.Home.data)
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        // Here should add callback functions and messages
        // ------- Get node name from html -------
        let name = key
        const div = document.getElementById('title-box-' + keys[i])
        if (div)
            name = div.innerHTML
        const options = {
            name: name,
            id: key,
            type: graph.drawflow.Home.data[key].name,
            inputs: [],
            outputs: [],
            lookup: flow.lookup,
            callback: null,
            params: null,
            debug: true,
            guienabled:flow.guienabled
        }
        const node = new FLOWNODE.FlowNode(options)
        const inputskeys = Object.keys(graph.drawflow.Home.data[key].inputs)
        for (let j = 0; j < inputskeys.length; j++) {
            const inputkey = inputskeys[j]
            const inp = graph.drawflow.Home.data[key].inputs[inputkey]
            for (let k = 0; k < inp.connections.length; k++) {
                const split = inputkey.split('_')
                const name = split[0] + '_' + (k + 1)
                const opts = {
                    name: name, type: FLOWNODE.FlowNodeInput.PULSE, from: { id: inp.connections[k].node, port: inp.connections[k].input}, message: { id: 'nomessage' } }
                //console.log("FLOW GRAPH MAP INPUT CONNECTION", inp.connections[k], inputkey, opts)
                const input = new FLOWNODE.FlowNodeInput(opts)
                node.addInput(input)
            }
            //console.log("fromGraphToFlow input", graph.drawflow.Home.data[key].inputs[inputkey])
        }
       
        const outputskeys = Object.keys(graph.drawflow.Home.data[key].outputs)
        for (let j = 0; j < outputskeys.length; j++) {
            const outputkey = outputskeys[j]
            const out = graph.drawflow.Home.data[key].outputs[outputkey]
            const output = new FLOWNODE.FlowNodeOutput({ name: outputkey, type: FLOWNODE.FlowNodeInput.PULSE, message: { id: 'nomessage' } })
            node.addOutput(output)
            //console.log("fromGraphToFlow output", graph.drawflow.Home.data[key].outputs[outputkey])
        }
        flow.addNode(node)
    }
    // ADD to target (to) to outputs
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        // A. Get node from flow
        const found = flow.nodes.find((item) => item.id == key)
        if (found) {
            const outputskeys = Object.keys(graph.drawflow.Home.data[key].outputs)
            for (let j = 0; j < outputskeys.length; j++) {
                const outputkey = outputskeys[j]
                const out = graph.drawflow.Home.data[key].outputs[outputkey]
                // B. get output from node flow outputs
                const nodeOut = found.outputs.find((item) => item.name == outputkey)
                const outs = []
                // C. build outs array
                for (let k = 0; k < out.connections.length; k++) {
                    const conn = out.connections[k]
                    const toNode = flow.nodes.find((item) => item.id == conn.node)
                    const inputName = conn.output
                    // Check if destination node has multiple inputs
                    const toNodeInput = toNode.inputs.find((item)=> item.from.id == key)
                    if (toNode) {
                        const out = { emitter: toNode.emitter, input: toNodeInput.name, id: toNode.id }
                        outs.push(out)
                    }
                }
                // Add outs array to output
                if (nodeOut) {
                    nodeOut.to = outs
                }
            }
        }
    }
    return(flow)
}

export const resetGraph = (graph,flow,color) => {
    const keys = Object.keys(graph.drawflow.Home.data)
    // Reset graph title color
    for (let i = 0; i < keys.length; i++) {
        const div = document.getElementById('title-box-' + keys[i])
        if (div)
            div.style.backgroundColor = color
    }
    // Reset Flow status
    if (flow && flow.nodes) {
        const nodes = flow.nodes
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i]
            for (let j = 0; j < node.inputs.length; j++)
                node.inputs[j].status = false
            for (let j = 0; j < node.outputs.length; j++)
                node.outputs[j].status = false
        }
    }
}

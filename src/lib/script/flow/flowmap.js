import FlowGraph from './flowgraph.js'
import FLOWNODE from './flownode.js'
/**
 * Get flow from graph
 * @param {any} graph
 */
export const fromGraphToFlow = (graph,name='currentflow') => {
    const flow = new FlowGraph(name)
    const keys = Object.keys(graph.drawflow.Home.data)
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        // Here should add callback functions and messages
        const node = new FLOWNODE.FlowNode(key, graph.drawflow.Home.data[key].name, null, null, null, null, key)
        const inputskeys = Object.keys(graph.drawflow.Home.data[key].inputs)
        for (let j = 0; j < inputskeys.length; j++) {
            const inputkey = inputskeys[j]
            const inp = graph.drawflow.Home.data[key].inputs[inputkey]
            const input = new FLOWNODE.FlowNodeInput({ name: inputkey, type: FLOWNODE.FlowNodeInput.LATCH, message: { id: 'nomessage' } })
            node.addInput(input)
            console.log("fromGraphToFlow input", graph.drawflow.Home.data[key].inputs[inputkey])
        }
        const outputskeys = Object.keys(graph.drawflow.Home.data[key].outputs)
        for (let j = 0; j < outputskeys.length; j++) {
            const outputkey = outputskeys[j]
            const out = graph.drawflow.Home.data[key].outputs[outputkey]
            const output = new FLOWNODE.FlowNodeOutput({ name: outputkey, type: FLOWNODE.FlowNodeInput.LATCH, message: { id: 'nomessage' } })
            node.addOutput(output)
            console.log("fromGraphToFlow output", graph.drawflow.Home.data[key].outputs[outputkey])
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
                    if (toNode) {
                        const out = { emitter: toNode.emitter, input: inputName, id: toNode.id }
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
    console.log("fromGraphToFlow flow", flow)
}

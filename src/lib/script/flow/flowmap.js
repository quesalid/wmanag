import FlowGraph from './flowgraph.js'
import FLOWNODE from './flownode.js'
/**
 * Get flow from graph
 * @param {any} graph
 */
export const fromGraphToFlow = (graph,name='currentflow') => {
    const flow = new FlowGraph(name)
    console.log("fromGraphToFlow", graph.drawflow.Home.data)
    const keys = Object.keys(graph.drawflow.Home.data)
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        const node = new FLOWNODE.FlowNode(key, graph.drawflow.Home.data[key].name, null, null, null, null, key)
        flow.addNode(node)
    }
    console.log("fromGraphToFlow", flow)

}

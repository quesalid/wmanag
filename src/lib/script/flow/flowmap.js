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
        const callback = Function("return (" + graph.drawflow.Home.data[key].data.callback.value + ")")();
        let options = {
            name: name,
            id: key,
            type: graph.drawflow.Home.data[key].name,
            inputs: [],
            outputs: [],
            lookup: flow.lookup,
            callback: { value: callback, type: 'objfunction' },
            debug: true,
            guienabled:flow.guienabled
        }
        // ----------- ADD DYNAMIC  KEYS TO options ---------------------
        const datakeys = Object.keys(graph.drawflow.Home.data[key].data)
        for (let k = 0; k < datakeys.length; k++) {
            const datakey = datakeys[k]
            if (!options[datakey]) {
                //console.log("DATA KEYS ---> ", datakey, graph.drawflow.Home.data[key].data[datakey])
                options[datakey] = graph.drawflow.Home.data[key].data[datakey]
            }
        }
        // ---------------------------------------------------------------
        const node = new FLOWNODE.FlowNode(options)
        // SUBCRIBE STOP EVENT
        node.subscribe("STOP", () => {})
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
                        const outin = { emitter: toNode.emitter, input: toNodeInput.name, id: toNode.id, message: out.connections[k].message }
                        outs.push(outin)
                    }
                }
                // Add outs array to output
                if (nodeOut) {
                    nodeOut.to = outs
                }
            }
        }
    }
    console.log("FLOWMAP",flow)
    return(flow)
}

/**
 * Reset graph node title box color
 * @param {any} graph
 * @param {any} flow
 * @param {any} color
 */
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


const getFirstParent = (node) => {
    let parent
    const inputs = node.inputs
    if (inputs && inputs.length && inputs.length > 0) {
        parent = inputs[0].from.id
    }
    return parent
}
export const fromFlowToDb = async (flow) => {
    let nodes = flow.nodes
    for (let i = 0; i < nodes.length; i++) {
        const item = nodes[i].options
        const keys = Object.keys(item)
        const type = nodes[i].type
        let obj = {}
        obj.uid = item['id'] ? item['id'] : ''
        obj.lastmodified = new Date(Date.now()).toISOString()
        switch (type) {
            case 'company':
                obj.name = item['name'] ? item['name'] : ''
                obj.address = item['address'] ? item['address'].value : ''
                break;
            case 'infrastructure':
            case 'factory':
                obj.name = item['name'] ? item['name'] : ''
                obj.address = item['address'] ? item['address'].value : ''
                obj.description = item['description'] ? item['description'].value : ''
                obj.lat = item['lat'] ? item['lat'].value : 0.0
                obj.lon = item['lon'] ? item['lon'].value : 0.0
                obj.label = item['label'] ? item['label'].value : 'LBL'
                obj.color = item['color'] ? item['color'].value : '#DDDDDD'
                obj.image = item['image'] ? item['image'].value : ''
                // GET FIRST PARENT AS COMPANY
                obj.company = getFirstParent(nodes[i])
                break;
            case 'department':
            case 'area':
                obj.name = item['name'] ? item['name'] : ''
                // GET FIRST PARENT AS PLANT
                obj.plant = getFirstParent(nodes[i])
                break;
            case 'section':
            case 'line':
                obj.name = item['name'] ? item['name'] : ''
                // GET FIRST PARENT AS DEPARTMENT
                obj.department = getFirstParent(nodes[i])
                break;
            case 'machine':
                obj.name = item['name'] ? item['name'] : ''
                obj.description = item['description'] ? item['description'].value : ''
                obj.type = item['type'] ? item['type'].value : ''
                obj.manufacturer = item['manufacturer'] ? item['manufacturer'].value : ''
                obj.model = item['model'] ? item['model'].value : ''
                obj.room = item['room'] ? item['room'].value : ''
                // GET FIRST PARENT AS LINE
                obj.line = getFirstParent(nodes[i])
                break;
            case 'asset':
                obj.name = item['name'] ? item['name'] : ''
                obj.description = item['description'] ? item['description'].value : ''
                obj.type = item['type'] ? item['type'].value : ''
                obj.buildyear = item['buildyear'] ? item['buildyear'].value : ''
                // GET FIRST PARENT AS LINE
                obj.line = getFirstParent(nodes[i])
                break;
            case 'controller':
                obj.name = item['name'] ? item['name'] : ''
                obj.description = item['description'] ? item['description'].value : ''
                obj.ctype = item['ctype'] ? item['ctype'].value : ''
                obj.driver = item['driver'] ? item['driver'].value : ''
                obj.manufacturer = item['manufacturer'] ? item['manufacturer'].value : ''
                obj.model = item['model'] ? item['model'].value : ''
                obj.ip = item['ip'] ? item['ip'].value : ''
                obj.port = item['port'] ? item['port'].value : 80
                obj.mac = item['mac'] ? item['mac'].value : ''
                obj.intf = item['intf'] ? item['intf'].value : ''
                // GET FIRST PARENT AS MACHINE
                obj.machine = getFirstParent(nodes[i])
                break;
            default:
                break;
        }
        console.log("From Flow To Db", type,obj,keys)
    }
}

import { v4 as uuidv4 } from "uuid"
import FLOWNODE from './flownode.js'
import FlowLookup from './flowlookup.js' // context event list
 
class FlowGraph {
    nodes = []

    constructor(options) {
        this.id = uuidv4();
        this.name = options.name
        if (options.nodes)
            this.nodes = options.nodes // array of Flow Nodes
        else
            this.nodes = []
        this.guienabled = options.guienabled?options.guienabled: false
        this.lookup = new FlowLookup()
    }

    getNodes() {
        return this.nodes
    }

    setNodes(nodes) {
        this.nodes = nodes
    }

    getLookup() {
        return this.lookup
    }

    addNode(node) {
        const found = this.nodes.find((item) => item.id == node.id)
        if (!found) {
            // Set node lookup 
            node.lookup = this.lookup
            this.nodes.push(node)
        }
    }

    remove(nodeid) {
        this.nodes = this.nodes.filter((item) => item.id != nodeid)
    }

    fromJson(json) {
        this.id = json.id
        this.name = json.name
        const readnodes = []
        for (let i = 0; i < json.nodes.length; i++) {
            const jnode = json.nodes[i]
            const options = {
                name: jnode.name,
                id: jnode.id,
                type: jnode.type,
                inputs: [],
                outputs: [],
                lookup: this.lookup,
                callback: Function("return (" + jnode.callback + ")")(),
                params: null,
                debug: jnode.debug
            }
            const newnode = new FLOWNODE.FlowNode(options)
            // HERE - DESERIALIZE LOOKUPEVENTS
            newnode.lookupEvents = []
            for (let i = 0; i < jnode.lookupEvents.length; i++) {
                const obj = JSON.parse(jnode.lookupEvents[i], function (key, value) {
                    // if the value is a string that starts with "function", return it as a function
                    if (typeof value === "string" && value.startsWith("function")) {
                        return Function("return (" + value + ")")();
                    }
                    // if the value is a string that matches the date format, return it as a date
                    if (typeof value === "string" &&
                        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value)) {
                        return new Date(value);
                    }
                    // otherwise, return the value as it is
                    return value;
                });
                newnode.lookupEvents.push(obj)
                // subscribe to graph lookup
                newnode.subscribe(obj.ev,obj.listener)
            }
            // ADD INPUTS
            const inputs = []
            for (let k = 0; k < jnode.inputs.length; k++) {
                const inp = jnode.inputs[k]
                const input = new FLOWNODE.FlowNodeInput({ name: inp.name, type: inp.type, message: inp.message, status: inp.status })
                newnode.addInput(input)
            }
            // ADD OUTPUTS
            const outputs = []
            for (let k = 0; k < jnode.outputs.length; k++) {
                const out = jnode.outputs[k]
                const output = new FLOWNODE.FlowNodeOutput({ name: out.name, type: out.type, message: out.message, status: out.status ,to:out.to})
                newnode.addOutput(output)
            }
            readnodes.push(newnode)
        }
        // AD EMITTER TO OUPUTS
        for (let i = 0; i < readnodes.length; i++) {
            const node = readnodes[i]
            for (let k = 0; k < node.outputs.length; k++) {
                const tos = []
                const out = node.outputs[k]
                if (out.to) {
                    for (let j = 0; j < out.to.length; j++) {
                        const found = readnodes.find((item) => item.id == out.to[j].id)
                        if (found) {
                            const to = { emitter: found.emitter, input: out.to[j].input, id: out.to[j].id }
                            tos.push(to)
                        }
                    }
                    out.to = tos
                }
            }
        }
        this.nodes = readnodes
    }

    toJson() {
        let json = {}
        json.id = this.id
        json.name = this.name
        const writenodes = []
        for (let i = 0; i < this.nodes.length; i++) {
            const node = this.nodes[i]
            const wnode = {}
            wnode.id = node.id
            wnode.name = node.name
            wnode.type = node.type
            wnode.debug = node.debug
            // HERE SERIALIZE FUNCTION
            wnode.callback = node.callback.toString()
            // HERE SERIALIZE LOOKUPEVENTS
            wnode.lookupEvents = []
            for (let i = 0; i < node.lookupEvents.length; i++) {
                const item = JSON.stringify(node.lookupEvents[i], function (key, value) {
                    // if the value is a function, return its source code as a string
                    if (typeof value === "function") {
                        return value.toString();
                    }
                    // if the value is a date, return its ISO string
                    if (value instanceof Date) {
                        return value.toISOString();
                    }
                    // otherwise, return the value as it is
                    return value;
                });
                wnode.lookupEvents.push(item)
            }
            // ADD INPUTS
            const inputs = []
            for (let k = 0; k < node.inputs.length; k++) {
                const input = node.inputs[k]
                const inp = { name: input.name, type: input.type, status: input.status, message: input.message}
                inputs.push(inp)
            }
            wnode.inputs = inputs
             // ADD OUTPUTS
            const outputs = []
            for (let k = 0; k < node.outputs.length; k++) {
                const output = node.outputs[k]
                // ADD TO
                const tos = []
                for (let j = 0; k < output.to.length; k++) {
                    const t = { id: output.to[k].id, input: output.to[k].input }
                    tos.push(t)
                }
                const out = { name: output.name, type: output.type, status: output.status, message: output.message,to:tos }
                outputs.push(out)
            }
            wnode.outputs = outputs
            writenodes.push(wnode)
        }
        json.nodes = writenodes
        return(json)
    }

    start() {
        console.log("GRAPH START", this.nodes)
        const startNodes = this.nodes.filter((item) => item.type == 'start')
        for (let i = 0; i < startNodes.length; i++) {
            const node = startNodes[i]
            node.emitter.emit(FLOWNODE.FlowNode.INPUT_READY,[])
            console.log("EMITTED: ", FLOWNODE.FlowNode.INPUT_READY, "startmessage",startNodes[i].name)
        }
    }
}

export default FlowGraph
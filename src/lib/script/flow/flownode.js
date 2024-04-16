import { v4 as uuidv4 } from "uuid"
import EventEmitter from 'events'

const sleep = function (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const defaultCB = async function (inputs, outputs) {
    // Chain all input messages
    let msg = 'PASS'
    /*for (let i = 0; i < inputs.length; i++) {
        msg += ' ' + inputs[i].message.id
    }
    for (let i = 0; i < outputs.length; i++) {
        outputs[i].message.id = msg
    }*/
    // FOR TEST ONLY
    const tmout = Math.floor(Math.random() * 3000) + 400
    await sleep(tmout)
    return (msg)
}
class FlowNodeInput {
    static PULSE = 'PULSE'
    static LATCH = 'LATCH'

    constructor(input) {
        this.name = input.name
        this.type = input.type
        this.message = input.message
        this.from = input.from // this is an object {port:port,id:nodeid}
        this.status = false
    }

    getMessage() {
        return this.message
    }

    setMessage(msg) {
        this.message = msg
    }

}

class FlowNodeOutput {
    static PULSE = 'PULSE'
    static LATCH = 'LATCH'
    constructor(output) {
        this.name = output.name
        this.type = output.type
        this.message = output.message
        this.to = output.to // this is an array [{emitter:emitter,port:port,id:nodeid}]
        this.status = false
    }

    getMessage() {
        return this.message
    }

    setMessage(msg) {
        this.message = msg
    }


}


class FlowNode {
    static INPUT_EVENT = 'INPUT_EVENT'
    static INPUT_READY = 'INPUT_READY'
    static TASK_DONE = 'TASK_DONE'
    static TASK_ERROR = 'TASK_ERROR'

    inputs = []
    outputs = []
    constructor(options) {
        this.options = options
        this.name = options.name;
        if (options.id)
            this.id = options.id;
        else
            this.id = uuidv4();
        this.type = options.type
        if (options.inputs) {
            for (let i = 0; i < options.inputs.length; i++) {
                this.addInput(options.inputs[i])
            }      
        }
        if (options.outputs) {
            for (let i = 0; i < options.outputs.length; i++) {
                this.addOutput(options.outputs[i])
            }
        }
        if (options.debug)
            this.debug = options.debug
        else
            this.debug = false
        if (options.callback)
            this.callback = options.callback
        else
            this.callback = defaultCB

        if (options.lookup)
            this.lookup = options.lookup
        else
            this.lookup = null

        this.lookupEvents = []
        this.emitter = new EventEmitter();
        this.guienabled = options.guienabled ? options.guienabled:false
        this.addInputListener()
        this.addTaskListener()
        this.addOutputListener()
        this.addErrorListener()
    }

    setDebug(dbg) {
        this.debug = dbg
    }

    getDebug() {
        return this.debug
    }

    setCallback(clb) {
        this.callback = clb
    }

    getCallback() {
        return this.callback.name
    }

    getLookup() {
        return this.lookup
    }

    setLookup(lookup) {
        this.lookup = lookup
    }

    addInput(input) {
        const flowInput = new FlowNodeInput(input)
        this.inputs.push(flowInput)
    }

    addOutput(output) {
        const flowOutput = new FlowNodeOutput(output)
        this.outputs.push(flowOutput)
    }

    /* INPUT EVENT LISTENER
    * A. Receive INPUT events on inputs
    * B. Perform input BOOLEAN logic
    * C. Emit INPUT_READY event
    */
    addInputListener() {
        this.emitter.on(FlowNode.INPUT_EVENT, (message, name) => {
            //if (this.debug)
                //console.log(this.name," received INPUT_EVENT to ",name, " with message ",message)
            const input = this.inputs.find((item) => item.name == name)
            // A. Set input values
            if (input) {
                // set message
                input.message = message
                // set status
                input.status = true
            }
            // B. check if all
            for (let i = 0; i < this.inputs.length; i++) {
                if (!this.inputs[i].status)
                    return
            }
            // C. send INPUT_READY and reset input if type is PULSE
            for (let i = 0; i < this.inputs.length; i++) {
                if (this.inputs[i].type == FlowNodeInput.PULSE)
                    this.inputs[i].status = false
            }
            //if (this.debug)
                //console.log(this.name, " emitted INPUT_READY ")
            this.emitter.emit(FlowNode.INPUT_READY, this.inputs)
        })
    }

    /* INPUT_READY EVENT LISTENER
    * A. Receive INPUT_READY event
    * B. Perform Task
    * C: Emit TASK_DONE event(or TASK_ERROR event)
    */ 
    addTaskListener() {
        this.emitter.on(FlowNode.INPUT_READY, async (inputs) => {
            if (this.debug)
                console.log(this.name, " received INPUT_READY", this.name,inputs)
            try {
                // DO THE TASK - get inputs messages and sets output messages
                const result = await this.callback.value(this)
                // EMIT TASK_DONE FOR EACH OUTPUT
                for (let i = 0; i < this.outputs.length; i++) {
                    //if (this.debug)
                        //console.log(this.name, " emitted TASK_DONE to ", this.outputs[i].name, " with message ", this.outputs[i].message)
                    this.emitter.emit(FlowNode.TASK_DONE, result, this.outputs[i].name)
                    
                }
                // COLOR TITLE
                await this.setTitleColor('#AAFFAA',inputs)
            } catch (error) {
                // EMIT TASK_ERROR
                //if (this.debug)
                    //console.log(this.name, " emitted TASK_ERROR  with error ", error)
                this.emitter.emit(FlowNode.TASK_ERROR, error)
            }
        })
    }

    /* TASK_DONE EVENT LISTENER
    * A. Receive TASK_DONE event
    * B. Emit INPUT events on output nodes
    */
    addOutputListener() {
        this.emitter.on(FlowNode.TASK_DONE, async (result, name) => {
            //if (this.debug)
                //console.log(this.name, " received TASK_DONE",name,this.type)
            const output = this.outputs.find((item) => item.name == name)
            if (output) {
                // set message
                //output.message = result
                // send INPUT_EVENT to output node
                if (output.to) {
                    for (let i = 0; i < output.to.length; i++) {
                        //if (this.debug)
                            //console.log(this.name, " emitted INPUT_EVENT to   port ", output.to[i].input,"with message ", output.message)
                        output.to[i].message.result = result
                        output.to[i].emitter.emit(FlowNode.INPUT_EVENT, output.to[i].message, output.to[i].input)
                    }
                }
            }
        })
    }

    addErrorListener() {
        this.emitter.on(FlowNode.TASK_ERROR, async (error) => {
            console.log("TASK ERROR",error)
        })
    }

    subscribe(ev, handler) {
        //console.log("NODE SUBSCRIBE", ev, this.lookup)
        if (this.lookup) {
            const regitem = { id: this.id, ev: ev, emitter: this.emitter }
            this.lookup.subscribe(regitem)
            // set event handler
            this.emitter.on(ev, handler)
            // add lookup event to list if not present
            this.registerEvent(ev,handler)
        }
    }

    registerEvent(ev, handler) {
        const found = this.lookupEvents.find((item) => item.ev == ev)
        if (!found)
            this.lookupEvents.push({ ev: ev, listener: handler })
    }

    unsubscribe(ev) {
        console.log("NODE UNSUBSCRIBE", ev, this.lookup)
        if (this.lookup) {
            this.lookup.unsubscribe(this.id, ev)
            const lupev = this.lookupEvents.find((item) => item.ev == ev)
            if (lupev) {
                this.emitter.off(ev, lupev.listener)
                this.lookupEvents = this.lookupEvents.filter((item) => item.ev != ev)
            }
        }
    }

    emitContextEvent(ev,payload) {
        if (this.lookup) {
            this.lookup.emitter.emit(ev,payload)
        }
    }

    async setTitleColor(color,inputs) {
        let oldc = 'lightgrey'
        let isPulse = false
        if (inputs) {
            for (let i = 0; i < inputs.length; i++)
                if (inputs[i].type == FlowNodeInput.PULSE)
                    isPulse = true
        } 
        if (this.guienabled) {
            const div = document.getElementById('title-box-' + this.id)
            if (div) {
                oldc = div.style.backgroundColor
                div.style.backgroundColor = color
                if (isPulse) {
                    await sleep(1200)
                    div.style.backgroundColor = oldc
                }
            }
        }
    }

    
}

const FLOWNODE = {
    FlowNode,
    FlowNodeInput,
    FlowNodeOutput
}

export default FLOWNODE

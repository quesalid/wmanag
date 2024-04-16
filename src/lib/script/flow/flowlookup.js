import EventEmitter from 'events'

/**
 * regitem
 * id = node id
 * ev = event name
 * emitter = node emitter
 * listener = event listener
 */
class FlowLookup {

    constructor() {
        this.lookup = []
        this.emitter = new EventEmitter();
    }

    subscribe(r) {
        //console.log("SUBCRIBED",r)
        const listener = (payload) => {
            console.log("RECEIVED",r.id,r.ev,payload)
            // For each registered node --> propagate event
            for (let i = 0; i < this.lookup.length; i++) {
                const regitem = this.lookup[i]
                //if (r.ev == regitem.ev && regitem.id != r.id) {
                if (r.ev == regitem.ev) {
                    regitem.emitter.emit(r.ev, payload)
                }
            }
        }
        r.listener = listener
        this.lookup.push(r)
        this.emitter.on(r.ev, listener)
    }
    usubscribe(id, ev) {
        //console.log("UNSUBSCRBED", id,r)
        const r = this.lookup.find((item) => (item.id == id && item.ev == ev))
        if (r)
            this.emitter.off(r.ev, r.listener)
        this.lookup = this.lookup.filter((item) => {
            const ret = !(item.id == id && item.ev == ev)
            return(ret)
        } )
    }
}

export default FlowLookup
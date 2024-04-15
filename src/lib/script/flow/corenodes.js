// https://noderedguide.com/node-red-lecture-4-a-tour-of-the-core-nodes/
// Collection of CORE Functions for raw flow

const sleep = function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
/**
 * Pass message "PASS" - sets random delay, for graph test
 * @param {any} node
 * @returns
 */
export function defaultCB(node) {
    return new Promise(async (resolve, reject) => {
        let msg = 'PASS'
        const tmout = Math.floor(Math.random() * 3000) + 400
        const sleep = (ms) => {
            return new Promise((resolve) => { setTimeout(resolve, ms) });
        }
        await sleep(tmout)
        resolve (msg)
    })
}

/**
 * Set timout based on pram value
 * @param {any} node
 * @returns
 */
export function timerCB(node) {
    return new Promise(async (resolve, reject) => {
        console.log("timerCB --->", node.inputs, node.outputs, node.options)
        let msg = 'TIMER'
        let tmout = 2000
        if (node.options && node.options.timeout)
            tmout = node.options.timeout.value
        const sleep =  (ms) => {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        await sleep(tmout)
        resolve (msg + ' ' + tmout)
    })
}

/**
 * emit stop message ti the context
 * @param {any} node
 * @returns
 */
export function stopCB(node) {
    return new Promise(async (resolve, reject) => {
        console.log("stopCB --->", node.inputs, node.outputs, node.options)
        let msg = 'STOP'
        if (node.lookup)
            node.emitContextEvent(msg, "General Stop")
        resolve(msg)
    })
}
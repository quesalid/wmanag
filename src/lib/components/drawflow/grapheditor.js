import { v4 as uuidv4 } from 'uuid';
/**
 * NODE STRUCTURE
 * 
 * node = {name:'name',inputs:1,outputs:1,x:x,y:y,params:{},content:'html'}
 */
/**
 *  CALLED ON DROP EVENT
 * @param {any} editor
 * @param {any} node
 * @param {any} x
 * @param {any} y
 * @returns
 */
const addNodeToFlow = (editor,node,x,y) => {
    if (editor.editor_mode === 'fixed') {
        return false;
    }
    x = x * (editor.precanvas.clientWidth / (editor.precanvas.clientWidth * editor.zoom)) - (editor.precanvas.getBoundingClientRect().x * (editor.precanvas.clientWidth / (editor.precanvas.clientWidth * editor.zoom)));
    y = y * (editor.precanvas.clientHeight / (editor.precanvas.clientHeight * editor.zoom)) - (editor.precanvas.getBoundingClientRect().y * (editor.precanvas.clientHeight / (editor.precanvas.clientHeight * editor.zoom)));
    // Here adding inner HTML to node
    const uuid = uuidv4()
    // Set uuid for title-box
    const newTitleBox = '<div class="title-box" id="title-box-' + uuid + '">'
    node.content = node.content.replace('<div class="title-box">', newTitleBox)
    editor.addNode(node.name, node.inputs, node.outputs, x, y, node.name, node.params, node.content,uuid);
}

const  allowDrop = (ev) => {
    ev.preventDefault();
}


const  drop = (ev,editor) => {
    ev.preventDefault();
    var data = JSON.parse(ev.dataTransfer.getData("node"))
    addNodeToFlow(editor,data, ev.clientX, ev.clientY);
}

/**
 * DRAG EVENT
 * 
 * Tranfer node data in data-node={JSON.stringify(Node)}
 * @param {any} ev
 */
const drag = (ev) => {
    ev.dataTransfer.setData("node", ev.target.getAttribute('data-node'));
}

/**
 * Uploads file to local file system
 * @param {any} filestring file stream to upload
 * @param {any} filename default filename
 */
export const uploadFile = (filestring, filename) => {
    try {
        let textFileUrl = null;
        let fileData = new Blob([filestring], { type: 'text/plain' });
        if (textFileUrl !== null) {
            window.URL.revokeObjectURL(textFileUrl);
        }
        textFileUrl = window.URL.createObjectURL(fileData);
        var a = document.createElement("a");
        a.href = textFileUrl
        a.download = filename;
        a.click();
    } catch (error) {
        console.log(error)
    }
}

/**
 * Download json file from local file system
 * @param {any} file
 * @returns
 */
export const downloadJSON = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = event => resolve(event.target.result) // desired file content
        reader.onerror = error => reject(error)
        reader.readAsText(file)
    })
}

export const toDbData = (graph) => {
    // parse graph
    console.log("GRAPH",graph.drawflow.Home)
}


const DFEDITOR = {
    drop,
    drag,
    allowDrop,
    uploadFile,
    downloadJSON,
    toDbData
}
export default DFEDITOR

// CLICK DEVICE FUNCTIONS - SAME FOR ALL MODULES
const voidfunction = () => { return "" }
const onDeviceClickEdit = (ev) => {
    const target = ev.target
    const uid = target.getAttribute("data-uid")
    // SEND EDIT CLICKED EVENT TO MODAL
    const modalEdit = document.getElementById('DeviceInputDiv')
    const editClicked = new CustomEvent("editclicked", { detail: uid })
    modalEdit?.dispatchEvent(editClicked)
}
const onDeviceClickDelete = (ev) => {
    const target = ev.target
    const uid = target.getAttribute("data-uid")
    // SEND EDIT CLICKED EVENT TO MODAL
    const modalEdit = document.getElementById('DeleteInputDiv')
    const deleteClicked = new CustomEvent("deleteclicked", { detail: uid })
    modalEdit?.dispatchEvent(deleteClicked)
}
const onDeviceClickAgent = (ev) => {
    const target = ev.target
    const uid = target.getAttribute("data-uid")
    // SEND EDIT CLICKED EVENT TO MAIN CONFIGURATION
    const configPage = document.getElementById('main-configuration-page')
    const agentClicked = new CustomEvent("agentclicked", { detail: uid })
    configPage?.dispatchEvent(agentClicked)
}
// CLICK AGENT FUNCTION DEPEND ON MODULE
const onAgentClickDevice = (ev) => {
    /*const target = ev.target
    const uid = target.getAttribute("data-uid")
    /// SEND EDIT CLICKED EVENT TO MAIN CONFIGURATION AGENT
    const configPage = document.getElementById('main-configuration-page')
    const deleteClicked = new CustomEvent("agentclicked", { detail: uid })
    configPage?.dispatchEvent(deleteClicked)*/
}
const onAgentClickEdit = (ev) => {
    const target = ev.target
    const uid = target.getAttribute("data-uid")
    // SEND EDIT CLICKED EVENT TO MODAL
    const modalEdit = document.getElementById('AgentInputDiv')
    const editClicked = new CustomEvent("editclicked", { detail: uid })
    modalEdit?.dispatchEvent(editClicked)
}
const onAgentClickModel = (ev) => {
    const target = ev.target
    const uid = target.getAttribute("data-uid")
    // SEND EDIT CLICKED EVENT TO MAIN CONFIGURATION AGENT 
    const configPage = document.getElementById('main-configuration-agent-page')
    const modelClicked = new CustomEvent("modelclicked", { detail: uid })
    configPage?.dispatchEvent(modelClicked)
}
const onAgentClickDelete = (ev) => {
    /*const target = ev.target
    const uid = target.getAttribute("data-uid")
    // SEND EDIT CLICKED EVENT TO MODAL
    const modalEdit = document.getElementById('DeleteInputDiv')
    const deleteClicked = new CustomEvent("deleteclicked", { detail: uid })
    modalEdit?.dispatchEvent(deleteClicked)*/
}


let devicedatacolumns = [
    {
        header: 'Name',
        accessor: 'name',
    },
    {
        header: 'Description',
        accessor: 'description',
    },
    {
        header: 'Plant',
        accessor: 'plant',
    },
    {
        header: 'Type',
        accessor: 'type'
    },
    {
        header: 'OS',
        accessor: 'os'
    },
    {
        header: 'OSVER',
        accessor: 'osver'
    },
    {
        header: 'Host/IP',
        accessor: 'host',
    },
    {
        header: 'Port',
        accessor: 'port',
    },
    {
        header: 'Agents',
        accessor: voidfunction,
        renderdef: { type: 'image', params: { image: '/START.svg', onClick: onDeviceClickAgent } }
    },
    {
        header: 'Edit',
        accessor: voidfunction,
        renderdef: { type: 'image', params: { image: '/EDIT.svg', onClick: onDeviceClickEdit} }
    },
    {
        header: 'Delete',
        accessor: voidfunction,
        renderdef: { type: 'image', params: { image: '/DELETE.svg', onClick: onDeviceClickDelete } }
    }
];
// @ts-ignore
export function getDeviceColumns(module) {
    switch (module) {
        case 'data':
        case 'clone':
        case 'ai':
            return(devicedatacolumns)
            break;
        case 'learn':
            break;
        default:
            return([])
    }
}

let agentdatacolumnsData = [
    {
        header: 'Name',
        accessor: 'name',
    },
    {
        header: 'Description',
        accessor: 'description',
    },
    {
        header: 'Type',
        accessor: 'type'
    },
    {
        header: 'Source',
        accessor: (item) => item.source.name
    },
    {
        header: 'Destination',
        accessor: (item) => item.destination.name
    },
    {
        header: 'Device',
        accessor: voidfunction,
        renderdef: { type: 'image', params: { image: '/START.svg', onClick: onAgentClickDevice } }
    },
    {
        header: 'Edit',
        accessor: voidfunction,
        renderdef: { type: 'image', params: { image: '/EDIT.svg', onClick: onAgentClickEdit } }
    },
    {
        header: 'Field Edit',
        accessor: voidfunction,
        renderdef: { type: 'image', params: { image: '/MODEL.svg', onClick: onAgentClickModel } }
    },
    {
        header: 'Delete',
        accessor: voidfunction,
        renderdef: { type: 'image', params: { image: '/DELETE.svg', onClick: onAgentClickDelete } }
    }
];

let agentdatacolumnsAi = [
    {
        header: 'Name',
        accessor: 'name',
    },
    {
        header: 'Description',
        accessor: 'description',
    },
    {
        header: 'Type',
        accessor: 'type'
    },
    {
        header: 'Model',
        accessor: (item) => item.model.name
    },
    {
        header: 'Device',
        accessor: voidfunction,
        renderdef: { type: 'image', params: { image: '/START.svg', onClick: onAgentClickDevice } }
    },
    {
        header: 'Edit',
        accessor: voidfunction,
        renderdef: { type: 'image', params: { image: '/EDIT.svg', onClick: onAgentClickEdit } }
    },
    {
        header: 'Model Edit',
        accessor: voidfunction,
        renderdef: { type: 'image', params: { image: '/MODEL.svg', onClick: onAgentClickModel } }
    },
    {
        header: 'Delete',
        accessor: voidfunction,
        renderdef: { type: 'image', params: { image: '/DELETE.svg', onClick: onAgentClickDelete } }
    }
];

let agentdatacolumnsClone = [
    {
        header: 'Name',
        accessor: 'name',
    },
    {
        header: 'Description',
        accessor: 'description',
    },
    {
        header: 'Type',
        accessor: 'type'
    },
    {
        header: 'Model',
        accessor: (item) => item.model.name
    },
    {
        header: 'Device',
        accessor: voidfunction,
        renderdef: { type: 'image', params: { image: '/START.svg', onClick: onAgentClickDevice } }
    },
    {
        header: 'Edit',
        accessor: voidfunction,
        renderdef: { type: 'image', params: { image: '/EDIT.svg', onClick: onAgentClickEdit } }
    },
    {
        header: 'Model Edit',
        accessor: voidfunction,
        renderdef: { type: 'image', params: { image: '/MODEL.svg', onClick: onAgentClickModel } }
    },
    {
        header: 'Delete',
        accessor: voidfunction,
        renderdef: { type: 'image', params: { image: '/DELETE.svg', onClick: onAgentClickDelete } }
    }
];
export function getAgentColumns(module) {
    switch (module) {
        case 'data':
            return (agentdatacolumnsData)
            break;
        case 'clone':
            return (agentdatacolumnsClone)
            break;
        case 'ai':
            return (agentdatacolumnsAi)
            break;
        case 'learn':
            break;
        default:
            return ([])
    }
}

// DEVICE TEMPLATE
let deviceTemplate = {
    name: '',
    description: '',
    plant: '',
    localization: { department: 0, line: 0 },
    type: '',
    host: '',
    port: '',
    module:'',
    os: '',
    osver: '',
    userid: '',
    password: '',
    hwdetails: {
        brand: '',
        mac: '',
        model: '',
        serial: ''
    }
}

// AGENT TEMPLATES
let dataAgentTemplate = {
    uid: '',
    name: "",
    type: "",
    description: "",
    lastmodified: "",
    module: 'DATA',
    source: {
        name: "",
        timeout: 0,
        driver: "",
        server: "",
        port: "",
        username: "",
        password: "",
        options: {

        }
    },
    destination: {
        name: "",
        driver: "",
        timeout: 0,
        server: "",
        port: "",
        username: "",
        password: "",
        options: {
            
        }
    },
    dbs: [{
    }],
    devuid: '',
    status: "",
}

const aiAgentTemplate = {
    uid: '',
    name: "",
    type: "",
    description: "",
    lastmodified: "",
    module: 'AI',
    model: {
        name: "",
        path: ""
    },
    status: "",
    devuid: '',
}

const cloneAgentTemplate = {
    uid: '',
    name: "",
    type: "",
    description: "",
    lastmodified: "",
    module: 'CLONE',
    model: {
        name: "",
        path: ""
    },
    status: "",
    devuid: '',
}

const learnAgentTemplate = {
    uid: '',
    name: "",
    type: "",
    description: "",
    lastmodified: "",
    module: 'LEARN',
    model: {
        name: "",
        path: ""
    },
    status: "",
    devuid: '',
}

export const getDeviceTemplate = () => {
    return(deviceTemplate)
}

export const getAgentTemplate = (module) => {
    switch (module) {
        case 'DATA':
            return (dataAgentTemplate)
        case 'CLONE':
            return (cloneAgentTemplate)
        case 'AI':
            return (aiAgentTemplate)
        case 'LEARN':
            return(learnAgentTemplate)
    }
}
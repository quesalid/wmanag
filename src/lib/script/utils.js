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
const onDeviceClickDeploy = (ev) => {
    const target = ev.target
    const uid = target.getAttribute("data-uid")
    // SEND EDIT CLICKED EVENT TO MAIN DEPLOY
    const configPage = document.getElementById('deploy-main-container')
    const agentClicked = new CustomEvent("deployclicked", { detail: uid })
    configPage?.dispatchEvent(agentClicked)
}
const onDeviceClickDocker = (ev) => {
    const target = ev.target
    const uid = target.getAttribute("data-uid")
    // SEND EDIT CLICKED EVENT TO MAIN DEPLOY
    const configPage = document.getElementById('main-deploy-page')
    const agentClicked = new CustomEvent("dockerclicked", { detail: uid })
    configPage?.dispatchEvent(agentClicked)
}
const onDeviceClickSsh = (ev) => {
    const target = ev.target
    const uid = target.getAttribute("data-uid")
    // SEND EDIT CLICKED EVENT TO MAIN DEPLOY
    const configPage = document.getElementById('main-deploy-page')
    const agentClicked = new CustomEvent("sshclicked", { detail: uid })
    configPage?.dispatchEvent(agentClicked)
}
// CLICK AGENT FUNCTION DEPEND ON MODULE
const onAgentClickDevice = (ev) => {
    const target = ev.target
    const uid = target.getAttribute("data-uid")
    /// SEND EDIT CLICKED EVENT TO MAIN CONFIGURATION AGENT
    const configPage = document.getElementById('main-configuration-agent-page')
    const deleteClicked = new CustomEvent("deviceclicked", { detail: uid })
    configPage?.dispatchEvent(deleteClicked)
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
    const target = ev.target
    const uid = target.getAttribute("data-uid")
    // SEND EDIT CLICKED EVENT TO MODAL
    const modalEdit = document.getElementById('DeleteInputDiv')
    const deleteClicked = new CustomEvent("deleteclicked", { detail: uid })
    modalEdit?.dispatchEvent(deleteClicked)
}
// CLICK POINT FUNCTION DEPEND ON MODULE
const onDataPointClickGraph = (ev) => {
    const target = ev.target
    const uid = target.getAttribute("data-uid")
    console.log("DATA POINT GRAPH",uid)
    // SEND EDIT CLICKED EVENT TO MODAL
    const modalEdit = document.getElementById('PointChartDiv')
    const deleteClicked = new CustomEvent("chartclicked", { detail: uid })
    modalEdit?.dispatchEvent(deleteClicked)
}
const onDataPointClickEdit = (ev) => {
    const target = ev.target
    const uid = target.getAttribute("data-uid")
    // SEND EDIT CLICKED EVENT TO MODAL
    const modalEdit = document.getElementById('PointInputDiv')
    const editClicked = new CustomEvent("editclicked", { detail: uid })
    modalEdit?.dispatchEvent(editClicked)
}
const onDataPointClickDelete = (ev) => {
    const target = ev.target
    const uid = target.getAttribute("data-uid")
    // SEND EDIT CLICKED EVENT TO MODAL
    const modalEdit = document.getElementById('DeleteInputDiv')
    const deleteClicked = new CustomEvent("deleteclicked", { detail: uid })
    modalEdit?.dispatchEvent(deleteClicked)
}
// ACCESSORS

// COLUMNS DEFINITION
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

let devicedeploycolumns = [
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
        header: 'Host/IP',
        accessor: 'host',
    },
    {
        header: 'Port',
        accessor: 'port',
    },
    {
        header: 'Deploy',
        accessor: voidfunction,
        renderdef: { type: 'image', params: { image: '/DEPLOY.svg', onClick: onDeviceClickDeploy, name:'deploy' } }
    },
    {
        header: 'Docker',
        accessor: voidfunction,
        renderdef: { type: 'image', params: { image: '/DOCKER.svg', onClick: onDeviceClickDocker,name:'docker' } }
    },
    {
        header: 'SSH',
        accessor: voidfunction,
        renderdef: { type: 'image', params: { image: '/SSH.svg', onClick: onDeviceClickSsh, name:'ssh'} }
    }
];

export function getDeviceDeployColumns(module) {
    switch (module) {
        case 'data':
        case 'clone':
        case 'ai':
            return (devicedeploycolumns)
            break;
        case 'learn':
            break;
        default:
            return ([])
    }
}

let pointdatacolumns = [
    {
        header: 'Tag',
        accessor: 'tag',
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
        header: 'UM',
        accessor: 'um'
    },
    {
        header: 'Class',
        accessor: 'atype'
    },
    {
        header: 'Hlim',
        accessor: 'hlim'
    },
    {
        header: 'LLim',
        accessor: 'llim'
    },
    {
        header: 'Controller',
        accessor: 'controller'
    },
    {
        header: 'Machine',
        accessor: 'machine'
    },
    {
        header: 'Graph',
        accessor: voidfunction,
        renderdef: { type: 'image', params: { image: '/GRAPH.svg', onClick: onDataPointClickGraph } }
    },
    {
        header: 'Edit',
        accessor: voidfunction,
        renderdef: { type: 'image', params: { image: '/EDIT.svg', onClick: onDataPointClickEdit } }
    },
    {
        header: 'Delete',
        accessor: voidfunction,
        renderdef: { type: 'image', params: { image: '/DELETE.svg', onClick: onDataPointClickDelete } }
    }
];

export function getPointDatColumns(module) {
    return (pointdatacolumns)
}

/******** TEMPLATES *******/
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
        // uid:'',
        // name:''
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
// POINT TEMPLATES
const pointDataTemplate = {
    uid: '',
    tag: '',
    description: '',
    um: '',
    dtype: '',
    delta: false,
    bit: 0,
    hlim: 0.0,
    llim: 0.0,
    area: '',
    ack: false,
    numarea: 0,
    address: 0,
    amount: 1,
    atype: '',
    type: '',
    agent: '',
    device: '',
    controller: '',
    machine: '',
    db: ''
}

const pointCloneTemplate = {
    uid: '',
    tag: '',
    description: '',
    type: '',
    startdate: '',
    enddate:'',
    agent:'',
    device: '',
    controller: '',
    machine: '',
    db: ''
}

export const getDeviceTemplate = (module='DATA') => {
    switch (module) {
        case 'DATA':
        case 'CLONE':
        case 'AI':
        case 'LEARN':
            return (deviceTemplate)
    }
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

export const getPointTemplate = (module='DATA') => {
    switch (module) {
        case 'DATA':
        case 'CLONE':
        case 'AI':
        case 'LEARN':
            return (pointDataTemplate)
    }
}
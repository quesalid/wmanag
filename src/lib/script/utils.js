import { getAvatar } from '../script/apisecurity.js'
import {getMachines, getPlants } from '../script/apidataconfig.js'
// @ts-nocheck
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
    const configPage = document.getElementById('docker-main-container')
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
const onAlarmPointClickAck = (ev) => {
    /*const target = ev.target
    const uid = target.getAttribute("data-uid")
    // SEND EDIT CLICKED EVENT TO MODAL
    const modalEdit = document.getElementById('DeleteInputDiv')
    const deleteClicked = new CustomEvent("deleteclicked", { detail: uid })
    modalEdit?.dispatchEvent(deleteClicked)*/
}
const onUserClickEdit = (ev) => {
    const target = ev.target
    const uid = target.getAttribute("data-uid")
    // SEND EDIT CLICKED EVENT TO MODAL
    const modalEdit = document.getElementById('UserInputDiv')
    const editClicked = new CustomEvent("editclicked", { detail: uid })
    modalEdit?.dispatchEvent(editClicked)
}
const onUserClickDelete = (ev) => {
    const target = ev.target
    const uid = target.getAttribute("data-uid")
    // SEND EDIT CLICKED EVENT TO MODAL
    const modalEdit = document.getElementById('DeleteInputDiv')
    const deleteClicked = new CustomEvent("deleteclicked", { detail: uid })
    modalEdit?.dispatchEvent(deleteClicked)
}
const onUserClickAvatar = (ev) => {
    const target = ev.target
    const uid = target.getAttribute("data-uid")
    // SEND EDIT CLICKED EVENT TO MODAL
    const modalEdit = document.getElementById('UserAvatarDiv')
    const editClicked = new CustomEvent("editclicked", { detail: uid })
    modalEdit?.dispatchEvent(editClicked)
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
        accessor: 'controllerName'
    },
    {
        header: 'Machine',
        accessor:  'machineName'
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

let pointclonecolumns = [
    {
        header: 'Tag',
        accessor: 'tag',
    },
    {
        header: 'Description',
        accessor: 'description',
    },
    {
        header: 'Start Date',
        accessor: 'startdate'
    },
    {
        header: 'End Date',
        accessor: 'enddate'
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
export function getPointColumns(module) {
    switch (module) {
        case 'CLONE':
        case 'AI':
        case 'LEARN':
            return (pointclonecolumns)
        case 'DATA':
            return (pointdatacolumns)
    }
}

let pointdataalarmcolumns = [
    {
        header: 'Tag',
        accessor: 'tag',
    },
    {
        header: 'Description',
        accessor: 'description',
    },
    {
        header: 'Controller',
        accessor: 'controllerName'
    },
    {
        header: 'Machine',
        accessor: 'machineName'
    },
    {
        header: 'Acknowledge',
        accessor: voidfunction,
        renderdef: { type: 'image', params: { image: '/CHECK.svg', onClick: onAlarmPointClickAck } }
    }
];

export function getAlarmColumns(module) {
    switch (module) {
        case 'CLONE':
        case 'AI':
        case 'LEARN':
        case 'DATA':
            return (pointdataalarmcolumns)
    }
}

let usercolumns = [
    {
        header: 'Name',
        accessor: 'name',
    },
    {
        header: 'Surname',
        accessor: 'surname',
    },
    {
        header: 'Username',
        accessor: 'username',
    },
    {
        header: 'Role',
        accessor: 'role',
    },
    {
        header: 'Status',
        accessor: 'status'
    },
    {
        header: 'Avatar',
        accessor: (item) => item.profile.avatar,
        renderdef: { type: 'imagedynamic', params: { image: '/EDIT.svg', getimage: getAvatar,onClick: onUserClickAvatar } }
    },
    {
        header: 'Edit',
        accessor: voidfunction,
        renderdef: { type: 'image', params: { image: '/EDIT.svg', onClick: onUserClickEdit } }
    },
    {
        header: 'Delete',
        accessor: voidfunction,
        renderdef: { type: 'image', params: { image: '/DELETE.svg', onClick: onUserClickDelete } }
    }
]

export function getUserColumns() {
    return (usercolumns)
}

/******** TEMPLATES *******/
// DEVICE TEMPLATE
let deviceTemplate = {
    uid:'',
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
    device: ''
}

// USER TEMPLATE
const userTemplate = {
    uid: '',
    username: '',
    password: '',
    name: '',
    surname: '',
    permissions: [],
    role: 'USER',
    status: 'inactive',
    confitmationCode: null,
    createdAt: '',
    updatedAt: '',
    profile: {
        uid: '',
        language: 'en',
        avatar: '/AVATAR.svg',
        dashboard: []
    }
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
            return (pointDataTemplate)
        case 'AI':
        case 'LEARN':
        case 'CLONE':
            return (pointCloneTemplate)
    }
}

export const getUserTemplate = () => {
    return (userTemplate)
}

const models = ['BAYES', 'NEURALNETWORK', 'SYSDYN']


export const setConicData = (agents,devices,plants,type) => {
    const conicData = []
    let ag = []
    let label = ''
    let start = 0
    let end = 0
    // Compute conic sectors start/end
    switch (type) {
        case 'AGENTS':
            // GET TOTAL SCANNER AGENTS
            ag = agents.filter((item) => item.type == 'SCANNER')
            label = "<img src='/AVATAR.svg' alt='avatar'/>"
            break;
        case 'MODELS':
            // GET TOTAL MODEL AGENTS
            ag = agents.filter((item) => models.includes(item.type))
            label = "<img src='/BAYESGRAPH.svg' alt='model'/>"
            break;
        case 'RECORDERS':
            // GET TOTAL RECORDER AGENTS
            ag = agents.filter((item) => item.type == 'RECORDER')
            label = "<img src='/RECORDER.svg' alt='recorder'/>"
            break
        case 'PLAYERS':
            // GET TOTAL PLAYER AGENTS
            ag = agents.filter((item) => item.type == 'PLAYER')
            label = "<img src='/PLAYER.svg' alt='player'/>"
            break;
        default:
            return conicData
    }
    for (let i = 0; i < plants.length; i++) {
        // FOR EACH PLANT GET THE DEVICES ARRAY
        let dv = devices.filter((item) => item.plant == plants[i].uid)
        const itemList = dv.map(({ uid }) => uid);
        // GET TOTAL AGENTS IN PLANT
        const lag = ag.filter((item) => itemList.includes(item.devuid))
        if (lag.length > 0) {
            start = end
            const color = plants[i].color
            end = start + Math.ceil((360 * lag.length) / (ag.length))
            const conicItem = { color: '#888', bgcolor: color, start: start, end: end, label: label, sectorid: plants[i].uid }
            conicData.push(conicItem)
        }
    }
    return conicData
}

export const getClassFromColor = (color) => {
    let ret = ''
    switch (color) {
        case '#FF6188': // RED SOFT
            ret = 'bg-red-300'
            break;
        case '#B9DCCC': // BLUE SOFT
            ret = 'bg-blue-400 bg-lighten-xl'
            break;
        case '#A9DC62': // GREEN SOFT
            ret = 'bg-lime-400'
            break
        case '#E3ED63': // YELLOW SOFT
            ret = 'bg-warning-400 bg-lighten-md'
            break
        case '#C872BE': // INDIGO SOFT
            ret = 'bg-indigo-400 bg-lighten-xl'
            break
        case '#EABC63': // ORANGE SOFT
            ret = 'bg-orange-400 bg-lighten-md'
            break
        case '#49CDA8': // TEAL SOFT
            ret = 'bg-teal-400'
            break
    }
    return(ret)
}

const avatargroups = [
    [
        { icon: '/DASHBOARDCONF.svg', text: `Dashboard Conf` },
        { icon: '/SETTINGS.svg', text: `Settings` },
        { icon: '/ADMIN.svg', text: `Admin` },
    ],
    [
        { icon: '/LOGOUT.svg', text: `Logout`, link: null },
    ]
]

export const getMenuGroups = (role,module) => {
    let clone = JSON.parse(JSON.stringify(avatargroups))
    let dashboard = null
    let settings = null
    let admin = '/' + module.toLowerCase() + '/admin'
    clone[0][2].link = admin
    switch (module) {
        case 'DATA':
            clone[1][0].link = "/datalogin"
            break;
        case 'AI':
            clone[1][0].link = "/ailogin"
            break;
        case 'CLONE':
            clone[1][0].link = "/clonelogin"
            break;
        case 'LEARN':
            clone[1][0].link = "/learnlogin"
            break;
    }
    if (role != 'SADMIN')
        clone[0] = clone[0].filter((item) => item.text != 'Admin')
    return (clone)
}

export const downloadDataUrl = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = event => resolve(event.target.result) // desired file content
        reader.onerror = error => reject(error)
        reader.readAsDataURL(file)
    })
}
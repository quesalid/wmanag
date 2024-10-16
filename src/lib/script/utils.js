import { getAvatar } from '../script/apisecurity.js'
import { getFamily } from './mock.js'
import { getEntityNames } from '../ustore.js'
import { textPrefixFilter, minFilter, numberRangeFilter, matchFilter } from './filters/filters.js'

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
    const pointClicked = new CustomEvent("chartclicked", { detail: uid })
    modalEdit?.dispatchEvent(pointClicked)
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
const onClonePointClickDetail = (ev) => {
    const target = ev.target
    const uid = target.getAttribute("data-uid")
    // SEND EDIT CLICKED EVENT TO MODAL
    const modalEdit = document.getElementById('BatchDetailDiv')
    const detailClicked = new CustomEvent("detailclicked", { detail: uid })
    modalEdit?.dispatchEvent(detailClicked)
}
const onLearnPointClickDetail = (ev) => {
    const target = ev.target
    const uid = target.getAttribute("data-uid")
    // SEND EDIT CLICKED EVENT TO MODAL
    const modalEdit = document.getElementById('SynBatchDetailDiv')
    const detailClicked = new CustomEvent("detailclicked", { detail: uid })
    console.log("onLearnPointClickDetail", modalEdit)
    modalEdit?.dispatchEvent(detailClicked)
}
const onAlarmPointClickAck = (ev) => {
    const target = ev.target
    console.log("onAlarmPointClickAck", target)
    // change text style color to orange
    ev.target.style.color = 'orange'
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
const onLogClickShow = (ev) => {
    const target = ev.target
    const uid = target.getAttribute("data-uid")
    // SEND EDIT CLICKED EVENT TO MODAL
    const modalEdit = document.getElementById('LogDetailDiv')
    const logDetailClicked = new CustomEvent("logdetailclicked", { detail: uid })
    modalEdit?.dispatchEvent(logDetailClicked)
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
        header: getEntityNames(getFamily()).main.singular,
        traslated: 'mainentity',
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
    let index = -1
    switch (module) {
        case 'data':
        case 'clone':
        case 'ai':
        case 'learn':
            index = devicedatacolumns.findIndex((item) => item.traslated == 'mainentity')
            if (index > -1)
                devicedatacolumns[index].header = getEntityNames(getFamily()).main.singular
            return(devicedatacolumns)
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

let agentdatacolumnsLearn = [
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
            return (agentdatacolumnsLearn)
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
        header: getEntityNames(getFamily()).main.singular,
        traslated: 'mainentity',
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
    let index = -1
    switch (module) {
        case 'data':
        case 'clone':
        case 'ai':
            index = devicedeploycolumns.findIndex((item) => item.traslated == 'mainentity')
            if (index > -1)
                devicedeploycolumns[index].header = getEntityNames(getFamily()).main.singular
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
        accessor: 'tag'
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
        header: 'HH-lim',
        accessor: 'hhlim'
    },
    {
        header: 'H-lim',
        accessor: 'hlim'
    },
    {
        header: 'L-lim',
        accessor: 'llim'
    },
    {
        header: 'LL-Lim',
        accessor: 'lllim'
    },
    {
        header: 'Controller',
        accessor: 'controllerName',
        filterdef: { type: 'text', fn: textPrefixFilter, iv: '' }
    },
    {
        header: getEntityNames(getFamily()).controlled.singular,
        traslated: 'controlledentity',
        accessor: 'machineName',
        filterdef: { type: 'text', fn: textPrefixFilter, iv: '' }
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
        header: getEntityNames(getFamily()).main.singular,
        traslated:'mainentity',
        accessor: 'plantName',
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
        header: 'Inspect',
        accessor: voidfunction,
        renderdef: { type: 'image', params: { image: '/INSPECT.svg', onClick: onClonePointClickDetail } }
    },
    {
        header: 'Annotate',
        accessor: voidfunction,
        renderdef: { type: 'image', params: { image: '/EDIT.svg', onClick: onDataPointClickEdit } }
    }
];

let pointlearncolumns = [
    {
        header: 'Tag',
        accessor: 'tag',
    },
    {
        header: 'Description',
        accessor: 'description',
    },
    {
        header: getEntityNames(getFamily()).main.singular,
        traslated: 'mainentity',
        accessor: 'plantName',
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
        header: 'Inspect',
        accessor: voidfunction,
        renderdef: { type: 'image', params: { image: '/INSPECT.svg', onClick: onLearnPointClickDetail } }
    },
    {
        header: 'Annotate',
        accessor: voidfunction,
        renderdef: { type: 'image', params: { image: '/EDIT.svg', onClick: onDataPointClickEdit } }
    }
];
export function getPointColumns(module) {
    let index = -1
    switch (module) {
        case 'CLONE':
        case 'AI':
            index = pointclonecolumns.findIndex((item) => item.traslated == 'mainentity')
            if (index > -1)
                pointclonecolumns[index].header = getEntityNames(getFamily()).main.singular
            return (pointclonecolumns)
        case 'DATA':
            index = pointdatacolumns.findIndex((item) => item.traslated == 'controlledentity')
            if (index > -1)
                pointdatacolumns[index].header = getEntityNames(getFamily()).controlled.singular
            return (pointdatacolumns)
        case 'LEARN':
            index = pointlearncolumns.findIndex((item) => item.traslated == 'mainentity')
            if (index > -1)
                pointlearncolumns[index].header = getEntityNames(getFamily()).main.singular
            return (pointlearncolumns)
    }
}

export function getDataPointColumnReduced() {
    const reduced = pointdatacolumns.filter((item) => (item.header != 'Edit' &&
        item.header != 'Delete' &&
        item.header != 'HH-lim' &&
        item.header != 'H-lim' &&
        item.header != 'L-lim' &&
        item.header != 'LL-Lim'
    ))
    return (reduced)    
}

let pointdataalarmcolumns = [
    {
        header: 'Tag',
        accessor: 'tag',
    },
    {
        header: 'Value',
        accessor: (item) => item.lastvalue,
        renderdef: { type: 'textstyle', params: { style: 'color: red; font-weight: bold; cursor:pointer;z-index:-1; position:relative;', onClick: onAlarmPointClickAck } }
    },
    {
        header: 'Time',
        accessor: 'lasttime',
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
        header: getEntityNames(getFamily()).controlled.singular,
        traslated: 'controlledentity',
        accessor: 'machineName'
    },
    /*{
        header: 'Acknowledge',
        accessor: voidfunction,
        renderdef: { type: 'image', params: { image: '/CHECK.svg', onClick: onAlarmPointClickAck } }
    }*/
];

export function getAlarmColumns(module) {
    let index = -1
    switch (module) {
        case 'CLONE':
        case 'AI':
        case 'LEARN':
        case 'DATA':
            index = pointdataalarmcolumns.findIndex((item) => item.traslated == 'controlledentity')
            if (index > -1)
                pointdataalarmcolumns[index].header = getEntityNames(getFamily()).controlled.singular

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


let logcolumns = [
    {
        header: 'User',
        accessor: 'userId',
    },
    {
        header: 'Time',
        accessor: 'ts',
    },
    {
        header: 'Url',
        accessor: 'uri',
    },
    {
        header: 'Method',
        accessor: 'method'
    },
    {
        header: 'Command',
        accessor: (item)=> item.body.command
    },
    {
        header: 'Level',
        accessor: 'level',
    },
    {
        header: 'Status',
        accessor: 'status',
    },
    {
        header: 'Message',
        accessor: 'msg',
    },
    {
        header: 'Duration (ms)',
        accessor: 'duration',
    },
    {
        header: 'Detail',
        accessor: voidfunction,
        renderdef: { type: 'image', params: { image: '/SHOW.svg', getimage: getAvatar, onClick: onLogClickShow } }
    },
    
]

export function getLogColumns() {
    return (logcolumns)
}

let logrequestedcolumns = [
    {
        header: 'HITS',
        accessor: 'hits',
    },
    {
        header: 'Visitors',
        accessor: 'visitors',
    },
    {
        header: 'TX.Amount',
        accessor: 'amount',
    },
    {
        header: 'AV. t.s.',
        accessor: 'duration',
    },
    {
        header: 'method',
        accessor: 'method',
    },
    {
        header: 'url',
        accessor: 'url',
    }
]

export function getLogRequestedColumns() {
    return (logrequestedcolumns)
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
    hhlim: 0.0,
    lllim: 0.0,
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
    db: '',
    lastvalue: '',
    lasttime: ''
}

const pointCloneTemplate = {
    uid: '',
    tag: '',
    description: '',
    type: '',
    model:'',
    startdate: '',
    enddate:'',
    agent:'',
    device: '',
    status:''
}

const phaseCloneTemplate = {
    uid: '',
    tag: '',
    description: '',
    type: '',
    startdate: '',
    enddate: '',
    point: '',
    status: '',
    inputs: {},
    outputs: {},
    parents: [],
    children:[]
}

const taskCloneTemplate = {
    uid: '',
    tag: '',
    description: '',
    type: '',
    startdate: '',
    enddate: '',
    phase: '',
    status: '',
    inputs: {},
    outputs: {},
    parents: [],
    children: []
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
    confirmationCode: null,
    createdAt: '',
    updatedAt: '',
    profile: {
        uid: '',
        language: 'en',
        avatar: '/AVATAR.svg',
        dashboard: [
            {
                module: 'DEFAULT',
                windows: [
                    { id: 'Donut', top: '10px', left: '10px' }
                ]
            }
        ],
        map: {
            center: { lat: 30, lng: -30 },
            zoom: 1
        }
    }
}

// LOG TEMPLATE
const logTemplate = 
    {
        uid:'',
        ts: 0,
        level: "info",
        logger: "",
        msg: "",
        remote_ip: "",
        remote_port: "",
        client_ip: "",
        proto: "",
        method: "",
        body: {
            type: "api",
            version: 1.0,
            command: "",
            options: {
            },
        },
        host: "",
        uri: "",
        headers: {
            "User-Agent": [],
            "Accept": [],
            "Accept-Encoding": [],
        },
        tls: {
            resumed: false,
            version: 772,
            cipher_suite: 4865,
            proto: "",
            server_name: ""
        },
        bytesRead: 0,
        userId: "",
        duration: 0,
        size: 0,
        status: 200,
        respHeaders: {
            "Server": [],
            "Content-Encoding": [],
            "Content-Type": [],
            "Vary": []
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

export const isUserAdmin = (role) => {
    return ((role == 'ADMIN' || role == 'SADMIN'))
}

export const getLogTemplate = () => {
    return (logTemplate)
}

export const getPhaseCloneTemplate = () => {
    return (phaseCloneTemplate)
}

export const getTaskCloneTemplate = () => {
    return (taskCloneTemplate)
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
            ag = agents.filter((item) => item.type.includes('PLAYER'))
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

export const setConicDataBatch = (batch, phases, type='BATCH') => {
    const conicData = []
    let start = 0
    let end = 0
    // Compute conic sectors start/end
    for (let i = 0; i < phases.length; i++) {
        start = end
        const color = phases[i].color
        const label = "<img src='" + phases[i].image + "' alt='player'/>"
        end = start + Math.ceil((360) / (phases.length))
        const conicItem = { color: '#888', bgcolor: color, start: start, end: end, label: label, sectorid: phases[i].uid }
        conicData.push(conicItem)
    }
    return conicData
}

export const getClassFromColor = (color) => {
    let ret = 'bg-yellow-200'
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
    let dashboardconfig = '/' + module.toLowerCase() + '/dashboardconfig'
    clone[0][2].link = admin
    clone[0][0].link = dashboardconfig
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

export const logToObject = (log) => {
    let logobj = {}
    // A. Tokenize log
    const split = log.split(' ')
    logobj.uid = split[0]
    logobj.ts = split[1]
    logobj.level = split[2]
    logobj.logger = split[3]
    logobj.userId = split[4]
    logobj.msg = split[5]
    logobj.remote_ip = split[6]
    logobj.remote_port = split[7]
    logobj.proto = split[8]
    logobj.method = split[9]
    if (split[10] != '-') {
        logobj.body = JSON.parse(split[10])
    }
    else
        logobj.body = {}
    logobj.headers = JSON.parse(split[11])
    logobj.host = split[12]
    logobj.uri = split[13]
    logobj.status = split[15]
    logobj.duration = split[16]
    logobj.size = split[17]

    return(logobj)
}

export let aggregateLogs = (logs) => {
    let userids = []
    let visitors = 0
    let amount = 0
    let duration = 0
    let url = ''
    let method = 'POST'
    let command = ''
    for (let i = 0; i < logs.length; i++) {
        const isUserPresent = userids.find((item) => item == logs[i].userId)
        if (!isUserPresent) {
            visitors++
            userids.push(logs[i].userId)
        }
        amount += Number(logs[i].size)
        duration += Number(logs[i].duration)
        url = logs[i].uri
        method = logs[i].method
        if (method == 'POST') {
            command = logs[i].body.command
        }
    }
    const avgamount = logs.length > 0 ? amount / logs.length : amount
    const avgduration = logs.length > 0 ? duration / logs.length : duration
    let agLog = { hits: logs.length, visitors: visitors, url: url, command: command, amount: avgamount, duration: avgduration,method:method }
    if (logs.length > 0)
        return (agLog)
    return(null)
}

export let getCommandsFromLogs = (logs) => {
    let commands = []
    for (let i = 0; i < logs.length; i++) {
        if (logs[i].body && logs[i].body.command) {
            const isCommandPresent = commands.find((item) => item == logs[i].body.command)
            if (!isCommandPresent) {
                commands.push(logs[i].body.command)
            }
        }
    }
    return commands
}

let widgets = [
    {
        module: 'DATA', wgs: [
            { id: 'Donut', top: '0px', left: '0px', included: false },
            { id: 'Map', top: '0px', left: '0px', included: false },
            { id: 'Alarms', top: '0px', left: '0px', included: false }
        ]
    },
    {
        module: 'CLONE', wgs: [
            { id: 'Donut', top: '0px', left: '0px', included: false },
            { id: 'Map', top: '0px', left: '0px', included: false }
        ]
    },
    {
        module: 'AI', wgs: [
            { id: 'Donut', top: '0px', left: '0px', included: false }
        ]
    },
    {
        module: 'LEARN', wgs: [
            { id: 'Donut', top: '0px', left: '0px', included: false }
        ]
    }
]

export let getWidgetsByModule = (module) => {
    let moduleWidgets = []
    const found = widgets.find((item) => item.module == module)
    if (found)
        moduleWidgets = found.wgs
    return moduleWidgets
}

        
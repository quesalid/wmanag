
import { v4 as uuidv4 } from "uuid"

// **************** DATA ****************
let devices = [
    {
        uid: 'abc-1',
        name: 'DEV1-001',
        lastmodified: "2022-06-30T10:00:00",
        description: "Virtual Machine Line XY Plant Z",
        module: "DATA",
        localization: {
            plant: 1,
            department: 2,
            line: 7,
        },
        host: "SRV01-01",
        port: 3001,
        type: "VM",
        os: "MICROSOFT",
        userid: "amdin",
        password: "",
        hwdetails: {
            mac: "00:0a:4f:40:03:d0",
            brand: "DELL",
            model: "PowerEdge M640",
        },
    },
    {
        uid: 'bca-2',
        name: 'DEV2-001',
        lastmodified: "2022-06-30T10:00:00",
        description: "Edge Computer Line XY Plant Z",
        module: "DATA",
        localization: {
            plant: 1,
            department: 2,
            line: 3,
        },
        host: "192.164.0.23",
        port: 3000,
        type: "HW",
        os: "RASPI",
        userid: "",
        password: "admin",
        hwdetails: {
            mac: "00:0a:4f:40:03:d0",
            brand: "BRAINBOXES",
            model: "BB-400",
        },
    },
    {
        uid: 'abc-2-2',
        name: 'DEV2-002',
        lastmodified: "2023-05-30T10:00:00",
        description: "Edge Computer Line WY Plant Z",
        module: "DATA",
        localization: {
            plant: 1,
            department: 2,
            line: 3,
        },
        host: "10.112.1.71",
        port: 3000,
        type: "HW",
        os: "UBUNTU",
        userid: "admin",
        password: "",
        hwdetails: {
            mac: "00:0a:4f:40:03:d0",
            brand: "CISCO",
            model: "IC3000",
        },
    },
    {
        uid: 'kvz-1',
        name: 'PROCESSOR-1',
        lastmodified: "2022-06-30T10:00:00",
        description: "VMWare VM-2012-H ",
        module: "CLONE",
        localization: {
            plant: 1,
            department: 2,
            line: 7,
        },
        host: "DC-SRV-03",
        port: 3001,
        type: "VM",
        os: "MICROSOFT",
        userid: "amdin",
        password: "",
        hwdetails: {
            mac: "00:0a:4f:40:03:d0",
            brand: "DELL",
            model: "PowerEdge M640",
        },
    }
]

let agents = [
    {
        uid: 'ag-234-abc-1',
        name: "SCANNER1",
        type: "SCANNER",
        description: "Scanner agent for device DEV1-001",
        lastmodified: "2022-06-30T09:58:00",
        source: {
            name: "S7 driver test client.",
            timeout: 10,
            driver: "s7",
            server: "192.168.1.31",
            port: 102,
            username: "aiqadmin",
            password: "aiqadmin",
            options: {

            }
        },
        destination: {
            name: "MQTT SCANNER1.",
            driver: "mqtt",
            timeout: 10,
            server: "192.168.1.31",
            port: 8883,
            username: "aiqadmin",
            password: "aiqadmin",
            options: {

            }
        },
        dbs: [{
            uid: 0,
            name: "s7.csv",
        }],
        devuid: 'abc-1',
        status: "ACTIVE",
    },
    {
        uid: 'ag-234-abc-11',
        name: "SCANNER11",
        type: "SCANNER",
        description: "Scanner agent for device DEV1-001",
        lastmodified: "2022-06-30T09:58:00",
        source: {
            name: "S7 driver test client.",
            timeout: 10,
            driver: "modbus",
            server: "192.168.1.31",
            port: 102,
            username: "aiqadmin",
            password: "aiqadmin",
            options: {

            }
        },
        destination: {
            name: "MQTT SCANNER1.",
            timeout: 10,
            driver: "mqtt",
            server: "192.168.1.31",
            port: 8883,
            username: "aiqadmin",
            password: "aiqadmin",
            options: {

            }
        },
        dbs: [{
            uid: 0,
            name: "s7-1.csv"
        }],
        devuid: 'abc-1',
        status: "INACTIVE",
    },
    {
        uid: 'ag-234-hst-1',
        name: "HIST1",
        type: "HISTORIAN",
        description: "Historian agent for device DEV1-001",
        lastmodified: "2022-06-30T09:58:00",
        source: {
            name: "MQTT SCANNER1.",
            driver: "mqtt",
            timeout: 10,
            server: "192.168.1.31",
            port: 8883,
            username: "aiqadmin",
            password: "aiqadmin",
            options: {

            }
        },
        destination: {
            name: "CRATEDB SERVER.",
            driver: "craterest",
            timeout: 10,
            server: "192.168.1.31",
            port: 5432,
            username: "aiqadmin",
            password: "aiqadmin",
            options: {

            }
        },
        devuid: 'abc-1',
        status: "ACTIVE",
    },
    {
        uid: 'ag-234-abc-2',
        name: "SCANNER2",
        type: "SCANNER",
        description: "Scanner agent for device DEV2-001",
        lastmodified: "2022-06-30T09:58:00",
        source: {
            name: "MODBUS driver test client.",
            timeout: 10,
            driver: "ip",
            server: "192.168.1.31",
            port: 502,
            username: "aiqadmin",
            password: "aiqadmin",
            options: {

            }

        },
        destination: {
            name: "MQTT SCANNER2.",
            driver: "mqtt",
            timeout: 10,
            server: "192.168.1.31",
            port: 8883,
            username: "aiqadmin",
            password: "aiqadmin",
            options: {

            }
        },
        dbs: [{ uid: 0, name: "modbus.csv" }],
        status: "INACTIVE",
        devuid: 'abc-1',
    },
    {
        uid: 'ag-234-hst-2',
        name: "HIST2",
        type: "HISTORIAN",
        description: "Historian agent for device DEV2-001",
        lastmodified: "2022-06-30T09:58:00",
        source: {
            name: "MQTT SCANNER2.",
            driver: "mqtt",
            timeout: 10,
            server: "192.168.1.31",
            port: 8883,
            username: "aiqadmin",
            password: "aiqadmin",
            options: {

            }
        },
        destination: {
            name: "CRATEDB SERVER.",
            driver: "pirest",
            timeout: 10,
            server: "192.168.1.31",
            port: 5432,
            username: "aiqadmin",
            password: "aiqadmin",
            options: {

            }
        },
        devuid: 'bca-2',
        status: "INACTIVE",
    },
    {
        uid: 'ag-234-abc-4',
        name: "SCANNER3",
        type: "SCANNER",
        description: "Scanner agent for device DEV2-002",
        lastmodified: "2022-06-30T09:58:00",
        source: {
            name: "MODBUS driver test client.",
            timeout: 10,
            driver: "s7",
            server: "192.168.1.31",
            port: 502,
            username: "aiqadmin",
            password: "aiqadmin",
            options: {

            }
        },
        destination: {
            name: "MQTT SCANNER3.",
            driver: "mqtt",
            timeout: 10,
            server: "192.168.1.31",
            port: 8883,
            username: "aiqadmin",
            password: "aiqadmin",
            options: {

            }
        },
        dbs: [{ uid: 0, name: "modbus1.csv" }],
        status: "ACTIVE",
        devuid: 'abc-1',
    },
    {
        uid: 'ag-234-hst-3',
        name: "HIST3",
        type: "HISTORIAN",
        description: "Historian agent for device DEV2-002",
        lastmodified: "2022-06-30T09:58:00",
        source: {
            name: "MQTT SCANNER3.",
            driver: "mqtt",
            timeout: 10,
            server: "192.168.1.31",
            port: 8883,
            username: "aiqadmin",
            password: "aiqadmin",
            options: {

            }
        },
        destination: {
            name: "CRATEDB SERVER.",
            driver: "pirest",
            timeout: 10,
            server: "192.168.1.31",
            port: 5432,
            username: "aiqadmin",
            password: "aiqadmin",
            options: {
                dbosi: 'AN023',
                machine: 'AUT-020',
                machineprefix: 'PI_AUT_020',
                cbufsize: 200
            }
        },
        status: "ACTIVE",
        devuid: 'abc-1',
    },

]

// **************** UTILS ****************
const filterArray = (array, filters, neg = false) => {
    if (filters && filters.length) {
        for (let i = 0; i < filters.length; i++) {
            const filter = filters[i]
            switch (filter.op) {
                case "eq":
                    if (!neg)
                        array = array.filter((item) => { return item[filter.name] == filter.value })
                    else
                        array = array.filter((item) => { return item[filter.name] != filter.value })
                    break;
                case "neq":
                    if (!neg)
                        array = array.filter((item) => { return item[filter.name] != filter.value })
                    else
                        array = array.filter((item) => { return item[filter.name] == filter.value })
                    break;
                case "leq":
                    if (!neg)
                        array = array.filter((item) => { return item[filter.name] <= filter.value })
                    else
                        array = array.filter((item) => { return item[filter.name] > filter.value })
                    break;
                case "le":
                    if (!neg)
                        array = array.filter((item) => { return item[filter.name] < filter.value })
                    else
                        array = array.filter((item) => { return item[filter.name] >= filter.value })
                    break;
                case "geq":
                    if (!neg)
                        array = array.filter((item) => { return item[filter.name] >= filter.value })
                    else
                        array = array.filter((item) => { return item[filter.name] < filter.value })
                    break;
                case "gr":
                    if (!neg)
                        array = array.filter((item) => { return item[filter.name] > filter.value })
                    else
                        array = array.filter((item) => { return item[filter.name] <= filter.value })
                    break;
                case "in":
                    if (!neg)
                        array = array.filter((item) => { return item[filter.name].includes(filter.value) })
                    else
                        array = array.filter((item) => { return !item[filter.name].includes(filter.value) })
                    break;
            }
        }
    }
    return array
}

// **************** CALLS ****************
const getDevices = async function (body) {
    let retDevices = JSON.parse(JSON.stringify(devices))
    const filters = body.options.filters
    retDevices = filterArray(retDevices, filters)
    body.data = retDevices
    return (body)
}

const setDevice = async function (body) {
    const device = body.options.device
    let old = null
    if (device) {
        const existing = devices.findIndex((item) => { return item.uid == device.uid })
        if (existing > -1) {
            old = devices[existing]
            devices[existing] = device
        } else {
            devices.push(device)
        }
    }
    return old
}

const deleteDevice = async function (body) {
    const filters = body.options.filters
    devices = filterArray(devices, filters, true)
    body.data = devices
    return (body)
}

const getAgents = async function (body) {
    let retAgents = JSON.parse(JSON.stringify(agents))
    const filters = body.options.filters
    retAgents = filterArray(retAgents, filters)
    body.data = retAgents
    return (body)
}

const setAgent = async function (body) {
    const agent = body.options.agent
    let old = null
    if (agent) {
        const existing = agents.findIndex((item) => { return item.uid == agent.uid })
        if (existing > -1) {
            old = agents[existing]
            agents[existing] = agent
        } else {
            agents.push(agent)
        }
    }
    return old
}

const deleteAgent = async function (body) {
    const filters = body.options.filters
    agents = filterArray(agents, filters, true)
    body.data = agents
    return (body)
}

const CONFIG = {
    getDevices,
    setDevice,
    deleteDevice,
    getAgents,
    setAgent,
    deleteAgent
}

export default CONFIG
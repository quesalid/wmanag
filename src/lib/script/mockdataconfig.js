
import { filterArray } from './mock.js'
// **************** DATA ****************
let devices = [
    {
        uid: 'abc-1',
        name: 'DEV1-001',
        lastmodified: "2022-06-30T10:00:00",
        description: "Virtual Machine Line XY Plant Z",
        module: "DATA",
        plant: 'plant-1',
        localization: {
            department: 'dept-1',
            line: 'line-1',
        },
        host: "SRV01-01",
        port: 3001,
        type: "VM",
        os: "WIN-10",
        osver:"22H2",
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
        plant: 'plant-1',
        localization: {
            department: 2,
            line: 3,
        },
        host: "192.164.0.23",
        port: 3000,
        type: "HW",
        os: "RASPI",
        osver: "DEBIAN12",
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
        plant: 'plant-2',
        localization: {
            department: 'dept-2',
            line: 'line-2',
        },
        host: "10.112.1.71",
        port: 3000,
        type: "HW",
        os: "UBUNTU",
        osver: "18.08",
        userid: "admin",
        password: "",
        hwdetails: {
            mac: "00:0a:4f:40:03:d0",
            brand: "CISCO",
            model: "IC3000",
        },
    },
    {
        uid: 'abc-2-3',
        name: 'DEV2-003',
        lastmodified: "2023-05-30T10:00:00",
        description: "PC Computer Line WY Plant Z",
        module: "DATA",
        plant: 'plant-2',
        localization: {
            department: 'dept-2',
            line: 'lin-2',
        },
        host: "10.112.1.71",
        port: 3000,
        type: "HW",
        os: "WIN-XP",
        osver: "PRO-SP3",
        userid: "admin",
        password: "",
        hwdetails: {
            mac: "00:0a:4f:40:03:d0",
            brand: "IBM",
            model: "SC340",
        },
    },
    {
        uid: 'kvz-1',
        name: 'PROCESSOR-1',
        lastmodified: "2022-06-30T10:00:00",
        description: "VMWare VM-2012-H ",
        module: "CLONE",
        plant: 'plant-2',
        localization: {
            department: 'dept-2',
            line: 'lin-2',
        },
        host: "DC-SRV-03",
        port: 8080,
        type: "VM",
        os: "WIN-11",
        osver: "23H2",
        userid: "amdin",
        password: "",
        hwdetails: {
            mac: "00:0a:4f:40:03:d0",
            brand: "DELL",
            model: "PowerEdge M640",
        },
    },
    {
        uid: 'jhm-289-pod6',
        name: 'PROCESSOR-2',
        lastmodified: "2022-06-30T10:00:00",
        description: "VMWare VM-2012-H ",
        module: "CLONE",
        plant: 'plant-2',
        localization: {
            department: 'dept-2',
            line: 'lin-2',
        },
        host: "DC-SRV-03",
        port: 8080,
        type: "VM",
        os: "WIN-11",
        osver: "23H2",
        userid: "amdin",
        password: "",
        hwdetails: {
            mac: "00:0a:4f:40:03:d0",
            brand: "DELL",
            model: "PowerEdge M640",
        },
    },
    {
        uid: 'psvm-289-sqox6',
        name: 'MODEL-02',
        lastmodified: "2022-06-30T10:00:00",
        description: "VMWare VM-2012-H ",
        module: "AI",
        plant: 'plant-2',
        localization: {
            department: 'dept-2',
            line: 'lin-2',
        },
        host: "DC-SRV-11",
        port: 5252,
        type: "VM",
        os: "WIN-11",
        osver: "23H2",
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
        description: "Scanner for AUT-01 (abc-1)",
        lastmodified: "2022-06-30T09:58:00",
        module:'DATA',
        source: {
            name: "S7 driver plc AUT-01",
            timeout: 10,
            driver: "s7",
            server: "192.168.1.48",
            port: 102,
            username: "aiqadmin",
            password: "aiqadmin",
            options: {

            }
        },
        destination: {
            name: "MQTT CODA SCANNER1",
            driver: "mqtt",
            timeout: 10,
            server: "192.168.1.31",
            port: 8883,
            username: "aiqadmin",
            password: "aiqadmin",
            options: {
                channel: "SCANNER1",
                mqtts: true,
                clean: false,
                qos: 1
            }
        },
        dbs: [{
            uid: 0,
            name: "s7.csv",
        }],
        devuid: 'abc-1',
        status: "STOP",
    },
    {
        uid: 'ag-234-abc-11',
        name: "SCANNER11",
        type: "SCANNER",
        description: "Scanner for PREP-21 (abc-1)",
        lastmodified: "2022-06-30T09:58:00",
        module: 'DATA',
        source: {
            name: "modbus driver plc PREP-21.",
            timeout: 10,
            driver: "modbus",
            server: "192.168.1.108",
            port: 102,
            username: "aiqadmin",
            password: "aiqadmin",
            options: {

            }
        },
        destination: {
            name: "MQTT CODA SCANNER11",
            timeout: 10,
            driver: "mqtt",
            server: "192.168.1.31",
            port: 8883,
            username: "aiqadmin",
            password: "aiqadmin",
            options: {
                channel: "SCANNER11",
                mqtts: true,
                clean: false,
                qos: 1
            }
        },
        dbs: [{
            uid: 0,
            name: "modbus-1.csv"
        }],
        devuid: 'abc-1',
        status: "STOP",
    },
    {
        uid: 'ag-234-hst-1',
        name: "HIST1",
        type: "HIST",
        description: "Historian from queue SCANNER1 (abc-1)",
        lastmodified: "2022-06-30T09:58:00",
        module: 'DATA',
        source: {
            name: "MQTT SCANNER1.",
            driver: "mqtt",
            timeout: 10,
            server: "192.168.1.31",
            port: 8883,
            username: "aiqadmin",
            password: "aiqadmin",
            options: {
                channel: "SCANNER1",
                mqtts: true,
                clean: false,
                qos: 1
            }
        },
        destination: {
            name: "CRATEDB SERVER",
            driver: "craterest",
            timeout: 10,
            server: "192.204.21.12",
            port: 5432,
            username: "aiqadmin",
            password: "aiqadmin",
            options: {

            }
        },
        devuid: 'abc-1',
        status: "STOP",
    },
    {
        uid: 'ag-234-abc-2',
        name: "SCANNER2",
        type: "SCANNER",
        description: "Scanner for RMP-04 (bca-2)",
        lastmodified: "2022-06-30T09:58:00",
        module: 'DATA',
        source: {
            name: "ip/eth driver for RMP-04.",
            timeout: 10,
            driver: "ip",
            server: "192.168.1.67",
            port: 502,
            username: "aiqadmin",
            password: "aiqadmin",
            options: {

            }

        },
        destination: {
            name: "MQTT CODA SCANNER2",
            driver: "mqtt",
            timeout: 10,
            server: "192.168.1.31",
            port: 8883,
            username: "aiqadmin",
            password: "aiqadmin",
            options: {
                channel: "SCANNER2",
                mqtts: true,
                clean: false,
                qos: 1
            }
        },
        dbs: [{ uid: 0, name: "iptest.csv" }],
        status: "STOP",
        devuid: 'bca-2',
    },
    {
        uid: 'ag-234-hst-2',
        name: "HIST2",
        type: "HIST",
        description: "Historian for queue SCANNER2 (bca-2)",
        lastmodified: "2022-06-30T09:58:00",
        module: 'DATA',
        source: {
            name: "MQTT SCANNER2.",
            driver: "mqtt",
            timeout: 10,
            server: "192.168.1.31",
            port: 8883,
            username: "aiqadmin",
            password: "aiqadmin",
            options: {
                channel: "SCANNER2",
                mqtts: true,
                clean: false,
                qos: 1
            }
        },
        destination: {
            name: "OSIPI SERVER.",
            driver: "pirest",
            timeout: 10,
            server: "osi-pi-srv01",
            port: 5432,
            username: "aiqadmin",
            password: "aiqadmin",
            options: {
                dbosi: 'AN023',
                machine: 'RMP-04',
                machineprefix: 'PI_RMP_04',
                cbufsize: 200
            }
        },
        devuid: 'bca-2',
        status: "STOP",
    },
    {
        uid: 'ag-234-abc-4',
        name: "SCANNER3",
        type: "SCANNER",
        description: "Scanner for INF-07 (abc-1)",
        lastmodified: "2022-06-30T09:58:00",
        module: 'DATA',
        source: {
            name: "s7 driver for INF-07",
            timeout: 10,
            driver: "s7",
            server: "192.168.1.187",
            port: 502,
            username: "aiqadmin",
            password: "aiqadmin",
            options: {

            }
        },
        destination: {
            name: "MQTT CODA SCANNER3",
            driver: "mqtt",
            timeout: 10,
            server: "192.168.1.31",
            port: 8883,
            username: "aiqadmin",
            password: "aiqadmin",
            options: {
                channel: "SCANNER3",
                mqtts: true,
                clean: false,
                qos: 1
            }
        },
        dbs: [{ uid: 0, name: "s7-02.csv" }],
        status: "STOP",
        devuid: 'abc-1',
    },
    {
        uid: 'ag-234-hst-3',
        name: "HIST3",
        type: "HIST",
        description: "Historian from queue SCANNER3 (abc-1)",
        lastmodified: "2022-06-30T09:58:00",
        module: 'DATA',
        source: {
            name: "MQTT SCANNER3.",
            driver: "mqtt",
            timeout: 10,
            server: "192.168.1.31",
            port: 8883,
            username: "aiqadmin",
            password: "aiqadmin",
            options: {
                channel: "SCANNER3",
                mqtts: true,
                clean: false,
                qos: 1
            }
        },
        destination: {
            name: "OSIPI SERVER.",
            driver: "pirest",
            timeout: 10,
            server: "osi-pi-srv01",
            port: 5432,
            username: "aiqadmin",
            password: "aiqadmin",
            options: {
                dbosi: 'AN023',
                machine: 'INF-07',
                machineprefix: 'PI_INF_07',
                cbufsize: 200
            }
        },
        status: "STOP",
        devuid: 'abc-1',
    },
    {
        uid: 'mdl-bys-001',
        name: "BAYES01",
        type: "BAYES",
        description: "DECORTIN Pahse 1 Model",
        lastmodified: "2022-06-30T09:58:00",
        module: 'AI',
        model: {
            name: "DEC-PHASE1",
            path: "/models/bayes/DECPAHSE1.json"
        },
        status: "STOP",
        devuid: 'psvm-289-sqox6',
    },
    {
        uid: 'rec-prc-001',
        name: "REC-DEC-01",
        type: "RECORDER",
        description: "DECORTIN Pahse 1 Recorder",
        lastmodified: "2022-06-30T09:58:00",
        module: 'CLONE',
        model: {
            name: "DEC-PHASE1-REC",
            path: "/models/recorders/DECPAHSE1.json"
        },
        status: "STOP",
        devuid: 'kvz-1',
    }
]

let plants = [
    {
        uid: 'plant-1',
        name: 'PLANT-001',
        lastmodified: "2022-06-30T10:00:00",
        description: "Vallinfreda Plant",
        lat: 42.08485000,
        lon: 12.99595000,
        label: 'PL1',
        address: 'Vallinfreda, RM, Italia'
    },
    {
        uid: 'plant-2',
        name: 'PLANT-002',
        lastmodified: "2022-06-30T10:00:00",
        description: "Tusla Plant",
        lat: 36.153798,
        lon: -95.992403,
        label: 'PL2',
        address: 'Tulsa, OK, USA'
    }
]

let departments = [
    {
        uid: 'dept-1',
        name: 'DEPT-001',
        lastmodified: "2022-06-30T10:00:00",
        description: "Sterile Production",
        plant:'plant-1'
    },
    {
        uid: 'dept-2',
        name: 'DEPT-002',
        lastmodified: "2022-06-30T10:00:00",
        description: "Sterile Production New",
        plant:'plant-2'
    }
]

let lines = [
    {
        uid: 'lin-1',
        name: 'KINE-001',
        lastmodified: "2022-06-30T10:00:00",
        description: "DESALPHA Line",
        department: 'dept-1'
    },
    {
        uid: 'lin-2',
        name: 'LINE-002',
        lastmodified: "2022-06-30T10:00:00",
        description: "NOVOMIXIN Line",
        department: 'dept-2'
    }
]

let machines = [
    {
        uid: 'mach-1',
        name: "AUT-01",
        description: "Autoclave Fedegari",
        line: 'lin-1',
        type: "AUTOCLAVE",
        manufacturer: "FEDEGARI",
        model: "XFOAF7/Q253",
        room: "G041",
    },
    {
        uid: 'mach-2',
        name: "PRP-01",
        description: "Preparatore",
        line: 'lin-1',
        type: "PREPARATORE",
        manufacturer: "Intertech",
        model: "010",
        room: "G040",
    },
    {
        uid: 'mach-3',
        name: "INF-01",
        description: "Infialatrice Pharmasiena",
        line: 'lin-1',
        type: "INFIALATRICE",
        manufacturer: "PHARMASIENA",
        model: "A6-FC",
        room: "G043",
    },
    {
        uid: 'mach-4',
        name: "LIO-01",
        description: "Liofilizzatore IMA",
        line: 'lin-01',
        type: "LIOFILIZZATORE",
        manufacturer: "IMA",
        model: "LYOFAST 25",
        room: "G044",
    },
    {
        uid: 'mach-5',
        name: "ITU-01",
        description: "Test filtri Pall",
        line: 'lin-1',
        type: "FILTERTEST",
        manufacturer: "PALL",
        model: "ACQUAWIT IV",
        room: "G038",
    },
    {
        uid: 'mach-6',
        name: "STE-01",
        description: "Forno De Lama",
        line: 'lin-1',
        type: "FORNO",
        manufacturer: "DE LAMA",
        model: "DLST/L",
        room: "G041"
    },
    {
        uid: 'mach-7',
        name: "UTA-01-1",
        description: "Unita Trattamento Aria",
        line: 'lin-1',
        type: "UTA",
        manufacturer: "EMI RAD",
        model: "MXC010",
        room: "G0002",
    },
    {
        uid: 'mach-8',
        name: "AUT-02",
        description: "Autoclave Fedegari",
        line: 'lin-2',
        type: "AUTOCLAVE",
        manufacturer: "FEDEGARI",
        model: "XFOAF9/QST",
        room: "H014",
    },
    {
        uid: 'mach-9',
        name: "PRP-02",
        description: "Preparatore",
        line: 'lin-2',
        type: "PREPARATORE",
        manufacturer: "Intertech",
        model: "010",
        room: "H015",
    },
    {
        uid: 'mach-10',
        name: "INF-02",
        description: "Infialatrice Pharmasiena",
        line: 'lin-2',
        type: "INFIALATRICE",
        manufacturer: "PHARMASIENA",
        model: "A6-FC",
        room: "H028",
    },
    {
        uid: 'mach-11',
        name: "LIO-02",
        description: "Liofilizzatore IMA",
        line: 'lin-02',
        type: "LIOFILIZZATORE",
        manufacturer: "IMA",
        model: "LYOFAST 25",
        room: "H028",
    },
    {
        uid: 'mach-12',
        name: "ITU-02",
        description: "Test filtri Pall",
        line: 'lin-1',
        type: "FILTERTEST",
        manufacturer: "PALL",
        model: "ACQUAWIT IV",
        room: "H015",
    },
    {
        uid: 'mach-13',
        name: "STE-02",
        description: "Forno De Lama",
        line: 'lin-2',
        type: "FORNO",
        manufacturer: "DE LAMA",
        model: "DLST/L",
        room: "H014"
    },
    {
        uid: 'mach-14',
        name: "UTA-02-1",
        description: "Unita Trattamento Aria",
        line: 'lin-2',
        type: "UTA",
        manufacturer: "EMI RAD",
        model: "MXC010",
        room: "H-TECH",
    }
]

const controllers = [
     {
        uid: 'cntl-1',
        name: "CNTL-AUT-01",
        ctype: "",
        model: "Controller Thema4",
        machine: 'mach-1',
        manufacturer: "FEDEGARI",
        ip: "10.1.234.67",
        port: 502,
        mac: "E1:F7:2D:23:C7:3F",
        intf: "ETH",
        driver: "modbus",
    },
    {
        uid: 'cntl-2',
        name: "CNTL-PRP-01",
        ctype: "",
        model: "Controller Thema4",
        machine: "mach-2",
        manufacturer: "",
        ip: "10.1.234.69",
        port: 502,
        mac: "E1:F7:2D:23:C7:3F",
        intf: "ETH",
        driver: "modbus",
     },
     {
        uid: 'cntl-3',
        name: "CNTL-INF-01",
        ctype: "",
        model: "Controller Siemens S7 300",
        machine: "mach-3",
        manufacturer: "SIEMENS",
        ip: "10.1.234.68",
        port: 102,
        mac: "E1:F7:2D:23:C7:3F",
        intf: "ETH",
        driver: "s7",
           
    },
    {
        uid: 'cntl-4',
        name: "CNTL-LIO-01",
        ctype: "",
        model: "Controller IMA",
        machine: "mach-4",
        manufacturer: "IMA",
        ip: "10.1.234.70",
        port: 1433,
        mac: "E1:F7:2D:23:C7:3F",
        intf: "ETH",
        driver: "sql",
    },
    {
        uid: 'cntl-5',
        name: "CNTL-ITU-01",
        ctype: "",
        model: "Controller Pall",
        machine: "mach-5",
        manufacturer: "PALL",
        ip: "10.1.234.78",
        port: 502,
        mac: "E1:F7:2D:23:C7:3F",
        intf: "ETH",
        driver: "modbus",
     },
     {
        uid: 'cntl-6',
        name: "CNTL-STE-01",
        ctype: "",
        model: "Controller De Lama",
        machine: "mach-6",
        manufacturer: "DE LAMA",
        ip: "10.1.234.80",
        port: 7777,
        mac: "E1:F7:2D:23:C7:3F",
        intf: "ETH",
        driver: "delama",
    },
     {
        uid: 'cntl-7',
        name: "CNTL-UTA-01",
        ctype: "",
        model: "Controller Honeywell",
        machine: "mach-7",
        manufacturer: "HONEYWELL",
        ip: "10.1.234.90",
        port: 47808,
        mac: "E1:F7:2D:23:C7:3F",
        intf: "ETH",
        driver: "bacnet",
    },
    {
        uid: 'cntl-8',
        name: "CNTL-AUT-02",
        ctype: "",
        model: "Controller Thema4",
        machine: 'mach-8',
        manufacturer: "FEDEGARI",
        ip: "10.1.234.67",
        port: 502,
        mac: "E1:F7:2D:23:C7:3F",
        intf: "ETH",
        driver: "modbus",
    },
    {
        uid: 'cntl-9',
        name: "CNTL-PRP-02",
        ctype: "",
        model: "Controller Thema4",
        machine: "mach-9",
        manufacturer: "",
        ip: "10.1.234.69",
        port: 502,
        mac: "E1:F7:2D:23:C7:3F",
        intf: "ETH",
        driver: "modbus",
    },
    {
        uid: 'cntl-10',
        name: "CNTL-INF-02",
        ctype: "",
        model: "Controller Siemens S7 300",
        machine: "mach-10",
        manufacturer: "SIEMENS",
        ip: "10.1.234.68",
        port: 102,
        mac: "E1:F7:2D:23:C7:3F",
        intf: "ETH",
        driver: "s7",

    },
    {
        uid: 'cntl-11',
        name: "CNTL-LIO-02",
        ctype: "",
        model: "Controller IMA",
        machine: "mach-11",
        manufacturer: "IMA",
        ip: "10.1.234.70",
        port: 1433,
        mac: "E1:F7:2D:23:C7:3F",
        intf: "ETH",
        driver: "sql",
    },
    {
        uid: 'cntl-12',
        name: "CNTL-ITU-02",
        ctype: "",
        model: "Controller Pall",
        machine: "mach-12",
        manufacturer: "PALL",
        ip: "10.1.234.78",
        port: 502,
        mac: "E1:F7:2D:23:C7:3F",
        intf: "ETH",
        driver: "modbus",
    },
    {
        uid: 'cntl-13',
        name: "CNTL-STE-02",
        ctype: "",
        model: "Controller De Lama",
        machine: "mach-13",
        manufacturer: "DE LAMA",
        ip: "10.1.234.80",
        port: 7777,
        mac: "E1:F7:2D:23:C7:3F",
        intf: "ETH",
        driver: "delama",
    },
    {
        uid: 'cntl-14',
        name: "CNTL-UTA-02",
        ctype: "",
        model: "Controller Honeywell",
        machine: "mach-14",
        manufacturer: "HONEYWELL",
        ip: "10.1.234.90",
        port: 47808,
        mac: "E1:F7:2D:23:C7:3F",
        intf: "ETH",
        driver: "bacnet",
    }
]

// **************** CALLS ****************
const getDevices = async function (body) {
    let retDevices = JSON.parse(JSON.stringify(devices))
    const filters = body.options.filters
    if (filters && filters.length) {
        retDevices = filterArray(retDevices, filters)
    }
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
    if (filters && filters.length) {
        retAgents = filterArray(retAgents, filters)
    }
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

const getPlants = async function (body) {
    let retPlants = JSON.parse(JSON.stringify(plants))
    const filters = body.options.filters
    if (filters && filters.length) {
        retPlants = filterArray(retPlants, filters)
    }
    body.data = retPlants
    return (body)
}

const setPlant = async function (body) {
    const plant = body.options.plant
    let old = null
    if (plant) {
        const existing = plants.findIndex((item) => { return item.uid == plant.uid })
        if (existing > -1) {
            old = plants[existing]
            plants[existing] = plant
        } else {
            plants.push(plant)
        }
    }
    return old
}

const deletePlant = async function (body) {
    const filters = body.options.filters
    plants = filterArray(plants, filters, true)
    body.data = plants
    return (body)
}

const getDepartments = async function (body) {
    let retDepts = JSON.parse(JSON.stringify(departments))
    const filters = body.options.filters
    if (filters && filters.length) {
        retDepts = filterArray(retDepts, filters)
    }
    body.data = retDepts
    return (body)
}

const setDepartment = async function (body) {
    const department = body.options.department
    let old = null
    if (department) {
        const existing = departments.findIndex((item) => { return item.uid == department.uid })
        if (existing > -1) {
            old = departments[existing]
            departments[existing] = department
        } else {
            departments.push(department)
        }
    }
    return old
}

const deleteDepartment = async function (body) {
    const filters = body.options.filters
    departments = filterArray(departments, filters, true)
    body.data = departments
    return (body)
}

const getLines = async function (body) {
    let retLines = JSON.parse(JSON.stringify(lines))
    const filters = body.options.filters
    if (filters && filters.length) {
        retLines = filterArray(retLines, filters)
    }
    body.data = retLines
    return (body)
}

const setLine = async function (body) {
    const line = body.options.line
    let old = null
    if (line) {
        const existing = lines.findIndex((item) => { return item.uid == line.uid })
        if (existing > -1) {
            old = lines[existing]
            lines[existing] = line
        } else {
            lines.push(line)
        }
    }
    return old
}

const deleteLine = async function (body) {
    const filters = body.options.filters
    lines = filterArray(lines, filters, true)
    body.data = lines
    return (body)
}

const getMachines = async function (body) {
    let retMachines = JSON.parse(JSON.stringify(machines))
    const filters = body.options.filters
    if (filters && filters.length) {
        retMachines = filterArray(retMachines, filters)
    }
    body.data = retMachines
    return (body)
}

const setMachine = async function (body) {
    const machine = body.options.machine
    let old = null
    if (machine) {
        const existing = machines.findIndex((item) => { return item.uid == machine.uid })
        if (existing > -1) {
            old = machines[existing]
            machines[existing] = machine
        } else {
            machines.push(machine)
        }
    }
    return old
}

const deleteMachine = async function (body) {
    const filters = body.options.filters
    machines = filterArray(machines, filters, true)
    body.data = machines
    return (body)
}

const getControllers = async function (body) {
    let retControllers = JSON.parse(JSON.stringify(controllers))
    const filters = body.options.filters
    if (filters && filters.length) {
        retControllers = filterArray(retControllers, filters)
    }
    body.data = retControllers
    return (body)
}

const setController = async function (body) {
    const controller = body.options.controller
    let old = null
    if (controller) {
        const existing = controllers.findIndex((item) => { return item.uid == controller.uid })
        if (existing > -1) {
            old = controllers[existing]
            controllers[existing] = controller
        } else {
            controllers.push(controller)
        }
    }
    return old
}

const deleteController = async function (body) {
    const filters = body.options.filters
    controllers = filterArray(controllers, filters, true)
    body.data = controllers
    return (body)
}

const CONFIG = {
    getDevices,
    setDevice,
    deleteDevice,
    getAgents,
    setAgent,
    deleteAgent,
    getPlants,
    setPlant,
    deletePlant,
    getDepartments,
    setDepartment,
    deleteDepartment,
    getLines,
    setLine,
    deleteLine,
    getMachines,
    setMachine,
    deleteMachine,
    getControllers,
    setController,
    deleteController
}

export default CONFIG
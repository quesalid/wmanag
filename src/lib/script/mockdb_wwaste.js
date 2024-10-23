/**
 *  ENTITY CORRISPONDENCE
 * 
 * INDUSTRY          UTILITY            META
 * 
 * PLANT        ---> INFRASTRUCTURE --> ENTITYMAIN
 * DEPARTMENT   ---> AREA           --> ENTITYAREA
 * LINE         ---> SECTION        --> ENTITYLOCAL
 * MACHINE      ---> ELEMENT        --> ENTITYCONTROLLED
 * 
 */
import { v4 as uuidv4 } from 'uuid';
import polycurve from './polycurve.js'

// uids for devices
const uid1 = uuidv4()
const uid2 = uuidv4()
const uid3 = uuidv4()
const uid4 = uuidv4()
// uids for entities
const uidstr1 = uuidv4()
// uid for sub entities
const uiddept1 = uuidv4()
const uiddept2 = uuidv4()
// uids for lines
const uidline1 = uuidv4()
const uidline2 = uuidv4()
const uidline3 = uuidv4()
const uidline4 = uuidv4()
// uids for agents
const uidscan1 = uuidv4()
const uidhist1 = uuidv4()
const uidscan2 = uuidv4()
const uidhist2 = uuidv4()
const uidscan3 = uuidv4()
const uidhist3 = uuidv4()
const uidscan4 = uuidv4()
const uidhist4 = uuidv4()
// uids for machines
const uidmach1 = uuidv4()
const uidmach2 = uuidv4()
const uidmach3 = uuidv4()
const uidmach4 = uuidv4()
// uids for controllers
const uidcontr1 = uuidv4()
const uidcontr2 = uuidv4()
const uidcontr3 = uuidv4()
const uidcontr4 = uuidv4()
const companyid = uuidv4()


let devices = [
    {
        uid: uid1,
        name: 'RASPI-EDGE1',
        lastmodified: "2022-06-30T10:00:00",
        description: "Primary treatment 1",
        module: "DATA",
        plant: uidstr1,
        localization: {
            department: uiddept1,
            line: uidline1,
        },
        host: "192.164.0.24",
        port: 3001,
        type: "HW",
        os: "RASPI",
        osver: "DEBIAN12",
        userid: "admin",
        password: "admin",
        hwdetails: {
            mac: "00:0a:4f:40:03:d0",
            brand: "Kunbus",
            model: "Revpi connect",
        },
    },
    {
        uid: uid2,
        name: 'RASPI-EDGE1',
        lastmodified: "2022-06-30T10:00:00",
        description: "Secondary treatment 1",
        module: "DATA",
        plant: uidstr1,
        localization: {
            department: uiddept1,
            line: uidline2,
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
            brand: "Kunbus",
            model: "Revpi connect",
        },
    },
    {
        uid: uid3,
        name: 'LORA-EDGE1',
        lastmodified: "2022-06-30T10:00:00",
        description: "Primary treatment 1",
        module: "DATA",
        plant: uidstr1,
        localization: {
            department: uiddept2,
            line: uidline3,
        },
        host: "192.164.0.25",
        port: 3001,
        type: "HW",
        os: "RASPI",
        osver: "DEBIAN12",
        userid: "admin",
        password: "admin",
        hwdetails: {
            mac: "00:0a:4f:40:03:d0",
            brand: "Kunbus",
            model: "Revpi connect",
        },
    },
    {
        uid: uid4,
        name: 'LORA-EDGE1',
        lastmodified: "2022-06-30T10:00:00",
        description: "Secondary treatment 1",
        module: "DATA",
        plant: uidstr1,
        localization: {
            department: uiddept2,
            line: uidline4,
        },
        host: "192.164.0.26",
        port: 3000,
        type: "HW",
        os: "RASPI",
        osver: "DEBIAN12",
        userid: "",
        password: "admin",
        hwdetails: {
            mac: "00:0a:4f:40:03:d0",
            brand: "Kunbus",
            model: "Revpi connect",
        },
    }
]

let agents = [
    {
        uid: uidscan1,
        name: "SCANNER1",
        type: "SCANNER",
        description: "Primary 1 Line 1",
        lastmodified: "2022-06-30T09:58:00",
        module: 'DATA',
        source: {
            name: "GS4R-001",
            timeout: 10,
            driver: "gs4r",
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
            name: "gs4r-1.csv",
        }],
        devuid: uid1,
        status: "STOP",
    },
    {
        uid: uidhist1,
        name: "HIST1",
        type: "HIST",
        description: "Historian from queue SCANNER1",
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
            name: "PROXY SERVER",
            driver: "proxyrest",
            timeout: 10,
            server: "192.204.21.12",
            port: 5432,
            username: "aiqadmin",
            password: "aiqadmin",
            options: {

            }
        },
        devuid: uid1,
        status: "STOP",
    },
    {
        uid: uidscan2,
        name: "SCANNER2",
        type: "SCANNER",
        description: "Secondary 1 Line 2",
        lastmodified: "2022-06-30T09:58:00",
        module: 'DATA',
        source: {
            name: "GS4R-002",
            timeout: 10,
            driver: "gs4r",
            server: "192.168.10.121",
            port: 102,
            username: "aiqadmin",
            password: "aiqadmin",
            options: {

            }
        },
        destination: {
            name: "MQTT CODA SCANNER2",
            driver: "mqtt",
            timeout: 10,
            server: "192.168.1.33",
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
        dbs: [{
            uid: 0,
            name: "gs4r-2.csv",
        }],
        devuid: uid2,
        status: "STOP",
    },
    {
        uid: uidhist2,
        name: "HIST2",
        type: "HIST",
        description: "Historian from queue SCANNER2",
        lastmodified: "2022-06-30T09:58:00",
        module: 'DATA',
        source: {
            name: "MQTT SCANNER1.",
            driver: "mqtt",
            timeout: 10,
            server: "192.168.1.33",
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
            name: "PROXY SERVER",
            driver: "proxyrest",
            timeout: 10,
            server: "192.204.21.12",
            port: 5432,
            username: "aiqadmin",
            password: "aiqadmin",
            options: {

            }
        },
        devuid: uid2,
        status: "STOP",
    },
    {
        uid: uidscan3,
        name: "SCANNER3",
        type: "SCANNER",
        description: "Primary 2 Line 3",
        lastmodified: "2022-06-30T09:58:00",
        module: 'DATA',
        source: {
            name: "GS4R-002",
            timeout: 10,
            driver: "gs4r",
            server: "192.168.10.67",
            port: 102,
            username: "aiqadmin",
            password: "aiqadmin",
            options: {

            }
        },
        destination: {
            name: "MQTT CODA SCANNER3",
            driver: "mqtt",
            timeout: 10,
            server: "192.168.1.33",
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
        dbs: [{
            uid: 0,
            name: "gs4r-2.csv",
        }],
        devuid: uid3,
        status: "STOP",
    },
    {
        uid: uidhist3,
        name: "HIST3",
        type: "HIST",
        description: "Historian from queue SCANNER3",
        lastmodified: "2022-06-30T09:58:00",
        module: 'DATA',
        source: {
            name: "MQTT SCANNER3.",
            driver: "mqtt",
            timeout: 10,
            server: "192.168.1.33",
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
            name: "PROXY SERVER",
            driver: "proxyrest",
            timeout: 10,
            server: "192.204.21.12",
            port: 5432,
            username: "aiqadmin",
            password: "aiqadmin",
            options: {

            }
        },
        devuid: uid3,
        status: "STOP",
    },
    {
        uid: uidscan4,
        name: "SCANNER4",
        type: "SCANNER",
        description: "Seconday 2 Line 4",
        lastmodified: "2022-06-30T09:58:00",
        module: 'DATA',
        source: {
            name: "GS4R-004",
            timeout: 10,
            driver: "gs4r",
            server: "192.168.10.85",
            port: 102,
            username: "aiqadmin",
            password: "aiqadmin",
            options: {

            }
        },
        destination: {
            name: "MQTT CODA SCANNER4",
            driver: "mqtt",
            timeout: 10,
            server: "192.168.1.33",
            port: 8883,
            username: "aiqadmin",
            password: "aiqadmin",
            options: {
                channel: "SCANNER4",
                mqtts: true,
                clean: false,
                qos: 1
            }
        },
        dbs: [{
            uid: 0,
            name: "gs4r-2.csv",
        }],
        devuid: uid4,
        status: "STOP",
    },
    {
        uid: uidhist3,
        name: "HIST4",
        type: "HIST",
        description: "Historian from queue SCANNER4",
        lastmodified: "2022-06-30T09:58:00",
        module: 'DATA',
        source: {
            name: "MQTT SCANNER4.",
            driver: "mqtt",
            timeout: 10,
            server: "192.168.1.33",
            port: 8883,
            username: "aiqadmin",
            password: "aiqadmin",
            options: {
                channel: "SCANNER4",
                mqtts: true,
                clean: false,
                qos: 1
            }
        },
        destination: {
            name: "PROXY SERVER",
            driver: "proxyrest",
            timeout: 10,
            server: "192.204.21.12",
            port: 5432,
            username: "aiqadmin",
            password: "aiqadmin",
            options: {

            }
        },
        devuid: uid4,
        status: "STOP",
    }
]

let companies = [
    {
        uid: companyid,
        name: 'COMP s.p.a.',
        address: 'via Roma 45, MI',
        lastmodified: "2022-06-30T10:00:00",
    }

]

let mainentities = [
    {
        uid: uidstr1,
        name: 'Depuratore A',
        company: companyid,
        lastmodified: "2022-06-30T10:00:00",
        description: "Depuratore quadrante nord",
        lat: 41.9636,
        lon: 12.4975,
        image: 'RFI-002.jpg',
        geojson: [
            {id:'',area:'',local:'',path:[]}
        ],
        label: 'DEP',
        address: 'Roma,IT',
        color: '#FF6188', // RED SOFT
    }
]

let areaentities = [
    {
        uid: uiddept1,
        name: 'LINEA-DEP-001',
        lastmodified: "2022-06-30T10:00:00",
        description: "Linea Depurazione 1.",
        plant: uidstr1
    },
    {
        uid: uiddept2,
        name: 'LINEA-DEP-002',
        lastmodified: "2022-06-30T10:00:00",
        description: "Linea Depurazione 2",
        plant: uidstr1
    },
]

let localentities = [
    {
        uid: uidline1,
        name: 'LINE-001-01',
        lastmodified: "2022-06-30T10:00:00",
        description: "Trattamento primario Linea 1",
        department: uiddept1
    },
    {
        uid: uidline2,
        name: 'LINE-001-02',
        lastmodified: "2022-06-30T10:00:00",
        description: "Trattamento secondario Linea 1",
        department: uiddept1
    },
    {
        uid: uidline3,
        name: 'LINE-002-01',
        lastmodified: "2022-06-30T10:00:00",
        description: "Trattamento primario Linea 2",
        department: uiddept1
    },
    {
        uid: uidline4,
        name: 'LINE-002-02',
        lastmodified: "2022-06-30T10:00:00",
        description: "Trattamento secondario Linea 2",
        department: uiddept1
    },
]

let controlledentities = [
    {
        uid: uidmach1,
        name: "PRIMARIO-001",
        description: "Linea trattamento primaria",
        line: uidline1,
        type: "BRIDGE",
        buildyear: "1952",
        agent: uidscan1,
        lastmodified: "2022-06-30T10:00:00",
        localization: {
            lat: 41.96492,
            lon: 12.50021,
        }
    },
    {
        uid: uidmach2,
        name: "SECONDARIO-001",
        description: "Linea trattamento secondaria",
        line: uidline2,
        type: "TUNNEL",
        buildyear: "1921",
        agent: uidscan2,
        lastmodified: "2022-06-30T10:00:00",
        localization: {
            lat: 41.96481,
            lon: 12.49707,
        }
    },
    {
        uid: uidmach3,
        name: "PRIMaRIO-002",
        description: "Linea trattamento Primaria",
        line: uidline3,
        type: "TUNNEL",
        buildyear: "1921",
        agent: uidscan3,
        lastmodified: "2022-06-30T10:00:00",
        localization: {
            lat: 41.96259,
            lon: 12.49945,
        }
    },
    {
        uid: uidmach4,
        name: "SECONDARIO-002",
        description: "Linea trattamento secondaria",
        line: uidline4,
        type: "TUNNEL",
        buildyear: "1921",
        agent: uidscan4,
        lastmodified: "2022-06-30T10:00:00",
        localization: {
            lat: 41.96314,
            lon: 12.49631,
        }
    },
]

let controllers = [
    {
        uid: uidcontr1,
        name: "CNTL-PRM-01",
        ctype: "",
        model: "SCADA GE",
        machine: uidmach1,
        manufacturer: "Jointech",
        ip: "10.1.234.67",
        port: 502,
        mac: "E1:F7:2D:23:C7:3F",
        intf: "ETHERNET",
        driver: "sql",
        lastmodified: "2022-06-30T10:00:00",
    },
    {
        uid: uidcontr2,
        name: "CNTL-SEC-01",
        ctype: "",
        model: "SCADA GE",
        machine: uidmach2,
        manufacturer: "Jointech",
        ip: "10.1.234.67",
        port: 502,
        mac: "E1:F7:2D:23:C7:3F",
        intf: "ETHERNET",
        driver: "sql",
        lastmodified: "2022-06-30T10:00:00",

    },
    {
        uid: uidcontr3,
        name: "CNTL-PRM-02",
        ctype: "",
        model: "SCADA GE",
        machine: uidmach3,
        manufacturer: "Jointech",
        ip: "10.1.234.67",
        port: 502,
        mac: "E1:F7:2D:23:C7:3F",
        intf: "ETHERNET",
        driver: "sql",
        lastmodified: "2022-06-30T10:00:00",
    },
    {
        uid: uidcontr4,
        name: "CNTL-SEC-02",
        ctype: "",
        model: "SCADA GE",
        machine: uidmach4,
        manufacturer: "Jointech",
        ip: "10.1.234.67",
        port: 502,
        mac: "E1:F7:2D:23:C7:3F",
        intf: "ETHERNET",
        driver: "sql",
        lastmodified: "2022-06-30T10:00:00",

    },
]

let alarmhists = []

// DATA POINT GENERATION
function randomTDUABD(length) {
    const pre = [
        'TT-',
        'RPM-',
        'HH-',
        "FL-",
        "AL-T-",
        "AL-RPM-",
        "AL-H-",
        "AL-FL-",
        "EV-T-",
        "EV-RMP-",
        "EV-H-",
        "EV-FL-",
    ]
    const desc = [
        "Temperature measure",
        "Rotational speed",
        "Humidity measure",
        "Flow measure",
        "Temperature alarm",
        "Rotational speed alarm",
        "Humidity alarm",
        "Flow alarm",
        "Temperature set event",
        "Rotational speed set event",
        "Humidity set event",
        "Flow set event",
    ]

    const um = [
        'DEGC',
        'RPM',
        "%",
        "L/min",
        'ON/OFF',
        'ON/OFF',
        'ON/OFF',
        'ON/OFF',
        'ON/OFF',
        'ON/OFF',
        'ON/OFF',
        'ON/OFF',
    ]

    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const charactersLength = characters.length;
    let counter = 0;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    const index = Math.floor(Math.random() * pre.length)
    let atype = 'ANALOG'
    let dtype = 'real'
    let bit = "0"
    const tag = pre[index] + result
    if (pre[index].includes('AL-')) {
        bit = String(Math.floor(Math.random() * 16))
        atype = 'ALARM'
        dtype = 'bool'
    }
    if (pre[index].includes('EV-')) {
        bit = String(Math.floor(Math.random() * 16))
        atype = 'EVENT'
        dtype = 'bool'
    }
    return [tag, desc[index], um[index], atype, bit, dtype]

}

function getPointType(tag) {
    let ret = ''
    const pre = tag.substring(0, 3)
    switch (pre) {
        case 'TT-':
            ret = 'TEMPERATURE'
            break;
        case 'RPM-':
            ret = 'SPEED'
            break;
        case 'HH-':
            ret = 'HUMIDITY'
            break;
        case 'FL-':
            ret = 'FLOW'
        case 'AL-':
            ret = 'ALARM'
            break;
        case 'EV-':
            ret = 'EVENT'
            break;
    }
    return (ret)
}

function getPointLims(type) {
    let hlim = 0.0
    let llim = 0.0
    let hhlim = 0.0
    let lllim = 0.0
    switch (type) {
        case 'TEMPERATURE':
            llim = Math.floor(Math.random() * 1) - 10.0
            hlim = Math.floor(Math.random() * 10) + 200.0
            hhlim = hlim + 10
            lllim = llim - 10
            break;
        case 'STRESS':
            llim = Math.floor(Math.random()) 
            hlim = Math.floor(Math.random() * 100) + 30.0
            hhlim = hlim + 10
            lllim = llim
            break;
        case 'HUMIDITY':
            llim = Math.floor(Math.random() * 10) + 30.0
            hlim = Math.floor(Math.random() * 10) + 85.0
            hhlim = hlim + 10
            lllim = llim - 10
            break;
        default:
            llim = 'N.A.'
            hlim = 'N.A.'
            hhlim = 'N.A.'
            lllim = 'N.A.'
            break;
    }
    return [hhlim,hlim, llim,lllim]
}

function makeDataPointsUid(driver, agent, device, controller, machine, db, lon,lat,num = 30) {
    const points = []
    for (let i = 0; i < num; i++) {
        const point = {
            uid: uuidv4(),
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
            agent: agent,
            device: device,
            controller: controller,
            machine: machine,
            lon: lon,
            lat: lat,
            db: db,
            lastvalue: "",
            lasttime: "",
        }
        const [tag, desc, um, atype, bit, dtype] = randomTDUABD(5)
        point.tag = tag
        point.module = 'DATA'
        point.description = desc
        point.um = um
        point.atype = atype
        point.dtype = dtype
        point.bit = Number(bit)
        point.type = getPointType(tag)
        const [hhlim,hlim, llim,lllim] = getPointLims(point.type)
        point.hlim = hlim
        point.llim = llim
        point.hhlim = hhlim
        point.lllim = lllim
        switch (driver) {
            case 's7':
                point.area = 'DB'
                point.numarea = Math.floor(Math.random() * 8)
                point.address = Math.floor(Math.random() * 40000)
                break;
            case 'modbus':
                if (point.atype == 'DIGITAL' || point.atype == 'ALARM' || point.atype == 'EVENT')
                    point.area = 'COIL'
                else
                    point.area = 'INPUT'
                point.numarea = 0
                point.address = Math.floor(Math.random() * 40000)
                break;
            default:
                point.area = 'NA'
                point.numarea = 0
                point.address = 0
                break
        }
        // generate last value
        if (point.atype == 'DIGITAL' || point.atype == 'ALARM' || point.atype == 'EVENT') {
            point.lastvalue = Math.floor(Math.random() * 2) == 0 ? 'OFF' : 'ON'
        } else {
            switch (point.type) {
                case 'TEMPERATURE':
                case 'STRESS':
                case 'HUMIDITY':
                case 'SPEED':
                case 'CURRENT':
                case 'VOLTAGE':
                case 'FLOW':
                    point.lastvalue = (Math.random() * (hlim - llim) + llim).toFixed(2)
                    break;
                case 'NUMBER':
                    point.lastvalue = Math.floor(Math.random() * 10)
                    break;
                default:
                    point.lastvalue = 'N.A.'
                    break;
            }
        }
        const now = Date.now()
        const start = new Date("2023-01-01")
        const newdate1 = new Date(start.getTime() + Math.random() * (now - start.getTime()));
        point.lasttime = newdate1.toISOString().split('Z')[0]
        // if point is alarm and exist another alarm with the same lon-lat not add to array
        const found = points.find((item) => (item.lon == lon && item.lat == lat && item.atype == 'ALARM'))
        if(!found)
            points.push(point)
    }
    return points
}


const generateDataPoints = () => {
    const array = []
    const dataAgents = agents.filter((item) => item.module == 'DATA')
    for (let i = 0; i < dataAgents.length; i++) {
        if (dataAgents[i].type == 'SCANNER') {
            const agentuid = dataAgents[i].uid
            const devuid = dataAgents[i].devuid
            const driver = dataAgents[i].source.driver
            // GET MACHINESFROM AGENTS
            const agMachines = controlledentities.filter((item) => item.agent == dataAgents[i].uid)
            // PICK ONE MACHINE AT RANDOM
            const index = Math.floor(Math.random() * agMachines.length)
            const machine = agMachines[index]
            const muid = machine.uid
            const lon = machine.localization? machine.localization.lon: null
            const lat = machine.localization? machine.localization.lat: null
            // GET CONTROLLER FOR MACHINE
            const cltrs = controllers.filter((item) => item.machine == muid)
            let cuid = ''
            if (cltrs.length > 0)
                cuid = cltrs[0].uid
            const index2 = Math.floor(Math.random() * dataAgents[i].dbs.length)
            const dbuid = dataAgents[i].dbs[index2].uid
            const points = makeDataPointsUid(driver, agentuid, devuid, cuid, muid, dbuid,lon,lat)
            array.push.apply(array, points)
        }
    }

    return array
}

const getTSValue = (type, min, max) => {
    let val = 0
    switch (type) {
        case 'DIGITAL':
        case 'ALARM':
        case 'EVENT':
            val = Math.random() < 0.8 ? 0 : 1
            break;
        case 'ANALOG':
            val = (Math.random() * max / 2) + min
            break;
    }
    return (val)
}

const MAXSERIES = 1000
const TICK = 5

const generateTimeSeriesPoly = (point, num, DEGREE = 5) => {
    if (num == null || num > MAXSERIES)
        num = MAXSERIES
    const timeSeries = []
    const xCoords = []
    const yCoords = []
    // A. GENERATE INTERPOLATION POINT
    for (let i = 0; i < DEGREE; i++) {
        const y = getTSValue(point.atype, point.lllim, point.hhlim)
        const x = num * (i / DEGREE)
        xCoords.push(x)
        yCoords.push(y)
    }
    // B. GENERATE CURVE POINT
    const curve = polycurve.polynomialCurveFitting(xCoords, yCoords, num, DEGREE)
    // C. RETURN TIMESERIES
    const end = Date.now()
    const start = end - TICK * 1000 * num
    for (let i = 0; i < curve.length; i++) {
        const step = start + curve[i][1] * TICK * 1000
        const item = { tag: point.tag, value: curve[i][1], timestamp: step }
        if (item.value >= (point.llim * 0.9) && item.value <= (point.hlim * 1.1))
            timeSeries.push(item)
    }

    return timeSeries
}

const generateTimeSeriesRect = (point, num, DEGREE = 5) => {
    if (num == null || num > MAXSERIES)
        num = MAXSERIES
    const timeSeries = []
    const xCoords = []
    const yCoords = []
    // A. GENERATE INTERPOLATION POINT
    for (let i = 0; i < DEGREE; i++) {
        const y = getTSValue(point.atype, point.llim, point.hlim)
        const x = num * (i / DEGREE)
        xCoords.push(x)
        yCoords.push(y)
    }
    let curve = []
    for (let j = 0; j < num; j++) {
        let index = Math.floor(j * DEGREE / num)
        const value = yCoords[index]
        const item = [value, j]
        curve.push(item)
    }
    // C. RETURN TIMESERIES
    const end = Date.now()
    const start = end - TICK * 1000 * num
    for (let i = 0; i < curve.length; i++) {
        const step = start + curve[i][1] * TICK * 1000
        const item = { tag: point.tag, value: curve[i][0], timestamp: step }

        timeSeries.push(item)
    }
    return timeSeries
}

const generateAlarmHistories = () => {
    /*
    AlarmHist structure
    {
        uid: '', // uuidv4
        tag: '', // tag of the alarm
        status: '', // ACK, ON, SUS, DRP
        action: '', // ACNOWLEDGE, RESUME, DROP, SEND
        timestamp: '', // timestamp of the action
        operator: '', // operator uid that perform the action
        note: '', // note of the action
    }
    */
    return alarmhists
}

const DBINFASTRUCTURE = {
    companies,
    devices,
    agents,
    mainentities,
    areaentities,
    localentities,
    controlledentities,
    controllers,
    generateTimeSeriesPoly,
    generateTimeSeriesRect,
    generateDataPoints,
    generateAlarmHistories
}

export default DBINFASTRUCTURE
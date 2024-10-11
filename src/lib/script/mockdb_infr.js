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

const uid1 = uuidv4()
const uid2 = uuidv4()
const uidstr1 = uuidv4()
const uidstr2 = uuidv4()
const uiddept1 = uuidv4()
const uiddept2 = uuidv4()
const uidline1 = uuidv4()
const uidline2 = uuidv4()
const uidscan1 = uuidv4()
const uidhist1 = uuidv4()
const uidscan2 = uuidv4()
const uidhist2 = uuidv4()
const uidmach1 = uuidv4()
const uidmach2 = uuidv4()
const uidcontr1 = uuidv4()
const uidcontr2 = uuidv4()
const companyid = uuidv4()


let devices = [
    {
        uid: uid1,
        name: 'LORA-EDGE1',
        lastmodified: "2022-06-30T10:00:00",
        description: "Bridge Monitoring Edge",
        module: "DATA",
        plant: uidstr1,
        localization: {
            department: uiddept1,
            line: uidline1,
        },
        host: "SRV01-01",
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
        name: 'LORA-EDGE1',
        lastmodified: "2022-06-30T10:00:00",
        description: "Tunnel monitoring Edge",
        module: "DATA",
        plant: uidstr2,
        localization: {
            department: uiddept2,
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
    }
]

let agents = [
    {
        uid: uidscan1,
        name: "SCANNER1",
        type: "SCANNER",
        description: "FBG Ponte",
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
        description: "FBG Tunnel",
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
        name: 'RFI-002',
        company: companyid,
        lastmodified: "2022-06-30T10:00:00",
        description: "Ferrovia Roma Pescara",
        lat: 45.102365,
        lon: 9.114037,
        image: 'RFI-002.jpg',
        geojson: [
            {id:'',area:'',local:'',path:[]}
        ],
        label: 'BR1',
        address: 'Piacenza,IT',
        color: '#FF6188', // RED SOFT
    },
    {
        uid: uidstr2,
        name: 'TUNNEL-001',
        company: companyid,
        lastmodified: "2022-06-30T10:00:00",
        description: "Tunnel tratta Piacenza Milano",
        lat: 45.227513,
        lon: 9.152713,
        image: 'TUNNEL-001.jpg',
        label: 'TU1',
        address: 'Pavia,IT',
        color: '#B9DCCC', // BLUE SOFT
    }
]

let areaentities = [
    {
        uid: uiddept1,
        name: 'AREA-001',
        lastmodified: "2022-06-30T10:00:00",
        description: "Sterile Production",
        plant: uidstr1
    },
    {
        uid: uiddept2,
        name: 'AREA-002',
        lastmodified: "2022-06-30T10:00:00",
        description: "Sterile Production New",
        plant: uidstr2
    },
]

let localentities = [
    {
        uid: uidline1,
        name: 'LINE-001',
        lastmodified: "2022-06-30T10:00:00",
        description: "DESALPHA Line",
        department: uiddept1
    },
    {
        uid: uidline2,
        name: 'LINE-002',
        lastmodified: "2022-06-30T10:00:00",
        description: "NOVOMIXIN Line",
        department: uiddept2
    },
]

let controlledentities = [
    {
        uid: uidmach1,
        name: "PONTE-001",
        description: "Ponte ferroviario",
        line: uidline1,
        type: "BRIDGE",
        buildyear: "1952",
        agent: uidscan1,
        lastmodified: "2022-06-30T10:00:00",
    },
    {
        uid: uidmach2,
        name: "GALLERIA-001",
        description: "Galleria Ferroviaria",
        line: uidline2,
        type: "TUNNEL",
        buildyear: "1921",
        agent: uidscan2,
        lastmodified: "2022-06-30T10:00:00",
    },
]

let controllers = [
    {
        uid: uidcontr1,
        name: "CNTL-BRIDGE-01",
        ctype: "",
        model: "Controller Thema4",
        machine: uidmach1,
        manufacturer: "GlobalSensing",
        ip: "10.1.234.67",
        port: 502,
        mac: "E1:F7:2D:23:C7:3F",
        intf: "LORAWAN",
        driver: "modbus",
        lastmodified: "2022-06-30T10:00:00",
    },
    {
        uid: uidcontr2,
        name: "CNTL-TUNNEL-01",
        ctype: "",
        model: "Controller Thema4",
        machine: uidmach2,
        manufacturer: "GlobalSensing",
        ip: "10.1.234.69",
        port: 502,
        mac: "E1:F7:2D:23:C7:3F",
        intf: "LORAWAN",
        driver: "modbus",
        lastmodified: "2022-06-30T10:00:00",

    },
]


// DATA POINT GENERATION
function randomTDUABD(length) {
    const pre = [
        'TT-',
        'TS-',
        'HH-',
        "AL-T-",
        "AL-TS-",
        "AL-H-",
        "EV-T-",
        "EV-TS-",
        "EV-H-",
    ]
    const desc = [
        "Temperature measure",
        "Mechanical tension measure",
        "Humidity measure",
        "Temperature alarm",
        "Mechanical tension alarm",
        "Humidity alarm",
        "Temperature set event",
        "Mechanical tension set event",
        "Humidity set event",
    ]

    const um = [
        'DEGC',
        'NEWTM',
        "%",
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
        case 'TS-':
            ret = 'MECHTENS'
            break;
        case 'HH-':
            ret = 'HUMIDITY'
            break;
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
    switch (type) {
        case 'TEMPERATURE':
            llim = Math.floor(Math.random() * 1) - 10.0
            hlim = Math.floor(Math.random() * 10) + 200.0
            break;
        case 'MECHTENS':
            llim = Math.floor(Math.random()) 
            hlim = Math.floor(Math.random() * 100) + 30.0
            break;
        case 'HUMIDITY':
            llim = Math.floor(Math.random() * 10) + 40.0
            hlim = Math.floor(Math.random() * 10) + 100.0
            break;
        default:
            llim = 'N.A.'
            hlim = 'N.A.'
            break;
    }
    return [hlim, llim]
}

function makeDataPointsUid(driver, agent, device, controller, machine, db, num = 30) {
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
        const [hlim, llim] = getPointLims(point.type)
        point.hlim = hlim
        point.llim = llim
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
                case 'MECHTENS':
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
            // GET CONTROLLER FOR MACHINE
            const cltrs = controllers.filter((item) => item.machine == muid)
            let cuid = ''
            if (cltrs.length > 0)
                cuid = cltrs[0].uid
            const index2 = Math.floor(Math.random() * dataAgents[i].dbs.length)
            const dbuid = dataAgents[i].dbs[index2].uid
            const points = makeDataPointsUid(driver, agentuid, devuid, cuid, muid, dbuid)
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
        const y = getTSValue(point.atype, point.llim, point.hlim)
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
    generateDataPoints
}

export default DBINFASTRUCTURE
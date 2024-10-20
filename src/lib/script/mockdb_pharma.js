import { v4 as uuidv4 } from 'uuid';
import polycurve from './polycurve.js'

const companyid = uuidv4()
// Devices
const uiddev1 = uuidv4()
const uiddev2 = uuidv4()
const uiddev3 = uuidv4()
const uiddev4 = uuidv4()
const uiddev5 = uuidv4()
const uiddev6 = uuidv4()
const uiddev7 = uuidv4()
const uiddev8 = uuidv4()
const uiddev9 = uuidv4()
// Agents
const uidag1 = uuidv4()
const uidag2 = uuidv4()
const uidag3 = uuidv4()
const uidag4 = uuidv4()
const uidag5 = uuidv4()
const uidag6 = uuidv4()
const uidag7 = uuidv4()
const uidag8 = uuidv4()
const uidag9 = uuidv4()
const uidag10 = uuidv4()
const uidag11 = uuidv4()
const uidag12 = uuidv4()
// Plants
const uidplant1 = uuidv4()
const uidplant2 = uuidv4()
// Departments
const uiddept1 = uuidv4()
const uiddept2 = uuidv4()
const uiddept3 = uuidv4()
const uiddept4 = uuidv4()
// Lines
const uidline1 = uuidv4()
const uidline2 = uuidv4()
const uidline3 = uuidv4()
const uidline4 = uuidv4()
// Machines
const uidmach1 = uuidv4()
const uidmach2 = uuidv4()
const uidmach3 = uuidv4()
const uidmach4 = uuidv4()
const uidmach5 = uuidv4()
const uidmach6 = uuidv4()
const uidmach7 = uuidv4()
const uidmach8 = uuidv4()
const uidmach9 = uuidv4()
const uidmach10 = uuidv4()
const uidmach11 = uuidv4()
const uidmach12 = uuidv4()
const uidmach13 = uuidv4()
const uidmach14 = uuidv4()
// Controllers
const uidcntl1 = uuidv4()
const uidcntl2 = uuidv4()
const uidcntl3 = uuidv4()
const uidcntl4 = uuidv4()
const uidcntl5 = uuidv4()
const uidcntl6 = uuidv4()
const uidcntl7 = uuidv4()
const uidcntl8 = uuidv4()
const uidcntl9 = uuidv4()
const uidcntl10 = uuidv4()
const uidcntl11 = uuidv4()
const uidcntl12 = uuidv4()
const uidcntl13 = uuidv4()
const uidcntl14 = uuidv4()

const deltacoord = 0.0001

let devices = [
    {
        uid: uiddev1,
        name: 'DEV1-001',
        lastmodified: "2022-06-30T10:00:00",
        description: "Virtual Machine DESALPHA Line Pabianice Plant",
        module: "DATA",
        plant: uidplant1,
        localization: {
            department: uiddept1,
            line: uidline1,
        },
        host: "SRV01-01",
        port: 3001,
        type: "VM",
        os: "WIN-10",
        osver: "22H2",
        userid: "amdin",
        password: "",
        hwdetails: {
            mac: "00:0a:4f:40:03:d0",
            brand: "DELL",
            model: "PowerEdge M640",
        },
    },
    {
        uid: uiddev2,
        name: 'DEV2-001',
        lastmodified: "2022-06-30T10:00:00",
        description: "Edge Computer NOVOMIXIN Line Tulsa Plant",
        module: "DATA",
        plant: uidplant2,
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
            brand: "BRAINBOXES",
            model: "BB-400",
        },
    },
    {
        uid: uiddev3,
        name: 'DEV2-002',
        lastmodified: "2023-05-30T10:00:00",
        description: "Edge Computer Line WY Plant Z",
        module: "DATA",
        plant: uidplant2,
        localization: {
            department: uiddept2,
            line: uidline2,
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
        uid: uiddev4,
        name: 'DEV2-003',
        lastmodified: "2023-05-30T10:00:00",
        description: "PC Computer Line WY Plant Z",
        module: "DATA",
        plant: uidplant2,
        localization: {
            department: uiddept2,
            line: uidline2,
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
        uid: uiddev5,
        name: 'PROCESSOR-1',
        lastmodified: "2022-06-30T10:00:00",
        description: "VMWare VM-2012-H ",
        module: "CLONE",
        plant: uidplant1,
        localization: {
            department: uiddept1,
            line: uidline1,
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
        uid: uiddev6,
        name: 'PROCESSOR-2',
        lastmodified: "2022-06-30T10:00:00",
        description: "VMWare VM-2012-H ",
        module: "CLONE",
        plant: uidplant2,
        localization: {
            department: uiddept2,
            line: uidline2,
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
        uid: uiddev7,
        name: 'MODEL-02',
        lastmodified: "2022-06-30T10:00:00",
        description: "VMWare VM-2012-H ",
        module: "AI",
        plant: uidplant2,
        localization: {
            department: uiddept2,
            line: uidline2,
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
    },
    {
        uid: uiddev8,
        name: 'MODEL-01',
        lastmodified: "2022-06-30T10:00:00",
        description: "VMWare VM-2012-H ",
        module: "AI",
        plant: uidplant1,
        localization: {
            department: uiddept1,
            line: uidline1,
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
    },
    {
        uid: uiddev9,
        name: 'SIMUL-01',
        lastmodified: "2022-06-30T10:00:00",
        description: "VMWare VM-2012-H ",
        module: "LEARN",
        plant: uidplant1,
        localization: {
            department: uiddept1,
            line: uidline1,
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
        uid: uidag1,
        name: "SCANNER1",
        type: "SCANNER",
        description: "Scanner for DESALPHA Line - 1",
        lastmodified: "2022-06-30T09:58:00",
        module: 'DATA',
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
        devuid: uiddev1,
        status: "STOP",
    },
    {
        uid: uidag2,
        name: "SCANNER11",
        type: "SCANNER",
        description: "Scanner for DESALPHA Line - 2",
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
        devuid: uiddev1,
        status: "STOP",
    },
    {
        uid: uidag3,
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
        devuid: uiddev1,
        status: "STOP",
    },
    {
        uid: uidag4,
        name: "SCANNER2",
        type: "SCANNER",
        description: "Scanner for NOVOMIXIN Line",
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
        devuid: uiddev2,
    },
    {
        uid: uidag5,
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
        devuid: uiddev2,
        status: "STOP",
    },
    {
        uid: uidag6,
        name: "SCANNER3",
        type: "SCANNER",
        description: "Scanner for DESALPHA Line - ancillary",
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
        devuid: uiddev1,
    },
    {
        uid: uidag7,
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
        devuid: uiddev1,
    },
    {
        uid: uidag8,
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
        devuid: uiddev7,
    },
    {
        uid: uidag9,
        name: "SYSDYN01",
        type: "SYSDYN",
        description: "FREEZE DRYING Model",
        lastmodified: "2022-06-30T09:58:00",
        module: 'AI',
        model: {
            name: "LYO-MODEL01",
            path: "/models/bayes/LYOMODEL01.json"
        },
        status: "STOP",
        devuid: uiddev8,
    },
    {
        uid: uidag10,
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
        devuid: uiddev5,
    },
    {
        uid: uidag11,
        name: "REC-DEC-02",
        type: "RECORDER",
        description: "DECORTIN Pahse 2 Recorder",
        lastmodified: "2022-06-30T09:58:00",
        module: 'CLONE',
        model: {
            name: "DEC-PHASE2-REC",
            path: "/models/recorders/DECPAHSE2.json"
        },
        status: "STOP",
        devuid: uiddev6,
    },
    {
        uid: uidag12,
        name: "PLAY-DEC-02",
        type: "PLAYER_FREEZE-DRYER",
        description: "DECORTIN Pahse 2 Player",
        lastmodified: "2022-06-30T09:58:00",
        module: 'LEARN',
        model: {
            name: "DEC-PHASE2-PLAY",
            path: "/models/recorders/DECPAHSE2.json"
        },
        status: "STOP",
        devuid: uiddev9,
    }
]

let companies = [
    {
        uid: companyid,
        name: 'COMP s.p.a.',
        address:'via Roma 45, MI'
    }

]

let plants = [
    {
        uid: uidplant1,
        company: companyid,
        name: 'PLANT-001',
        lastmodified: "2022-06-30T10:00:00",
        description: "Rome Plant",
        lat: 41.67167,
        lon: 12.51118,
        image: 'PLANT-001.jpg',
        label: 'PL1',
        address: 'Roma RM, IT',
        color: '#FF6188', // RED SOFT
    },
    {
        uid: uidplant2,
        name: 'PLANT-002',
        company: companyid,
        lastmodified: "2022-06-30T10:00:00",
        description: "Pescara Plant",
        lat: 42.29315,
        lon: 14.02623,
        image: 'PLANT-002.jpg',
        label: 'PL2',
        address: 'Pescara PE, IT',
        color: '#B9DCCC', // BLUE SOFT
    }
]

let departments = [
    {
        uid: uiddept1,
        name: 'DEPT-001',
        lastmodified: "2022-06-30T10:00:00",
        description: "Sterile Production",
        plant: uidplant1
    },
    {
        uid: uiddept2,
        name: 'DEPT-002',
        lastmodified: "2022-06-30T10:00:00",
        description: "Sterile Production New",
        plant: uidplant2
    },
    {
        uid: uiddept3,
        name: 'DEPT-003',
        lastmodified: "2022-06-30T10:00:00",
        description: "Oral Solid Production",
        plant: uidplant2
    },
    {
        uid: uiddept4,
        name: 'DEPT-004',
        lastmodified: "2022-06-30T10:00:00",
        description: "Oral Solid Production New",
        plant: uidplant2
    }
]

let lines = [
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
    {
        uid: uidline3,
        name: 'LINE-003',
        lastmodified: "2022-06-30T10:00:00",
        description: "CERINOL Line",
        department: uiddept3
    },
    {
        uid: uidline4,
        name: 'LINE-004',
        lastmodified: "2022-06-30T10:00:00",
        description: "CERINOL Line New",
        department: uiddept4
    }
]

let machines = [
    {
        uid: uidmach1,
        name: "AUT-01",
        description: "Autoclave Fedegari",
        line: uidline1,
        type: "AUTOCLAVE",
        manufacturer: "FEDEGARI",
        model: "XFOAF7/Q253",
        room: "G041",
        agent: uidag1,
        localization: {
            lat: 42.29315 -deltacoord,
            lon: 14.02623,
        }
    },
    {
        uid: uidmach2,
        name: "PRP-01",
        description: "Preparatore",
        line: uidline1,
        type: "PREPARATORE",
        manufacturer: "Intertech",
        model: "010",
        room: "G040",
        agent: uidag1,
        localization: {
            lat: 42.29315 + deltacoord,
            lon: 14.02623,
        }
    },
    {
        uid: uidmach3,
        name: "INF-01",
        description: "Infialatrice Pharmasiena",
        line: uidline1,
        type: "INFIALATRICE",
        manufacturer: "PHARMASIENA",
        model: "A6-FC",
        room: "G043",
        agent: uidag2,
        localization: {
            lat: 42.29315,
            lon: 14.02623 - deltacoord,
        }
    },
    {
        uid: uidmach4,
        name: "LIO-01",
        description: "Liofilizzatore IMA",
        line: uidline1,
        type: "LIOFILIZZATORE",
        manufacturer: "IMA",
        model: "LYOFAST 25",
        room: "G044",
        agent: uidag1,
        localization: {
            lat: 42.29315,
            lon: 14.02623 + deltacoord,
        }
    },
    {
        uid: uidmach5,
        name: "ITU-01",
        description: "Test filtri Pall",
        line: uidline1,
        type: "FILTERTEST",
        manufacturer: "PALL",
        model: "ACQUAWIT IV",
        room: "G038",
        agent: uidag2,
        localization: {
            lat: 42.29315 + deltacoord,
            lon: 14.02623 + deltacoord,
        }
    },
    {
        uid: uidmach6,
        name: "STE-01",
        description: "Forno De Lama",
        line: uidline1,
        type: "FORNO",
        manufacturer: "DE LAMA",
        model: "DLST/L",
        room: "G041",
        agent: uidag2,
        localization: {
            lat: 42.29315 + deltacoord,
            lon: 14.02623 - deltacoord,
        }
    },
    {
        uid: uidmach7,
        name: "UTA-01-1",
        description: "Unita Trattamento Aria",
        line: uidline1,
        type: "UTA",
        manufacturer: "EMI RAD",
        model: "MXC010",
        room: "G0002",
        agent: uidag4,
        localization: {
            lat: 42.29315 - deltacoord,
            lon: 14.02623 - deltacoord,
        }
    },
    {
        uid: uidmach8,
        name: "AUT-02",
        description: "Autoclave Fedegari",
        line: uidline2,
        type: "AUTOCLAVE",
        manufacturer: "FEDEGARI",
        model: "XFOAF9/QST",
        room: "H014",
        agent: uidag4,
        localization: {
            lat: 41.67167 + deltacoord,
            lon: 12.51118 + deltacoord,
        }
    },
    {
        uid: uidmach9,
        name: "PRP-02",
        description: "Preparatore",
        line: uidline2,
        type: "PREPARATORE",
        manufacturer: "Intertech",
        model: "010",
        room: "H015",
        agent: uidag2,
        localization: {
            lat: 41.67167 + deltacoord,
            lon: 12.51118,
        }
    },
    {
        uid: uidmach10,
        name: "INF-02",
        description: "Infialatrice Pharmasiena",
        line: uidline2,
        type: "INFIALATRICE",
        manufacturer: "PHARMASIENA",
        model: "A6-FC",
        room: "H028",
        agent: uidag4,
        localization: {
            lat: 41.67167 - deltacoord,
            lon: 12.51118,
        }
    },
    {
        uid: uidmach11,
        name: "LIO-02",
        description: "Liofilizzatore IMA",
        line: uidline2,
        type: "LIOFILIZZATORE",
        manufacturer: "IMA",
        model: "LYOFAST 25",
        room: "H028",
        agent: uidag4,
        localization: {
            lat: 41.67167,
            lon: 12.51118 + deltacoord,
        }
    },
    {
        uid: uidmach12,
        name: "ITU-02",
        description: "Test filtri Pall",
        line: uidline1,
        type: "FILTERTEST",
        manufacturer: "PALL",
        model: "ACQUAWIT IV",
        room: "H015",
        agent: uidag6,
        localization: {
            lat: 41.67167 - deltacoord,
            lon: 12.51118 + deltacoord,
        }
    },
    {
        uid: uidmach13,
        name: "STE-02",
        description: "Forno De Lama",
        line: uidline2,
        type: "FORNO",
        manufacturer: "DE LAMA",
        model: "DLST/L",
        room: "H014",
        agent: uidag6,
        localization: {
            lat: 41.67167,
            lon: 12.51118 - deltacoord,
        }
    },
    {
        uid: uidmach14,
        name: "UTA-02-1",
        description: "Unita Trattamento Aria",
        line: uidline2,
        type: "UTA",
        manufacturer: "EMI RAD",
        model: "MXC010",
        room: "H-TECH",
        agent: uidag6,
        localization: {
            lat: 41.67167 + deltacoord,
            lon: 12.51118 - deltacoord,
        }
    }
]

let controllers = [
    {
        uid: uidcntl1,
        name: "CNTL-AUT-01",
        ctype: "",
        model: "Controller Thema4",
        machine: uidmach1,
        manufacturer: "FEDEGARI",
        ip: "10.1.234.67",
        port: 502,
        mac: "E1:F7:2D:23:C7:3F",
        intf: "ETH",
        driver: "modbus",
    },
    {
        uid: uidcntl2,
        name: "CNTL-PRP-01",
        ctype: "",
        model: "Controller Thema4",
        machine: uidmach2,
        manufacturer: "",
        ip: "10.1.234.69",
        port: 502,
        mac: "E1:F7:2D:23:C7:3F",
        intf: "ETH",
        driver: "modbus",
    },
    {
        uid: uidcntl3,
        name: "CNTL-INF-01",
        ctype: "",
        model: "Controller Siemens S7 300",
        machine: uidmach3,
        manufacturer: "SIEMENS",
        ip: "10.1.234.68",
        port: 102,
        mac: "E1:F7:2D:23:C7:3F",
        intf: "ETH",
        driver: "s7",

    },
    {
        uid: uidcntl4,
        name: "CNTL-LIO-01",
        ctype: "",
        model: "Controller IMA",
        machine: uidmach4,
        manufacturer: "IMA",
        ip: "10.1.234.70",
        port: 1433,
        mac: "E1:F7:2D:23:C7:3F",
        intf: "ETH",
        driver: "sql",
    },
    {
        uid: uidcntl5,
        name: "CNTL-ITU-01",
        ctype: "",
        model: "Controller Pall",
        machine: uidmach5,
        manufacturer: "PALL",
        ip: "10.1.234.78",
        port: 502,
        mac: "E1:F7:2D:23:C7:3F",
        intf: "ETH",
        driver: "modbus",
    },
    {
        uid: uidcntl6,
        name: "CNTL-STE-01",
        ctype: "",
        model: "Controller De Lama",
        machine: uidmach6,
        manufacturer: "DE LAMA",
        ip: "10.1.234.80",
        port: 7777,
        mac: "E1:F7:2D:23:C7:3F",
        intf: "ETH",
        driver: "delama",
    },
    {
        uid: uidcntl7,
        name: "CNTL-UTA-01",
        ctype: "",
        model: "Controller Honeywell",
        machine: uidmach7,
        manufacturer: "HONEYWELL",
        ip: "10.1.234.90",
        port: 47808,
        mac: "E1:F7:2D:23:C7:3F",
        intf: "ETH",
        driver: "bacnet",
    },
    {
        uid: uidcntl8,
        name: "CNTL-AUT-02",
        ctype: "",
        model: "Controller Thema4",
        machine: uidmach8,
        manufacturer: "FEDEGARI",
        ip: "10.1.234.67",
        port: 502,
        mac: "E1:F7:2D:23:C7:3F",
        intf: "ETH",
        driver: "modbus",
    },
    {
        uid: uidcntl9,
        name: "CNTL-PRP-02",
        ctype: "",
        model: "Controller Thema4",
        machine: uidmach9,
        manufacturer: "",
        ip: "10.1.234.69",
        port: 502,
        mac: "E1:F7:2D:23:C7:3F",
        intf: "ETH",
        driver: "modbus",
    },
    {
        uid: uidcntl10,
        name: "CNTL-INF-02",
        ctype: "",
        model: "Controller Siemens S7 300",
        machine: uidmach10,
        manufacturer: "SIEMENS",
        ip: "10.1.234.68",
        port: 102,
        mac: "E1:F7:2D:23:C7:3F",
        intf: "ETH",
        driver: "s7",

    },
    {
        uid: uidcntl11,
        name: "CNTL-LIO-02",
        ctype: "",
        model: "Controller IMA",
        machine: uidmach11,
        manufacturer: "IMA",
        ip: "10.1.234.70",
        port: 1433,
        mac: "E1:F7:2D:23:C7:3F",
        intf: "ETH",
        driver: "sql",
    },
    {
        uid: uidcntl12,
        name: "CNTL-ITU-02",
        ctype: "",
        model: "Controller Pall",
        machine: uidmach12,
        manufacturer: "PALL",
        ip: "10.1.234.78",
        port: 502,
        mac: "E1:F7:2D:23:C7:3F",
        intf: "ETH",
        driver: "modbus",
    },
    {
        uid: uidcntl13,
        name: "CNTL-STE-02",
        ctype: "",
        model: "Controller De Lama",
        machine: uidmach13,
        manufacturer: "DE LAMA",
        ip: "10.1.234.80",
        port: 7777,
        mac: "E1:F7:2D:23:C7:3F",
        intf: "ETH",
        driver: "delama",
    },
    {
        uid: uidcntl14,
        name: "CNTL-UTA-02",
        ctype: "",
        model: "Controller Honeywell",
        machine: uidmach14,
        manufacturer: "HONEYWELL",
        ip: "10.1.234.90",
        port: 47808,
        mac: "E1:F7:2D:23:C7:3F",
        intf: "ETH",
        driver: "bacnet",
    }
]

// DATA POINT GENERATION
function randomTDUABD(length) {
    const pre = [
        'TT-',
        'PP-',
        'HH-',
        'RPM-',
        'AA-',
        'VV-',
        'NUM-',
        "FL-",
        "AL-T-",
        "AL-P-",
        "AL-H-",
        "AL-RPM-",
        "AL-A-",
        "AL-V-",
        "AL-NUM-",
        "AL-FL-",
        "EV-T-",
        "EV-P-",
        "EV-H-",
        "EV-RPM-",
        "EV-A-",
        "EV-V-",
        "EV-NUM-",
        "EV-FL-"
    ]
    const desc = [
        "Temperature measure",
        "Pressure measure",
        "Humidity measure",
        "Rotational Speed measure",
        "Current measure",
        "Voltage measure",
        "Particle num measure",
        "Flow measure",
        "Temperature alarm",
        "Pressure alarm",
        "Humidity alarm",
        "Rotational Speed alarm",
        "Current alarm",
        "Voltage alarm",
        "Particle num alarm",
        "Flow alarm",
        "Temperature set event",
        "Pressure set event",
        "Start event",
        "Stop event",
        "Switch on event",
        "Switch off event",
        "Open  event",
        "Close event"
    ]
    const um = [
        'DEGC',
        'PSIA',
        "%",
        "RPM",
        "A",
        "V",
        "#/m3",
        "m3/sec",
        'ON/OFF',
        'ON/OFF',
        'ON/OFF',
        'ON/OFF',
        'ON/OFF',
        'ON/OFF',
        'ON/OFF',
        'ON/OFF',
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
    if (pre[index].includes('AL-')){
        bit = String(Math.floor(Math.random() * 16))
        atype = 'ALARM'
        dtype = 'bool'
    }
    if (pre[index].includes('EV-')){
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
        case 'PP-':
            ret = 'PRESSURE'
            break;
        case 'HH-':
            ret = 'HUMIDITY'
            break;
        case 'RPM':
            ret = 'SPEED'
            break;
        case 'AA-':
            ret = 'CURRENT'
            break;
        case 'VV-':
            ret = 'VOLTAGE'
            break;
        case 'NUM':
            ret = 'NUMBER'
            break;
        case 'FL-':
            ret = 'FLOW'
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
    let hhlim = 0.0
    let lllim = 0.0
    switch (type) {
        case 'TEMPERATURE':
            llim = Math.floor(Math.random() * 1) - 10.0
            hlim = Math.floor(Math.random() * 10) + 200.0
            hhlim = hlim + 20.0
            lllim = llim - 10.0
            break;
        case 'PRESSURE':
            llim = Math.floor(Math.random() * 1) - 1
            hlim = Math.floor(Math.random() * 1) + 3.0
            hhlim = hlim + 1.0
            lllim = llim - 1.0
            break;
        case 'HUMIDITY':
            llim = Math.floor(Math.random() * 10) + 25.0
            hlim = Math.floor(Math.random() * 10) + 85.0
            hhlim = hlim + 10.0
            lllim = llim - 10.0
            break;
        case 'SPEED':
            llim = Math.floor(Math.random() * 500) + 1000.0
            hlim = Math.floor(Math.random() * 500) + 4000.0
            hhlim = hlim + 500.0
            lllim = llim - 500.0
            break;
        case 'CURRENT':
            llim = Math.floor(Math.random() * 4) + 10.0
            hlim = Math.floor(Math.random() * 4) + 50.0
            hhlim = hlim + 5.0
            lllim = llim - 5.0
            break;
        case 'VOLTAGE':
            llim = Math.floor(Math.random() * 10) + 295.0
            hlim = Math.floor(Math.random() * 30) + 320.0
            hhlim = hlim + 10.0
            lllim = llim - 10.0
            break;
        case 'NUMBER':
            llim = 0
            hlim = Math.floor(Math.random() * 2) + 5
            hhlim = hlim + 5
            lllim = llim
            break;
        case 'FLOW':
            llim = Math.floor(Math.random() * 0.5)
            hlim = Math.floor(Math.random() * 1) + 2.0
            hhlim = hlim + 0.5
            lllim = llim - 0.5
            break;
        default:
            llim = 'N.A.'
            hlim = 'N.A.'
            lllim = 'N.A.'
            hhlim = 'N.A.'
            break;
    }
    return [hhlim,hlim, llim,lllim]
}
function makeDataPointsUid(driver, agent, device, controller, machine, db, lon, lat, num = 30) {
    const points = []
    for (let i = 0; i < num; i++) {
        const point = {
            uid: uuidv4(),
            tag: '',
            description: '',
            um: '', dtype: '',
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
        point.hhlim = hhlim
        point.llim = llim
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
                case 'PRESSURE':
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
            const agMachines = machines.filter((item) => item.agent == dataAgents[i].uid)
            // PICK ONE MACHINE AT RANDOM
            const index = Math.floor(Math.random() * agMachines.length)
            const machine = agMachines[index]
            const muid = machine.uid
            const lon = machine.localization ? machine.localization.lon : null
            const lat = machine.localization ? machine.localization.lat : null
            // GET CONTROLLER FOR MACHINE
            const cltrs = controllers.filter((item) => item.machine == muid)
            let cuid = ''
            if (cltrs.length > 0)
                cuid = cltrs[0].uid
            const index2 = Math.floor(Math.random() * dataAgents[i].dbs.length)
            const dbuid = dataAgents[i].dbs[index2].uid
            const points = makeDataPointsUid(driver, agentuid, devuid, cuid, muid, dbuid, lon, lat)
            array.push.apply(array, points)
        }
    }

    return array
}

// CLONE POINT GENERATION
function randomTD(length,prefix="BATCH") {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    const tag = prefix +'-'+ result
    const descs = ['PRODUCT CLONADIN', "PRODUCT MINOCYCLIN", "PRODUCT RISPERIDONE", "PRODUCT SYNERCID"]
    const descindex = Math.floor(Math.random() * (descs.length - 1))
    const desc = descs[descindex] + ' '+prefix+' ' + tag

    return [tag, desc]
}
function makeClonePointsUid(agent, device, num = 30) {
    const points = []
    for (let i = 0; i < num; i++) {
        const point = { uid: uuidv4(), tag: '', description: '', agent: agent, device: device }
        const [tag, desc] = randomTD(7)
        point.tag = tag
        point.module = 'CLONE'
        point.description = desc
        point.type = 'BATCH' // 'BATCH'|'CONTINUOUS'|'PROCEDURAL'
        const plantindex = Math.floor(Math.random() * plants.length)
        point.plant = plants[plantindex].uid
        point.annotations = []
        const now = Date.now()
        const start = new Date("2023-01-01")
        const newdate1 = new Date(start.getTime() + Math.random() * (now - start.getTime()));
        const newdate2 = new Date(start.getTime() + Math.random() * (now - start.getTime()));
        if (newdate1.getTime() < newdate2.getTime()) {
            point.startdate = newdate1.toISOString().split('Z')[0]
            point.enddate = newdate2.toISOString().split('Z')[0]
        } else {
            point.startdate = newdate2.toISOString().split('Z')[0]
            point.enddate = newdate1.toISOString().split('Z')[0]
        }
        points.push(point)
    }
    return points
}

const generateClonePoints = () => {
    const array = []
    const dataAgents = agents.filter((item) => item.module == 'CLONE')
    for (let i = 0; i < dataAgents.length; i++) {
        if (dataAgents[i].type == 'RECORDER') {
            const agentuid = dataAgents[i].uid
            const devuid = dataAgents[i].devuid
            const points = makeClonePointsUid(agentuid, devuid)
            array.push.apply(array, points)
        }
    }

    return array
}

function makeLearnPointsUid(agent, device, num = 30) {
    const points = []
    for (let i = 0; i < num; i++) {
        const point = { uid: uuidv4(), tag: '', description: '', agent: agent, device: device }
        const [tag, desc] = randomTD(7,"SYNBATCH")
        point.tag = tag
        point.module = 'LEARN'
        point.description = desc
        point.type = 'BATCH' // 'BATCH'|'CONTINUOUS'|'PROCEDURAL'
        const plantindex = Math.floor(Math.random() * plants.length)
        point.plant = plants[plantindex].uid
        point.annotations = []
        const now = Date.now()
        const start = new Date("2023-01-01")
        const newdate1 = new Date(start.getTime() + Math.random() * (now - start.getTime()));
        const newdate2 = new Date(start.getTime() + Math.random() * (now - start.getTime()));
        if (newdate1.getTime() < newdate2.getTime()) {
            point.startdate = newdate1.toISOString().split('Z')[0]
            point.enddate = newdate2.toISOString().split('Z')[0]
        } else {
            point.startdate = newdate2.toISOString().split('Z')[0]
            point.enddate = newdate1.toISOString().split('Z')[0]
        }
        points.push(point)
    }
    return points
}

const generateLearnPoints = () => {
    const array = []
    const dataAgents = agents.filter((item) => item.module == 'LEARN')
    for (let i = 0; i < dataAgents.length; i++) {
        if (dataAgents[i].type.includes('PLAYER')) {
            const agentuid = dataAgents[i].uid
            const devuid = dataAgents[i].devuid
            const points = makeLearnPointsUid(agentuid, devuid)
            array.push.apply(array, points)
        }
    }
    return array
}

const phdescs = [
    'Material Preparation and Sterilization',
    'Line Preparation and Sterilization',
    'Weighting Components',
    'Solution Preparation',
    'Filtration and Filling',
    'Freeze Drying',
    'Flooding and Washing',
    'Inspection',
    'Packaging'
]
const phtypes = [
    'MATPREP',
    'LINEPREP',
    'WEIGHTING',
    'PREPARATION',
    'FILTRANDFILL',
    'FREEZEDRYING',
    'WASHING',
    'INSPECTION',
    'PACKAGING'
]

const phcolors = [
    '#FF6188',
    '#B9DCCC',
    '#C9FD4E',
    '#FFCB65',
    '#FFEF4D',
    '#49CDA8',
    '#F780DF',
    '#C3BC53',
    '#D897F0'
]

const phnums = [5, 6, 7, 8, 9]

const generateMasterBatchPhases = () => {
    const array = []
    for (let j = 0; j < phtypes.length; j++) {
        const phase = {
            uid: uuidv4(),
            tag: phtypes[j],
            description: phdescs[j],
            image: '/' + phtypes[j] + '.png',
            color: phcolors[j],
        }
        array.push(phase)
    }

    return array
}

let masterbatchphases = generateMasterBatchPhases()

const generateClonePhasesBatch = (points) => {
    const array = []
    let prevlen = 0
    for (let i = 0; i < points.length; i++) {
        prevlen = array.length
        // A. get phase #
        const phnumindex = Math.floor(Math.random() * (phnums.length))
        const phnum = phnums[phnumindex]
        const startts = new Date(points[i].startdate).getTime()
        const endts = new Date(points[i].enddate).getTime()
        const totalts = endts - startts
        const delta = Math.floor(totalts / phnum)
        let phasestart = startts
        let phaseend = startts
        // B. generate phase for point
        for (let j = 0; j < phnum; j++) {
            phaseend = phasestart + delta
            const phase = {
                uid: uuidv4(),
                tag: points[i].tag + '-PH-' + (j + 1),
                //description: masterbatchphases[j].description,
                //type: masterbatchphases[j].tag,
                startdate: new Date(phasestart).toISOString(),
                enddate: new Date(phaseend).toISOString(),
                point: points[i].uid,
                status: 'COMPLETED',
                //image: masterbatchphases[j].image ,
                //color: masterbatchphases[j].color,
                mbphase: masterbatchphases[j].uid,
                outputs: [],
                inputs: [],
                parents: [],
                children: []
            }
            phasestart = phaseend
            array.push(phase)
        }
        prevlen = array.length
    }

    return array
}

const generateClonePhases = (points, type) => {
    let array = []
    switch (type) {
        case 'BATCH':
            array = generateClonePhasesBatch(points)
            break;
        default:
            break;
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
        const step = start + curve[i][0] * TICK * 1000
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
        const y = getTSValue(point.atype, point.lllim, point.hhlim)
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

const DBINDUSTRY = {
    companies,
    devices,
    agents,
    plants,
    departments,
    lines,
    machines,
    controllers,
    masterbatchphases,
    generateDataPoints,
    generateClonePoints,
    generateLearnPoints,
    generateClonePhases,
    generateTimeSeriesPoly,
    generateTimeSeriesRect
}

export default DBINDUSTRY
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

let plants = [
    {
        uid: uidstr1,
        name: 'RFI-002',
        lastmodified: "2022-06-30T10:00:00",
        description: "Ferrovia Roma Pescara",
        lat: 45.102365,
        lon: 9.114037,
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
        lastmodified: "2022-06-30T10:00:00",
        description: "Tunnel tratta Piacenza Milano",
        lat: 45.227513,
        lon: 9.152713,
        label: 'TU1',
        address: 'Pavia,IT',
        color: '#B9DCCC', // BLUE SOFT
    }
]
import { secondsInDay } from 'date-fns/constants';
import { filterArray } from './mock.js'
import { v4 as uuidv4 } from 'uuid'; 

let users = [
    {
        uid: '55a96422-88cd-43ab-aa56-f4d4b022a77e',
        username: 'root@root.com',
        password: 'root',
        name: 'ROOT',
        surname: 'ROOT',
        permissions: [],
        role: 'SADMIN',
        status: 'active',
        confirmationCode: null,
        createdAt: '2024-02-25T17:23:06.705859',
        updatedAt: '2024-02-25T17:23:06.705859'
    },
    {
        uid: '447b658f-66ca-7aa3-965d-abd4bc22a893',
        username: 'user@user.com',
        password: 'user',
        name: 'USER',
        surname: 'USER',
        permissions: [],
        role: 'USER',
        status: 'active',
        confirmationCode: null,
        createdAt: '2024-02-25T17:23:06.705859',
        updatedAt: '2024-02-25T17:23:06.705859'
    },
    {
        uid: '667b658f-66ca-7aa3-965d-abd4bc22a59a',
        username: 'g.paesani@sicheo.eu',
        password: 'pino',
        name: 'Giuseppe',
        surname: 'Paesani',
        permissions: [],
        role: 'ADMIN',
        status: 'active',
        confirmationCode: null,
        createdAt: '2024-02-25T17:23:06.705859',
        updatedAt: '2024-02-25T17:23:06.705859'
    },
    {
        uid: 'dd7b658f-66ca-7aa3-965d-abd4bc48a59a',
        username: 'f.lutrario@sicheo.eu',
        password: 'francesco',
        name: 'Francesco',
        surname: 'Lutrario',
        permissions: [],
        role: 'SADMIN',
        status: 'active',
        confirmationCode: null,
        createdAt: '2024-02-25T17:23:06.705859',
        updatedAt: '2024-02-25T17:23:06.705859'
    },
    {
        uid: 'dd7b65da-66b8-7aa3-965d-abd4bc48a59a',
        username: 'r.panchetti@sicheo.eu',
        password: 'ranieri',
        name: 'Ranieri',
        surname: 'Panchetti',
        permissions: [],
        role: 'SADMIN',
        status: 'active',
        confirmationCode: null,
        createdAt: '2024-02-25T17:23:06.705859',
        updatedAt: '2024-02-25T17:23:06.705859'
    }
]

let profiles = [
    {
        uid: '55a96422-88cd-43ab-aa56-f4d4b022a77e',
        language: 'en',
        locale: 'en-US',
        avatar: '/AVATAR1.png',
        data: {
            family: 'INDUSTRY'
        },
        dashboard: [
            {
                module: 'DEFAULT',
                windows: [
                    {
                        id: 'Donut',
                        top: '10px', left: '10px',
                        visible: "visible"
                    }
                ]
            },
            {
                module: 'DATA',
                windows: [
                    { id: 'Donut', top: '380px', left: '10px' },
                    {
                        id: 'Map',
                        top: '0px',
                        left: '10px',
                        width: '600px',
                        visible: "visible",
                        height: '340px',
                        params: { center: { lat: 30, lon: -30 }, zoom: 1, zoomfactor: 3 }
                    },
                    {
                        id: 'Alarms',
                        top: '0px',
                        left: '620px',
                        height: '350px',
                        width: '850px',
                        visible: "visible"
                    },
                ]
            },
            {
                module: 'CLONE',
                windows: [
                    {
                        id: 'Donut',
                        top: '10px',
                        left: '10px',
                        visible: "visible"
                    },
                    {
                        id: 'Alarm',
                        top: '0px',
                        left: '10px',
                        visible: "visible"
                    }
                ]
            },
            {
                module: 'AI',
                windows: [
                    {
                        id: 'Donut',
                        top: '10px',
                        left: '10px',
                        visible: "visible"
                    }
                ]
            },
            {
                module: 'LEARN',
                windows: [
                    {
                        id: 'Donut',
                        top: '10px',
                        left: '10px',
                        visible: "visible"
                    }
                ]
            }
        ],
        topbar: {
            groups: {
                'data': [
                    [
                        { icon: '/MONITOR.svg', text: `Monitor`, link: '/monitor' },
                        { icon: '/BUILD.svg', text: `Build`, link: '/build' },
                    ], [
                        { icon: '/EDIT.svg', text: `Configure`, link: '/configure' },
                        { icon: '/DEPLOY.svg', text: `Deploy`, link: '/deploy' }
                    ]
                ]
            }
        }
    },
    {
        uid: '667b658f-66ca-7aa3-965d-abd4bc22a59a',
        language: 'it',
        locale: 'it-IT',
        avatar: '/gpaesani.png',
        data: {
            family: 'WWATER'
        },
        dashboard: [
            {
                module: 'DEFAULT',
                windows: [
                    {
                        id: 'Donut',
                        top: '10px',
                        left: '10px',
                        visible: "visible"
                    }
                ]
            },
            {
                module: 'DATA',
                windows: [
                    {
                        id: 'Monitor',
                        top: '290px',
                        left: '10px',
                        height: '320px',
                        visible: "hidden"
                    },
                    {
                        id: 'Chart',
                        top: '0px',
                        left: '620px',
                        width: '700px',
                        height: 'max-content',
                        visible: "visible"
                    },
                    {
                        id: 'Map',
                        top: '0px',
                        left: '10px',
                        height: '340px',
                        visible: "visible",
                        params: { center: { lat: 41.9636, lon: 12.4975 }, zoom: 14.5, zoomfactor: 3, pitch:45,bearing:-15.7 }
                    },
                    {
                        id: 'Alarms',
                        top: '0px',
                        left: '620px',
                        height: '350px',
                        width: '850px',
                        visible: "hidden"
                    },
                    {
                        id: 'Communication',
                        top: '298px',
                        left: '0px',
                        height: '300px',
                        width: '350px',
                        visible: "visible"
                    }
                ]
            },
            {
                module: 'CLONE',
                windows: [
                    {
                        id: 'Donut',
                        top: '10px',
                        left: '10px',
                        visible: "visible"
                    },
                    {
                        id: 'Alarm',
                        top: '0px',
                        left: '10px',
                        visible: "visible"
                    }
                ]
            },
            {
                module: 'AI',
                windows: [
                    {
                        id: 'Donut',
                        top: '10px',
                        left: '10px',
                        visible: "visible"
                    }
                ]
            },
            {
                module: 'LEARN',
                windows: [
                    {
                        id: 'Donut',
                        top: '10px',
                        left: '10px',
                        visible: "visible"
                    }
                ]
            }
        ],
        topbar: {
            groups: {
                'data': [
                    [
                        { icon: '/DASHBOARD.svg', text: `Dashboard`, link: '' },
                        { icon: '/MONITOR.svg', text: `Monitoraggio`, link: '/monitor' },
                        { icon: '/BUILD.svg', text: `Costruzione`, link: '/build' },
                    ], [
                        { icon: '/EDIT.svg', text: `Configurazione`, link: '/configure' },
                        { icon: '/DEPLOY.svg', text: `Rilascio`, link: '/deploy' }
                    ]
                ]
            }
        }
    },
    {
        uid: 'dd7b658f-66ca-7aa3-965d-abd4bc48a59a',
        language: 'it',
        locale: 'it-IT',
        avatar: '/flutrario.png',
        data: {
            family: 'INDUSTRY'
        },
        dashboard: [
            {
                module: 'DEFAULT',
                windows: [
                    {
                        id: 'Donut',
                        top: '10px',
                        left: '10px',
                        visible: "visible"
                    }
                ]
            },
            {
                module: 'DATA',
                windows: [
                    {
                        id: 'Donut',
                        top: '380px',
                        left: '10px',
                        visible: "visible"
                    },
                    {
                        id: 'Map',
                        top: '0px',
                        left: '10px',
                        height: '340px',
                        visible: "visible",
                        params: { center: { lat: 42.19886, lon: 13.15534 }, zoom: 7, zoomfactor: 12, markeroffset: 0.000025 }
                    },
                    {
                        id: 'Alarms',
                        top: '0px',
                        left: '620px',
                        height: '350px',
                        width: '850px',
                        visible: "visible"
                    },
                    {
                        id: 'Communication',
                        top: '298px',
                        left: '1020px',
                        height: '300px',
                        width: '350px',
                        visible: "visible"
                    }
                ]
            },
            {
                module: 'CLONE',
                windows: [
                    {
                        id: 'Donut',
                        top: '10px',
                        left: '10px',
                        visible: "visible"
                    },
                    {
                        id: 'Alarm',
                        top: '0px',
                        left: '10px',
                        visible: "visible"
                    }
                ]
            },
            {
                module: 'AI',
                windows: [
                    {
                        id: 'Donut',
                        top: '10px',
                        left: '10px',
                        visible: "visible"
                    }
                ]
            },
            {
                module: 'LEARN',
                windows: [
                    {
                        id: 'Donut',
                        top: '10px',
                        left: '10px',
                        visible: "visible"
                    }
                ]
            }
        ],
        topbar: {
            groups: {
                'data': [
                    [
                        { icon: '/DASHBOARD.svg', text: `Home`, link: '' },
                        { icon: '/MONITOR.svg', text: `Monitor`, link: '/monitor' },
                        { icon: '/BUILD.svg', text: `Build`, link: '/build' },
                    ], [
                        { icon: '/EDIT.svg', text: `Configure`, link: '/configure' },
                        { icon: '/DEPLOY.svg', text: `Deploy`, link: '/deploy' }
                    ]
                ]
            }
        }
    },
    {
        uid: 'dd7b65da-66b8-7aa3-965d-abd4bc48a59a',
        language: 'it',
        locale: 'it-IT',
        avatar: '/rpanchetti.png',
        data: {
            family: 'WWATER'
        },
        dashboard: [
            {
                module: 'DEFAULT',
                windows: [
                    {
                        id: 'Donut',
                        top: '10px',
                        left: '10px',
                        visible: "visible"
                    }
                ]
            },
            {
                module: 'DATA',
                colorScheme: { wincolor:'#eaf5eb'},
                windows: [
                    { id: 'Donut', top: '380px', left: '10px' },
                    {
                        id: 'Map',
                        top: '0px',
                        left: '10px',
                        visible: "visible",
                        height: '340px',
                        params: { center: { lat: 42.01, lon: 12.30 }, zoom: 14.5, zoomfactor: 3 }
                    },
                    {
                        id: 'Alarms',
                        top: '0px',
                        left: '620px',
                        height: '350px',
                        width: '850px',
                        visible: "visible"
                    },
                    {
                        id: 'Communication',
                        top: '298px',
                        left: '1020px',
                        height: '300px',
                        width: '350px',
                        visible: "visible"
                    }
                ]
            },
            {
                module: 'CLONE',
                windows: [
                    {
                        id: 'Donut',
                        top: '10px',
                        left: '10px',
                        visible: "visible"
                    },
                    {
                        id: 'Alarm',
                        top: '0px',
                        left: '10px',
                        visible: "visible"
                    }
                ]
            },
            {
                module: 'AI',
                windows: [
                    {
                        id: 'Donut',
                        top: '10px',
                        left: '10px',
                        visible: "visible"
                    }
                ]
            },
            {
                module: 'LEARN',
                windows: [
                    {
                        id: 'Donut',
                        top: '10px',
                        left: '10px',
                        visible: "visible"
                    }
                ]
            }
        ],
        topbar: {
            groups: {
                'data': [
                    [
                        { icon: '/DASHBOARD.svg', text: `Home`, link: '' },
                        { icon: '/MONITOR.svg', text: `Monitor`, link: '/monitor' },
                        { icon: '/BUILD.svg', text: `Build`, link: '/build' },
                    ], [
                        { icon: '/EDIT.svg', text: `Configure`, link: '/configure' },
                        { icon: '/DEPLOY.svg', text: `Deploy`, link: '/deploy' }
                    ]
                ]
            }
        }
    },
    {
        uid: '447b658f-66ca-7aa3-965d-abd4bc22a893',
        language: 'en',
        locale: 'en-US',
        avatar: '/LORENZO.png',
        data: {
            family: 'WWATER'
        },
        dashboard: [
            {
                module: 'DEFAULT',
                windows: [
                    {
                        id: 'Donut',
                        top: '10px',
                        left: '10px',
                        visible: "visible"
                    }
                ]
            },
            {
                module: 'DATA',
                windows: [
                    {
                        id: 'Monitor',
                        top: '290px',
                        left: '10px',
                        height: '320px',
                        visible: "visible"
                    },
                    {
                        id: 'Map',
                        top: '0px',
                        left: '10px',
                        height: '340px',
                        visible: "visible",
                        params: { center: { lat: 41.9636, lon: 12.4975 }, zoom: 14.5, zoomfactor: 3, pitch: 45, bearing: -15.7 }
                    },
                    {
                        id: 'Alarms',
                        top: '0px',
                        left: '620px',
                        height: '350px',
                        width: '850px',
                        visible: "visible"
                    },
                    {
                        id: 'Communication',
                        top: '298px',
                        left: '1020px',
                        height: '300px',
                        width: '350px',
                        visible: "visible"
                    }
                ]
            },
            {
                module: 'CLONE',
                windows: [
                    {
                        id: 'Donut',
                        top: '10px',
                        left: '10px',
                        visible: "visible"
                    },
                    {
                        id: 'Alarm',
                        top: '0px',
                        left: '10px',
                        visible: "visible"
                    }
                ]
            },
            {
                module: 'AI',
                windows: [
                    {
                        id: 'Donut',
                        top: '10px',
                        left: '10px',
                        visible: "visible"
                    }
                ]
            },
            {
                module: 'LEARN',
                windows: [
                    {
                        id: 'Donut',
                        top: '10px',
                        left: '10px',
                        visible: "visible"
                    }
                ]
            }
        ],
        topbar: {
            groups: {
                'data': [
                    [
                        { icon: '/DASHBOARD.svg', text: `Home`, link: '' },
                        { icon: '/MONITOR.svg', text: `Monitor`, link: '/monitor' },
                    ]
                ]
            }
        }
    }
]

/** MORGAN CONFIGURATION FOR LOG
 *                          - :date[format]
 * req.socket.remoteAddress  - :remote-addr
 * req.socket.remotePort  - 
 * req.ip   - 
 * req.protocol 
 * req.method - :method
 * req.body.type
 * req.body.version
 * req.body.command
 * req.body.command.options
 * req.hostname
 * req.path - :url
 * req.headers - :req[header]
 * req.tls
 * res.statusMessage
 * res.statusCode - :status
 * res.getHeaders() - :res[header]
 * res.getHeader("Content-Length")
 *                              - :total-time[digits]
 * LOG EXAMPLE
 * 2024-03-02 12:58:05:585 info: pulicani@yahoo.com OK ::ffff:127.0.0.1 56977 https POST {"type":"api","version":1,"command":"changeStatement","options":{"uid":"347cf976-6ea9-46a3-912b-9208d822944e","statement":"changed my statement"}} {"host":"127.0.0.1:3004","accept-encoding":"gzip, deflate","accept":"application/json; charset=utf-8","content-type":"application/json","content-length":"146","connection":"close"} 127.0.0.1 /command - 200 39.173 1280
 * |------- ts ----------|-level|-----userId------|msg|--remote ip ---|-rport|-prot|-method|--------------- body --------------------------------------------------------------------------------------------------------------------------|---------------  req heder --------------------------------------------------------------------------------------------------------------------------------------------------------|-hostname-|--url---|referrer|status|totaltime|content length|
 */



const levels = ['info:', 'error:']
const messages = ['OK', 'Internal.server.error']
const states = ['200', '500']
const rips = ['10.18.19.1', '170.92.16.101', '116.58.205.36', '107.248.107.206']
const riports = ['47801', '89567', '63937', '46981']
const methods = ['POST', 'GET']
const commands = ['createUser', 'activateUser', 'login', 'setUser', 'deleteUser', 'logout', 'setAvatar', 'setProfile', 'setDevice', 'deleteDevice', 'setAgent', 'deleteAgent']

function generateLogs(num = 30) {
    const logs = []
    for (let i = 0; i < num; i++) {
        let log = ''
        const uid = uuidv4()
        const now = Date.now()
        const start = new Date("2023-01-01")
        const newdate1 = new Date(start.getTime() + Math.random() * (now - start.getTime()));
        const ts = newdate1.toISOString().split('Z')[0]
        // generate level
        let lindex = Math.floor(Math.random() * 1.1)
        const level = levels[lindex]
        // generate logger
        const logger = 'morgan'
        // generate userid
        let luser = Math.floor(Math.random() * (users.length - 1))
        const userId = users[luser].username
        // generate message and status
        let mindex = Math.floor(Math.random() * 1.1)
        let msg = messages[mindex]
        let status = states[mindex]
        // generate remote ip and remote port 
        let ipindex = Math.floor(Math.random() * (rips.length - 1))
        let rip = rips[ipindex]
        let riport = riports[ipindex]
        // generate protocol
        let prot = 'https'
        // generet methods
        // generate message and status
        let nindex = Math.floor(Math.random() * 1.1)
        let method = methods[nindex]
        // generate body
        let body = '-'
        if (method == 'POST') {
            let cindex = Math.floor(Math.random() * (commands.length - 1))
            let command = commands[cindex]
            body = '{"type":"api","version":1,"command":"' + command + '","options":{"uid":"347cf976-6ea9-46a3-912b-9208d822944e"}}'
        }
        let reqheders = '{"host":"127.0.0.1:3004","accept-encoding":"gzip,deflate","accept":"application/json;charset=utf-8","content-type":"application/json","content-length":"146","connection":"close"}'
        const hostname = 'up2twin016.sicheo.cloud'
        let url = '/command'
        let referrer = '-'
        let totalms = Math.floor(Math.random() * 100)
        let totalmms = Math.floor(Math.random() * 100)
        let totaltime = totalms + '.' + totalmms
        let contentlenght = Math.floor(Math.random() * 2400)
        log = uid + ' '+ ts + ' ' + level + ' ' +logger+' '+ userId + ' ' + msg + ' ' + rip + ' ' + riport + ' ' + prot + ' ' + method + ' ' + body + ' ' + reqheders + ' ' + hostname + ' ' + url + ' ' + referrer + ' ' + status + ' ' + totaltime + ' ' + contentlenght
        logs.push(log)
    }
    return logs
}

const logs = generateLogs(40)

const alertsTemplates = [
    'Suspicious login on your server at',
    'Successful login attempt by @johndoe at',
    'Successful login attempt by @amy at',
    'Suspicious login on your server at',
    'Suspicious login on your server at',
    'Successful login attempt by @horace at',
    'Suspicious login on your server at',
    'Successful login attempt by @jack at'
]
function generateSecurityAlerts(num = 4) {
    const secAlerts = []
    for (let i = 0; i < num; i++) {
        let secAlert = {}
        secAlert.uid = uuidv4()
        // generate date
        const now = Date.now()
        const start = new Date("2023-01-01")
        const newdate1 = new Date(start.getTime() + Math.random() * (now - start.getTime()));
        secAlert.date = newdate1.toISOString().split('Z')[0]
        // get random alet template
        let aindex = Math.floor(Math.random() * (alertsTemplates.length - 1))
        secAlert.message = alertsTemplates[aindex] + ' ' + secAlert.date
        // generate status
        //let sindex = Math.floor(Math.random() * 1.1)
        //secAlert.status = levels[sindex]
        secAlerts.push(secAlert)
    }

    return secAlerts
}

let securityAlerts = generateSecurityAlerts(8)
const getUsers = async function (body) {
    let retUsers = JSON.parse(JSON.stringify(users))
    const filters = body.options.filters
    if (filters && filters.length) {
        retUsers = filterArray(retUsers, filters)
    }
    // ADD PROFILES
    let retProfiles = JSON.parse(JSON.stringify(profiles))
    for (let i = 0; i < retUsers.length; i++) {
        const found = retProfiles.find((item) => (item.uid == retUsers[i].uid))
        retUsers[i].profile = found
    }
    body.data = retUsers
    return (body)
}

const setUser = async function (body) {
    const user = body.options.user
    let old = null
    let oldp = null
    if (user) {
        const existing = users.findIndex((item) => { return item.uid == user.uid })
        if (existing > -1) {
            old = users[existing]
            users[existing] = user
        } else {
            users.push(user)
        }
        // SET PROFILE TOO..
        const existingprof = profiles.findIndex((item) => { return item.uid == user.profile.uid })
        if (existingprof > -1) {
            oldp = profiles[existingprof]
            profiles[existingprof] = user.profile
        } else {
            profiles.push(user.profile)
        }
    }
    return user
}

const deleteUser = async function (body) {
    const filters = body.options.filters
    // CLONE USERS
    let clone = JSON.parse(JSON.stringify(users))
    clone = filterArray(clone, filters, true)
    // LOOP USERS - IF NOT IN CLONE DELETE PROFILE
    for (let i = 0; i < users; i++) {
        const found = clone.find((item) => item.uid == users[i].uid)
        if (!found)
            profiles = profiles.filterArray((item) =>item.uid != users[i].uid)
    }
    users = clone
    body.data = users
    return (body)
}


const userVerify = async function (username, password){
    if (!username || !password)
        throw ("MISSED_CREDENTIAL_ERROR")
    const index = users.findIndex((item) => (item.username == username && item.password == password))
    if (index < 0)
        throw ("BAD_CREDENTIAL_ERROR")
    return (users[index])
}

const decodeToken = async function (jwt) {
    return jwt
}

const getAvatar = async function (body) {
    const uid = body.options.uid
    const found = profiles.find((item) => item.uid == uid)
    if (found)
        return (found.avatar)
    return(null)
}

const setAvatar = async function (body) {
    const uid = body.options.uid
    const avatar = body.options.avatar
    const index = profiles.findIndex((item) => item.uid == uid)
    if (index > -1)
        profiles[index].avatar = avatar
        
}

const getProfile = async function (body) {
    const uid = body.options.uid
    const found = profiles.find((item) => item.uid == uid)
    if (found)
        return (found)
    return (null)
}

const setProfile = async function (body) {
    const uid = body.options.uid
    const profile = body.options.profile
    const index = profiles.findIndex((item) => item.uid == uid)
    if (index > -1)
        profiles[index] = profile

}
const getLogs = async function (body) {
    let retLogs = JSON.parse(JSON.stringify(logs))
    const filters = body.options.filters
    if (filters && filters.length) {
        retLogs = filterArray(retLogs, filters)
    }
    body.data = retLogs
    return (body)
}

const getLogsByCommand = async function (body) {
    let retLogs = JSON.parse(JSON.stringify(logs))
    retLogs = retLogs.filter((item) => item.includes('POST'))
    retLogs = retLogs.filter((item) => item.includes(body.options.command))
    body.data = retLogs
    return (body)
}

const getLogsByUser = async function (body) {
    let retLogs = JSON.parse(JSON.stringify(logs))
    retLogs = retLogs.filter((item) => item.includes('POST'))
    retLogs = retLogs.filter((item) => item.includes(body.options.user))
    body.data = retLogs
    return (body)
}

const getLogsByUid = async function (body) {
    let retLogs = JSON.parse(JSON.stringify(logs))
    retLogs = retLogs.filter((item) => item.includes('POST'))
    retLogs = retLogs.filter((item) => item.includes(body.options.uid))
    body.data = retLogs
    return (body)
}


const login = async function (body) {
    if (!body ||!body.username || !body.password)
        throw ("MISSED_CREDENTIAL_ERROR")
    const username = body.username
    const password = body.password
    const user = await userVerify(username,password)
    const tknuser = { sub: user.username, auth: user.role, permissions: user.permissions, uuid: user.uid, name: user.name, surname: user.surname };
    return tknuser
    
}


const getSecurityAlerts = async function (body) {
    let retAlerts = JSON.parse(JSON.stringify(securityAlerts))
    const filters = body.options.filters
    if (filters && filters.length) {
        retAlerts = filterArray(retAlerts, filters)
    }
    // order by date
    retAlerts.sort((a, b) => {
        return new Date(b.date) - new Date(a.date)
    })
    body.data = retAlerts
    return (body)
}

const setSecurityAlert = async function (body) {
    const alert = body.options.alert
    let old = null
    let oldp = null
    if (alert) {
        const existing = securityAlerts.findIndex((item) => { return item.uid == alert.uid })
        if (existing > -1) {
            old = securityAlerts[existing]
            securityAlerts[existing] = alert
        } else {
            securityAlerts.push(alert)
        }
    }
    return alert
}

const deleteSecurityAlert = async function (body) {
    const filters = body.options.filters
    // CLONE USERS
    let clone = JSON.parse(JSON.stringify(securityAlerts))
    clone = filterArray(clone, filters, true)
    securityAlerts = clone
    body.data = securityAlerts
    return (body)
}


const USER = {
    getUsers,
    setUser,
    deleteUser,
    decodeToken,
    login,
    getAvatar,
    getProfile,
    getLogs,
    getLogsByCommand,
    getLogsByUser,
    getLogsByUid,
    setAvatar,
    setProfile,
    getSecurityAlerts,
    setSecurityAlert,
    deleteSecurityAlert
}

export default USER
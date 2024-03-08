import { filterArray } from './mock.js'

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
        confitmationCode: null,
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
        confitmationCode: null,
        createdAt: '2024-02-25T17:23:06.705859',
        updatedAt: '2024-02-25T17:23:06.705859'
    }
]

let profiles = [
    {
        uid: '55a96422-88cd-43ab-aa56-f4d4b022a77e',
        language: 'en',
        avatar: '/AVATAR1.png',
        dashboard:[]
    },
    {
        uid: '447b658f-66ca-7aa3-965d-abd4bc22a893',
        language: 'en',
        avatar: '/LORENZO.png',
        dashboard: []
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

const logsStruct = [
    {
        ts: 1646861401.5241024,
        level: "info",
        logger: "http.log.access",
        msg: "handled request",
        request: {
            remote_ip: "127.0.0.1",
            remote_port: "41342",
            client_ip: "127.0.0.1",
            proto: "HTTP/2.0",
            method: "POST",
            body: {
                type: "api",
                version: 1.0,
                command: "dockerInfo",
                options: {
                    uid: '456789102345'
                },
            },
            host: "localhost",
            uri: "/",
            headers: {
                "User-Agent": ["curl/7.82.0"],
                "Accept": ["*/*"],
                "Accept-Encoding": ["gzip, deflate, br"],
            },
            tls: {
                resumed: false,
                version: 772,
                cipher_suite: 4865,
                proto: "h2",
                server_name: "example.com"
            },
            bytesRead: 0,
            userId: "",
            duration: 0.000929675,
            size: 10900,
            status: 200,
            respHeaders: {
                "Server": ["Caddy"],
                "Content-Encoding": ["gzip"],
                "Content-Type": ["text/html; charset=utf-8"],
                "Vary": ["Accept-Encoding"]
            }
        }
    }
]

const levels = ['info:', 'error:']
const messages = ['OK', 'Internal.server.error']
const states = ['200', '500']
const rips = ['10.18.19.1', '170.92.16.101', '116.58.205.36', '107.248.107.206']
const riports = ['47801', '89567', '63937', '46981']
const methods = ['POST', 'GET']
const commands = ['createUser', 'activateUser', 'login', 'setUser', 'deleteUser', 'logout', 'setAvatar', 'setDevice', 'deleteDevice', 'setAgent', 'deleteAgent']

function generateLogs(num = 30) {
    const logs = []
    for (let i = 0; i < num; i++) {
        let log=''
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
        log = ts + ' ' + level + ' ' +logger+' '+ userId + ' ' + msg + ' ' + rip + ' ' + riport + ' ' + prot + ' ' + method + ' ' + body + ' ' + reqheders + ' ' + hostname + ' ' + url + ' ' + referrer + ' ' + status + ' ' + totaltime + ' ' + contentlenght
        logs.push(log)
    }
    return logs
}

const logs = generateLogs(40)
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


const login = async function (body) {
    if (!body ||!body.username || !body.password)
        throw ("MISSED_CREDENTIAL_ERROR")
    const username = body.username
    const password = body.password
    const user = await userVerify(username,password)
    const tknuser = { sub: user.username, auth: user.role, permissions: user.permissions, uuid: user.uid, name: user.name, surname: user.surname };
    return tknuser
    
}



const USER = {
    getUsers,
    setUser,
    deleteUser,
    decodeToken,
    login,
    getAvatar,
    getLogs,
    getLogsByCommand,
    getLogsByUser,
    setAvatar
}

export default USER
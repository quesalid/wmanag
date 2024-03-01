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
 * req.socket.remoteAddress  
 * req.socket.remotePort 
 * req.ip 
 * req.protocol 
 * req.method 
 * req.body.type
 * req.body.version
 * req.body.command
 * req.body.command.options
 * req.hostname
 * req.path
 * req.headers
 * req.tls
 * res.statusMessage
 * res.statusCode
 * res.getHeaders()
 * res.getHeader("Content-Length")
*/
const logs = [
       {
        level: "info",
        ts: 1646861401.5241024,
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
                }
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

const login = async function (body) {
    console.log("MOCK LOGIN",body)
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
    setAvatar
}

export default USER
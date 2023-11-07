
const authorization = "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOIiwiaWF0IjoxNjM5MDYzNTEzLCJleHAiOjE2MzkwNjUzMTN9.m23DGAbqqaf0_GbOxJO6OyFTMtlhvV_2IenhtqYghU96MbURMn24LZ4DvbLntRHQlLUYB1M7O_UHSNVIZPWtqw"
const role = "ROLE_SADMIN"
const AUTHMODE = "JWT"
const users = [
    { userid: 'admin', password: 'admin', role: 'ROLE_ADMIN' },
    { userid: 'sadmin', password: 'sadmin', role: 'ROLE_SADMIN' },
    { userid: 'user', password: 'user', role: 'ROLE_USER' }
]

let scanners = []
let hists = []
const agentGetInfo = async function (body) {
    const infos = {
        childrens: [
            {
                cname: "scanner1",
                ctype: "scanner",
                optype: "fork"
            },
            {
                cname: "hist1",
                ctype: "hist",
                optype: "fork"
            },
            {
                cname: "mqtt",
                ctype: "mqtt",
                optype: "fork"
            }
        ],
        auth: {
            name: "credentials",
            options: {
                _credentials: "credentials.json"
            }
        },
        env: {
            VERSION: "1.1",
            HTTPTYPE: "HTTPS",
            CORSENABLE: true,
            WEBSOCK: true,
            HIDEBUG: true,
            SCDEBUG: true,
            WSDEBUG: false,
            MQTTDEBUG: false,
            BEACONTIMEOUT: 10000,
            BEACONENABLE: false,
            PORT: 3001,
        },
        log: {
            name: "mqttlog",
            options: {
                channel: "LOGGER",
                mqtts: true,
                clean: false,
                qos: 1,
                server: "127.0.0.1",
                port: 8883
            }
        }
    }
    body.data = infos
    body.result = true
    body.error = null
    return (body)
}


const agentLogin = async function (body) {
    const found = users.find((user) => user.userid === body.options.options.username && user.password === body.options.options.password)
    console.log("agentLogin", body.options.options,found,users)
    if (!found || found == null) {
        body.data = null
        body.result = false
        body.error = "Bad userid/passwd"
        return (body)
    }
    const res = { token: authorization, role: role, authmode: AUTHMODE }
    body.data = res
    body.result = true
    body.error = null
    return (body)
}

const agentAddScanner = async function (body) {
    // CHECK IF SCANNER EXISTS
    const scanner = scanners.find((scanner) => scanner.id === body.options.id)
    if (scanner) {
        body.data = null
        body.result = false
        body.error = "Scanner already exists"
        return (body)
    }
    scanners.push(body.options)
    body.data = 'added new scanner ' + body.options.id
    body.result = true
    body.error = null
    return (body)
}

const agentAddHist = async function (body) {
    // CHECK IF HISTORIAN EXISTS
    const hist = hists.find((hist) => hist.id === body.options.id)
    if (hist) {
        body.data = null
        body.result = false
        body.error = "Historian already exists"
        return (body)
    }
    hists.push(body.options)
    body.data = 'added new hist ' + body.options.id
    body.result = true
    body.error = null
    return (body)
}

const agentGetScanner = async function (body) {
    // CHECK IF SCANNER EXISTS
    const scanner = scanners.find((scanner) => scanner.id === body.options.name)
    if (!scanner) {
        body.data = null
        body.result = false
        body.error = "Scanner does not exist"
        return (body)
    }
    
    body.data = scanner
    body.result = true
    body.error = null
    return (body)
}

const agentGetHist = async function (body) {
    // CHECK IF HISTORIAN EXISTS
    const hist = hists.find((hist) => hist.id === body.options.name)
    if (!hist) {
        body.data = null
        body.result = false
        body.error = "Historian does not exist"
        return (body)
    }

    body.data = hist
    body.result = true
    body.error = null
    return (body)
}

const agentAddFileScanner = async function (body) {
    
    body.data = 'File stream added to scanner' 
    body.result = true
    body.error = null
    return (body)
}

const agentStartScanner = async function (body) {
    // CHECK IF SCANNER EXISTS
    const scanner = scanners.find((scanner) => scanner.id === body.options.name)
    if (!scanner) {
        body.data = null
        body.result = false
        body.error = "Scanner does not exist"
        return (body)
    }
    // CHECK IF SCANNER IS ALREADY RUNNING
    if (scanner.status === 'START') {
        body.data = null
        body.result = false
        body.error = "Scanner is already running"
        return (body)
    }
    scanner.status = 'START'
    body.data = 'started scanner ' + body.options.name
    body.result = true
    body.error = null
    return (body)
}

const agentStartHist = async function (body) {
    // CHECK IF HISTORIAN EXISTS
    const hist = hists.find((hist) => hist.id === body.options.name)
    if (!hist) {
        body.data = null
        body.result = false
        body.error = "Historian does not exist"
        return (body)
    }
    // CHECK IF HIST IS ALREADY RUNNING
    if (hist.status === 'START') {
        body.data = null
        body.result = false
        body.error = "Hist is already running"
        return (body)
    }
    hist.status = 'START'
    body.data = 'started hist ' + body.options.name
    body.result = true
    body.error = null
    return (body)
}

const agentStopScanner = async function (body) {
    // CHECK IF SCANNER EXISTS
    const scanner = scanners.find((scanner) => scanner.id === body.options.name)
    if (!scanner) {
        body.data = null
        body.result = false
        body.error = "Scanner does not exist"
        return (body)
    }
    scanner.status = 'STOP'
    body.data = 'stopped scanner ' + body.options.name
    body.result = true
    body.error = null
    return (body)
}

const agentStopHist = async function (body) {
    // CHECK IF HISTORIAN EXISTS
    const hist = hists.find((hist) => hist.id === body.options.name)
    if (!hist) {
        body.data = null
        body.result = false
        body.error = "Historian does not exist"
        return (body)
    }
    hist.status = 'STOP'
    body.data = 'stopped hist ' + body.options.name
    body.result = true
    body.error = null
    return (body)
}

const agentStatusScanner = async function (body) {
    // CHECK IF SCANNER EXISTS
    const scanner = scanners.find((scanner) => scanner.id === body.options.name)
    if (!scanner) {
        body.data = null
        body.result = false
        body.error = "Scanner does not exist"
        return (body)
    }
    body.data = scanner.status
    body.result = true
    body.error = null
    return (body)
}

const agentStatusHist = async function (body) {
    // CHECK IF HISTORIAN EXISTS
    const hist = hists.find((hist) => hist.id === body.options.name)
    if (!hist) {
        body.data = null
        body.result = false
        body.error = "Historian does not exist"
        return (body)
    }
    body.data = hist.status
    body.result = true
    body.error = null
    return (body)
}

const agentRemoveScanner = async function (body) {
    // CHECK IF SCANNER EXISTS
    const scanner = scanners.find((scanner) => scanner.id === body.options.name)
    if (!scanner) {
        body.data = null
        body.result = false
        body.error = "Scanner does not exist"
        return (body)
    }
    // CHECK IF SCANNER IS ALREADY RUNNING
    if (scanner.status === 'START') {
        body.data = null
        body.result = false
        body.error = "Scanner is running"
        return (body)
    }
    scanners = scanners.filter((scanner) => scanner.id !== body.options.name)
    body.data = 'removed scanner ' + body.options.name
    body.result = true
    body.error = null
    return (body)
}

const agentRemoveHist = async function (body) {
    // CHECK IF HISTORIAN EXISTS
    const hist = hists.find((hist) => hist.id === body.options.name)
    if (!hist) {
        body.data = null
        body.result = false
        body.error = "Historian does not exist"
        return (body)
    }
    // CHECK IF HIST IS ALREADY RUNNING
    if (hist.status === 'START') {
        body.data = null
        body.result = false
        body.error = "Hist is  running"
        return (body)
    }
    hists = hists.filter((hist) => hist.id !== body.options.name)
    body.data = 'removed hist ' + body.options.name
    body.result = true
    body.error = null
    return (body)
}

const agentPingScanner = async function (body) {
    // CHECK IF SCANNER EXISTS
    body.data = true
    body.result = true
    body.error = null
    return (body)
}

const agentPingHist = async function (body) {
    // CHECK IF SCANNER EXISTS
    body.data = true
    body.result = true
    body.error = null
    return (body)
}

const agentLogout = async function (body) {

    const res = { token: null}
    body.data = res
    body.result = true
    body.error = null
    return (body)
}

const AGENT = {
    agentGetInfo,
    agentLogin,
    agentAddScanner,
    agentAddHist,
    agentGetScanner,
    agentGetHist,
    agentAddFileScanner,
    agentStartScanner,
    agentStartHist,
    agentStopScanner,
    agentStopHist,
    agentStatusScanner,
    agentStatusHist,
    agentRemoveScanner,
    agentRemoveHist,
    agentPingScanner,
    agentPingHist,
    agentLogout
}

export default AGENT
import { callFetchGet, callFetchPost, getCHeader, baseUrl, sleep } from './api.js';
import mocks from './mockdataagent.js';

/**
 * Get Agent Info
 * @param {any} protocol HTTP or HTTPS or WEBSOCKET
 * @param {any} host   server hostname or IP
 * @param {any} port    server port
 * @param {any} mock    use mock (default=false)
 * @returns server configuration parameters
 */
export const agentGetInfo = async function (protocol,host,port, mock = false) {
    return new Promise(async (resolve, reject) => {
        const url = baseUrl + '/agent'
        const body = {
            type: "api",
            version: 1.0,
            command: "agentGetInfo",
            options: {
                url: protocol + '://' + host + ':' + port + '/server'
            }
        }
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        } else {
            await sleep(1000)
            resolve(mocks.agentGetInfo(body))
        }
    })
}

/**
 * Login into server
 * @param {any} protocol HTTP or HTTPS or WEBSOCKET
 * @param {any} host   server hostname or IP
 * @param {any} port    server port
 * @param {any} aguserid userid
 * @param {any} agpasswd password
 * @param {any} mock    use mock (default=false)
 * @returns server configuration parameters
 */
export const agentLogin = async function (protocol, host, port, aguserid, agpasswd, mock = false) {
    return new Promise(async (resolve, reject) => {
        const url = baseUrl + '/agent'
        const body = {
            type: "api",
            version: 1.0,
            command: "agentLogin",
            options: {
                url: protocol + '://' + host + ':' + port + '/server/login',
                options: {
                    username: aguserid,
                    password: agpasswd
                }
            }
        };
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        } else {
            await sleep(1000)
            resolve(mocks.agentLogin(body))
        }
    })
}

/**
 * Add scanner agent to server
 * @param {any} protocol HTTP or HTTPS or WEBSOCKET
 * @param {any} host   server hostname or IP
 * @param {any} port    server port
 * @param {any} devicetoken login token received from server
 * @param {any} scannercon scanner configuration object
 * @param {any} mock    use mock (default=false)
 * @returns
 */
export const agentAddScanner = async function (protocol, host, port, devicetoken, scannercon, mock = false) {
    return new Promise(async (resolve, reject) => {
        const url = baseUrl + '/agent'
        const body = {
            type: "api",
            version: 1.0,
            command: "agentAddScanner",
            options: {
                url: protocol + '://' + host + ':' + port + '/server/scanner',
                devicetoken: devicetoken,
                worker: 'scanner1',
                options: scannercon
            }
        };
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        } else {
            await sleep(1000)
            resolve(mocks.agentAddScanner(body))
        }
    })
}

/**
 * Add historian agent to server
 * @param {any} protocol HTTP or HTTPS or WEBSOCKET
 * @param {any} host   server hostname or IP
 * @param {any} port    server port
 * @param {any} devicetoken login token received from server
 * @param {any} histcon historian configuration object
 * @param {any} mock    use mock (default=false)
 * @returns
 */
export const agentAddHist = async function (protocol, host, port, devicetoken, histcon, mock = false) {
    return new Promise(async (resolve, reject) => {
        const url = baseUrl + '/agent'
        const body = {
            type: "api",
            version: 1.0,
            command: "agentAddHist",
            options: {
                url: protocol + '://' + host + ':' + port + '/server/hist',
                devicetoken: devicetoken,
                worker: 'hist1',
                options: histcon
            }
        };
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        } else {
            await sleep(1000)
            resolve(mocks.agentAddHist(body))
        }
    })
}

/**
  * Get scanner agent from server
 * @param {any} protocol HTTP or HTTPS or WEBSOCKET
 * @param {any} host   server hostname or IP
 * @param {any} port    server port
 * @param {any} devicetoken login token received from server
 * @param {any} id name of scanner
 * @param {any} mock    use mock (default=false)
 * @returns
 */
export const agentGetScanner = async function (protocol, host, port, devicetoken, id, mock = false) {
    return new Promise(async (resolve, reject) => {
        const url = baseUrl + '/agent'
        const body = {
            type: "api",
            version: 1.0,
            command: "agentGetScanner",
            options: {
                url: protocol + '://' + host + ':' + port + '/server/scanner',
                devicetoken: devicetoken,
                worker: 'scanner1',
                options: {
                    name: id
                }
            }
        }
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        } else {
            await sleep(1000)
            resolve(mocks.agentGetScanner(body))
        }
    })
}

/**
 /**
 * Get historian agent from server
 * @param {any} protocol HTTP or HTTPS or WEBSOCKET
 * @param {any} host   server hostname or IP
 * @param {any} port    server port
 * @param {any} devicetoken login token received from server
 * @param {any} id  name of historian
 * @param {any} mock    use mock (default=false)
 * @returns
 */
export const agentGetHist = async function (protocol, host, port, devicetoken, id, mock = false) {
    return new Promise(async (resolve, reject) => {
        const url = baseUrl + '/agent'
        const body = {
            type: "api",
            version: 1.0,
            command: "agentGetHist",
            options: {
                url: protocol + '://' + host + ':' + port + '/server/hist',
                devicetoken: devicetoken,
                worker: 'hist1',
                options: {
                    name: id
                }
            }
        };
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        } else {
            await sleep(1000)
            resolve(mocks.agentGetHist(body))
        }
    })
}

/**
 * Add field point file to scanner
 * @param {any} protocol HTTP or HTTPS or WEBSOCKET
 * @param {any} host   server hostname or IP
 * @param {any} port    server port
 * @param {any} devicetoken login token received from server
 * @param {any} scannerfile csv db file for scanner
 * @param {any} mock    use mock (default=false)
 * @returns
 */
export const agentAddFileScanner = async function (protocol, host, port, devicetoken, scannerfile, mock = false) {
    return new Promise(async (resolve, reject) => {
        const url = baseUrl + '/agent'
        const body = {
            type: "api",
            version: 1.0,
            command: "agentAddFileScanner",
            options: {
                url: protocol + '://' + host + ':' + port + '/server/scanner',
                devicetoken: devicetoken,
                worker: 'scanner1',
                options: scannerfile
            }
        };
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        } else {
            await sleep(1000)
            resolve(mocks.agentAddFileScanner(body))
        }
    })
}

/**
 * Start scanner agent
 * @param {any} protocol HTTP or HTTPS or WEBSOCKET
 * @param {any} host   server hostname or IP
 * @param {any} port    server port
 * @param {any} devicetoken login token received from server
 * @param {any} id scanner id
 * @param {any} mock    use mock (default=false)
 * @returns
 */
export const agentStartScanner = async function (protocol, host, port, devicetoken, id, mock = false) {
    return new Promise(async (resolve, reject) => {
        const url = baseUrl + '/agent'
        const body = {
            type: "api",
            version: 1.0,
            command: "agentStartScanner",
            options: {
                url: protocol + '://' + host + ':' + port + '/server/scanner',
                devicetoken: devicetoken,
                worker: 'scanner1',
                options: {
                    name: id
                }
            }
        };
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        } else {
            await sleep(1000)
            resolve(mocks.agentStartScanner(body))
        }
    })
}

/**
 * Start hist agent
 * @param {any} protocol HTTP or HTTPS or WEBSOCKET
 * @param {any} host   server hostname or IP
 * @param {any} port    server port
 * @param {any} devicetoken login token received from server
 * @param {any} id hist id
 * @param {any} mock    use mock (default=false)
 * @returns
 */
export const agentStartHist = async function (protocol, host, port, devicetoken, id, mock = false) {
    return new Promise(async (resolve, reject) => {
        const url = baseUrl + '/agent'
        const body = {
            type: "api",
            version: 1.0,
            command: "agentStartHist",
            options: {
                url: protocol + '://' + host + ':' + port + '/server/hist',
                devicetoken: devicetoken,
                worker: 'hist1',
                options: {
                    name: id
                }
            }
        };
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        } else {
            await sleep(1000)
            resolve(mocks.agentStartHist(body))
        }
    })
}

/**
 * Stop scanner agent
 * @param {any} protocol HTTP or HTTPS or WEBSOCKET
 * @param {any} host   server hostname or IP
 * @param {any} port    server port
 * @param {any} devicetoken login token received from server
 * @param {any} id scanner id
 * @param {any} mock    use mock (default=false)
 * @returns
 */
export const agentStopScanner = async function (protocol, host, port, devicetoken, id, mock = false) {
    return new Promise(async (resolve, reject) => {
        const url = baseUrl + '/agent'
        const body = {
            type: "api",
            version: 1.0,
            command: "agentStopScanner",
            options: {
                url: protocol + '://' + host + ':' + port + '/server/scanner',
                devicetoken: devicetoken,
                worker: 'scanner1',
                options: {
                    name: id
                }
            }
        };
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        } else {
            await sleep(1000)
            resolve(mocks.agentStopScanner(body))
        }
    })
}

/**
 * Stop hist agent
 * @param {any} protocol HTTP or HTTPS or WEBSOCKET
 * @param {any} host   server hostname or IP
 * @param {any} port    server port
 * @param {any} devicetoken login token received from server
 * @param {any} id hist id
 * @param {any} mock    use mock (default=false)
 * @returns
 */
export const agentStopHist = async function (protocol, host, port, devicetoken, id, mock = false) {
    return new Promise(async (resolve, reject) => {
        const url = baseUrl + '/agent'
        const body = {
            type: "api",
            version: 1.0,
            command: "agentStopHist",
            options: {
                url: protocol + '://' + host + ':' + port + '/server/hist',
                devicetoken: devicetoken,
                worker: 'hist1',
                options: {
                    name: id
                }
            }
        };
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        } else {
            await sleep(1000)
            resolve(mocks.agentStopHist(body))
        }
    })
}

/**
 * Get scanner agent status
 * @param {any} protocol HTTP or HTTPS or WEBSOCKET
 * @param {any} host   server hostname or IP
 * @param {any} port    server port
 * @param {any} devicetoken login token received from server
 * @param {any} id scanner id
 * @param {any} mock    use mock (default=false)
 * @returns
 */
export const agentStatusScanner = async function (protocol, host, port, devicetoken, id, mock = false) {
    return new Promise(async (resolve, reject) => {
        const url = baseUrl + '/agent'
        const body = {
            type: "api",
            version: 1.0,
            command: "agentStatusScanner",
            options: {
                url: protocol + '://' + host + ':' + port + '/server/scanner',
                devicetoken: devicetoken,
                worker: 'scanner1',
                options: {
                    name: id
                }
            }
        };
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        } else {
            await sleep(1000)
            resolve(mocks.agentStatusScanner(body))
        }
    })
}

/**
 * Get hist agent status
 * @param {any} protocol HTTP or HTTPS or WEBSOCKET
 * @param {any} host   server hostname or IP
 * @param {any} port    server port
 * @param {any} devicetoken login token received from server
 * @param {any} id hist id
 * @param {any} mock    use mock (default=false)
 * @returns
 */
export const agentStatusHist = async function (protocol, host, port, devicetoken, id, mock = false) {
    return new Promise(async (resolve, reject) => {
        const url = baseUrl + '/agent'
        const body = {
            type: "api",
            version: 1.0,
            command: "agentStatusHist",
            options: {
                url: protocol + '://' + host + ':' + port + '/server/hist',
                devicetoken: devicetoken,
                worker: 'hist1',
                options: {
                    name: id
                }
            }
        };
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        } else {
            await sleep(1000)
            resolve(mocks.agentStatusHist(body))
        }
    })
}

/**
 * Remove scanner agent
 * @param {any} protocol HTTP or HTTPS or WEBSOCKET
 * @param {any} host   server hostname or IP
 * @param {any} port    server port
 * @param {any} devicetoken login token received from server
 * @param {any} id scanner id
 * @param {any} mock    use mock (default=false)
 * @returns
 */
export const agentRemoveScanner = async function (protocol, host, port, devicetoken, id, mock = false) {
    return new Promise(async (resolve, reject) => {
        const url = baseUrl + '/agent'
        const body = {
            type: "api",
            version: 1.0,
            command: "agentRemoveScanner",
            options: {
                url: protocol + '://' + host + ':' + port + '/server/scanner',
                devicetoken: devicetoken,
                worker: 'scanner1',
                options: {
                    name: id
                }
            }
        };
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        } else {
            await sleep(1000)
            resolve(mocks.agentRemoveScanner(body))
        }
    })
}

/**
 * Remove hist agent
 * @param {any} protocol HTTP or HTTPS or WEBSOCKET
 * @param {any} host   server hostname or IP
 * @param {any} port    server port
 * @param {any} devicetoken login token received from server
 * @param {any} id hist id
 * @param {any} mock    use mock (default=false)
 * @returns
 */
export const agentRemoveHist = async function (protocol, host, port, devicetoken, id, mock = false) {
    return new Promise(async (resolve, reject) => {
        const url = baseUrl + '/agent'
        const body = {
            type: "api",
            version: 1.0,
            command: "agentRemoveHist",
            options: {
                url: protocol + '://' + host + ':' + port + '/server/hist',
                devicetoken: devicetoken,
                worker: 'hist1',
                options: {
                    name: id
                }
            }
        };
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        } else {
            await sleep(1000)
            resolve(mocks.agentRemoveHist(body))
        }
    })
}

/**
 * Ping scanner local network
 * @param {any} protocol HTTP or HTTPS or WEBSOCKET
 * @param {any} host   server hostname or IP
 * @param {any} port    server port
 * @param {any} devicetoken login token received from server
 * @param {any} pinghost host to ping
 * @param {any} mock    use mock (default=false)
 * @returns
 */
export const agentPingScanner = async function (protocol, host, port, devicetoken, pinghost, mock = false) {
    return new Promise(async (resolve, reject) => {
        const url = baseUrl + '/agent'
        const body = {
            type: "api",
            version: 1.0,
            command: "agentPingScanner",
            options: {
                url: protocol + '://' + host + ':' + port + '/server/scanner',
                devicetoken: devicetoken,
                worker: 'scanner1',
                options: {
                    host: pinghost
                }
            }
        };
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        } else {
            await sleep(1000)
            resolve(mocks.agentPingScanner(body))
        }
    })
}

/**
 * Ping hist local network
 * @param {any} protocol HTTP or HTTPS or WEBSOCKET
 * @param {any} host   server hostname or IP
 * @param {any} port    server port
 * @param {any} devicetoken login token received from server
 * @param {any} pinghost host to ping
 * @param {any} mock    use mock (default=false)
 * @returns
 */
export const agentPingHist = async function (protocol, host, port, devicetoken, pinghost, mock = false) {
    return new Promise(async (resolve, reject) => {
        const url = baseUrl + '/agent'
        const body = {
            type: "api",
            version: 1.0,
            command: "agentPingHist",
            options: {
                url: protocol + '://' + host + ':' + port + '/server/hist',
                devicetoken: devicetoken,
                worker: 'hist1',
                options: {
                    host: pinghost
                }
            }
        };
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        } else {
            await sleep(1000)
            resolve(mocks.agentPingHist(body))
        }
    })
}

/**
 * Logout from server
 * @param {any} protocol HTTP or HTTPS or WEBSOCKET
 * @param {any} host   server hostname or IP
 * @param {any} port    server port
 * @param {any} devicetoken login token received from server
 * @param {any} mock    use mock (default=false)
 * @returns server configuration parameters
 */
export const agentLogout = async function (protocol, host, port, devicetoken, mock = false) {
    return new Promise(async (resolve, reject) => {
        const url = baseUrl + '/agent'
        const body = {
            type: "api",
            version: 1.0,
            command: "agentLogout",
            options: {
                url: protocol + '://' + host + ':' + port + '/server/logout',
                devicetoken: devicetoken
            }
        };
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        } else {
            await sleep(1000)
            resolve(mocks.agentLogout(body))
        }
    })
}



import { callFetchGet, callFetchPost, getCHeader, baseUrl, sleep } from './api.js';
import mocks from './mockdocker.js';

// DOCKER API

/**
 * Get Docker Info
 * 
 * @param {any} mock use mock flag (default false)
 */
export const dockerInfo = async function (dockeruid,mock = false) {
    return new Promise(async (resolve, reject) => {
        const url = baseUrl + '/docker'
        const body = {
            type: "api",
            version: 1.0,
            command: "dockerInfo",
            options: {
                uid:dockeruid
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
            resolve(mocks.dockerInfo(body))
        }
    })
}

/**
 * Set docker Environment
 * 
 * @param {any} env doker env variable to set
 * @param {any} mock use mock flag (default false)
 */
export const setDockerEnv = async function (env, mock = false) {
    return new Promise(async (resolve, reject) => {
        const url = baseUrl + '/docker'
        const body = {
            type: "api",
            version: 1.0,
            command: "setDockerEnv",
            options: {
                env: env
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
            await sleep(500)
            resolve(mocks.setDockerEnv(body))
        }
    })
}

/**
 * Create docker client instance
 * 
 * @param {any} ca docker daemon ca file
 * @param {any} cert docker daemon cert file
 * @param {any} key docker daemon key file
 * @param {any} mock use mock flag (default false)
 */
export const dockerCreate = async function (ca, cert, key, mock = false) {

    return new Promise(async (resolve, reject) => {
        const url = baseUrl + '/docker'
        const body = {
            type: "api",
            version: 1.0,
            command: "dockerCreate",
            options: {
                ca: ca,
                cert: cert,
                key: key
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
            resolve(mocks.dockerCreate(body))
        }
    })
}

/**
 * Delete docker client instance
 * 
 * @param {any} dockeruid docker client id
 
 */
export const dockerDelete = async function (dockeruid, mock = false) {

    return new Promise(async (resolve, reject) => {
    const url = baseUrl + '/docker'
        const body = {
            type: "api",
            version: 1.0,
            command: "dockerDelete",
            options: {
                uid: dockeruid
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
            await sleep(500)
            resolve(mocks.dockerCreate(body))
        }
    })
}

/**
 * List docker containers
 * 
 * @param {any} opts list container option (see dockerode docs)
 * @param {any} mock use mock flag (default false)
 */
export const dockerListContainers = async function (opts, mock = false) {
    return new Promise(async (resolve, reject) => {
        const url = baseUrl + '/docker'
        const body = {
            type: "api",
            version: 1.0,
            command: "dockerListContainers",
            options: opts
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
            resolve(mocks.dockerListContainers(body))
        }
    })
}

/**
 * List docker images
 * 
 * @param {any} opts list container option (see dockerode docs)
 * @param {any} mock use mock flag (default false)
 */
export const dockerListImages = async function (opts, mock = false) {
    return new Promise(async (resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "dockerListImages",
            options: opts
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
            resolve(mocks.dockerListImages(body))
        }
    })
}

/**
 * Translates host name to IP address
 * 
 * @param {any} hostname host name to translate into IP
 * @param {any} mock use mock flag (default false)
 */
export const dnsLookup = async function (hostname, mock = false) {
    return new Promise(async (resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "dnsLookup",
            options: {
                hostname: hostname
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
            resolve(mocks.dnsLookup(body))
        }
    })
}

/**
 * Remove docker container
 * @param {any} opts docker container options (see dockerode docs)
 * @param {any} mock use mock flag (default false)
 */
export const dockerRemoveContainer = async function (opts, mock = false) {
    return new Promise(async (resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "dockerRemoveContainer",
            options: opts
        };
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        } else {
            await sleep(1000)
            resolve(mocks.dockerRemoveContainer(body))
        }
    })
}

/**
 * Remove docker image
 * @param {any} opts docker container options (see dockerode docs)
 * @param {any} mock use mock flag (default false)
 */
export const dockerRemoveImage = async function (opts, mock = false) {
    return new Promise(async (resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "dockerRemoveImage",
            options: opts
        };
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        } else {
            await sleep(1000)
            resolve(mocks.dockerRemoveImage(body))
        }
    })
}

/**
 * Build docker image
 * @param {any} opts docker container options (see dockerode docs)
 * @param {any} mock use mock flag (default false)
 */
export const dockerBuildImage = async function (opts, mock = false) {
    return new Promise(async (resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "dockerBuildImage",
            options: opts
        };
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        } else {
            await sleep(1000)
            resolve(mocks.dockerBuildImage(body))
        }
    })
}

/**
 * Pull docker image
 * @param {any} repoTag dockerhub image tag
 * @param {any} opts docker container options (see dockerode docs)
 * @param {any} mock use mock flag (default false)
 */
export const dockerPullImage = async function (repoTag, opts, mock = false) {
    return new Promise(async (resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "dockerPullImage",
            options: {
                repoTag: repoTag,
                opts: opts
            }
        };
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        } else {
            await sleep(1000)
            resolve(mocks.dockerPullImage(body))
        }
    })
}

/**
 * Start docker container
 * @param {any} opts docker container options (see dockerode docs)
 * @param {any} mock use mock flag (default false)
 */
export const dockerStartContainer = async function (opts, mock = false) {
    return new Promise(async (resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "dockerPullImage",
            options: opts
        };
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        } else {
            await sleep(1000)
            resolve(mocks.dockerStartContainer(body))
        }
    })
}

/**
 * Stop docker container
 * @param {any} opts docker container options (see dockerode docs)
 * @param {any} mock use mock flag (default false)
 */
export const dockerStopContainer = async function (opts, mock = false) {
    return new Promise(async (resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "dockerStopContainer",
            options: opts
        };
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        } else {
            await sleep(1000)
            resolve(mocks.dockerStopContainer(body))
        }
    })
}

/**
 * Restart docker container
 * @param {any} opts docker container options (see dockerode docs)
 * @param {any} mock use mock flag (default false)
 */
export const dockerRestartContainer = async function (opts, mock = false) {
    return new Promise(async (resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "dockerRestartContainer",
            opts: opts
        };
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        } else {
            await sleep(1000)
            resolve(mocks.dockerRestartContainer(body))
        }
    })
}

/**
 * Create docker container
 * @param {any} opts docker container options (see dockerode docs)
 * @param {any} mock use mock flag (default false)
 */
export const dockerCreateContainer = async function (dockeruid,opts, mock = false) {
    return new Promise(async (resolve, reject) => {
        const url = baseUrl + '/docker'
        const body = {
            type: "api",
            version: 1.0,
            command: "dockerCreateContainer",
            options: {
                uid: dockeruid,
                containeroptions: opts
            }
        };
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        } else {
            await sleep(1000)
            resolve(mocks.dockerCreateContainer(body))
        }
    })
}
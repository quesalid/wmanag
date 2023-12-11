import { callFetchGet, callFetchPost, getCHeader, baseUrl, sleep } from './api.js';
import mocks from './mockdataconfig.js';

/**
 * Get plants
 * @param {any} filters array of selection filters [{op:operation,name:field,value:field value}] 
 * @param {any} mock use mock flag (default false)
 */
export const getPlants = async function (filters, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "getPlants",
            options: {
                filters: filters
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
            resolve(mocks.getPlants(body))
        }
    })
}

/**
 * Set Plant
 * @param {any} plant plant to set (add or update)
 * @param {any} mock use mock flag (default false)
 */
export const setPlant = async function (plant, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "setPlant",
            options: {
                plant: plant
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
            resolve(mocks.setPlant(body))
        }
    })
}

/**
* Delete Plant
* @param {any} filters array of selection filters [{op:operation,name:field,value:field value}] 
* @param {any} mock use mock flag (default false)
*/
export const deletePlant = async function (filters, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "deletePlant",
            options: {
                filters: filters
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
            resolve(mocks.deletePlant(body))
        }
    })
}

/**
 * Get devices
 * @param {any} filters array of selection filters [{op:operation,name:field,value:field value}] 
 * @param {any} mock use mock flag (default false)
 */
export const getDevices = async function (filters, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "getDevices",
            options: {
                filters: filters
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
            resolve(mocks.getDevices(body))
        }
    })
}

/**
 * Set Device
 * @param {any} device device to set (add or update)
 * @param {any} mock use mock flag (default false)
 */
export const setDevice = async function (device, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "setDevice",
            options: {
                device: device
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
            resolve(mocks.setDevice(body))
        }
    })
}

/**
* Delete Device
* @param {any} filters array of selection filters [{op:operation,name:field,value:field value}] 
* @param {any} mock use mock flag (default false)
*/
export const deleteDevice = async function (filters, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "deleteDevice",
            options: {
                filters: filters
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
            resolve(mocks.deleteDevice(body))
        }
    })
}

/**
 * Get Agents
 * @param {any} filters array of selection filters [{op:operation,name:field,value:field value}] 
 * @param {any} mock use mock flag (default false)
 */
export const getAgents = async function (filters, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "getDevices",
            options: {
                filters: filters
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
            resolve(mocks.getAgents(body))
        }
    })
}

/**
 * Set Agent
 * @param {any} agent agent to set (add or update)
 * @param {any} mock use mock flag (default false)
 */
export const setAgent = async function (agent, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "setDevices",
            options: {
                agent: agent
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
            resolve(mocks.setAgent(body))
        }
    })
}

/**
 * Delete Agent
 * @param {any} filters array of selection filters [{op:operation,name:field,value:field value}] 
 * @param {any} mock use mock flag (default false)
 */
export const deleteAgent = async function (filters, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "deleteAgent",
            options: {
                filters: filters
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
            resolve(mocks.deleteAgent(body))
        }
    })
}

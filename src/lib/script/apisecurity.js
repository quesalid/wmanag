// @ts-nocheck
import { callFetchGet, callFetchPost, getCHeader, baseUrl, sleep } from './api.js';
import mocks from './mocksecurity.js';

/**
 * login
 * @param {string} username username
 * @param {string} password password
 * @param {any} mock use mock flag (default false)
 */
export const login = async function (username,password, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/login'
        const body = {
            type: "username-password",
            username: username,
            password: password
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
            resolve(mocks.login(body))
        }
    })
}

/**
 * decode token
 * @param {string} token jwttoken
 * @param {any} mock use mock flag (default false)
 */
export const decodeToken = async function (token, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/decodetoken'
        const body = {
            token: token
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
            resolve(mocks.decodeToken(body))
        }
    })
}

/**
 * Get system users
 * @param {any} filters array of selection filters [{op:operation,name:field,value:field value}] 
 * @param {any} mock use mock flag (default false)
 */
export const getUsers = async function (filters, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "getUsers",
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
            resolve(mocks.getUsers(body))
        }
    })
}

/**
 * Set User
 * @param {any} user user to set (add or update)
 * @param {any} mock use mock flag (default false)
 */
export const setUser = async function (user, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "setUser",
            options: {
                user: user
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
            resolve(mocks.setUser(body))
        }
    })
}

/**
* Delete User
* @param {any} filters array of selection filters [{op:operation,name:field,value:field value}] 
* @param {any} mock use mock flag (default false)
*/
export const deleteUser = async function (filters, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "deleteUser",
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
            resolve(mocks.deleteUser(body))
        }
    })
}

/**
 * Get user avatar
 * @param {any} filters array of selection filters [{op:operation,name:field,value:field value}] 
 * @param {any} mock use mock flag (default false)
 */
export const getAvatar = async function (uid, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "getAvatar",
            options: {
                uid: uid
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
            resolve(mocks.getAvatar(body))
        }
    })
}

/**
 * Set User Avatar
 * @param {any} user user to set (add or update)
 * @param {any} mock use mock flag (default false)
 */
export const setAvatar = async function (uid, avatar,mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "setAvatar",
            options: {
                uid: uid,
                avatar:avatar
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
            resolve(mocks.setAvatar(body))
        }
    })
}

/**
 * Get application logs
 * @param {any} filters array of selection filters [{op:operation,name:field,value:field value}] 
 * @param {any} mock use mock flag (default false)
 */
export const getLogs = async function (filters, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "getLogs",
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
            resolve(mocks.getLogs(body))
        }
    })
}

/**
* Get logs by command
* @param {any} filters array of selection filters [{op:operation,name:field,value:field value}] 
* @param {any} mock use mock flag (default false)
*/
export const getLogsByCommand = async function (command, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "getLogsByCommand",
            options: {
                command: command
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
            resolve(mocks.getLogsByCommand(body))
        }
    })
}

/**
* Get logs by user
* @param {any} filters array of selection filters [{op:operation,name:field,value:field value}] 
* @param {any} mock use mock flag (default false)
*/
export const getLogsByUser = async function (user, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "getLogsByUser",
            options: {
                user: user
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
            resolve(mocks.getLogsByUser(body))
        }
    })
}

/**
* Get logs by unique id
* @param {any} filters array of selection filters [{op:operation,name:field,value:field value}] 
* @param {any} mock use mock flag (default false)
*/
export const getLogsByUid = async function (uid, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/command'
        const body = {
            type: "api",
            version: 1.0,
            command: "getLogsByUid",
            options: {
                uid: uid
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
            resolve(mocks.getLogsByUid(body))
        }
    })
}
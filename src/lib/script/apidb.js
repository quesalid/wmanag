import { callFetchGet, callFetchPost, getCHeader, baseUrl, sleep } from './api.js';
import mocks from './mockdb.js';


/**
 * Connect to db
 * @param {any} connectionString
 * @param {any} mock (default=false)
 * @returns db connection id
 */
export const dbConnect = async (connectionString, mock = false) => {
    return new Promise(async (resolve, reject) => {
        const url = baseUrl + '/db'
        const body = {
            type: "api",
            version: 1.0,
            command: "dbConnect",
            options: {
                connectionString: connectionString
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
            resolve(mocks.dbConnect(body))
        }
    })
}

/**
 * Disconnect from db
 * @param {any} dbuid db connection id
 * @param {any} mock (default=false)
 * @returns dbuid
 */
export const dbDisconnect = async (dbuid, mock = false) => {
    return new Promise(async (resolve, reject) => {
        const url = baseUrl + '/db'
        const body = {
            type: "api",
            version: 1.0,
            command: "dbDisconnect",
            options: {
                uid: dbuid
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
            resolve(mocks.dbDisconnect(body))
        }
    })

}

/**
 * Get db tables names
 * @param {any} dbuid db connection id
 * @param {any} mock (dafult=false)
 * @returns array of tables names
 */
export const dbGetTables = async (dbuid,mock=false) => {
    return new Promise(async (resolve, reject) => {
        const url = baseUrl + '/db'
        const body = {
            type: "api",
            version: 1.0,
            command: "dbGetTables",
            options: {
                uid: dbuid
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
            resolve(mocks.dbGetTables(body))
        }
    })
}

/**
 * Create a new table
 * @param {any} dbuid db connection id
 * @param {any} tablename table name
 * @param {any} tabledef table definition
 * @param {any} mock (default=false)
 * @returns new table
 */
export const dbCreateTable = async (dbuid, tablename,tabledef,mock = false) => {
    return new Promise(async (resolve, reject) => {
        const url = baseUrl + '/db'
        const body = {
            type: "api",
            version: 1.0,
            command: "dbCreateTable",
            options: {
                uid: dbuid,
                name:tablename,
                tabledef: tabledef
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
            resolve(mocks.dbCreateTable(body))
        }
    })
}

/**
 * Modify table
 * @param {any} dbuid db connection id
 * @param {any} tablename table name
 * @param {any} tabledef table definition
 * @param {any} mock (default=false)
 * @returns modified table
 */
export const dbModifyTable = async (dbuid, tablename, tabledef, mock = false) => {
    return new Promise(async (resolve, reject) => {
        const url = baseUrl + '/db'
        const body = {
            type: "api",
            version: 1.0,
            command: "dbModifyTable",
            options: {
                uid: dbuid,
                name:tablename,
                tabledef: tabledef
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
            resolve(mocks.dbModifyTable(body))
        }
    })
}

/**
 * Get db table
 * @param {any} dbuid db connection id
 * @param {any} tablename table name
 * @param {any} mock (feault=false)
 * @returns table
 */
export const dbGetTable = async (dbuid, tablename, mock = false) => {
    return new Promise(async (resolve, reject) => {
        const url = baseUrl + '/db'
        const body = {
            type: "api",
            version: 1.0,
            command: "dbGetTable",
            options: {
                uid: dbuid,
                name: tablename,
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
            resolve(mocks.dbGetTable(body))
        }
    })
}

/**
 * Delete table
 * @param {any} dbuid db connection id
 * @param {any} tablename table name
 * @param {any} mock (default=false)
 * @returns name of deleted table
 */
export const dbDeleteTable = async (dbuid, tablename, mock = false) => {
    return new Promise(async (resolve, reject) => {
        const url = baseUrl + '/db'
        const body = {
            type: "api",
            version: 1.0,
            command: "dbDeleteTable",
            options: {
                uid: dbuid,
                name: tablename
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
            resolve(mocks.dbDeleteTable(body))
        }
    })
}
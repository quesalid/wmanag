import { v4 as uuidv4 } from "uuid"

let db = {}
let dbs = []

const checkDbClient = async function (body) {
    const dbid = body.options.uid
    const db = dbs.find(d => d.uid === dbid)
    if (!db)
        throw (new Error('DB CLIENT NOT FOUND'))
}

const dbConnect = async function (body) {
    // if DPCKER_HOST == '10.112.1.71' throw an error
    db.uid = uuidv4()
    db.createdAt = Date.now()
    db.connectionString = body.options.connectionString
    db.tables = []
    console.log('dbConnect', db)
    dbs.push(db)
    body.data = db.uid
    body.result = true
    body.error = null
    return body
}

const dbDisconnect = async function (body) {
    await checkDbClient(body)
    const dbid = body.options.uid
    dbs = dbs.filter(d => d.uid !== dbid)
    body.data = dbid
    body.result = true
    body.error = null
    return body
}

const dbGetTables = async function (body) {
    await checkDbClient(body)
    const tettables = []
    const dbid = body.options.uid
    const db = dbs.find(d => d.uid === dbid)
    for (let i = 0; i < db.tables.length; i++){
        const tname = db.tables[i].name
        tettables.push(tname)
    }
    body.data = tettables
    body.result = true
    body.error = null
    return body
}

const dbCreateTable = async function (body) {
    await checkDbClient(body)
    const dbid = body.options.uid
    const db = dbs.find(d => d.uid === dbid)
    const table = {
        uid: uuidv4(),
        createdAt: Date.now(),
        name: body.options.name,
        columns: body.options.tabledef
    }
    db.tables.push(table)
    body.data = table
    body.result = true
    body.error = null
    return body
}

const dbDeleteTable = async function (body) {
    await checkDbClient(body)
    const dbid = body.options.uid
    const db = dbs.find(d => d.uid === dbid)
    const table = db.tables.find(t => t.name === body.options.name)
    db.tables = db.tables.filter(t => t.name !== body.options.name)
    body.data = table
    body.result = true
    body.error = null
    return body
}

const dbGetTable = async function (body) {
    console.log("DB GET TABLE",body.options.name)
    await checkDbClient(body)
    const dbid = body.options.uid
    const db = dbs.find(d => d.uid === dbid)
    const table = db.tables.find(t => t.name === body.options.name)
    if (!table)
        throw(new Error('TABLE NOT FOUND'))
    body.data = table
    body.result = true
    body.error = null
    console.log("DB GET TABLE RESULT", body.data)
    return body
}

const dbModifyTable = async function (body) {
    await checkDbClient(body)
    const dbid = body.options.uid
    const db = dbs.find(d => d.uid === dbid)
    const table = db.tables.find(t => t.name === body.options.name)
    if (!table)
        throw(new Error('TABLE NOT FOUND'))
    table.columns = body.options.tabledef
    body.data = table
    body.result = true
    body.error = null
    return body
}


const DB = {
    dbConnect,
    dbDisconnect,
    dbGetTables,
    dbCreateTable,
    dbDeleteTable,
    dbGetTable,
    dbModifyTable
}

export default DB
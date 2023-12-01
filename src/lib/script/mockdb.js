import { v4 as uuidv4 } from "uuid"

let db = {}
let dbs = []

const filterByType = (array, type, field, value, inv = false) => {
    switch (type) {
        case 'gt':
            if (inv)
                array = array.filter((item) => { return (item[field] <= value) })
            else
                array = array.filter((item) => { return (item[field] > value) })
            break
        case 'gte':
            if (inv)
                array = array.filter((item) => { return (item[field] < value) })
            else
                array = array.filter((item) => { return (item[field] >= value) })
            break
        case 'lt':
            if (inv)
                array = array.filter((item) => { return (item[field] >= value) })
            else
                array = array.filter((item) => { return (item[field] < value) })
            break
        case 'lte':
            if (inv)
                array = array.filter((item) => { return (item[field] > value) })
            else
                array = array.filter((item) => { return (item[field] <= value) })
            break
        case 'eq':
            if (inv)
                array = array.filter((item) => { return (item[field] != value) })
            else
                array = array.filter((item) => { return (item[field] == value) })
            break
        case 'neq':
            if (inv)
                array = array.filter((item) => { return (item[field] == value) })
            else
                array = array.filter((item) => { return (item[field] != value) })
            break
        case 'in':
            if (inv)
                array = array.filter((item) => { return (!item[field].includes(value)) })
            else
                array = array.filter((item) => { return (item[field].includes(value)) })
            break
        default:
            break
    }
    return array
}

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
        columns: body.options.tabledef,
        rows: []
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
    await checkDbClient(body)
    const dbid = body.options.uid
    const db = dbs.find(d => d.uid === dbid)
    const table = db.tables.find(t => t.name === body.options.name)
    if (!table)
        throw(new Error('TABLE NOT FOUND'))
    body.data = table
    body.result = true
    body.error = null
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

const dbSelectFromTable = async function (body) {
    await checkDbClient(body)
    const dbid = body.options.uid
    const db = dbs.find(d => d.uid === dbid)
    const table = db.tables.find(t => t.name === body.options.name)
    if (!table)
        throw (new Error('TABLE NOT FOUND'))
    let rows = table.rows
    if (body.options.filter) {
        for (let i = 0; i < body.options.filter.length; i++){
            const filter = body.options.filter[i]
            const keys = Object.keys(filter)
            rows = filterByType(rows, filter.type, keys[0], filter[keys[0]])
        }
    }
    body.data = rows
    body.result = true
    body.error = null
    return body
}

const dbUpsertToTable = async function (body) {
    await checkDbClient(body)
    const dbid = body.options.uid
    const db = dbs.find(d => d.uid === dbid)
    const table = db.tables.find(t => t.name === body.options.name)
    if (!table)
        throw (new Error('TABLE NOT FOUND'))
    let rows = body.options.rows
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i]
        const index = table.rows.findIndex(r => r.uid === row.uid)
        if (index > -1)
            table.rows[index] = row
        else
            //row.uid = uuidv4()
            table.rows.push(row)
    }
    body.data = rows.length
    body.result = true
    body.error = null
    return body
}

const dbDeleteFromTable = async function (body) {
    await checkDbClient(body)
    const dbid = body.options.uid
    const db = dbs.find(d => d.uid === dbid)
    const table = db.tables.find(t => t.name === body.options.name)
    if (!table)
        throw (new Error('TABLE NOT FOUND'))
    let startrows = table.rows.length
    let rowids = body.options.rowids
    for (let i = 0; i < rowids.length; i++) {
        const uid = rowids[i]
        table.rows = table.rows.filter(r => r.uid === uid)
    }
    let delrows = startrows - table.rows.length
    body.data = delrows
    body.result = true
    body.error = null
    return body
}

const dbGetNewRow = async function (body) {
await checkDbClient(body)
    const dbid = body.options.uid
    const db = dbs.find(d => d.uid === dbid)
    const table = db.tables.find(t => t.name === body.options.name)
    if (!table)
        throw (new Error('TABLE NOT FOUND'))
    const row = {}
    for (let i = 0; i < table.columns.length; i++) {
        const col = table.columns[i]
        if (col.name === 'uid')
            row[col.name] = uuidv4()
        else if(col.default)
            row[col.name] = col.default
        else
            row[col.name] = null
    }
    console.log("DB GET NEW ROW RESULT", row)
    body.data = row
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
    dbModifyTable,
    dbSelectFromTable,
    dbUpsertToTable,
    dbDeleteFromTable,
    dbGetNewRow
}

export default DB
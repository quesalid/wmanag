// @ts-nocheck
import { filterArray, orderBy, paginate } from './mock.js'
import DBPHARMA from './mockdb_pharma.js'
import  DBWATERWASTE  from './mockdb_wwaste.js'

// **************** DATA ****************
let devices = DBPHARMA.devices
let agents = DBPHARMA.agents
let mainentities = DBPHARMA.plants
let areaentities = DBPHARMA.departments
let localentities = DBPHARMA.lines
let controlledentities = DBPHARMA.machines
let controllers = DBPHARMA.controllers
let datapoints = DBPHARMA.generateDataPoints()
let clonepoints = DBPHARMA.generateClonePoints()
let learnpoints = DBPHARMA.generateLearnPoints()
let masterbatchphases = DBPHARMA.masterbatchphases
let clonephases = DBPHARMA.generateClonePhases(clonepoints, 'BATCH')
let learnphases = DBPHARMA.generateClonePhases(learnpoints, 'BATCH')
let companies = DBPHARMA.companies

// ****************  INIT DB BY FAMILY *******************
const init = (family) => {
    console.log("INITIALIZE MOCK DB FOR", family)
    switch (family) {
        case 'UTILITY':
        case 'INFR':
        case 'WWATER':
            devices = DBWATERWASTE.devices
            agents = DBWATERWASTE.agents
            mainentities = DBWATERWASTE.mainentities
            areaentities = DBWATERWASTE.areaentities
            localentities = DBWATERWASTE.localentities
            controlledentities = DBWATERWASTE.controlledentities
            controllers = DBWATERWASTE.controllers
            datapoints = DBWATERWASTE.generateDataPoints()
            clonepoints = []
            learnpoints = []
            masterbatchphases = []
            clonephases = []
            learnphases = []
            companies = DBWATERWASTE.companies
            break;
        case 'INDUSTRY':
        case 'PLANT':
        case 'PHARMA':
            devices = DBPHARMA.devices
            agents = DBPHARMA.agents
            mainentities = DBPHARMA.plants
            areaentities = DBPHARMA.departments
            localentities = DBPHARMA.lines
            controlledentities = DBPHARMA.machines
            controllers = DBPHARMA.controllers
            datapoints = DBPHARMA.generateDataPoints()
            clonepoints = DBPHARMA.generateClonePoints()
            learnpoints = DBPHARMA.generateLearnPoints()
            masterbatchphases = DBPHARMA.masterbatchphases
            clonephases = DBPHARMA.generateClonePhases(clonepoints, 'BATCH')
            learnphases = DBPHARMA.generateClonePhases(learnpoints, 'BATCH')
            companies = DBPHARMA.companies
            break;
    }
}
// **************** CALLS ****************
const getDevices = async function (body) {
    let retDevices = JSON.parse(JSON.stringify(devices))
    const filters = body.options.filters
    if (filters && filters.length) {
        retDevices = filterArray(retDevices, filters)
    }
    body.data = retDevices
    return (body)
}

const setDevice = async function (body) {
    const device = body.options.device
    let old = null
    if (device) {
        const existing = devices.findIndex((item) => { return item.uid == device.uid })
        if (existing > -1) {
            old = devices[existing]
            devices[existing] = device
        } else {
            devices.push(device)
        }
    }
    return old
}

const deleteDevice = async function (body) {
    const filters = body.options.filters
    devices = filterArray(devices, filters, true)
    body.data = devices
    return (body)
}

const getAgents = async function (body) {
    let retAgents = JSON.parse(JSON.stringify(agents))
    const filters = body.options.filters
    if (filters && filters.length) {
        retAgents = filterArray(retAgents, filters)
    }
    body.data = retAgents
    return (body)
}

const setAgent = async function (body) {
    const agent = body.options.agent
    let old = null
    if (agent) {
        const existing = agents.findIndex((item) => { return item.uid == agent.uid })
        if (existing > -1) {
            old = agents[existing]
            agents[existing] = agent
        } else {
            agents.push(agent)
        }
    }
    return old
}

const deleteAgent = async function (body) {
    const filters = body.options.filters
    agents = filterArray(agents, filters, true)
    body.data = agents
    return (body)
}


const getCompanies = async function (body) {
    let retCompanies = JSON.parse(JSON.stringify(companies))
    const filters = body.options.filters
    if (filters && filters.length) {
        retCompanies = filterArray(retCompanies, filters)
    }
    body.data = retCompanies
    return (body)
}

const setCompany = async function (body) {
    const company = body.options.company
    let old = null
    if (company) {
        const existing = companies.findIndex((item) => { return item.uid == company.uid })
        if (existing > -1) {
            old = companies[existing]
            companies[existing] = company
        } else {
            companies.push(company)
        }
    }
    return old
}

const deleteCompany = async function (body) {
    const filters = body.options.filters
    companies = filterArray(companies, filters, true)
    body.data = companies
    return (body)
}
const getEntityMain = async function (body) {
    let retEntities = JSON.parse(JSON.stringify(mainentities))
    const filters = body.options.filters
    if (filters && filters.length) {
        retEntities = filterArray(retEntities, filters)
    }
    body.data = retEntities
    return (body)
}

const setEntityMain = async function (body) {
    const entity = body.options.entity
    let old = null
    if (entity) {
        const existing = mainentities.findIndex((item) => { return item.uid == entity.uid })
        if (existing > -1) {
            old = mainentities[existing]
            mainentities[existing] = entity
        } else {
            mainentities.push(entity)
        }
    }
    return old
}

const deleteEntityMain = async function (body) {
    const filters = body.options.filters
    mainentities = filterArray(mainentities, filters, true)
    body.data = mainentities
    return (body)
}

const getEntityArea = async function (body) {
    let retEntities = JSON.parse(JSON.stringify(areaentities))
    const filters = body.options.filters
    if (filters && filters.length) {
        retEntities = filterArray(retEntities, filters)
    }
    body.data = retEntities
    return (body)
}

const setEntityArea = async function (body) {
    const entity = body.options.entity
    let old = null
    if (entity) {
        const existing = areaentities.findIndex((item) => { return item.uid == entity.uid })
        if (existing > -1) {
            old = areaentities[existing]
            areaentities[existing] = entity
        } else {
            areaentities.push(entity)
        }
    }
    return old
}

const deleteEntityArea = async function (body) {
    const filters = body.options.filters
    areaentities = filterArray(areaentities, filters, true)
    body.data = areaentities
    return (body)
}

const getEntityLocal = async function (body) {
    let retEntities = JSON.parse(JSON.stringify(localentities))
    const filters = body.options.filters
    if (filters && filters.length) {
        retEntities = filterArray(retEntities, filters)
    }
    body.data = retEntities
    return (body)
}

const setEntityLocal = async function (body) {
    const entity = body.options.entity
    let old = null
    if (entity) {
        const existing = localentities.findIndex((item) => { return item.uid == entity.uid })
        if (existing > -1) {
            old = localentities[existing]
            localentities[existing] = entity
        } else {
            localentities.push(entity)
        }
    }
    return old
}

const deleteEntityLocal = async function (body) {
    const filters = body.options.filters
    localentities = filterArray(localentities, filters, true)
    body.data = localentities
    return (body)
}

const getEntityControlled = async function (body) {
    let retEntities = JSON.parse(JSON.stringify(controlledentities))
    const filters = body.options.filters
    if (filters && filters.length) {
        retEntities = filterArray(retEntities, filters)
    }
    body.data = retEntities
    return (body)
}

const setEntityControlled = async function (body) {
    const entity = body.options.controlledentities
    let old = null
    if (entity) {
        const existing = controlledentities.findIndex((item) => { return item.uid == entity.uid })
        if (existing > -1) {
            old = controlledentities[existing]
            controlledentities[existing] = entity
        } else {
            controlledentities.push(entity)
        }
    }
    return old
}

const deleteEntityControlled = async function (body) {
    const filters = body.options.filters
    controlledentities = filterArray(controlledentities, filters, true)
    body.data = controlledentities
    return (body)
}

const getControllers = async function (body) {
    let retControllers = JSON.parse(JSON.stringify(controllers))
    const filters = body.options.filters
    if (filters && filters.length) {
        retControllers = filterArray(retControllers, filters)
    }
    body.data = retControllers
    return (body)
}

const setController = async function (body) {
    const controller = body.options.controller
    let old = null
    if (controller) {
        const existing = controllers.findIndex((item) => { return item.uid == controller.uid })
        if (existing > -1) {
            old = controllers[existing]
            controllers[existing] = controller
        } else {
            controllers.push(controller)
        }
    }
    return old
}

const deleteController = async function (body) {
    const filters = body.options.filters
    controllers = filterArray(controllers, filters, true)
    body.data = controllers
    return (body)
}

const getDataPoints = async function (body) {
    let retPoints = JSON.parse(JSON.stringify(datapoints))
    if (body.options.oldset)
        retPoints = JSON.parse(JSON.stringify(body.options.oldset))
    const filters = body.options && body.options.filters?body.options.filters:null
    const pagination = body.options && body.options.pagination?body.options.pagination:null
    if (filters && filters.length) {
        retPoints = filterArray(retPoints, filters)
    }
    const offset = pagination && pagination._offset ? pagination._offset : 0
    const limit = pagination && pagination._limit ? pagination._limit : retPoints.length
    
    retPoints = paginate(retPoints, offset, limit)
  
    if (pagination && pagination._order) {
        const key = Object.keys(pagination._order)[0]
        const order = pagination._order[key]
        retPoints = orderBy(retPoints, key, order)
    }
    body.data = retPoints
    return (body)
}

const setDataPoint = async function (body) {
    const point = body.options.point
    let old = null
    if (point) {
        const existing = datapoints.findIndex((item) => { return item.uid == point.uid })
        if (existing > -1) {
            old = datapoints[existing]
            datapoints[existing] = point
        } else {
            datapoints.push(point)
        }
    }
    return old
}


const deleteDataPoint = async function (body) {
    const filters = body.options.filters
    datapoints = filterArray(datapoints, filters, true)
    body.data = datapoints
    return (body)
}

const getDataTimeSeries = async function (body) {
    let timeSeries = []
    // GENERATE TIMESERIES
    // A. get point from tag in filters
    let tag = ''
    for (let j = 0; j < body.options.filters.length; j++) {
        const filter = body.options.filters[j]
        if (filter['tag']) {
            tag = filter['tag']
            break;
        }
    }
    const oldFilers = JSON.parse(JSON.stringify(body.options.filters))
    const newFilters = [{ tag: tag, _type: 'eq' }]
    body.options.filters = newFilters
    const ret = await getDataPoints(body)
    let point
    if (ret.data.length > 0) {
        point = ret.data[0]
        const deg = 10
        timeSeries = point.atype == 'ANALOG' ? DBPHARMA.generateTimeSeriesPoly(point, 1000, deg) :DBPHARMA.generateTimeSeriesRect(point,1000,deg)
    }

    const pagination = body.options && body.options.pagination ? body.options.pagination : null
    
    const offset = pagination && pagination._offset ? pagination._offset : 0
    const limit = pagination && pagination._limit ? pagination._limit : timeSeries.length

    timeSeries = paginate(timeSeries, offset, limit)

    if (pagination && pagination._order) {
        const key = Object.keys(pagination._order)[0]
        const order = pagination._order[key]
        timeSeries = orderBy(timeSeries, key, order)
    }

    body.data = timeSeries
    return (body)
}

const getClonePoints = async function (body) {
    let retPoints = JSON.parse(JSON.stringify(clonepoints))
    const filters = body.options.filters
    if (filters && filters.length) {
        retPoints = filterArray(retPoints, filters)
    }
    body.data = retPoints
    return (body)
}

const setClonePoint = async function (body) {
    const point = body.options.point
    let old = null
    if (point) {
        const existing = clonepoints.findIndex((item) => { return item.uid == point.uid })
        if (existing > -1) {
            old = clonepoints[existing]
            clonepoints[existing] = point
        } else {
            clonepoints.push(point)
        }
    }
    return old
}


const deleteClonePoint = async function (body) {
    const filters = body.options.filters
    clonepoints = filterArray(clonepoints, filters, true)
    body.data = clonepoints
    return (body)
}

const getClonePhases = async function (body) {
    let retPhases = JSON.parse(JSON.stringify(clonephases))
    const filters = body.options.filters
    if (filters && filters.length) {
        retPhases = filterArray(retPhases, filters)
    }
    body.data = retPhases
    return (body)
}

const setClonePhase = async function (body) {
    const phase = body.options.phase
    let old = null
    if (phase) {
        const existing = clonephases.findIndex((item) => { return item.uid == phase.uid })
        if (existing > -1) {
            old = clonephases[existing]
            clonephases[existing] = phase
        } else {
            clonephases.push(phase)
        }
    }
    return old
}


const deleteClonePhase = async function (body) {
    const filters = body.options.filters
    clonephases = filterArray(clonephases, filters, true)
    body.data = clonephases
    return (body)
}

const getCloneMBPhases = async function (body) {
    let retMBPhases = JSON.parse(JSON.stringify(masterbatchphases))
    const filters = body.options.filters
    if (filters && filters.length) {
        retMBPhases = filterArray(retMBPhases, filters)
    }
    body.data = retMBPhases
    return (body)
}

const setCloneMBPhase = async function (body) {
    const phase = body.options.phase
    let old = null
    if (phase) {
        const existing = masterbatchphases.findIndex((item) => { return item.uid == phase.uid })
        if (existing > -1) {
            old = masterbatchphases[existing]
            masterbatchphases[existing] = phase
        } else {
            masterbatchphases.push(phase)
        }
    }
    return old
}


const deleteCloneMBPhase = async function (body) {
    const filters = body.options.filters
    masterbatchphases = filterArray(masterbatchphases, filters, true)
    body.data = masterbatchphases
    return (body)
}

const getLearnPoints = async function (body) {
    let retPoints = JSON.parse(JSON.stringify(learnpoints))
    const filters = body.options.filters
    if (filters && filters.length) {
        retPoints = filterArray(retPoints, filters)
    }
    body.data = retPoints
    return (body)
}

const setLearnPoint = async function (body) {
    const point = body.options.point
    let old = null
    if (point) {
        const existing = learnpoints.findIndex((item) => { return item.uid == point.uid })
        if (existing > -1) {
            old = learnpoints[existing]
            learnpoints[existing] = point
        } else {
            learnpoints.push(point)
        }
    }
    return old
}


const deleteLearnPoint = async function (body) {
    const filters = body.options.filters
    learnpoints = filterArray(learnpoints, filters, true)
    body.data = learnpoints
    return (body)
}

const getLearnPhases = async function (body) {
    let retPhases = JSON.parse(JSON.stringify(learnphases))
    const filters = body.options.filters
    if (filters && filters.length) {
        retPhases = filterArray(retPhases, filters)
    }
    body.data = retPhases
    return (body)
}

const setLearnPhase = async function (body) {
    const phase = body.options.phase
    let old = null
    if (phase) {
        const existing = learnphases.findIndex((item) => { return item.uid == phase.uid })
        if (existing > -1) {
            old = learnphases[existing]
            learnphases[existing] = phase
        } else {
            learnphases.push(phase)
        }
    }
    return old
}


const deleteLearnPhase = async function (body) {
    const filters = body.options.filters
    learnphases = filterArray(learnphases, filters, true)
    body.data = learnphases
    return (body)
}


const CONFIG = {
    init,
    getDevices,
    setDevice,
    deleteDevice,
    getAgents,
    setAgent,
    deleteAgent,
    getEntityMain,
    setEntityMain,
    deleteEntityMain,
    getEntityArea,
    setEntityArea,
    deleteEntityArea,
    getEntityLocal,
    setEntityLocal,
    deleteEntityLocal,
    getEntityControlled,
    setEntityControlled,
    deleteEntityControlled,
    getControllers,
    setController,
    deleteController,
    getDataPoints,
    setDataPoint,
    deleteDataPoint,
    getDataTimeSeries,
    getClonePoints,
    setClonePoint,
    deleteClonePoint,
    getClonePhases,
    setClonePhase,
    deleteClonePhase,
    getCloneMBPhases,
    setCloneMBPhase,
    deleteCloneMBPhase,
    getDataTimeSeries,
    getLearnPoints,
    setLearnPoint,
    deleteLearnPoint,
    getLearnPhases,
    setLearnPhase,
    deleteLearnPhase,
    getCompanies,
    setCompany,
    deleteCompany,
}

export default CONFIG
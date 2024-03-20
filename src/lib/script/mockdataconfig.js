// @ts-nocheck
import { filterArray, getFamily } from './mock.js'
import DBINDUSTRY from './mockdb_industry.js'
// **************** DATA ****************
let devices = DBINDUSTRY.devices
let agents = DBINDUSTRY.agents
let plants = DBINDUSTRY.plants
let departments = DBINDUSTRY.departments
let lines = DBINDUSTRY.lines
let machines = DBINDUSTRY.machines
let controllers = DBINDUSTRY.controllers
let datapoints = DBINDUSTRY.generateDataPoints()
let clonepoints = DBINDUSTRY.generateClonePoints()
let masterbatchphases = DBINDUSTRY.masterbatchphases
let clonephases = DBINDUSTRY.generateClonePhases(clonepoints, 'BATCH')


const init = (family) => {
    console.log("INITIALIZE MOCK DB FOR",family)
    switch (family) {
        default:
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

const getPlants = async function (body) {
    let retPlants = JSON.parse(JSON.stringify(plants))
    const filters = body.options.filters
    if (filters && filters.length) {
        retPlants = filterArray(retPlants, filters)
    }
    body.data = retPlants
    return (body)
}

const setPlant = async function (body) {
    const plant = body.options.plant
    let old = null
    if (plant) {
        const existing = plants.findIndex((item) => { return item.uid == plant.uid })
        if (existing > -1) {
            old = plants[existing]
            plants[existing] = plant
        } else {
            plants.push(plant)
        }
    }
    return old
}

const deletePlant = async function (body) {
    const filters = body.options.filters
    plants = filterArray(plants, filters, true)
    body.data = plants
    return (body)
}

const getDepartments = async function (body) {
    let retDepts = JSON.parse(JSON.stringify(departments))
    const filters = body.options.filters
    if (filters && filters.length) {
        retDepts = filterArray(retDepts, filters)
    }
    body.data = retDepts
    return (body)
}

const setDepartment = async function (body) {
    const department = body.options.department
    let old = null
    if (department) {
        const existing = departments.findIndex((item) => { return item.uid == department.uid })
        if (existing > -1) {
            old = departments[existing]
            departments[existing] = department
        } else {
            departments.push(department)
        }
    }
    return old
}

const deleteDepartment = async function (body) {
    const filters = body.options.filters
    departments = filterArray(departments, filters, true)
    body.data = departments
    return (body)
}

const getLines = async function (body) {
    let retLines = JSON.parse(JSON.stringify(lines))
    const filters = body.options.filters
    if (filters && filters.length) {
        retLines = filterArray(retLines, filters)
    }
    body.data = retLines
    return (body)
}

const setLine = async function (body) {
    const line = body.options.line
    let old = null
    if (line) {
        const existing = lines.findIndex((item) => { return item.uid == line.uid })
        if (existing > -1) {
            old = lines[existing]
            lines[existing] = line
        } else {
            lines.push(line)
        }
    }
    return old
}

const deleteLine = async function (body) {
    const filters = body.options.filters
    lines = filterArray(lines, filters, true)
    body.data = lines
    return (body)
}

const getMachines = async function (body) {
    let retMachines = JSON.parse(JSON.stringify(machines))
    const filters = body.options.filters
    if (filters && filters.length) {
        retMachines = filterArray(retMachines, filters)
    }
    body.data = retMachines
    return (body)
}

const setMachine = async function (body) {
    const machine = body.options.machine
    let old = null
    if (machine) {
        const existing = machines.findIndex((item) => { return item.uid == machine.uid })
        if (existing > -1) {
            old = machines[existing]
            machines[existing] = machine
        } else {
            machines.push(machine)
        }
    }
    return old
}

const deleteMachine = async function (body) {
    const filters = body.options.filters
    machines = filterArray(machines, filters, true)
    body.data = machines
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
    const filters = body.options.filters
    if (filters && filters.length) {
        retPoints = filterArray(retPoints, filters)
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
        timeSeries = point.atype == 'ANALOG' ? DBINDUSTRY.generateTimeSeriesPoly(point, 1000, deg) :DBINDUSTRY.generateTimeSeriesRect(point,1000,deg)
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


const CONFIG = {
    init,
    getDevices,
    setDevice,
    deleteDevice,
    getAgents,
    setAgent,
    deleteAgent,
    getPlants,
    setPlant,
    deletePlant,
    getDepartments,
    setDepartment,
    deleteDepartment,
    getLines,
    setLine,
    deleteLine,
    getMachines,
    setMachine,
    deleteMachine,
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
}

export default CONFIG
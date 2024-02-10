const deviceTypes = [
    { value: 'VM', img: '/VMWARE.svg' },
    { value: 'HW', img: '/HW.svg' },
]
const deviceOs = [
    { value: 'UBUNTU', img: '/UBUNTU.svg' },
    { value: 'RASPI', img: '/RASPBERRYPI.svg' },
    { value: 'MICROSOFT', img: '/WINDOWS.svg' },
]

export function getImage(type, value) {
    let image = ''
    let found
    switch (type) {
        case 'devicetype':
            found = deviceTypes.find((item) => (item.value == value))
            if (found)
                image = found.img
            break
        case 'deviceos':
            found = deviceOs.find((item) => (item.value == value))
            if (found)
                image = found.img
            break
        default:
            break
    }
    return image
}

export function getImageArray(type) {
    // @ts-ignore
    let array = []
    switch (type) {
        case 'devicetype':
            array = deviceTypes
            break
        case 'deviceos':
            array = deviceOs
            break
        default:
            break
    }
    return array
}

const voidfunction = () => { return "" }
let devicedatacolumns = [
    {
        header: 'Name',
        accessor: 'name',
    },
    {
        header: 'Description',
        accessor: 'description',
    },
    {
        header: 'Plant',
        accessor: (item) => item.localization.plant,
    },
    {
        header: 'Type',
        accessor: 'type'
        //renderdef: { type: 'image', params: { image: '/STOP.svg', uid: 'uid' } }
    },
    {
        header: 'OS',
        accessor: 'os'
        //renderdef: { type: 'image', params: { image: '/STOP.svg', uid: 'uid' } }
    },
    {
        header: 'OSVER',
        accessor: 'osver'
        //renderdef: { type: 'image', params: { image: '/STOP.svg', uid: 'uid' } }
    },
    {
        header: 'Host/IP',
        accessor: 'host',
    },
    {
        header: 'Port',
        accessor: 'port',
    },
    {
        header: 'Agents',
        accessor: voidfunction,
        renderdef: { type: 'image', params: { image: '/START.svg', uid: 'Id' } }
    },
    {
        header: 'Edit',
        accessor: voidfunction,
        renderdef: { type: 'image', params: { image: '/EDIT.svg', uid: 'Id' } }
    },
    {
        header: 'Delete',
        accessor: voidfunction,
        renderdef: { type: 'image', params: { image: '/DELETE.svg', uid: 'Id' } }
    }
];
// @ts-ignore
export function getDeviceColumns(module) {
    switch (module) {
        case 'data':
        case 'clone':
        case 'ai':
            return(devicedatacolumns)
            break;
        case 'learn':
            break;
        default:
            return([])
    }
}
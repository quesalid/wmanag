
const voidfunction = () => { return "" }
const onClickEdit = (ev) => {
    const target = ev.target
    const uid = target.getAttribute("data-uid")
    // SEND EDIT CLICKED EVENT TO MODAL
    const modalEdit = document.getElementById('DeviceInputDiv')
    const editClicked = new CustomEvent("editclicked", { detail: uid })
    modalEdit?.dispatchEvent(editClicked)
}
const onClickDelete = (ev) => {
    const target = ev.target
    const uid = target.getAttribute("data-uid")
    // SEND EDIT CLICKED EVENT TO MODAL
    const modalEdit = document.getElementById('DeleteInputDiv')
    const deleteClicked = new CustomEvent("deleteclicked", { detail: uid })
    modalEdit?.dispatchEvent(deleteClicked)
}
const onClickAgent = (ev) => {
    const target = ev.target
    const uid = target.getAttribute("data-uid")
    // SEND EDIT CLICKED EVENT TO MODAL
    const configPage = document.getElementById('main-configuration-page')
    const deleteClicked = new CustomEvent("agentclicked", { detail: uid })
    configPage?.dispatchEvent(deleteClicked)
}
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
        accessor: 'plant',
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
        renderdef: { type: 'image', params: { image: '/START.svg', onClick: onClickAgent } }
    },
    {
        header: 'Edit',
        accessor: voidfunction,
        renderdef: { type: 'image', params: { image: '/EDIT.svg', onClick: onClickEdit} }
    },
    {
        header: 'Delete',
        accessor: voidfunction,
        renderdef: { type: 'image', params: { image: '/DELETE.svg', onClick: onClickDelete } }
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
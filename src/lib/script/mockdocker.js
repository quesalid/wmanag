import { v4 as uuidv4 } from "uuid"
let docker = {}
let dockers = []
let containers = [
    {
        Id: "8dfafdbc3a40",
        Names: [],
        Image: "quesalid/up2agentdata:latest",
        ImageID: "e216a057b1cb1efc11f8a268f37ef62083e70b1b38323ba252e25ac88904a7e8",
        Command: "echo 1",
        Created: 1467854155000,
        State: "Exited",
        Status: "Exit 0",
        Ports: [],
        Labels: {},
        SizeRw: 12288,
        SizeRootFs: 0,
        HostConfig: {},
        NetworkSettings: {},
        Mounts: []
    },
]
let images = [
    {
        Id: "sha256:e216a057b1cb1efc11f8a268f37ef62083e70b1b38323ba252e25ac88904a7e8",
        ParentId: "",
        RepoTags: ["quesalid/up2agentdata:latest"],
        RepoDigests: [],
        Created: 1464925151000,
        Size: 103579269,
        VirtualSize: 103579269,
        SharedSize: 0,
        Labels: {},
        Containers: 2
    },
]

const setDockerEnv = async function (body) {
    docker = {}
    const keys = Object.keys(body.options.env)
    docker['env'] = {}
    for (let i = 0; i < keys.length; i++) {
        docker.env[keys[i]] = body.options.env[keys[i]]
    }
}

const dnsLookup = async function (body) {
    return { address: body.options.hostname }
}

const dockerCreate = async function (body) {
    // if DPCKER_HOST == '10.112.1.71' throw an error
    if (docker.env && docker.env.DOCKER_HOST.includes('10.112.1.71'))
        throw (new Error('CONNECTION TIMEOUT'))
    docker.uid = uuidv4()
    docker.createdAt = Date.now()
    dockers.push(docker)
    body.data = docker
    body.result = true
    body.error = null
    return body
}

const dockerDelete = async function (body) {
    // if DPCKER_HOST == '10.112.1.71' throw an error
    dockers = dockers.filter(d => d.uid !== body.options.uid)
    body.data = dockers.length
    body.result = true
    body.error = null
    return body
}

const dockerInfo = async function (body) {
    const infos = {
        ID: 'B74L:44XG:GQKA:SKB4:ZUO6:XNB4:X7CR:TNPZ:GMJ5:2I3Q:657H:PAUY',
        Containers: 2,
        ContainersRunning: 2,
        ContainersPaused: 0,
        ContainersStopped: 0,
        Images: 2,
        Driver: 'overlay2',
        DriverStatus: [
            ['Backing Filesystem', 'extfs'],
            ['Supports d_type', 'true'],
            ['Native Overlay Diff', 'true']
        ],
        SystemStatus: null,
        Plugins: {
            Volume: ['local'],
            Network: ['bridge', 'host', 'macvlan', 'null', 'overlay'],
            Authorization: ['ciscoplugin'],
            Log: [
                'awslogs', 'fluentd',
                'gcplogs', 'gelf',
                'journald', 'json-file',
                'logentries', 'splunk',
                'syslog'
            ]
        },
        MemoryLimit: true,
        SwapLimit: true,
        KernelMemory: true,
        CpuCfsPeriod: true,
        CpuCfsQuota: true,
        CPUShares: true,
        CPUSet: true,
        IPv4Forwarding: true,
        BridgeNfIptables: true,
        BridgeNfIp6tables: true,
        Debug: false,
        NFd: 38,
        OomKillDisable: true,
        NGoroutines: 50,
        SystemTime: '2023-07-11T12:48:12.801784187+01:00',
        LoggingDriver: 'json-file',
        CgroupDriver: 'cgroupfs',
        NEventsListener: 0,
        KernelVersion: '5.4.147',
        OperatingSystem: 'Ubuntu',
        OSType: 'linux',
        OSVersion: '20.0',
        Architecture: 'x86_64',
        IndexServerAddress: 'https://index.docker.io/v1/',
        RegistryConfig: {
            AllowNondistributableArtifactsCIDRs: [],
            AllowNondistributableArtifactsHostnames: [],
            InsecureRegistryCIDRs: ['127.0.0.0/8'],
            IndexConfigs: { 'docker.io': [Object] },
            Mirrors: []
        },
        NCPU: 4,
        MemTotal: 8081371136,
        GenericResources: null,
        DockerRootDir: '/software/docker/1000000.1000000',
        HttpProxy: '',
        HttpsProxy: '',
        NoProxy: '',
        Name: 'ic3k',
        Labels: [],
        ExperimentalBuild: false,
        ServerVersion: '18.03.0',
        ClusterStore: '',
        ClusterAdvertise: '',
        Runtimes: { runc: { path: 'docker-runc' } },
        DefaultRuntime: 'runc',
        Swarm: {
            NodeID: '',
            NodeAddr: '',
            LocalNodeState: 'inactive',
            ControlAvailable: false,
            Error: '',
            RemoteManagers: null
        },
        LiveRestoreEnabled: false,
        Isolation: '',
        InitBinary: 'docker-init',
        ContainerdCommit: {
            ID: 'cfd04396dc68220d1cecbe686a6cc3aa5ce3667c.m',
            Expected: 'cfd04396dc68220d1cecbe686a6cc3aa5ce3667c'
        },
        RuncCommit: {
            ID: '751f18de2af90495e9c5665b95bfc7adf66ddd57-dirty',
            Expected: '4fc53a81fb7c994640722ac585fa9ca548971871'
        },
        InitCommit: { ID: 'N/A', Expected: '' },
        SecurityOptions: ['name=userns']
    }
    body.data = infos
    body.result = true
    body.error = null
    return (body)
}

const dockerListContainers = async function (body) {
    body.data = containers
    body.result = true
    body.error = null
    return (body)
}

const dockerListImages = async function (body) {
    body.data = images
    body.result = true
    body.error = null
    return (body)
}

const dockerStartContainer = async function (body) {
    // Change state of container
    const id = body.options.id
    const container = containers.find(c => c.Id === id)
    if (container)
        container.State = "Running"
    body.result = true
    body.error = null
    return (body)
}

const dockerStopContainer = async function (body) {
    // Change state of container
    const id = body.options.id
    const container = containers.find(c => c.Id === id)
    if (container)
        container.State = "Exited"
    body.result = true
    body.error = null
    return (body)
}
const dockerRestartContainer = async function (body) {
    // Change state of container
    body.result = true
    body.error = null
    return (body)
}

const dockerRemoveContainer = async function (body) {
    // Remove container
    const id = body.options.id
    containers = containers.filter(c => c.Id !== id)
    body.data = { Deleted: id }
    body.result = true
    body.error = null
    return (body)
}

const dockerRemoveImage = async function (body) {
    // Remove image
    const id = body.options.id
    images = images.filter(i => i.Id !== id)
    body.data = { Deleted: id }
    body.result = true
    body.error = null
    return (body)
}

const dockerPullImage = async function (body) {
    const newimage = {
        Id: "sha256:fa563eb1b098c42a9ff38526ef873d10150eab1b3832990252e187c8d904aa34",
        ParentId: "",
        RepoTags: [body.options.repotag],
        RepoDigests: [],
        Created: Date.now(),
        Size: 103579269,
        VirtualSize: 103579269,
        SharedSize: 0,
        Labels: {},
        Containers: 2
    }
    images.push(newimage)
    body.result = {Id: "sha256:fa563eb1b098c42a9ff38526ef873d10150eab1b3832990252e187c8d904aa34", Warnings: [] }
    body.error = null
    return (body)
}

const dockerBuildImage = async function (body) {
    body.result = true
    body.error = null
    return (body)
}

const dockerCreateContainer = async function (body) {
    console.log("dockerCreateContainer", body)
    const newcontainer = {
        Id: "e90e34656806",
        Names: [],
        Image: body.options.containeroptions.Image,
        ImageID: "e216a057b1cb1efc11f8a268f37ef62083e70b1b38323ba252e25ac88904a7e8",
        Command: "echo 1",
        Created: Date.now(),
        State: "Exited",
        Status: "Exit 0",
        Ports: [],
        Labels: {},
        SizeRw: 12288,
        SizeRootFs: 0,
        HostConfig: {},
        NetworkSettings: {},
        Mounts: []
    }
    containers.push(newcontainer)
    body.data = { Id: "e90e34656806", Warnings: [] }
    body.result = true
    body.error = null
    return (body)
}

const DOCKER = {
    setDockerEnv,
    dnsLookup,
    dockerCreate,
    dockerInfo,
    dockerListContainers,
    dockerListImages,
    dockerStartContainer,
    dockerStopContainer,
    dockerRestartContainer,
    dockerRemoveContainer,
    dockerRemoveImage,
    dockerPullImage,
    dockerBuildImage,
    dockerCreateContainer,
    dockerDelete
}

    export default DOCKER
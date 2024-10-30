import { getContext } from 'svelte';
import type { Writable } from 'svelte/store';

export const useDnD = () => {
    return getContext('dnd') as Writable<Object | null>;
};


const nodecolors = [
    { type: 'mainEntity', color: '#ddefde' },
    { type: 'areaEntity', color: '#f4c2c2' },
    { type: 'localEntity', color: '#ffcba4' },
    { type: 'controlledEntity', color: 'orange' },
    { type: 'controller', color: 'yellow' },
    { type: 'input', color: null },
    { type: 'default', color: null },
    { type: 'output', color: null },
]

export const getNodeColor = (type: any) => {
    const found = nodecolors.find((item: any) => item.type == type)
    if (found)
        return (found.color)
    return null
}

const mainEntityTemplate = [
    { field:'uid',name: 'uid', value: '', type: 'text', show: false, options: null },
    { field:'name',name: 'name', value: '', type: 'text', show: true, options: null },
    { field:'description',name: 'description', value: '', type: 'text', show: true, options: null },
    { field:'lat',name: 'lat', value: 0.0, type: 'number', show: true, options: null },
    { field:'lon',name: 'lon', value: 0.0, type: 'number', show: true, options: null },
    { field:'image',name: 'image', value: '', type: 'text', show: true, options: null },
    { field:'geojson',name: 'geojson', value: [{ id: '', area: '', local: '', path: [] }], type: 'object', show: false, options: null },
    { field:'label',name: 'label', value: '', type: 'text', show: true, options: null },
    { field:'address',name: 'address', value: '', type: 'autoaddress', show: true, options: null },
    { field:'color',name: 'color', value: '#FF6188', type: 'color', show: true, options: null },
]

const areaEntityTemplate = [
    { field:'uid',name: 'uid', value: '', type: 'text', show: false, options: null },
    { field:'name',name: 'name', value: '', type: 'text', show: true, options: null },
    { field:'description',name: 'description', value: '', type: 'text', show: true, options: null },
    { field:'plant',name: 'plant', value: '', type: 'text', show: false, options: null },
]

const localEntityTemplate = [
    { field:'uid',name: 'uid', value: '', type: 'text', show: false, options: null },
    { field:'name',name: 'name', value: '', type: 'text', show: true, options: null },
    { field:'description',name: 'description', value: '', type: 'text', show: true, options: null },
    { field:'department',name: 'department', value: '', type: 'text', show: false, options: null },
]

const controlledEntityTemplate = [
    { field:'uid',name: 'uid', value: '', type: 'text', show: false, options: null },
    { field:'name',name: 'name', value: '', type: 'text', show: true, options: null },
    { field:'description',name: 'description', value: '', type: 'text', show: true, options: null },
    { field:'line',name: 'line', value: '', type: 'text', show: false, options: null },
    { field:'type',name: 'type', value: '', type: 'text', show: true, options: null },
    { field:'buildyear',name: 'buildyear', value: '', type: 'date', show: true, options: null },
    { field:'agent',name: 'agent', value: '', type: 'text', show: false, options: null },
    { field:'lat',name: 'lat', value: 0.0, type: 'number', show: true, options: null },
    { field:'lon',name: 'lon', value: 0.0, type: 'number', show: true, options: null },
]

const controllerTemplate = [
    { field:'uid',name: 'uid', value: '', type: 'text', show: false, options: null },
    { field:'name',name: 'name', value: '', type: 'text', show: true, options: null },
    {
        field:'ctype',name: 'ctype', value: '', type: 'select', show: true,
        options: {
            opts: [
                { name: 'PLC', value: 'plc' },
                { name: 'Scada', value: 'scd' },
                { name: 'IoT', value: 'iot' },
                { name: 'Soft PLC', value: 'splc' },
            ]
        }
    },
    { field:'model',name: 'model', value: '', type: 'text', show: true, options: null },
    { field:'machine',name: 'machine', value: '', type: 'text', show: false, options: null },
    { field:'manufacturer',name: 'manufacturer', value: '', type: 'text', show: true, options: null },
    { field:'ip',name: 'ip', value: '', type: 'text', show: true, options: null },
    { field:'port',name: 'port', value: 0, type: 'number', show: true, options: null },
    { field:'mac',name: 'mac', value: '', type: 'text', show: true, options: null },
    {
        field:'intf',name: 'intf', value: '', type: 'select', show: true,
        options: {
            opts: [
                { name: 'Ethernet', value: 'eth' },
                { name: 'Serial', value: 'ser' },
                { name: 'USB', value: 'usb' },
                { name: 'Bluetooth', value: 'blu' },
                { name: 'WiFi', value: 'wif' },
                { name: 'Zigbee', value: 'zig' },
                { name: 'Zwave', value: 'zwa' },
                { name: 'LoRa', value: 'lor' },
                { name: 'Sigfox', value: 'sfx' },
                { name: 'NB-IoT', value: 'nbi' },
                { name: 'LTE-M', value: 'ltm' },
                { name: '5G', value: '5g' },
            ]
        }
    },
    {
        field:'driver',name: 'driver', value: '', type: 'select', show: true,
        options: {
            opts: [
                { name: 'Siemens', value: 's7' },
                { name: 'Modbus', value: 'mb' },
                { name: 'BACnet', value: 'bn' },
                { name: 'OPC-UA', value: 'opc' },
                { name: 'MQTT', value: 'mqt' },
                { name: 'HTTP', value: 'htt' },
                { name: 'REST', value: 'res' },
                { name: 'CoAP', value: 'coa' },
                { name: 'LonWorks', value: 'lw' },
                { name: 'KNX', value: 'knx' },
            ]
        }
    },
]

const templates = [
    { type: 'mainEntity', template: mainEntityTemplate },
    { type: 'areaEntity', template: areaEntityTemplate },
    { type: 'localEntity', template: localEntityTemplate },
    { type: 'controlledEntity', template: controlledEntityTemplate },
    { type: 'controller', template: controllerTemplate },
    { type: 'input', template: null },
    { type: 'default', template: null },
    { type: 'output', template: null },
]

export const getNodeTemplate = (type: any) => {
    const found = templates.find((item: any) => item.type == type)
    if (found)
        return (found.template)
    return null
}

const nodelabels = [
    { type: 'mainEntity', label: 'Impianto' },
    { type: 'areaEntity', label: 'Linea' },
    { type: 'localEntity', label: 'Sezione' },
    { type: 'controlledEntity', label: 'Macchinario' },
    { type: 'controller', label: 'Controllore' },
    { type: 'input', label: 'Input' },
    { type: 'default', label: 'Default' },
    { type: 'output', label: 'Output' },
]

export const getNodeLabel = (type: any) => {
    const found = nodelabels.find((item: any) => item.type == type)
    if (found)
        return (found.label)
    return null
}
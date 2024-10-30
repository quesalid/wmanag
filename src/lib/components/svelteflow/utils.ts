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
    { name: 'uid', value: '', type: 'text', show: false, options: null },
    { name: 'name', value: '', type: 'text', show: true, options: null },
    { name: 'description', value: '', type: 'text', show: true, options: null },
    { name: 'lat', value: 0.0, type: 'number', show: true, options: null },
    { name: 'lon', value: 0.0, type: 'number', show: true, options: null },
    { name: 'image', value: '', type: 'text', show: true, options: null },
    { name: 'geojson', value: [{ id: '', area: '', local: '', path: [] }], type: 'object', show: false, options: null },
    { name: 'label', value: '', type: 'text', show: true, options: null },
    { name: 'address', value: '', type: 'autoaddress', show: true, options: null },
    { name: 'color', value: '#FF6188', type: 'color', show: true, options: null },
]

const areaEntityTemplate = [
    { name: 'uid', value: '', type: 'text', show: false, options: null },
    { name: 'name', value: '', type: 'text', show: true, options: null },
    { name: 'description', value: '', type: 'text', show: true, options: null },
    { name: 'plant', value: '', type: 'number', show: true, options: null },
]

const localEntityTemplate = [
    { name: 'uid', value: '', type: 'text', show: false, options: null },
    { name: 'name', value: '', type: 'text', show: true, options: null },
    { name: 'description', value: '', type: 'text', show: true, options: null },
    { name: 'plant', value: '', type: 'number', show: true, options: null },
]

const controlledEntityTemplate = [
    { name: 'uid', value: '', type: 'text', show: false, options: null },
    { name: 'name', value: '', type: 'text', show: true, options: null },
    { name: 'description', value: '', type: 'text', show: true, options: null },
    { name: 'line', value: '', type: 'text', show: true, options: null },
    { name: 'type', value: '', type: 'text', show: true, options: null },
    { name: 'buildyear', value: '', type: 'text', show: true, options: null },
    { name: 'agent', value: '', type: 'text', show: false, options: null },
    { name: 'lat', value: 0.0, type: 'number', show: true, options: null },
    { name: 'lon', value: 0.0, type: 'number', show: true, options: null },
]

const controllerTemplate = [
    { name: 'uid', value: '', type: 'text', show: false, options: null },
    { name: 'name', value: '', type: 'text', show: true, options: null },
    {
        name: 'ctype', value: '', type: 'select', show: true,
        options: {
            opts: [
                { name: 'PLC', value: 'plc' },
                { name: 'Scada', value: 'scd' },
                { name: 'IoT', value: 'iot' },
                { name: 'Soft PLC', value: 'splc' },
            ]
        }
    },
    { name: 'model', value: '', type: 'text', show: true, options: null },
    { name: 'machine', value: '', type: 'text', show: true, options: null },
    { name: 'manufacturer', value: '', type: 'text', show: true, options: null },
    { name: 'ip', value: '', type: 'text', show: true, options: null },
    { name: 'port', value: 0, type: 'number', show: true, options: null },
    { name: 'mac', value: '', type: 'text', show: true, options: null },
    {
        name: 'intf', value: '', type: 'select', show: true,
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
        name: 'driver', value: '', type: 'select', show: true,
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
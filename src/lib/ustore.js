// BBOTSTRAP https://www.w3schools.com/bootstrap/bootstrap_ref_all_classes.asp
import { writable } from 'svelte/store';

export const mock = writable(true) // MOCK DATA IF TRUE
export const role = writable("")  // LOGGED USER ROLE
//export const user = writable({ username: '', uid: '', name: '', surname: '', profile: { dashboard: [], locale: 'en-US', language: 'en', map: { center: { lat: 30, lng: -30 }, zoom: 1 } } })  // LOGGED USER
export const user = writable({})  // LOGGED USER
export const token = writable("") // SESSION LOGIN TOKEN
export const currentmainentity = writable({ name: "PLANT-001" }) // CURRENT PLANT
export const navigation = writable([{}]) // TOKENIZED NAVIGATION ARRAY OF OBJECT
export const module = writable("") // CUERRENT MODULE
export const currdevice = writable("") // CURRENT DEVICE
export const avatargroups = writable([]) // TOKENIZED AVATAR MENU ARRAY OF OBJECTS
export const avatarclass = writable("text-left text-sm italic mb-9") // AVATAR MENU ARRAY CLASS
export const avatar = writable("") // AVATAR STREAM
export const family = writable("INDUSTRY") // PROCESS FAMILY (INDUSTRY|UTILITY|PLANT|INFR)
export const assistant = writable(false) // ASSISTANT STATUS
export const hfkey = writable("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") // HUGGINGFACE KEY

/**
 * getArrayFromPath
 * @description build tokenized navigation array of objects from path
 * @param {any} path path
 * @returns array of navigation tokens [{href:link,name:section name,last: true if last section}]
 */
export const getArrayFromPath = (path) => {
    const retArray = []
    const split = path.split('/')
    console.log('split ***** ',split)
    if (split.length > 1) {
        let concat = ''
        for (let i = 1; i < split.length; i++) {
            concat += '/' + split[i]
            const last = i< (split.length-1)?false:true
            const item = { href: concat, name: split[i],last:last }
            retArray.push(item)
        }
    }
    return retArray
}
/**
 * getEntityNames - return entity name depending on app family
 * @param {any} family - app family
 * @returns
 */
 export const getEntityNames = (family) => {
     let retName = {
         main: { singular: 'plant', plural: 'plants',Singular:'Plant',Plural:'Plants' },
         area: { singular: 'department', plural: 'departments',Singular:'Department',Plural:'Departments' },
         local: { singular: 'line', plural: 'lines', Singular:'Line', Plural:'Lines' },
         controlled: { singular: 'machine', plural: 'machines', Singular:'machine',Plural:'Machines' }
     }
     switch (family) {
         case 'INDUSTRY':
         case 'PLANT':
         case 'PHARMA':
             retName.main.singular = 'plant'
             retName.main.plural = 'plants'
             retName.main.Singular = 'Plant'
             retName.main.Plural = 'Plants'
             retName.area.singular = 'department'
             retName.area.plural = 'departments'
             retName.area.Singular = 'Department'
             retName.area.Plural = 'Departments'
             retName.local.singular = 'line'
             retName.local.plural = 'lines'
             retName.local.Singular = 'Line'
             retName.local.Plural = 'Lines'
             retName.controlled.singular = 'machine'
             retName.controlled.plural = 'machines'
             retName.controlled.Singular = 'Machine'
             retName.controlled.Plural = 'Machines'
             break;
         case 'UTILITY':
         case 'INFR':
         case 'WWATER':
             retName.main.singular = 'infrastructure'
             retName.main.plural = 'infrastructures'
             retName.main.Singular = 'Infrastructure'
             retName.main.Plural = 'Infrastructures'
             retName.area.singular = 'area'
             retName.area.plural = 'areas'
             retName.area.Singular = 'Area'
             retName.area.Plural = 'Areas'
             retName.local.singular = 'section'
             retName.local.plural = 'sections'
             retName.local.Singular = 'Section'
             retName.local.Plural = 'Sections'
             retName.controlled.singular = 'element'
             retName.controlled.plural = 'elements'
             retName.controlled.Singular = 'Element'
             retName.controlled.Plural = 'Elements'
             break;         
     }
     return retName
}

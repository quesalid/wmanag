// BBOTSTRAP https://www.w3schools.com/bootstrap/bootstrap_ref_all_classes.asp
import { writable } from 'svelte/store';

export const mock = writable(true) // MOCK DATA IF TRUE
export const role = writable("")  // LOGGED USER ROLE
export const user = writable({ username: '', uid: '', name:'',surname:'',profile: { dashboard:[],locale:'en-US',language:'en'} })  // LOGGED USER
export const token = writable("") // SESSION LOGIN TOKEN
export const currentmainentity = writable({ name: "PLANT-001" }) // CURRENT PLANT
export const navigation = writable([{}]) // TOKENIZED NAVIGATION ARRAY OF OBJECT
export const module = writable("") // CUERRENT MODULE
export const currdevice = writable("") // CURRENT DEVICE
export const avatargroups = writable([]) // TOKENIZED AVATAR MENU ARRAY OF OBJECTS
export const avatarclass = writable("text-left text-sm italic mb-9") // AVATAR MENU ARRAY CLASS
export const avatar = writable("") // AVATAR STREAM
export const family = writable("INDUSTRY") // PROCESS FAMILY (INDUSTRY|UTILITY|PLANT|INFR)

/**
 * getArrayFromPath
 * @description build tokenized navigation array of objects from path
 * @param {any} path path
 * @returns array of navigation tokens [{href:link,name:section name,last: true if last section}]
 */
export const getArrayFromPath = (path) => {
    const retArray = []
    const split = path.split('/')
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
         main: { singular: 'plant', plural: 'plants' },
         area: { singular: 'department', plural: 'departments' },
         local: { singular: 'line', plural: 'lines' },
         controlled: { singular: 'machine', plural: 'machines' }
     }
     switch (family) {
         case 'INDUSTRY':
         case 'PLANT':
             retName.main.singular = 'plant'
             retName.main.plural = 'plants'
             retName.area.singular = 'department'
             retName.area.plural = 'departments'
             retName.local.singular = 'line'
             retName.local.plural = 'lines'
             retName.controlled.singular = 'machine'
             retName.controlled.plural = 'machines'
             break;
         case 'UTILITY':
         case 'INFR':
             retName.main.singular = 'infrastructure'
             retName.main.plural = 'infrastructures'
             retName.area.singular = 'area'
             retName.area.plural = 'areas'
             retName.local.singular = 'section'
             retName.local.plural = 'sections'
             retName.controlled.singular = 'element'
             retName.controlled.plural = 'elements'
             break;         
     }
     return retName
}

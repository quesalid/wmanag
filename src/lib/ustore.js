import { writable } from 'svelte/store';

// MOCK FLAG FOR DEVELOPMENT
export const mock = writable(true) // MOCK DATA IF TRUE
export const role = writable("")  // LOGGED USER ROLE
export const user = writable("")  // LOGGED USER
export const token = writable("") // SESSION LOGIN TOKEN
export const currentplant = writable({ name: "PLANT-001" }) // CURRENT PLANT
export const navigation = writable([{}]) // TOKENIZED NAVIGATION ARRAY OF OBJECT
export const module = writable("") // CUERRENT MODULR
export const currdevice = writable("") // CURRENT DEVICE

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
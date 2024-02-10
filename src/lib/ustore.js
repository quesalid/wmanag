import { writable } from 'svelte/store';

// MOCK FLAG FOR DEVELOPMENT
export const mock = writable(true)
export const role = writable("")
export const user = writable("")
export const token = writable("")
export const currentplant = writable({ name: "PLANT-001" })
export const navigation = writable([{}])

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
import { writable } from 'svelte/store';

// MOCK FLAG FOR DEVELOPMENT
export const mock = writable(true)
export const role = writable("")
export const user = writable("")
export const token = writable("")
export const currentplant = writable({ name: "PLANT-001" })
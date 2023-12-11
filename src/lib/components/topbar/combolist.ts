import { writable } from 'svelte/store';

// constructor function
const createStore = () => {
    // initialize internal writable store with empty list
    const { subscribe, set, update } = writable<any[]>([]);

    // mark message as read by removing it from the list
    const delitem = (item: any) =>
        update(items => items.filter(itm => itm.name !== item));

    // add new message to the top of the list
    const additem = (item: any) => update(items => [item, ...items]);

    return {
        subscribe,
        additem,
        init: set, // alias set method to init
        delitem,
        clear: () => set([])
    };
};

// initialize the store
const combolist = createStore();

export { combolist };

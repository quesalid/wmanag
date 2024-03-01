// @ts-nocheck
/**********************************************
 * CONTROL PANEL API - Sicheo s.r.l.
 * 
 * Api interface for machine control panel 
 * virtualization
 * 
 * Author; Paolo Pulicani
 *
 *********************************************/

import { cpPushButton, cpTurnKnob } from './apicontroller.js'

export class CP_Button {
    #status
    #element = null
    #onClickListener = null
    #mock = false 
    #name = ''
    static OFF = 'OFF'
    static ON = 'ON'
    static OFFCLASS = 'cp_button_off'
    static ONCLASS = 'cp_button_on'
    #onClass = CP_Button.ONCLASS
    #offClass = CP_Button.ON

    constructor(name,onclass,offclass,mock) {
        this.#name = name
        this.#status = CP_Button.OFF
        if (onclass)
            this.#onClass = onclass
        if (offclass)
            this.#offClass = offclass
        if (mock)
            this.#mock = mock
    }
    get status() {
        return this.#status;
    }
    set status(x) {
        this.#status = x;
    }

    bind(id) {
        this.#element = document.getElementById(id)
        console.log("BIND CP_Button", this.#element)
        if (this.#element) {
            const tag = this.#element.tagName
            // Could be <button> <img> <input type="button|image">
            switch (tag) {
                case 'BUTTON':
                case 'IMG':
                    // Remove event listener if present
                    if (this.#onClickListener)
                        this.#element.removeEventListener('click', this.#onClickListener)
                    console.log("ADD LISTENER CP_Button")
                    this.#onClickListener = this.#element.addEventListener("click", async (ev) => {
                        try {
                            const target = ev.target
                            // switch button value
                            const toggle = this.#status == CP_Button.OFF ? CP_Button.ON : CP_Button.OFF
                            this.#status = toggle
                            const ret = await cpPushButton(this.#name, this.#status,this.#mock)
                            // UPDATE ELEMENT CLASS - remove 
                            const classToRemove = this.#status == CP_Button.OFF ? this.#onClass : this.#offClass
                            const classToAdd = this.#status == CP_Button.OFF ? this.#offClass : this.#onClass
                            /*target.classList.remove(classToRemove);
                            target.classList.add(classToAdd);*/
                            target.src = classToAdd
                            console.log("RECEIVED CLICK", target, classToRemove, classToAdd, toggle)
                        } catch (error) {
                            console.log("CP_BUTTON: push button error ",this.#name,error)
                        }
                    })
                    break;
                case 'INPUT':
                    const inputType = tag.type
                    if (inputType != 'button' && inputType != 'image') {
                        console.log("CP_BUTTON: cannot bind input typ e", inputType)
                        break;
                    }
                    if (this.#onClickListener)
                        this.#element.removeEventListener('click', this.#onClickListener)
                    this.#onClickListener = this.#element.addEventListener("click", async () => {
                        try {
                            // switch button value
                            const toggle = this.#status == CP_Button.OFF ? CP_Button.ON : CP_Button.OFF
                            this.#status = toggle
                            const ret = await cpPushButton(this.#name, this.#status, this.#mock)
                            // UPDATE ELEMENT CLASS - remove 
                            const classToRemove = this.#status == CP_Button.OFF ? CP_Button.ONCLASS : CP_Button.OFFCLASS
                            const classToAdd = this.#status == CP_Button.OFF ? CP_Button.OFFCLASS : CP_Button.ONCLASS
                            this.#element.classList.remove(classToRemove);
                            this.#element.classList.add(classToAdd);
                        } catch (error) {
                            console.log("CP_BUTTON: push button error ", this.#name, error)
                        }
                    })
                    break;
                default:
                    console.log("CP_BUTTON: cannot bind ",tag)
                    break
            }
        }
    }

}

// EXAMPLE KNOB https://codepen.io/ShadowShahriar/pen/zYPePva
export class CP_Knob {
    #value = 0.0
    #mock = false
    #element = null
    #onChangeListener = null
    #name = ''
    constructor(name,mock) {
        this.#name = name
        if (mock)
            this.#mock = mock
    }
    get value() {
        return this.#value;
    }
    set value(x) {
        this.#value = x;
    }

    bind(id) {
        this.#element = document.getElementById(id)
        if (this.#element) {
            const tag = this.#element.tagName
            // Could be <button> <img> <input type="button|image">
            switch (tag) {
                case 'INPUT':
                    const inputType = tag.type
                    if (inputType != 'range') {
                        console.log("CP_BUTTON: cannot bind input typ e", inputType)
                        break;
                    }
                    if (this.#onChangeListener)
                        this.#element.removeEventListener('change', this.#onChangeListener)
                    this.#onChangeListener = this.#element.addEventListener("change", async (ev) => {
                        try {
                            // switch button value
                            this.#value = ev.target.value
                            const ret = await cpTurnKnob(this.#name, this.#value, this.#mock)
                            // UPDATE ELEMENT CLASS - remove 
                            /*const classToRemove = this.#status == CP_Button.OFF ? CP_Button.ONCLASS : CP_Button.OFFCLASS
                            const classToAdd = this.#status == CP_Button.OFF ? CP_Button.OFFCLASS : CP_Button.ONCLASS
                            this.#element.classList.remove(classToRemove);
                            this.#element.classList.add(classToAdd);*/
                        } catch (error) {
                            console.log("CP_BUTTON: push button error ", this.#name, error)
                        }
                    })
                    break;
                default:
                    console.log("CP_BUTTON: cannot bind ", tag)
                    break
            }
        }
    }
}

export class CP_Light {
    #status = 'OFF'
    #element = null
    #name = ''
    #mock = false
    static OFF = 'OFF'
    static ON = 'ON'
    static OFFCLASS = 'cp_button_off'
    static ONCLASS = 'cp_button_on'
    static CUSTOMEVENT = 'cplightchanged'
    #customEventListener
    #myEventListener
    constructor(name,mock) {
        this.#name = name
        this.#status = CP_Light.OFF
        if (mock)
            this.#mock = mock
        // ADD EVENT LISTENER
        this.#myEventListener = this.addEventListener(CP_LIGHT.CUSTOMEVENT,this.onEvent.bind(this))
    }
    get status() {
        return this.#status;
    }
    set status(x) {
        this.#status = x;
    }

    bind(id) {
        this.#element = document.getElementById(id)
        if (this.#element) {
            const tag = this.#element.tagName
            // Could be <img> <input type="image"> <div>
            switch (tag) {
                case 'DIV':
                case 'IMG':
                    // SET EVENT LISTENER
                    if (this.#customEventListener)
                        this.#element.removeEventListener(CP_LIGHT.CUSTOMEVENT, this.#customEventListener)
                    this.#customEventListener = this.#element.addEventListener(CP_LIGHT.CUSTOMEVENT, async (ev) => {
                        try {
                            // switch light value
                            const toggle = ev.detail.status
                            // UPDATE ELEMENT CLASS - remove 
                            const classToRemove = toggle == CP_LIGHT.OFF ? CP_LIGHT.ONCLASS : CP_LIGHT.OFFCLASS
                            const classToAdd = toggle == CP_LIGHT.OFF ? CP_LIGHT.OFFCLASS : CP_LIGHT.ONCLASS
                            this.#element.classList.remove(classToRemove);
                            this.#element.classList.add(classToAdd);
                        } catch (error) {
                            console.log("CP_LIGHT: light component error ", this.#name, error)
                        }
                    })
                    break
                case 'INPUT':
                    const inputType = tag.type
                    if (inputType != 'image') {
                        console.log("CP_LIGHT: cannot bind input typ e", inputType)
                        break;
                    }
                    // SET EVENT LISTENER
                    if (this.#customEventListener)
                        this.#element.removeEventListener(CP_LIGHT.CUSTOMEVENT, this.#customEventListener)
                    this.#customEventListener = this.#element.addEventListener(CP_LIGHT.CUSTOMEVENT, async (ev) => {
                        try {
                            // switch light value
                            const toggle = ev.detail.status
                            // UPDATE ELEMENT CLASS - remove 
                            const classToRemove = toggle == CP_LIGHT.OFF ? CP_LIGHT.ONCLASS : CP_LIGHT.OFFCLASS
                            const classToAdd = toggle == CP_LIGHT.OFF ? CP_LIGHT.OFFCLASS : CP_LIGHT.ONCLASS
                            this.#element.classList.remove(classToRemove);
                            this.#element.classList.add(classToAdd);
                        } catch (error) {
                            console.log("CP_LIGHT: light component error ", this.#name, error)
                        }
                    })
                    break;
                default:
                    console.log("CP_LIGHT: cannot bind ", tag)
                    break
            }
        }
    }

    onEvent(ev) {
        const status = ev.detail
        const customEvent = new CustomEvent(CP_LIGHT.CUSTOMEVENT, { detail: status })
        if (this.#element)
            this.#element.dispatchEvent(customEvent)
            
    }
}


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

import { cpPushButton } from './apicontroller.js'

class CP_Button {
    #status
    #element = null
    #onClickListener = null
    #mock = false
    static OFF = 'OFF'
    static ON = 'ON'
    static OFFCLASS = 'cp_button_off'
    static ONCLASS = 'cp_button_on'

    constructor(name,mock) {
        this.name = name
        this.#status = CP_Button.OFF
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
        if (this.#element) {
            this.#element = el
            const tag = this.#element.tagName
            // Could be <button> <img> <input type="button|image">
            switch (tag) {
                case 'button':
                case 'img':
                    // Remove event listener if present
                    if (this.#onClickListener)
                        this.#element.removeEventListener('click', this.#onClickListener)
                    this.#onClickListener = this.#element.addEventListener("click", async () => {
                        try {
                            // switch button value
                            const toggle = this.#status == CP_Button.OFF ? CP_Button.ON : CP_Button.OFF
                            this.#status = toggle
                            const ret = await cpPushButton(this.#name, this.#status,this.#mock)
                            // UPDATE ELEMENT CLASS - remove 
                            const classToRemove = this.#status == CP_Button.OFF ? CP_Button.ONCLASS : CP_Button.OFFCLASS
                            const classToAdd = this.#status == CP_Button.OFF ? CP_Button.OFFCLASS : CP_Button.ONCLASS
                            this.#element.classList.remove(classToRemove);
                            this.#element.classList.add(classToAdd);
                        } catch (error) {
                            console.log("CP_BUTTON: push button error ",this.#name,error)
                        }
                    })
                    break;
                case 'input':
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

class CP_Knob {
    #value = 0.0
    constructor(name) {
        this.name = name
    }
    get value() {
        return this.#value;
    }
    set value(x) {
        this.#value = x;
    }
}

class CP_Light {
    #status = 'OFF'
    #mock = false
    static OFF = 'OFF'
    static ON = 'ON'
    static OFFCLASS = 'cp_button_off'
    static ONCLASS = 'cp_button_on'
    static CUSTOMEVENT = 'cplightchanged'
    #customEventListener
    constructor(name,mock) {
        this.name = name
        this.#status = CP_Light.OFF
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
        if (this.#element) {
            this.#element = el
            const tag = this.#element.tagName
            // Could be <img> <input type="image"> <div>
            switch (tag) {
                case 'div':
                case 'img':
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
                case 'input':
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
}


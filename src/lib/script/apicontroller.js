import { callFetchGet, callFetchPost, getCHeader, baseUrl, sleep } from './api.js';
import mocks from './mockcontroller.js';

export const cpPushButton = async function (name, status, mock = false) {
    return new Promise(async (resolve, reject) => {
        const url = baseUrl + '/control/pushbutton'
        const body = {
            type: "api",
            version: 1.0,
            command: "cpPushButton",
            options: {
                name: name,
                status: status
            }
        };
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        } else {
            resolve(mocks.cpPushButton(body))
        }
    })
}

export const cpTurnKnob = async function (name, value, mock = false) {
    return new Promise(async (resolve, reject) => {
        const url = baseUrl + '/control/turnknob'
        const body = {
            type: "api",
            version: 1.0,
            command: "cpTurnKnob",
            options: {
                name: name,
                value: value
            }
        };
        if (!mock) {
            callFetchPost(url, body, getCHeader())
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        } else {
            resolve(mocks.cpTurnKnob(body))
        }
    })
}
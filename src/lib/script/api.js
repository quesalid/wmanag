import { token } from "../ustore.js"

export const baseUrl = 'https://' + window.location.hostname + ':9001'

const customHeaders = {
    "Content-Type": "application/json",
}

/**
 * Sleep function to simulate async calls
 * @param {any} ms
 * @returns
 */
export const sleep = function (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Return authorization header
 * @returns
 */
export const getCHeader = () => {
    let tkn
    const unsubscribe = token.subscribe(value => {
        tkn = value;
    });
    const cHeaders = {
        "Content-Type": "application/json",
        "Authorization": "bearer " + tkn,
    }
    unsubscribe()
    return cHeaders
}

/**
 * Call fetch POST
 * @param {any} url fetch url
 * @param {any} data body data
 * @param {any} cheaders header
 * @returns
 */
export const callFetchPost = async function (url, data, cheaders = null) {
    let headers = {}
    if (cheaders == null)
        headers = customHeaders
    else
        headers = cheaders
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data),
            insecure: true,
        }).then((response) => {
            response.json()
                .then((result) => {
                    if (result.name == 'TokenExpiredError') {
                        // TOKEN EXPIRED MANAGEMDNT
                        alert('TOKEN EXPIRED - RELOGIN')
                        reject('TokenExpiredError')
                    }
                    if (response.status < 400)
                        resolve(result)
                    else
                        reject(result)
                })
                .catch((error) => {
                    console.log("FETCH ERROR1 URL", url)
                    console.log("FETCH ERROR1", error)
                    reject(error)
                })
        })
            .catch((error) => {
                reject(error)
            })
    })
}

/**
 * Call fetch GET
 * @param {any} url fetch url
 * @param {any} cheaders call header
 * @returns
 */
export const callFetchGet = async function (url, cheaders = null) {
    let headers = {}
    if (cheaders == null)
        headers = customHeaders
    else
        headers = cheaders
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: "GET",
            headers: headers,
            insecure: true,
        }).then((response) => {
            response.json()
                .then((result) => {
                    if (response.status < 400)
                        resolve(result)
                    else
                        reject(result)
                })
                .catch((error) => {
                    console.log("FETCH ERROR1", error)
                    reject(error)
                })

        })
            .catch((error) => {
                reject(error)
            })
    })
}
// @ts-nocheck
import { callFetchGet, callFetchPost, getCHeader, baseUrl, sleep } from './api.js';
import mocks from './mocksecurity.js';

/**
 * login
 * @param {string} username username
 * @param {string} password password
 * @param {any} mock use mock flag (default false)
 */
export const login = async function (username,password, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/login'
        const body = {
            type: "username-password",
            username: username,
            password: password
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
            resolve(mocks.login(body))
        }
    })
}

/**
 * decode token
 * @param {string} token jwttoken
 * @param {any} mock use mock flag (default false)
 */
export const decodeToken = async function (token, mock = false) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + '/decodetoken'
        const body = {
            token: token
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
            resolve(mocks.decodeToken(body))
        }
    })
}
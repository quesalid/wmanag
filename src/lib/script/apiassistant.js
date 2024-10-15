import { callFetchGet, callFetchPostAwait, getCHeaderHF, baseUrl, sleep } from './api.js';


export const query = async function (data) {
    return new Promise(async (resolve, reject) => {
        const url = "https://api-inference.huggingface.co/models/microsoft/Phi-3-mini-4k-instruct"
        const body = data
        console.log("QUERY", body)
        try {
            const res = await callFetchPostAwait(url, body, getCHeaderHF())
            resolve(res)
        } catch (error) {
            reject(error)
        }
        
    })
}
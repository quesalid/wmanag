import { sleep } from "../../script/api.js";

const containerStyle = "border: 2px solid #dedede;background-color: #f1f1f1;border-radius: 5px;padding: 10px;margin: 10px 0; height: fit-content"
const containerStyleDarker = "border: 2px solid #ccc;background-color: #ddd;border-radius: 5px;padding: 10px;margin: 10px 0;  height: fit-content"
const containerStyleImage = "float: left;max-width: 60px;width: 25px;margin-right: 20px;border-radius: 50 %; "
const containerStyleImageRight = "float: right;max-width: 60px;width: 25px;margin-left: 20px; margin-right:0;border-radius: 50 %; "
const timeRightStyle = "color: #aaa ;"
const timeLeftStyle = "color: #999;"
export default class chatClass {
    // Il costruttore accetta parametri per inizializzare le proprietà
    static classContainerSend = "container";
    static classContainerReceive = "container darker";
    static containerSendImag = "";
    static containerReceiveImag = "/AVATAR1.png";
    
    constructor(div, conf) {
        this.chatDiv = div;
        console.log("DIV:",this.chatDiv)
        this.containerSendImag = conf && conf.containerSendImag ? conf.containerSendImag : chatClass.containerSendImag;
        this.containerReceiveImag = conf && conf.containerReceiveImag ? conf.containerReceiveImag : chatClass.containerReceiveImag;
        this.classContainerSend = conf && conf.classContainerSend ? conf.classContainerSend : chatClass.classContainerSend;
        this.classContainerReceive = conf && conf.classContainerReceive ? conf.classContainerReceive : chatClass.classContainerReceive;
        this.addMessageListener();
    }


    // Renderers  
    renderSendContainer(message,time) {
        return `<div class="${this.classContainerSend} style="${containerStyle}"">
        <img src="${this.containerSendImag}" style="${containerStyleImage}" alt="">
        <p>${message}</p>
        <span class="time-right" style="${timeRightStyle}" >${time}</span>
        </div>`;
    }

    renderReceiveContainer(message, time) {
        return `<div class="${this.classContainerReceive}" style="${containerStyleDarker}">
        <img src="${this.containerReceiveImag}" style="${containerStyleImageRight}" alt="Avatar">
        <p>${message}</p>
        <span class="time-left" style="${timeLeftStyle}" >${time}</span>
        </div>`;
    }

    addMessageSend(message) {
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let time = hours + ":" + minutes;
        this.chatDiv.innerHTML += this.renderSendContainer(message, time);
    }

    addMessageReceive(message, time) {
        this.chatDiv.innerHTML += this.renderReceiveContainer(message, time);
        this.chatDiv.scrollTop = this.chatDiv.scrollHeight;
    }

    // Add listener to add message received
    addMessageListener() {
        let self = this;
        this.chatDiv.addEventListener('message', (ev) => {
            console.log("chat message event:",ev.detail)
            const message = ev.detail;
            // get local time - only hours and minutes
            let date = new Date();
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let time = hours + ":" + minutes;
            self.addMessageReceive(message, time);
        });
    }

    // Send message
    async sendMessage(message, callback) {
        try {
            console.log("chat sendMessage:",message)
            this.addMessageSend(message);
            await sleep(500)
            await callback(message);
        } catch (error) {
            console.log(error);
        }
    }
    
}


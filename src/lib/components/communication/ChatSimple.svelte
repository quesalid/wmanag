<script lang="ts">
// https://www.hackerrank.com/blog/types-of-neural-networks-explained/
// EXTERNAL
import {onMount} from "svelte"
// INTERNAL
import { chatClass} from '.'
// STORE
import {token, mock, currentmainentity, avatar} from '../../ustore.js'


// EXPORTS
export let id:any = "SimpleChat"
export let title:any = "Simple Chat"
export let img:any = $avatar

let chat:any
let chatid = id + "-messages"
let sendMessage:any
let sentmessage = ''
onMount(async () => {
		chatid = id + "-messages"
		const messagediv = document.getElementById(chatid)
		const chat = new chatClass(messagediv)
		sendMessage  = (ev:any) =>{
				const target = ev.target
				const msg = sentmessage
				chat.sendMessage(msg,callback)
				target.previousElementSibling.value = ''
		}
	});


// INTERNAL
export let callback = (msg:any) =>{
	// send message event to messages container
	const reply = "Message received: "+msg
	const editClicked = new CustomEvent("message", { detail: reply })
	const container = document.getElementById(chatid)
	console.log("CALLBACK",container,msg)
	container?.dispatchEvent(editClicked)
}


</script>
 <!-- HTML -->	
	<div class="chat" id={id}>
		<div class="chat-title">
			<h1>{title}</h1>
			<figure class="avatar">
				<img src="{img}" alt="avatar"/>
			</figure>
		</div>
		<div class="messages" id={id+"-messages"}>
			<!--div class="container">
			  <img src="/w3images/bandmember.jpg" alt="Avatar">
			  <p>Hello. How are you today?</p>
			  <span class="time-right">11:00</span>
			</!--div>
			<div class="container darker">
			  <img src="/w3images/avatar_g2.jpg" alt="Avatar" class="right">
			  <p>Hey! I'm fine. Thanks for asking!</p>
			  <span class="time-left">11:01</span>
			</div-->
		</div>
		<div class="message-box">
			<!--input type="textarea" class="message-input" placeholder="Type message..." bind:value="{sentmessage}"/-->
			<textarea autofocus class="message-input" placeholder="Type message..." bind:value="{sentmessage}"></textarea>
			<button type="submit" class="message-submit" on:click={sendMessage}>Send</button>
		</div>
	</div>

<style>

.chat {
  max-width: 800px;
  margin: 0 auto;
  padding: 5px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background: #fff;
}
/* make chat-title div non scrollable */
.chat-title {
  display: flex;
  position: sticky;
  align-items: center;
  margin-bottom: 10px;
  margin-left: 10px;
  margin-right: 10px;
}

.chat-title h1 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.chat-title h2 {
  margin: 0;
  font-size: 14px;
  font-weight: 400;
  color: #999;
}

.avatar {
  margin-left: auto;
}

.avatar img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}


.messages {
  max-height: 150px;
  overflow-y: auto;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background: #f9f9f9;
}

/* Chat containers */
 /* Chat containers */
.container {
  border: 2px solid #dedede;
  background-color: #f1f1f1;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
}

/* Darker chat container */
.darker {
  border-color: #ccc;
  background-color: #ddd;
}

/* Clear floats */
.container::after {
  content: "";
  clear: both;
  display: table;
}

/* Style images */
.container img {
  float: left;
  max-width: 60px;
  width: 100%;
  margin-right: 20px;
  border-radius: 50%;
}

/* Style the right image */
.container img.right {
  float: right;
  margin-left: 20px;
  margin-right:0;
}

/* Style time text */
.time-right {
  float: right;
  color: #aaa;
}

/* Style time text */
.time-left {
  float: left;
  color: #999;
} 

.message-box {
  display: flex;
}
.message-input{
	height: 50px;
	width: 300px;
	resize: none;
	border: 1px solid #ccc;
}
.message-submit{
	margin-left: 5px;
	color: #333;
	font-weight: bold;
}
</style>
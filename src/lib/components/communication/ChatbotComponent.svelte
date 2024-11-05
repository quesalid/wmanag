<script lang="ts">
    import { onMount,afterUpdate  } from 'svelte';
    import { ChatbotClass, ChatbotType } from './chatbot';

    export let showHeader = false;
    export let showCheckbox = false;  // Variabile per mostrare/nascondere la checkbox per mostrare/nascondere la storia della chat
    export let showFullHistory = false;  // Variabile per mostrare/nascondere la storia della chat
    export let chatImage = "ChatBot.png"
    export let arrowLeftOn = "arrowLeftOn.png"
    export let arrowLeftOff = "arrowLeftOff.png"
    export let arrowRightOn = "arrowRightOn.png"
    export let arrowRightOff = "arrowRightOff.png"
    export let showImage = true
    export let showMessageInput = false
    // set border color transparent
    export let bordercolor = "rgba(0,0,0,0)"
    export let chatMessageHeight = "110px"
    export let clickLeft = (ev:any) => {
		console.log("clickLeft")
        num--
        if(num<0){  
			num = 0
           ev.target.src = arrowLeftOff

		}else{
            const arrowright = document.getElementsByClassName('arrow-message-right')[0]
            arrowright.src = arrowRightOn
        }
        handleRegisteredMessage(registeredMessages[num])
	}
    export let clickRight = (ev:any) => {
        console.log("clickRight")
        num++
       if(num>=registeredMessages.length ){
			num  = registeredMessages.length -1
			ev.target.src = arrowRightOff
		}else{
            const arrowleft = document.getElementsByClassName('arrow-message-left')[0]
            arrowleft.src = arrowLeftOn
        }
        handleRegisteredMessage(registeredMessages[num])
        }
    export let registeredMessages = [
        "Primo testo che può anche essere particolarmente lungo. OK?",
        "Secondo testo che può anche essere anche più lungo del precedente. OK?",
        "up",
        "down",
    ]



    // Interfaccia per i messaggi
    interface Message {
        sender: "user" | "chatbot";
        text: string;
    }

    // Stato dei messaggi e input dell'utente
    let messages: Message[] = [];
    let input = "";
    let num = 0;
  
   
    onMount(async ()=>{
        // Aggiunge il messaggio dell'utente
		messages = [...messages, { sender: "user", text: "Ciao" }];
		// Invia il messaggio al chatbot e riceve la risposta
		const response:any = await chatbot.sendMessage("Ciao");
		// Aggiunge la risposta del chatbot ai messaggi
		messages = [...messages, { sender: "chatbot", text: response }];
        // sleep 200 ms
        await new Promise(r => setTimeout(r, 200));
        // se showfullhistory false setta l'altezza dei messaggi chatbot
        if(!showFullHistory){
			const chatbotMessage = document.getElementsByClassName('chatbot-message');
            const arr = Array.from(chatbotMessage);
            arr.forEach( (node:any) => {
                node.style.minHeight = chatMessageHeight
            })
			const chatbotMessages = document.getElementsByClassName('chatbot-messages')[0];
			chatbotMessages.style.overflowY = 'hidden'
		}
	
    })

    // Inizializzo un'istanza di ChatbotClass
    const chatbot = new ChatbotClass(ChatbotType.GENERATIVE);

    // Funzione per inviare il messaggio registrato
    async function handleRegisteredMessage(num:any) {
        // Aggiunge il messaggio dell'utente
        messages = [...messages, { sender: "user", text: num }];
        // Invia il messaggio al chatbot e riceve la risposta
        const response = await chatbot.sendMessage(num);
        // Aggiunge la risposta del chatbot ai messaggi
        messages = [...messages, { sender: "chatbot", text: response }];
    }

    // Funzione per inviare il messaggio dell'utente
    async function handleSendMessage() {
        if (!input.trim()) return;
        // Aggiunge il messaggio dell'utente
        messages = [...messages, { sender: "user", text: input }];
        // Invia il messaggio al chatbot e riceve la risposta
        const response = await chatbot.sendMessage(input);
        // Aggiunge la risposta del chatbot ai messaggi
        messages = [...messages, { sender: "chatbot", text: response }];
        // Resetta l'input dell'utente
        input = "";
    }

    // Computed property per mostrare i messaggi in base allo stato di showFullHistory
    $: displayedMessages = showFullHistory ? messages : messages.length >0?[messages[messages.length - 1]]:[]

    // Usa afterUpdate per fare scroll automatico all'ultimo messaggio
    afterUpdate(() => {
        const lastMessageElement = document.getElementById("message" + (messages.length - 1));
        if (lastMessageElement) {
            lastMessageElement.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    });
</script>

<!-- Interfaccia del chatbot -->
<div class="chatbot-container" style="--border-color:{bordercolor};">
    {#if showHeader}
        <div class="chatbot-header">
            <h2>Chatbot</h2>
        </div>
    {/if}
    {#if showCheckbox}
		<div class="chatbot-toggle">
			<label>
				<input type="checkbox" bind:checked={showFullHistory} />
				Mostra tutta la storia
			</label>
		</div>
	{/if}
    <div class="chatbot-messages">
        {#each displayedMessages as message, index}
            
            <div class="message {message.sender === 'user' ? 'user-message' : 'chatbot-message'}" id={"message"+index}>
                {#if !showFullHistory}	
				    <!-- svelte-ignore a11y-click-events-have-key-events -->
				    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                    <div class="arrow-div">
				    <img class="arrow-message arrow-message-left" src={arrowLeftOn} width='15' alt="arrowLeftOn" on:click={clickLeft}/>
                    </div>
                {/if}
                <span style="width:80%">{message.text}</span>
                {#if !showFullHistory}	
				     <!-- svelte-ignore a11y-click-events-have-key-events -->
				     <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				     <div class="arrow-div">
                         <img class="arrow-message arrow-message-right" src={arrowRightOn} width='15' alt="arrowRightOn" on:click={clickRight}/>
                     </div>
                {/if}
            </div>
        {/each}
    </div>
    {#if showImage}
        <div class="chatbot-image">
            <img src={chatImage} width='160' alt="Chatbot"/>
        </div>
    {/if}
    {#if showMessageInput}
		<div class="chatbot-input">
			<input
				type="text"
				bind:value={input}
				placeholder="Scrivi un messaggio..."
				on:keypress={(e) => e.key === 'Enter' && handleSendMessage()}
			/>
			<button on:click={handleSendMessage}>Invia</button>
		</div>
	{/if}
</div>

<style>
    /* Stili del componente */
    .chatbot-container {
        width: 100%;
        height: 100%;
        border: 1px solid var(--border-color);
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        font-family: Arial, sans-serif;
    }

    .chatbot-header {
        background-color: #007bff;
        color: white;
        padding: 10px;
        text-align: center;
        font-weight: bold;
    }

    .chatbot-toggle {
        padding: 5px 10px;
        background-color: #f1f1f1;
        text-align: left;
    }

    .chatbot-messages {
        flex: 1;
        padding: 10px;
        overflow-y: auto;
        /*background-color: #f9f9f9;*/
        background-color: rgba(0,0,0,0);
        max-height: 120px;
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 100%;
      
    }

    .message {
        display:flex;
        justify-content: space-between;
        margin: 5px 0;
        padding: 10px;
        border-radius: 5px;
        max-width: 100%;
    }

    .user-message {
        /*align-self: flex-end;*/
        background-color: #dcf8c6;
        text-align: center ;
    }

    .chatbot-message {
        /*align-self: flex-start;
        margin-left: 50px;*/
        background-color: #033c69;
        border: 1px solid #e0e0e0;
        color: #ffffff;
        text-align: center ; 
    }

    .chatbot-input {
        display: flex;
        border-top: 1px solid #ddd;
        padding: 10px;
    }

    .chatbot-input input {
        flex: 1;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 5px;
        margin-right: 5px;
    }

    .chatbot-input button {
        padding: 8px 12px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    .chatbot-input button:hover {
        background-color: #0056b3;
    }

    .chatbot-image{
      display: block;
      margin-left: auto;
      margin-right: auto;
      width: 50%;
    }
    .arrow-message{
        cursor: pointer ;
    }

    .arrow-div{
        display:flex;
		width:10%;
        margin-left:auto;
        flex-direction: column;/* top to bottom */
        justify-content: flex-end;
	}
</style>

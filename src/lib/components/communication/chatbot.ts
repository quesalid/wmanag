import { HfInference } from "@huggingface/inference";
const KEY = "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"; 

// Definisco un'interfaccia per il comportamento base del chatbot
interface IChatbot {
    sendMessage(message: string): Promise<string>;
}

// Implementazione per il chatbot semplice
class SimpleChatbot implements IChatbot {
    private responses: string[];
   

    constructor(predefinedResponses: [string]) {
        this.responses = predefinedResponses;
    }

    async sendMessage(message: string): Promise<string> {
        return message;
    }
}

// Implementazione per il chatbot complesso basato su un modello generativo
class GenerativeChatbot implements IChatbot {
    private hf: HfInference;
    private messageHistory: any[] = [];
    constructor() {
        this.hf = new HfInference(KEY);
    }

    async sendMessage(message: string): Promise<string> {
        // Simulazione di un'API di un modello generativo
        const msgin = { role: "user", content: message };
        this.messageHistory.push(msgin);
        let out = "";
        for await (const chunk of this.hf.chatCompletionStream({
            model: "mistralai/Mistral-7B-Instruct-v0.2",
            messages: this.messageHistory,
            max_tokens: 500,
            temperature: 0.1,
            seed: 0,
        })) {
            if (chunk.choices && chunk.choices.length > 0) {
                out += chunk.choices[0].delta.content;
            }
        }
        const msgout = { role: "assistant", content: out };
        this.messageHistory.push(msgout);
        return `${out}`;
    }
}

// Implementazione per il chatbot complesso basato su reinforcement learning
class ReinforcementLearningChatbot implements IChatbot {
    async sendMessage(message: string): Promise<string> {
        // Simulazione di una risposta basata su reinforcement learning
        return `Risposta RL per: ${message}`;
    }

    // Metodo per apprendere dall'interazione con l'utente
    learnFromInteraction(userMessage: string, botResponse: string): void {
        console.log(`Apprendimento: Messaggio utente - ${userMessage}, Risposta bot - ${botResponse}`);
    }
}

// Implementazione del caso in cui risponde una persona reale
class HumanResponder implements IChatbot {
    // Simula l'attesa di una risposta da un operatore umano
    async sendMessage(message: string): Promise<string> {
        // Qui potremmo simulare l’invio di un messaggio a un operatore reale
        console.log("Attendi mentre un operatore umano prepara la risposta...");

        // In un'app reale, qui si aspetterebbe la risposta da un sistema esterno
        // come una chat di supporto gestita da operatori.
        return new Promise((resolve) => {
            setTimeout(() => resolve("Risposta dall'operatore umano"), 3000);
        });
    }
}

// Enum per i tipi di chatbot
export enum ChatbotType {
    SIMPLE = "simple",
    GENERATIVE = "generative",
    REINFORCEMENT_LEARNING = "reinforcementLearning",
    HUMAN = "human"  // Nuovo tipo per operatore umano
}

// Classe principale per gestire le comunicazioni con il chatbot
export class ChatbotClass {
    private chatbot: IChatbot;

    constructor(type: ChatbotType, predefinedResponses?: string[]) {
        // Seleziona il tipo di chatbot in base al tipo passato come argomento
        switch (type) {
            case ChatbotType.SIMPLE:
                this.chatbot = new SimpleChatbot(predefinedResponses || []);
                break;
            case ChatbotType.GENERATIVE:
                this.chatbot = new GenerativeChatbot();
                break;
            case ChatbotType.REINFORCEMENT_LEARNING:
                this.chatbot = new ReinforcementLearningChatbot();
                break;
            case ChatbotType.HUMAN:
                this.chatbot = new HumanResponder();
                break;
            default:
                throw new Error("Tipo di chatbot non supportato.");
        }
    }

    // Metodo per inviare messaggi e ottenere una risposta
    async sendMessage(message: string): Promise<string> {
        const response = await this.chatbot.sendMessage(message);

        // Se il chatbot è di tipo reinforcement learning, apprende dall'interazione
        if (this.chatbot instanceof ReinforcementLearningChatbot) {
            this.chatbot.learnFromInteraction(message, response);
        }

        return response;
    }
}

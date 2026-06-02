// =========================
// ELEMENTS
// =========================
const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

// =========================
// DIFY CONFIG
// =========================
const API_KEY = "app-ULLfb9PjSHdlm2yV5Q33H13p";
const API_URL = "https://api.dify.ai/v1/chat-messages";

let conversationId = "";

// =========================
// FIREBASE AUTH
// =========================
import { auth } from "./firebase.js";
import { signOut, getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseAuth = getAuth();
const logoutBtn = document.getElementById("logoutBtn");

// =========================
// LOGOUT FUNCTION
// =========================
if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
        try {
            await signOut(firebaseAuth);
            alert("Logged out successfully");
            window.location.href = "register.html";
        } catch (error) {
            console.error("Logout error:", error);
        }
    });
}

// =========================
// SUGGESTIONS
// =========================
const suggestions = [
    "What does BC stand for?",
    "Courses offered at BC",
    "Software Development career path",
    "Cybersecurity explanation"
];

// =========================
// INIT SUGGESTIONS
// =========================
function createSuggestions() {
    const container = document.createElement("div");
    container.classList.add("suggestion-container");

    suggestions.forEach(text => {
        const btn = document.createElement("button");
        btn.classList.add("suggestion-btn");
        btn.innerText = text;

        btn.addEventListener("click", async () => {
            btn.classList.add("clicked");

            setTimeout(async () => {
                container.remove();
                await sendMessage(text);
            }, 200);
        });

        container.appendChild(btn);
    });

    chatBox.appendChild(container);
}

createSuggestions();

// =========================
// MAIN SEND FUNCTION (DIFY)
// =========================
async function sendMessage(customText = null) {
    const message = customText || userInput.value.trim();
    if (!message) return;

    addUserMessage(message);
    userInput.value = "";
    showTypingIndicator();

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                inputs: {},
                query: message,
                response_mode: "blocking",
                conversation_id: conversationId,
                user: "user-001"
            })
        });

        const data = await response.json();

        conversationId = data.conversation_id || conversationId;

        removeTypingIndicator();

        const botReply = data.answer || "No response received.";
        typeBotMessage(botReply);

    } catch (err) {
        removeTypingIndicator();
        typeBotMessage("Error connecting to AI service.");
        console.error(err);
    }
}

// =========================
// USER MESSAGE
// =========================
function addUserMessage(text) {
    const row = document.createElement("div");
    row.classList.add("message-row", "user-row");

    row.innerHTML = `
        <div class="user-message whatsapp-user">
            ${escapeHtml(text)}
        </div>
    `;

    chatBox.appendChild(row);
    scrollToBottom();
}

// =========================
// BOT TYPING ANIMATION
// =========================
function typeBotMessage(text) {
    const row = document.createElement("div");
    row.classList.add("message-row");

    const bubble = document.createElement("div");
    bubble.classList.add("bot-message", "whatsapp-bot");

    row.appendChild(bubble);
    chatBox.appendChild(row);

    let i = 0;

    const typing = setInterval(() => {
        bubble.innerHTML += text.charAt(i);
        i++;
        scrollToBottom();

        if (i >= text.length) clearInterval(typing);
    }, 15);
}

// =========================
// TYPING INDICATOR
// =========================
function showTypingIndicator() {
    const div = document.createElement("div");
    div.id = "typingIndicator";
    div.classList.add("message-row");

    div.innerHTML = `
        <div class="typing-bubble">
            <span></span><span></span><span></span>
        </div>
    `;

    chatBox.appendChild(div);
    scrollToBottom();
}

function removeTypingIndicator() {
    const el = document.getElementById("typingIndicator");
    if (el) el.remove();
}

// =========================
// SEND EVENTS
// =========================
sendBtn.addEventListener("click", () => sendMessage());

userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});

// =========================
// SCROLL
// =========================
function scrollToBottom() {
    chatBox.scrollTop = chatBox.scrollHeight;
}

// =========================
// SECURITY HELPERS
// =========================
function escapeHtml(str) {
    return str
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}
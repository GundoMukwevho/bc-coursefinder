// server.js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Proxy endpoint for your frontend
app.post("/chat", async (req, res) => {
  const { message, conversationId, userId } = req.body;

  try {
    const response = await fetch("https://api.dify.ai/v1/chat-messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_API_KEY" // <-- Insert your Dify API key here
      },
      body: JSON.stringify({
        query: message,
        user: userId || "user-001",           // Unique user ID
        conversation_id: conversationId || "",// Optional: previous conversation
        response_mode: "blocking"
      })
    });

    const data = await response.json();
    const botMessage = data?.answer || "No response";

    // Return bot message and conversation ID for persistence
    res.json({
      botMessage,
      conversationId: data?.conversation_id || conversationId
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
import { useState } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages([...messages, { role: "user", text: input }]);
    setInput("");

    // Fake AI reply for now
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Hi! I am your AI chatbot 🤖" },
      ]);
    }, 500);
  };

  return (
    <div className="app">
      <div className="chat-container">
        <div className="chat-header">Valis Ai Chatbot</div>

        <div className="chat-body">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`message ${
                msg.role === "user" ? "user" : "ai"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="chat-input">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;

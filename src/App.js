import { useState } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages([...messages, { role: "user", text: input }]);
    setInput("");

    const response = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        message:input
      })
    })
    const data = await response.json();
    console.log(data);//checking reply from server
    const reply = data.reply;
   
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: reply },
      ]);
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

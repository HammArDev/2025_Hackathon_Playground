
// use State hook, array of two (current state, modifing method)
import { useState } from "react";
import "./ChatBot.css"; 

function ChatBot() {

  // state, set messages updates while messages holds it  
  const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([]);
  const [input, setInput] = useState("");

  //prevents the page from refreshing when an input is inputted
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //doesn't allow empty messages
    if (!input.trim()) return;

    //sets the setMessage method in the use state, basically adds the new messages to the array of sent messages
    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    
    const response = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await response.json();

    setMessages((prev) => [...prev, { sender: "user", text: input }, { sender: "bot", text: data.reply }]);
    setInput(""); 
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatBot;

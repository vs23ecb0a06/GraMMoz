import React, { useEffect, useState, useRef } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName") || "User";
  const messagesEndRef = useRef(null);
  const isDark = theme === "dark";

  // Fetch messages
  useEffect(() => {
    fetch("http://localhost:4000/api/chat")
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, []);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Send message
  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const res = await fetch("http://localhost:4000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, userName, text }),
    });
    if (res.ok) {
      setText("");
      // Refresh messages
      fetch("http://localhost:4000/api/chat")
        .then((res) => res.json())
        .then((data) => setMessages(data));
    }
  };

  return (
    <div className={isDark ? "min-h-screen flex bg-gradient-to-br from-[#181C23] via-[#23272f] to-[#1a2332]" : "min-h-screen flex bg-gradient-to-br from-white via-blue-50 to-blue-200"}>
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <Header />
        <main className="flex flex-col items-center justify-center p-8">
          <div className={isDark ? "w-full max-w-2xl bg-[#23272f]/80 rounded-3xl shadow-2xl p-8 flex flex-col h-[70vh]" : "w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 flex flex-col h-[70vh]"}>
            <h2 className={isDark ? "text-2xl font-bold text-blue-200 mb-4" : "text-2xl font-bold text-blue-900 mb-4"}>GraMoz Chat Arena</h2>
            <div className={isDark ? "flex-1 overflow-y-auto mb-4 rounded-xl bg-[#181C23] p-4" : "flex-1 overflow-y-auto mb-4 rounded-xl bg-blue-50 p-4"}>
              {messages.map((msg, idx) => (
                <div key={msg._id || idx} className="mb-3 flex flex-col">
                  <span className={isDark ? "text-blue-400 font-semibold text-sm" : "text-blue-700 font-semibold text-sm"}>{msg.userName || "User"}</span>
                  <span className={isDark ? "text-white text-base" : "text-blue-900 text-base"}>{msg.text}</span>
                  <span className={isDark ? "text-xs text-blue-700 mt-1" : "text-xs text-blue-400 mt-1"}>{new Date(msg.createdAt).toLocaleTimeString()}</span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <form className="flex gap-2" onSubmit={handleSend}>
              <input
                type="text"
                className={isDark ? "flex-1 px-4 py-3 rounded-lg bg-[#181C23] text-white border border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400" : "flex-1 px-4 py-3 rounded-lg bg-blue-50 text-blue-900 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"}
                placeholder="Type your message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button type="submit" className={isDark ? "px-6 py-3 rounded-lg bg-blue-700 text-white font-semibold shadow hover:bg-blue-900 transition" : "px-6 py-3 rounded-lg bg-blue-700 text-white font-semibold shadow hover:bg-blue-900 transition"}>
                Send
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChatPage;

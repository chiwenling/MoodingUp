"use client";
import React, { useState } from "react";

const ChatComponent = () => {
  const [messages, setMessages] = useState([
    { type: "received", content: "Hi 你今天好嗎 有什麼問題都可以與我聊聊喔！" },
    { type: "sent", content: "..." },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    setMessages([...messages, { type: "sent", content: inputValue }]);
    setInputValue("");
    setLoading(true);

    try {
        const response = await fetch("http://127.0.0.1:8000/chat/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: inputValue }),
          });
          
          

      const data = await response.json();
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "received", content: data.response },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "received", content: "不好意思，忙線中，請稍後再試。" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tracking-wide max-w-5xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-2xl p-4">
        <div className="flex items-center mb-4">
          <div className="ml-3">
            <p className="text-xl font-medium">AI 輔導員</p>
          </div>
        </div>

        <div className="space-y-4">
          {messages.map((message, index) =>
            message.type === "received" ? (
              <div key={index} className="flex items-start">
                <div className="ml-3 bg-gray-100 p-3 rounded-lg">
                  <p className="text-base text-gray-800">{message.content}</p>
                </div>
              </div>
            ) : (
              <div key={index} className="flex items-end justify-end">
                <div className="bg-sisal-400 p-3 rounded-lg">
                  <p className="text-sm text-white">{message.content}</p>
                </div>
              </div>
            )
          )}
        </div>

        <div className="mt-4 flex items-center">
          <input
            type="text"
            placeholder="請放心打下你想詢問的問題喔～"
            className="flex-1 py-2 px-3 rounded-full bg-gray-100 focus:outline-none"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !loading && handleSend()}
            disabled={loading}
          />
          <button
            className="bg-sisal-400 text-white px-4 py-2 rounded-full ml-3 hover:bg-sisal-600"
            onClick={handleSend}
            disabled={loading}
          >
            {loading ? "處理中..." : "送出"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;

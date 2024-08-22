"use client";
import React, { useState, useEffect } from "react";

export default function ChatComponent() {
 
  const [messages, setMessages] = useState([
    { type: "received", content: "Hi 你今天好嗎 有什麼問題都可以與我聊聊喔！" },
    { type: "sent", content: "..." },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  
  // 取得目前的時間
  const [currentTime, selectCurrentTime] =useState("");
  useEffect(()=>{
    const now = new Date().toLocaleString();
    selectCurrentTime(now);
  },[]);

  // useEffect空陣列只會讀取一次 
    const handleSend = async () => {
    if (!inputValue.trim()) return;

    setMessages([...messages,
       { type: "sent", content: inputValue },
       { type: "received", content: "..." }
      ]);
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
      setMessages(function(prevMessages){
        return[
        ...prevMessages,
        { type: "received", content: data.response }
        ]});
      
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
    <div> 
      <div className="flex item-center justify-between overflow-visible">
                <div className="w-1/4 bg-white border border-sisal-500">
                      <div className="p-4 border-b border-gray-300 flex justify-between items-center bg-sisal-600 text-white">
                          <div className="text-lg font-normal">過往諮詢紀錄</div>
                          <div className="relative">
                              <button id="menuButton" className="focus:outline-none">
                                  <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"/>
                                  </svg>
                              </button>
                          </div>
                      </div>
                    
                      <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
                          <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                              <div className="flex-1">
                                  <div className="text-lg font-semibold">2024-04-01</div>
                                  <div className="text-gray-600">聊天歷史紀錄</div>
                              </div>
                          </div>
                          <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                              <div className="flex-1">
                                  <div className="text-lg font-semibold">2024-04-01</div>
                                  <div className="text-gray-600">聊天歷史紀錄</div>
                              </div>
                          </div>     
                      </div>  
                  </div>

              <div className="tracking-wide w-full p-4">
                <div className="bg-white rounded-lg shadow-2xl p-4">
                  <div className="flex items-center mb-4">
                    <div className="ml-3">
                      <p>{currentTime}</p>
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
        </div>
    </div>
  );
};








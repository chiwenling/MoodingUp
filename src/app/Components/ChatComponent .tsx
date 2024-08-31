"use client";
import React, { useState, useEffect } from "react";
import {collection, addDoc} from "firebase/firestore"
import {db} from "./../../../firebase"
import { useSelector} from "react-redux";
import { selectCurrentUser } from "../../../lib/features/auth/authSlice";
import Link from "next/link";



export default function ChatComponent() {
  const [messages, setMessages] = useState([
    { type: "received", content: "Hi 你今天好嗎 有什麼問題都可以與我聊聊喔！" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentTime, selectCurrentTime] =useState("");
  const user = useSelector(selectCurrentUser);
  const [chatEnd, setChatEnd] = useState(false);
  
  // 停止對話
  async function stopTalk(){
    await handleSend("我想結束對話");
    await handleSend("請用「本次談話建議：」開頭，講10個字簡述這次談話的問題，和溫柔的解決方法",true)
    setChatEnd(true);
  }

  // 儲存對話
  async function saveHistory(){
    try{
      if(user&& user.email){
        await addDoc(collection(db,"chatHistory"),{
          time:currentTime,
          email: user.email,
          message: messages,
          id:user.uid
        });        
      }else{
        console.log("儲存失敗"); 
      }
    }catch(error){
      console.log("有錯",error)
    }
  }

  useEffect(()=>{
    if(inputValue === "我想結束對話"){
      alert("本次對話已儲存")
    }
  },[inputValue]);

  // 取得目前的時間，useEffect空陣列只會讀取一次 
  useEffect(()=>{
    const now = new Date().toLocaleString();
    selectCurrentTime(now);
  },[]);

  const handleSend = async (prompt:string, isHidden = false) => {
  if (prompt.trim() ===""){
    return
  };
  
  if(!isHidden){
    setMessages(prevMessages => [...prevMessages, { type: "sent", content: prompt }]);;
    setInputValue("");
    setLoading(true);
  };

  try {
      const response = await fetch("https://papapa.work/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({prompt}),
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
    }};

  
  return ( 
    <div>
      <Link href="/">
        <div className="flex justify-end">
          <button className="m-5 tracking-wider text-lg bg-sisal-900 text-white px-4 py-2 rounded-full ml-3 hover:bg-sisal-600"
          >回到首頁 ➤</button>
        </div>
      </Link>
      <div className="lg:w-[1000px] md:w-[800px] sm:w-[500px] tracking-wide p-4">
        <div className="bg-white rounded-lg shadow-2xl p-4">
            <div className="m-3">
              <div className="flex mb-5 text-sisal-900">開啟對話時間：{currentTime}</div>
              <div className="text-xl font-medium">AI 輔導員</div>
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
              className="flex-1 py-2 px-3 rounded-full bg-gray-100 focus:outline-none text-base"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !loading && !chatEnd && handleSend(inputValue)}
              disabled={loading}
            />
            <button
              className="px-4 py-2 ml-3 text-white rounded-full bg-sisal-400 hover:bg-sisal-600 disabled:bg-gray-400 disabled:hover:bg-gray-400"
              onClick={()=>handleSend(inputValue)}
              disabled={loading||chatEnd}
            >
              {loading ? "處理中..." : "送出"}
            </button>
            <button className={chatEnd? "bg-red-700 text-white px-4 py-2 rounded-full ml-3 hover:bg-red-500":"bg-sisal-700 text-white px-4 py-2 rounded-full ml-3 hover:bg-sisal-500"}
              onClick={chatEnd? saveHistory:stopTalk}
            >{chatEnd? "儲存對話":"結束對話"}</button>
          </div>
        </div>
      </div>
    </div>
  );
};








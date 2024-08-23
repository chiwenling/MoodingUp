import ChatComponent from "../Components/ChatComponent ";
import ChatHistory from "../Components/ChatHistory";

export default function AIchat() {
    return (
      <div className="min-h-screen flex justify-start">
       <ChatHistory />
       <ChatComponent />       
      </div>
    );
  }
  
  
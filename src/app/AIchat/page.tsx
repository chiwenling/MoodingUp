import ChatComponent from "../Components/ChatComponent ";
import ChatHistory from "../Components/ChatHistory";


export default function AIchat() {
    return (
      <div>
        <div className="min-h-screen lg:flex justify-end">
          <ChatComponent /> 
          <ChatHistory />
        </div>
     </div>
    );
  }
  
  
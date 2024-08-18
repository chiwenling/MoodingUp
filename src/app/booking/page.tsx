import Link from "next/link"

export default function booking() {
    return (
      <div className="min-h-screen">
       <div className="m-5 text-center text-xl text-sisal-900"></div>
        <div className="flex justify-center item-center text-lg bg-sisal-600 text-white ">
        <Link href="/AIchat">
          <div className="cursor-pointer text-center m-10 bg-sisal-400 text-white border border-black w-[200px] h-[150px] rounded-lg p-10">
            AI聊聊 
            <div>諮詢室</div>
          </div>
        </Link>
        <Link href="/Startbook">
          <div className="cursor-pointer text-center m-10 bg-sisal-400 text-white  border border-black w-[200px] h-[150px] rounded-lg p-10">
            真人聊聊
            <div>預約時間</div>
          </div>
        </Link>
        </div>
        
        <div className="bg-sisal-200 min-h-screen"></div>
      </div>
    );
  }
  
  
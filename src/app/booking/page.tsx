import Link from "next/link"
import Image from 'next/image';

export default function booking() {
    return (
      <div className="h-full">
        <div className="flex justify-center item-center text-lg bg-sisal-200 text-white ">
          <Link href="/AIchat">
            <div className="mt-40 mb-40 rounded overflow-hidden shadow-lg border-sisal-100 bg-sisal-700">
                <Image src="/heart.png"  width={200} height={200} className="w-full ml-5 rounded-lg" alt="pic" />
                <div className="px-6 py-4 flex justify-center">
                  <div className="font-bold text-xl mb-2">AI 聊聊諮詢室</div>
                </div>
                <div className="px-4 pt-2 pb-10 flex justify-center">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-base font-semibold text-gray-700 mr-2 mb-2">開始聊天</span>
                </div>
            </div>
          </Link>

          <Link href="/Startbook">
              <div className="mt-40 mb-40max-w-sm rounded overflow-hidden shadow-lg m-5 border-sisal-100 bg-sisal-700">
                    <Image src="/heart.png"  width={200} height={200} className="w-full ml-5 rounded-lg" alt="pic" />
                    <div className="px-6 py-4 flex justify-center">
                      <div className="font-bold text-xl mb-2">預約真人輔導</div>
                    </div>
                    <div className="px-4 pt-2 pb-10 flex justify-center">
                      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-base font-semibold text-gray-700 mr-2 mb-2">開始預約</span>
                    </div>
              </div>
          </Link>
        </div>
      </div>
    );
  }
  
  
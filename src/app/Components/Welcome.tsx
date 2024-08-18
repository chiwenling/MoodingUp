import React from "react";
import Image from 'next/image';
import Link from "next/link";

// text-base。
// sm:：text-lg。
// md:：text-xl。
// lg:：text-2xl。
// xl:：text-3xl。



export default function Welcome() {
    return (
      <div>
        <div className="mx-auto max-w-7xl py-10 px-8">
          <div className="relative isolate overflow-hidden bg-sisal-600 shadow-2xl rounded-3xl flex px-24 justify-between">
            <div className="tracking-wider mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
              <h2 className="text-white text-4xl font-bold">
                也許你可以找人聊聊
              </h2>
              <p className="mt-3 text-lg text-white">
                職涯、關係、心情，疑難雜症慢慢聊！
              </p>
              <div className="mt-10 mx-10 flex items-center justify-start gap-x-6 ">
                <Link href="/test">
                <div className="cursor-pointer rounded-md bg-white px-3 py-2 text-m font-normal text-gray-900 shadow-lg hover:bg-sisal-900 hover:text-sisal-200">
                  立即小測
                </div>
                </Link>
                <Link href="/booking">
                <div className="cursor-pointer rounded-md bg-white px-3 py-2 text-m font-normal text-gray-900 shadow-lg hover:bg-sisal-900 hover:text-sisal-200">
                  立即預約
                </div>
                </Link>
              </div>
            </div>
            <div className="mt-20">
                <Image alt="歡迎頁面的小插圖" src="/chat-bubble.png" width={300} height={300}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
  
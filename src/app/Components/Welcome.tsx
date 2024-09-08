'use client'; 
import React from "react";
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../lib/features/auth/authSlice';
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function Welcome() {
  const user = useSelector(selectCurrentUser);
  const router = useRouter();
  const handleClick = (e: any, href: string) => {
    
    if (!user && ((href === "/booking")||(href === "/test"))) {
      e.preventDefault();
      router.push("/login");
    }
  }

  return (
    <div className="min-h-screen bg-sisal-100 py-8">
      <div className="mx-auto max-w-6xl py-10 px-8">
        <div className="relative isolate overflow-hidden bg-sisal-600 shadow-2xl rounded-3xl flex lg:px-24 px-10 py-16 justify-between items-center">
          <div className="tracking-wider max-w-md text-center lg:text-left lg:flex-auto">
            <h2 className="text-white ml-6 text-[30px] text-start lg:ml-7 lg:text-4xl font-extrabold">
              也許你可以找人聊聊
            </h2>
            <div className="pt-6 text-base text-start lg:mt-4 ml-7 text-lg text-sisal-100 leading-relaxed">
              職涯、關係、心情，疑難雜症慢慢聊！
            </div>
            <div className="ml-6 mt-5 flex items-center justify-center lg:justify-start gap-x-6">
              <Link href="/test" onClick={(e) => handleClick(e,"/test")}>
                <div className="cursor-pointer rounded-md bg-white px-3 py-2 text-m font-normal text-gray-900 shadow-lg hover:bg-sisal-900 hover:text-sisal-200">
                  心情小測
                </div>
                </Link>
                <Link href="/booking" onClick={(e) => handleClick(e,"/booking")}>
                <div className="cursor-pointer rounded-md bg-white px-3 py-2 text-m font-normal text-gray-900 shadow-lg hover:bg-sisal-900 hover:text-sisal-200">
                  立即預約
                </div>
                </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <Image alt="歡迎頁面的小插圖" src="/chat-bubble.png" width={350} height={350} />
          </div>
        </div>
      </div>
    </div>
  );
}

  
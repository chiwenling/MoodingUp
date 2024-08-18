// 登入頁
"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../../firebase";
import GoogleAuth from "../Components/GoogleAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");

    try {
      const credential = await signInWithEmailAndPassword(getAuth(app), email, password);
      const idToken = await credential.user.getIdToken();
      
      await fetch("/api/login", {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
      alert("登入成功")
      router.push("/");
    } catch (e) {
      setError((e as Error).message);
    }
  }

return(
  <div>
  <div className="bg-no-repeat bg-cover bg-center relative">
    <div className="absolute bg-gradient-to-t from-gray-500 to-yellow-400 opacity-80 inset-0 z-0"></div>
    <div className="flex mx-auto p-10 justify-center"> 
      {/* 會員登入頁左圖 */}
      <div className="flex-col flex self-center p-14 z-10">
        <div className="self-start hidden lg:flex flex-col text-white">
          <Image src="/sofa.jpg" alt="會員登入頁面" width={500} height={1000} className="mb-3 mr-20 rounded-2xl"/>
          <p className="italic pr-3">「 There‘s a lid for every pot. 」— Joy </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-12 z-10" action="#">
        <div className="flex justify-center self-center">
          <div className="relative h-[520px] w-[400px] p-10 bg-white mx-3 rounded-2xl">
            <div className="mb-3">
              <h3 className="font-semibold text-2xl text-gray-600">會員登入</h3>
            </div>
            <GoogleAuth />
            <div className="relative space-y-4">
              <div className="space-y-2 ">
                <label htmlFor="email" className="text-base font-medium text-gray-700 tracking-wide">
                  帳號
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  className="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-sisal-300"
                  placeholder="請輸入您的信箱"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="mb-5  text-base font-medium text-gray-700 tracking-wide">
                  密碼
                </label>
                <input 
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  id="password"
                  className="w-full content-center text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-sisal-300"
                  placeholder="請輸入您的密碼"
                  required
                />
              </div>

              {/* 輸入錯誤 */}
              {error && (
              <div className=" bg-red-100 border border-red-400 text-red-700 rounded relative break-words p-1" role="alert">
                <span className="block inline">{(error)}</span>
              </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"/>
                  <label htmlFor="remember_me"className="ml-2 block  text-base text-gray-800">
                    記住我的帳號
                  </label>
                </div>             
              </div>
              <div className="text-base">
                  <div className=" text-base font-normal text-gray-600 dark:text-gray-400">
                    還沒有帳號？
                    <Link href="/signup" className="font-medium text-sisal-500 hover:text-sisal-800 dark:text-gray-500"> 註冊會員 </Link>
                  </div>
                </div>
              <div>
                <button type="submit" className="w-full flex justify-center bg-sisal-300 hover:bg-sisal-900 text-gray-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-300">
                  登入
                </button>
              </div>           
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
)
}

'use client'; 
import React from "react";
import Image from 'next/image';
import Link from "next/link";
import { signOut} from 'firebase/auth';
import { auth } from '../../../firebase';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, userLoggedOut, selectAuthLoading } from '../../../lib/features/auth/authSlice';

const navigation = [
  { name: '關於', href: '/about', current: false },
  // { name: '心情小測', href: '/test', current: false },
  { name: '預約聊天', href: '/booking', current: false },
  { name: '輔導員介紹', href: '/people', current: false },
];

function classNames(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export default function MyHeader() {
  const user = useSelector(selectCurrentUser);
  const loading = useSelector(selectAuthLoading);
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(userLoggedOut());
    } catch (error) {
      console.error("登出有問題", error);
    }
  };

  const handleClick = (e: any, href: string) => {
    if ((!user && (href === '/booking' || href === '/profile'))) {
      e.preventDefault();
      alert('請先登入');
    }
  };

  // if (loading) {
  //   return null;
  // }

  return (
    <div className="bg-sisal-300 h-20 flex items-center justify-between">
      <Link href="/">
        <div className="flex items-center justify-items-start m-14 flex-none w-14 h-14">
          <Image src="/heart.png" alt="logo" width={60} height={48} className="rounded-full" />
        </div>
      </Link>

      <div className="flex items-center justify-start grow h-20">
        {navigation.map((item) => (
          <Link key={item.name} href={item.href}>
            <div onClick={(e) => handleClick(e, item.href)}
            className={classNames(item.current
                  ? 'bg-sisal-600 text-black'
                  : 'text-sisal-900 hover:bg-sisal-400 hover:text-white',
                'rounded-lg px-4 py-4 text-lg font-normal text-center cursor-pointer',
              )}
            >{item.name}
          </div>
          </Link>
        ))}
      </div> 
      <div className="flex items-center flex-none w-13 h-14 m-14 text-lg">
      
      <Link href="/profile">
        <div onClick={(e) => handleClick(e,"/profile")} className="text-sisal-900 hover:bg-sisal-400 hover:text-white rounded-lg px-4 py-4 text-lg font-normal text-center cursor-pointer">
          會員中心
        </div>
      </Link>

        {user||loading? (
          <button
            onClick={handleSignOut}
            className="text-sisal-900 px-4 py-4 rounded-lg hover:bg-sisal-500 hover:text-white"
          >
            會員登出
          </button>
        ) : (
          <Link href="/login">
            <button className="text-sisal-900 px-4 py-4 rounded-lg hover:bg-sisal-500 hover:text-white">
              會員登入
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

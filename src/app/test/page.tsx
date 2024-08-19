"use client"
import React, { useEffect } from 'react';
import { RootState } from "../../../lib/store"
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Qa from "../Components/Qa"

export default function Home() {
  const router = useRouter();
  const user = useSelector((state: RootState)=> state.auth.user);

  useEffect(()=>{
    if(!user){
      router.push("/login");
    }
  },[user,router]);

  return (
    <div>
      <Qa />
    </div>
    
  );
}
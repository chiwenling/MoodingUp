"use client"

import Admin from "../Components/Admin";
import Record from "../Components/Record";
import React, { useEffect } from 'react';
import { RootState } from "../../../lib/store"
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function Profile() {
  const router = useRouter();
  const user = useSelector((state: RootState)=> state.auth.user);

  useEffect(()=>{
    if(!user){
      router.push("/login");
    }
  },[user,router]);

  return (
    <div>     
      <Admin />
      <Record />
    </div> 
  );
}

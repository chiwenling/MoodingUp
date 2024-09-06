"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser, userLoggedOut, selectAuthLoading } from "../../../lib/features/auth/authSlice";

interface ScoreContextType {
  score: number;
  setScore: (score: number) => void;
}


const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

export const ScoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [score, setScoreState] = useState<number>(0);
  const user = useSelector(selectCurrentUser);
  useEffect(() => {
    let savedScore = localStorage.getItem("score");
    if (savedScore) {
      setScoreState(Number(savedScore)); 
    }if(!user){
      localStorage.removeItem("score");;
    }
  }, []);

  const setScore = (newScore: number) => {
    setScoreState(newScore);
    localStorage.setItem("score", newScore.toString());
  };

  return (
    <ScoreContext.Provider value={{ score, setScore }}>
      {children}
    </ScoreContext.Provider>
  );
};


export const useScore = () => {
  const context = useContext(ScoreContext);
  if (!context) {
    throw new Error("目前錯誤使用");
  }
  return context;
};

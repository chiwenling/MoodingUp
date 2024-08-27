'use client'; 
import Link from "next/link";
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../lib/features/auth/authSlice';
import { doc, setDoc, getDoc} from 'firebase/firestore';
import { db } from '../../../firebase';


export default function MentorInfo(){
    const user = useSelector(selectCurrentUser);
    const [loading, setLoading] = useState(true); 
    const [mentorProfile, setmentorProfile] = useState({
        id:"",
        name: "",
        skill: "",
        education:"",
        introduction: "",
        availableTime: "",
      });

    

    // 專業部分
    const [skills, setSkills] = useState(['']);
    const getSkill = (index: number, value: string) => {
      const newSkills = [...skills];
      newSkills[index] = value; 
      setSkills(newSkills); 
    };

    // 增加專業
    const addSkill = () => {
        setSkills([...skills, '']); 
    };
    
    // 移除專業
    const removeSkill = (index: number) => {
        const newSkills = skills.filter((_, i) => i !== index); 
        setSkills(newSkills); 
    };

    // 新的資料
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setmentorProfile({...mentorProfile,[e.target.name]: e.target.value,});
      };      

    //  儲存更新資料
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (user) {
          try {
            await setDoc(doc(db, "mentors", user.uid), {
              ...mentorProfile,
              id:user.uid,
              email: user.email,
              skill:skills,
            });
            alert("已更新資料");
          } catch (error) {
            console.error('Error saving data to Firestore:', error);
            alert("請重新儲存");
          }
        }
      };

    // 讀取輔導員資料
    useEffect(() => {
    const fetchmentorProfile = async () => {
        if (user) {
        try {
            const docRef = doc(db, "mentors", user.uid);
            const docSnap = await getDoc(docRef);

            if(docSnap.exists()) {
            console.log("目前讀到的全部資訊:",docSnap.data());
            console.log("目前讀到的資訊:",docSnap.data().skill);
            setmentorProfile(docSnap.data() as {
                id:string,
                name: string,
                skill: string,
                education:string,
                introduction: string,
                availableTime: string,
            });
            setLoading(false);
            setSkills(docSnap.data().skill);
            // 初始化狀態會讓頁面讀取到目前已存的資訊
            } else {
            console.log("還沒有編輯基本資料");
            }
        } catch (error) {
            console.error("fetch有問題:", error);
            setLoading(false);
        }
        }
    };fetchmentorProfile();
      }, [user]);
    
    if(loading){
        return null;
    }

    return(
        <div className="transition-colors duration-300">
          <div className="container mx-auto p-4 bg-white shadow rounded-lg p-6">
            <div className="tracking-wider">
              <div className="text-xl font-semibold mb-4 text-gray-900">輔導員建檔資料</div>

              <p className="text-gray-600 mb-6">將公開顯示於介紹頁</p>
              <form onSubmit={handleSubmit}>
                <div className="mb-4 flex items-center space-x-4">
                  <div className="bg-sisal-100  border text-gray rounded-lg px-12 py-2 whitespace-nowrap">姓名</div>
                  <input type="text" name="name" value={mentorProfile.name} onChange={handleChange} placeholder="名稱" className="border p-2 w-full rounded-lg focus:outline-none focus:border-sisal-300" />
                </div>

                {/* 使用者可以自己增加 */}
                
                <div className="mt-6">
                    {skills.map((skill , index) => (
                        <div key={mentorProfile.id} className="mb-4 flex items-center space-x-4">
                            <div className="bg-sisal-100  border text-gray rounded-lg px-6 py-2 whitespace-nowrap">{`輔導專業 ${index + 1}`}</div>
                            <input type="text" name="skill" value={skill}  onChange={(e) => getSkill(index, e.target.value)} placeholder={`輔導專業 ${index + 1}`}
                                    className="border p-2 w-full rounded-lg focus:outline-none focus:border-blue-300" required/>
                            <button type="submit" onClick={() => removeSkill(index)} className="ml-2 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-200 focus:outline-none">
                                x
                            </button>
                        </div>
                    ))}
                    <div className='flex justify-center mb-4'>
                        <button type="button" onClick={addSkill} className="justify-end bg-sisal-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none">
                        ＋ 新增專業
                        </button>
                    </div>
                </div>
                
  
                
                <div className="flex items-center space-x-4 mb-4">
                    <div className="bg-sisal-100  border text-gray rounded-lg px-12 py-2 whitespace-nowrap">學歷</div>
                    <input type="text" name="education" value={mentorProfile.education} onChange={handleChange} placeholder="請填寫最高學歷" className="border p-2 w-full rounded-lg focus:outline-none focus:border-sisal-300" />
                </div>

                <div className="flex items-start space-x-4 mb-4">
                  <div className="bg-sisal-100  border text-gray rounded-lg px-12 py-2 whitespace-nowrap">簡歷</div>
                  <input type="text" name="introduction" value={mentorProfile.introduction} onChange={handleChange} placeholder="簡介與特殊經驗，限50字" className="border p-2 w-full h-[100px] rounded-lg focus:outline-none focus:border-sisal-300" />
                </div>
                <div className="flex justify-end">
                    <Link href="/profile">
                        <button type="button" id="return" className="px-4 py-2 m-1 rounded bg-sisal-500 text-white hover:bg-sisal-400 focus:outline-none transition-colors">
                        返回
                        </button>
                    </Link>
                    <button type="submit" id="save" className="px-4 py-2 m-1 rounded bg-sisal-900 text-white hover:bg-sisal-400 focus:outline-none transition-colors">
                    儲存
                    </button>
                </div>
              </form>
            </div>
          </div>
        </div>
    )
}


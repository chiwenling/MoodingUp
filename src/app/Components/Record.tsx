import { db }  from "../../../firebase";
import React, { useState,useEffect} from 'react';
import { collection, getDocs, query, where, doc, deleteDoc, orderBy, onSnapshot, QuerySnapshot} from "firebase/firestore";
import { useSelector } from 'react-redux';
import { RootState } from "../../../lib/store"


export default function Record(){
    const user = useSelector((state: RootState) => state.auth.user); 
    const [recordData, setRecordData] = useState<{ 
        id:string;
        date: string; 
        time: string; 
        teacher: string; 
        topic: string }[]>([]);
    
    // 刪除預約資料
    async function deleteRecord(id:string){
            try {
              await deleteDoc(doc(db, "reservation", id));
              alert("已刪除預約資料");
            } catch (error) {
              console.error("刪除錯誤", error);
            }
          };
    
    // 抓預約資料
    async function load(email: string) {
        try {
            const q = query((collection(db, "reservation")), where("email", "==",email),orderBy("date","desc"));
            // const querySnapshot = await getDocs(q);
            // console.log("資料庫結果", querySnapshot);
            const unsubscribe = onSnapshot(q,(querySnapshot)=>{
                const reservation =[];
                const records = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        date: data.date,
                        time: data.time,
                        teacher: data.teacher,
                        topic: data.topic,
                    };
                });
                setRecordData(records);
            });
            console.log("目前讀到的資訊",unsubscribe);
            
        } catch (error) {
            console.error("有點問題", error);
        }
    }

    useEffect(() => {
        if (user && user.email) {
            load(user.email);
            console.log("User email:", user.email);
        }
    }, [user]);


    return(
        <div className="tracking-wide container mx-auto p-4 mb-10">
            <div className="relative overflow-x-auto shadow-md ">
                <table className="w-full text-base text-left rtl:text-right text-gray-500 ">
                    <thead className="text-gray-700 uppercase bg-sisal-200 ">
                        <tr>
                            <th scope="col" className="px-6 py-3"> 預約日期</th>
                            <th scope="col" className="px-6 py-3"> 預約時間</th>
                            <th scope="col" className="px-6 py-3"> 輔導老師</th>
                            <th scope="col" className="px-6 py-3"> 諮詢主題</th>
                            <th scope="col" className="px-6 py-3"> 諮詢室</th>
                            <th scope="col" className="px-6 py-3"> 取消預約</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recordData.length > 0 ? (
                            recordData.map((record) => (
                                <tr key={record.id} className="font-normal text-gray-900 bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">{record.date}</td>
                                    <td className="px-6 py-4">{record.time}</td>
                                    <td className="px-6 py-4">{record.teacher}</td>
                                    <td className="px-6 py-4">{record.topic}</td>
                                    <td className="px-6 py-4">進入諮詢室</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex font-medium text-sisal-600 hover:underline" onClick={() => deleteRecord(record.id)}>取消預約</div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="px-6 py-4 text-center">
                                    沒有預約記錄
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
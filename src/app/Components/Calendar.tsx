'use client'; 
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../lib/features/auth/authSlice';
import { doc, setDoc, getDoc} from 'firebase/firestore';
import { db } from '../../../firebase';

interface availableTime {
  id:string,
  email:string,
  openTime:{
    date: Date;
    periods: {
      period:string;
      isAvailable:boolean;
    }[];
  }[];
};

const SetTime = () => {
  const user = useSelector(selectCurrentUser);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(true); 
  const [openTime, setOpenTime]= useState<availableTime["openTime"]>([]);

  const handleDateToString = (date:any) => {
    if (date) {
      const saveDate = date.toLocaleDateString('zh-CN'); 
      setSelectedDate(saveDate); 
    }
  };

  const handleAddPeriod = () => {
    if (startTime && endTime && selectedDate) {
      const periods:{
        period: string; 
        isAvailable: boolean 
      }[]= [];

      const start = parseInt(startTime);
      const end = parseInt(endTime);
      for (let hour = start; hour < end; hour++) {
        periods.push({
          period: `${hour}:00 - ${hour + 1}:00`,
          isAvailable: true,
        });
      };
    
    // 檢查有沒有已登記開放的時段
    let foundDate = false;
    const newOpenTime = openTime.map(function(preOpenTime){
      if  (preOpenTime.date.toString() === selectedDate.toString()) {
          foundDate = true; 
          const updatedPeriods = [...preOpenTime.periods];
          periods.forEach(function(newPeriod){
            let foundPeriod = false;
            for (let i = 0; i < preOpenTime.periods.length; i++) {
              if (preOpenTime.periods[i].period === newPeriod.period) {
                foundPeriod = true;
                alert("你重複加入時段了");
                break;
              }
            }
            if (!foundPeriod) {
              updatedPeriods.push(newPeriod);
            }
          });
        preOpenTime.periods = updatedPeriods;
      }
      return preOpenTime;
    });

    if (!foundDate) {
      newOpenTime.push({
        date: selectedDate,
        periods: periods,
      });
    }

    setOpenTime(newOpenTime);
    setStartTime('');
    setEndTime('');
  }
};
  

  const handleRemovePeriod = (dateIndex:number, periodIndex:number) => {
    setOpenTime(prevOpenTime => {
      const newOpenTime = [...prevOpenTime];
      const periods = newOpenTime[dateIndex].periods;
  
      periods.splice(periodIndex, 1);
      if (periods.length === 0) {
        newOpenTime.splice(dateIndex, 1);
      };
      return newOpenTime;
    });
  };
  

  // 存目前有的資料
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      try {
        await setDoc(doc(db, "availableTime", user.uid), {
          openTime:openTime,
          id:user.uid,
          email:user.email,
        });
        alert("已更新資料");
      } catch (error) {
        console.error('Error saving data to Firestore:', error);
        alert("請重新儲存");
      }
    }
  };

  // 取得目前有空的時間
  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const docRef = doc(db, "availableTime", user.uid);
          const docSnap = await getDoc(docRef);

          if(docSnap.exists()) {
            const isAdmin = docSnap.data().isAdmin;
            console.log("是不是輔導員",isAdmin);
            const date = docSnap.data().openTime;
            console.log("有時間嗎",date);
            setLoading(false);
            setOpenTime(docSnap.data().openTime);
          } else {
            console.log("還沒有編輯時間");
          }
        } catch (error) {
          console.error("fetch有問題:", error);
          setLoading(false);
        }
      }
    };
  
    fetchProfile();
  }, [user]);

  return (
    <form onSubmit={handleSubmit}>
    <div className="mt-10 container mx-auto p-4 bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">設定開放預約時段</h2>
      <div className="mb-4">
        <span className="text-base block m-2">Step 1 : 選擇日期</span>
        <DatePicker selected={selectedDate} onChange={handleDateToString} dateFormat="yyyy年MM月dd日"
          className="w-full border p-2 rounded-lg"/>
      </div>

      <div className="mb-4 flex">
        <span className="text-base block m-2">Step 2 : 選擇時間</span>
      </div>

      <div className="flex items-center justify-start ml-2 mb-4 flex ">
          <label className="text-gray-700">開始時間</label>
          <input type="number" value={startTime} onChange={(e) => setStartTime(e.target.value)} placeholder="9" className="w-1/8 border p-2 ml-4 rounded-lg" min="9" max="20"/>
          <label className="text-gray-700 ml-4 ">結束時間</label>
          <input type="number" value={endTime} onChange={(e) => setEndTime(e.target.value)} placeholder="17" className="w-1/8 border p-2 ml-4 rounded-lg" min="10" max="21"/>
      </div>

      <button type="button" onClick={handleAddPeriod} className="w-1/4 bg-sisal-800 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
        增加預約時段
      </button>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">可預約時段</h3>
        {!openTime || openTime.length === 0 ? (
            <p className="text-gray-500 mt-2">還未設定可預約時段</p>
          ) : (
            openTime.map((slot, index) => (
              <div key={index} className="flex flex-col mt-2">
                <div className="flex justify-between preOpenTimes-center">
                  <span className="font-bold">
                    {new Date(slot.date).toLocaleDateString('zh-CN')}:
                  </span>
                </div>

                {slot.periods.map((periodpreOpenTime, periodIndex) => (
                  <div key={periodIndex} className="flex items-center justify-start m-1">
                    <div>{periodpreOpenTime.period}</div>
                    <button onClick={() => handleRemovePeriod(index, periodIndex)} className="bg-red-500 text-white m-1 px-2 py-1 rounded-lg hover:bg-red-600">
                      刪除
                    </button>
                  </div>
                ))}
              </div>
            ))
          )}


        <div className="flex justify-center m-10">     
          <button type="submit" id="save" className="px-4 py-2 m-1 rounded bg-sisal-900 text-white hover:bg-sisal-400 focus:outline-none transition-colors">
          儲存
          </button>
        </div>
      </div>
    </div>
    </form>
  );
};

export default SetTime;

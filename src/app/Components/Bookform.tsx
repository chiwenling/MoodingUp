"use client"
import { useEffect, useState } from "react";
import { setDoc, getDocs, doc, collection, addDoc,query, where,updateDoc } from "firebase/firestore";
import { db } from "./../../../firebase";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../lib/features/auth/authSlice";
import { useRouter } from "next/navigation";

interface Period {
  period: string;
  isAvailable: boolean;
}

interface OpenTime {
  date: string; 
  periods: Period[]; 
}

interface AvailableTime {
  id: string;
  email: string;
  openTime: OpenTime[]; 
}

export default function Bookform(){
    const router = useRouter();
    const user = useSelector(selectCurrentUser);
    const [mentors, setMentors] = useState<any[]>([]); 
    const [skills, setSkills] = useState<string[]>([]);
    const [mentorEmail, setMentorEmail] = useState<string>("");
    const [roomLink, setRoomLink] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [availableTimes, setAvailableTimes] = useState<AvailableTime[]>([]);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        teacher: "",
        teacherEmail:"",
        topic: "",
        date: "",
        time: "",
        radio: "",
        roomLink:"",
    });
    

    const handleChange = function(e:any){
        const name = e.target.name;
        const value = e.target.value;
        setFormData(function(prevData){
          return {
            ...prevData, 
            [name]:value
        }
      });

      if (name === "teacher") {
        setSelectedDate(null);
        setSelectedPeriod(null);
        const selectedMentor = mentors.find((mentor) => mentor.name === value);
        if (selectedMentor) {
          setSkills(selectedMentor.skill || []); 
          setMentorEmail(selectedMentor.email); 
          setRoomLink(selectedMentor.googleMeetLink)
          setFormData((prevData) => ({ ...prevData, topic: '', time: '' })); 
        }
      }
    };

    useEffect(() => {
      const fetchMentors = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "mentors"));
          const mentorList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMentors(mentorList); 
        } catch (error) {
          console.error("錯誤:", error);
        }
      };
      fetchMentors();
    }, []);
  
    // 知道輔導員目前開放的時段
    useEffect(() => {
      const fetchAvailableTimes = async () => {
        if (!mentorEmail) return;
  
        try {
          const q = query(collection(db, "availableTime"), where("email", "==", mentorEmail));
          const querySnapshot = await getDocs(q);
  
          const times: AvailableTime[] = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            console.log("拿到的資料: ", data);

            if (data.email && Array.isArray(data.openTime)) {
              const transformedData = {
                id: doc.id,
                email: data.email,
                openTime: data.openTime.map((time: any) => ({
                  date: time.date, 
                  periods: time.periods.map((p: any) => ({
                    period: p.period,
                    isAvailable: p.isAvailable,
                  })),
                })),
              };
  
              console.log("時間資料: ", transformedData);
              return transformedData;
            } else {
              console.error("資料錯誤", data);
              return null; 
            }
          }).filter((time) => time !== null) as AvailableTime[]; 
  
          console.log("時間狀態: ", times);
  
          setAvailableTimes(times); 
        } catch (error) {
          console.error("時間有錯:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchAvailableTimes();
    }, [mentorEmail]);

      const handleSelectPeriod = (date: string, period: string) => {
        setSelectedDate(date);
        setSelectedPeriod(period);
        setFormData((prevData) => ({
          ...prevData,
          date: date,
          time: period,
        }));
      };
  
    // 存預約資料
    const handleSubmit = async (e: any) => {
      e.preventDefault();
      if (user && user.email) {
        try {
          await addDoc(collection(db, "reservation"), {
            ...formData,
            teacherEmail:mentorEmail,
            roomLink:roomLink,
            user: user.uid,
            email: user.email,
          });
    
          const q = query(collection(db, "availableTime"),where("email", "==", mentorEmail));
          const querySnapshot = await getDocs(q);
    
          querySnapshot.forEach(async (document) => {
            const availableTimeData = document.data(); 
            const updatedOpenTime = availableTimeData.openTime.map((openTime: any) => {
              if (openTime.date === selectedDate) {
                return {
                  ...openTime,
                  periods: openTime.periods.map((period: any) =>
                    period.period === selectedPeriod ? 
                  { ...period, isAvailable: false } : period
                  ),
                };
              }
              return openTime;
            });
            const availableTimeDocRef = doc(db, "availableTime", document.id);
            await updateDoc(availableTimeDocRef, { openTime: updatedOpenTime });
          });
    
          alert("預約成功");
          router.push("/profile");
        } catch (error) {
          console.error("Error saving data to Firestore:", error);
          alert("請重新預約");
        }
      }
    };
    
  return (
    <div className="flex items-center justify-center p-12">
      <div className="mx-auto w-full max-w-[550px]">
        <form onSubmit={handleSubmit}>
        <div className="tracking-wider text-center text-xl m-10 mt-5 text-sisal-900">歡迎使用預約服務</div>
        <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 sm:w-full">
              <div className="mb-5">
                <label htmlFor="email" className="mb-3 block text-base font-medium text-sisal-800">
                  您的帳號
                </label>
                <input type="email" value={user?.email || ""} readOnly className="w-full rounded-md border py-3 px-6 text-base font-medium text-sisal-800 border-sisal-400  p-2 pl-4 rounded-lg bg-gray-100 text-gray-900"/>
              </div>
            </div>
          </div>

        <div className="-mx-1 px-1 flex flex-wrap w-full sm:w-full mb-5">
            <label htmlFor="teacher" className="mb-3 block text-base font-medium text-sisal-800">
                指定預約老師
            </label>
            <select name="teacher" id="teacher" value={formData.teacher} onChange={handleChange} required className="w-full appearance-none rounded-md border border-sisal-400 bg-white py-3 px-6 text-base font-medium text-sisal-800 outline-none focus:border-border-sisal-900 focus:shadow-md">
              <option value="" disabled>請選擇一位老師</option>
              {mentors.map((mentor) => (
                <option key={mentor.id} value={mentor.name}>{mentor.name}</option>
              ))}
            </select>
        </div>

        <div className="-mx-1 px-1 flex flex-wrap w-full sm:w-full mb-5">
            <label htmlFor="topic" className="required mb-3 block text-base font-medium text-sisal-800">
                討論主題
            </label>
            <select name="topic" id="topic" value={formData.topic} onChange={handleChange} required className="w-full appearance-none rounded-md border border-sisal-400 bg-white py-3 px-6 text-base font-medium text-sisal-800 outline-none focus:border-border-sisal-900 focus:shadow-md">
              <option value="" disabled>請選擇諮詢主題</option>
              {skills.map((skill, index) => (
                <option key={index} value={skill}>{skill}</option>
              ))}
            </select>
        </div>
        <label htmlFor="topic" className="required mb-3 block text-base font-medium text-sisal-800">
          選擇時間
          </label>
        <div className="p-6 bg-white shadow-md shadow-sisal-500 rounded-lg mb-10">
  
          {availableTimes.length === 0 ? (
            <p className="text-gray-500">目前無</p>
          ) : (
            availableTimes.map((time) => (
              <div key={time.id} className="mb-8">
                {time.openTime.map((openTime, index) => (
                  <div key={index} className="mb-6">
                    <h4 className="text-lg font-medium text-gray-800 mb-3">日期: {openTime.date}</h4>
                    <div className="flex flex-wrap gap-3">
                      {openTime.periods.map((period, periodIndex) => (
                        <button type="button"
                          key={periodIndex}
                          disabled={!period.isAvailable}
                          onClick={() => handleSelectPeriod(openTime.date, period.period)}
                          className={`px-5 py-3 rounded-lg font-semibold transition-all duration-300 ${
                            period.isAvailable
                              ? "bg-sisal-200 text-gray-700 hover:bg-sisal-300 hover:text-gray-900"
                              : "bg-gray-200 text-gray-400 cursor-not-allowed"
                          } ${
                            selectedDate === openTime.date && selectedPeriod === period.period
                              ? "ring-2 ring-sisal-500"
                              : ""
                          }`}
                        >
                          {period.period}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))
          )}

          {selectedDate && selectedPeriod && (
            <div className="mt-6 p-4 bg-sisal-100 border border-sisal-300 rounded-lg text-gray-700">
              <p>您選擇了：<span className="font-semibold">{selectedDate}</span> - <span className="font-semibold">{selectedPeriod}</span></p>
            </div>
          )}
        </div>


          <div className="mb-5 flex items-center space-x-4">
            <label className="text-base font-medium text-sisal-800">
                已詳閱預約規則
            </label>
            <div className="flex items-center">
                <input type="radio" name="radio" id="radioButton" value="已詳閱" checked={formData.radio === "已詳閱"} onChange={handleChange} className="h-5 w-5 text-[#6A64F1] focus:ring-0 border-gray-300 rounded-full" required/>
                <label htmlFor="radioButton" className="pl-3 text-base font-medium text-sisal-800">
                是
                </label>
            </div>
            </div>
          <div>
            <button type="submit" className="hover:shadow-form rounded-md bg-sisal-300 py-3 px-8 text-center text-base font-semibold text-white outline-none"
            > 確定預約
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};




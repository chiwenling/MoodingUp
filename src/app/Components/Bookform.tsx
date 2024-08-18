"use client"
import React, { useState } from 'react';
import { setDoc, doc } from 'firebase/firestore';
import { db } from './../../../firebase';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../lib/features/auth/authSlice';


export default function Bookform(){
    const user = useSelector(selectCurrentUser);
    const [formData, setFormData] = useState({
        teacher: '',
        topic: '',
        date: '',
        time: '',
        radio: '',
    });

    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();

        if (user && user.email) {
        try {
            await setDoc(doc(db, 'reservation', user.uid), {
            email: user.email,
            ...formData,
            },
            { merge: false }
        );
            alert('預約成功');
            window.location.href = '/';
        } catch (error) {
            console.error('Error saving data to Firestore:', error);
            alert('請重新預約');
        }
        }
    };

  return (
    <div className="flex items-center justify-center p-12">
      <div className="mx-auto w-full max-w-[550px]">
        <form onSubmit={handleSubmit}>
        <div className="mb-5">
            <label htmlFor="teacher" className="mb-3 block text-base font-medium text-[#07074D]">
                指定預約老師
            </label>
            <select name="teacher" id="teacher" value={formData.teacher} onChange={handleChange} required className="w-full appearance-none rounded-md border border-sisal-400 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-border-sisal-900 focus:shadow-md">
                <option value="" disabled>請選擇一位老師</option>
                <option value="chen">陳比約</option>
                <option value="lin">林得中</option>
                <option value="hsiao">蕭凱琳</option>
            </select>
        </div>
        <div className="mb-5">
            <label htmlFor="topic" className="required mb-3 block text-base font-medium text-[#07074D]">
                討論諮詢主題
            </label>
            <select name="topic" id="topic" value={formData.topic} onChange={handleChange} className="w-full appearance-none rounded-md border border-sisal-400 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-border-sisal-900 focus:shadow-md"
            >
                <option value="" disabled>請選擇諮詢主題</option>
                <option value="人際關係">人際關係</option>
                <option value="職涯發展">職涯發展</option>
                <option value="情感困擾">情感困擾</option>
            </select>
        </div>
          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]">
                  您的帳號
                </label>
                <input type="email" value={user?.email || ''} readOnly className="w-full rounded-md border py-3 px-6 text-base font-medium text-[#6B7280] border-sisal-400  p-2 pl-4 rounded-lg bg-gray-100 text-gray-900"/>
              </div>
            </div>
          </div>
          

          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label htmlFor="date" className="mb-3 block text-base font-medium text-[#07074D]">
                  日期
                </label>
                <input required type="date" name="date" id="date" value={formData.date} onChange={handleChange} className="w-full rounded-md border border-sisal-400 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-border-sisal-900 focus:shadow-md"/>
              </div>
            </div>
          </div>
            <div className="-mx-3 flex flex-wrap">
                <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                        <label htmlFor="time" className="mb-3 block text-base font-medium text-[#07074D]">
                        時間
                        </label>
                        <input
                        type="time"
                        name="time"
                        id="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full rounded-md border border-sisal-400 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-border-sisal-900 focus:shadow-md"
                        />
                    </div>
                </div>
            </div>

          <div className="mb-5 flex items-center space-x-4">
            <label className="text-base font-medium text-[#07074D]">
                已詳閱預約規則
            </label>
            <div className="flex items-center">
                <input
                type="radio"
                name="radio"
                id="radioButton1"
                value="Yes"
                checked={formData.radio === 'Yes'}
                onChange={handleChange}
                className="h-5 w-5 text-[#6A64F1] focus:ring-0 border-gray-300 rounded-full"
                />
                <label
                htmlFor="radioButton1"
                className="pl-3 text-base font-medium text-[#07074D]"
                >
                是
                </label>
            </div>
            </div>
          <div>
            <button
              type="submit"
              className="hover:shadow-form rounded-md bg-sisal-300 py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              確定預約
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};



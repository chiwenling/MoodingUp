// questionnaire

"use client"
import React, { useState, ChangeEvent } from 'react';
import Link from "next/link";

function Qa(){
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [score, setScore] = useState<number | null>(null);

  const options = [
    { id: 'never', label: '完全不正確', value: 1 },
    { id: 'seldom', label: '尚算正確', value: 2 },
    { id: 'sometimes', label: '一半一半', value: 3 },
    { id: 'usually', label: '多數正確', value: 4 },
    { id: 'always', label: '完全正確', value: 5 }
  ];

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const selected = options.find(option => option.id === selectedOption);
    if (selected) {
      setScore(selected.value);
    }
  };

  return (
    <div className="bg-sisal-400 min-h-screen flex items-start justify-center">
        <div className="py-12">
        <div className="bg-white text-black border border-black w-[750px] h-[500px] p-14">
            <div className="text-center text-2xl">Q : 如果我盡力去做的話，我總是能夠解決難題的。</div>
            <form onSubmit={handleSubmit} className="pt-5">
            <div className="option flex items-center pt-3 pl-[60px]">
                <input type="radio" id="never" name="option" value="never" checked={selectedOption === 'never'} onChange={handleOptionChange} className="cursor-pointer"/>
                <label htmlFor="never" className="cursor-pointer pl-2 text-lg">完全不正確</label>
            </div>
            <div className="option flex items-center pt-3 pl-[60px]">
                <input type="radio" id="seldom" name="option" value="seldom" checked={selectedOption === 'seldom'} onChange={handleOptionChange}/>
                <label htmlFor="seldom" className="cursor-pointer pl-2 text-lg">
                尚算正確
                </label>
            </div>
            <div className="option flex items-center pt-3 pl-[60px]">
                <input type="radio" id="sometimes" name="option" value="sometimes" checked={selectedOption === 'sometimes'} onChange={handleOptionChange}/>
                <label htmlFor="sometimes" className="cursor-pointer pl-2 text-lg">
                一半一半
                </label>
            </div>
            <div className="option flex items-center pt-3 pl-[60px]">
                <input type="radio" id="usually" name="option" value="usually" checked={selectedOption === 'usually'} onChange={handleOptionChange}/>
                
                <label htmlFor="usually" className="cursor-pointer pl-2 text-lg">
                多數正確
                </label>
            </div>
            <div className="option flex items-center pt-3 pl-[60px]">
                <input type="radio" id="always" name="option" value="always" checked={selectedOption === 'always'} onChange={handleOptionChange}/>
                <label htmlFor="always" className="cursor-pointer pl-2 text-lg">
                完全正確
                </label>
            </div>
            <div className="option flex items-center pt-3 pl-[60px]">
                <input type="radio" id="other" name="option" value="other" checked={selectedOption === 'other'} onChange={handleOptionChange} className="opacity-0 mr-[-18px] cursor-pointer"/>
            </div>
            <div className="button pt-2">
                <button type="submit" className="text-sisal-900 bg-sisal-400 w-80 border rounded-lg text-lg py-3 mx-auto block cursor-pointer hover:text-sisal-400 hover:bg-sisal-800">
                結算分數
                </button>
            </div>
            </form>
            {score !== null && (
            <div className="text-center mt-3 text-xl">
              您的分數是: {score}

              <Link href="/booking">
              <button type="submit" className="text-sisal-200 bg-sisal-900 w-80 border rounded-lg text-lg py-3 mx-auto block cursor-pointer hover:text-sisal-400 hover:bg-sisal-800">
                預約聊天
              </button>
              </Link>
            </div>
          )}
        </div>
        </div>
    </div>
  );

};

export default Qa;

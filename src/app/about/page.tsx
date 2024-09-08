import Button from '../Components/Button';
import Image from 'next/image';

export default function Aboutpage() {
  return (
    <div className="min-h-screen bg-white py-100 px-10">
      <div className="container mx-auto flex px-15 py-24 md:flex-row flex-col items-center">
        <div className="flex justify-around m-2 lg:max-w-lg lg:w-full md:w-1/2 w-1/2">
          <Image src="/heart.png" width={300} height={300} className="rounded-lg shadow-lg" alt="MoodingUp" />
        </div>
        <div className="tracking-wider lg:flex-grow md:w-1/2 lg:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="text-4xl tracking-wider font-bold text-gray-900 mb-4">MoodingUp</h1>
          <h2 className="text-3xl tracking-wider font-light text-gray-900 mb-6">OurStory</h2>
          <p className="mb-5 text-justify  text-lg text-gray-700">
            我們希望提供一個陪伴平台，幫助有需要的人可以隨時提出自己的需求，您可以透過 AI 陪伴員獲得初步的輔導，聊聊目前狀況，也可以預約輔導員，獲得線上資源和陪伴切入點。
          </p>
          <Button href="mentors" text="認識我們的輔導員，ＧＯ！" bg="bg-sisal-600" />
        </div>
      </div>
    </div>
  );
}

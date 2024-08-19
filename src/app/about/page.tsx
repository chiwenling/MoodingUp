import Image from 'next/image';
export default function Aboutpage() {
    return (
      <div className="text-gray-700 body-font">
          <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
            <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
              <div className="tracking-wider title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">MoodingUp</div>
              <div className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">網站故事</div>
              <div className="text-justify mb-8 leading-relaxed text-lg">我們希望提供一個陪伴平台，幫助有需要的人可以隨時提出自己的需求，系統將依需求推薦 AI 陪伴員，並協助預約符合的輔導員，給予初步輔導，提供線上資源和陪伴切入點。</div>
              
            </div>
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
              <Image src="/heart.png"  width={200} height={200} className="w-full ml-5 rounded-lg" alt="pic" />
            </div>
          </div>
      </div>
    );
  }
  
  
import Image from 'next/image';
export default function Aboutpage() {
    return (
      <div className="text-gray-700 body-font">
          <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
            <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
              <div className="tracking-wider title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">MoodingUp</div>
              <div className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">網站故事</div>
              <div className="mb-8 leading-relaxed text-lg">不學年起頭時此的態拿響得我老去好青務反的；處在題的的情，下大是們海電苦業紀。原少能須能，保同亞因血華大我王、建果未哥上元日！效展用問位，區市要利離希河空識：不業了做路一家我原策政國到我老效特企他有總愛的阿不以名？兒推日低這一由著消也一在歌以。.</div>
              
            </div>
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
              <Image src="/heart.png"  width={200} height={200} className="w-full ml-5 rounded-lg" alt="pic" />
            </div>
          </div>
      </div>
    );
  }
  
  
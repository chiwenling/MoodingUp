import Button from '../Components/Button';
import { useScore } from '../Components/ScoreContext';

const ScoreCard = () => {
  const { score } = useScore();
  let word = "";
  let test = true;
  if(score===0){
    word = "您還沒有進行測驗喔！進行測驗可以更理解現在的狀態"
    test=false;
  } else if(score > 35) {
    word = "我發現您的目前狀態非常良好唷，歡迎多了解我們提供的服務喔！";
  } else if (score >= 26 && score <= 34) {
    word = "現在狀態不錯喔！建議可以與AI聊聊找到新發現！";
  } else if (score >= 16 && score <= 25) {
    word = "請留意最近的狀態！建議可以與AI聊過後，預約輔導員";
  } else {
    word = "還好嗎，我發現您的自我效能感偏低，建議您可以立即預約與輔導員聊聊";
  }

  return (
    <div>
        <div className="min-w-[320px]  max-w-[800px] w-full m-8 flex flex-row items-center justify-between p-10 bg-gradient-to-r from-sisal-100 to-sisal-200 rounded-xl shadow-xl max-w-4xl mx-auto transform hover:scale-110 transition-transform duration-300 ease-in-out space-x-10">    
            <div className="flex flex-col justify-center m-1 p-1">
                <div className="text-sm text-sisal-600 font-medium mb-4">根據自我效能表總分40分</div>
                <div className="text-2xl font-normal text-sisal-900 mb-2 tracking-wide">心情檢測分數 : {score}</div>
                <div className="text-base font-normal text-sisal-700 leading-relaxed">{word}</div>
            </div>
            <div>
                {test?
                <Button href="/test"text="重新檢測" bg="bg-red-400"/>
                :<Button href="/test"text="進行檢測" bg="bg-red-400"/>}
            </div>  
        </div>
    </div>
  );
};

export default ScoreCard;

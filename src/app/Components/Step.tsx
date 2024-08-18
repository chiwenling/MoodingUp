
export default function Step(){
    return(
        <ol className="mb-10 text-2xl font-medium tracking-wider flex items-center justify-center space-x-10 space-y-0 rtl:space-x-reverse text-sisal-800">
            <li className="flex items-center text-sisal-800 space-x-3">
                <span className="flex items-center justify-center w-8 h-8 border border-sisal-800 rounded-full shrink-0">
                    1
                </span>
                <span>心情小測獲得分數</span>
            </li>
            <li className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 border border-sisal-800 rounded-full shrink-0">
                    2
                </span>
                <span>預約談話</span>
            </li>
            <li className="flex items-center space-x-3">
                <span className="text-2xl flex items-center justify-center w-8 h-8 border border-sisal-800 rounded-full shrink-0">
                    3
                </span>
                <span>開始聊天</span>
            </li>
        </ol>
    )
}
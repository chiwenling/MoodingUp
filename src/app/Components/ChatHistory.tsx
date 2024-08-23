// 要讀取目前有的歷史紀錄





export default function ChatHistory(){
    return(
        <div className="w-1/4 bg-white border border-sisal-500">
                      <div className="p-4 border-b border-gray-300 flex justify-between items-center bg-sisal-600 text-white">
                          <div className="text-lg font-normal">過往諮詢紀錄</div>
                          <div className="relative">
                              <button id="menuButton" className="focus:outline-none">
                                  <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"/>
                                  </svg>
                              </button>
                          </div>
                      </div>
                    
                      <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
                          <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                              <div className="flex-1">
                                  <div className="text-lg font-semibold">2024-04-01</div>
                                  <div className="text-gray-600">聊天歷史紀錄</div>
                              </div>
                          </div>
                          <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                              <div className="flex-1">
                                  <div className="text-lg font-semibold">2024-04-01</div>
                                  <div className="text-gray-600">聊天歷史紀錄</div>
                              </div>
                          </div>     
                      </div>  
                  </div>
    )
}
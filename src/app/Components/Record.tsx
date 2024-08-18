export default function Record(){
    return(
        <div className="tracking-wide container mx-auto p-4 mb-10">
            <div className="relative overflow-x-auto shadow-md ">
                <table className="w-full text-base text-left rtl:text-right text-gray-500 ">
                    <thead className="text-gray-700 uppercase bg-sisal-200 ">
                        <tr>
                            <th scope="col" className="px-6 py-3"> 預約日期</th>
                            <th scope="col" className="px-6 py-3"> 預約時間</th>
                            <th scope="col" className="px-6 py-3"> 輔導老師</th>
                            <th scope="col" className="px-6 py-3"> 諮詢主題</th>
                            <th scope="col" className="px-6 py-3"> 諮詢室</th>
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">取消預約</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="font-normal text-gray-900 bg-white border-b hover:bg-gray-50">
                            <td scope="row" className="px-6 py-4 whitespace-nowrap">
                               2024/8/1
                            </td>
                            <td className="px-6 py-4">14:00-15:00</td>
                            <td className="px-6 py-4">陳學福</td>
                            <td className="px-6 py-4">職涯發展</td>
                            <td className="px-6 py-4">進入諮詢室</td>
                            <td className="px-6 py-4 text-right">
                                <a href="#" className="font-medium text-blue-600 hover:underline">取消預約</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
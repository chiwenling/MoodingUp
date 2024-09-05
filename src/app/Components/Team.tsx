import Image from 'next/image';

export default function Team() {
    return (
        <div className="tracking-wider bg-sisal-200">
            <div className="py-12 px-6 mx-auto max-w-screen-xl lg:py-16 lg:px-8 ">
                <div className="mx-auto max-w-screen-sm text-center mb-12 lg:mb-20">
                    <div className="mb-6 text-4xl font-bold text-sisal-900">輔導員介紹</div>
                    <p className="font-light text-gray-600 sm:text-xl">我們擁有專業輔導員，讓我們一起解決困難。</p>
                </div>

                <div className="grid gap-10 mb-12 lg:mb-20 md:grid-cols-2 sm:grid-cols-1">
                    <div className="flex items-center bg-white rounded-lg shadow-lg transform transition-transform hover:scale-105">
                        <Image src="/Teacher.jpg" width={200} height={200} className="w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-40 ml-5 rounded-lg object-cover" alt="老師1" />
                        <div className="p-6 space-y-4">
                            {/* 姓名 */}
                            <div className="text-2xl font-semibold text-gray-900">
                                陳比約
                            </div>
                            {/* 專業 */}
                            <div className="flex flex-wrap gap-2">
                                <div className="rounded-full bg-sisal-300 text-sisal-800 px-4 py-2">
                                    職涯發展
                                </div>
                                <div className="rounded-full bg-sisal-300 text-sisal-800 px-4 py-2">
                                    人際關係
                                </div>
                            </div>
                            {/* 簡介 */}
                            <p className="font-normal text-gray-600">
                                專長協助個人職涯規劃、發掘潛力，提供指導，提升職場競爭力。
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center bg-white rounded-lg shadow-lg transform transition-transform hover:scale-105">
                        <Image 
                            src="/Teacher.jpg"  
                            width={200} 
                            height={200} 
                            className="w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-40 ml-5 rounded-lg object-cover" 
                            alt="老師2" 
                        />
                        <div className="p-6 space-y-4">
                            <div className="text-2xl font-semibold text-gray-900">
                                林得中
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <div className="rounded-full bg-sisal-300 text-sisal-800 px-4 py-2">
                                    職涯發展
                                </div>
                                <div className="rounded-full bg-sisal-300 text-sisal-800 px-4 py-2">
                                    人際關係
                                </div>
                            </div>
                            <p className="font-normal text-gray-600">
                                提供職涯規劃和人際關係的指導，幫助個人找到合適的發展方向。
                            </p>
                        </div>
                    </div>
                </div>  
            </div>
        </div>
    );
}

import Image from 'next/image';

export default function Team(){
    return(
        <div className="tracking-wider bg-sisal-200">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
                <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
                    <div className="mb-4 text-3xl font-bold text-sisal-900">輔導員介紹</div>
                    <p className="font-light text-gray-500 lg:mb-16 sm:text-xl"></p>
                </div> 

                <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
                    <div className="h-60 items-center bg-gray-50 rounded-lg shadow sm:flex">
                        <Image src="/Teacher.jpg"  width={200} height={200} className="w-full ml-5 rounded-lg" alt="老師1" />
                        <div className="p-6 space-y-4">
                            <div className="text-xl font-bold tracking-wide text-gray-900">
                                陳比約
                            </div>
                            <div className="flex space-x-3">
                                <div className="rounded-full bg-sisal-200 px-4 py-2">
                                職涯發展
                                </div>
                                <div className="rounded-full bg-sisal-200 px-4 py-2">
                                人際關係
                                </div>
                            </div>
                            <div className="font-bold text-red-700">
                                可預約時段：週一、週三
                            </div>
                            <p className="font-normal text-gray-500">
                                專長協助個人職涯規劃、發掘潛力、提供指導，提升職場競爭力
                            </p>
                        </div>
                    </div> 
                    <div className="h-60 items-center bg-gray-50 rounded-lg shadow sm:flex">
                        <Image src="/Teacher.jpg"  width={200} height={200} className="w-full ml-5 rounded-lg" alt="老師1" />
                        <div className="p-6 space-y-4">
                            <div className="text-xl font-bold tracking-wide text-gray-900">
                                林得中
                            </div>
                            <div className="flex space-x-3">
                                <div className="rounded-full bg-sisal-200 px-4 py-2">
                                職涯發展
                                </div>
                                <div className="rounded-full bg-sisal-200 px-4 py-2">
                                人際關係
                                </div>
                            </div>
                            <div className="font-bold text-red-700">
                                可預約時段：週一、週三
                            </div>
                            <p className="font-normal text-gray-500">
                                專長協助個人職涯規劃、發掘潛力、提供指導，提升職場競爭力
                            </p>
                        </div>
                    </div> 
                    <div className="h-60 items-center bg-gray-50 rounded-lg shadow sm:flex">
                        <Image src="/Teacher.jpg"  width={200} height={200} className="w-full ml-5 rounded-lg" alt="老師1" />
                        <div className="p-6 space-y-4">
                            <div className="text-xl font-bold tracking-wide text-gray-900">
                                蕭凱琳
                            </div>
                            <div className="flex space-x-3">
                                <div className="rounded-full bg-sisal-200 px-4 py-2">
                                職涯發展
                                </div>
                                <div className="rounded-full bg-sisal-200 px-4 py-2">
                                人際關係
                                </div>
                            </div>
                            <div className="font-bold text-red-700">
                                可預約時段：週一、週三
                            </div>
                            <p className="font-normal text-gray-500">
                                專長協助個人職涯規劃、發掘潛力、提供指導，提升職場競爭力
                            </p>
                        </div>
                    </div> 
                    <div className="h-60 items-center bg-gray-50 rounded-lg shadow sm:flex">
                        <Image src="/Teacher.jpg"  width={200} height={200} className="w-full ml-5 rounded-lg" alt="老師1" />
                        <div className="p-6 space-y-4">
                            <div className="text-xl font-bold tracking-wide text-gray-900">
                                陳比約
                            </div>
                            <div className="flex space-x-3">
                                <div className="rounded-full bg-sisal-200 px-4 py-2">
                                職涯發展
                                </div>
                                <div className="rounded-full bg-sisal-200 px-4 py-2">
                                人際關係
                                </div>
                            </div>
                            <div className="font-bold text-red-700">
                                可預約時段：週一、週三
                            </div>
                            <p className="font-normal text-gray-500">
                                專長協助個人職涯規劃、發掘潛力、提供指導，提升職場競爭力
                            </p>
                        </div>
                    </div> 
                </div>  
            </div>
        </div>
)
}
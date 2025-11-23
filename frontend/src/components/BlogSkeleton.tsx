export const BlogSkeleton = ()=>{
    return<div>
        <div role="status" className="animate-pulse">
            <div className="p-4 flex  justify-center">
                <div className="border-b border-slate-300 pb-4 w-7/12 w-screen max-w-screen-md cursor-pointer">
                    <div className="flex">
                        <div className="flex justify-center items-center">
                            <div className="h-4 w-4 bg-gray-200 rounded-full mb-4"></div>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                        <div className="flex justify-center flex-col pl-2"><Circle/></div>
                        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                    </div>
                    <div className="pt-1 font-semibold text-xl">
                        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                    </div>
                    <div className="font-thin text-md">
                        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                    </div>
                    <div className="text-slate-500 text-sm font-thin pt-2">
                        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                    </div>
                </div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    </div>
}
function Circle(){
    return <div className="h-1 w-1 rounded-full bg-slate-500"></div>
}
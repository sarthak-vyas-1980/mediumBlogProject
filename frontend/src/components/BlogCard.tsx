import {Link} from "react-router-dom"

type BlogCardProps = {
    AuthorName: string;
    title: string;    
    content: string;    
    publishedDate: string;
    id:string;
}
export const BlogCard = ({id, AuthorName, title, content, publishedDate}:BlogCardProps)=>{
    return <Link to={`/blog/${id}`}>
        <div className="p-4 flex  justify-center">
            <div className="border-b border-slate-300 pb-4 w-7/12 w-screen max-w-screen-md cursor-pointer">
                <div className="flex">
                    <div className="flex justify-center items-center">
                        <Avatar name={AuthorName}/>
                    </div>
                    <div className="pl-2 text-sm font-extralight">{AuthorName}</div>
                    <div className="flex justify-center flex-col pl-2"><Circle/></div>
                    <div className="pl-2 font-light text-sm text-slate-600">{publishedDate}</div>
                </div>
                <div className="pt-1 font-semibold text-xl">{title}</div>
                <div className="font-thin text-md">{content.slice(0,100) + "..."}</div>
                <div className="text-slate-500 text-sm font-thin pt-2">{`${Math.ceil(content.length/200)} minute(s) read`}</div>
            </div>
        </div>
    </Link> 
}

export function Avatar ({name, size="small"}:{ name:string, size?:"small"|"big" }){
    return <div className={`relative inline-flex items-center justify-center ${size=="small"?" w-6 h-6 ":" w-9 h-9 "} overflow-hidden bg-gray-600 rounded-full `}>
        <span className={`font-medium text-gray-600 ${size=="small"?" text-sm ":" text-xl "} dark:text-gray-300`}>
            {name.toUpperCase()[0]}
        </span> 
    </div>
}

function Circle(){
    return <div className="h-1 w-1 rounded-full bg-slate-500"></div>
}
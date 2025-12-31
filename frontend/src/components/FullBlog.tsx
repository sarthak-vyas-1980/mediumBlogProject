import type { Blog } from "../hooks"
import { AppBar } from "./AppBar"
import { Avatar } from "./BlogCard"
import ReactMarkdown from "react-markdown" //For space and next line rendering in content
import remarkGfm from "remark-gfm"


export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
        <div className="sticky top-0 bg-white z-10 border-b">
            <AppBar />
        </div>
      <div className="flex justify-center">
        <div className="w-full max-w-3xl px-6 pt-12">
          
          {/* Title */}
          <h1 className="text-4xl font-extrabold text-center">
            {blog.title}
          </h1>

          {/* Author + Date */}
          <div className="flex justify-center items-center gap-2 pt-4 text-slate-600 text-sm">
            <Avatar name={blog.author.name || "Anonymous"} size="small" />
            <span>{blog.author.name || "Anonymous"}</span>
            <span className="text-slate-400">·</span>
            <span>{`${Math.ceil(blog.content.length/200)} minute(s) read`}</span>
            <span className="text-slate-400">·</span>
            <span>Posted on 2nd December, 2023</span>
          </div>

          {/* Content */}
          <div className="pt-8 prose prose-lg max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {blog.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  )
}









// export const FullBlog = ({blog}:{blog: Blog})=>{
//     return <div>
//         <AppBar></AppBar>
//         <div className="flex justify-center">
//             <div className=" px-190 w-full max-w-screen-xl pt-12">
//                 <div className="w-67 px-290 text-4xl font-extrabold flex justify-center">
//                     {blog.title}
//                 </div>
//                 <div className="flex justify-center pt-3">
//                     {/* <div className="text-slate-600 pr-3">
//                         Author
//                     </div> */}
//                     <Avatar name={blog.author.name || "Anonymous"} size={"small"} ></Avatar>
//                     <div className="text-slate-600 pl-2 pr-4">
//                         {blog.author.name || "Anonymous"}
//                     </div>
//                     <div className="text-slate-500 pr-4">
//                         Posted on 2nd December, 2023
//                     </div>
//                 </div>
//                 <div className="pt-8 px-40">
//                         {blog.content}
//                 </div>
//             </div>
//         </div>
//     </div> 
// }
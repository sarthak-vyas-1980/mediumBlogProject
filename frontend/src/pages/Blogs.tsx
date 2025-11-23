// import React from "react"

import { BlogCard } from "../components/BlogCard";
import { AppBar } from "../components/AppBar";
import { useBlogs } from "../hooks";
import { BlogSkeleton } from "../components/BlogSkeleton";

export const Blogs = ()=>{
    const {loading, blogs} = useBlogs();

    if(loading){
        return<div>
            <div> <AppBar /></div>
            <div className= "flex justify-center">
                <div>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                </div>
            </div>
        </div>
    }
    return<>
        <div>
            <div> <AppBar /></div>
            <div className= "flex justify-center">
                <div className= "max-w-xl">
                    {blogs.map( (blog)=> <BlogCard 
                        id={blog.id}
                        AuthorName= {blog.author.name || "Anonymous"} 
                        title= {blog.title}
                        content= {blog.content} 
                        publishedDate= {"3rd Feb 2023"}/>)}
                </div>
            </div>
        </div>
    </>
};
// import React from "react"

import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { FullBlog } from "../components/FullBlog";
import { Spinner } from "../components/Spinner";
import { AppBar } from "../components/AppBar";

export const Blog = ()=>{
    const { id } = useParams<{ id: string }>();
    const {loading, blog} = useBlog({
        id: id || ""
    });
    if(loading){
        return<div>
            <AppBar/>
            <div className="h-screen flex flex-col items-center justify-center">
                <Spinner />
            </div>
        </div>
    }
    if (!blog) {
        return (
            <div>
                Error: Blog not found or failed to load.
            </div>
        );
    }
    return<div>
        <FullBlog blog={blog} />
    </div>
};
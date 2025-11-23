import type { ChangeEvent } from "react";
import { useState } from "react";
import { Link } from "react-router-dom"
import { type SignupInput } from '@sarthaktech/medium-common'
import axios from 'axios'
import { BACKEND_URL } from '../../config.ts'
import { useNavigate } from "react-router-dom";

//trpc
export const Auth = ({type}: {type: "signup"| "signin"}) => {
  const [ postInputs, setPostInputs ] = useState<SignupInput>({
    name:"",
    email:"",
    password:""
  });
  const nav = useNavigate();
  async function sendRequest(){
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"?"signup":"signin"}`, postInputs);
      localStorage.setItem("token", response.data.token);
      nav("/blogs")
    } catch (e){
      window.alert("Error while signing");
    }
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="">
        <div className="text-3xl px-6 font-extrabold">
          {type==="signup" ? "Create an Account" : "Login Account"}
        </div>
        <div className="text-slate-400 text-center mb-4 px-6">
          {type==="signup" ? "Already have an account? ":"Don't have an account? "}
          <Link to={type==="signin" ? "/signup":"/signin"} className="underline">
            {type==="signin" ? "signup":"signin"}
          </Link>
        </div>
        {type==="signup" ? <InputBox label="Name" placeholder="Enter Name" onChange={(e)=>{
          setPostInputs({
            ...postInputs,
            name: e.target.value,
          })
        }} /> : null}
        <InputBox label="Email" placeholder="Enter Email" onChange={(e)=>{
          setPostInputs({
            ...postInputs,
            email: e.target.value,
          })
        }} />
        <InputBox label="Password" type={"password"} placeholder="Enter Password" onChange={(e)=>{
          setPostInputs({
            ...postInputs,
            password: e.target.value,
          })
        }} />
        <button type="button" onClick={sendRequest} className="mt-5 w-full py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
          {type==="signup" ? "Signup" : "Signin"}
        </button>
    </div>
    </div>
  )
}

type labelledInput={
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>)=>void;
  type?: string,
}
function InputBox({label, placeholder, onChange, type}:labelledInput){
  return <div>
    <label htmlFor="first_name" className="block mb-1 mt-1 text-md font-medium text-black-900 ">{label}</label>
    <input onChange={onChange} type={type || "text"} id="first_name" className=" border border-gray-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
  </div>
}
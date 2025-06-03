import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const EmailVerify = () => {
  return (
    <div className="w-screen h-screen bg-white flex justify-center ">
      <div className="w-[25vw] h-fit flex flex-col border shadow border-slate-200 py-2 px-4 mt-[20vh]">
        <Link
          to="/employee/login"
          className="font-semibold w-full text-left text-sm flex gap-1 items-center"
        >
          <ArrowLeft size={18} />
          Back
        </Link>
        <div className="w-full text-center space-y-2">
          <h2 className="font-bold text-xl">Email Verification</h2>
          <p className="text-sm text-slate-400">
            Please enter your code that send to email address
          </p>
        </div>
        <input
          type="text"
          placeholder="Enter your code"
          className="p-2 rounded border-slate-200 placeholder:text-sm placeholder:text-gray-400 outline-1 outline-slate-200 mt-7"
        />
        <button className="bg-blue-500 text-white w-full rounded mt-7 py-1 hover:cursor-pointer">
          Submit
        </button>

        <div className="w-full flex gap-1 text-sm mt-9">
          <p className="text-slate-500">Code not recieve?</p>
          <Link to="/signup" className="text-blue-500">
            Send agin
          </Link>
        </div>
      </div>
    </div>
  )
}

export default EmailVerify
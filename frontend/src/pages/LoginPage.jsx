import React, { useState } from 'react'
import { Mail, CircleUser, Lock, Eye } from 'lucide-react'
import { Link } from "react-router-dom"
import toast, { Toaster } from "react-hot-toast"
import { useAuthStore } from '../store/useAuthStore'
import { Loader2 } from 'lucide-react'

const LoginPage = () => {
  
  //toaster call on click
  //validate form function
  //call signup function on validation successful

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const { login, isLogginIn } = useAuthStore()

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      login(formData)
    }
  }


  return (
    <div className="h-screen flex flex-col justify-center items-center mt-[-3rem]">
      <div className="border flex flex-col justify-center items-center border-slate-600 shadow-lg max-w-[30rem] rounded-lg p-5 m-4">
        <h1 className="text-3xl text-center text-slate-200 font-semibold mt-3 mx-3">Sign in to your account</h1>
        <form onSubmit={handleSubmit} className="flex flex-col m-5 gap-4 w-full">
          <label className="input w-full input-bordered flex items-center gap-2">
            <Mail size={20} />
            <input
              type="email"
              className="grow w-full"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
              placeholder="Email"
            />
          </label>
          <label className="input w-full input-bordered flex items-center gap-2">
            <Lock size={20} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="grow w-full"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
            />
            <Eye
              className="hover:cursor-pointer"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
              size={20}
            />
          </label>
          <button type="submit" className="btn btn-active bg-purple-500 text-black hover:bg-purple-600 w-full">
            {isLogginIn ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Loading...
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>
        <span className="text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="underline hover:text-blue-300">
            Create one today
          </Link>
        </span>
      </div>
    </div>

  )
}

export default LoginPage
import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import {Routes, Route} from "react-router-dom"
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import SignupPage from './pages/SignupPage'
import { axiosInstance } from './lib/axios'
import { useAuthStore } from './store/useAuthStore'
import {Loader} from "lucide-react"
import {Toaster} from "react-hot-toast"

const App = () => {

  const {authUser, checkAuth, isCheckingAuth, onlineUsers} = useAuthStore()

  console.log(onlineUsers)

  useEffect(()=>{
    checkAuth()
  }, [checkAuth])

  if(isCheckingAuth && !authUser){
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className = 'size-10 animate-spin' />
      </div>
    )
  }

  //console.log(authUser)

  return (
    <div>

      <Navbar />

      <Routes>
        <Route path = "/" element = {authUser ? <HomePage /> : <LoginPage />}  />
        <Route path = "/login" element = {!authUser ? <LoginPage /> : <HomePage />} />
        <Route path = "/signup" element = {!authUser ? <SignupPage /> : <HomePage />} />
        <Route path = "/settings" element = {authUser ? <SettingsPage /> : <LoginPage />} />
        <Route path = "/profile" element = {authUser ? <ProfilePage /> : <LoginPage />} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App
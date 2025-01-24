import React from 'react'
import { CircleUser, Settings } from "lucide-react"
import { Link } from "react-router-dom"
import { useAuthStore } from '../store/useAuthStore'

const Navbar = () => {

  const { logout, authUser } = useAuthStore()

  return (
    <div className="navbar bg-base-100 border-b h-[3rem] border-b-slate-700">
      <div className="flex-1">
        <Link to= "/" className="btn btn-ghost text-xl">Telechat</Link>
      </div>
      <div className='h-full mr-3'>
        {authUser && (
          <div className="dropdown dropdown-end ml-5">
            <CircleUser tabIndex={0} role="button" />
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-slate-800 rounded-box z-[1] mt-4 w-52 p-2 shadow">
              <li>
                <Link className="text justify-between" to="/profile">Profile</Link>
              </li>
              <li onClick={logout}><a className='text'>Logout</a></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
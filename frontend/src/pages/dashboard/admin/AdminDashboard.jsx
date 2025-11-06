import React from 'react'
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom'

function AdminDasgboard() {
  return (
    <div className='h-screen flex'>
      <div className='w-64 bg-gray-400 text-white'>
        <Sidebar />
      </div>

      <div className='flex-1'>
        <Outlet />
      </div>
    </div>
  )
}

export default AdminDasgboard
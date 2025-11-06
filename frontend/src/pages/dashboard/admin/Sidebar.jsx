import React from 'react'
import Logo from './../../../components/common/Logo';
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineHomeRepairService, MdAttachMoney } from "react-icons/md";
import { IoBookmarkOutline, IoSettingsOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

function Sidebar() {
  const sidebarMenu = [
    { menu: "Dashboard", icon: <LuLayoutDashboard size={20} />, path: '/dashboard' },
    { menu: "Products", icon: <MdOutlineHomeRepairService size={20} />, path: '/dashboard/products' },
    { menu: "Blogs", icon: <MdAttachMoney size={20} />, path: '/dashboard/blogs' },
    { menu: "Orders", icon: <IoBookmarkOutline size={20} />, path: '/dashboard/orders' },
    { menu: "Users", icon: <MdAttachMoney size={20} />, path: '/dashboard/users' },
    { menu: "Payment", icon: <IoSettingsOutline size={20} />, path: '/dashboard/payment' },
  ];
  return (
    <div className="h-screen text-white flex flex-col justify-between p-4">
      {/* Logo */}
      <Logo />

      {/* Sidebar Menu */}
      <nav className="flex flex-col gap-3 flex-1">
        {sidebarMenu.map((item) => (
          <Link
            to={item.path}
            key={item.menu}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition 
              ${location.pathname === item.path
                ? "bg-DustyRose text-lavender"
                : "hover:bg-gray-700"
              }`}
          >
            {item.icon}
            <span>{item.menu}</span>
          </Link>
        ))}
      </nav>

      {/* Profile Section */}
      <button className="border-t border-gray-700 pt-4 ">
        Logout
      </button>
    </div>
  )
}

export default Sidebar
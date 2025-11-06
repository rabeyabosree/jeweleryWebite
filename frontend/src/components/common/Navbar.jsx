import React, { useState } from "react";
import Logo from "./Logo";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { BsCart2 } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import ProfileMenu from "./ProfileMenu";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenu, setIsProfileMenu] = useState(false);
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem("user"));
  const { cartItems } = useSelector((state) => state.cart);
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Blogs", path: "/blogs" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="flex items-center justify-between w-full py-4 px-6 fixed top-0 left-0 z-50">
      {/* Logo */}
      <Logo />

      {/* Desktop Menu */}
      <nav className="hidden md:flex space-x-8">
        {menuItems.map((menu) => (
          <a
            key={menu.name}
            href={menu.path}
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            {menu.name}
          </a>
        ))}
      </nav>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Cart */}
        <button onClick={() => navigate("/cart")} className="text-xl text-gray-700 relative hover:text-blue-600 transition">
          <BsCart2 />
          <span className="absolute -top-3 text-[12px] bg-[#fffaf7] text-[#d4a373] hover:text-[#c98b5a] py-0.5 px-1.5 rounded-full">
            {/* {totalItems => 0 ? "" : totalItems} */}
            {totalItems}
          </span>
        </button>

        {/* Profile / Login / Admin */}
        {user?.role === "user" ? (
          <div className="relative">
            <button
              onClick={() => setIsProfileMenu(!isProfileMenu)}
              className="text-2xl text-gray-700 hover:text-blue-600 transition"
            >
              <HiOutlineUserCircle />
            </button>
            {isProfileMenu && (
              <div className="absolute right-0 mt-2">
                <ProfileMenu />
              </div>
            )}
          </div>
        ) : user?.role === "admin" ? (
          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm bg-[#d4a373] text-white px-4 py-1.5 rounded-md hover:bg-[#c98b5a] transition"
          >
            Dashboard
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="text-sm bg-[#d4a373] text-white px-4 py-1.5 rounded-md hover:bg-[#c98b5a] transition"
          >
            Login
          </button>
        )}


        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-gray-700 hover:text-blue-600 transition"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FiMenu />
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <nav className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center py-4 space-y-3 md:hidden">
          {menuItems.map((menu) => (
            <a
              key={menu.name}
              href={menu.path}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)} // close after clicking
            >
              {menu.name}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

export default Navbar;

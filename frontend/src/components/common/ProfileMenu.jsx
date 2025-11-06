import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/reducers/authReducer";


function ProfileMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const menus = [
    { name: "Orders", path: "/orders" },
    { name: "Privacy", path: "/privacy" },
    { name: "Logout", action: () => dispatch(logout()) },
  ];

  const handleClick = (menu) => {
    if (menu.path) navigate(menu.path);
    if (menu.action) menu.action();
  };

  return (
    <div className="absolute top-4 right-0 bg-white shadow-lg rounded-md w-48 py-2 z-50">
      {menus.map((menu) => (
        <button
          key={menu.name}
          onClick={() => handleClick(menu)}
          className="w-full text-left px-4 py-2 hover:bg-[#d4a373] hover:text-white transition rounded-md"
        >
          {menu.name}
        </button>
      ))}
    </div>
  );
}

export default ProfileMenu;

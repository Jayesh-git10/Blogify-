import React, { useEffect } from "react";
import { assets } from "../../assets/assets";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import UserSidebar from "../../components/user/UserSidebar";

const UserLayout = () => {
  const { axios, token, setToken } = useAppContext();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    axios.defaults.headers.common["Authorization"] = null;
    setToken(null);
    navigate("/user/login");
  };
  useEffect(() => {
    if (!token) {
      navigate("/user/login");
    }
  }, [token, navigate]);

  if (!token) return null;

  return (
    <>
      <div className="flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200">
        <img
          src={assets.logo}
          alt="Logo"
          className="w-32 sm:w-40 cursor-pointer"
          onClick={() => navigate("/")}
        />
        <button
          onClick={logout}
          className="text-sm px-6 py-2 bg-primary text-white rounded-full"
        >
          Logout
        </button>
      </div>
      <div className="flex h-[calc(100vh-70px)] overflow-hidden">
        <UserSidebar />
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default UserLayout;

import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import * as jwtDecode from "jwt-decode"; // ✅ Use namespace import

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [input, setInput] = useState("");

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/blog/all");
      if (data.success) setBlogs(data.blogs);
    } catch (e) {
      toast.error(e.message);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decoded = jwtDecode.default(storedToken); // ✅ use .default with namespace import
        setToken(storedToken);
        setUser(decoded);
        axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
      } catch (error) {
        console.error("Invalid token:", error);
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
      }
    }

    fetchBlogs();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
    navigate("/user/login");
  };

  const value = {
    axios,
    navigate,
    token,
    setToken,
    user,
    setUser,
    blogs,
    setBlogs,
    input,
    setInput,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);

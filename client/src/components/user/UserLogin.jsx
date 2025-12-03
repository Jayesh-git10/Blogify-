import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";
import { jwtDecode } from "jwt-decode";

const UserLogin = () => {
  const navigate = useNavigate();
  const { axios, setToken, setUser } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/user/login", { email, password });

      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);

        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

        const decoded = jwtDecode(data.token);
        setUser(decoded);

        navigate(`/user/${decoded.id}`);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
     <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-sm p-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg">

        <div className="text-center">
          <h1 className="text-3xl font-bold">
            <span className="text-primary">Admin</span> Login
          </h1>
          <p className="font-light">
            Enter your credentials to access the admin panel
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 text-gray-700">
          <div className="flex flex-col">
            <label>Email</label>
            <input
              type="email"
              required
              placeholder="your email id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-b-2 border-gray-300 p-2 outline-none mb-6"
            />
          </div>

          <div className="flex flex-col">
            <label>Password</label>
            <input
              type="password"
              required
              placeholder="your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-b-2 border-gray-300 p-2 outline-none mb-6"
            />
          </div>
             <div
            className="text-sm text-primary cursor-pointer mb-4"
            onClick={() => navigate('/user/register')}
          >
            Register Here
          </div>
          <button
            type="submit"
            className="w-full py-3 font-medium bg-primary text-white rounded hover:bg-primary/90 transition-all"
          >
            Login
          </button>
        </form>

      </div>
    </div>
  );
};

export default UserLogin;

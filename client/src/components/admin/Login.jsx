import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { axios, setToken } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/admin/login", {
        email,
        password,
      });

      if (data.success) {
        // Save token
        setToken(data.token);
        localStorage.setItem("token", data.token);

        // Set axios default auth header
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

        toast.success("Login successful!");

        // Redirect to admin dashboard
        navigate("/admin/dashboard");
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Something went wrong, try again"
      );
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

export default Login;

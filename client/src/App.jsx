import React from "react";
import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Blog from "./pages/Blog";

// Admin
import Layout from "./pages/admin/Layout";
import Dashboard from "./pages/admin/Dashboard";
import AddBlog from "./pages/admin/AddBlog";
import ListBlog from "./pages/admin/ListBlog";
import Comments from "./pages/admin/Comments";
import Login from "./components/admin/Login";

// User
import UserLayout from "./pages/user/UserLayout";
import UserLogin from "./components/user/UserLogin";
import Register from "./components/user/UserRegister";
import UserDashboard from "./pages/user/UserDashboard";
import UserListBlog from "./pages/user/UserListBlog";
import UserAddBlog from "./pages/user/UserAddBlog";

// Role selection page
import Role from "./components/Role";

import "quill/dist/quill.snow.css";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";

const App = () => {
  const { token } = useAppContext();

  return (
    <div>
      <Toaster />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/role" element={<Role />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={token ? <Layout /> : <Role />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="addBlog" element={<AddBlog />} />
          <Route path="listBlog" element={<ListBlog />} />
          <Route path="comments" element={<Comments />} />
        </Route>

        {/* User Auth Routes */}
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/register" element={<Register />} />

        {/* User Protected Routes */}
        <Route path="/user/:userId" element={token ? <UserLayout /> : <Role />}>
          <Route index element={<UserDashboard />} />
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="addBlog" element={<UserAddBlog />} />
          <Route path="listBlog" element={<UserListBlog />} />
          <Route path="comments" element={<Comments />} />
        </Route>

        {/* Fallback route for unmatched URLs */}
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;

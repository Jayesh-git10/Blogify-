import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const navigate = useNavigate();
  const { axios } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/user/register', { name, email, password });

      if (data.success) {
        toast.success(data.message);
        navigate('/user/login');
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-sm p-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg">

        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold">
            <span className="text-primary">Register</span> User
          </h1>
          <p className="font-light">Create your account to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 text-gray-700">

          <div className="flex flex-col">
            <label>Name</label>
            <input
              type="text"
              required
              placeholder="your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-b-2 border-gray-300 p-2 outline-none mb-4"
            />
          </div>

          <div className="flex flex-col">
            <label>Email</label>
            <input
              type="email"
              required
              placeholder="your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-b-2 border-gray-300 p-2 outline-none mb-4"
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
              className="border-b-2 border-gray-300 p-2 outline-none mb-4"
            />
          </div>

          <div
            className="text-sm text-primary cursor-pointer mb-4"
            onClick={() => navigate('/user/login')}
          >
            Already have an account?
          </div>

          <button
            type="submit"
            className="w-full py-3 font-medium bg-primary text-white rounded hover:bg-primary/90 transition-all"
          >
            Register
          </button>

        </form>
      </div>
    </div>
  );
};

export default Register;

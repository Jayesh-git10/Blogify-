import React from 'react'
import { assets } from '../assets/assets.js'
import { useAppContext } from '../context/AppContext.jsx'

const Navbar = () => {
  const { navigate, token, user } = useAppContext();

  const handleClick = () => {
    if (!token) {
      navigate("/role"); // ask user to select role
    } else if (user?.role === "Admin") {
      navigate("/admin"); // go to admin dashboard
    } else {
      navigate(`/user/${user.id}`); // go to user dashboard
    }
  };

  return (
    <div className='flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32'>
      <img
        src={assets.logo}
        onClick={() => navigate('/')}
        alt="logo"
        className='w-32 sm:w-44 cursor-pointer'
      />

      <button
        className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5'
        onClick={handleClick}
      >
        {token ? 'Dashboard' : 'Login'}
        <img src={assets.arrow} className='w-3' alt="arrow" />
      </button>
    </div>
  )
}

export default Navbar;

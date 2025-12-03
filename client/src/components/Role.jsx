import React from 'react'
import { useNavigate } from 'react-router-dom'

const Role = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col gap-4 items-center justify-center h-screen">

            <h1 className="text-3xl font-bold">
                <span className="text-primary">Select Your</span> Role
            </h1>

            <p className="font-light mb-4">Please select your role</p>

            <button
                onClick={() => navigate('/user/register')}
                className="w-60 py-3 font-medium bg-primary text-white rounded hover:bg-primary/90 transition-all"
            >
                User
            </button>

            <button
                onClick={() => navigate('/admin/login')}
                className="w-60 py-3 font-medium bg-primary text-white rounded hover:bg-primary/90 transition-all"
            >
                Admin
            </button>
        </div>
    );
};

export default Role;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch('http://localhost:4000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      const data = await res.json();
      // Decode JWT to get userId
      function getUserIdFromToken(token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          return payload.userId;
        } catch (err) {
          console.error('Error decoding token:', err);
          return null;
        }
      }
      const userId = getUserIdFromToken(data.token);
      if (userId) {
        localStorage.setItem('userId', userId);
        navigate('/dashboard');
      } else {
        alert('Login failed: Could not extract userId');
      }
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="flex-1 flex flex-col justify-center px-10 py-16 bg-white">
        <div className="max-w-md mx-auto w-full">
          <h1 className="text-4xl font-bold mb-8">Sign In to Your Account</h1>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">Email address</label>
            <input type="email" className="w-full border rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-green-600" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">Password</label>
            <input type="password" className="w-full border rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-green-600" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button className="w-full py-3 bg-green-700 text-white rounded-lg font-semibold text-lg hover:bg-green-800 transition mb-6" onClick={handleLogin}>Sign In</button>
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="mx-2 text-gray-400 text-base">Or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <div className="flex space-x-4 mb-6">
            <button className="flex-1 py-3 bg-white border rounded-lg flex items-center justify-center font-semibold text-gray-700 hover:bg-gray-100 transition">
              <img src="/google-icon.svg" alt="Google" className="h-5 w-5 mr-2" /> Sign in with Google
            </button>
            <button className="flex-1 py-3 bg-white border rounded-lg flex items-center justify-center font-semibold text-gray-700 hover:bg-gray-100 transition">
              <img src="/apple-icon.svg" alt="Apple" className="h-5 w-5 mr-2" /> Sign in with Apple
            </button>
          </div>
          <div className="text-center text-lg mt-4">
            Don't have an account? <button className="text-green-700 underline" onClick={() => navigate("/signup")}>Signup</button>
          </div>
        </div>
      </div>
      {/* Right Section */}
      <div className="flex-1 hidden md:block bg-gray-100 relative">
        <img src="/plant.jpg" alt="Login Graphic" className="absolute inset-0 w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default Login;

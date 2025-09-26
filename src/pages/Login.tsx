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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-100 to-blue-100">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center">
        <img src="/WhatsApp Image 2025-09-11 at 02.43.41_bd8ddeec.jpg" alt="Grammoz Logo" className="h-20 w-20 mb-6 rounded-xl shadow-lg" />
        <h1 className="text-3xl font-extrabold mb-6 text-gray-900 text-center">Sign In to Your Account</h1>
        <div className="w-full">
          <div className="mb-4">
            <label className="block text-base font-medium mb-2 text-blue-700">Email address</label>
            <input type="email" className="w-full border border-blue-300 rounded-lg px-4 py-3 text-base bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="block text-base font-medium mb-2 text-blue-700">Password</label>
            <input type="password" className="w-full border border-blue-300 rounded-lg px-4 py-3 text-base bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold text-base hover:bg-blue-700 transition mb-6" onClick={handleLogin}>Sign In</button>
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="mx-2 text-gray-400 text-base">Or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <div className="flex space-x-4 mb-6">
            <button className="flex-1 py-3 bg-white border border-blue-300 rounded-lg flex items-center justify-center font-semibold text-blue-700 hover:bg-blue-100 transition">
              <img src="https://www.gstatic.com/images/branding/product/1x/gsa_64dp.png" alt="Google" className="h-5 w-5 mr-2" /> Sign in with Google
            </button>
            <button className="flex-1 py-3 bg-white border border-blue-300 rounded-lg flex items-center justify-center font-semibold text-blue-700 hover:bg-blue-100 transition">
              <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" className="h-5 w-5 mr-2" /> Sign in with Apple
            </button>
          </div>
          <div className="text-center text-base mt-4 text-blue-700">
            Don't have an account? <button className="text-blue-500 underline" onClick={() => navigate("/signup")}>Signup</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

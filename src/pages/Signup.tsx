import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!name || !email || !password || !agree) {
      alert('Please fill all fields and agree to the terms.');
      return;
    }
    const res = await fetch('http://localhost:4000/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
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
        alert('Signup failed: Could not extract userId');
      }
    } else {
      const error = await res.json();
      alert(error.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-100 to-blue-100">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center">
        <img src="/WhatsApp Image 2025-09-11 at 02.43.41_bd8ddeec.jpg" alt="Grammoz Logo" className="h-20 w-20 mb-2 rounded-xl shadow-lg" />
        <span className="text-2xl font-bold text-blue-700 mb-4">GraMoz</span>
        <h1 className="text-3xl font-extrabold mb-6 text-gray-900 text-center">Create your account</h1>
        <div className="w-full">
          <div className="mb-4">
            <label className="block text-base font-medium mb-2 text-blue-700">Name</label>
            <input type="text" className="w-full border border-blue-300 rounded-lg px-4 py-3 text-base bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter your name" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="block text-base font-medium mb-2 text-blue-700">Email address</label>
            <input type="email" className="w-full border border-blue-300 rounded-lg px-4 py-3 text-base bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="block text-base font-medium mb-2 text-blue-700">Password</label>
            <input type="password" className="w-full border border-blue-300 rounded-lg px-4 py-3 text-base bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <div className="flex items-center mb-6">
            <input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} className="mr-2" />
            <span className="text-blue-700">I agree to the <a href="#" className="underline text-blue-500">terms & policy</a></span>
          </div>
          <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold text-base hover:bg-blue-700 transition mb-6" onClick={handleSignup}>Signup</button>
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
            Have an account? <button className="text-blue-500 underline" onClick={() => navigate("/login")}>Sign In</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

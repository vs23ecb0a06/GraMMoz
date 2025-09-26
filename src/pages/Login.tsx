import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sun, Moon } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const navigate = useNavigate();
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };
  const isDark = theme === "dark";

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
    <div className={isDark ? "min-h-screen flex items-center justify-center bg-gradient-to-br from-[#181C23] via-[#23272f] to-[#1a2332]" : "min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-blue-200"}>
      <div className={isDark ? "max-w-lg w-full bg-[#23272f]/80 rounded-3xl shadow-2xl p-10 flex flex-col items-center backdrop-blur-lg relative" : "max-w-lg w-full bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center relative"}>
        <button onClick={toggleTheme} className={isDark ? "absolute top-6 right-6 p-2 rounded-full bg-[#23272f] text-blue-200 hover:bg-blue-900 transition" : "absolute top-6 right-6 p-2 rounded-full bg-white text-blue-700 hover:bg-blue-100 transition"}>
          {isDark ? <Sun size={22} /> : <Moon size={22} />}
        </button>
        <img src="/WhatsApp Image 2025-09-11 at 02.43.41_bd8ddeec.jpg" alt="Grammoz Logo" className="h-20 w-20 mb-6 rounded-xl shadow-lg border-2 border-blue-900" />
        <h1 className={isDark ? "text-3xl font-extrabold mb-6 text-white text-center" : "text-3xl font-extrabold mb-6 text-blue-900 text-center"}>Sign In to Your Account</h1>
        <div className="w-full">
          <div className="mb-4">
            <label className="block text-base font-medium mb-2 text-blue-200">Email address</label>
            <input type="email" className={isDark ? "w-full border border-blue-900 rounded-lg px-4 py-3 text-base bg-[#181C23] text-white focus:outline-none focus:ring-2 focus:ring-blue-400" : "w-full border border-blue-300 rounded-lg px-4 py-3 text-base bg-blue-50 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400"} placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="block text-base font-medium mb-2 text-blue-200">Password</label>
            <input type="password" className={isDark ? "w-full border border-blue-900 rounded-lg px-4 py-3 text-base bg-[#181C23] text-white focus:outline-none focus:ring-2 focus:ring-blue-400" : "w-full border border-blue-300 rounded-lg px-4 py-3 text-base bg-blue-50 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400"} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button className="w-full py-3 bg-blue-700 text-white rounded-lg font-semibold text-base hover:bg-blue-900 transition mb-6" onClick={handleLogin}>Sign In</button>
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-blue-900" />
            <span className="mx-2 text-blue-400 text-base">Or</span>
            <div className="flex-1 h-px bg-blue-900" />
          </div>
          <div className="flex space-x-4 mb-6">
            <button className={isDark ? "flex-1 py-3 bg-[#181C23] border border-blue-900 rounded-lg flex items-center justify-center font-semibold text-blue-200 hover:bg-blue-900 transition" : "flex-1 py-3 bg-blue-50 border border-blue-300 rounded-lg flex items-center justify-center font-semibold text-blue-900 hover:bg-blue-100 transition"}>
              <img src="https://www.gstatic.com/images/branding/product/1x/gsa_64dp.png" alt="Google" className="h-5 w-5 mr-2" /> Sign in with Google
            </button>
            <button className={isDark ? "flex-1 py-3 bg-[#181C23] border border-blue-900 rounded-lg flex items-center justify-center font-semibold text-blue-200 hover:bg-blue-900 transition" : "flex-1 py-3 bg-blue-50 border border-blue-300 rounded-lg flex items-center justify-center font-semibold text-blue-900 hover:bg-blue-100 transition"}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" className="h-5 w-5 mr-2" /> Sign in with Apple
            </button>
          </div>
          <div className="text-center text-base mt-4 text-blue-200">
            Don't have an account? <button className="text-blue-400 underline" onClick={() => navigate("/signup")}>Signup</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

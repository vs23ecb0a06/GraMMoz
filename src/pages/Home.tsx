import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sun, Moon } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  useEffect(() => {
    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  }, []);
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };
  const isDark = theme === "dark";
  return (
    <div className={isDark ? "min-h-screen bg-gradient-to-br from-[#181C23] via-[#23272f] to-[#1a2332] flex flex-col relative overflow-hidden" : "min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-200 flex flex-col relative overflow-hidden"}>
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {isDark ? (
          <>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#23272f]/60 via-[#181C23]/40 to-[#1a2332]/30 blur-2xl"></div>
            <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-800/20 rounded-full blur-2xl animate-pulse"></div>
          </>
        ) : (
          <>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/60 via-blue-200/40 to-blue-400/30 blur-2xl"></div>
            <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-300/20 rounded-full blur-2xl animate-pulse"></div>
          </>
        )}
      </div>
      {/* Header with glassmorphism */}
      <header className={isDark ? "w-full flex items-center justify-between px-10 py-6 shadow-lg bg-[#23272f]/80 backdrop-blur-xl sticky top-0 z-20 rounded-b-2xl border-b border-[#23272f]" : "w-full flex items-center justify-between px-10 py-6 shadow-lg bg-white/80 backdrop-blur sticky top-0 z-20 rounded-b-2xl border-b border-blue-100"}>
        <div className="flex items-center gap-3">
          <img
            src="/WhatsApp Image 2025-09-11 at 02.43.41_bd8ddeec.jpg"
            alt="Logo"
            className="h-10 w-10 rounded-xl shadow-lg border-2 border-blue-900"
          />
          <span className={isDark ? "text-3xl font-extrabold text-white tracking-tight" : "text-3xl font-extrabold text-blue-900 tracking-tight"}>
            GraMoz
          </span>
        </div>
        <nav className="flex gap-8">
          <a
            href="#"
            className={isDark ? "text-blue-300 hover:text-white text-lg font-semibold transition" : "text-blue-700 hover:text-blue-900 text-lg font-semibold transition"}
          >
            Product
          </a>
          <a
            href="#features"
            className={isDark ? "text-blue-300 hover:text-white text-lg font-semibold transition" : "text-blue-700 hover:text-blue-900 text-lg font-semibold transition"}
          >
            Features
          </a>
          <a
            href="#"
            className={isDark ? "text-blue-300 hover:text-white text-lg font-semibold transition" : "text-blue-700 hover:text-blue-900 text-lg font-semibold transition"}
          >
            Pricing
          </a>
          <a
            href="#"
            className={isDark ? "text-blue-300 hover:text-white text-lg font-semibold transition" : "text-blue-700 hover:text-blue-900 text-lg font-semibold transition"}
          >
            About
          </a>
        </nav>
        <div className="flex gap-4 items-center">
          <button className={isDark ? "px-7 py-3 rounded-2xl bg-gradient-to-r from-blue-700 to-blue-500 text-white font-bold shadow-xl hover:scale-105 hover:from-blue-800 transition" : "px-7 py-3 rounded-2xl bg-blue-700 text-white font-bold shadow hover:bg-blue-900 transition"} onClick={() => navigate('/signup')}>
            Get started
          </button>
          <button className={isDark ? "px-4 py-2 rounded-xl bg-[#23272f] text-blue-200 border border-blue-700 font-semibold shadow hover:bg-blue-900 transition" : "px-4 py-2 rounded-xl bg-white text-blue-700 border border-blue-200 font-semibold shadow hover:bg-blue-100 transition"} onClick={toggleTheme}>
            {isDark ? <Sun size={22} /> : <Moon size={22} />}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center flex-1 w-full max-w-4xl mx-auto px-6 pt-20 pb-8 z-10">
        <div className="w-full flex flex-col items-center justify-center mb-10">
          <h1 className={isDark ? "text-4xl md:text-5xl font-extrabold mb-3 text-white text-center leading-tight tracking-tight drop-shadow-xl" : "text-4xl md:text-5xl font-extrabold mb-3 text-blue-900 text-center leading-tight tracking-tight drop-shadow-xl"}>
            Welcome to GraMoz
          </h1>
          <h2 className={isDark ? "text-xl md:text-2xl font-medium mb-5 text-blue-200 text-center" : "text-xl md:text-2xl font-medium mb-5 text-blue-700 text-center"}>
            Modern classroom management for assignments, calls, and analytics
          </h2>
          <form className={isDark ? "flex items-center gap-3 w-full max-w-md bg-[#23272f]/80 rounded-xl shadow-lg p-2 border border-blue-900 mx-auto mb-2 backdrop-blur-lg" : "flex items-center gap-3 w-full max-w-md bg-white rounded-xl shadow-lg p-2 border border-blue-200 mx-auto mb-2"} onSubmit={e => { e.preventDefault(); navigate('/signup'); }}>
            <input
              type="email"
              placeholder="Enter your email..."
              className={isDark ? "flex-1 px-4 py-2 rounded-lg bg-[#181C23] text-white border-none focus:outline-none focus:ring-2 focus:ring-blue-400 text-base font-medium" : "flex-1 px-4 py-2 rounded-lg bg-blue-50 text-blue-900 border-none focus:outline-none focus:ring-2 focus:ring-blue-400 text-base font-medium"}
            />
            <button
              type="submit"
              className={isDark ? "px-5 py-2 rounded-lg bg-blue-700 text-white font-semibold shadow hover:bg-blue-900 transition text-base" : "px-5 py-2 rounded-lg bg-blue-700 text-white font-semibold shadow hover:bg-blue-900 transition text-base"}
            >
              Get Started
            </button>
          </form>
        </div>
        {/* Feature Cards Grid */}
        <section
          id="features"
          className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
        >
          <div className={isDark ? "bg-[#23272f]/80 backdrop-blur-lg rounded-2xl shadow-lg p-7 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition duration-200 border-t-4 border-blue-700" : "bg-white rounded-2xl shadow-lg p-7 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition duration-200 border-t-4 border-blue-400"}>
            <svg
              className={isDark ? "h-10 w-10 mb-3 text-blue-400" : "h-10 w-10 mb-3 text-blue-600"}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 0h6"
              />
            </svg>
            <h3 className={isDark ? "text-lg font-bold text-white mb-1" : "text-lg font-bold text-blue-900 mb-1"}>
              Assignments
            </h3>
            <p className={isDark ? "text-blue-200 text-center text-base" : "text-blue-700 text-center text-base"}>
              Create, manage, and track assignments with deadlines and submissions.
            </p>
          </div>
          <div className={isDark ? "bg-[#23272f]/80 backdrop-blur-lg rounded-2xl shadow-lg p-7 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition duration-200 border-t-4 border-green-700" : "bg-white rounded-2xl shadow-lg p-7 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition duration-200 border-t-4 border-green-400"}>
            <svg
              className={isDark ? "h-10 w-10 mb-3 text-green-400" : "h-10 w-10 mb-3 text-green-600"}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10l4.553-2.276A2 2 0 0122 9.618V16a2 2 0 01-2 2H6a2 2 0 01-2-2V9.618a2 2 0 012.447-1.894L11 10m4 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v4"
              />
            </svg>
            <h3 className={isDark ? "text-lg font-bold text-white mb-1" : "text-lg font-bold text-blue-900 mb-1"}>
              Joinable Calls
            </h3>
            <p className={isDark ? "text-blue-200 text-center text-base" : "text-blue-700 text-center text-base"}>
              Instantly join or schedule calls for seamless communication.
            </p>
          </div>
          <div className={isDark ? "bg-[#23272f]/80 backdrop-blur-lg rounded-2xl shadow-lg p-7 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition duration-200 border-t-4 border-purple-700" : "bg-white rounded-2xl shadow-lg p-7 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition duration-200 border-t-4 border-purple-400"}>
            <svg
              className={isDark ? "h-10 w-10 mb-3 text-purple-400" : "h-10 w-10 mb-3 text-purple-600"}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 17a4 4 0 100-8 4 4 0 000 8zm0 0v2m0-2v-2m0 2h2m-2 0h-2"
              />
            </svg>
            <h3 className={isDark ? "text-lg font-bold text-white mb-1" : "text-lg font-bold text-blue-900 mb-1"}>
              Statistics
            </h3>
            <p className={isDark ? "text-blue-200 text-center text-base" : "text-blue-700 text-center text-base"}>
              Track classroom progress, attendance, and analytics in real time.
            </p>
          </div>
          <div className={isDark ? "bg-[#23272f]/80 backdrop-blur-lg rounded-2xl shadow-lg p-7 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition duration-200 border-t-4 border-pink-700" : "bg-white rounded-2xl shadow-lg p-7 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition duration-200 border-t-4 border-pink-400"}>
            <svg
              className={isDark ? "h-10 w-10 mb-3 text-pink-400" : "h-10 w-10 mb-3 text-pink-600"}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3"
              />
            </svg>
            <h3 className={isDark ? "text-lg font-bold text-white mb-1" : "text-lg font-bold text-blue-900 mb-1"}>
              Beautiful UI
            </h3>
            <p className={isDark ? "text-blue-200 text-center text-base" : "text-blue-700 text-center text-base"}>
              Enjoy a clean, intuitive, and responsive interface for all devices.
            </p>
          </div>
        </section>
        {/* Floating CTA Button */}
        <button className={isDark ? "fixed bottom-8 right-8 px-7 py-3 rounded-full bg-gradient-to-r from-blue-700 to-blue-500 text-white font-bold shadow-xl text-base hover:scale-105 transition z-50" : "fixed bottom-8 right-8 px-7 py-3 rounded-full bg-blue-700 text-white font-bold shadow-xl text-base hover:bg-blue-900 transition z-50"} onClick={() => navigate('/signup')}>
          Try GraMoz Now
        </button>
      </main>
    </div>
  );
};

export default Home;

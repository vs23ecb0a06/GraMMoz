import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-100 to-blue-100 relative">
      {/* Navigation Bar */}
      <div className="absolute top-0 left-0 w-full flex items-center justify-between px-8 py-4 z-20">
        <nav className="flex gap-8">
          <a
            href="#"
            className="text-blue-500 hover:text-blue-700 text-sm font-medium transition"
          >
            Product
          </a>
          <a
            href="#"
            className="text-blue-500 hover:text-blue-700 text-sm font-medium transition"
          >
            Features
          </a>
          <a
            href="#"
            className="text-blue-500 hover:text-blue-700 text-sm font-medium transition"
          >
            Pricing
          </a>
          <a
            href="#"
            className="text-blue-500 hover:text-blue-700 text-sm font-medium transition"
          >
            About
          </a>
        </nav>
        <button
          className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
          onClick={() => {
            localStorage.setItem("theme", "light");
            navigate("/login");
          }}
        >
          Get started
        </button>
      </div>

      {/* Decorative stars */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-20 w-1 h-1 bg-blue-300 rounded-full opacity-30"></div>
        <div className="absolute top-32 right-32 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-40"></div>
        <div className="absolute bottom-24 left-1/3 w-1 h-1 bg-blue-200 rounded-full opacity-30"></div>
        <div className="absolute bottom-10 right-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-30"></div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-5xl px-6 z-10 pt-20 pb-8">
        <div className="flex-1 flex flex-col items-start justify-center py-12">
          <span className="inline-block mb-4 px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold shadow">
            Effortless classroom management, powered by AI
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-left text-blue-900 leading-tight drop-shadow">
            Your classroom, <br /> beautifully organized
          </h1>
          <h2 className="text-lg md:text-xl font-medium mb-4 text-left text-blue-700">
            Create, manage, and track everything in one place.
          </h2>
          <p className="text-base text-blue-600 mb-8 max-w-lg text-left">
            Grammoz helps you turn raw ideas into organized assignments,
            progress, and collaboration. Stay productive and connected with your
            team and students.
          </p>
          <form className="flex items-center gap-2 w-full max-w-md">
            <input
              type="email"
              placeholder="Enter your email..."
              className="flex-1 px-4 py-3 rounded-lg bg-gray-100 text-gray-900 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
            >
              Get Started
            </button>
          </form>
        </div>
        <div className="flex-1 flex items-center justify-center py-12">
          <div className="bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 rounded-2xl shadow-2xl p-8 flex flex-col items-center">
            <img
              src="/WhatsApp Image 2025-09-11 at 02.43.41_bd8ddeec.jpg"
              alt="Grammoz Logo"
              className="h-32 w-32 mb-6 rounded-xl shadow-lg"
            />
            <span className="text-blue-900 text-2xl font-bold">Grammoz.AI</span>
          </div>
        </div>
      </div>
      {/* Remove Testimonial/Rating Section */}
    </div>
  );
};

export default Home;

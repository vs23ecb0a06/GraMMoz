import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#181C23] via-[#23272f] to-[#2a2e5a] relative">
      {/* Navigation Bar */}
      <div className="absolute top-0 left-0 w-full flex items-center justify-between px-8 py-4 z-20">
        <span className="text-white text-xl font-bold tracking-wide">
          Grammoz.AI
        </span>
        <nav className="flex gap-8">
          <a
            href="#"
            className="text-blue-200 hover:text-white text-sm font-medium transition"
          >
            Product
          </a>
          <a
            href="#"
            className="text-blue-200 hover:text-white text-sm font-medium transition"
          >
            Features
          </a>
          <a
            href="#"
            className="text-blue-200 hover:text-white text-sm font-medium transition"
          >
            Pricing
          </a>
          <a
            href="#"
            className="text-blue-200 hover:text-white text-sm font-medium transition"
          >
            About
          </a>
        </nav>
        <button className="px-5 py-2 rounded-lg bg-white text-blue-700 font-semibold shadow hover:bg-blue-100 transition">
          Get started
        </button>
      </div>

      {/* Decorative stars */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-20 w-1 h-1 bg-white rounded-full opacity-30"></div>
        <div className="absolute top-32 right-32 w-1.5 h-1.5 bg-blue-300 rounded-full opacity-40"></div>
        <div className="absolute bottom-24 left-1/3 w-1 h-1 bg-white rounded-full opacity-30"></div>
        <div className="absolute bottom-10 right-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-30"></div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-5xl px-6 z-10 pt-20 pb-8">
        <div className="flex-1 flex flex-col items-start justify-center py-12">
          <span className="inline-block mb-4 px-4 py-1 rounded-full bg-blue-900 text-blue-200 text-xs font-semibold shadow">
            Effortless classroom management, powered by AI
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-left text-white leading-tight drop-shadow">
            Your classroom, <br /> beautifully organized
          </h1>
          <h2 className="text-lg md:text-xl font-medium mb-4 text-left text-blue-200">
            Create, manage, and track everything in one place.
          </h2>
          <p className="text-base text-blue-100 mb-8 max-w-lg text-left">
            Grammoz helps you turn raw ideas into organized assignments,
            progress, and collaboration. Stay productive and connected with your
            team and students.
          </p>
          <form className="flex items-center gap-2 w-full max-w-md">
            <input
              type="email"
              placeholder="Enter your email..."
              className="flex-1 px-4 py-3 rounded-lg bg-[#23272f] text-white border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <div className="bg-gradient-to-br from-blue-700 via-blue-500 to-blue-300 rounded-2xl shadow-2xl p-8 flex flex-col items-center">
            <img
              src="/WhatsApp Image 2025-09-11 at 02.43.41_bd8ddeec.jpg"
              alt="Grammoz Logo"
              className="h-32 w-32 mb-6 rounded-xl shadow-lg"
            />
            <span className="text-white text-2xl font-bold">Grammoz.AI</span>
          </div>
        </div>
      </div>
      {/* Testimonial/Rating Section */}
      <div className="w-full flex flex-col items-center mt-12 mb-4 z-10">
        <div className="bg-[#23272f] bg-opacity-80 rounded-xl px-8 py-6 shadow-lg flex flex-col items-center max-w-lg">
          <div className="flex gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="h-5 w-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.388-2.46a1 1 0 00-1.175 0l-3.388 2.46c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.174 9.393c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.966z" />
              </svg>
            ))}
          </div>
          <span className="text-white font-semibold text-lg mb-1">
            5 out of 5
          </span>
          <span className="text-blue-200 text-sm text-center">
            Building bold classrooms and creative teams around the world
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;

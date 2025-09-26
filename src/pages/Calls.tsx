import React from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const Calls = () => {
  const theme = localStorage.getItem("theme") || "dark";
  const isDark = theme === "dark";
  return (
    <div
      className={
        isDark
          ? "min-h-screen flex bg-gradient-to-br from-[#181C23] via-[#23272f] to-[#1a2332]"
          : "min-h-screen flex bg-gradient-to-br from-white via-blue-50 to-blue-200"
      }
    >
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <Header />
        <main className="flex flex-col items-center justify-center p-8 h-full">
          <h1
            className={
              isDark
                ? "text-5xl font-extrabold text-blue-500 mb-8 mt-32 drop-shadow-lg"
                : "text-5xl font-extrabold text-blue-900 mb-8 mt-32 drop-shadow-lg"
            }
          >
            Work In Progress
          </h1>
        </main>
      </div>
    </div>
  );
};

export default Calls;

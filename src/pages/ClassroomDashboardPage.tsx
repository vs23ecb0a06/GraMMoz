import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

const ClassroomDashboardPage = () => {
  const { id } = useParams();
  const [stats, setStats] = useState({ students: 0, assignments: 0, calls: 0 });
  const [loading, setLoading] = useState(true);
  const [attendance, setAttendance] = useState(85); // percent
  const [assignmentsSubmitted, setAssignmentsSubmitted] = useState(12);
  const [totalAssignments, setTotalAssignments] = useState(15);
  const [isCreator, setIsCreator] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      const classroomRes = await fetch(`http://localhost:4000/api/classrooms/${id}`);
      const classroom = await classroomRes.json();
      const userId = localStorage.getItem("userId");
      setIsCreator(classroom.userId === userId);
      let assignments = [];
      try {
        const assignmentsRes = await fetch(`http://localhost:4000/api/classrooms/${id}/assignments`);
        assignments = await assignmentsRes.json();
      } catch {}
      let calls = [];
      try {
        const callsRes = await fetch(`http://localhost:4000/api/classrooms/${id}/calls`);
        calls = await callsRes.json();
      } catch {}
      setStats({
        students: classroom.members ? classroom.members.length : 0,
        assignments: assignments.length || 0,
        calls: calls.length || 0,
      });
      setLoading(false);
    };
    fetchStats();
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181C23] via-[#23272f] to-[#2a2e5a] flex items-center justify-center py-10">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-10 px-6">
        {/* Left: Stats & Overview */}
        <div className="flex-1 bg-[#181C23] rounded-3xl shadow-2xl p-10 flex flex-col justify-center">
          <h1 className="text-5xl font-extrabold mb-4 text-white leading-tight">Classroom Dashboard</h1>
          <h2 className="text-xl font-medium mb-6 text-blue-200">Your learning, beautifully organized</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Students Stat */}
            <div className="bg-[#23272f] rounded-2xl shadow p-6 flex flex-col items-start border border-gray-800">
              <div className="flex items-center gap-2 mb-2">
                <svg className="h-6 w-6 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V7h2v2z" /></svg>
                <span className="text-gray-400 text-sm">Total Students</span>
              </div>
              <span className="text-3xl font-bold text-white mb-2">{stats.students}</span>
              <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: `${Math.min(stats.students * 10, 100)}%` }}></div>
              </div>
            </div>
            {/* Assignments Stat */}
            <div className="bg-[#23272f] rounded-2xl shadow p-6 flex flex-col items-start border border-gray-800">
              <div className="flex items-center gap-2 mb-2">
                <svg className="h-6 w-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V7h2v2z" /></svg>
                <span className="text-gray-400 text-sm">Assignments</span>
              </div>
              <span className="text-3xl font-bold text-white mb-2">{stats.assignments}</span>
              <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: `${Math.min(stats.assignments * 10, 100)}%` }}></div>
              </div>
            </div>
            {/* Attendance Stat (for joined) */}
            {!isCreator && (
              <div className="bg-[#23272f] rounded-2xl shadow p-6 flex flex-col items-center border border-gray-800">
                <span className="text-gray-400 text-sm mb-2">Attendance</span>
                <div className="relative mb-2">
                  <svg width="120" height="70" viewBox="0 0 120 70">
                    <defs>
                      <linearGradient id="gaugeGradient" x1="0" y1="0" x2="120" y2="0">
                        <stop offset="0%" stopColor="#43ea7c" />
                        <stop offset="100%" stopColor="#228B22" />
                      </linearGradient>
                    </defs>
                    <path d="M10,60 A50,50 0 0,1 110,60" fill="none" stroke="#374151" strokeWidth="14" />
                    <path
                      d="M10,60 A50,50 0 0,1 110,60"
                      fill="none"
                      stroke="url(#gaugeGradient)"
                      strokeWidth="14"
                      strokeDasharray="157"
                      strokeDashoffset={157 - (attendance / 100) * 157}
                      strokeLinecap="round"
                      style={{ transition: 'stroke-dashoffset 0.7s' }}
                    />
                  </svg>
                  <div className="absolute left-0 right-0 top-[55%] flex flex-col items-center">
                    <span className="text-2xl font-bold text-white">{attendance}%</span>
                  </div>
                </div>
              </div>
            )}
            {/* Assignment Completion Rate (for joined) */}
            {!isCreator && (
              <div className="bg-[#23272f] rounded-2xl shadow p-6 flex flex-col items-start border border-gray-800">
                <span className="text-gray-400 text-sm mb-2">Assignments Submitted</span>
                <span className="text-3xl font-bold text-white mb-2">{assignmentsSubmitted}/{totalAssignments}</span>
                <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-400" style={{ width: `${Math.round((assignmentsSubmitted/totalAssignments)*100)}%` }}></div>
                </div>
              </div>
            )}
            {/* Top Student Stat (mock) */}
            <div className="bg-[#23272f] rounded-2xl shadow p-6 flex flex-col items-start border border-gray-800">
              <span className="text-gray-400 text-sm mb-2">Top Student</span>
              <span className="text-xl font-bold text-white mb-2">Alex Johnson</span>
              <span className="text-sm text-blue-300">Highest Assignment Score</span>
            </div>
            {/* Upcoming Events Stat (mock) */}
            <div className="bg-[#23272f] rounded-2xl shadow p-6 flex flex-col items-start border border-gray-800">
              <span className="text-gray-400 text-sm mb-2">Upcoming Event</span>
              <span className="text-xl font-bold text-white mb-2">Math Quiz</span>
              <span className="text-sm text-blue-300">Friday, 10:00 AM</span>
            </div>
          </div>
          {/* Info/Rating Section */}
          <div className="mt-8 bg-[#23272f] rounded-xl px-8 py-6 shadow-lg flex flex-col items-center max-w-lg">
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.388-2.46a1 1 0 00-1.175 0l-3.388 2.46c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.174 9.393c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.966z" /></svg>
              ))}
            </div>
            <span className="text-white font-semibold text-lg mb-1">5 out of 5</span>
            <span className="text-blue-200 text-sm text-center">Building bold classrooms and creative teams around the world</span>
          </div>
        </div>
        {/* Right: Visual Illustration */}
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-gradient-to-br from-blue-700 via-blue-500 to-blue-300 rounded-2xl shadow-2xl p-10 flex flex-col items-center">
            <svg width="120" height="120" viewBox="0 0 120 120" className="mb-6">
              <rect x="20" y="30" width="80" height="60" rx="16" fill="#23272f" stroke="#43ea7c" strokeWidth="3" />
              <text x="60" y="65" textAnchor="middle" fontSize="1.5rem" fill="#43ea7c" fontWeight="bold">Classroom</text>
            </svg>
            <span className="text-white text-2xl font-bold">Grammoz Classroom</span>
            <span className="text-blue-100 text-sm mt-2">All your stats, assignments, and events in one place</span>
          </div>
        </div>
      </div>
      {/* Navigation Bar */}
      <div className="absolute top-0 left-0 w-full flex items-center justify-between px-10 py-6 z-20">
        <span className="text-white text-2xl font-bold tracking-wide">Grammoz Classroom</span>
        <nav className="flex gap-8">
          <a href="#" className="text-blue-200 hover:text-white text-base font-medium transition">Overview</a>
          <a href="#" className="text-blue-200 hover:text-white text-base font-medium transition">Assignments</a>
          <a href="#" className="text-blue-200 hover:text-white text-base font-medium transition">Attendance</a>
          <a href="#" className="text-blue-200 hover:text-white text-base font-medium transition">Events</a>
        </nav>
        <button className="px-6 py-2 rounded-lg bg-white text-blue-700 font-semibold shadow hover:bg-blue-100 transition">Quick Actions</button>
      </div>
      {/* Floating Trophy Icon */}
      <div className="absolute right-32 top-32 animate-bounce z-10">
        <svg width="48" height="48" viewBox="0 0 48 48">
          <ellipse cx="24" cy="40" rx="16" ry="6" fill="#23272f" opacity="0.3" />
          <path d="M24 8c-4 0-7 3-7 7v7c0 4 3 7 7 7s7-3 7-7v-7c0-4-3-7-7-7z" fill="#ffd700" />
          <path d="M17 22c-3 0-5 2-5 5v2c0 2 2 4 5 4" stroke="#ffd700" strokeWidth="2" fill="none" />
          <path d="M31 22c3 0 5 2 5 5v2c0 2-2 4-5 4" stroke="#ffd700" strokeWidth="2" fill="none" />
        </svg>
      </div>
      {/* Quick Actions Section */}
      <div className="mb-8 flex gap-4">
        <button className="px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition">Add Assignment</button>
        <button className="px-5 py-2 rounded-xl bg-green-500 text-white font-semibold shadow hover:bg-green-600 transition">View Attendance</button>
        <button className="px-5 py-2 rounded-xl bg-yellow-400 text-gray-900 font-semibold shadow hover:bg-yellow-500 transition">Upcoming Events</button>
      </div>
    </div>
  );
};

export default ClassroomDashboardPage;

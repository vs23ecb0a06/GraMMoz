import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  TrendingDown,
  Users,
  BookOpen,
  Calendar,
  FileText,
  Target,
  Filter,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  Video,
  ClipboardList,
  Phone
} from "lucide-react";

const NewDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [classrooms, setClassrooms] = useState([]);
  const [joinedClassrooms, setJoinedClassrooms] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem('userId') || 'demo-user';
    fetch(`http://localhost:4000/api/dashboard?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setDashboardData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    fetch(`http://localhost:4000/api/classrooms?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => setClassrooms(data.filter(c => c.userId === userId)));
    fetch(`http://localhost:4000/api/classrooms?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => setJoinedClassrooms(data.filter(c => c.userId !== userId)));
  }, []);

  const stats = [
    { label: "Students", value: 120, icon: <Users className="h-6 w-6 text-blue-400" />, color: "bg-blue-500" },
    { label: "Assignments", value: 18, icon: <ClipboardList className="h-6 w-6 text-purple-400" />, color: "bg-purple-500" },
    { label: "Classes Held", value: 32, icon: <Phone className="h-6 w-6 text-pink-400" />, color: "bg-pink-500" },
    { label: "Scheduled", value: 5, icon: <Phone className="h-6 w-6 text-green-400" />, color: "bg-green-500" },
  ];

  return (
    <div className="space-y-8 font-sans">
      <h1 className="text-3xl font-extrabold mb-1 text-gray-900 dark:text-white">Dashboard</h1>
      <p className="text-base mb-6 text-gray-700 dark:text-gray-300">Welcome back! Here's what's happening in your classrooms.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex items-center gap-4 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#181C23] hover:shadow-xl transition">
            <div className={`rounded-full p-3 ${stat.color} bg-opacity-20 dark:bg-opacity-100 dark:bg-[#23272f]`}>{stat.icon}</div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
              <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Your Classrooms</h3>
            <button className="px-4 py-1 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm bg-white dark:bg-[#23272f] hover:bg-gray-100 dark:hover:bg-[#23272f] transition shadow-sm">View All</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {classrooms.length === 0 ? (
              <div className="p-6 bg-white dark:bg-[#181C23] text-gray-700 dark:text-gray-300 rounded-2xl shadow border border-gray-200 dark:border-gray-800 text-center">No classroom found</div>
            ) : (
              classrooms.map((room) => (
                <div key={room._id || room.id} className="relative p-7 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-800 flex flex-col min-h-[140px] min-w-[300px] w-full bg-white dark:bg-[#23272f] text-gray-900 dark:text-white hover:shadow-2xl transition group">
                  <div className="flex flex-col gap-2 mb-4 items-center text-center">
                    <span className="font-bold text-xl text-gray-900 dark:text-white">{room.name}</span>
                    <span className="text-base text-blue-600 dark:text-blue-400 font-semibold">{room.subject || '-'}</span>
                  </div>
                  <button
                    className="mt-auto w-64 max-w-full py-2 bg-blue-600 text-white rounded-xl font-semibold text-base hover:bg-blue-700 transition shadow group-hover:scale-105 group-hover:shadow-xl mx-auto text-center"
                    onClick={() => window.location.href = `/classroom/${room._id || room.id}/announcements`}
                  >
                    View Classroom
                  </button>
                </div>
              ))
            )}
          </div>
          <div className="mt-10">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Joined Classrooms</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {joinedClassrooms.length === 0 ? (
                <div className="p-6 bg-white dark:bg-[#181C23] text-gray-700 dark:text-gray-300 rounded-2xl shadow border border-gray-200 dark:border-gray-800 text-center">No joined classroom found</div>
              ) : (
                joinedClassrooms.map((room) => (
                  <div key={room._id || room.id} className="relative p-7 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-800 flex flex-col min-h-[140px] min-w-[300px] w-full bg-white dark:bg-[#23272f] text-gray-900 dark:text-white hover:shadow-2xl transition group">
                    <div className="flex flex-col gap-2 mb-4 items-center text-center">
                      <span className="font-bold text-xl text-gray-900 dark:text-white">{room.name}</span>
                      <span className="text-base text-blue-600 dark:text-blue-400 font-semibold">{room.subject || '-'}</span>
                    </div>
                    <button
                      className="mt-auto w-64 max-w-full py-2 bg-blue-600 text-white rounded-xl font-semibold text-base hover:bg-blue-700 transition shadow group-hover:scale-105 group-hover:shadow-xl mx-auto text-center"
                      onClick={() => window.location.href = `/classroom/${room._id || room.id}/announcements`}
                    >
                      View Classroom
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewDashboard;
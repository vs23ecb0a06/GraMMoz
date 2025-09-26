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
    <div className="min-h-screen bg-gray-50 dark:bg-[#181C23]">
      <Sidebar />
      <div className="ml-64 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 p-8 flex gap-8">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Classroom Overview</h1>
            {loading ? (
              <div className="text-center text-gray-400">Loading...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {isCreator ? (
                  <>
                    {/* General Stats for Creator */}
                    <div className="bg-white dark:bg-gradient-to-br dark:from-[#23272f] dark:to-[#181C23] rounded-2xl shadow-lg p-6 flex flex-col items-start border border-gray-200 dark:border-[#23272f]">
                      <span className="text-gray-500 dark:text-gray-400 text-sm mb-2">Students</span>
                      <span className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stats.students}</span>
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: `${Math.min(stats.students * 10, 100)}%` }}></div>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-gradient-to-br dark:from-[#23272f] dark:to-[#181C23] rounded-2xl shadow-lg p-6 flex flex-col items-start border border-gray-200 dark:border-[#23272f]">
                      <span className="text-gray-500 dark:text-gray-400 text-sm mb-2">Assignments</span>
                      <span className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stats.assignments}</span>
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: `${Math.min(stats.assignments * 10, 100)}%` }}></div>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-gradient-to-br dark:from-[#23272f] dark:to-[#181C23] rounded-2xl shadow-lg p-6 flex flex-col items-start border border-gray-200 dark:border-[#23272f]">
                      <span className="text-gray-500 dark:text-gray-400 text-sm mb-2">Classes</span>
                      <span className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stats.calls}</span>
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500" style={{ width: `${Math.min(stats.calls * 10, 100)}%` }}></div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Attendance and Assignments Submitted for Joined Members */}
                    <div className="bg-white dark:bg-gradient-to-br dark:from-[#23272f] dark:to-[#181C23] rounded-2xl shadow-lg p-6 flex flex-col items-center border border-gray-200 dark:border-[#23272f]">
                      <span className="text-gray-500 dark:text-gray-400 text-sm mb-2">Attendance</span>
                      <div className="relative mb-2">
                        <svg width="120" height="70" viewBox="0 0 120 70">
                          <defs>
                            <linearGradient id="gaugeGradient" x1="0" y1="0" x2="120" y2="0">
                              <stop offset="0%" stopColor="#43ea7c" />
                              <stop offset="100%" stopColor="#228B22" />
                            </linearGradient>
                          </defs>
                          <path d="M10,60 A50,50 0 0,1 110,60" fill="none" stroke="#e5e7eb" strokeWidth="14" />
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
                          <span className="text-2xl font-bold text-gray-900 dark:text-white">{attendance}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-gradient-to-br dark:from-[#23272f] dark:to-[#181C23] rounded-2xl shadow-lg p-6 flex flex-col items-start border border-gray-200 dark:border-[#23272f]">
                      <span className="text-gray-500 dark:text-gray-400 text-sm mb-2">Assignments Submitted</span>
                      <span className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{assignmentsSubmitted}/{totalAssignments}</span>
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: `${Math.round((assignmentsSubmitted/totalAssignments)*100)}%` }}></div>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-gradient-to-br dark:from-[#23272f] dark:to-[#181C23] rounded-2xl shadow-lg p-6 flex flex-col items-start border border-gray-200 dark:border-[#23272f]">
                      <span className="text-gray-500 dark:text-gray-400 text-sm mb-2">Students</span>
                      <span className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stats.students}</span>
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: `${Math.min(stats.students * 10, 100)}%` }}></div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
            {/* Placeholder for chart */}
            <div className="bg-white dark:bg-gradient-to-br dark:from-[#23272f] dark:to-[#181C23] rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-[#23272f] mt-8">
              <div className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Activity Overview</div>
              {/* Simple bar chart with mock data */}
              <div className="flex items-end gap-4 h-40 w-full">
                {[4, 6, 3, 5, 2, 7, 5].map((val, idx) => (
                  <div key={idx} className="flex flex-col items-center w-8">
                    <div className="bg-blue-500 rounded-t-lg" style={{height: `${val * 18}px`, width: '100%'}}></div>
                    <span className="text-xs text-gray-400 mt-2">{['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][idx]}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4 text-xs text-gray-400">
                <span>Assignments/Classes per day (mock)</span>
                <span>Last 7 days</span>
              </div>
            </div>
          </div>
          {/* Right sidebar */}
          <div className="w-96 hidden lg:block">
            <div className="bg-white dark:bg-gradient-to-br dark:from-[#23272f] dark:to-[#181C23] rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-[#23272f] mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-green-600 flex items-center justify-center text-white text-2xl font-bold">C</div>
                <div>
                  <div className="font-bold text-gray-900 dark:text-white text-lg">Classroom</div>
                  <div className="text-gray-500 dark:text-gray-400 text-sm">Statistics & Info</div>
                </div>
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-sm mb-2">Total Students</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{stats.students}</div>
              <div className="text-gray-500 dark:text-gray-400 text-sm mb-2">Assignments</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{stats.assignments}</div>
              <div className="text-gray-500 dark:text-gray-400 text-sm mb-2">Classes/Calls</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.calls}</div>
            </div>
            <div className="bg-white dark:bg-gradient-to-br dark:from-[#23272f] dark:to-[#181C23] rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-[#23272f]">
              <div className="text-gray-900 dark:text-white font-semibold mb-2">Activity</div>
              <div className="h-24 flex items-center justify-center text-gray-500">[Activity Chart]</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClassroomDashboardPage;

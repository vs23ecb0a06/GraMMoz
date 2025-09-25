import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { MoreVertical } from "lucide-react";

const StudentsPage = () => {
  const { id } = useParams();
  const [students, setStudents] = useState([]);
  const [studentInfos, setStudentInfos] = useState([]);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteLink, setInviteLink] = useState("");
  const [isCreator, setIsCreator] = useState(false);
  const [menuOpen, setMenuOpen] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/api/classrooms/${id}`)
      .then(res => res.json())
      .then(async room => {
        setStudents(room.members || []);
        setIsCreator(room.userId === localStorage.getItem("userId"));
        if (room.members && room.members.length > 0) {
          const infos = await Promise.all(
            room.members.map(uid =>
              fetch(`http://localhost:4000/api/user?userId=${uid}`).then(res => res.json())
            )
          );
          setStudentInfos(infos);
        } else {
          setStudentInfos([]);
        }
      });
  }, [id]);

  const handleInviteClick = async () => {
    const res = await fetch(`http://localhost:4000/api/classrooms/${id}/invite`, { method: "POST" });
    const data = await res.json();
    setInviteLink(data.inviteLink);
    setInviteModalOpen(true);
  };

  // Action handlers
  const handleKick = async (studentId) => {
    await fetch(`http://localhost:4000/api/classrooms/${id}/kick`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId })
    });
    // Refresh student list
    window.location.reload();
  };
  const handlePromote = async (studentId) => {
    await fetch(`http://localhost:4000/api/classrooms/${id}/promote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId })
    });
    // Optionally refresh or show success
  };
  const handleMarkPresent = async (studentId) => {
    await fetch(`http://localhost:4000/api/classrooms/${id}/attendance`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId, present: true })
    });
    // Optionally refresh or show success
  };
  const handleMarkAbsent = async (studentId) => {
    await fetch(`http://localhost:4000/api/classrooms/${id}/attendance`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId, present: false })
    });
    // Optionally refresh or show success
  };

  React.useEffect(() => {
    function handleClickOutside(event) {
      // Only close if click is outside any open dropdown
      if (!event.target.closest('.student-action-dropdown')) {
        setMenuOpen(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#181C23]">
      <Sidebar />
      <div className="ml-64 flex flex-col">
        <Header />
        <main className="flex-1 p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Students List</h1>
            <button className="px-4 py-2 border border-purple-500 text-purple-600 rounded-lg font-semibold bg-white dark:bg-[#23272f] hover:bg-purple-50 dark:hover:bg-purple-900 transition flex items-center gap-2" onClick={handleInviteClick}>
              + Add Students
            </button>
          </div>
          <div className="bg-white dark:bg-[#23272f] rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="font-bold text-lg text-gray-900 dark:text-white">Students Information</div>
              <div className="flex items-center gap-3">
                <input type="text" placeholder="Search by name or roll" className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-[#23272f] text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
                <select className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-[#23272f] text-gray-900 dark:text-white text-sm">
                  <option>Last 30 days</option>
                  <option>All time</option>
                </select>
              </div>
            </div>
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 dark:text-gray-400 text-sm border-b dark:border-gray-700">
                  <th className="py-3 px-2">Name</th>
                  <th className="py-3 px-2">Roll</th>
                  <th className="py-3 px-2">Address</th>
                  <th className="py-3 px-2">Class</th>
                  <th className="py-3 px-2">Date of Birth</th>
                  <th className="py-3 px-2">Phone</th>
                  <th className="py-3 px-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {studentInfos.length === 0 ? (
                  <tr><td colSpan={7} className="text-center text-gray-400 py-8">No students yet.</td></tr>
                ) : (
                  studentInfos.map((student, idx) => (
                    <tr key={idx} className="border-b last:border-b-0 border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#23272f] transition">
                      <td className="py-3 px-2 flex items-center gap-3">
                        {student.profilePic ? (
                          <img src={student.profilePic} alt="Profile" className="h-8 w-8 rounded-full object-cover" />
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white text-base font-bold">
                            {student.name ? student.name.charAt(0).toUpperCase() : "A"}
                          </div>
                        )}
                        <span className="font-semibold text-gray-900 dark:text-white">{student.name}</span>
                      </td>
                      <td className="py-3 px-2 text-gray-700 dark:text-gray-300">{student.roll || '-'}</td>
                      <td className="py-3 px-2 text-gray-700 dark:text-gray-300">{student.address || '-'}</td>
                      <td className="py-3 px-2 text-gray-700 dark:text-gray-300">{student.class || '-'}</td>
                      <td className="py-3 px-2 text-gray-700 dark:text-gray-300">{student.dob || '-'}</td>
                      <td className="py-3 px-2 text-gray-700 dark:text-gray-300">{student.phone || '-'}</td>
                      <td className="py-3 px-2">
                        <div className="flex gap-2">
                          <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700" title="Edit">
                            <svg className="h-4 w-4 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4 12.5-12.5z" /></svg>
                          </button>
                          <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700" title="Delete">
                            <svg className="h-4 w-4 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 6h18" /><path d="M8 6v14a2 2 0 002 2h4a2 2 0 002-2V6" /><path d="M10 11v6" /><path d="M14 11v6" /></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
      {inviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-[#23272f] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Invite to Classroom</h2>
            <div className="mb-4">
              <input type="text" value={inviteLink} readOnly className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold text-lg border border-gray-300 dark:border-gray-700" />
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition font-semibold" onClick={() => setInviteModalOpen(false)}>Close</button>
              <button type="button" className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition" onClick={() => { navigator.clipboard.writeText(inviteLink); }}>
                Copy to Clipboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsPage;

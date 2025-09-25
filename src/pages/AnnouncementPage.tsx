import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Send, MoreVertical, Settings } from "lucide-react";

const AnnouncementPage = () => {
  const { id } = useParams();
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState("");
  const [isCreator, setIsCreator] = useState(false);
  const [editingIdx, setEditingIdx] = useState(null);
  const [editText, setEditText] = useState("");
  const [menuOpenIdx, setMenuOpenIdx] = useState(null);
  const [userMap, setUserMap] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [expandedIdx, setExpandedIdx] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editAnnouncement, setEditAnnouncement] = useState(null);
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementText, setAnnouncementText] = useState("");
  const [announcementFile, setAnnouncementFile] = useState<File | null>(null);

  useEffect(() => {
    // Fetch announcements for classroom
    fetch(`http://localhost:4000/api/classrooms/${id}/announcements`)
      .then((res) => res.json())
      .then((data) => {
        setAnnouncements(data);
        // Fetch user info for each announcement
        const userIds = Array.from(new Set(data.map((a) => a.userId)));
        Promise.all(
          userIds.map((uid) =>
            fetch(`http://localhost:4000/api/user?userId=${uid}`).then((res) =>
              res.json().then((user) => ({ ...user, userId: uid }))
            )
          )
        ).then((users) => {
          const map = {};
          users.forEach((u) => {
            if (u && u.userId) map[u.userId] = u;
          });
          setUserMap(map);
        });
      });
    // Check if current user is creator
    const userId = localStorage.getItem("userId");
    fetch(`http://localhost:4000/api/classrooms/${id}`)
      .then((res) => res.json())
      .then((room) => {
        setIsCreator(room.userId === userId);
      });
  }, [id]);

  const handleSend = async () => {
    if (!newAnnouncement.trim()) return;
    const userId = localStorage.getItem("userId");
    await fetch(`http://localhost:4000/api/classrooms/${id}/announcements`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newAnnouncement, userId }),
    });
    setNewAnnouncement("");
    // Refresh announcements
    fetch(`http://localhost:4000/api/classrooms/${id}/announcements`)
      .then((res) => res.json())
      .then((data) => setAnnouncements(data));
  };

  const handleDelete = async (idx) => {
    const announcement = announcements[idx];
    await fetch(
      `http://localhost:4000/api/classrooms/${id}/announcements/${announcement._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deleted: true }),
      }
    );
    fetch(`http://localhost:4000/api/classrooms/${id}/announcements`)
      .then((res) => res.json())
      .then((data) => setAnnouncements(data));
  };

  const handleEdit = async (idx) => {
    const announcement = announcements[idx];
    await fetch(
      `http://localhost:4000/api/classrooms/${id}/announcements/${announcement._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: editText }),
      }
    );
    setEditingIdx(null);
    setEditText("");
    fetch(`http://localhost:4000/api/classrooms/${id}/announcements`)
      .then((res) => res.json())
      .then((data) => setAnnouncements(data));
  };

  const handleAddAnnouncement = async () => {
    const userId = localStorage.getItem("userId");
    const formData = new FormData();
    formData.append("title", announcementTitle);
    formData.append("text", announcementText);
    formData.append("userId", userId || "");
    if (announcementFile) formData.append("file", announcementFile);
    const res = await fetch(`http://localhost:4000/api/classrooms/${id}/announcements`, {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      setShowAddModal(false);
      setAnnouncementTitle("");
      setAnnouncementText("");
      setAnnouncementFile(null);
      // Refresh announcements from backend
      fetch(`http://localhost:4000/api/classrooms/${id}/announcements`)
        .then((res) => res.json())
        .then((data) => setAnnouncements(data));
    } else {
      alert("Failed to add announcement");
    }
  };

  const handleEditAnnouncement = async () => {
    if (!editAnnouncement) return;
    const formData = new FormData();
    formData.append("title", announcementTitle);
    formData.append("text", announcementText);
    if (announcementFile) formData.append("file", announcementFile);
    const res = await fetch(`http://localhost:4000/api/classrooms/${id}/announcements/${editAnnouncement._id}`, {
      method: "PUT",
      body: formData,
    });
    if (res.ok) {
      setShowEditModal(false);
      setEditAnnouncement(null);
      setAnnouncementTitle("");
      setAnnouncementText("");
      setAnnouncementFile(null);
      fetch(`http://localhost:4000/api/classrooms/${id}/announcements`)
        .then((res) => res.json())
        .then((data) => setAnnouncements(data));
    } else {
      alert("Failed to edit announcement");
    }
  };

  const handleDeleteAnnouncement = async () => {
    if (!editAnnouncement) return;
    const res = await fetch(`http://localhost:4000/api/classrooms/${id}/announcements/${editAnnouncement._id}`, {
      method: "DELETE"
    });
    if (res.ok) {
      setShowEditModal(false);
      setEditAnnouncement(null);
      fetch(`http://localhost:4000/api/classrooms/${id}/announcements`)
        .then((res) => res.json())
        .then((data) => setAnnouncements(data));
    } else {
      alert("Failed to delete announcement");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="ml-64 flex flex-col">
        <Header />
        <main className="flex-1 p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Announcements
            </h1>
            {isCreator && (
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition"
                onClick={() => setShowAddModal(true)}
              >
                Add Announcement
              </button>
            )}
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="bg-white dark:bg-[#23272f] rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">
              <div className="grid grid-cols-12 items-center px-6 py-4 border-b border-gray-100 dark:border-gray-800 text-xs font-semibold text-gray-500">
                <div className="col-span-5">Announcement</div>
                <div className="col-span-3">Publish Date</div>
                <div className="col-span-3">Status</div>
                <div className="col-span-1 text-right"></div>
              </div>
              {announcements.length === 0 ? (
                <div className="text-center text-gray-400 py-8">
                  No announcements yet.
                </div>
              ) : (
                announcements.map((a, idx) => (
                  <div
                    key={idx}
                    className={`grid grid-cols-12 items-center px-6 py-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#23272f] transition cursor-pointer ${expandedIdx === idx ? 'bg-gray-100 dark:bg-[#23272f]' : ''}`}
                    onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
                  >
                    <div className="col-span-5 flex items-center gap-3">
                      {userMap[a.userId] &&
                      userMap[a.userId].profilePic &&
                      userMap[a.userId].profilePic !== "" ? (
                        <img
                          src={userMap[a.userId].profilePic}
                          alt="Profile"
                          className="h-8 w-8 rounded-full object-cover border border-gray-300"
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white text-lg font-bold">
                          {userMap[a.userId]?.name
                            ? userMap[a.userId].name.charAt(0).toUpperCase()
                            : "A"}
                        </div>
                      )}
                      <span className="font-semibold text-gray-900 dark:text-white text-base">
                        {a.title}
                      </span>
                    </div>
                    <div className="col-span-3 text-gray-500 text-sm">
                      {new Date(a.createdAt).toLocaleDateString()}
                    </div>
                    <div className="col-span-3">
                      <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                        Published
                      </span>
                    </div>
                    <div className="col-span-1 text-right">
                      <button
                        onClick={e => { e.stopPropagation(); setEditAnnouncement(a); setAnnouncementTitle(a.title || ""); setAnnouncementText(a.text); setShowEditModal(true); }}
                        className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                      >
                        <Settings className="h-5 w-5 text-gray-500" />
                      </button>
                    </div>
                    {expandedIdx === idx && (
                      <div className="col-span-12 mt-4 p-4 rounded-lg bg-white dark:bg-[#23272f] shadow">
                        <div className="mb-2 text-gray-700 dark:text-gray-300">
                          {a.text}
                        </div>
                        {a.filePath && (
                          <a
                            href={`/${a.filePath}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                          >
                            View Document
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
            {/* Pagination Controls */}
            <div className="flex items-center justify-between mt-6 px-2">
              <button className="px-4 py-2 rounded-lg border text-gray-600 bg-white dark:bg-[#23272f] hover:bg-gray-100 dark:hover:bg-gray-700">
                Previous Page
              </button>
              <span className="text-sm text-gray-500">Page 1 of 1</span>
              <button className="px-4 py-2 rounded-lg border text-gray-600 bg-white dark:bg-[#23272f] hover:bg-gray-100 dark:hover:bg-gray-700">
                Next Page
              </button>
            </div>
          </div>
        </main>
      </div>
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-[#23272f] rounded-2xl shadow-lg p-8 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Announcement</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2 text-base bg-white dark:bg-[#23272f] text-black dark:text-white border-gray-300 dark:border-gray-700"
                value={announcementTitle}
                onChange={(e) => setAnnouncementTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Text</label>
              <textarea
                className="w-full border rounded-lg px-3 py-2 text-base bg-white dark:bg-[#23272f] text-black dark:text-white border-gray-300 dark:border-gray-700"
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Upload Document (optional)
              </label>
              <input
                type="file"
                className="w-full"
                onChange={(e) =>
                  setAnnouncementFile(
                    e.target.files ? e.target.files[0] : null
                  )
                }
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded-lg bg-gray-400 text-white"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold"
                onClick={handleAddAnnouncement}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-[#23272f] rounded-2xl shadow-lg p-8 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Announcement</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2 text-base bg-white dark:bg-[#23272f] text-black dark:text-white border-gray-300 dark:border-gray-700"
                value={announcementTitle}
                onChange={(e) => setAnnouncementTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Text</label>
              <textarea
                className="w-full border rounded-lg px-3 py-2 text-base bg-white dark:bg-[#23272f] text-black dark:text-white border-gray-300 dark:border-gray-700"
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Upload Document (optional)
              </label>
              <input
                type="file"
                className="w-full"
                onChange={(e) =>
                  setAnnouncementFile(
                    e.target.files ? e.target.files[0] : null
                  )
                }
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded-lg bg-gray-400 text-white"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold"
                onClick={handleEditAnnouncement}
              >
                Save
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold"
                onClick={handleDeleteAnnouncement}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnnouncementPage;

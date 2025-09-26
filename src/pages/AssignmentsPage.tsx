import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

const AssignmentsPage = () => {
  const { id } = useParams();
  const [assignments, setAssignments] = useState([]);
  const [isCreator, setIsCreator] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newAssignment, setNewAssignment] = useState({ title: "", description: "", deadline: "", file: null });
  const [submissions, setSubmissions] = useState({}); // { assignmentId: [submissions] }
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    // Fetch assignments
    fetch(`http://localhost:4000/api/classrooms/${id}/assignments`)
      .then(res => res.json())
      .then(data => setAssignments(data));
    // Check if user is creator
    fetch(`http://localhost:4000/api/classrooms/${id}`)
      .then(res => res.json())
      .then(room => setIsCreator(room.userId === userId));
  }, [id, userId]);

  useEffect(() => {
    if (isCreator) {
      // Fetch submissions for each assignment
      assignments.forEach(a => {
        fetch(`http://localhost:4000/api/classrooms/${id}/assignments/${a._id}/submissions`)
          .then(res => res.json())
          .then(data => setSubmissions(prev => ({ ...prev, [a._id]: data })));
      });
    }
  }, [assignments, isCreator, id]);

  const handleCreateAssignment = async () => {
    const formData = new FormData();
    formData.append("title", newAssignment.title);
    formData.append("description", newAssignment.description);
    formData.append("deadline", newAssignment.deadline);
    formData.append("userId", userId || "");
    if (newAssignment.file) formData.append("file", newAssignment.file);
    const res = await fetch(`http://localhost:4000/api/classrooms/${id}/assignments`, {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      setShowCreateModal(false);
      setNewAssignment({ title: "", description: "", deadline: "", file: null });
      fetch(`http://localhost:4000/api/classrooms/${id}/assignments`)
        .then(res => res.json())
        .then(data => setAssignments(data));
    } else {
      alert("Failed to create assignment");
    }
  };

  const handleAcceptReject = async (assignmentId, submissionId, status) => {
    await fetch(`http://localhost:4000/api/classrooms/${id}/assignments/${assignmentId}/submissions/${submissionId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    // Refresh submissions
    fetch(`http://localhost:4000/api/classrooms/${id}/assignments/${assignmentId}/submissions`)
      .then(res => res.json())
      .then(data => setSubmissions(prev => ({ ...prev, [assignmentId]: data })));
  };

  const handleSubmitAssignment = async (assignmentId, file, comment) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("comment", comment);
    formData.append("userId", userId || "");
    const res = await fetch(`http://localhost:4000/api/classrooms/${id}/assignments/${assignmentId}/submissions`, {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      alert("Assignment submitted!");
    } else {
      alert("Failed to submit assignment");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#181C23]">
      <Sidebar />
      <div className="ml-64 flex flex-col">
        <Header />
        <main className="flex-1 p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Assignments</h1>
            {isCreator && (
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition" onClick={() => setShowCreateModal(true)}>
                Create Assignment
              </button>
            )}
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {assignments.length === 0 ? (
                <div className="text-center text-gray-400 py-8">No assignments yet.</div>
              ) : (
                assignments.map(a => (
                  <div key={a._id} className="bg-white dark:bg-gradient-to-br dark:from-[#23272f] dark:to-[#181C23] rounded-2xl shadow-lg border border-gray-200 dark:border-[#23272f] p-6 mb-6">
                    <div className="font-bold text-lg text-gray-900 dark:text-white mb-2">{a.title}</div>
                    <div className="text-gray-700 dark:text-gray-300 mb-2">{a.description}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Deadline: {a.deadline ? new Date(a.deadline).toLocaleString() : "-"}</div>
                    {isCreator ? (
                      <div className="mt-4">
                        <div className="font-semibold text-gray-900 dark:text-white mb-2">Submissions:</div>
                        {submissions[a._id]?.length === 0 ? (
                          <div className="text-gray-400">No submissions yet.</div>
                        ) : (
                          submissions[a._id]?.map(sub => (
                            <div key={sub._id} className="flex items-center justify-between bg-gray-100 dark:bg-[#23272f] rounded-lg p-3 mb-2">
                              <div>
                                <div className="font-bold text-gray-900 dark:text-white">{sub.userName || sub.userId}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">{sub.comment}</div>
                              </div>
                              <div className="flex gap-2">
                                <button className="px-3 py-1 rounded-lg bg-green-600 text-white font-semibold" onClick={() => handleAcceptReject(a._id, sub._id, "accepted")}>Accept</button>
                                <button className="px-3 py-1 rounded-lg bg-red-600 text-white font-semibold" onClick={() => handleAcceptReject(a._id, sub._id, "rejected")}>Reject</button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    ) : (
                      <div className="mt-4">
                        <form onSubmit={e => { e.preventDefault(); const file = e.target.assignmentFile.files[0]; const comment = e.target.comment.value; handleSubmitAssignment(a._id, file, comment); }}>
                          <input type="file" name="assignmentFile" className="mb-2" required />
                          <input type="text" name="comment" placeholder="Comment (optional)" className="mb-2 px-3 py-2 rounded-lg border w-full" />
                          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition">Submit Assignment</button>
                        </form>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-[#23272f] rounded-2xl shadow-lg p-8 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create Assignment</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Title</label>
              <input type="text" className="w-full border rounded-lg px-3 py-2 text-base bg-white dark:bg-[#23272f] text-black dark:text-white border-gray-300 dark:border-gray-700" value={newAssignment.title} onChange={e => setNewAssignment({ ...newAssignment, title: e.target.value })} />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea className="w-full border rounded-lg px-3 py-2 text-base bg-white dark:bg-[#23272f] text-black dark:text-white border-gray-300 dark:border-gray-700" value={newAssignment.description} onChange={e => setNewAssignment({ ...newAssignment, description: e.target.value })} />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Deadline</label>
              <input type="datetime-local" className="w-full border rounded-lg px-3 py-2 text-base bg-white dark:bg-[#23272f] text-black dark:text-white border-gray-300 dark:border-gray-700" value={newAssignment.deadline} onChange={e => setNewAssignment({ ...newAssignment, deadline: e.target.value })} />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Upload Document (optional)</label>
              <input type="file" className="w-full" onChange={e => setNewAssignment({ ...newAssignment, file: e.target.files ? e.target.files[0] : null })} />
            </div>
            <div className="flex justify-end gap-2">
              <button className="px-4 py-2 rounded-lg bg-gray-400 text-white" onClick={() => setShowCreateModal(false)}>Cancel</button>
              <button className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold" onClick={handleCreateAssignment}>Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignmentsPage;

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Home,
  Settings,
  TrendingUp,
  Bell,
  MessageSquare,
  User,
  Users,
  LogOut,
  FileText,
  CheckSquare,
  Phone,
  Megaphone,
  ClipboardList
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ChatPage from "@/pages/ChatPage";

const defaultMainMenu = [
  { icon: "Home", label: "Home", href: "/dashboard" },
  { icon: "Bell", label: "Notifications", href: "/notifications" },
  { icon: "MessageSquare", label: "Chat", href: "/chat" },
  { icon: "Settings", label: "Settings", href: "/settings" },
];

const iconMap = {
  Home,
  Bell,
  MessageSquare,
  Settings,
};

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mainMenu, setMainMenu] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const userId = localStorage.getItem("userId");
  const fetchClassrooms = () => {
    fetch(`http://localhost:4000/api/classrooms?userId=${userId}`)
      .then(res => res.json())
      .then(data => setClassrooms(data));
  };
  useEffect(() => {
    fetchClassrooms();
    const handler = () => fetchClassrooms();
    window.addEventListener('classroomCreated', handler);
    return () => window.removeEventListener('classroomCreated', handler);
  }, [location]);
  const [showModal, setShowModal] = useState(false);
  const [newClassroom, setNewClassroom] = useState({ name: '', subject: '' });
  const [creating, setCreating] = useState(false);
  const [expandedClassroom, setExpandedClassroom] = useState(null);
  const [activeClassroom, setActiveClassroom] = useState(null);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const userName = localStorage.getItem('userName') || 'User';
  const userEmail = localStorage.getItem('userEmail') || '';
  const userProfilePic = localStorage.getItem('userProfilePic');

  useEffect(() => {
    // Fetch main menu from backend
    fetch("/api/menu")
      .then((res) => res.json())
      .then((data) => setMainMenu(data));
  }, []);

  const handleCreateClassroom = async () => {
    console.log('Create Classroom button clicked');
    setCreating(true);
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.log('No userId found in localStorage');
      alert('You must be logged in to create a classroom. Please log in first.');
      setCreating(false);
      return;
    }
    // Make sure to set userId in localStorage after login, e.g.:
    // localStorage.setItem('userId', userIdFromBackend);
    const classroomData = {
      name: newClassroom.name,
      subject: newClassroom.subject,
      active: true,
      students: 0,
      userId,
    };
    console.log('Sending classroom data:', classroomData);
    try {
      const res = await fetch('http://localhost:4000/api/classrooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(classroomData),
      });
      console.log('POST /api/classrooms response status:', res.status);
      if (res.ok) {
        const createdClassroom = await res.json();
        console.log('Created classroom:', createdClassroom);
        // Always fetch the latest classroom list from backend after creation
        const updatedRes = await fetch(`http://localhost:4000/api/classrooms?userId=${userId}`);
        const updatedClassrooms = await updatedRes.json();
        setClassrooms(Array.isArray(updatedClassrooms) ? updatedClassrooms.filter(c => c.userId === userId) : []);
        setShowModal(false);
        setNewClassroom({ name: '', subject: '' });
      } else {
        const errorText = await res.text();
        console.error('Failed to create classroom. Response:', errorText);
        alert('Failed to create classroom: ' + errorText);
      }
    } catch (err) {
      console.error('Error creating classroom:', err);
      alert('Error creating classroom: ' + err);
    }
    setCreating(false);
  };

  const handleDeleteClassroom = async (classroomId) => {
    if (!window.confirm('Are you sure you want to delete this classroom?')) return;
    try {
      const res = await fetch(`http://localhost:4000/api/classrooms/${classroomId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setClassrooms(classrooms.filter(c => c._id !== classroomId && c.id !== classroomId));
      } else {
        alert('Failed to delete classroom');
      }
    } catch (err) {
      alert('Error deleting classroom: ' + err);
    }
  };

  const clearUserData = () => {
    localStorage.removeItem("userId");
    setClassrooms([]);
    setExpandedClassroom(null);
  };

  // Utility function to decode JWT and get userId
  function getUserIdFromToken(token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.userId;
    } catch (err) {
      console.error('Error decoding token:', err);
      return null;
    }
  }

  // Separate classrooms into created and joined
  const yourClassrooms = classrooms.filter(room => room.userId === userId);
  const joinedClassrooms = classrooms.filter(room => room.userId !== userId && room.members && room.members.includes(userId));

  return (
    <div className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar dark:bg-[#181C23] bg-white border-r border-sidebar-border flex flex-col font-sans text-gray-900 dark:text-white overflow-hidden">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-sidebar-border px-6">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm font-sans">G</span>
          </div>
          <span className="text-2xl font-extrabold text-gray-900">GraMoz</span>
        </div>
      </div>

      {/* Main Section */}
      <nav className="px-4 py-6 pb-2">
        <h3 className="text-xs font-semibold text-gray-500 mb-2">MAIN</h3>
        <div className="space-y-1">
          {(mainMenu.length ? mainMenu : defaultMainMenu).map((item) => {
            const Icon = iconMap[item.icon] || Home;
            return (
              <Link key={item.href} to={item.href} onClick={() => setExpandedClassroom(null)}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start px-3 py-2 h-auto text-sm text-gray-900 dark:text-white hover:bg-sidebar-accent hover:text-sidebar-accent-foreground dark:hover:bg-[#23272f] dark:hover:text-white",
                    location.pathname === item.href && "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  )}
                  onClick={() => {
                    setExpandedClassroom(null);
                    if (item.href === '/chat') navigate('/chat');
                  }}
                >
                  <Icon className="mr-3 h-4 w-4" />
                  <span className="flex-1 text-left">{item.label}</span>
                </Button>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Classrooms Section */}
      <div className="px-4 pt-0 pb-6 flex-1 overflow-y-auto">
        <h3 className="text-xs font-semibold text-gray-500 mb-2">CLASSROOMS</h3>
        <div className="space-y-1">
          {/* Your Classrooms Section */}
          <div className="mb-6">
            <div className="text-sm font-bold text-gray-500 mb-2">Your Classrooms</div>
            {yourClassrooms.map((room) => (
              <div key={room._id || room.id} className="mb-1">
                <button
                  className="w-full text-left px-4 py-2 rounded-lg font-semibold flex items-center gap-2 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-[#23272f] hover:text-blue-600 dark:hover:text-blue-400 transition"
                  onClick={() => setActiveClassroom(activeClassroom === (room._id || room.id) ? null : (room._id || room.id))}
                >
                  <Users className="h-4 w-4" /> {room.name}
                </button>
                {activeClassroom === (room._id || room.id) && (
                  <div className="ml-2 mt-2 space-y-2 rounded-2xl p-2 flex flex-col" style={{background: 'transparent'}}>
                    <a href={`/classroom/${room._id || room.id}/dashboard`} className="flex items-center gap-3 px-3 py-1 rounded-xl hover:bg-gray-100 dark:hover:bg-[#23272f] text-sm text-gray-900 dark:text-gray-100 font-medium transition">
                      <Home className="h-5 w-5 text-green-400" /> Dashboard
                    </a>
                    <a href={`/classroom/${room._id || room.id}/announcements`} className="flex items-center gap-3 px-3 py-1 rounded-xl hover:bg-gray-100 dark:hover:bg-[#23272f] text-sm text-gray-900 dark:text-gray-100 font-medium transition">
                      <Megaphone className="h-5 w-5 text-yellow-400" /> Announcements
                    </a>
                    <a href={`/classroom/${room._id || room.id}/students`} className="flex items-center gap-3 px-3 py-1 rounded-xl hover:bg-gray-100 dark:hover:bg-[#23272f] text-sm text-gray-900 dark:text-gray-100 font-medium transition">
                      <Users className="h-5 w-5 text-blue-400" /> Students
                    </a>
                    <a href={`/classroom/${room._id || room.id}/assignments`} className="flex items-center gap-3 px-3 py-1 rounded-xl hover:bg-gray-100 dark:hover:bg-[#23272f] text-sm text-gray-900 dark:text-gray-100 font-medium transition">
                      <ClipboardList className="h-5 w-5 text-purple-400" /> Assignments
                    </a>
                    <a href={`/classroom/${room._id || room.id}/calls`} className="flex items-center gap-3 px-3 py-1 rounded-xl hover:bg-gray-100 dark:hover:bg-[#23272f] text-sm text-gray-900 dark:text-gray-100 font-medium transition">
                      <Phone className="h-5 w-5 text-pink-400" /> Calls
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Joined Classrooms Section */}
          <div className="mb-6">
            <div className="text-sm font-bold text-gray-500 mb-2">Joined Classrooms</div>
            {joinedClassrooms.map((room) => (
              <div key={room._id || room.id} className="mb-1">
                <button className="w-full text-left px-4 py-2 rounded-lg font-semibold flex items-center gap-2 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-[#23272f] hover:text-blue-600 dark:hover:text-blue-400 transition" onClick={() => setActiveClassroom(activeClassroom === (room._id || room.id) ? null : (room._id || room.id))}>
                  <Users className="h-4 w-4" /> {room.name}
                </button>
                {activeClassroom === (room._id || room.id) && (
                  <div className="ml-2 mt-2 space-y-2 rounded-2xl p-2 flex flex-col" style={{background: 'transparent'}}>
                    <a href={`/classroom/${room._id || room.id}/dashboard`} className="flex items-center gap-3 px-3 py-1 rounded-xl hover:bg-gray-100 dark:hover:bg-[#23272f] text-sm text-gray-900 dark:text-gray-100 font-medium transition">
                      <Home className="h-5 w-5 text-green-400" /> Dashboard
                    </a>
                    <a href={`/classroom/${room._id || room.id}/announcements`} className="flex items-center gap-3 px-3 py-1 rounded-xl hover:bg-gray-100 dark:hover:bg-[#23272f] text-sm text-gray-900 dark:text-gray-100 font-medium transition">
                      <Megaphone className="h-5 w-5 text-yellow-400" /> Announcements
                    </a>
                    <a href={`/classroom/${room._id || room.id}/students`} className="flex items-center gap-3 px-3 py-1 rounded-xl hover:bg-gray-100 dark:hover:bg-[#23272f] text-sm text-gray-900 dark:text-gray-100 font-medium transition">
                      <Users className="h-5 w-5 text-blue-400" /> Students
                    </a>
                    <a href={`/classroom/${room._id || room.id}/assignments`} className="flex items-center gap-3 px-3 py-1 rounded-xl hover:bg-gray-100 dark:hover:bg-[#23272f] text-sm text-gray-900 dark:text-gray-100 font-medium transition">
                      <ClipboardList className="h-5 w-5 text-purple-400" /> Assignments
                    </a>
                    <a href={`/classroom/${room._id || room.id}/calls`} className="flex items-center gap-3 px-3 py-1 rounded-xl hover:bg-gray-100 dark:hover:bg-[#23272f] text-sm text-gray-900 dark:text-gray-100 font-medium transition">
                      <Phone className="h-5 w-5 text-pink-400" /> Calls
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Join a Classroom button and modal moved to the bottom of the Sidebar */}
      <div className="mt-auto w-full">
        <div className="mb-6">
          <button className="w-56 mx-auto py-2 mt-8 rounded-xl bg-gradient-to-r from-green-500 to-green-400 text-white font-bold text-base flex items-center justify-center gap-2 shadow hover:from-green-600 hover:to-green-500 transition" onClick={() => setJoinModalOpen(true)}>
            + Join a Classroom
          </button>
        </div>
        {joinModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-[#23272f] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Join a Classroom</h2>
              <form onSubmit={async e => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const link = form.inviteLink.value.trim();
                const match = link.match(/join\/?([a-zA-Z0-9]+)/);
                if (!match) {
                  alert("Invalid invite link!");
                  return;
                }
                const inviteCode = match[1];
                const res = await fetch(`http://localhost:4000/api/classrooms/join/${inviteCode}`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ userId })
                });
                const data = await res.json();
                if (data.classroom) {
                  alert("Successfully joined classroom!");
                  setJoinModalOpen(false);
                  fetchClassrooms(); // Auto-refresh sidebar
                  // Optionally trigger dashboard refresh here
                } else {
                  alert(data.message || "Failed to join classroom!");
                }
              }}>
                <input name="inviteLink" type="text" className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white mb-6 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Paste invite link here..." />
                <div className="flex justify-end gap-2">
                  <button type="button" className="px-4 py-2 rounded-lg bg-gray-300 text-gray-700 hover:bg-gray-400 transition" onClick={() => setJoinModalOpen(false)}>Cancel</button>
                  <button type="submit" className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition">Join</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

/* Add this to your sidebar CSS or Tailwind classes:
   'overflow-y-scroll scrollbar-hide' (if using Tailwind)
   Or in CSS:
   .sidebar::-webkit-scrollbar { display: none; }
*/

/* Add this to your global CSS or Tailwind classes for better light mode appearance:
   .sidebar li {
     @apply flex items-center gap-3 px-4 py-2 rounded-lg text-gray-900 font-bold hover:bg-gray-100 hover:text-blue-600 transition;
   }
*/

/* In your main App router (not shown here), make sure to add:
   <Route path="/chat" element={<ChatPage />} />
*/
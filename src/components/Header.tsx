import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Search, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";

const Header = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState({ name: "User", email: "", profilePic: "" });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newClassroom, setNewClassroom] = useState({ name: '', subject: '' });
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    console.log('Header: userId from localStorage:', userId);
    if (!userId) return;
    fetch(`http://localhost:4000/api/user?userId=${userId}`)
      .then(res => {
        console.log('Header: fetch response status:', res.status);
        return res.json();
      })
      .then(data => {
        console.log('Header: fetched user data:', data);
        const userObj = {
          name: data.name && data.name.trim() ? data.name : (data.email ? data.email.split('@')[0] : "User"),
          email: data.email || "",
          profilePic: data.profilePic || ""
        };
        setUser(userObj);
        console.log('Header: setUser called with:', userObj);
      })
      .catch(err => {
        console.error('Header: error fetching user:', err);
      });
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("userId");
    // If you store a token, remove it here as well
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white dark:bg-[#181a20] shadow-sm">
      <div className="flex h-14 items-center justify-between px-6">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search channels, assignments..."
              className="pl-9 pr-3 py-2 bg-gray-100 dark:bg-[#23272f] border-none focus-visible:ring-1 focus-visible:ring-primary rounded-lg text-sm shadow-sm"
            />
          </div>
        </div>
        <div className="flex items-center space-x-4 relative">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="relative rounded-full bg-gray-100 dark:bg-[#23272f] hover:bg-gray-200 dark:hover:bg-gray-700 shadow p-2">
            <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-accent rounded-full"></span>
          </Button>
          <div className="relative">
            <button
              className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 dark:bg-[#23272f] text-white border border-gray-300 dark:border-gray-700 shadow"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {user.profilePic ? (
                <Avatar className="h-7 w-7">
                  <AvatarImage src={user.profilePic} />
                  <AvatarFallback className="bg-green-600 text-white">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
              ) : (
                <Avatar className="h-7 w-7">
                  <AvatarFallback className="bg-green-600 text-white">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
              )}
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-[#23272f] rounded-2xl shadow-2xl z-50 py-7 flex flex-col items-center justify-center border border-gray-200 dark:border-gray-800 backdrop-blur-md">
                <div className="flex flex-col items-center p-4 w-full">
                  {user.profilePic ? (
                    <img src={user.profilePic} alt="Profile" className="h-14 w-14 rounded-full object-cover mb-3 border-2 border-green-500 shadow" />
                  ) : (
                    <div className="h-14 w-14 rounded-full bg-green-600 flex items-center justify-center text-white text-2xl font-bold mb-3 shadow">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="font-bold text-lg mb-1 text-gray-900 dark:text-white">{user.name}</span>
                  <span className="text-gray-500 dark:text-gray-300 text-sm mb-2">{user.email}</span>
                </div>
                <div className="w-full border-t border-gray-200 dark:border-gray-700 mb-3"></div>
                <div className="w-full flex flex-col gap-1 px-6 mb-2">
                  <button className="flex items-center gap-2 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition text-sm font-medium">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" /></svg>
                    Manage Account
                  </button>
                  <button className="flex items-center gap-2 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition text-sm font-medium">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3" /><circle cx="12" cy="12" r="10" /></svg>
                    Settings
                  </button>
                  <button className="flex items-center gap-2 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition text-sm font-medium">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 10h.01M12 10h.01M16 10h.01M9 16h6" /><circle cx="12" cy="12" r="10" /></svg>
                    Help
                  </button>
                </div>
                <div className="w-full border-t border-gray-200 dark:border-gray-700 mb-3"></div>
                <button className="flex items-center gap-2 justify-center w-48 px-5 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600 text-base font-semibold rounded-lg transition" onClick={handleSignOut}>
                  <LogOut className="h-5 w-5" /> Sign Out
                </button>
              </div>
            )}
          </div>
          <button className="ml-3 px-4 py-2 bg-gradient-to-r from-green-500 via-green-400 to-green-600 text-white rounded-lg font-bold shadow hover:scale-105 hover:from-green-400 hover:to-green-700 transition-all duration-200 text-sm" onClick={() => setShowCreateModal(true)}>
            + Create Classroom
          </button>
        </div>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-[#23272f] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8 w-full max-w-md flex flex-col">
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Create Classroom</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Set up a new classroom for your students. Fill in the details below.</p>
            <form className="flex flex-col gap-4" onSubmit={async e => {
              e.preventDefault();
              setCreating(true);
              const userId = localStorage.getItem("userId");
              const classroomData = { ...newClassroom, userId, active: true, students: 0 };
              const res = await fetch('http://localhost:4000/api/classrooms', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(classroomData),
              });
              if (res.ok) {
                setShowCreateModal(false);
                setNewClassroom({ name: '', subject: '' });
                window.dispatchEvent(new Event('classroomCreated'));
              } else {
                alert('Failed to create classroom');
              }
              setCreating(false);
            }}>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Classroom Name</label>
                <input type="text" className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Enter classroom name" value={newClassroom.name} onChange={e => setNewClassroom({ ...newClassroom, name: e.target.value })} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Subject</label>
                <input type="text" className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Enter subject" value={newClassroom.subject} onChange={e => setNewClassroom({ ...newClassroom, subject: e.target.value })} required />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button type="button" className="px-4 py-2 rounded-lg bg-gray-400 text-white hover:bg-gray-500 transition" onClick={() => setShowCreateModal(false)}>Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition" disabled={creating}>{creating ? 'Creating...' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
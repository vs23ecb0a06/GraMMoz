import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Index from "./pages/Index";
import Channel from "./pages/Channel";
import NotFound from "./pages/NotFound";
import NewDashboard from "./components/NewDashboard";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AnnouncementPage from "@/pages/AnnouncementPage";
import StudentsPage from "./pages/StudentsPage";
import ClassroomWIPPage from "./pages/ClassroomWIPPage";
import ClassroomDashboardPage from "./pages/ClassroomDashboardPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="eduspace-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/dashboard"
              element={
                <div className="min-h-screen ">
                  <Sidebar />
                  <div className="ml-64">
                    <Header />
                    <main className="p-8">
                      <NewDashboard />
                    </main>
                  </div>
                </div>
              }
            />
            <Route path="/channel/:id" element={<Channel />} />
            <Route path="/classroom/:id" element={<ClassroomWIPPage />} />
            <Route path="/classroom/:id/announcements" element={<AnnouncementPage />} />
            <Route path="/classroom/:id/students" element={<StudentsPage />} />
            <Route path="/classroom/:id/dashboard" element={<ClassroomDashboardPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

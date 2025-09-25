import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ChannelCard from "@/components/ChannelCard";
import { Plus, BookOpen, Users, Calendar, TrendingUp, FileText } from "lucide-react";

const Dashboard = () => {
  const channels = [
    {
      id: "1",
      title: "Mathematics 101",
      subject: "Advanced Calculus",
      teacher: "Dr. Sarah Johnson",
      studentCount: 28,
      assignmentCount: 12,
      nextClass: "Today, 2:00 PM",
      color: "#3B82F6"
    },
    {
      id: "2", 
      title: "Physics Lab",
      subject: "Quantum Mechanics",
      teacher: "Prof. Michael Chen",
      studentCount: 15,
      assignmentCount: 8,
      nextClass: "Tomorrow, 10:00 AM",
      color: "#10B981"
    },
    {
      id: "3",
      title: "Computer Science",
      subject: "Data Structures",
      teacher: "Dr. Emily Rodriguez",
      studentCount: 35,
      assignmentCount: 15,
      nextClass: "Friday, 9:00 AM",
      color: "#F59E0B"
    },
    {
      id: "4",
      title: "Literature",
      subject: "Modern Poetry",
      teacher: "Prof. James Wilson",
      studentCount: 22,
      assignmentCount: 6,
      color: "#EF4444"
    }
  ];

  const stats = [
    {
      title: "Active Channels",
      value: "4",
      icon: BookOpen,
      color: "text-primary"
    },
    {
      title: "Total Students",
      value: "100",
      icon: Users,
      color: "text-success"
    },
    {
      title: "Assignments Due",
      value: "8",
      icon: Calendar,
      color: "text-warning"
    },
    {
      title: "Completion Rate",
      value: "92%",
      icon: TrendingUp,
      color: "text-accent"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-primary-glow rounded-2xl p-8 text-white">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
          <p className="text-primary-foreground/90 mb-6">
            You have 3 upcoming classes and 8 assignments due this week. Stay on track with your learning journey.
          </p>
          <div className="flex space-x-3">
            <Button variant="secondary" size="lg">
              <Plus className="h-5 w-5 mr-2" />
              Create Channel
            </Button>
            <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
              View Schedule
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-gradient-card shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm font-medium">{stat.title}</p>
                    <p className="text-2xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-muted/50 ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 rounded-lg bg-muted/30">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium">New assignment posted in Mathematics 101</p>
                <p className="text-sm text-muted-foreground">Calculus Problem Set #3 - Due Monday</p>
              </div>
              <Badge variant="secondary">New</Badge>
            </div>
            <div className="flex items-center space-x-4 p-3 rounded-lg bg-muted/30">
              <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-success" />
              </div>
              <div className="flex-1">
                <p className="font-medium">3 students joined Physics Lab</p>
                <p className="text-sm text-muted-foreground">Welcome new learners!</p>
              </div>
              <Badge variant="outline">2h ago</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Channels Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Your Channels</h2>
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Channel
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {channels.map((channel) => (
            <ChannelCard key={channel.id} {...channel} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Calendar, 
  Users, 
  FileText, 
  BookOpen, 
  MessageSquare, 
  Clock,
  Download,
  Upload,
  CheckCircle
} from "lucide-react";

const Channel = () => {
  const { id } = useParams();

  // Mock data - in real app this would come from API
  const channelData = {
    id: "1",
    title: "Mathematics 101",
    subject: "Advanced Calculus",
    teacher: "Dr. Sarah Johnson",
    studentCount: 28,
    description: "Advanced calculus course covering limits, derivatives, and integrals with real-world applications.",
    nextClass: "Today, 2:00 PM",
    color: "#3B82F6"
  };

  const announcements = [
    {
      id: 1,
      title: "Midterm Exam Schedule",
      content: "The midterm exam will be held on March 15th at 2:00 PM. Please review chapters 1-6.",
      author: "Dr. Sarah Johnson",
      date: "2 days ago",
      important: true
    },
    {
      id: 2,
      title: "New Study Materials Available",
      content: "I've uploaded additional practice problems for this week's topics.",
      author: "Dr. Sarah Johnson", 
      date: "1 week ago",
      important: false
    }
  ];

  const assignments = [
    {
      id: 1,
      title: "Calculus Problem Set #3",
      dueDate: "Monday, 11:59 PM",
      points: 100,
      status: "assigned",
      submitted: 23,
      total: 28
    },
    {
      id: 2,
      title: "Integration Techniques Quiz",
      dueDate: "Friday, 3:00 PM", 
      points: 50,
      status: "graded",
      submitted: 28,
      total: 28
    }
  ];

  const materials = [
    {
      id: 1,
      title: "Lecture 8: Integration by Parts",
      type: "PDF",
      uploadDate: "Yesterday",
      size: "2.4 MB"
    },
    {
      id: 2,
      title: "Practice Problems - Chapter 6",
      type: "PDF",
      uploadDate: "3 days ago", 
      size: "1.8 MB"
    },
    {
      id: 3,
      title: "Video: Calculus Applications",
      type: "Video",
      uploadDate: "1 week ago",
      size: "45.2 MB"
    }
  ];

  const students = [
    { name: "Alice Johnson", email: "alice@student.edu", status: "active" },
    { name: "Bob Smith", email: "bob@student.edu", status: "active" },
    { name: "Carol Davis", email: "carol@student.edu", status: "active" },
    { name: "David Wilson", email: "david@student.edu", status: "active" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="pl-64">
        <Header />
        <main className="p-6">
          <div className="space-y-6">
      {/* Channel Header */}
      <div className="bg-gradient-to-r from-primary to-primary-glow rounded-2xl p-8 text-white">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div 
              className="h-16 w-16 rounded-xl flex items-center justify-center text-white font-bold text-2xl"
              style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
            >
              {channelData.title.charAt(0)}
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-1">{channelData.title}</h1>
              <p className="text-primary-foreground/90 mb-2">{channelData.subject}</p>
              <p className="text-primary-foreground/80 text-sm">by {channelData.teacher}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 text-primary-foreground/90 mb-2">
              <Users className="h-4 w-4" />
              <span>{channelData.studentCount} students</span>
            </div>
            {channelData.nextClass && (
              <div className="flex items-center space-x-2 text-primary-foreground/90">
                <Calendar className="h-4 w-4" />
                <span>{channelData.nextClass}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Channel Content Tabs */}
      <Tabs defaultValue="stream" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-muted/50">
          <TabsTrigger value="stream" className="flex items-center space-x-2">
            <MessageSquare className="h-4 w-4" />
            <span>Stream</span>
          </TabsTrigger>
          <TabsTrigger value="assignments" className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>Assignments</span>
          </TabsTrigger>
          <TabsTrigger value="people" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>People</span>
          </TabsTrigger>
          <TabsTrigger value="materials" className="flex items-center space-x-2">
            <BookOpen className="h-4 w-4" />
            <span>Materials</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="stream" className="space-y-4 mt-6">
          {announcements.map((announcement) => (
            <Card key={announcement.id} className="bg-gradient-card shadow-card">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{announcement.author}</p>
                      <p className="text-sm text-muted-foreground">{announcement.date}</p>
                    </div>
                  </div>
                  {announcement.important && (
                    <Badge variant="destructive">Important</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold mb-2">{announcement.title}</h3>
                <p className="text-muted-foreground">{announcement.content}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4 mt-6">
          {assignments.map((assignment) => (
            <Card key={assignment.id} className="bg-gradient-card shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{assignment.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>Due {assignment.dueDate}</span>
                        </div>
                        <span>•</span>
                        <span>{assignment.points} points</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant={assignment.status === 'graded' ? 'default' : 'secondary'}
                      className={assignment.status === 'graded' ? 'bg-success text-success-foreground' : ''}
                    >
                      {assignment.status === 'graded' ? 'Graded' : 'Assigned'}
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-1">
                      {assignment.submitted}/{assignment.total} submitted
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="people" className="space-y-4 mt-6">
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle>Teacher</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{channelData.teacher}</p>
                  <p className="text-sm text-muted-foreground">sarah.johnson@university.edu</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle>Students ({students.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {students.map((student, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-muted/30">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">{student.email}</p>
                    </div>
                    <Badge variant="outline" className="text-success border-success">
                      Active
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="materials" className="space-y-4 mt-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Course Materials</h3>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload Material
            </Button>
          </div>
          
          {materials.map((material) => (
            <Card key={material.id} className="bg-gradient-card shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{material.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                        <span>{material.type}</span>
                        <span>•</span>
                        <span>{material.size}</span>
                        <span>•</span>
                        <span>Uploaded {material.uploadDate}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Channel;
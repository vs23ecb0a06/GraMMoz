import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import NewDashboard from "@/components/NewDashboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="pl-64">
        <Header />
        <main className="p-6">
          <NewDashboard />
        </main>
      </div>
    </div>
  );
};

export default Index;

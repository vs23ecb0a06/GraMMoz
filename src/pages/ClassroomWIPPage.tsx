import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useParams } from "react-router-dom";

const ClassroomWIPPage = () => {
  const { id } = useParams();
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="ml-64 flex flex-col">
        <Header />
        <main className="flex-1 p-8 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Work in progress</h1>
          <p className="text-lg text-gray-500 dark:text-gray-300">This classroom page is under construction.</p>
        </main>
      </div>
    </div>
  );
};

export default ClassroomWIPPage;

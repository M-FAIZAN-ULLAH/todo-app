("use client");
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "../context/userContext";
import Navbar from "./navbar";
import TodoList from "./todoCard";

const Dashboard = () => {
  const { user, getUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!getUser()) {
      router.push("/login"); // Redirect to login if user is not found
    }
  }, [getUser, router]);

  if (!user) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <span className="text-white">Redirecting to Login...</span>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      <div className="p-6">
        <TodoList />
      </div>
    </div>
  );
};

export default Dashboard;

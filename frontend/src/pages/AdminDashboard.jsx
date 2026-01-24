import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import config from "../config";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalSkills: 0,
    totalSkillPaths: 0,
    totalEnrollments: 0,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://skillbridge-backend.onrender.com/api/admin/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (response.ok) setStats(data);
      } catch (err) {
        setError("Failed to load stats");
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        
        {/* KPI Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow border-l-4 border-blue-500">
            <p className="text-gray-500">Total Modules (Skills)</p>
            <p className="text-4xl font-bold mt-2">{stats.totalSkills}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow border-l-4 border-green-500">
            <p className="text-gray-500">Active Courses (Paths)</p>
            <p className="text-4xl font-bold mt-2">{stats.totalSkillPaths}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow border-l-4 border-purple-500">
            <p className="text-gray-500">Total Enrollments</p>
            <p className="text-4xl font-bold mt-2">{stats.totalEnrollments}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* 1. Add Skill (The Brick) */}
          <Link to="/admin/add-skill" className="group block">
            <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition border border-gray-100 group-hover:border-blue-200">
              <div className="flex items-center gap-4">
                <span className="bg-blue-100 text-blue-600 p-3 rounded-lg text-2xl">🧱</span>
                <div>
                  <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition">Step 1: Add New Module</h3>
                  <p className="text-gray-500 mt-1">Create individual topics (Readings & Quizzes).</p>
                </div>
              </div>
            </div>
          </Link>

          {/* 2. Create Path (The Course) */}
          <Link to="/admin/create-path" className="group block">
            <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition border border-gray-100 group-hover:border-green-200">
              <div className="flex items-center gap-4">
                <span className="bg-green-100 text-green-600 p-3 rounded-lg text-2xl">Qb</span>
                <div>
                  <h3 className="font-bold text-lg text-gray-800 group-hover:text-green-600 transition">Step 2: Create Course</h3>
                  <p className="text-gray-500 mt-1">Bundle your modules into a full course.</p>
                </div>
              </div>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
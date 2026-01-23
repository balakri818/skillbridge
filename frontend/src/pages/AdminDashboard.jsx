import { useEffect, useState } from "react";

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

        const response = await fetch(
          "http://localhost:5000/api/admin/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Failed to load stats");
          return;
        }

        setStats(data);
      } catch (err) {
        setError("Something went wrong");
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 mt-1">
          Platform overview and management
        </p>

        {error && (
          <p className="mt-4 text-red-600 font-medium">
            {error}
          </p>
        )}

        {/* KPI Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Total Skills</p>
            <p className="text-4xl font-bold mt-2">
              {stats.totalSkills}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Total Skill Paths</p>
            <p className="text-4xl font-bold mt-2">
              {stats.totalSkillPaths}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Total Enrollments</p>
            <p className="text-4xl font-bold mt-2">
              {stats.totalEnrollments}
            </p>
          </div>
        </div>

        {/* Admin Actions */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-900">
            Admin Actions
          </h2>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
              <h3 className="font-semibold text-lg">
                Manage Skills
              </h3>
              <p className="text-gray-600 mt-2">
                Add, edit, or remove skills available on the platform.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
              <h3 className="font-semibold text-lg">
                Create Skill Paths
              </h3>
              <p className="text-gray-600 mt-2">
                Organize skills into structured learning paths.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
              <h3 className="font-semibold text-lg">
                Monitor Enrollments
              </h3>
              <p className="text-gray-600 mt-2">
                Track student participation and engagement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

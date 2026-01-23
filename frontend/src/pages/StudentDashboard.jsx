import { useEffect, useState } from "react";

function StudentDashboard() {
  const [enrollments, setEnrollments] = useState([]);
  const name = localStorage.getItem("name");

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/enrollments/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        setEnrollments(data);
      } catch (error) {
        console.error("Failed to load enrollments");
      }
    };

    fetchEnrollments();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900">
          Student Dashboard
        </h1>
        {name && (
          <p className="text-gray-600 mt-1">
            Welcome back, <span className="font-medium">{name}</span> 👋
          </p>
        )}

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Enrolled Skill Paths</p>
            <p className="text-3xl font-bold mt-2">
              {enrollments.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Average Progress</p>
            <p className="text-3xl font-bold mt-2">
              {enrollments.length === 0
                ? "0%"
                : `${Math.round(
                    enrollments.reduce(
                      (acc, e) => acc + e.progress,
                      0
                    ) / enrollments.length
                  )}%`}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Account Type</p>
            <p className="text-3xl font-bold mt-2">Student</p>
          </div>
        </div>

        {/* Enrollments */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-900">
            My Skill Paths
          </h2>

          {enrollments.length === 0 ? (
            <p className="mt-4 text-gray-600">
              You haven’t enrolled in any skill paths yet.
            </p>
          ) : (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrollments.map((item) => (
                <div
                  key={item._id}
                  className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.skillPath.title}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Progress: {item.progress}%
                  </p>

                  <div className="mt-4 h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-blue-600 rounded-full"
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;

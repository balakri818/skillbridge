import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function StudentDashboard() {
  const [enrollments, setEnrollments] = useState([]);
  const name = localStorage.getItem("name");
  const navigate = useNavigate();

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

        if (Array.isArray(data)) {
          setEnrollments(data);
        } else {
          setEnrollments([]);
        }
      } catch (error) {
        console.error("Failed to load enrollments");
        setEnrollments([]);
      }
    };

    fetchEnrollments();
  }, []);

  const completedCount = enrollments.filter(e => e.progress === 100).length;
  const totalInProgressKPI = enrollments.length - completedCount;

  // Chart Data Preparation
  const activeInProgressCount = enrollments.filter(e => e.progress > 0 && e.progress < 100).length;
  const notStartedCount = enrollments.filter(e => e.progress === 0).length;

  const pieData = [
    { name: "Completed", value: completedCount },
    { name: "In Progress", value: activeInProgressCount },
    { name: "Not Started", value: notStartedCount },
  ];
  const COLORS = ["#10b981", "#3b82f6", "#9ca3af"]; // green, blue, gray

  const barData = enrollments.map(e => ({
    name: e.skillPath?.title || "Course",
    progress: e.progress || 0
  }));

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="bg-gray-50 min-h-screen p-8 lg:p-12 font-sans tracking-wide">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-wide">
          {getGreeting()}, <span className="capitalize">{name || "Student"}</span>
        </h1>
        <p className="text-gray-500 mt-3 text-sm md:text-base">
          Here's an overview of your learning progress.
        </p>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-100 p-6 rounded-2xl flex items-center gap-5 shadow-sm hover:shadow-md transition">
            <div className="bg-blue-50 p-4 rounded-xl text-blue-600">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Enrolled Courses</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{enrollments.length}</p>
            </div>
          </div>

          <div className="bg-white border border-gray-100 p-6 rounded-2xl flex items-center gap-5 shadow-sm hover:shadow-md transition">
            <div className="bg-indigo-50 p-4 rounded-xl text-indigo-500">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">In Progress</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{totalInProgressKPI}</p>
            </div>
          </div>

          <div className="bg-white border border-gray-100 p-6 rounded-2xl flex items-center gap-5 shadow-sm hover:shadow-md transition">
            <div className="bg-green-50 p-4 rounded-xl text-green-500">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M18.75 4.236c.982.143 1.954.317 2.916.52a6.003 6.003 0 0 1-5.395 4.972M10.5 2.25H13.5c.83 0 1.5.67 1.5 1.5v1.25H9v-1.25c0-.83.67-1.5 1.5-1.5Z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Completed</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{completedCount}</p>
            </div>
          </div>
        </div>

        {/* Analytics Section */}
        {enrollments.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Analytics & Insights</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Donut Chart */}
              <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Course Status</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 mt-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-green-500"></span> Completed</div>
                  <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-blue-500"></span> In Progress</div>
                  <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-gray-400"></span> Not Started</div>
                </div>
              </div>

              {/* Bar Chart */}
              <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Individual Course Progress</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                      <XAxis dataKey="name" tick={{fontSize: 12, fill: '#6B7280'}} tickLine={false} axisLine={false} />
                      <YAxis tick={{fontSize: 12, fill: '#6B7280'}} tickLine={false} axisLine={false} />
                      <Tooltip cursor={{fill: '#F3F4F6'}} />
                      <Bar dataKey="progress" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={50} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
            </div>
          </div>
        )}

        {/* Enrollments View */}
        <div className="mt-14">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Courses</h2>
            <button 
              onClick={() => navigate("/skills")} 
              className="border border-gray-300 text-gray-600 px-5 py-2 rounded-lg text-sm font-medium hover:bg-white hover:shadow-sm transition"
            >
              Browse More
            </button>
          </div>

          {enrollments.length === 0 ? (
            <p className="mt-6 text-gray-500">No courses enrolled yet.</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {enrollments.map((item, index) => (
                <div
                  key={index}
                  onClick={() => navigate("/skill", { state: { skill: item.skillPath } })}
                  className="bg-white border border-gray-100 p-7 rounded-2xl hover:border-blue-200 hover:shadow-md transition cursor-pointer flex flex-col justify-between min-h-[220px]"
                >
                  <div>
                    <div className="flex justify-between items-start">
                      <p className="text-blue-600 text-sm font-bold tracking-wide uppercase">
                         {item?.skillPath?.title?.split(" ")[0] || "Course Domain"}
                      </p>
                      {item.progress === 100 && (
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-bold border border-green-200">
                          Completed
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mt-3 tracking-tight">
                      {item?.skillPath?.title || "Skill"}
                    </h3>

                    <div className="mt-14 flex justify-between text-sm text-gray-500 mb-3 font-medium">
                      <span>Progress</span>
                      <span className="text-gray-900 font-bold">{item?.progress || 0}%</span>
                    </div>
                    
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden border border-gray-200/50">
                      <div
                        className="h-full bg-blue-600 rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${item?.progress || 0}%` }}
                      ></div>
                    </div>
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
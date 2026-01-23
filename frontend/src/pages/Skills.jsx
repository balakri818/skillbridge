import { useEffect, useState } from "react";

function Skills() {
  const [skillPaths, setSkillPaths] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchSkillPaths = async () => {
      try {
        const token = localStorage.getItem("token");
        // FIX: Fetch "skill-paths" (structured courses) instead of raw "skills"
        const response = await fetch("http://localhost:5000/api/skill-paths", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setSkillPaths(data);
      } catch (err) {
        setMessage("Failed to load learning paths");
      }
    };

    fetchSkillPaths();
  }, []);

  const handleEnroll = async (skillPathId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/enrollments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            skillPathId,
          }),
        }
      );

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("Enrollment failed");
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Available Learning Paths</h2>

      {message && <div className="mb-4 p-4 bg-blue-100 text-blue-700 rounded">{message}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillPaths.map((path) => (
          <div key={path._id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border">
            <h3 className="text-xl font-bold text-gray-800">{path.title}</h3>
            <p className="text-gray-600 mt-2 text-sm">{path.description}</p>
            
            {/* Show what skills are inside this path */}
            <div className="mt-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Includes:</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {path.skills && path.skills.map(skill => (
                  <span key={skill._id} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                    {skill.title}
                  </span>
                ))}
              </div>
            </div>

            <button 
              onClick={() => handleEnroll(path._id)}
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Enroll Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skills;
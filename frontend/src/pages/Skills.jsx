import { useEffect, useState } from "react";
import config from "../config";

function Skills() {
  const [skillPaths, setSkillPaths] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchSkillPaths = async () => {
      try {
        const token = localStorage.getItem("token");
        // 👇 CHANGED: Now fetching "skill-paths" (Courses) instead of "skills"
        const response = await fetch("http://localhost:5000/api/skill-paths", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        
        // Safety check: ensure data is an array
        if (Array.isArray(data)) {
          setSkillPaths(data);
        } else {
          setSkillPaths([]);
        }
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
        "https://skillbridge-backend.onrender.com/api/enrollments",
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
      if (response.ok) {
        setMessage("🎉 Enrolled successfully! Go to your Dashboard.");
      } else {
        setMessage(data.message || "Enrollment failed");
      }
    } catch (error) {
      setMessage("Enrollment failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Available Courses</h2>

        {message && (
          <div className="mb-6 p-4 bg-blue-100 text-blue-800 rounded-lg border border-blue-200">
            {message}
          </div>
        )}

        {skillPaths.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
            <p className="text-gray-500 text-lg">No courses available yet.</p>
            <p className="text-gray-400 text-sm mt-1">Ask the Admin to create a Skill Path.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillPaths.map((path) => (
              <div key={path._id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full">
                <div className="p-6 flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">
                      Course
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{path.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {path.description}
                  </p>
                  
                  {/* Show included modules */}
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs font-bold text-gray-500 uppercase mb-2">Includes Modules:</p>
                    <div className="flex flex-wrap gap-2">
                      {path.skills && path.skills.length > 0 ? (
                        path.skills.map(skill => (
                          <span key={skill._id} className="bg-white border text-gray-700 px-2 py-1 rounded text-xs shadow-sm">
                            {skill.title}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400 text-xs italic">No modules added yet</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 mt-auto">
                  <button 
                    onClick={() => handleEnroll(path._id)}
                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 active:scale-95 transition-all shadow-md hover:shadow-lg"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Skills;
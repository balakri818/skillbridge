import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SkillDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [skill, setSkill] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [expandedTopic, setExpandedTopic] = useState(null);

  const topicLinks = {
    // DSA
    "Time & Space Complexity": "https://www.geeksforgeeks.org/time-complexity-and-space-complexity/",
    "Arrays & Strings": "https://www.geeksforgeeks.org/array-data-structure/",
    "Linked Lists & Trees": "https://www.geeksforgeeks.org/data-structures/linked-list/",
    "Dynamic Programming": "https://www.geeksforgeeks.org/dynamic-programming/",

    // DBMS
    "Entity-Relationship Model": "https://www.geeksforgeeks.org/introduction-of-er-model/",
    "SQL Constraints & Queries": "https://www.geeksforgeeks.org/sql-ddl-dql-dml-dcl-tcl-commands/",
    "Normalization": "https://www.geeksforgeeks.org/introduction-of-database-normalization/",
    "Transaction Management": "https://www.geeksforgeeks.org/transaction-management-in-dbms/",

    // Full-Stack
    "Frontend Frameworks": "https://www.geeksforgeeks.org/react-tutorial/",
    "Backend APIs": "https://www.geeksforgeeks.org/express-js/",
    "Authentication Middleware": "https://www.geeksforgeeks.org/json-web-token-jwt/",
    "Database Integration": "https://www.geeksforgeeks.org/mongoose-tutorial/",

    // OS
    "Process & Threads": "https://www.geeksforgeeks.org/difference-between-process-and-thread/",
    "CPU Scheduling Algorithms": "https://www.geeksforgeeks.org/cpu-scheduling-in-operating-systems/",
    "Memory Management": "https://www.geeksforgeeks.org/memory-management-in-operating-system/",
    "Deadlocks": "https://www.geeksforgeeks.org/introduction-of-deadlock-in-operating-system/",

    // ML
    "Linear Regression": "https://www.geeksforgeeks.org/ml-linear-regression/",
    "Classification": "https://www.geeksforgeeks.org/getting-started-with-classification/",
    "Clustering Algorithms": "https://www.geeksforgeeks.org/clustering-in-machine-learning/",
    "Neural Networks Overview": "https://www.geeksforgeeks.org/neural-networks-a-beginners-guide/"
  };

  const getGfgArticleLink = (topicName) => {
    if (topicLinks[topicName]) return topicLinks[topicName];
    // Fallback: build a slug-based URL
    const slug = topicName.toLowerCase().replace(/ & /g, "-and-").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    return `https://www.geeksforgeeks.org/${slug}/`;
  };

  const toggleTopic = (index) => {
    setExpandedTopic(expandedTopic === index ? null : index);
  };

  useEffect(() => {
    if (state && state.skill) {
      setSkill(state.skill);
      checkEnrollment(state.skill._id);
    }
  }, [state]);

  const checkEnrollment = async (skillId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch("http://localhost:5000/api/enrollments/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      if (Array.isArray(data)) {
        const enrollment = data.find(e => 
          (e.skillPath && e.skillPath._id === skillId) || e.skillPath === skillId
        );
        if (enrollment) {
          setIsEnrolled(true);
          setProgress(enrollment.progress || 0);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  const handleEnroll = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in to enroll in a skill path.");
        navigate("/login");
        return;
      }

      const res = await fetch("http://localhost:5000/api/enrollments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ skillPathId: skill._id })
      });
      if (res.ok) {
        setIsEnrolled(true);
        alert("Enrolled successfully!");
      } else {
        const data = await res.json();
        alert(data.message || "Failed to enroll");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleComplete = async () => {
    if (!isEnrolled) {
      alert("Please enroll first!");
      return;
    }
    const step = Math.ceil(100 / (skill.topics?.length || 4));
    const newProgress = Math.min(progress + step, 100);
    setProgress(newProgress);
    
    try {
      const token = localStorage.getItem("token");
      await fetch("http://localhost:5000/api/enrollments/progress", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ skillPathId: skill._id, progress: newProgress })
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (!skill) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-bold">No Skill Data</h2>
        <p>Please go back and select a skill.</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center bg-white p-6 shadow rounded mb-6">
        <div>
          <h1 className="text-3xl font-bold">{skill.title}</h1>
          <p className="mt-2 text-gray-600">{skill.description}</p>
        </div>
        {!isEnrolled ? (
          <button 
            onClick={handleEnroll}
            className="bg-blue-600 font-bold text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Enroll Now
          </button>
        ) : (
          <span className="bg-green-100 text-green-800 font-bold px-4 py-2 rounded-lg">
            Enrolled ✅
          </span>
        )}
      </div>

      <h2 className="mt-6 font-semibold text-xl">Topics</h2>

      {skill.topics && skill.topics.length > 0 ? (
        skill.topics.map((t, i) => {
          const isExpanded = expandedTopic === i;
          return (
            <div key={i} className="mt-4 bg-white shadow rounded overflow-hidden">
              <div 
                className="p-4 cursor-pointer flex justify-between items-center hover:bg-gray-50 border-b border-transparent hover:border-gray-100 transition"
                onClick={() => toggleTopic(i)}
              >
                <div>
                  <h3 className="font-bold text-lg">{t.name}</h3>
                  <p className="text-gray-600 mt-1 text-sm">{t.content}</p>
                </div>
                <div className="text-gray-400">
                  {isExpanded ? "▲" : "▼"}
                </div>
              </div>

              {isExpanded && (
                <div className="p-5 bg-gray-50 border-t border-gray-100 animate-fadeIn">
                  <h4 className="font-semibold text-gray-800 mb-2">Detailed Learning Info</h4>
                  <p className="text-sm text-gray-700 mb-5 leading-relaxed">
                    In this module, you will master the core principles of <strong>{t.name}</strong>. 
                    This foundation is critical for advanced problem-solving and optimization. Dive into the 
                    curated resources below to gain a comprehensive understanding before marking this topic as completed.
                  </p>

                  <h4 className="font-semibold text-gray-800 mb-2">Recommended Resources</h4>
                  <ul className="list-disc list-inside text-sm text-blue-600 mb-6 space-y-1">
                    <li>
                      <a 
                        href={getGfgArticleLink(t.name)}
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:underline"
                      >
                        GeeksforGeeks: Articles & Tutorials on {t.name}
                      </a>
                    </li>
                    <li>
                      <a 
                        href={`https://practice.geeksforgeeks.org/explore?page=1&search=${encodeURIComponent(t.name)}`}
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:underline"
                      >
                        GeeksforGeeks: Practice Exercises for {t.name}
                      </a>
                    </li>
                  </ul>

                  {isEnrolled && progress < 100 ? (
                    <button
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        handleComplete(); 
                      }}
                      className="bg-green-500 text-white font-medium px-5 py-2 rounded-lg hover:bg-green-600 transition shadow-sm w-fit"
                    >
                      Mark as Completed
                    </button>
                  ) : !isEnrolled ? (
                    <p className="text-sm text-red-500 italic">Please enroll to track your progress.</p>
                  ) : null}
                </div>
              )}
            </div>
          );
        })
      ) : (
        <p className="mt-4 text-gray-600">No topics available</p>
      )}

      {isEnrolled && (
        <div className="mt-8 bg-white p-6 rounded shadow">
          <p className="font-semibold text-lg">Your Progress: {progress}%</p>
          <div className="h-4 bg-gray-200 rounded-full mt-4 overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SkillDetail;
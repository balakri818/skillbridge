import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import config from "../config";

function CoursePlayer() {
  const { id } = useParams(); 
  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Quiz State
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [quizMessage, setQuizMessage] = useState("");

  // Load Course
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:5000/api/enrollments/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setEnrollment(data);
      } catch (err) {
        console.error("Error loading course");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  // Handle Quiz Submission
  const handleQuizSubmit = async (skill) => {
    if (selectedOption !== skill.correctAnswer) {
      setQuizMessage("❌ Incorrect. Try again.");
      return;
    }

    await toggleComplete(skill._id);
    setQuizMessage("✅ Correct! Module Completed.");
    setTimeout(() => {
      setActiveQuiz(null);
      setQuizMessage("");
      setSelectedOption("");
    }, 1500);
  };

  const toggleComplete = async (skillId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/enrollments/${id}/toggle-complete`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ skillId }),
      });
      
      const data = await res.json();
      if (res.ok) {
        setEnrollment(prev => ({
          ...prev,
          progress: data.progress,
          completedSkills: data.completedSkills
        }));
      }
    } catch (err) {
      alert("Failed to update progress");
    }
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!enrollment) return <div className="p-10 text-center text-red-600">Course not found.</div>;

  const { skillPath, completedSkills } = enrollment;

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Header */}
      <div className="bg-indigo-900 text-white py-10 px-8 shadow-lg">
        <div className="max-w-5xl mx-auto">
          <Link to="/student" className="text-indigo-200 hover:text-white text-sm font-medium">&larr; Dashboard</Link>
          <h1 className="text-3xl font-bold mt-2">{skillPath.title}</h1>
          <p className="text-indigo-200 mt-1">{skillPath.description}</p>
          <div className="mt-6 max-w-xl">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{enrollment.progress}%</span>
            </div>
            <div className="h-3 bg-indigo-800 rounded-full overflow-hidden">
              <div className="h-full bg-green-400 transition-all duration-500" style={{ width: `${enrollment.progress}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-6">
        {skillPath.skills && skillPath.skills.map((skill, index) => {
          const isCompleted = completedSkills.includes(skill._id);
          const isQuizzing = activeQuiz === skill._id;

          return (
            <div key={skill._id} className={`bg-white border rounded-xl p-6 shadow-sm transition-all ${isCompleted ? 'border-green-200 bg-green-50' : ''}`}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded">Module {index + 1}</span>
                    <h3 className="text-xl font-bold text-gray-900">{skill.title}</h3>
                  </div>
                  <p className="text-gray-600 mt-2">{skill.description}</p>
                  
                  {/* Links (Video Removed) */}
                  <div className="flex gap-3 mt-4">
                    {skill.readingMaterial && <a href={skill.readingMaterial} target="_blank" className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded hover:bg-blue-100 border border-blue-100">📄 Read Material</a>}
                    {skill.practiceAssignment && <a href={skill.practiceAssignment} target="_blank" className="text-sm bg-purple-50 text-purple-600 px-3 py-1 rounded hover:bg-purple-100 border border-purple-100">✍️ Practice</a>}
                  </div>

                  {/* QUIZ SECTION */}
                  {isQuizzing && (
                    <div className="mt-6 p-6 bg-yellow-50 rounded-lg border border-yellow-200 animate-fadeIn">
                      <h4 className="font-bold text-gray-800 mb-3">📝 Quiz: {skill.quizQuestion}</h4>
                      <div className="space-y-2">
                        {skill.quizOptions.map((opt, i) => (
                          <label key={i} className="flex items-center gap-3 p-3 bg-white border rounded cursor-pointer hover:bg-gray-50">
                            <input 
                              type="radio" 
                              name="quiz" 
                              value={opt} 
                              onChange={(e) => setSelectedOption(e.target.value)} 
                              checked={selectedOption === opt}
                            />
                            <span className="text-gray-700">{opt}</span>
                          </label>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center gap-4">
                        <button onClick={() => handleQuizSubmit(skill)} className="bg-indigo-600 text-white px-6 py-2 rounded font-bold hover:bg-indigo-700">Submit Answer</button>
                        <button onClick={() => setActiveQuiz(null)} className="text-gray-500 hover:text-gray-700">Cancel</button>
                      </div>
                      {quizMessage && <p className="mt-2 font-bold">{quizMessage}</p>}
                    </div>
                  )}
                </div>

                {/* Status Button */}
                <div className="ml-4">
                  {isCompleted ? (
                    <div className="flex flex-col items-center text-green-600">
                      <span className="text-2xl">✓</span>
                      <span className="text-xs font-bold">Done</span>
                    </div>
                  ) : (
                    !isQuizzing && (
                      <button 
                        onClick={() => {
                          if (skill.quizQuestion) {
                            setActiveQuiz(skill._id);
                            setQuizMessage("");
                            setSelectedOption("");
                          } else {
                            toggleComplete(skill._id);
                          }
                        }}
                        className="bg-white border-2 border-indigo-100 text-indigo-600 px-4 py-2 rounded-lg font-bold hover:bg-indigo-50 transition"
                      >
                        {skill.quizQuestion ? "Take Quiz" : "Mark Done"}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CoursePlayer;
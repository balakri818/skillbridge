import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config";

function CreateSkillPath() {
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Load available modules (bricks)
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("https://skillbridge-backend.onrender.com/api/skills", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setSkills(data);
      } catch (err) {
        console.error("Failed to load skills");
      }
    };
    fetchSkills();
  }, []);

  // Handle selection
  const handleCheckboxChange = (skillId) => {
    if (selectedSkills.includes(skillId)) {
      setSelectedSkills(selectedSkills.filter((id) => id !== skillId));
    } else {
      setSelectedSkills([...selectedSkills, skillId]);
    }
  };

  // Submit the new Course
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://skillbridge-backend.onrender.com/api/skill-paths", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          skills: selectedSkills,
        }),
      });

      if (response.ok) {
        setMessage("✅ Course created successfully!");
        setTimeout(() => navigate("/admin"), 1500);
      } else {
        setMessage("❌ Failed to create course");
      }
    } catch (error) {
      setMessage("Error submitting form");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex justify-center">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Course</h2>

        {message && <div className="bg-blue-100 text-blue-800 p-3 rounded mb-4 font-bold">{message}</div>}

        <div className="space-y-6">
          <div>
            <label className="block font-medium text-gray-700">Course Title</label>
            <input
              type="text"
              className="w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. Full Stack Development"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Description</label>
            <textarea
              className="w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="What will students learn?"
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div>
            <label className="block font-bold text-gray-800 mb-3">Select Modules to Include:</label>
            
            {skills.length === 0 ? (
              <div className="p-4 bg-yellow-50 text-yellow-800 rounded border border-yellow-200">
                ⚠️ No modules found. Please go back and "Add Skill" first.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3 max-h-60 overflow-y-auto border p-4 rounded bg-gray-50">
                {skills.map((skill) => (
                  <label key={skill._id} className="flex items-center space-x-3 p-3 bg-white border rounded cursor-pointer hover:shadow-sm">
                    <input
                      type="checkbox"
                      className="w-5 h-5 text-blue-600 rounded"
                      checked={selectedSkills.includes(skill._id)}
                      onChange={() => handleCheckboxChange(skill._id)}
                    />
                    <div>
                      <span className="text-gray-900 font-bold block">{skill.title}</span>
                      <span className="text-gray-500 text-sm">{skill.description}</span>
                    </div>
                  </label>
                ))}
              </div>
            )}
            <p className="text-sm text-gray-500 mt-2">{selectedSkills.length} modules selected.</p>
          </div>

          <button
            onClick={handleSubmit}
            disabled={selectedSkills.length === 0}
            className={`w-full text-white font-bold py-3 rounded-lg transition ${selectedSkills.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            Create Course Path
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateSkillPath;
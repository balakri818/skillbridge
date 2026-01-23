import { useState } from "react";

function AddSkill() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoUrl: "",
    readingMaterial: "",
    practiceAssignment: ""
  });
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddSkill = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/skills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setIsSuccess(false);
        setMessage(data.message || "Failed to add skill");
        return;
      }

      setIsSuccess(true);
      setMessage("Skill module added successfully!");
      setFormData({
        title: "",
        description: "",
        videoUrl: "",
        readingMaterial: "",
        practiceAssignment: ""
      });
    } catch (error) {
      setIsSuccess(false);
      setMessage("Error adding skill");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex justify-center">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-blue-600 px-8 py-6">
          <h2 className="text-2xl font-bold text-white">Add Learning Module</h2>
          <p className="text-blue-100 mt-1">Create new course content for students.</p>
        </div>

        <div className="p-8 space-y-6">
          {message && (
            <div className={`p-4 rounded-lg text-sm border ${isSuccess ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
              {message}
            </div>
          )}

          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Topic Title</label>
              <input
                name="title"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                type="text"
                placeholder="e.g. Introduction to Binary Trees"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="Brief overview of what the student will learn..."
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">🎥 Watch (Video URL)</label>
                <input
                  name="videoUrl"
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition"
                  type="text"
                  placeholder="https://youtube.com/..."
                  value={formData.videoUrl}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">📚 Read (Resource URL)</label>
                <input
                  name="readingMaterial"
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition"
                  type="text"
                  placeholder="PDF or Article Link"
                  value={formData.readingMaterial}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">✍️ Practice (Test URL)</label>
                <input
                  name="practiceAssignment"
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition"
                  type="text"
                  placeholder="Quiz/Assignment Link"
                  value={formData.practiceAssignment}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <button 
              onClick={handleAddSkill}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg shadow hover:bg-blue-700 hover:shadow-lg transition-all duration-200 transform active:scale-95"
            >
              🚀 Publish Module
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddSkill;
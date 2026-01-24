import { useState } from "react";
import config from "../config";

function AddSkill() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    readingMaterial: "",
    practiceAssignment: "",
    // Quiz Fields
    quizQuestion: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: ""
  });
  
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddSkill = async () => {
    try {
      const token = localStorage.getItem("token");
      
      const payload = {
        ...formData,
        quizOptions: [formData.optionA, formData.optionB, formData.optionC, formData.optionD],
        correctAnswer: formData.correctAnswer
      };

      const response = await fetch("https://skillbridge-backend.onrender.com/api/skills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setIsSuccess(false);
        setMessage(data.message || "Failed to add skill");
        return;
      }

      setIsSuccess(true);
      setMessage("Reading Module & Quiz added successfully!");
      setFormData({
        title: "", description: "", readingMaterial: "", practiceAssignment: "",
        quizQuestion: "", optionA: "", optionB: "", optionC: "", optionD: "", correctAnswer: ""
      });
    } catch (error) {
      setIsSuccess(false);
      setMessage("Error adding skill");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex justify-center">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-indigo-600 px-8 py-6">
          <h2 className="text-2xl font-bold text-white">Add Learning Module</h2>
          <p className="text-indigo-100 mt-1">Add reading materials and assessments.</p>
        </div>

        <div className="p-8 space-y-8">
          {message && (
            <div className={`p-4 rounded-lg text-sm border ${isSuccess ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
              {message}
            </div>
          )}

          {/* Section 1: Content */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">1. Module Content</h3>
            <div className="grid grid-cols-1 gap-5">
              <input name="title" className="border p-3 rounded w-full" type="text" placeholder="Topic Title" value={formData.title} onChange={handleChange} />
              <textarea name="description" className="border p-3 rounded w-full" rows="2" placeholder="Description" value={formData.description} onChange={handleChange} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Video Input Removed */}
                <input name="readingMaterial" className="border p-2 rounded w-full" type="text" placeholder="Reading URL (PDF/Article)" value={formData.readingMaterial} onChange={handleChange} />
                <input name="practiceAssignment" className="border p-2 rounded w-full" type="text" placeholder="Practice URL (Optional)" value={formData.practiceAssignment} onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* Section 2: Quiz */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">2. Quiz Assessment</h3>
            <div className="space-y-4">
              <input name="quizQuestion" className="border p-3 rounded w-full bg-yellow-50" type="text" placeholder="Question" value={formData.quizQuestion} onChange={handleChange} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="optionA" className="border p-2 rounded w-full" type="text" placeholder="Option A" value={formData.optionA} onChange={handleChange} />
                <input name="optionB" className="border p-2 rounded w-full" type="text" placeholder="Option B" value={formData.optionB} onChange={handleChange} />
                <input name="optionC" className="border p-2 rounded w-full" type="text" placeholder="Option C" value={formData.optionC} onChange={handleChange} />
                <input name="optionD" className="border p-2 rounded w-full" type="text" placeholder="Option D" value={formData.optionD} onChange={handleChange} />
              </div>

              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Correct Answer</label>
                <input name="correctAnswer" className="border p-2 rounded w-full border-green-300" type="text" placeholder="Paste the correct option here" value={formData.correctAnswer} onChange={handleChange} />
              </div>
            </div>
          </div>

          <button onClick={handleAddSkill} className="w-full bg-indigo-600 text-white font-bold py-4 rounded-lg shadow hover:bg-indigo-700 transition">
            Publish Module
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddSkill;
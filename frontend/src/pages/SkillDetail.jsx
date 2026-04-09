import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function SkillDetail() {
  const { state } = useLocation();

  const [skill, setSkill] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (state && state.skill) {
      setSkill(state.skill);
    }
  }, [state]);

  if (!skill) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-bold">No Skill Data</h2>
        <p>Please go back and select a skill.</p>
      </div>
    );
  }

  const handleComplete = () => {
    setProgress((prev) => Math.min(prev + 25, 100));
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">{skill.title}</h1>

      <p className="mt-2 text-gray-600">{skill.description}</p>

      <h2 className="mt-6 font-semibold">Topics</h2>

      {skill.topics && skill.topics.length > 0 ? (
        skill.topics.map((t, i) => (
          <div key={i} className="mt-4 p-4 border rounded">
            <h3 className="font-bold">{t.name}</h3>
            <p className="text-gray-600">{t.content}</p>

            <button
              onClick={handleComplete}
              className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
            >
              Mark as Completed
            </button>
          </div>
        ))
      ) : (
        <p>No topics available</p>
      )}

      <div className="mt-6">
        <p>Progress: {progress}%</p>
        <div className="h-2 bg-gray-200 rounded">
          <div
            className="h-2 bg-blue-500 rounded"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default SkillDetail;
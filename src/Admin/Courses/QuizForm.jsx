import { Plus, Trash2, CheckCircle2 } from "lucide-react";

const QuizForm = ({ data, onChange }) => {
  const updateQuiz = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const addQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      text: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      points: 10,
    };
    updateQuiz("questions", [...(data.questions || []), newQuestion]);
  };

  const updateQuestion = (qId, field, value) => {
    const updatedQuestions = data.questions.map((q) =>
      q.id === qId ? { ...q, [field]: value } : q,
    );
    updateQuiz("questions", updatedQuestions);
  };

  const updateOption = (qId, optIdx, value) => {
    const updatedQuestions = data.questions.map((q) => {
      if (q.id === qId) {
        const newOptions = [...q.options];
        newOptions[optIdx] = value;
        return { ...q, options: newOptions };
      }
      return q;
    });
    updateQuiz("questions", updatedQuestions);
  };

  const removeQuestion = (qId) => {
    updateQuiz(
      "questions",
      data.questions.filter((q) => q.id !== qId),
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Time Limit */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-stone-700 ml-1 inter-font">
            Time Limit (minutes)
          </label>
          <input
            type="number"
            value={data.timeLimit || 30}
            onChange={(e) => updateQuiz("timeLimit", e.target.value)}
            className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500 transition-all font-bold text-stone-800 inter-font"
          />
        </div>

        {/* Passing Score */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-stone-700 ml-1 inter-font">
            Passing Score (%)
          </label>
          <input
            type="number"
            value={data.passingScore || 70}
            onChange={(e) => updateQuiz("passingScore", e.target.value)}
            className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500 transition-all font-bold text-stone-800 inter-font"
          />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-stone-700 ml-1 inter-font">
          Description
        </label>
        <textarea
          rows={2}
          value={data.description || ""}
          onChange={(e) => updateQuiz("description", e.target.value)}
          placeholder="Brief description of the quiz"
          className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500 transition-all font-medium text-stone-800 inter-font resize-none"
        />
      </div>

      {/* Questions Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-stone-800 arimo-font tracking-tight ml-1">
            Questions
          </h3>
          <button
            onClick={addQuestion}
            className="flex items-center gap-2 bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-2 rounded-xl font-bold transition-all text-sm arimo-font"
          >
            <Plus className="w-4 h-4" />
            <span>Add Question</span>
          </button>
        </div>

        <div className="space-y-6">
          {(data.questions || []).map((q, idx) => (
            <div
              key={q.id}
              className="bg-neutral-50 rounded-[2rem] border border-stone-200 p-8 space-y-6 relative group"
            >
              <button
                onClick={() => removeQuestion(q.id)}
                className="absolute top-6 right-6 p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <span className="bg-purple-600 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm">
                  {idx + 1}
                </span>
                <h4 className="text-base font-bold text-stone-800 arimo-font">
                  Question {idx + 1}
                </h4>
              </div>

              <input
                type="text"
                value={q.text}
                onChange={(e) => updateQuestion(q.id, "text", e.target.value)}
                placeholder="Enter your question"
                className="w-full bg-white border border-stone-200 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500 transition-all font-medium text-stone-800 inter-font"
              />

              <div className="space-y-4">
                <label className="text-xs font-bold text-stone-500 uppercase tracking-widest ml-1">
                  Answer Options
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {q.options.map((opt, optIdx) => (
                    <div key={optIdx} className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          updateQuestion(q.id, "correctAnswer", optIdx)
                        }
                        className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                          q.correctAnswer === optIdx
                            ? "bg-blue-600 border-blue-600 shadow-md scale-110"
                            : "bg-white border-stone-300"
                        }`}
                      >
                        {q.correctAnswer === optIdx && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </button>
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) =>
                          updateOption(q.id, optIdx, e.target.value)
                        }
                        placeholder={`Option ${optIdx + 1}`}
                        className="flex-1 bg-white border border-stone-200 rounded-2xl px-6 py-3 outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500 transition-all font-medium text-stone-800 inter-font"
                      />
                      {q.correctAnswer === optIdx && (
                        <div className="flex items-center gap-1 text-green-600 font-bold text-[10px] uppercase tracking-wider bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Correct</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-stone-200/60">
                <label className="text-xs font-bold text-stone-500 uppercase tracking-widest ml-1">
                  Points:
                </label>
                <input
                  type="number"
                  value={q.points}
                  onChange={(e) =>
                    updateQuestion(q.id, "points", e.target.value)
                  }
                  className="w-24 bg-white border border-stone-200 rounded-xl px-4 py-2 outline-none focus:border-purple-400 font-bold text-stone-800 inter-font"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizForm;

import { Calendar } from "lucide-react";

const AssignmentForm = ({ data, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Description */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-stone-700 ml-1 inter-font">
          Description
        </label>
        <textarea
          rows={3}
          value={data.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Brief overview of the assignment"
          className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500 transition-all font-medium text-stone-800 inter-font resize-none"
        />
      </div>

      {/* Instructions */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-stone-700 ml-1 inter-font">
          Instructions
        </label>
        <textarea
          rows={4}
          value={data.instructions || ""}
          onChange={(e) => handleChange("instructions", e.target.value)}
          placeholder="Detailed instructions for students..."
          className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500 transition-all font-medium text-stone-800 inter-font resize-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Due Date */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-stone-700 ml-1 inter-font">
            Due Date
          </label>
          <div className="relative">
            <input
              type="date"
              value={data.dueDate || ""}
              onChange={(e) => handleChange("dueDate", e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500 transition-all font-bold text-stone-800 inter-font appearance-none"
            />
            <Calendar className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 pointer-events-none" />
          </div>
        </div>

        {/* Maximum Points */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-stone-700 ml-1 inter-font">
            Maximum Points
          </label>
          <input
            type="number"
            value={data.maxPoints || 100}
            onChange={(e) => handleChange("maxPoints", e.target.value)}
            className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500 transition-all font-bold text-stone-800 inter-font"
          />
        </div>
      </div>

      {/* Allowed File Types */}
      <div className="space-y-3">
        <label className="text-sm font-bold text-stone-700 ml-1 inter-font">
          Allowed File Types
        </label>
        <div className="flex gap-2">
          {["pdf", "docx"].map((type) => (
            <div
              key={type}
              className="px-4 py-1.5 bg-orange-50 border border-orange-200 rounded-xl text-orange-700 text-sm font-bold arimo-font"
            >
              {type}
            </div>
          ))}
        </div>
      </div>

      {/* Max File Size */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-stone-700 ml-1 inter-font">
          Max File Size (MB)
        </label>
        <input
          type="number"
          value={data.maxFileSize || 10}
          onChange={(e) => handleChange("maxFileSize", e.target.value)}
          className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500 transition-all font-bold text-stone-800 inter-font"
        />
      </div>
    </div>
  );
};

export default AssignmentForm;

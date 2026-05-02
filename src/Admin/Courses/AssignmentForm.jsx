import { Calendar } from "lucide-react";
import TextEditor from "../../components/Editor";

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
        <TextEditor
          htmlElement={data.description || ""}
          onChange={(html) => handleChange("description", html)}
          isEditable={true}
        />
      </div>

      {/* Instructions */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-stone-700 ml-1 inter-font">
          Instructions
        </label>
        <TextEditor
          htmlElement={data.instructions || ""}
          onChange={(html) => handleChange("instructions", html)}
          isEditable={true}
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
        <div className="flex flex-wrap gap-2">
          {["pdf", "docx", "mp4"].map((type) => {
            const currentTypes = data.allowedFileTypes 
              ? data.allowedFileTypes.split(',').map(t => t.trim().toLowerCase()).filter(Boolean) 
              : [];
            const isSelected = currentTypes.includes(type.toLowerCase());
            
            return (
              <button
                key={type}
                type="button"
                onClick={() => {
                  let newTypes;
                  if (isSelected) {
                    newTypes = currentTypes.filter(t => t !== type.toLowerCase());
                  } else {
                    newTypes = [...currentTypes, type.toLowerCase()];
                  }
                  // Sort and format for display
                  handleChange("allowedFileTypes", newTypes.join(', '));
                }}
                className={`px-4 py-1.5 rounded-xl text-sm font-bold transition-all ${
                  isSelected
                    ? "bg-orange-500 text-white shadow-md scale-105"
                    : "bg-stone-50 border border-stone-200 text-stone-500 hover:border-stone-400"
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>
        
        <div className="mt-2">
          <input
            type="text"
            placeholder="Other types (comma separated), e.g., txt, mp3"
            value={data.allowedFileTypes || ""}
            onChange={(e) => handleChange("allowedFileTypes", e.target.value)}
            className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-3 outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500 transition-all font-medium text-stone-800 inter-font text-sm"
          />
        </div>
      </div>

      {/* Max File Size */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-stone-700 ml-1 inter-font">
          Max File Size (MB)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="number"
            value={data.maxFileSize || 10}
            onChange={(e) => handleChange("maxFileSize", e.target.value)}
            className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500 transition-all font-bold text-stone-800 inter-font"
          />
        </div>
      </div>
    </div>
  );
};

export default AssignmentForm;

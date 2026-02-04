import React from "react";
import { Edit2, Trash2 } from "lucide-react";

const TemplateCard = ({ template, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-6 flex flex-col gap-4 hover:shadow-md transition-all h-full">
      {/* Header */}
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-neutral-800">{template.title}</h3>
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${template.tagColor}`}
        >
          {template.tag}
        </span>
      </div>

      {/* Body */}
      <div className="space-y-1">
        <div className="flex gap-2 text-sm">
          <span className="text-neutral-700 font-normal w-16 shrink-0">
            Subject:
          </span>
          <span className="text-neutral-600 truncate">{template.subject}</span>
        </div>
      </div>

      {/* Preview Box */}
      <div className="space-y-1 flex-1">
        <div className="text-sm text-neutral-700">Preview:</div>
        <div className="bg-neutral-50 rounded p-3 text-sm text-neutral-600 leading-relaxed line-clamp-3 h-[88px] overflow-hidden relative">
          {template.preview}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center pt-4 border-t border-neutral-200 mt-2">
        <div className="flex flex-col gap-1 text-xs text-neutral-500">
          <span>Used {template.used} times</span>
          <span>Modified: {template.modified}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit && onEdit(template)}
            className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onDelete && onDelete(template.id)}
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;

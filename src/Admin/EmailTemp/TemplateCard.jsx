import React from "react";
import { Edit2, Trash2, Calendar, MousePointer2 } from "lucide-react";

const TemplateCard = ({ template, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-6 flex flex-col gap-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full group relative overflow-hidden">
      {/* Decorative Gradient Top Corner */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-slate-50 to-transparent -mr-12 -mt-12 rounded-full opacity-50 transition-all group-hover:scale-150 duration-500" />

      {/* Header */}
      <div className="space-y-3 relative">
        <div className="flex justify-between items-start gap-3">
          <h3 className="text-lg font-bold text-neutral-800 leading-tight group-hover:text-[#7BA0A0] transition-colors line-clamp-2">
            {template.title}
          </h3>
          <span
            className={`shrink-0 px-3 py-1 rounded-lg text-[10px] font-bold tracking-wider uppercase ${template.tagColor}`}
          >
            {template.tag}
          </span>
        </div>
      </div>

      {/* Body Info */}
      <div className="space-y-4 flex-1 relative">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
            Subject Line
          </label>
          <p className="text-sm font-medium text-neutral-600 truncate bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
            {template.subject}
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
            Content Preview
          </label>
          <div className="bg-white rounded-xl p-4 text-xs text-neutral-500 leading-relaxed line-clamp-4 min-h-[100px] border border-neutral-100 shadow-inner italic relative">
            "{template.preview}"
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent" />
          </div>
        </div>
      </div>

      {/* Footer Stats & Actions */}
      <div className="flex justify-between items-end pt-5 border-t border-neutral-100 mt-2 relative">
        <div className="flex gap-4">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1.5 text-neutral-400">
              <MousePointer2 size={12} />
              <span className="text-[10px] uppercase font-bold tracking-tight">
                Usage
              </span>
            </div>
            <span className="text-xs font-bold text-neutral-700">
              {template.used} times
            </span>
          </div>

          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1.5 text-neutral-400">
              <Calendar size={12} />
              <span className="text-[10px] uppercase font-bold tracking-tight">
                Updated
              </span>
            </div>
            <span className="text-xs font-bold text-neutral-700">
              {template.modified}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit && onEdit(template)}
            className="p-2.5 bg-slate-50 text-slate-500 hover:text-[#7BA0A0] hover:bg-[#7BA0A0]/10 rounded-xl transition-all border border-slate-100 active:scale-90"
            title="Edit Template"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onDelete && onDelete(template.id)}
            className="p-2.5 bg-red-50 text-red-400 hover:text-white hover:bg-red-500 rounded-xl transition-all border border-red-100 active:scale-90"
            title="Delete Template"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;

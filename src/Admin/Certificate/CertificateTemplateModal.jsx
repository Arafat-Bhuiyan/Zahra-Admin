import React, { useState, useEffect } from "react";
import { X, Upload, Save, FileText } from "lucide-react";
import toast from "react-hot-toast";
import { useAddCertificateTemplateMutation, useUpdateCertificateTemplateMutation } from "../../Api/adminApi";

const CertificateTemplateModal = ({ isOpen, onClose, template = null }) => {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [addTemplate, { isLoading: isAdding }] = useAddCertificateTemplateMutation();
  const [updateTemplate, { isLoading: isUpdating }] = useUpdateCertificateTemplateMutation();

  useEffect(() => {
    if (template) {
      setName(template.name || "");
    } else {
      setName("");
      setFile(null);
    }
  }, [template, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!name) {
      toast.error("Please enter a title for the template.");
      return;
    }
    if (!template && !file) {
      toast.error("Please upload an HTML template file.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    if (file) {
      formData.append("html_file", file);
    }

    try {
      if (template) {
        await updateTemplate({ id: template.id, body: formData }).unwrap();
        toast.success("Template updated successfully!");
      } else {
        await addTemplate(formData).unwrap();
        toast.success("Template added successfully!");
      }
      onClose();
    } catch (err) {
      toast.error(err?.data?.error || "Failed to save template.");
    }
  };

  const placeholders = [
    "{{student_name}}",
    "{{course_name}}",
    "{{course_level}}",
    "{{instructor_name}}",
    "{{issue_date}}",
    "{{certificate_id}}",
  ];

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-5 bg-gradient-to-b from-[#7AA4A5] to-[#6A9495] border-b border-neutral-200 flex justify-between items-center shrink-0">
          <h2 className="text-xl font-bold text-white arimo-font">
            {template ? "Edit Template" : "Add New Template"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/20 transition-colors text-white"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6">
          <div className="space-y-2">
            <label className="text-neutral-700 text-sm font-bold arimo-font">
              Template Title
            </label>
            <input
              type="text"
              placeholder="e.g., Standard Course Certificate"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#7AA4A5] transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-neutral-700 text-sm font-bold arimo-font">
              HTML Template File
            </label>
            <div className="relative group">
              <input
                type="file"
                accept=".html"
                onChange={(e) => setFile(e.target.files[0])}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="w-full border-2 border-dashed border-neutral-300 rounded-xl p-6 flex flex-col items-center justify-center gap-2 group-hover:border-[#7AA4A5] transition-all bg-slate-50">
                <Upload size={32} className="text-neutral-400 group-hover:text-[#7AA4A5]" />
                <span className="text-sm font-medium text-neutral-600 text-center px-4 break-all">
                  {file ? file.name : (template ? "Keep current file or click to replace" : "Click to upload HTML file")}
                </span>
                <span className="text-xs text-neutral-400">Only .html files are allowed</span>
              </div>
            </div>
            {template?.html_file && !file && (
              <div className="flex items-center gap-2 px-1">
                <FileText size={14} className="text-[#7AA4A5]" />
                <span className="text-[11px] text-neutral-500">
                  Current file: <span className="text-[#7AA4A5] font-bold">{template.html_file.split('/').pop()}</span>
                </span>
              </div>
            )}
          </div>

          <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl space-y-2">
            <p className="text-orange-800 text-[10px] font-black uppercase tracking-wider">
              Instruction: Placeholders
            </p>
            <p className="text-orange-700 text-xs leading-relaxed">
              Use these in your HTML to display student information:
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {placeholders.map((p) => (
                <code key={p} className="bg-white px-2 py-1 rounded border border-orange-200 text-orange-800 text-[10px] font-mono">
                  {p}
                </code>
              ))}
            </div>
          </div>
        </form>

        <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200 flex justify-end items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl border border-neutral-300 text-neutral-600 hover:bg-neutral-100 transition-all text-sm font-bold"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isAdding || isUpdating}
            className="px-8 py-2.5 rounded-xl bg-[#7AA4A5] text-white hover:bg-[#6A9495] transition-all text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#7AA4A5]/20 disabled:opacity-50"
          >
            {isAdding || isUpdating ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <Save size={18} />
            )}
            <span>{template ? "Save Changes" : "Create Template"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificateTemplateModal;

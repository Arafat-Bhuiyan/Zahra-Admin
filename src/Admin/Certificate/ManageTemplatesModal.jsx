import React, { useState } from "react";
import { X, Plus, Edit2, Trash2, FileText } from "lucide-react";
import { useGetCertificateTemplatesQuery, useDeleteCertificateTemplateMutation } from "../../Api/adminApi";
import CertificateTemplateModal from "./CertificateTemplateModal";
import toast from "react-hot-toast";

const ManageTemplatesModal = ({ isOpen, onClose }) => {
  const { data: templatesData, isLoading } = useGetCertificateTemplatesQuery({ page_size: 1000 });
  const [deleteTemplate] = useDeleteCertificateTemplateMutation();
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);

  const templates = templatesData?.results || [];

  if (!isOpen) return null;

  const handleEdit = (template) => {
    setEditingTemplate(template);
    setIsAddEditOpen(true);
  };

  const handleAddNew = () => {
    setEditingTemplate(null);
    setIsAddEditOpen(true);
  };

  const handleDelete = (template) => {
    toast(
      (t) => (
        <div className="flex items-center gap-4 p-1 arimo-font">
          <div className="flex-1">
            <p className="text-sm font-bold text-neutral-800 inter-font">Confirm Delete</p>
            <p className="text-xs text-neutral-500 mt-0.5">
              Are you sure you want to remove template "{template.name}"?
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                try {
                  await deleteTemplate(template.id).unwrap();
                  toast.success("Template deleted successfully");
                } catch (err) {
                  toast.error("Failed to delete template");
                }
                toast.dismiss(t.id);
              }}
              className="px-3 py-1.5 text-xs font-medium bg-red-500 text-white hover:bg-red-600 rounded-lg transition-colors shadow-sm"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        duration: 5000,
        position: "top-center",
        style: {
          minWidth: "400px",
          borderRadius: "16px",
          border: "1px solid rgba(0,0,0,0.05)",
        },
      }
    );
  };

  return (
    <>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
        <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col h-[80vh] animate-in zoom-in-95 duration-300">
          <div className="px-8 py-6 border-b border-neutral-100 flex justify-between items-start shrink-0">
            <div>
              <h2 className="text-2xl font-black text-neutral-900 leading-tight arimo-font">
                Manage Templates
              </h2>
              <p className="text-neutral-500 text-sm font-medium mt-1">
                Upload and organize your certificate layouts
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleAddNew}
                className="flex items-center gap-2 bg-[#7AA4A5] text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#6A9495] transition-all shadow-lg shadow-[#7AA4A5]/20 active:scale-95"
              >
                <Plus size={16} />
                Add New
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-neutral-100 rounded-xl text-neutral-400 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-8 bg-neutral-50/30">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <div className="w-10 h-10 border-4 border-[#7AA4A5]/30 border-t-[#7AA4A5] rounded-full animate-spin"></div>
                <p className="text-neutral-500 text-xs font-black uppercase tracking-widest">Loading templates...</p>
              </div>
            ) : templates.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-20 bg-white rounded-3xl border-2 border-dashed border-neutral-200">
                <FileText className="w-16 h-16 text-neutral-200 mb-4" />
                <p className="text-neutral-400 font-bold mb-4">No templates found.</p>
                <button
                  onClick={handleAddNew}
                  className="px-6 py-2 bg-neutral-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-neutral-800 transition-all"
                >
                  Create First Template
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {templates.map((tpl) => (
                  <div
                    key={tpl.id}
                    className="group bg-white p-5 rounded-2xl border border-neutral-200 hover:border-[#7AA4A5] hover:shadow-xl hover:shadow-[#7AA4A5]/5 transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-neutral-100 text-neutral-400 rounded-xl flex items-center justify-center group-hover:bg-[#7AA4A5]/10 group-hover:text-[#7AA4A5] transition-colors shrink-0">
                        <FileText size={24} />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-neutral-800 font-bold text-lg arimo-font truncate">
                          {tpl.name}
                        </span>
                        <span className="text-neutral-400 text-[10px] font-black uppercase tracking-widest mt-0.5">
                          Added: {new Date(tpl.created_at).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity ml-4">
                      <button
                        onClick={() => handleEdit(tpl)}
                        className="p-2.5 text-neutral-400 hover:text-[#7AA4A5] hover:bg-[#7AA4A5]/10 rounded-xl transition-all"
                        title="Edit Template"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(tpl)}
                        className="p-2.5 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        title="Delete Template"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="px-8 py-5 border-t border-neutral-100 flex justify-end shrink-0 bg-white">
             <button
                onClick={onClose}
                className="px-8 py-3 bg-neutral-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-neutral-800 transition-all active:scale-95"
              >
                Close Manager
             </button>
          </div>
        </div>
      </div>

      <CertificateTemplateModal
        isOpen={isAddEditOpen}
        onClose={() => setIsAddEditOpen(false)}
        template={editingTemplate}
      />
    </>
  );
};

export default ManageTemplatesModal;

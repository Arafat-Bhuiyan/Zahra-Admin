  import React, { useState, useEffect } from "react";
import { X, Save, ChevronDown, Loader2 } from "lucide-react";
import { useGetPurposesQuery, useGetSendgridApiQuery, useUpdateEmailTemplateMutation } from "../../Api/adminApi";
import toast from "react-hot-toast";

const EditTemplateModal = ({ isOpen, onClose, template }) => {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    sendgrid_template_id: "",
    subject: "",
    content: "",
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSendgridDropdownOpen, setIsSendgridDropdownOpen] = useState(false);

  const { data: purposes = [], isLoading: purposesLoading } = useGetPurposesQuery();
  const { data: sendgridTemplates = [], isLoading: sendgridLoading } = useGetSendgridApiQuery();
  const [updateEmailTemplate, { isLoading: isUpdating }] = useUpdateEmailTemplateMutation();

  // Load template data into form when modal opens
  useEffect(() => {
    if (template) {
      setFormData({
        title: template.title,
        type: template.tag,
        sendgrid_template_id: template.sendgrid_template_id || "",
        subject: template.subject,
        content: template.preview,
      });
    }
  }, [template, isOpen]);


  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.type ||
      !formData.sendgrid_template_id ||
      !formData.content
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const payload = {
        purpose: formData.type,
        purpose_display: formData.title,
        sendgrid_template_id: formData.sendgrid_template_id,
        description: formData.content,
        is_active: true,
      };

      await updateEmailTemplate({
        id: template.id,
        body: payload,
      }).unwrap();

      toast.success("Template updated successfully!", {
        icon: "✨",
        style: {
          borderRadius: "16px",
          background: "#333",
          color: "#fff",
        },
      });

      onClose();
    } catch (error) {
      console.error("Failed to update template:", error);
      if (error?.data?.purpose?.[0] === "Email Template Config with this purpose already exists.") {
        toast.error("Email Template Config with this purpose already exists.");
      } else {
        toast.error("Failed to update template. Please try again.");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendgridSelect = (templateId, subject) => {
    setFormData((prev) => ({
      ...prev,
      sendgrid_template_id: templateId,
      subject: subject,
    }));
    setIsSendgridDropdownOpen(false);
  };

  const handleTypeSelect = (typeValue) => {
    const selectedPurpose = purposes.find((p) => p.value === typeValue);
    setFormData((prev) => ({
      ...prev,
      type: typeValue,
      title: selectedPurpose ? selectedPurpose.label : "",
    }));
    setIsDropdownOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200 arimo-font">
      <div className="w-full max-w-[760px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-10 py-8 bg-white border-b border-neutral-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -mr-32 -mt-32 opacity-50" />
          <div className="flex justify-between items-start relative z-10">
            <div>
              <h2 className="text-3xl font-extrabold text-neutral-800 tracking-tight inter-font">
                Edit Template
              </h2>
              <p className="text-neutral-500 text-sm mt-1.5 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#7AA4A5] rounded-full animate-pulse" />
                Refine and optimize your existing email blueprints
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2.5 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-full transition-all active:rotate-90 duration-300"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto flex flex-col bg-slate-50/30"
        >
          <div className="p-10 space-y-8">
            <div className="grid grid-cols-1 gap-8">
              {/* Purpose Selection */}
              <div className="space-y-2.5 relative flex flex-col">
                <label className="text-[12px] font-bold text-neutral-500 uppercase tracking-widest ml-1">
                  Purpose
                </label>
                <div
                  className="w-full px-5 py-3.5 rounded-2xl border border-neutral-200 cursor-pointer flex justify-between items-center bg-white shadow-sm hover:border-[#7BA0A0] transition-all"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span
                    className={
                      formData.type
                        ? "text-neutral-800 font-medium"
                        : "text-neutral-300"
                    }
                  >
                    {formData.type
                      ? purposes.find((t) => t.value === formData.type)?.label
                      : "Select purpose..."}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`text-neutral-400 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                  />
                </div>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 z-50 w-full mt-2 bg-white border border-neutral-100 rounded-2xl shadow-xl py-2 overflow-hidden animate-in slide-in-from-top-2 duration-200">
                    {purposesLoading ? (
                      <div className="px-5 py-3 flex items-center justify-center">
                        <Loader2 className="w-5 h-5 text-[#7BA0A0] animate-spin" />
                      </div>
                    ) : (
                      purposes.map((type) => (
                        <div
                          key={type.value}
                          onClick={() => handleTypeSelect(type.value)}
                          className="px-5 py-3 hover:bg-slate-50 cursor-pointer flex items-center justify-between group transition-colors"
                        >
                          <span className="text-neutral-700 text-sm font-medium group-hover:text-[#7BA0A0]">
                            {type.label}
                          </span>
                          {formData.type === type.value && (
                            <div className="w-1.5 h-1.5 bg-[#7BA0A0] rounded-full" />
                          )}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* SendGrid Subject Dropdown */}
            <div className="space-y-2.5 relative flex flex-col">
              <label className="text-[12px] font-bold text-neutral-500 uppercase tracking-widest ml-1">
                SendGrid Template Subject
              </label>
              <div
                className="w-full px-5 py-3.5 rounded-2xl border border-neutral-200 cursor-pointer flex justify-between items-center bg-white shadow-sm hover:border-[#7BA0A0] transition-all"
                onClick={() =>
                  setIsSendgridDropdownOpen(!isSendgridDropdownOpen)
                }
              >
                <span
                  className={
                    formData.subject
                      ? "text-neutral-800 font-medium"
                      : "text-neutral-300"
                  }
                >
                  {formData.subject || "Select a SendGrid subject..."}
                </span>
                <ChevronDown
                  size={20}
                  className={`text-neutral-400 transition-transform duration-300 ${isSendgridDropdownOpen ? "rotate-180" : ""}`}
                />
              </div>

              {isSendgridDropdownOpen && (
                <div className="absolute top-full left-0 z-50 w-full mt-2 bg-white border border-neutral-100 rounded-2xl shadow-xl py-2 overflow-hidden animate-in slide-in-from-top-2 duration-200 max-h-[300px] overflow-y-auto">
                  {sendgridLoading ? (
                    <div className="px-5 py-3 flex items-center justify-center">
                      <Loader2 className="w-5 h-5 text-[#7BA0A0] animate-spin" />
                    </div>
                  ) : (
                    sendgridTemplates.map((template) => {
                      const activeVersion = template.versions?.find(
                        (v) => v.active
                      );
                      const subject = activeVersion?.subject || "No Subject";
                      return (
                        <div
                          key={template.id}
                          onClick={() =>
                            handleSendgridSelect(template.id, subject)
                          }
                          className="px-5 py-3 hover:bg-slate-50 cursor-pointer flex flex-col gap-0.5 group transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-neutral-700 text-sm font-bold group-hover:text-[#7BA0A0]">
                              {subject}
                            </span>
                            {formData.sendgrid_template_id === template.id && (
                              <div className="w-1.5 h-1.5 bg-[#7BA0A0] rounded-full" />
                            )}
                          </div>
                          <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-tight">
                            Template: {template.name}
                          </span>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>

            {/* Email Body */}
            <div className="space-y-2.5 flex flex-col">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[12px] font-bold text-neutral-500 uppercase tracking-widest">
                  Email Body
                </label>
                <span className="text-[10px] text-neutral-400 font-medium bg-neutral-100 px-2 py-0.5 rounded italic">
                  {purposes.find((p) => p.value === formData.type)?.variables
                    ?.length > 0
                    ? `Supports: ${purposes
                        .find((p) => p.value === formData.type)
                        .variables.map((v) => `{{${v}}}`)
                        .join(", ")}`
                    : "Markdown & Placeholders supported"}
                </span>
              </div>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder={`Hi {{name}},

Welcome back! Here's what you missed...

Warm regards,
The Team`}
                className="w-full px-6 py-5 rounded-2xl border border-neutral-200 focus:outline-none focus:ring-4 focus:ring-[#7BA0A0]/10 focus:border-[#7BA0A0] transition-all resize-none min-h-[350px] bg-white shadow-sm placeholder:text-neutral-300 font-mono text-sm leading-relaxed"
                required
              />
            </div>
          </div>

          {/* Footer */}
          <div className="px-10 py-6 bg-white border-t border-neutral-100 flex justify-end items-center gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3 rounded-xl text-neutral-500 font-bold hover:text-neutral-800 hover:bg-slate-50 transition-all active:scale-95 text-sm"
            >
              Discard
            </button>
            <button
              type="submit"
              className={`px-10 py-3.5 rounded-2xl flex items-center justify-center gap-2.5 font-bold transition-all shadow-lg active:scale-95 text-sm min-w-[200px] ${
                formData.type &&
                formData.sendgrid_template_id &&
                formData.content
                  ? "bg-[#7BA0A0] text-white hover:bg-[#6A8F8F] shadow-[#7BA0A0]/20"
                  : "bg-neutral-100 text-neutral-400 cursor-not-allowed shadow-none"
              }`}
              disabled={
                !formData.type ||
                !formData.sendgrid_template_id ||
                !formData.content ||
                isUpdating
              }
            >
              {isUpdating ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Save size={20} />
                  Update Template
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTemplateModal;

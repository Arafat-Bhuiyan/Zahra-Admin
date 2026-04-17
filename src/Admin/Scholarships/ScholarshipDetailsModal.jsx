import React from "react";
import { X, FileText, Download, Percent } from "lucide-react";

const ScholarshipDetailsModal = ({
  isOpen,
  onClose,
  application,
  onReject,
  onOpenDiscountModal,
}) => {
  if (!isOpen || !application) return null;

  const appName = application.name || `${application.user_detail?.first_name || ""} ${application.user_detail?.last_name || ""}`.trim();
  const getInitials = (nameStr) => {
    if (!nameStr) return "?";
    return nameStr.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();
  };
  const initials = getInitials(appName);

  const statusFormat = application.status ? application.status.toLowerCase() : "pending";
  const statusDisplay = statusFormat.charAt(0).toUpperCase() + statusFormat.slice(1);
  const discountDisplay = application.discount_percent ? `${application.discount_percent}% Discount` : null;
  const appliedDateStr = application.created_at
    ? new Date(application.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : "Unknown Date";

  const emailDisplay = application.email || application.user_detail?.email || "N/A";
  const phoneDisplay = application.phone_number || "N/A";
  const addressDisplay = application.address || "N/A";
  const levelDisplay = application.current_level_of_study || "N/A";
  const fieldDisplay = application.field_of_study || "N/A";
  const courseName = application.course_detail?.title || "Unknown Course";
  const originalPrice = parseFloat(application.course_detail?.price || 0);
  const whyApplying = application.why_applying || "N/A";
  const howHelps = application.how_will_it_help || "N/A";
  const documents = application.documents || [];

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-[881px] max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 w-full h-28 px-6 pt-6 pb-px bg-greenTeal border-b border-neutral-200 flex flex-col justify-start items-start">
          <div className="w-full inline-flex justify-between items-start">
            <div className="flex justify-start items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-full flex justify-center items-center">
                <div className="justify-start text-slate-400 text-2xl font-bold arimo-font leading-8">
                  {initials}
                </div>
              </div>
              <div className="flex flex-col justify-start items-start gap-1">
                <div className="text-white text-2xl font-bold arimo-font leading-8">
                  {appName}
                </div>
                <div className="text-white/90 text-base font-normal arimo-font leading-6">
                  Scholarship Application Details
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 px-2 pt-2 rounded-[10px] hover:bg-white/10 transition-colors flex justify-center items-center"
            >
              <X className="text-white" size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pt-6 pb-8 flex flex-col gap-6">
          {/* Status Bar */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div
                className={`px-4 py-2 rounded-[10px] border flex items-center gap-2 ${
                  statusFormat === "approved"
                    ? "bg-green-100 border-green-200 text-green-700"
                    : statusFormat === "pending"
                      ? "bg-yellow-100 border-yellow-200 text-yellow-700"
                      : "bg-red-100 border-red-200 text-red-700"
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 border-2 rounded-full ${
                    statusFormat === "approved"
                      ? "border-green-700"
                      : statusFormat === "pending"
                        ? "border-yellow-700"
                        : "border-red-700"
                  }`}
                ></div>
                <span className="font-bold arimo-font text-sm">
                  {statusDisplay}
                </span>
              </div>
              <div>
                {discountDisplay && (
                  <div className="px-4 py-2 rounded-[10px] flex items-center gap-1.5 outline outline-1 outline-offset-[-1px] bg-purple-100 outline-purple-200">
                    <Percent size={12} className="text-purple-700" />
                    <span className="text-sm font-bold arimo-font text-purple-700">
                      {discountDisplay}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="text-neutral-500 text-sm font-normal arimo-font">
              Applied: {appliedDateStr}
            </div>
          </div>

          {/* Student Info */}
          <div className="p-5 bg-neutral-50 rounded-[10px] flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-slate-400 rounded-full flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-greenTeal rounded-full"></div>
              </div>
              <h3 className="text-neutral-800 text-lg font-bold arimo-font">
                Student Information
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-y-6">
              <div>
                <p className="text-neutral-500 text-sm arimo-font mb-1">
                  Email
                </p>
                <p className="text-neutral-800 text-sm arimo-font">
                  {emailDisplay}
                </p>
              </div>
              <div>
                <p className="text-neutral-500 text-sm arimo-font mb-1">
                  Phone
                </p>
                <p className="text-neutral-800 text-sm arimo-font">
                  {phoneDisplay}
                </p>
              </div>
              <div>
                <p className="text-neutral-500 text-sm arimo-font mb-1">
                  Address
                </p>
                <p className="text-neutral-800 text-sm arimo-font hover:opacity-80">
                  {addressDisplay}
                </p>
              </div>
              <div>
                <p className="text-neutral-500 text-sm arimo-font mb-1">
                  Current Level
                </p>
                <p className="text-neutral-800 text-sm arimo-font capitalize">
                  {levelDisplay}
                </p>
              </div>
              <div>
                <p className="text-neutral-500 text-sm arimo-font mb-1">
                  Field of Study
                </p>
                <p className="text-neutral-800 text-sm arimo-font">
                  {fieldDisplay}
                </p>
              </div>
            </div>
          </div>

          {/* Course & Pricing */}
          <div className="p-5 bg-greenTeal/10 rounded-[10px] border border-slate-400/30 flex flex-col gap-4">
            <h3 className="text-neutral-800 text-lg font-bold arimo-font">
              Course & Pricing
            </h3>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-neutral-500 text-sm arimo-font mb-1">
                  Course
                </p>
                <p className="text-neutral-800 text-base font-bold arimo-font">
                  {courseName}
                </p>
              </div>
              <div>
                <p className="text-neutral-500 text-sm arimo-font mb-1">
                  Original Price
                </p>
                <p className="text-slate-400 text-2xl font-bold arimo-font">
                  ${originalPrice.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Why Applying */}
          <div className="p-5 bg-neutral-50 rounded-[10px] flex flex-col gap-3">
            <h3 className="text-neutral-800 text-lg font-bold arimo-font">
              Why applying for scholarship?
            </h3>
            <p className="text-neutral-700 text-sm arimo-font leading-6">
              {whyApplying}
            </p>
          </div>

          {/* Goals */}
          <div className="p-5 bg-blue-50 rounded-[10px] border border-blue-200 flex flex-col gap-3">
            <h3 className="text-neutral-800 text-lg font-bold arimo-font">
              How will this help achieve goals?
            </h3>
            <p className="text-neutral-700 text-sm arimo-font leading-6">
              {howHelps}
            </p>
          </div>

          {/* Documents */}
          <div className="p-5 bg-neutral-50 rounded-[10px] flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <FileText className="text-slate-400" size={20} />
              <h3 className="text-neutral-800 text-lg font-bold arimo-font">
                Attached Documents
              </h3>
            </div>
            <div className="flex flex-col gap-2">
              {documents.length > 0 ? (
                documents.map((doc, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center bg-white p-3 rounded-[10px] border border-neutral-200"
                  >
                    <div className="flex items-center gap-2">
                      <FileText size={16} className="text-slate-400" />
                      <span className="text-neutral-800 text-sm arimo-font truncate max-w-xs">
                        {doc.name || `Document_${idx + 1}`}
                      </span>
                    </div>
                    {doc.file && (
                      <a href={doc.file} target="_blank" rel="noopener noreferrer" className="text-slate-400 text-sm arimo-font hover:text-slate-600 flex items-center gap-1 cursor-pointer">
                        <Download size={14} />
                        Download
                      </a>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-sm text-neutral-500 arimo-font italic">
                  No documents attached.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-neutral-50 px-6 py-6 border-t border-neutral-200 flex justify-between items-center rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-[10px] border border-neutral-300 text-neutral-700 font-medium hover:bg-neutral-100 transition-colors"
          >
            Close
          </button>
          {/* Modify Discount */}
          {(statusFormat === "approved" || statusFormat === "rejected") && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenDiscountModal(application)}
                className="px-6 py-2 bg-greenTeal hover:bg-opacity-90 text-white rounded-[10px] font-bold transition-colors"
              >
                Modify Discount
              </button>
            </div>
          )}

          {statusFormat === "pending" && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  onReject(application.id);
                  onClose();
                }}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-[10px] font-medium transition-colors"
              >
                Reject
              </button>
              <button
                onClick={() => onOpenDiscountModal(application)}
                className="px-6 py-2 bg-greenTeal hover:bg-opacity-90 text-white rounded-[10px] font-bold transition-colors"
              >
                Set Discount
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetailsModal;

import React from "react";
import { X, FileText, Download } from "lucide-react";

const ScholarshipDetailsModal = ({
  isOpen,
  onClose,
  application,
  onReject,
  onOpenDiscountModal,
}) => {
  if (!isOpen || !application) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-[881px] max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 w-full h-28 px-6 pt-6 pb-px bg-gradient-to-b from-slate-400 to-slate-500 border-b border-neutral-200 flex flex-col justify-start items-start">
          <div className="w-full inline-flex justify-between items-start">
            <div className="flex justify-start items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-full flex justify-center items-center">
                <div className="justify-start text-slate-400 text-2xl font-bold arimo-font leading-8">
                  {application.initials}
                </div>
              </div>
              <div className="flex flex-col justify-start items-start gap-1">
                <div className="text-white text-2xl font-bold arimo-font leading-8">
                  {application.name}
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
            <div
              className={`px-4 py-2 rounded-[10px] border flex items-center gap-2 ${
                application.status === "Approved"
                  ? "bg-green-100 border-green-200 text-green-700"
                  : application.status === "Pending"
                    ? "bg-yellow-100 border-yellow-200 text-yellow-700"
                    : "bg-red-100 border-red-200 text-red-700"
              }`}
            >
              <div
                className={`w-3.5 h-3.5 border-2 rounded-full ${
                  application.status === "Approved"
                    ? "border-green-700"
                    : application.status === "Pending"
                      ? "border-yellow-700"
                      : "border-red-700"
                }`}
              ></div>
              <span className="font-bold arimo-font text-sm">
                {application.status}
              </span>
            </div>
            <div className="text-neutral-500 text-sm font-normal arimo-font">
              Applied: {application.appliedDate}
            </div>
          </div>

          {/* Student Info */}
          <div className="p-5 bg-neutral-50 rounded-[10px] flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-slate-400 rounded-full flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-slate-400 rounded-full"></div>
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
                  {application.email}
                </p>
              </div>
              <div>
                <p className="text-neutral-500 text-sm arimo-font mb-1">
                  Phone
                </p>
                <p className="text-neutral-800 text-sm arimo-font">
                  {application.phone}
                </p>
              </div>
              <div>
                <p className="text-neutral-500 text-sm arimo-font mb-1">
                  Address
                </p>
                <p className="text-neutral-800 text-sm arimo-font">
                  Los Angeles, California
                </p>
              </div>
              <div>
                <p className="text-neutral-500 text-sm arimo-font mb-1">
                  Current Level
                </p>
                <p className="text-neutral-800 text-sm arimo-font">
                  Undergraduate
                </p>
              </div>
              <div>
                <p className="text-neutral-500 text-sm arimo-font mb-1">
                  Field of Study
                </p>
                <p className="text-neutral-800 text-sm arimo-font">
                  Computer Science
                </p>
              </div>
            </div>
          </div>

          {/* Course & Pricing */}
          <div className="p-5 bg-slate-400/10 rounded-[10px] border border-slate-400/30 flex flex-col gap-4">
            <h3 className="text-neutral-800 text-lg font-bold arimo-font">
              Course & Pricing
            </h3>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-neutral-500 text-sm arimo-font mb-1">
                  Course
                </p>
                <p className="text-neutral-800 text-base font-bold arimo-font">
                  {application.course}
                </p>
              </div>
              <div>
                <p className="text-neutral-500 text-sm arimo-font mb-1">
                  Original Price
                </p>
                <p className="text-slate-400 text-2xl font-bold arimo-font">
                  {application.price}
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
              I am a single mother working part-time while studying to provide a
              better future for my daughter. This course would significantly
              enhance my job prospects in web development. I have been
              struggling to afford quality education while managing basic
              expenses, and this scholarship would be life-changing for my
              family.
            </p>
          </div>

          {/* Goals */}
          <div className="p-5 bg-blue-50 rounded-[10px] border border-blue-200 flex flex-col gap-3">
            <h3 className="text-neutral-800 text-lg font-bold arimo-font">
              How will this help achieve goals?
            </h3>
            <p className="text-neutral-700 text-sm arimo-font leading-6">
              This scholarship will allow me to focus more on learning advanced
              web development skills, reduce my work hours to dedicate time to
              studying, and ultimately secure a better-paying job to support my
              family. I plan to use these skills to work remotely and have more
              flexibility with my daughter.
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
              {["Motivation_Letter.pdf", "Income_Statement.pdf"].map(
                (doc, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center bg-white p-3 rounded-[10px] border border-neutral-200"
                  >
                    <div className="flex items-center gap-2">
                      <FileText size={16} className="text-slate-400" />
                      <span className="text-neutral-800 text-sm arimo-font">
                        {doc}
                      </span>
                    </div>
                    <button className="text-slate-400 text-sm arimo-font hover:text-slate-600 flex items-center gap-1">
                      <Download size={14} />
                      Download
                    </button>
                  </div>
                ),
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

          {application.status === "Pending" && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  onReject(application.id);
                  // We don't close immediately here because we want the user to see the success toast or confirmation?
                  // Wait, standard behavior usually allows closing manually.
                  // But if rejected, maybe we should close?
                  // Let's pass the reject handler and let the parent decide or just trigger it.
                  // The parent component shows toast. We probably should close the modal after reject.
                  onClose();
                }}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-[10px] font-medium transition-colors"
              >
                Reject
              </button>
              <button
                onClick={() => onOpenDiscountModal(application)}
                className="px-6 py-2 bg-slate-400 hover:bg-slate-500 text-white rounded-[10px] font-bold transition-colors"
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

import React, { useState, useEffect } from "react";
import { X, Check } from "lucide-react";

const SetDiscountModal = ({ isOpen, onClose, application, onApprove }) => {
  const [discountPercent, setDiscountPercent] = useState("");

  useEffect(() => {
    if (isOpen) {
      setDiscountPercent("");
    }
  }, [isOpen]);

  if (!isOpen || !application) return null;

  const parsePrice = (priceStr) => {
    return parseFloat(priceStr.replace(/[^0-9.]/g, ""));
  };

  const originalPrice = parsePrice(application.price);
  const discountValue =
    discountPercent === ""
      ? 0
      : (originalPrice * parseFloat(discountPercent)) / 100;
  const finalPrice = originalPrice - discountValue;

  const handleQuickSelect = (percent) => {
    setDiscountPercent(percent);
  };

  const handleSave = () => {
    onApprove(application.id, discountPercent || 0, finalPrice);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative bg-white rounded-2xl shadow-2xl w-[672px] overflow-hidden">
        {/* Header */}
        <div className="w-full h-28 px-6 pt-6 pb-px bg-greenTeal border-b border-neutral-200 flex flex-col justify-start items-start">
          <div className="w-full inline-flex justify-between items-center">
            <div className="inline-flex flex-col justify-start items-start gap-1">
              <div className="text-white text-2xl font-bold arimo-font leading-8">
                Set Scholarship Discount
              </div>
              <div className="text-white/90 text-base font-normal arimo-font leading-6">
                {application.name}
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

        {/* Body */}
        <div className="w-full p-6 flex flex-col gap-6">
          {/* Course Info */}
          <div className="w-full p-4 bg-neutral-50 rounded-[10px] flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <span className="text-neutral-500 text-sm font-normal arimo-font leading-5">
                Course
              </span>
              <span className="text-neutral-800 text-lg font-bold arimo-font leading-7">
                {application.course}
              </span>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-neutral-500 text-sm font-normal arimo-font leading-5">
                Original Price
              </span>
              <span className="text-neutral-800 text-2xl font-bold arimo-font leading-8">
                {application.price}
              </span>
            </div>
          </div>

          {/* Input Section */}
          <div className="flex items-center gap-4">
            <span className="text-neutral-700 text-sm font-normal arimo-font">
              Discount Percentage:
            </span>
            <div className="relative w-32">
              <input
                type="number"
                min="0"
                max="100"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(e.target.value)}
                placeholder="Enter %"
                className="w-full px-4 py-2.5 bg-neutral-100 rounded-[10px] text-center font-bold text-neutral-800 focus:outline-none focus:ring-2 focus:ring-slate-400/50"
              />
            </div>
          </div>

          {/* Quick Select */}
          <div className="flex flex-col gap-3">
            <span className="text-neutral-700 text-sm font-normal arimo-font">
              Quick Select:
            </span>
            <div className="flex gap-4">
              {[25, 50, 75, 100].map((pct) => (
                <button
                  key={pct}
                  onClick={() => handleQuickSelect(pct)}
                  className={`w-28 py-2.5 rounded-[10px] text-sm font-bold arimo-font transition-all ${
                    parseInt(discountPercent) === pct
                      ? "bg-slate-500 text-white shadow-md"
                      : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                  }`}
                >
                  {pct}%
                </button>
              ))}
              <button
                onClick={() => handleQuickSelect(0)}
                className={`w-28 py-2.5 rounded-[10px] text-sm font-bold arimo-font transition-all border ${
                  parseInt(discountPercent) === 0 || discountPercent === ""
                    ? "bg-red-600 text-white border-red-600 shadow-md"
                    : "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                }`}
              >
                None
              </button>
            </div>
          </div>

          {/* Summary Card */}
          <div className="w-full p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-[10px] border border-green-200 flex justify-between items-center">
            <div className="flex flex-col items-start min-w-[100px]">
              <span className="text-green-700 text-sm font-normal arimo-font leading-5">
                Original Price
              </span>
              <span className="text-neutral-800 text-xl font-bold arimo-font leading-7">
                ${originalPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex flex-col items-center min-w-[100px]">
              <span className="text-green-700 text-sm font-normal arimo-font leading-5">
                Discount
              </span>
              <span className="text-green-600 text-xl font-bold arimo-font leading-7">
                -${discountValue.toFixed(2)}
              </span>
            </div>
            <div className="flex flex-col items-end min-w-[100px]">
              <span className="text-green-700 text-sm font-normal arimo-font leading-5">
                Final Price
              </span>
              <span className="text-green-700 text-3xl font-bold arimo-font leading-9">
                ${finalPrice.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="w-full h-24 px-6 bg-neutral-50 border-t border-neutral-200 flex justify-end items-center gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-[10px] border border-neutral-300 text-neutral-700 font-medium hover:bg-neutral-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-greenTeal hover:bg-opacity-90 text-white rounded-[10px] font-bold shadow-sm transition-colors flex items-center gap-2"
          >
            <Check size={18} />
            Approve with {discountPercent || 0}% Discount
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetDiscountModal;

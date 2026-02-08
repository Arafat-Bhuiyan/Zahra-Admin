import React, { useState, useEffect } from "react";
import { X, Save } from "lucide-react";

const EditMembershipModal = ({ isOpen, onClose, initialSettings, onSave }) => {
  const [settings, setSettings] = useState(initialSettings);

  useEffect(() => {
    if (isOpen) {
      setSettings(initialSettings);
    }
  }, [isOpen, initialSettings]);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSave(settings);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-6 bg-gradient-to-b from-[#7AA4A5] to-[#6A9495] border-b border-neutral-200 flex justify-between items-start shrink-0">
          <div className="flex flex-col gap-1 text-white">
            <h2 className="text-2xl font-bold arimo-font leading-8">
              Edit Membership Settings
            </h2>
            <p className="text-white/90 text-base font-normal arimo-font">
              Configure your monthly subscription plan
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-[10px] hover:bg-white/20 transition-colors text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* content */}
        <div className="p-6 overflow-y-auto flex flex-col gap-6">
          {/* Toggle */}
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-[5px]">
              <span className="text-neutral-700 text-sm font-normal arimo-font">
                Enable Membership
              </span>
              <span className="text-neutral-500 text-xs font-normal arimo-font">
                Allow students to subscribe to full access
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex flex-col gap-2">
            <label className="text-neutral-700 text-sm font-normal arimo-font">
              Monthly Price ($)
            </label>
            <input
              type="number"
              value={settings.price}
              onChange={(e) => handleChange("price", e.target.value)}
              className="px-4 py-2 rounded-[10px] border border-neutral-300 text-neutral-950 text-base font-normal arimo-font focus:outline-none focus:border-greenTeal"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="text-neutral-700 text-sm font-normal arimo-font">
              Description
            </label>
            <textarea
              value={settings.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={2}
              className="px-4 py-2 rounded-[10px] border border-neutral-300 text-neutral-950 text-base font-normal arimo-font focus:outline-none focus:border-greenTeal resize-none"
            />
          </div>

          {/* Features */}
          <div className="flex flex-col gap-2 grow">
            <div className="flex flex-col">
              <label className="text-neutral-700 text-sm font-normal arimo-font">
                Features
              </label>
              <span className="text-neutral-500 text-xs font-normal arimo-font">
                One feature per line
              </span>
            </div>
            <textarea
              value={
                Array.isArray(settings.benefits)
                  ? settings.benefits.join("\n")
                  : settings.benefits
              }
              onChange={(e) =>
                handleChange("benefits", e.target.value.split("\n"))
              }
              className="px-4 py-2 rounded-[10px] border border-neutral-300 text-neutral-950 text-sm font-normal font-mono focus:outline-none focus:border-greenTeal min-h-[140px] resize-y"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200 flex justify-end items-center gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-[10px] border border-neutral-300 text-neutral-700 text-base font-normal arimo-font hover:bg-neutral-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-8 py-2.5 bg-greenTeal hover:bg-opacity-80 rounded-[10px] text-white text-base font-normal arimo-font shadow-sm flex items-center gap-2 transition-colors"
          >
            <Save size={18} />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditMembershipModal;

import React, { useState } from "react";
import { X } from "lucide-react";

const defaultPresets = [
  {
    id: "consultation",
    name: "Consultation",
    title: "Struggling with your mental health?",
    ctaLabel: "Book A Consultation",
    ctaUrl: "/consultation",
  },
  {
    id: "book",
    name: "Book",
    title: "New Book Released",
    ctaLabel: "View Book",
    ctaUrl: "/books",
  },
  {
    id: "course",
    name: "Course",
    title: "New Course Available",
    ctaLabel: "View Course",
    ctaUrl: "/courses",
  },
];

const CreatePopupAnnouncementModal = ({ isOpen, onClose, onCreate }) => {
  const [type, setType] = useState("consultation");
  const [title, setTitle] = useState(defaultPresets[0].title);
  const [ctaLabel, setCtaLabel] = useState(defaultPresets[0].ctaLabel);
  const [ctaUrl, setCtaUrl] = useState(defaultPresets[0].ctaUrl);

  if (!isOpen) return null;

  const applyPreset = (presetId) => {
    const preset = defaultPresets.find((p) => p.id === presetId);
    if (!preset) return;
    setType(preset.id);
    setTitle(preset.title);
    setCtaLabel(preset.ctaLabel);
    setCtaUrl(preset.ctaUrl);
  };

  const handleCreate = () => {
    const newPopup = {
      id: Date.now(),
      type,
      title,
      ctaLabel,
      ctaUrl,
    };
    onCreate(newPopup);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h3 className="text-lg font-bold">Create Popup Announcement</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-100"
          >
            <X />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex gap-2">
            {defaultPresets.map((p) => (
              <button
                key={p.id}
                onClick={() => applyPreset(p.id)}
                className={`px-3 py-1 rounded-md border ${type === p.id ? "bg-slate-100 border-slate-300" : "bg-white"}`}
              >
                {p.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-3">
            <label className="text-sm font-medium">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />

            <label className="text-sm font-medium">CTA Label</label>
            <input
              value={ctaLabel}
              onChange={(e) => setCtaLabel(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />

            <label className="text-sm font-medium">CTA URL</label>
            <input
              value={ctaUrl}
              onChange={(e) => setCtaUrl(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 border-t">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border">
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="px-4 py-2 rounded-lg bg-green-600 text-white"
          >
            Create Popup
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePopupAnnouncementModal;

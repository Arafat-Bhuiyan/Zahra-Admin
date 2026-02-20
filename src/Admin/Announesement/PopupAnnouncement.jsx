import React from "react";
import { X } from "lucide-react";

const PopupAnnouncement = ({
  id,
  type = "general",
  title = "",
  ctaLabel = "",
  ctaUrl = "#",
  onClose,
  showClose = true,
}) => {
  const bgByType = {
    consultation: "bg-gradient-to-r from-green-400 to-teal-400",
    purchase: "bg-gradient-to-r from-yellow-400 to-orange-400",
    book: "bg-gradient-to-r from-indigo-500 to-violet-500",
    course: "bg-gradient-to-r from-rose-500 to-pink-500",
    general: "bg-gradient-to-r from-slate-400 to-slate-500",
  };

  const ctaDefault = ctaLabel || "Learn More";

  return (
    <div
      className={`max-w-md w-full rounded-2xl shadow-xl text-white p-5 relative overflow-hidden ${bgByType[type] || bgByType.general}`}
      role="dialog"
      aria-labelledby={`popup-title-${id}`}
    >
      {showClose && (
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded-full bg-white/20 hover:bg-white/30"
          title="Close"
        >
          <X className="w-4 h-4 text-white" />
        </button>
      )}

      <div className="flex flex-col gap-2">
        <div
          id={`popup-title-${id}`}
          className="text-sm font-semibold opacity-90"
        >
          {title}
        </div>

        <div className="mt-3">
          <a
            href={ctaUrl}
            className="inline-block bg-white text-black px-4 py-2 rounded-lg font-semibold shadow-sm hover:opacity-90"
          >
            {ctaDefault}
          </a>
        </div>
      </div>
    </div>
  );
};

export default PopupAnnouncement;

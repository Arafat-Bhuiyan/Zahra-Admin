import React from "react";
import { X, ExternalLink, BookOpen, DollarSign, Layers } from "lucide-react";

const DoorDetailsModal = ({ isOpen, onClose, door }) => {
  if (!isOpen || !door) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div
        className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-black/5 overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative h-32 bg-gradient-to-r from-[#89A6A7] to-[#729394] p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute -bottom-6 left-6 p-1 bg-white rounded-xl shadow-lg">
            <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-[#89A6A7]" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="pt-10 p-8 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h3 className="text-2xl font-semibold text-neutral-950 arimo-font">
              {door.title}
            </h3>
            <p className="text-neutral-500 text-sm arimo-font">
              Course Door Details
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-xl flex flex-col gap-1">
              <div className="flex items-center gap-2 text-neutral-500 text-xs font-medium uppercase tracking-wider">
                <Layers className="w-3.5 h-3.5" />
                Curriculum
              </div>
              <div className="text-neutral-950 font-semibold arimo-font">
                {door.modules} Modules
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl flex flex-col gap-1">
              <div className="flex items-center gap-2 text-neutral-500 text-xs font-medium uppercase tracking-wider">
                <DollarSign className="w-3.5 h-3.5" />
                Pricing
              </div>
              <div className="text-neutral-950 font-semibold arimo-font text-lg">
                ${door.price}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-semibold text-neutral-950 arimo-font">
              Description
            </h4>
            <p className="text-neutral-600 text-sm leading-relaxed arimo-font">
              {door.description}
            </p>
          </div>

          <div className="pt-4 border-t border-black/5 flex justify-between items-center">
            <a
              href={door.courseLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#89A6A7] hover:text-[#729394] font-medium transition-colors text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              Open Course Page
            </a>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-neutral-950 text-white rounded-lg hover:bg-neutral-800 transition-colors text-sm font-medium arimo-font"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoorDetailsModal;

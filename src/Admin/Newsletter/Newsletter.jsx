import React from "react";
import { ExternalLink } from "lucide-react";
import SubscribersList from "./SubscribersList";

const Newsletter = () => {
  const handleRedirectToSendGrid = () => {
    window.open("https://mc.sendgrid.com/", "_blank");
  };

  return (
    <div className="p-8 space-y-8 min-h-screen arimo-font bg-slate-50/10">
      {/* Header */}
      <div className="flex justify-end items-center">
        <button
          onClick={handleRedirectToSendGrid}
          className="flex items-center gap-2 bg-[#7BA0A0] hover:bg-[#6A8F8F] text-white px-6 py-3 rounded-xl shadow-md transition-all active:scale-95 inter-font"
        >
          <ExternalLink size={20} />
          <span className="font-semibold">Go to SendGrid</span>
        </button>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden min-h-[600px] flex flex-col">
        {/* Content */}
        <div className="p-8 flex-1">
          <SubscribersList />
        </div>
      </div>
    </div>
  );
};

export default Newsletter;

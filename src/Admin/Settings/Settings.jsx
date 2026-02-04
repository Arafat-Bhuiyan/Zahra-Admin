import { useState } from "react";
import General from "./General";
import TermsAndConditions from "./TermsAndConditions";
import PrivacyPolicy from "./PrivacyPolicy";

export default function TermsAndPolicies() {
  const [activeTab, setActiveTab] = useState("general");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen py-6">
      <div className="py-8">
        {/* Tabs */}
        <div className="flex items-center justify-between mb-6 border-b border-black/10">
          <div className="flex gap-8">
            {[
              { id: "general", label: "General" },
              { id: "terms", label: "Terms & Conditions" },
              { id: "privacy", label: "Privacy Policy" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`pb-3 font-semibold transition-colors relative ${
                  activeTab === tab.id
                    ? "text-greenTeal"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-greenTeal" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="mt-6">
          {activeTab === "general" && <General />}
          {activeTab === "terms" && <TermsAndConditions />}
          {activeTab === "privacy" && <PrivacyPolicy />}
        </div>
      </div>
    </div>
  );
}

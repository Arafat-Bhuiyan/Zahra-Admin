import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import General from "./General";
import TermsAndConditions from "./TermsAndConditions";
import PrivacyPolicy from "./PrivacyPolicy";
import {
  useGetSiteSettingsQuery,
  useUpdateSiteSettingsMutation,
} from "../../Api/adminApi";

export default function Settings() {
  const [formData, setFormData] = useState({
    short_about: "",
    long_about: "",
    privacy_policy: "",
    terms_and_conditions: "",
  });

  const { data: siteSettings, isLoading, isError } = useGetSiteSettingsQuery();
  const [updateSiteSettings, { isLoading: isUpdating }] =
    useUpdateSiteSettingsMutation();

  useEffect(() => {
    if (siteSettings) {
      setFormData({
        short_about: siteSettings.short_about || "",
        long_about: siteSettings.long_about || "",
        privacy_policy: siteSettings.privacy_policy || "",
        terms_and_conditions: siteSettings.terms_and_conditions || "",
      });
    }
  }, [siteSettings]);

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      await updateSiteSettings(formData).unwrap();
      toast.success("Site settings updated successfully.");
    } catch (error) {
      console.error("Update site settings failed:", error);
      toast.error("Failed to update site settings.");
    }
  };

  return (
    <div className="min-h-screen py-6">
      <Toaster position="top-right" />
      <div className="py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">
              Site Settings
            </h1>
            <p className="mt-2 text-sm text-neutral-500">
              Update the site overview, terms, and privacy policy from one page.
            </p>
          </div>
        </div>

        {isError && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            Unable to load site settings. Please refresh the page.
          </div>
        )}

        <div className="space-y-8">
          <General data={formData} onChange={handleFieldChange} />
          <TermsAndConditions
            value={formData.terms_and_conditions}
            onChange={(value) =>
              handleFieldChange("terms_and_conditions", value)
            }
          />
          <PrivacyPolicy
            value={formData.privacy_policy}
            onChange={(value) => handleFieldChange("privacy_policy", value)}
          />
        </div>

        <div className="pt-2 border-t border-neutral-200">
          <button
            type="button"
            disabled={isLoading || isUpdating}
            onClick={handleSubmit}
            className="px-6 py-3 rounded-2xl bg-greenTeal text-white font-semibold hover:bg-greenTeal/90 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isUpdating ? "Saving..." : "Submit Settings"}
          </button>
        </div>
      </div>
    </div>
  );
}

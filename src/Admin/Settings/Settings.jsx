import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import General from "./General";
import TermsAndConditions from "./TermsAndConditions";
import PrivacyPolicy from "./PrivacyPolicy";
import { KeyRound, Eye, EyeOff, Loader2 } from "lucide-react";
import {
  useGetSiteSettingsQuery,
  useUpdateSiteSettingsMutation,
  useChangePasswordMutation,
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
  const [changePassword, { isLoading: isChangingPassword }] =
    useChangePasswordMutation();

  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    re_new_password: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

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

  const handlePasswordChange = async () => {
    if (!passwordData.current_password || !passwordData.new_password || !passwordData.re_new_password) {
      toast.error("All password fields are required.");
      return;
    }
    if (passwordData.new_password !== passwordData.re_new_password) {
      toast.error("New passwords do not match.");
      return;
    }
    try {
      await changePassword(passwordData).unwrap();
      toast.success("Password changed successfully.");
      setPasswordData({ current_password: "", new_password: "", re_new_password: "" });
    } catch (err) {
      const msg = err?.data
        ? Object.values(err.data).flat().join(" ")
        : "Failed to change password.";
      toast.error(msg);
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

          {/* Change Password */}
          <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center">
                <KeyRound className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-neutral-900">Change Password</h2>
                <p className="text-xs text-neutral-500">Update your account password</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { key: "current_password", label: "Current Password", show: "current" },
                { key: "new_password", label: "New Password", show: "new" },
                { key: "re_new_password", label: "Confirm New Password", show: "confirm" },
              ].map(({ key, label, show }) => (
                <div key={key} className="space-y-2">
                  <label className="text-sm font-bold text-stone-800">{label}</label>
                  <div className="relative">
                    <input
                      type={showPasswords[show] ? "text" : "password"}
                      value={passwordData[key]}
                      onChange={(e) => setPasswordData((p) => ({ ...p, [key]: e.target.value }))}
                      placeholder="••••••••"
                      className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-3 pr-11 outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-300 transition-all font-medium text-stone-800"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords((p) => ({ ...p, [show]: !p[show] }))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                    >
                      {showPasswords[show] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handlePasswordChange}
                disabled={isChangingPassword}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-greenTeal text-white font-semibold hover:bg-greenTeal/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isChangingPassword ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Changing...</>
                ) : (
                  <><KeyRound className="w-4 h-4" /> Change Password</>
                )}
              </button>
            </div>
          </div>
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

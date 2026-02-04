import { Shield, Lock, LogOut, Trash2 } from "lucide-react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function General() {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdatePassword = () => {
    if (
      !passwords.currentPassword ||
      !passwords.newPassword ||
      !passwords.confirmPassword
    ) {
      toast.error("Please fill in all fields");
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }
    // Logic for updating password would go here
    toast.success("Password updated successfully!");
    setPasswords({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleLogout = () => {
    // Logic for logout would go here
    toast.success("Logged out successfully");
  };

  const handleDeleteAccount = () => {
    // Logic for delete account would go here
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action is permanent.",
      )
    ) {
      toast.error("Account deletion requested");
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1120px]">
      <Toaster position="top-right" />

      {/* Security & Password Section */}
      <div className="bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-black/10 flex flex-col p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-5 h-5 flex justify-center items-center">
            <Shield className="w-4 h-5 text-slate-400" />
          </div>
          <h2 className="text-slate-400 text-base font-medium arimo-font leading-4">
            Security & Password
          </h2>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-neutral-950 text-sm font-medium arimo-font leading-4">
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              value={passwords.currentPassword}
              onChange={handleInputChange}
              className="w-full h-10 px-4 bg-zinc-100 rounded-lg outline-none text-neutral-950 text-sm font-normal arimo-font transition-all focus:ring-1 focus:ring-black/5"
              placeholder="Enter current password"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-neutral-950 text-sm font-medium arimo-font leading-4">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handleInputChange}
              className="w-full h-10 px-4 bg-zinc-100 rounded-lg outline-none text-neutral-950 text-sm font-normal arimo-font transition-all focus:ring-1 focus:ring-black/5"
              placeholder="Enter new password"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-neutral-950 text-sm font-medium arimo-font leading-4">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handleInputChange}
              className="w-full h-10 px-4 bg-zinc-100 rounded-lg outline-none text-neutral-950 text-sm font-normal arimo-font transition-all focus:ring-1 focus:ring-black/5"
              placeholder="Confirm new password"
            />
          </div>

          <button
            onClick={handleUpdatePassword}
            className="w-fit px-6 py-2.5 bg-[#215D5D] text-white text-sm font-medium arimo-font leading-5 rounded-2xl flex justify-center items-center hover:bg-[#1a4a4a] transition-colors mt-2"
          >
            Update Password
          </button>
        </div>
      </div>

      {/* Account Actions Section */}
      <div className="bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-red-200 flex flex-col p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-5 h-5 flex justify-center items-center">
            <Lock className="w-4 h-5 text-red-600" />
          </div>
          <h2 className="text-red-600 text-base font-medium arimo-font leading-4">
            Account Actions
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          <div className="w-full bg-yellow-50 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-yellow-200 p-4">
            <div className="flex gap-2 items-center">
              <span className="text-yellow-800 text-sm font-bold arimo-font leading-5">
                Warning:
              </span>
              <span className="text-yellow-800 text-sm font-normal arimo-font leading-5">
                These actions are permanent and cannot be undone.
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-yellow-600 flex justify-center items-center gap-2 text-yellow-600 text-sm font-medium arimo-font leading-5 hover:bg-yellow-50 transition-colors"
            >
              <LogOut size={16} />
              Log Out
            </button>
            <button
              onClick={handleDeleteAccount}
              className="px-6 py-2 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-red-600 flex justify-center items-center gap-2 text-red-600 text-sm font-medium arimo-font leading-5 hover:bg-red-50 transition-colors"
            >
              <Trash2 size={16} />
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

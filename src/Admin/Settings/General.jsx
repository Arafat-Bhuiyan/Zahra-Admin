import { Save, Edit, Globe } from "lucide-react";
import { useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function General() {
  const [isEditing, setIsEditing] = useState(false);
  const [logoUrl, setLogoUrl] = useState(null);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    platformName: "Learning Management System",
    platformUrl: "https://lms.school.com",
    platformDescription:
      "A comprehensive learning management system for students and teachers",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoUrl(reader.result);
        toast.success("Logo uploaded locally!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // In a real application, you would send the data to your server here.
    console.log("Saving platform data:", { ...formData, logoUrl });
    toast.success("Platform information saved successfully!");
    setIsEditing(false);
  };

  return (
    <div className="w-full bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-black/10 flex flex-col">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="p-6 flex justify-between items-start">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-neutral-950" />
            <h2 className="text-neutral-950 text-base font-normal arimo-font leading-4">
              Platform Information
            </h2>
          </div>
          <p className="text-gray-500 text-base font-normal arimo-font leading-6 mt-1">
            Basic configuration for your platform
          </p>
        </div>

        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center justify-center gap-2 h-9 px-4 py-2 bg-greenTeal rounded-[10px] text-white text-sm font-medium leading-5 hover:bg-greenTeal/90 transition-colors"
          >
            <Edit size={16} />
            <span>Edit</span>
          </button>
        )}
      </div>

      <div className="px-6 pb-6 flex flex-col gap-6">
        {/* Logo Section */}
        <div className="flex items-center gap-5">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
          <div className="w-14 h-14 bg-greenTeal rounded-full flex justify-center items-center shrink-0 overflow-hidden">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="Platform Logo"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white text-3xl font-normal leading-9">
                FR
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => fileInputRef.current.click()}
              disabled={!isEditing}
              className="px-4 py-2 bg-greenTeal rounded-lg text-white text-sm font-medium leading-5 hover:bg-greenTeal/90 transition-colors disabled:opacity-50"
            >
              Upload Platform logo
            </button>
            <p className="text-gray-500 text-xs font-normal leading-4">
              Professional photo recommended (JPG, PNG - Max. 5MB)
            </p>
          </div>
        </div>

        {/* Fields Section */}
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-neutral-950 text-sm font-normal arimo-font leading-4">
              Platform Name
            </label>
            <input
              type="text"
              name="platformName"
              value={formData.platformName}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="Enter platform name"
              className="h-10 px-3 py-1 bg-zinc-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-black/0 text-neutral-950 text-sm font-normal arimo-font leading-5 disabled:opacity-70 focus:outline-black/10"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-neutral-950 text-sm font-normal arimo-font leading-4">
              Platform URL
            </label>
            <input
              type="text"
              name="platformUrl"
              value={formData.platformUrl}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="https://example.com"
              className="h-10 px-3 py-1 bg-zinc-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-black/0 text-neutral-950 text-sm font-normal arimo-font leading-5 disabled:opacity-70 focus:outline-black/10"
            />
          </div>
        </div>

        <div className="h-px bg-black/10" />

        <div className="flex flex-col gap-2">
          <label className="text-neutral-950 text-sm font-normal arimo-font leading-4">
            Platform Description
          </label>
          <textarea
            name="platformDescription"
            value={formData.platformDescription}
            onChange={handleInputChange}
            disabled={!isEditing}
            rows={2}
            className="p-3 bg-zinc-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-black/0 text-neutral-950 text-sm font-normal arimo-font leading-5 resize-none disabled:opacity-70 focus:outline-black/10"
          />
        </div>

        {/* Action Button */}
        <div className="mt-2 text-right">
          {isEditing && (
            <button
              onClick={handleSave}
              className="inline-flex items-center justify-center gap-2 h-9 px-4 py-2 bg-greenTeal rounded-[10px] text-white text-sm font-medium leading-5 hover:bg-greenTeal/90 transition-colors"
            >
              <Save size={16} />
              <span>Save Admin Settings</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

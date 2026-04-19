import { Edit, Globe } from "lucide-react";
import { useEffect, useState } from "react";

export default function General({ data, onChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [localData, setLocalData] = useState(data);

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalData((prev) => ({ ...prev, [name]: value }));
    onChange(name, value);
  };

  return (
    <div className="w-full bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-black/10 flex flex-col">
      <div className="p-6 flex justify-between items-start">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-neutral-950" />
            <h2 className="text-neutral-950 text-base font-normal arimo-font leading-4">
              Site Overview
            </h2>
          </div>
          <p className="text-gray-500 text-base font-normal arimo-font leading-6 mt-1">
            Manage the short and long descriptions shown on the homepage.
          </p>
        </div>

        <button
          onClick={() => setIsEditing((prev) => !prev)}
          className="inline-flex items-center justify-center gap-2 h-9 px-4 py-2 bg-greenTeal rounded-[10px] text-white text-sm font-medium leading-5 hover:bg-greenTeal/90 transition-colors"
        >
          <Edit size={16} />
          <span>{isEditing ? "Close" : "Edit"}</span>
        </button>
      </div>

      <div className="px-6 pb-6 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-neutral-950 text-sm font-normal arimo-font leading-4">
            Short About
          </label>
          <textarea
            name="short_about"
            value={localData.short_about}
            onChange={handleChange}
            disabled={!isEditing}
            rows={3}
            className="p-3 bg-zinc-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-black/0 text-neutral-950 text-sm font-normal arimo-font leading-5 resize-none disabled:opacity-70 focus:outline-black/10"
            placeholder="Enter a short description for the platform"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-neutral-950 text-sm font-normal arimo-font leading-4">
            Long About
          </label>
          <textarea
            name="long_about"
            value={localData.long_about}
            onChange={handleChange}
            disabled={!isEditing}
            rows={6}
            className="p-3 bg-zinc-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-black/0 text-neutral-950 text-sm font-normal arimo-font leading-5 resize-none disabled:opacity-70 focus:outline-black/10"
            placeholder="Enter the full platform description"
          />
        </div>
      </div>
    </div>
  );
}

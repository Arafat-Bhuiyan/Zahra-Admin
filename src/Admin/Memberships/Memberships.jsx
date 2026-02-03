import React, { useState } from "react";
import {
  Crown,
  Check,
  Settings,
  Plus,
  Package,
  Eye,
  EyeOff,
  Pencil,
  Trash2,
  FileText,
  MousePointer2,
} from "lucide-react";
import toast from "react-hot-toast";

const MembershipCard = () => {
  const benefits = [
    "Access to all existing courses",
    "All upcoming courses included",
    "New content added monthly",
    "Cancel anytime",
    "Certificate of completion",
    "Community forum access",
  ];

  return (
    <div className="w-full bg-gradient-to-b from-[#7AA4A5] to-[#6A9495] rounded-2xl shadow-lg text-white overflow-hidden relative">
      <div className="p-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="flex-1 space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Crown size={32} className="text-white" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold arimo-font">
                    Full Membership Subscription
                  </h2>
                  <span className="px-3 py-1 bg-emerald-500 rounded-full text-green-900 text-xs font-bold uppercase tracking-wider">
                    Active
                  </span>
                </div>
                <p className="text-white/90 text-base arimo-font">
                  Get unlimited access to all current and future courses
                </p>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-bold arimo-font">$49</span>
              <span className="text-white/80 text-base">/month</span>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-transparent border border-green-300 flex items-center justify-center shrink-0">
                    <Check
                      size={12}
                      className="text-green-300"
                      strokeWidth={3}
                    />
                  </div>
                  <span className="text-white/90 text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Edit Button */}
          <button className="bg-white hover:bg-opacity-90 text-greenTeal px-4 py-2.5 rounded-[10px] font-bold text-base flex items-center gap-2 transition-colors shadow-sm">
            <Settings size={18} />
            Edit Settings
          </button>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="bg-black/10 px-8 py-4 backdrop-blur-sm">
        <div className="flex flex-col">
          <span className="text-white/70 text-sm">Active Subscribers</span>
          <span className="text-3xl font-bold">1,247</span>
        </div>
      </div>
    </div>
  );
};

const BundleWebCard = ({ bundle, onToggleStatus, onRemoveBundle }) => {
  const isPublished = bundle.status === "Published";
  const borderColor = isPublished ? "outline-green-200" : "outline-neutral-200";
  const shadowColor = isPublished ? "shadow-green-100" : "shadow-neutral-100";

  return (
    <div
      className={`bg-white rounded-2xl p-6 outline outline-2 outline-offset-[-2px] ${borderColor} shadow-sm hover:shadow-md transition-shadow flex flex-col h-full`}
    >
      {/* Header */}
      <div className="mb-6 space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-neutral-800 arimo-font leading-tight pr-4">
            {bundle.title}
          </h3>
          {isPublished ? (
            <div className="flex items-center gap-1.5 bg-green-100 px-3 py-1 rounded-full shrink-0">
              <div className="w-2 h-2 rounded-full bg-green-600"></div>
              <span className="text-green-700 text-xs font-bold">
                Published
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 bg-neutral-100 px-3 py-1 rounded-full shrink-0">
              <div className="w-2 h-2 rounded-full bg-neutral-500"></div>
              <span className="text-neutral-600 text-xs font-bold">Draft</span>
            </div>
          )}
        </div>
        <p className="text-neutral-600 text-sm arimo-font line-clamp-2">
          {bundle.description}
        </p>
      </div>

      {/* Price */}
      <div className="mb-6 space-y-1">
        <div className="flex items-center gap-3">
          <span className="text-greenTeal text-3xl font-bold arimo-font">
            ${bundle.price}
          </span>
          {bundle.discount > 0 && (
            <span className="text-greenTeal text-sm font-normal">
              Save {bundle.discount}%
            </span>
          )}
        </div>
        <div className="text-neutral-500 text-sm line-through">
          Original value: ${bundle.originalPrice}
        </div>
        <div className="text-neutral-500 text-xs">One-time lifetime access</div>
      </div>

      {/* Includes List */}
      <div className="mb-6 flex-1">
        <p className="text-neutral-700 text-sm mb-3">
          Includes {bundle.courses.length} Courses:
        </p>
        <div className="space-y-3">
          {bundle.courses.map((course, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="w-4 h-4 mt-0.5 shrink-0">
                <div
                  className={`w-3 h-3 rounded-sm border ${isPublished ? "border-green-500" : "border-neutral-400"} flex items-center justify-center`}
                >
                  <Check
                    size={8}
                    className={
                      isPublished ? "text-green-500" : "text-neutral-400"
                    }
                  />
                </div>
              </div>
              <div>
                <p className="text-neutral-700 text-sm leading-tight">
                  {course.title}
                </p>
                <p className="text-neutral-500 text-xs mt-0.5">
                  {course.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Divider */}
      <div className="border-t border-neutral-200 pt-4 mb-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-neutral-500 text-sm">Sales</p>
          <p className="text-neutral-800 text-sm font-bold">{bundle.sales}</p>
        </div>
        <div>
          <p className="text-neutral-500 text-sm">Created</p>
          <p className="text-neutral-800 text-sm font-bold">{bundle.date}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 mt-auto">
        <button
          onClick={() => onToggleStatus(bundle.id)}
          className={`flex-1 h-10 rounded-[10px] flex items-center justify-center gap-2 font-normal text-base transition-colors ${
            isPublished
              ? "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              : "bg-green-100 text-green-700 hover:bg-green-200"
          }`}
        >
          {isPublished ? (
            <>
              <EyeOff size={16} /> Unpublish
            </>
          ) : (
            <>
              <MousePointer2 size={16} className="rotate-90" /> Publish
            </>
          )}
        </button>
        <button className="w-10 h-10 rounded-[10px] border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 text-neutral-500 hover:text-neutral-800 transition-colors">
          <Pencil size={18} />
        </button>
        <button
          onClick={() => onRemoveBundle(bundle.id)}
          className="w-10 h-10 rounded-[10px] border border-neutral-200 flex items-center justify-center hover:bg-red-50 text-neutral-500 hover:text-red-500 transition-colors"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, colorClass, bgClass }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm flex items-center gap-4">
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center ${bgClass}`}
      >
        <Icon size={24} className={colorClass} />
      </div>
      <div>
        <p className="text-neutral-500 text-sm">{label}</p>
        <p className="text-2xl font-bold text-neutral-800 mt-1">{value}</p>
      </div>
    </div>
  );
};

const Memberships = () => {
  const [bundles, setBundles] = useState([
    {
      id: 1,
      title: "Web Development Mastery Bundle",
      description: "Complete web development stack from frontend to backend",
      price: 599,
      originalPrice: 1344,
      discount: 55,
      status: "Published",
      sales: 47,
      date: "1/10/2026",
      courses: [
        { title: "Data Science Fundamentals", category: "Data Science" },
        { title: "Node.js Backend Development", category: "Web Development" },
        { title: "CSS Masterclass", category: "Web Development" },
        { title: "Advanced React Patterns", category: "Web Development" },
      ],
    },
    {
      id: 2,
      title: "UI/UX Design Masterclass Bundle",
      description: "Learn to design beautiful interfaces and user experiences",
      price: 399,
      originalPrice: 899,
      discount: 45,
      status: "Draft",
      sales: 12,
      date: "2/15/2026",
      courses: [
        { title: "Figma Fundamentals", category: "Design" },
        { title: "User Research Mastery", category: "UX Research" },
        { title: "Design Systems", category: "UI Design" },
      ],
    },
    {
      id: 3,
      title: "Full Stack Python Bundle",
      description: "Master Python from basics to advanced web frameworks",
      price: 499,
      originalPrice: 999,
      discount: 50,
      status: "Draft",
      sales: 8,
      date: "3/01/2026",
      courses: [
        { title: "Python for Beginners", category: "Programming" },
        { title: "Django Framework", category: "Web Development" },
        { title: "FastAPI & Microservices", category: "Backend" },
      ],
    },
  ]);

  const handleToggleStatus = (id) => {
    setBundles((prevBundles) =>
      prevBundles.map((bundle) => {
        if (bundle.id === id) {
          return {
            ...bundle,
            status: bundle.status === "Published" ? "Draft" : "Published",
          };
        }
        return bundle;
      }),
    );
  };

  const handleRemoveBundle = (id) => {
    toast(
      (t) => (
        <div className="flex items-center gap-4 p-1">
          <div className="flex-1">
            <p className="text-sm font-bold text-neutral-800 arimo-font">
              Confirm Delete
            </p>
            <p className="text-xs text-neutral-500 mt-0.5 arimo-font">
              Are you sure you want to remove this bundle?
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors arimo-font"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setBundles((prev) => prev.filter((bundle) => bundle.id !== id));
                toast.dismiss(t.id);
                toast.success("Bundle removed successfully", {
                  icon: "🗑️",
                  style: {
                    borderRadius: "12px",
                    background: "#333",
                    color: "#fff",
                  },
                });
              }}
              className="px-3 py-1.5 text-xs font-medium bg-red-500 text-white hover:bg-red-600 rounded-lg transition-colors shadow-sm arimo-font"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        duration: 5000,
        position: "top-center",
        style: {
          minWidth: "350px",
          borderRadius: "16px",
          border: "1px solid rgba(0,0,0,0.05)",
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        },
      },
    );
  };

  const totalBundles = bundles.length;
  const publishedCount = bundles.filter((b) => b.status === "Published").length;
  const unpublishedCount = bundles.filter(
    (b) => b.status !== "Published",
  ).length;

  return (
    <div className="p-8 space-y-10 min-h-screen bg-white animate-in fade-in duration-500">
      {/* Subscription Card */}
      <div className="w-full">
        <MembershipCard />
      </div>

      {/* Course Bundles Section */}
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end border-b border-neutral-200 pb-6 gap-4">
          <div className="space-y-1">
            <h2 className="text-neutral-800 text-2xl font-bold arimo-font">
              Course Bundles
            </h2>
            <p className="text-neutral-500 text-base arimo-font">
              Create curated course packages for one-time purchase
            </p>
          </div>
          <button className="bg-greenTeal hover:bg-opacity-80 text-white px-6 py-3 rounded-[10px] font-bold shadow-md transition-all flex items-center gap-2">
            <Plus size={20} />
            Create Bundle
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            icon={Package}
            label="Total Bundles"
            value={totalBundles}
            bgClass="bg-slate-100"
            colorClass="text-slate-500"
          />
          <StatCard
            icon={Eye}
            label="Published"
            value={publishedCount}
            bgClass="bg-green-100"
            colorClass="text-green-600"
          />
          <StatCard
            icon={EyeOff}
            label="Unpublished"
            value={unpublishedCount}
            bgClass="bg-neutral-100"
            colorClass="text-neutral-600"
          />
        </div>

        {/* Bundles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {bundles.map((bundle) => (
            <BundleWebCard
              key={bundle.id}
              bundle={bundle}
              onToggleStatus={handleToggleStatus}
              onRemoveBundle={handleRemoveBundle}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Memberships;

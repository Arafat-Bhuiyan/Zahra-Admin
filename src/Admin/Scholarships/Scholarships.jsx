import React, { useState } from "react";
import {
  Search,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Percent,
  X,
  Phone,
  Mail,
  GraduationCap,
  BookOpen,
  DollarSign,
} from "lucide-react";
import toast from "react-hot-toast";
import ScholarshipDetailsModal from "./ScholarshipDetailsModal";
import SetDiscountModal from "./SetDiscountModal";

const StatsCard = ({ icon: Icon, color, label, value }) => {
  const colorStyles = {
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
      outline: "outline-blue-600",
    },
    yellow: {
      bg: "bg-yellow-100",
      text: "text-yellow-600",
      outline: "outline-yellow-600",
    },
    green: {
      bg: "bg-green-100",
      text: "text-green-600",
      outline: "outline-green-600",
    },
    red: { bg: "bg-red-100", text: "text-red-600", outline: "outline-red-600" },
  };

  const style = colorStyles[color] || colorStyles.blue;

  return (
    <div className="flex-1 min-w-[240px] px-6 pt-6 pb-6 bg-white rounded-2xl shadow-sm border border-neutral-200 flex flex-col justify-start items-start transition-all hover:shadow-md">
      <div className="self-stretch flex justify-start items-center gap-4">
        <div
          className={`w-12 h-12 ${style.bg} rounded-full flex justify-center items-center`}
        >
          <Icon className={`w-6 h-6 ${style.text}`} strokeWidth={2.5} />
        </div>
        <div className="flex flex-col justify-start items-start">
          <div className="text-neutral-500 text-sm font-normal arimo-font leading-5">
            {label}
          </div>
          <div className="text-neutral-800 text-2xl font-bold arimo-font leading-8">
            {value}
          </div>
        </div>
      </div>
    </div>
  );
};

const ApplicationCard = ({ app, onReject, onViewDetails, onOpenDiscount }) => {
  const statusColors = {
    Pending: {
      bg: "bg-yellow-100",
      text: "text-yellow-700",
      border: "outline-yellow-200",
      dot: "outline-yellow-700",
    },
    Approved: {
      bg: "bg-green-100",
      text: "text-green-700",
      border: "outline-green-200",
      dot: "outline-green-700",
    },
    Rejected: {
      bg: "bg-red-100",
      text: "text-red-700",
      border: "outline-red-200",
      dot: "outline-red-700",
    },
  };

  const statusStyle = statusColors[app.status] || statusColors.Pending;

  return (
    <div className="w-full px-6 pt-6 pb-px bg-white rounded-2xl shadow-sm border border-neutral-200 flex flex-col justify-start items-start gap-4 hover:shadow-md transition-all">
      <div className="self-stretch flex justify-between items-start">
        {/* Left Section: Avatar & Info */}
        <div className="flex gap-4">
          <div className="w-14 h-14 bg-slate-400 rounded-full flex justify-center items-center">
            <span className="text-white text-xl font-bold arimo-font">
              {app.initials}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {/* Name & Status */}
            <div className="flex items-center gap-3">
              <h3 className="text-neutral-800 text-lg font-bold arimo-font">
                {app.name}
              </h3>
              <div
                className={`px-2.5 py-0.5 rounded-full flex items-center gap-1.5 outline outline-1 outline-offset-[-1px] ${statusStyle.bg} ${statusStyle.border}`}
              >
                <div className="w-3.5 h-3.5 relative flex items-center justify-center">
                  <div
                    className={`w-2 h-2 rounded-full border-2 ${statusStyle.text.replace("text", "border")}`}
                  ></div>
                </div>
                <span
                  className={`text-xs font-bold arimo-font ${statusStyle.text}`}
                >
                  {app.status === "Approved" ? "Approved" : app.status}
                </span>
              </div>
              {app.discount && (
                <div className="px-2.5 py-0.5 rounded-full flex items-center gap-1.5 outline outline-1 outline-offset-[-1px] bg-purple-100 outline-purple-200">
                  <Percent size={12} className="text-purple-700" />
                  <span className="text-xs font-bold arimo-font text-purple-700">
                    {app.discount}
                  </span>
                </div>
              )}
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 mt-1">
              <div className="flex items-center gap-2 text-neutral-600 text-sm arimo-font">
                <Mail size={14} className="text-neutral-400" />
                {app.email}
              </div>
              <div className="flex items-center gap-2 text-neutral-600 text-sm arimo-font">
                <Phone size={14} className="text-neutral-400" />
                {app.phone}
              </div>
              <div className="flex items-center gap-2 text-neutral-600 text-sm arimo-font">
                <BookOpen size={14} className="text-neutral-400" />
                {app.course}
              </div>
              <div className="flex items-center gap-2 text-neutral-600 text-sm arimo-font">
                <DollarSign size={14} className="text-neutral-400" />
                <span className="flex items-center gap-2">
                  Price: {app.price}
                  {app.discountPrice && (
                    <span className="text-green-600 font-bold">
                      → {app.discountPrice}
                    </span>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onViewDetails(app)}
            className="w-10 h-9 rounded-lg border border-slate-300 flex items-center justify-center text-slate-400 hover:text-blue-500 hover:border-blue-500 hover:bg-blue-50 transition-all"
          >
            <Eye size={18} />
          </button>
          <button
            onClick={() => onOpenDiscount(app)}
            className="w-10 h-9 rounded-lg bg-slate-400 hover:bg-slate-500 text-white flex items-center justify-center transition-all shadow-sm"
          >
            <Percent size={16} />
          </button>
          <button
            onClick={() => onReject(app.id)}
            className="w-10 h-9 rounded-lg bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition-all shadow-sm"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="self-stretch h-10 border-t border-neutral-200 flex justify-between items-center text-xs text-neutral-500 arimo-font">
        <div className="flex items-center gap-1">
          <span>Applied: {app.appliedDate}</span>
          <span className="mx-1">•</span>
          <span>{app.documentCount} documents</span>
        </div>
        <div>{app.education}</div>
      </div>
    </div>
  );
};

const Scholarships = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAppDetails, setSelectedAppDetails] = useState(null);
  const [selectedAppDiscount, setSelectedAppDiscount] = useState(null);

  const [applications, setApplications] = useState([
    {
      id: 1,
      name: "Emily Rodriguez",
      initials: "ER",
      email: "emily.r@email.com",
      phone: "+1 (555) 234-5678",
      course: "Advanced React Patterns",
      price: "$299",
      status: "Pending",
      appliedDate: "January 10, 2026",
      documentCount: 2,
      education: "Undergraduate • Computer Science",
    },
    {
      id: 2,
      name: "Sarah Chen",
      initials: "SC",
      email: "sarah.chen@email.com",
      phone: "+1 (555) 345-6789",
      course: "UI/UX Design Masterclass",
      price: "$449",
      discount: "75% Discount",
      discountPrice: "$112.25",
      status: "Approved",
      appliedDate: "January 8, 2026",
      documentCount: 3,
      education: "Graduate • Information Technology",
    },
    {
      id: 3,
      name: "Michael Chang",
      initials: "MC",
      email: "m.chang@email.com",
      phone: "+1 (555) 987-6543",
      course: "Full Stack Web Development",
      price: "$599",
      status: "Pending",
      appliedDate: "January 12, 2026",
      documentCount: 1,
      education: "Undergraduate • Software Engineering",
    },
    {
      id: 4,
      name: "Jessica Williams",
      initials: "JW",
      email: "jess.williams@email.com",
      phone: "+1 (555) 111-2222",
      course: "Data Science Fundamentals",
      price: "$399",
      status: "Approved",
      appliedDate: "January 5, 2026",
      documentCount: 4,
      education: "Ph.D. • Statistics",
    },
  ]);

  const stats = [
    {
      label: "Total Applications",
      value: applications.length,
      icon: FileText,
      color: "blue",
    },
    {
      label: "Pending Review",
      value: applications.filter((a) => a.status === "Pending").length,
      icon: Clock,
      color: "yellow",
    },
    {
      label: "Approved",
      value: applications.filter((a) => a.status === "Approved").length,
      icon: CheckCircle,
      color: "green",
    },
    {
      label: "Rejected",
      value: applications.filter((a) => a.status === "Rejected").length,
      icon: XCircle,
      color: "red",
    },
  ];

  const filteredApplications = applications.filter(
    (app) =>
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.course.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleReject = (id) => {
    toast(
      (t) => (
        <div className="flex items-center gap-4 p-1">
          <div className="flex-1">
            <p className="text-sm font-bold text-neutral-800 inter-font">
              Reject Application
            </p>
            <p className="text-xs text-neutral-500 mt-0.5">
              Are you sure you want to reject this application?
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setApplications((prev) =>
                  prev.map((app) =>
                    app.id === id ? { ...app, status: "Rejected" } : app,
                  ),
                );
                toast.dismiss(t.id);
                toast.success("Application rejected", {
                  style: {
                    borderRadius: "12px",
                    background: "#333",
                    color: "#fff",
                  },
                });
              }}
              className="px-3 py-1.5 text-xs font-medium bg-red-500 text-white hover:bg-red-600 rounded-lg transition-colors shadow-sm"
            >
              Reject
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

  const handleApproveDiscount = (id, discountPercent, finalPrice) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id
          ? {
              ...app,
              status: "Approved",
              discount: `${discountPercent}% Discount`,
              discountPrice: `$${finalPrice.toFixed(2)}`,
            }
          : app,
      ),
    );
    toast.success("Application approved with discount!");
    setSelectedAppDiscount(null);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-8 space-y-8 animate-in fade-in duration-500">
      {/* Modals */}
      <ScholarshipDetailsModal
        isOpen={!!selectedAppDetails}
        onClose={() => setSelectedAppDetails(null)}
        application={selectedAppDetails}
        onReject={handleReject}
        onOpenDiscountModal={(app) => {
          setSelectedAppDetails(null);
          setSelectedAppDiscount(app);
        }}
      />

      <SetDiscountModal
        isOpen={!!selectedAppDiscount}
        onClose={() => setSelectedAppDiscount(null)}
        application={selectedAppDiscount}
        onApprove={handleApproveDiscount}
      />
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <StatsCard key={idx} {...stat} />
        ))}
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="bg-white p-1 rounded-2xl shadow-sm border border-neutral-200">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by name, email, or course..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:bg-slate-50 transition-colors text-neutral-700 placeholder:text-neutral-400/70 arimo-font text-base"
            />
          </div>
        </div>

        {/* Applications List */}
        <div className="flex flex-col gap-4">
          {filteredApplications.map((app) => (
            <ApplicationCard
              key={app.id}
              app={app}
              onReject={handleReject}
              onViewDetails={setSelectedAppDetails}
              onOpenDiscount={setSelectedAppDiscount}
            />
          ))}

          {filteredApplications.length === 0 && (
            <div className="text-center py-12">
              <p className="text-neutral-400 text-lg">
                No applications found matching your search.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Scholarships;

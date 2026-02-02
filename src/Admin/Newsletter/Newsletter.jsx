import React, { useState } from "react";
import {
  Plus,
  Mail,
  FileText,
  Users,
  Eye,
  Send,
  Calendar,
  Search,
} from "lucide-react";
import CreateNewsletterModal from "./CreateNewsletterModal";
import toast from "react-hot-toast";

const Newsletter = () => {
  const [activeTab, setActiveTab] = useState("Newsletters");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newsletters, setNewsletters] = useState([
    {
      id: 1,
      title: "January 2026 Course Updates",
      subject: "New Courses & Features This Month",
      preview:
        "Check out our latest courses in Web Development, Data Science, and Design...",
      status: "sent",
      date: "2026-01-10",
    },
    {
      id: 2,
      title: "Top Student Success Stories",
      subject: "How Our Students Achieved Their Goals",
      preview: "Inspiring stories from our community...",
      status: "sent",
      date: "2026-01-05",
    },
    {
      id: 3,
      title: "February Course Preview",
      subject: "Exciting New Courses Coming Soon!",
      preview: "Get ready for our February lineup...",
      status: "draft",
    },
  ]);

  const handleSendNow = (id) => {
    setNewsletters((prev) =>
      prev.map((n) =>
        n.id === id
          ? {
              ...n,
              status: "sent",
              date: new Date().toISOString().split("T")[0],
            }
          : n,
      ),
    );
    toast.success("Newsletter sent successfully!");
  };

  const handleSaveDraft = (newNewsletter) => {
    setNewsletters((prev) => [newNewsletter, ...prev]);
    toast.success("Saved as draft!");
  };

  const tabs = [
    { id: "Newsletters", icon: Mail, label: "Newsletters" },
    { id: "Templates", icon: FileText, label: "Email Templates" },
    { id: "Subscribers", icon: Users, label: "Subscribers" },
  ];

  return (
    <div className="p-8 space-y-8 min-h-screen arimo-font bg-slate-50/10">
      {/* Header */}
      <div className="flex justify-end items-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#7BA0A0] hover:bg-[#6A8F8F] text-white px-6 py-3 rounded-xl shadow-md transition-all active:scale-95 inter-font"
        >
          <Plus size={20} />
          <span className="font-semibold">Create Newsletter</span>
        </button>
      </div>

      <CreateNewsletterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveDraft}
      />

      {/* Main Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden min-h-[600px] flex flex-col">
        {/* Tabs Bar */}
        <div className="px-6 pt-6 border-b border-neutral-100">
          <div className="flex gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-base font-medium transition-all ${
                    isActive
                      ? "bg-[#7BA0A0] text-white shadow-sm"
                      : "text-neutral-500 hover:bg-slate-50"
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-8 flex-1">
          {activeTab === "Newsletters" && (
            <div className="space-y-4">
              {newsletters.map((item) => (
                <div
                  key={item.id}
                  className="p-6 bg-white rounded-2xl border border-neutral-200 flex flex-col gap-4 transition-all hover:shadow-md group"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-2 flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-neutral-800 text-xl font-bold">
                          {item.title}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            item.status === "sent"
                              ? "bg-green-100 text-green-700"
                              : "bg-neutral-100 text-neutral-600 font-bold"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <p className="text-neutral-600 text-sm font-medium">
                        Subject: {item.subject}
                      </p>
                      <p className="text-neutral-500 text-sm leading-relaxed max-w-3xl">
                        {item.preview}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      {item.status === "draft" && (
                        <button
                          onClick={() => handleSendNow(item.id)}
                          className="flex items-center gap-2 bg-[#7BA0A0] hover:bg-[#6A8F8F] text-white px-5 py-2 rounded-xl text-sm font-bold shadow-sm transition-all active:scale-95"
                        >
                          <Send size={16} />
                          Send Now
                        </button>
                      )}
                      <button className="p-2.5 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all">
                        <Eye size={20} />
                      </button>
                    </div>
                  </div>

                  {item.status === "sent" && (
                    <div className="flex items-center gap-2 text-neutral-400 text-sm pt-2 border-t border-neutral-50/50">
                      <Calendar size={16} />
                      <span>Sent: {item.date}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === "Templates" && (
            <div className="flex flex-col items-center justify-center h-full py-20 text-neutral-400 space-y-4">
              <div className="p-6 bg-slate-50 rounded-full">
                <FileText size={48} />
              </div>
              <p className="text-lg font-medium">No templates found</p>
              <button className="text-[#7BA0A0] font-bold hover:underline">
                Create your first template
              </button>
            </div>
          )}

          {activeTab === "Subscribers" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl">
                <div className="relative flex-1 max-w-md">
                  <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Search subscribers..."
                    className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#7BA0A0]/20"
                  />
                </div>
                <div className="flex gap-4 items-center">
                  <span className="text-sm font-bold text-neutral-500">
                    1,234 Total Subscribers
                  </span>
                  <button className="text-sm font-bold bg-[#7BA0A0]/10 text-[#7BA0A0] px-4 py-2 rounded-lg hover:bg-[#7BA0A0]/20">
                    Export Excel
                  </button>
                </div>
              </div>

              <div className="border border-neutral-200 rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-neutral-50">
                    <tr className="text-neutral-500 text-sm font-bold border-b border-neutral-200">
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Subscribed At</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <tr
                        key={i}
                        className="hover:bg-neutral-50/50 transition-colors"
                      >
                        <td className="px-6 py-4 font-bold text-neutral-800">
                          Subscriber {i}
                        </td>
                        <td className="px-6 py-4 text-neutral-600">
                          user{i}@example.com
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2.5 py-1 bg-green-100 text-green-700 text-[10px] font-bold uppercase rounded-full">
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-4 text-neutral-500 text-sm">
                          2026-01-{10 + i}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Newsletter;

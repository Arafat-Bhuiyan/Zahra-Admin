import React, { useState } from "react";
import {
  Search,
  Filter,
  Award,
  Download,
  Trash2,
  Eye,
  ShieldCheck,
  Clock,
} from "lucide-react";
import toast from "react-hot-toast";

const Certificates = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [certificates, setCertificates] = useState([
    {
      id: "CERT-001",
      name: "Islamic Psychology Foundation",
      recipient: "Abdullah Al-Mamun",
      date: "2024-03-15",
      type: "Course Completion",
      status: "Verified",
    },
    {
      id: "CERT-002",
      name: "Advanced Arabic Linguistics",
      recipient: "Sarah Jenkins",
      date: "2024-02-28",
      type: "Mastery Level",
      status: "Verified",
    },
    {
      id: "CERT-003",
      name: "Islamic Finance & Ethics",
      recipient: "Michael Scott",
      date: "2024-01-10",
      type: "Professional Certification",
      status: "Pending",
    },
    {
      id: "CERT-004",
      name: "Hadith Studies - Level I",
      recipient: "Emma Watson",
      date: "2023-12-20",
      type: "Course Completion",
      status: "Revoked",
    },
  ]);

  const filteredCertificates = certificates.filter(
    (c) =>
      c.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case "Verified":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "Pending":
        return "bg-amber-50 text-amber-700 border-amber-100";
      case "Revoked":
        return "bg-rose-50 text-rose-700 border-rose-100";
      default:
        return "bg-gray-50 text-gray-700 border-gray-100";
    }
  };

  return (
    <div className="pt-2 flex flex-col gap-6 animate-in fade-in duration-500">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
            <Award className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium arimo-font">
              Total Issued
            </p>
            <h3 className="text-2xl font-bold text-neutral-900 leading-tight">
              1,452
            </h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium arimo-font">
              Verified
            </p>
            <h3 className="text-2xl font-bold text-neutral-900 leading-tight">
              1,380
            </h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
            <Clock className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium arimo-font">
              Pending Review
            </p>
            <h3 className="text-2xl font-bold text-neutral-900 leading-tight">
              12
            </h3>
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="w-full bg-white rounded-2xl border border-black/10 shadow-sm p-6 flex flex-col gap-7 min-h-[610px]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full">
          <div className="flex flex-col">
            <h2 className="text-neutral-950 text-xl font-bold arimo-font">
              Certificates Repository
            </h2>
            <p className="text-gray-500 text-sm font-normal arimo-font">
              Track and verify all credentials issued by the academy
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search recipient or certificate..."
                className="w-full h-10 pl-10 pr-4 bg-zinc-50 border border-black/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-greenTeal/20 focus:border-greenTeal transition-all text-sm arimo-font"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="p-2.5 bg-white rounded-xl border border-black/10 hover:bg-gray-50 transition-colors shadow-sm text-neutral-950">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Certificates Table */}
        <div className="w-full overflow-x-auto rounded-xl border border-black/5">
          <table className="w-full text-sm text-left arimo-font">
            <thead className="bg-zinc-50 border-b border-black/5 text-neutral-500 font-medium">
              <tr>
                <th className="py-4 px-6">ID</th>
                <th className="py-4 px-6">Recipient</th>
                <th className="py-4 px-6">Certificate Name</th>
                <th className="py-4 px-6">Type</th>
                <th className="py-4 px-6 text-center">Date Issued</th>
                <th className="py-4 px-6 text-center">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {filteredCertificates.map((c) => (
                <tr
                  key={c.id}
                  className="hover:bg-zinc-50/50 transition-colors group"
                >
                  <td className="py-4 px-6 text-xs font-mono text-neutral-400">
                    {c.id}
                  </td>
                  <td className="py-4 px-6 text-neutral-900 font-semibold">
                    {c.recipient}
                  </td>
                  <td className="py-4 px-6 text-neutral-600 font-medium">
                    {c.name}
                  </td>
                  <td className="py-4 px-6 text-neutral-500 italic text-xs">
                    {c.type}
                  </td>
                  <td className="py-4 px-6 text-center text-neutral-500">
                    {c.date}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex justify-center">
                      <span
                        className={`px-2.5 py-1 rounded-full border text-[10px] uppercase font-bold ${getStatusStyle(c.status)}`}
                      >
                        {c.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-black/5 text-neutral-400 hover:text-blue-600 transition-all">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-black/5 text-neutral-400 hover:text-emerald-600 transition-all">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-black/5 text-neutral-400 hover:text-rose-600 transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Certificates;

import React, { useState } from "react";
import {
  Search,
  Filter,
  UserCheck,
  Shield,
  Clock,
  AlertTriangle,
  MoreVertical,
  CreditCard,
} from "lucide-react";

const Memberships = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [memberships, setMemberships] = useState([
    {
      id: "MEM-4021",
      user: "Abdullah Al-Mamun",
      tier: "LIFETIME",
      since: "2023-05-12",
      expiry: "Never",
      status: "Active",
    },
    {
      id: "MEM-4022",
      user: "Sarah Jenkins",
      tier: "PREMIUM",
      since: "2024-01-20",
      expiry: "2025-01-20",
      status: "Active",
    },
    {
      id: "MEM-4023",
      user: "Michael Scott",
      tier: "BASIC",
      since: "2023-03-10",
      expiry: "2024-03-10",
      status: "Expired",
    },
    {
      id: "MEM-4024",
      user: "Emma Watson",
      tier: "PREMIUM",
      since: "2023-11-15",
      expiry: "2024-11-15",
      status: "Active",
    },
    {
      id: "MEM-4025",
      user: "Kevin Hart",
      tier: "BASIC",
      since: "2024-02-01",
      expiry: "2025-02-01",
      status: "Cancelled",
    },
  ]);

  const filteredMemberships = memberships.filter(
    (m) =>
      m.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.tier.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getTierBadge = (tier) => {
    switch (tier) {
      case "LIFETIME":
        return "bg-purple-600 text-white";
      case "PREMIUM":
        return "bg-greenTeal text-white";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "text-emerald-500 bg-emerald-50";
      case "Expired":
        return "text-rose-500 bg-rose-50";
      case "Cancelled":
        return "text-gray-400 bg-gray-50";
      default:
        return "text-gray-500 bg-gray-50";
    }
  };

  return (
    <div className="pt-2 flex flex-col gap-6 animate-in fade-in duration-500">
      {/* Tier Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-6 rounded-2xl text-white shadow-lg overflow-hidden relative">
          <div className="relative z-10 flex flex-col gap-4">
            <Shield className="w-8 h-8 opacity-50" />
            <div>
              <p className="text-purple-100 text-sm font-medium">
                Lifetime Members
              </p>
              <h3 className="text-3xl font-bold">128</h3>
            </div>
          </div>
          <Shield className="w-32 h-32 absolute -right-8 -bottom-8 opacity-10" />
        </div>
        <div className="bg-gradient-to-br from-[#89A6A7] to-[#5D7A7B] p-6 rounded-2xl text-white shadow-lg overflow-hidden relative">
          <div className="relative z-10 flex flex-col gap-4">
            <UserCheck className="w-8 h-8 opacity-50" />
            <div>
              <p className="text-[#E0ECEB] text-sm font-medium">
                Premium (Active)
              </p>
              <h3 className="text-3xl font-bold">842</h3>
            </div>
          </div>
          <UserCheck className="w-32 h-32 absolute -right-8 -bottom-8 opacity-10" />
        </div>
        <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm flex flex-col gap-4">
          <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">
              Expiring This Month
            </p>
            <h3 className="text-3xl font-bold text-neutral-900">45</h3>
          </div>
        </div>
      </div>

      {/* Membership List */}
      <div className="w-full bg-white rounded-2xl border border-black/10 shadow-sm p-6 flex flex-col gap-7 min-h-[610px]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full">
          <div className="flex flex-col">
            <h2 className="text-neutral-950 text-xl font-bold arimo-font">
              Membership Management
            </h2>
            <p className="text-gray-500 text-sm font-normal arimo-font">
              Control access tiers and subscription cycles
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search specific members..."
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

        {/* Table */}
        <div className="w-full overflow-x-auto rounded-xl border border-black/5">
          <table className="w-full text-sm text-left arimo-font">
            <thead className="bg-zinc-50 border-b border-black/5 text-neutral-500 font-medium">
              <tr>
                <th className="py-4 px-6">Member ID</th>
                <th className="py-4 px-6">User Name</th>
                <th className="py-4 px-6">Access Tier</th>
                <th className="py-4 px-6 text-center">Member Since</th>
                <th className="py-4 px-6 text-center">Expiry / Renewal</th>
                <th className="py-4 px-6 text-center">Lifecycle</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {filteredMemberships.map((m) => (
                <tr
                  key={m.id}
                  className="hover:bg-zinc-50/50 transition-colors group"
                >
                  <td className="py-4 px-6 font-mono text-xs text-neutral-400">
                    {m.id}
                  </td>
                  <td className="py-4 px-6 text-neutral-900 font-semibold">
                    {m.user}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-widest ${getTierBadge(m.tier)}`}
                    >
                      {m.tier}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center text-neutral-600">
                    {m.since}
                  </td>
                  <td className="py-4 px-6 text-center text-neutral-600">
                    {m.expiry}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex justify-center">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${getStatusColor(m.status)}`}
                      >
                        {m.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-1">
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg text-neutral-400 hover:text-neutral-900 transition-colors">
                        <CreditCard className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg text-neutral-400 hover:text-neutral-900 transition-colors">
                        <MoreVertical className="w-4 h-4" />
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

export default Memberships;

import React, { useState } from "react";
import {
  Search,
  Filter,
  Download,
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const Payments = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [transactions, setTransactions] = useState([
    {
      id: "TRX-98234",
      user: "Abdullah Al-Mamun",
      amount: "$150.00",
      date: "2024-03-25",
      type: "Course Purchase",
      method: "Stripe",
      status: "Completed",
    },
    {
      id: "TRX-98235",
      user: "Sarah Jenkins",
      amount: "$45.00",
      date: "2024-03-24",
      type: "Book Sale",
      method: "PayPal",
      status: "Pending",
    },
    {
      id: "TRX-98236",
      user: "Michael Scott",
      amount: "$1,200.00",
      date: "2024-03-22",
      type: "Membership Renewal",
      method: "Bank Transfer",
      status: "Failed",
    },
    {
      id: "TRX-98237",
      user: "Emma Watson",
      amount: "$299.00",
      date: "2024-03-20",
      type: "Course Purchase",
      method: "Stripe",
      status: "Completed",
    },
    {
      id: "TRX-98238",
      user: "Kevin Hart",
      amount: "$15.50",
      date: "2024-03-18",
      type: "Book Sale",
      method: "PayPal",
      status: "Completed",
    },
  ]);

  const filteredTransactions = transactions.filter(
    (t) =>
      t.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.type.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "Pending":
        return "bg-amber-50 text-amber-700 border-amber-100";
      case "Failed":
        return "bg-rose-50 text-rose-700 border-rose-100";
      default:
        return "bg-gray-50 text-gray-700 border-gray-100";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <CheckCircle2 className="w-3.5 h-3.5" />;
      case "Pending":
        return <Clock className="w-3.5 h-3.5" />;
      case "Failed":
        return <AlertCircle className="w-3.5 h-3.5" />;
      default:
        return null;
    }
  };

  return (
    <div className="pt-2 flex flex-col gap-6 animate-in fade-in duration-500">
      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm flex flex-col gap-2">
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-wider arimo-font mt-2">
            Total Volume
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-neutral-900">$45,280</h3>
            <span className="text-emerald-500 text-xs font-medium flex items-center">
              +12%
            </span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm flex flex-col gap-2">
          <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
            <ArrowDownLeft className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-wider arimo-font mt-2">
            Earnings
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-neutral-900">$38,120</h3>
            <span className="text-emerald-500 text-xs font-medium flex items-center">
              +8%
            </span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm flex flex-col gap-2">
          <div className="w-10 h-10 bg-rose-50 rounded-lg flex items-center justify-center">
            <ArrowUpRight className="w-5 h-5 text-rose-600" />
          </div>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-wider arimo-font mt-2">
            Payouts
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-neutral-900">$7,160</h3>
            <span className="text-rose-500 text-xs font-medium flex items-center">
              -2%
            </span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm flex flex-col gap-2">
          <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
            <Clock className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-wider arimo-font mt-2">
            Pending
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-neutral-900">$2,450</h3>
            <span className="text-gray-400 text-xs font-medium italic">
              Wait...
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="w-full bg-white rounded-2xl border border-black/10 shadow-sm p-6 flex flex-col gap-7 min-h-[610px]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full">
          <div className="flex flex-col">
            <h2 className="text-neutral-950 text-xl font-bold arimo-font">
              Transaction History
            </h2>
            <p className="text-gray-500 text-sm font-normal arimo-font">
              Monitor platform income and transaction statuses
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search user or ID..."
                className="w-full h-10 pl-10 pr-4 bg-zinc-50 border border-black/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-greenTeal/20 focus:border-greenTeal transition-all text-sm arimo-font"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-black/10 hover:bg-gray-50 transition-colors shadow-sm text-sm font-medium text-neutral-700">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="p-2.5 bg-white rounded-xl border border-black/10 hover:bg-gray-50 transition-colors shadow-sm text-neutral-950">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="w-full overflow-x-auto rounded-xl border border-black/5">
          <table className="w-full text-sm text-left arimo-font">
            <thead className="bg-zinc-50 border-b border-black/5 text-neutral-500 font-medium">
              <tr>
                <th className="py-4 px-6">Transaction ID</th>
                <th className="py-4 px-6">User</th>
                <th className="py-4 px-6">Purpose</th>
                <th className="py-4 px-6">Amount</th>
                <th className="py-4 px-6">Method</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {filteredTransactions.map((t) => (
                <tr
                  key={t.id}
                  className="hover:bg-zinc-50/50 transition-colors group"
                >
                  <td className="py-4 px-6 font-medium text-blue-600">
                    {t.id}
                  </td>
                  <td className="py-4 px-6 text-neutral-900 font-semibold">
                    {t.user}
                  </td>
                  <td className="py-4 px-6 text-neutral-500">{t.type}</td>
                  <td className="py-4 px-6 font-bold text-neutral-900">
                    {t.amount}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                      <span className="text-neutral-600">{t.method}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-neutral-500">{t.date}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold flex items-center justify-center gap-1.5 w-fit ${getStatusStyle(t.status)}`}
                    >
                      {getStatusIcon(t.status)}
                      {t.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-blue-600 hover:underline font-medium text-xs">
                      View Details
                    </button>
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

export default Payments;

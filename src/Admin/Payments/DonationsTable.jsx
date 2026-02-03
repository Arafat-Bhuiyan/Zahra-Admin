import React, { useState } from "react";
import { Filter } from "lucide-react";

const donationsData = [
  {
    id: 1,
    name: "Emily Johnson",
    email: "emily.j@email.com",
    amount: "$100",
    frequency: "One-Time",
    date: "Jan 15, 2026",
    color: "from-pink-400 to-red-400",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "mchen@email.com",
    amount: "$50",
    frequency: "Monthly",
    date: "Jan 15, 2026",
    color: "from-blue-400 to-cyan-400",
  },
  {
    id: 3,
    name: "Sarah Parker",
    email: "sparker@email.com",
    amount: "$25",
    frequency: "One-Time",
    date: "Jan 14, 2026",
    color: "from-emerald-400 to-green-400",
  },
  {
    id: 4,
    name: "Anonymous",
    email: "anonymous@email.com",
    amount: "$500",
    frequency: "One-Time",
    date: "Jan 14, 2026",
    color: "from-orange-400 to-yellow-400",
  },
  {
    id: 5,
    name: "David Wilson",
    email: "dwilson@email.com",
    amount: "$75",
    frequency: "Monthly",
    date: "Jan 13, 2026",
    color: "from-purple-400 to-indigo-400",
  },
  {
    id: 6,
    name: "Lisa Martinez",
    email: "lmartinez@email.com",
    amount: "$150",
    frequency: "One-Time",
    date: "Jan 13, 2026",
    color: "from-pink-400 to-rose-400",
  },
  {
    id: 7,
    name: "James Anderson",
    email: "janderson@email.com",
    amount: "$30",
    frequency: "Monthly",
    date: "Jan 12, 2026",
    color: "from-blue-500 to-indigo-500",
  },
  {
    id: 8,
    name: "Jessica Taylor",
    email: "jtaylor@email.com",
    amount: "$200",
    frequency: "One-Time",
    date: "Jan 12, 2026",
    color: "from-teal-400 to-emerald-400",
  },
  {
    id: 9,
    name: "Robert Lee",
    email: "rlee@email.com",
    amount: "$45",
    frequency: "One-Time",
    date: "Jan 11, 2026",
    color: "from-gray-400 to-slate-400",
  },
  {
    id: 10,
    name: "Maria Garcia",
    email: "mgarcia@email.com",
    amount: "$60",
    frequency: "Monthly",
    date: "Jan 11, 2026",
    color: "from-purple-400 to-fuchsia-400",
  },
];

const DonationsTable = () => {
  const [filter, setFilter] = useState("Monthly Recurring");
  return (
    <div className="w-full bg-white rounded-2xl overflow-hidden border border-neutral-200">
      {/* Filter Header */}
      <div className="h-16 px-6 bg-neutral-50 border-b border-neutral-200 flex justify-start items-center gap-4">
        <Filter className="w-5 h-5 text-neutral-500" />
        <div className="flex-1 h-9 flex justify-start items-start gap-2">
          {/* Currently only showing one active filter as per design */}
          <button className="h-9 px-4 py-2 bg-white rounded-[10px] outline outline-1 outline-offset-[-1px] outline-neutral-200 flex justify-start items-center">
            <span className="text-neutral-600 text-sm font-normal arimo-font leading-5">
              Monthly Recurring
            </span>
          </button>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <div className="w-full min-w-[1000px]">
          {/* Header */}
          <div className="h-12 bg-gradient-to-r from-pink-50 to-red-50 flex items-center">
            <div className="flex-1 pl-6">
              <span className="text-neutral-700 text-sm font-bold arimo-font leading-5">
                Donor Name
              </span>
            </div>
            <div className="w-72 pl-6">
              <span className="text-neutral-700 text-sm font-bold arimo-font leading-5">
                Email
              </span>
            </div>
            <div className="w-32 pl-6">
              <span className="text-neutral-700 text-sm font-bold arimo-font leading-5">
                Amount
              </span>
            </div>
            <div className="w-44 pl-6">
              <span className="text-neutral-700 text-sm font-bold arimo-font leading-5">
                Frequency
              </span>
            </div>
            <div className="w-44 pl-6">
              <span className="text-neutral-700 text-sm font-bold arimo-font leading-5">
                Date
              </span>
            </div>
          </div>

          {/* List */}
          <div>
            {donationsData.map((item) => (
              <div
                key={item.id}
                className="h-16 border-b border-neutral-200 flex items-center hover:bg-pink-50/20 transition-colors"
              >
                <div className="flex-1 pl-6 flex items-center gap-2">
                  {/* Initials match design's colored circles ? Design just shows generic gradients. I will randomly assign colors or reuse logic if needed. For now I used random colors in data */}
                  <div
                    className={`w-8 h-8 bg-gradient-to-br ${item.color || "from-pink-400 to-red-400"} rounded-full flex justify-center items-center text-white`}
                  >
                    {/* Mock Icon */}
                    <svg
                      width="14"
                      height="12"
                      viewBox="0 0 14 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 2.45455L6.125 1.57955C4.165 0.529545 1.75 1.22955 1.75 3.50455C1.75 5.25455 3.325 6.65455 6.265 9.31455L7 10.0045L7.735 9.31455C10.675 6.65455 12.25 5.25455 12.25 3.50455C12.25 1.22955 9.835 0.529545 7.875 1.57955L7 2.45455Z"
                        stroke="white"
                        strokeWidth="1.33"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="text-neutral-800 text-base font-normal arimo-font leading-6 ml-2">
                    {item.name}
                  </span>
                </div>
                <div className="w-72 pl-6">
                  <span className="text-neutral-600 text-base font-normal arimo-font leading-6">
                    {item.email}
                  </span>
                </div>
                <div className="w-32 pl-6">
                  <span className="text-pink-600 text-lg font-bold arimo-font leading-7">
                    {item.amount}
                  </span>
                </div>
                <div className="w-44 pl-6">
                  {item.frequency === "Monthly" ? (
                    <div className="inline-flex px-3 py-1 bg-purple-100 rounded-full items-center gap-1">
                      <div className="w-3 h-3 relative overflow-hidden">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <path
                            d="M2.5 4H2M2.5 2V3M2.5 6V6.5M5 2H6M6 2H9.5M6 2V4M9.5 2V4M9.5 2H10M2 9.5H10M2.5 4V9H9.5V4M2.5 4H9.5"
                            stroke="#7E22CE"
                            strokeWidth="1"
                          />
                        </svg>
                      </div>
                      <span className="text-purple-700 text-xs font-bold arimo-font leading-4">
                        Monthly
                      </span>
                    </div>
                  ) : (
                    <div className="inline-flex px-3 py-1 bg-blue-100 rounded-full items-center gap-1">
                      <span className="text-blue-700 text-xs font-bold arimo-font leading-4">
                        One-Time
                      </span>
                    </div>
                  )}
                </div>
                <div className="w-44 pl-6">
                  <span className="text-neutral-600 text-base font-normal arimo-font leading-6">
                    {item.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationsTable;

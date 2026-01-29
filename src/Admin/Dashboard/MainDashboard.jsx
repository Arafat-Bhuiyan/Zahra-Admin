import React from "react";
import { Users, Truck, Popsicle } from "lucide-react";
import ChartsSection from "./ChartsSection";

const cards = [
  {
    title: "Total Drivers",
    number: "24,892",
    icon: Truck,
    iconColor: "#FF6363",
  },
  {
    title: "Active Drivers",
    number: "8,342",
    icon: Users,
    iconColor: "#1A9F42",
  },
  {
    title: "Total Customers",
    number: "$142,384",
    icon: Users,
    iconColor: "#FF43F2",
  },
  {
    title: "Live Requests",
    number: "533",
    icon: Popsicle,
    iconColor: "#1B08C0",
  },
];

const MainDashboard = () => {
  return (
    <div className="flex flex-col gap-10 pt-5">
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="bg-[#FAFDFF] border border-[#E1F1FB] p-4 flex items-center justify-between rounded-xl shadow-lg"
            >
              <div className="text-[#2B2B2B] flex flex-col gap-2">
                <h2 className="font-semibold text-sm">{card.title}</h2>
                <p className="font-bold text-xl">{card.number}</p>
              </div>
              <div className="bg-[#EEEEEE] p-3 rounded-lg">
                <Icon className="w-6 h-6" style={{ color: card.iconColor }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional dashboard content can go here */}
      <ChartsSection />
    </div>
  );
};

export default MainDashboard;

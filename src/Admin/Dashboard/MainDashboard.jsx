import { Users, BookOpen, DollarSign } from "lucide-react";
import TopPerformingCourses from "./TopPerformingCourses";
import ScheduleRescheduleSection from "./ScheduleRescheduleSection";

const cards = [
  {
    title: "Total Students",
    number: "2489",
    icon: Users,
    iconColor: "#ffffff",
    bgColor: "#2B7FFF",
  },
  {
    title: "Total Teachers",
    number: "342",
    icon: Users,
    iconColor: "#ffffff",
    bgColor: "#AD46FF",
  },
  {
    title: "Active Courses",
    number: "127",
    icon: BookOpen,
    iconColor: "#ffffff",
    bgColor: "#7AA4A5",
  },
  {
    title: "Total Revenue",
    number: "$142,384",
    icon: DollarSign,
    iconColor: "#ffffff",
    bgColor: "#1B08C0",
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
              <div
                className="w-12 h-12 p-3 rounded-lg"
                style={{
                  backgroundColor: card.bgColor,
                }}
              >
                <Icon
                  className="w-6 h-6"
                  style={{
                    color: card.iconColor,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Top Performing Courses */}
      <TopPerformingCourses />

      {/* Schedule and Reschedule */}
      <ScheduleRescheduleSection />
    </div>
  );
};

export default MainDashboard;

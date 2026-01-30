import React, { useState } from "react";
import profile from "../../../src/assets/images/profile.jpg";
import { Bell, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = ({ title, subtitle }) => {
  const [hasNotification, setHasNotification] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic here (e.g., clearing tokens)
    console.log("Logging out...");
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="flex items-center justify-between px-6 py-7 bg-[#FFFFFF]">
      <div>
        <h1 className="font-bold text-[30px] text-greenTeal">{title}</h1>
        <p className="text-base font-normal text-[#4A5565] mt-1">{subtitle}</p>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setHasNotification(false)}
          className="relative p-2 text-[#4A5565] transition-colors hover:text-neutral-900"
        >
          <Bell size={20} />
          {hasNotification && (
            <span className="absolute top-2 right-2 w-3 h-3 bg-[#FB2C36] rounded-full border-2 border-white" />
          )}
        </button>
        <div className="flex items-center gap-3 border-l-2 border-[#0000001A] pl-4">
          <div className="flex flex-col">
            <h1 className="text-right justify-start text-neutral-950 text-sm font-semibold inter-font">
              Fatima Ara
            </h1>
            <p className="text-right justify-start text-gray-600 text-xs font-normal inter-font">
              Teacher
            </p>
          </div>
          <button className="w-10 h-10 rounded-full overflow-hidden bg-[#F5F3F3] border border-[#093349] font-bold text-base">
            <img src={profile} alt="" />
          </button>
        </div>
        <button
          onClick={handleLogout}
          className="p-2 text-[#4A5565] transition-colors hover:text-red-600"
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>
    </div>
  );
};

export default Header;

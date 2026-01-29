import React from "react";
import profile from "../../../src/assets/images/profile.jpg";
const Header = ({ title, subtitle }) => {
  return (
    <div className="flex items-center justify-between px-6 py-7 bg-[#FBFBFB]">
      <div>
        <h1 className="font-bold text-[30px] text-greenTeal">{title}</h1>
        <p className="text-base font-normal text-[#4A5565] mt-1">{subtitle}</p>
      </div>
      <div className="flex items-center gap-3">
        <div>
          <button className="w-10 h-10 rounded-full overflow-hidden bg-[#F5F3F3] border border-[#093349] font-bold text-base">
            <img src={profile} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;

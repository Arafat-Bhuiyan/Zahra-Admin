import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Users,
  Settings,
  ClipboardCheck,
  Bell,
  LayoutDashboard,
  BookOpen,
  FileText,
  GraduationCap,
  Award,
  UserCheck,
  CreditCard,
  Library,
  ShoppingCart,
  Megaphone,
  Newspaper,
} from "lucide-react";
import logo from "../../assets/img/logo.png";

export const Sidebar = ({ currentComponent, onMenuClick }) => {
  const navigate = useNavigate();

  const role = useSelector((state) => state.auth.role);

  let menuItems = [];

  if (role === "admin") {
    menuItems = [
      {
        icon: LayoutDashboard,
        label: "Dashboard",
        active: true,
        slug: "dashboard",
      },
      { icon: Users, label: "User", slug: "users-management" },
      { icon: BookOpen, label: "Courses", slug: "courses-management" },
      { icon: ClipboardCheck, label: "Submissions", slug: "submissions" },
      { icon: FileText, label: "Content", slug: "contents" },
      { icon: Library, label: "Book Library", slug: "book-library" },
      { icon: ShoppingCart, label: "Book Sales", slug: "book-sales" },
      { icon: Megaphone, label: "Announcements", slug: "announcements" },
      { icon: Newspaper, label: "Newsletter", slug: "newsletter" },
      { icon: GraduationCap, label: "Scholarships", slug: "scholarships" },
      { icon: Award, label: "Certificates", slug: "certificates" },
      { icon: UserCheck, label: "Memberships", slug: "memberships" },
      { icon: CreditCard, label: "Payments", slug: "payments" },
      { icon: Settings, label: "Settings", slug: "settings" },
    ];
  } else if (role === "teacher") {
    // Teacher has a minimal sidebar
    menuItems = [{ icon: UserCheck, label: "Teacher",   active: true, slug: "teacher" }];
  } else {
    // No role set (not logged in) — show nothing or a minimal menu
    menuItems = [];
  }
  const location = useLocation();

  // NavLink will determine active state; build `to` from slug below.
  return (
    <div className="w-full h-[100vh]   shadow-xl flex flex-col justify-between overflow-auto [&::-webkit-scrollbar]:hidden bg-[#D6CBAF33]">
      {/* Logo */}
      <div>
        <div className="w-full">
          <div className="mb-2  p-6 flex flex-col items-center gap-2.5 justify-start">
            <img src={logo} alt="Logo" className="w-20 h-20" />
          </div>
        </div>
        {/* Navigation */}
        <nav className="w-full self-start  ">
          <ul className="w-full ">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              // Build `to` for admin index, teacher route or admin sub-routes
              const to =
                item.slug === "dashboard"
                  ? "/admin"
                  : item.slug === "teacher"
                    ? "/teacher"
                    : `/admin/${item.slug}`;

              return (
                <li key={index}>
                  <NavLink
                    to={to}
                    className={() => {
                      const isActive =
                        location.pathname === to ||
                        location.pathname.startsWith(to + "/");
                      return `flex items-center h-12 pl-6 py-3 text-start text-base font-normal transition-colors mx-4 mb-1 gap-3 ${
                        isActive
                          ? "bg-greenTeal text-[#FFFFFF] rounded-xl shadow-lg backdrop-blur-md "
                          : "text-[#4A5565] rounded-sm"
                      }`;
                    }}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-semibold text-base">
                      {item.label}
                    </span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

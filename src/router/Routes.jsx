import MainDashboard from "@/Admin/Dashboard/MainDashboard";
import AdminLayout from "@/layouts/AdminLayout";
import { createBrowserRouter, Navigate } from "react-router-dom";
import TermsAndPolicies from "@/Admin/Settings/Settings";
import Login from "../components/Login";
import TeacherDashboard from "../Teacher/TeacherDashboard";
import PublicProfile from "../Teacher/PublicProfile";
import MyCourses from "../Teacher/MyCourses";
import Submissions from "../Teacher/Submissions";
import Consultations from "../Teacher/Consultations";
import LiveSessions from "../Teacher/LiveSessions";
import ContentUpload from "../Teacher/ContentUpload";
import EarningsRevenue from "../Teacher/EarningsRevenue";
import TeacherSettings from "../Teacher/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/admin" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    errorElement: <h2>Route not found</h2>,
    children: [
      {
        index: true,
        element: <MainDashboard />,
      },
      { path: "users-management", element: <>Users</> },
      { path: "courses-management", element: <>Courses</> },
      { path: "submissions", element: <>Submissions</> },
      { path: "settings", element: <TermsAndPolicies /> },
      { path: "contents", element: <>Contents</> },
      { path: "contents/:id", element: <>Content Details</> },
      { path: "book-library", element: <>Book Library</> },
      { path: "book-library/:id", element: <>Book Library Details</> },
      { path: "book-sales", element: <>Book Sales</> },
      { path: "book-sales/:id", element: <>Book Sales Details</> },
      { path: "announcements", element: <>Announcements</> },
      { path: "newsletter", element: <>Newsletter</> },
      { path: "scholarships", element: <>Scholarships</> },
      { path: "certificates", element: <>Certificates</> },
      { path: "memberships", element: <>Memberships</> },
      { path: "payments", element: <>Payments</> },

      // future admin sub-routes can be added here, e.g.:
      // { path: "users", element: <UserManagement /> },
    ],
  },
  {
    path: "/teacher",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <TeacherDashboard />,
      },
      { path: "public-profile", element: <PublicProfile /> },
      { path: "my-courses", element: <MyCourses /> },
      { path: "submissions", element: <Submissions /> },
      { path: "consultations", element: <Consultations /> },
      { path: "live-sessions", element: <LiveSessions /> },
      { path: "content-upload", element: <ContentUpload /> },
      { path: "earnings-revenue", element: <EarningsRevenue /> },
      { path: "settings", element: <TeacherSettings /> },
    ],
  },
]);

export default router;

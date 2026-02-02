import Login from "@/Admin/Auth/Login";
import MainDashboard from "@/Admin/Dashboard/MainDashboard";
import AdminLayout from "@/layouts/AdminLayout";
import { createBrowserRouter, Navigate } from "react-router-dom";
import TermsAndPolicies from "@/Admin/Settings/Settings";
import User from "../Admin/User/User";
import Scholarships from "../Admin/Scholarships/Scholarships";
import Payments from "../Admin/Payments/Payments";
import Certificates from "../Admin/Certificates/Certificates";
import Memberships from "../Admin/Memberships/Memberships";
import Courses from "../Admin/Courses/Courses";
import Contents from "../Admin/Contents/Contents";
import ContentDetails from "../Admin/Contents/ContentDetails";
import BookLibrary from "../Admin/BookLibrary/BookLibrary";
import BookSales from "../Admin/BookSales/BookSales";
import Submission from "../Admin/Submission/Submission";
import Announcement from "../Admin/Announesement/Announcement";

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
      { path: "users-management", element: <User /> },
      { path: "courses-management", element: <Courses /> },
      { path: "submissions", element: <Submission /> },
      { path: "settings", element: <TermsAndPolicies /> },
      { path: "contents", element: <Contents /> },
      { path: "contents/:id", element: <ContentDetails /> },
      { path: "book-library", element: <BookLibrary /> },
      { path: "book-library/:id", element: <>Book Library Details</> },
      { path: "book-sales", element: <BookSales /> },
      { path: "book-sales/:id", element: <>Book Sales Details</> },
      { path: "announcements", element: <Announcement /> },
      { path: "newsletter", element: <>Newsletter</> },
      { path: "scholarships", element: <Scholarships /> },
      { path: "certificates", element: <Certificates /> },
      { path: "memberships", element: <Memberships /> },
      { path: "payments", element: <Payments /> },
    ],
  },
]);

export default router;

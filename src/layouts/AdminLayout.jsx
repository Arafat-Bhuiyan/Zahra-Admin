import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "@/Admin/Dashboard/Sidebar";
import Header from "@/Admin/Dashboard/Header";

export default function AdminLayout() {
  // State for currently selected menu in the sidebar
  console.log("first");

  const location = useLocation();

  const title = location.pathname.startsWith(`/admin/users-management`)
    ? "Users Management"
    : location.pathname.startsWith(`/admin/courses-management`)
    ? "My Courses"
    : location.pathname.startsWith(`/admin/submissions`)
    ? "Submissions Management"
    : location.pathname.startsWith(`/admin/contents`)
    ? "Contents Library"
    : location.pathname.startsWith(`/admin/book-library`)
    ? "Book Library Management"
    : location.pathname.startsWith(`/admin/book-sales`)
    ? "Book Sales Management"
    : location.pathname.startsWith(`/admin/announcements`)
    ? "Announcements"
    : location.pathname.startsWith(`/admin/newsletter`)
    ? "Email & Newsletter Management"
    : location.pathname.startsWith(`/admin/scholarships`)
    ? "Scholarship Applications"
    : location.pathname.startsWith(`/admin/certificates`)
    ? "Certificate Management"
    : location.pathname.startsWith(`/admin/memberships`)
    ? "Membership & Bundles"
    : location.pathname.startsWith(`/admin/payments`)
    ? "Payments & Revenue"
    : location.pathname.startsWith(`/admin/settings`)
    ? "Settings"
    : "Dashboard Overview";

  const subtitle = location.pathname.startsWith(`/admin/users-management`)
    ? "Manage students, teachers, and system users"
    : location.pathname.startsWith(`/admin/courses-management`)
    ? "Create and manage your course offerings"
    : location.pathname.startsWith(`/admin/submissions`)
    ? "View and grade student quiz and assignment submissions"
    : location.pathname.startsWith(`/admin/contents`)
    ? "Browse and manage all uploaded content"
    : location.pathname.startsWith(`/admin/book-library`)
    ? "Upload and manage digital books for students and teachers"
    : location.pathname.startsWith(`/admin/book-sales`)
    ? "Track all book purchases, customer details, and shipping information"
    : location.pathname.startsWith(`/admin/announcements`)
    ? "Create and manage course & platform announcements"
    : location.pathname.startsWith(`/admin/newsletter`)
    ? "Manage email templates, newsletters, and subscribers"
    : location.pathname.startsWith(`/admin/scholarships`)
    ? "Review student applications and set custom discount percentages"
    : location.pathname.startsWith(`/admin/certificates`)
    ? "Generate and manage student certificates for completed courses"
    : location.pathname.startsWith(`/admin/memberships`)
    ? "Manage subscription plans and course bundles"
    : location.pathname.startsWith(`/admin/payments`)
    ? "Track payments and platform earnings"
    : location.pathname.startsWith(`/admin/settings`)
    ? "Manage admin account and system configuration"
    : "Welcome back! Here's what's happening today.";
  return (
    <div
      style={{ fontFamily: "Montserrat" }}
      className="flex font-poppins "
    >
      {/* Sidebar */}
      <div className="w-72 fixed top-0 left-0 h-screen">
        <Sidebar />
      </div>

      {/* Main Content area (pages render into the Outlet) */}
      <div className="flex-1 ml-72 min-h-screen overflow-y-auto">
        <Header title={title} subtitle={subtitle}/>
        <div className="px-6 bg-[#FFFEFB] min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

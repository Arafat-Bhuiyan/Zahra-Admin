import React, { useState } from "react";
import {
  Search,
  Filter,
  ShoppingBag,
  DollarSign,
  Download,
  Package,
  Calendar,
  MapPin,
  ClipboardList,
  ChevronDown,
} from "lucide-react";

const BookSales = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All Types");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const stats = [
    {
      label: "Total Orders",
      value: "7",
      icon: ShoppingBag,
      color: "bg-teal-600",
      textColor: "text-teal-600",
    },
    {
      label: "Total Revenue",
      value: "$792.00",
      icon: DollarSign,
      color: "bg-green-600",
      textColor: "text-green-600",
    },
    {
      label: "Digital Sales",
      value: "2",
      icon: Download,
      color: "bg-blue-600",
      textColor: "text-blue-600",
    },
    {
      label: "Physical Sales",
      value: "5",
      icon: Package,
      color: "bg-purple-600",
      textColor: "text-purple-600",
    },
  ];

  const salesData = [
    {
      id: "ORD-2024-002",
      trackId: "TRK9876543210",
      student: {
        name: "Michael Chen",
        email: "michael.c@email.com",
        phone: "+1 (555) 234-5678",
      },
      book: {
        title: "Islamic Psychology Guide",
        author: "Dr. Sarah Ahmed",
        image: "https://placehold.co/133x200",
      },
      type: "Physical",
      quantity: 1,
      amount: 99.0,
      address: {
        line1: "456 Oak Avenue, Suite 200",
        city: "Los Angeles, CA 90001",
        country: "United States",
      },
      payment: "Paid",
      status: "Delivered",
      date: "Feb 16, 2024",
      time: "2:45 PM",
    },
    {
      id: "ORD-2024-004",
      student: {
        name: "Sarah Parker",
        email: "sarah.p@email.com",
        phone: "+1 (555) 345-6789",
      },
      book: {
        title: "Peace Movements in Islam",
        author: "Dr. Sarah Ahmed",
        image: "https://placehold.co/133x200",
      },
      type: "Digital",
      quantity: 1,
      amount: 99.0,
      address: {
        line1: "N/A - Digital Purchase",
        city: "Chicago, IL 60601",
        country: "United States",
      },
      payment: "Paid",
      status: "Pending",
      date: "Jan 30, 2024",
      time: "3:15 PM",
    },
    {
      id: "ORD-2024-003",
      student: {
        name: "Sarah Parker",
        email: "sarah.p@email.com",
        phone: "+1 (555) 345-6789",
      },
      book: {
        title: "Healing the Anxious Heart",
        author: "Dr. Sarah Ahmed",
        image: "https://placehold.co/133x200",
      },
      type: "Digital",
      quantity: 1,
      amount: 99.0,
      address: {
        line1: "N/A - Digital Purchase",
        city: "Chicago, IL 60601",
        country: "United States",
      },
      payment: "Paid",
      status: "Delivered",
      date: "Jan 16, 2024",
      time: "11:20 AM",
    },
    {
      id: "ORD-2024-001",
      trackId: "TRK1234567890",
      student: {
        name: "Emma Wilson",
        email: "emma.w@email.com",
        phone: "+1 (555) 123-4567",
      },
      book: {
        title: "Islamic Psychology Guide",
        author: "Dr. Sarah Ahmed",
        image: "https://placehold.co/133x200",
      },
      type: "Both",
      quantity: 1,
      amount: 99.0,
      address: {
        line1: "123 Maple Street, Apt 4B",
        city: "New York, NY 10001",
        country: "United States",
      },
      payment: "Paid",
      status: "Delivered",
      date: "Jan 15, 2024",
      time: "10:30 AM",
    },
    {
      id: "ORD-2024-007",
      trackId: "TRK1111222333",
      student: {
        name: "Emma Wilson",
        email: "emma.w@email.com",
        phone: "+1 (555) 123-4567",
      },
      book: {
        title: "Islamic Psychology Guide",
        author: "Dr. Sarah Ahmed",
        image: "https://placehold.co/133x200",
      },
      type: "Both",
      quantity: 1,
      amount: 99.0,
      address: {
        line1: "123 Maple Street, Apt 4B",
        city: "New York, NY 10001",
        country: "United States",
      },
      payment: "Paid",
      status: "Pending",
      date: "Dec 25, 2023",
      time: "4:00 PM",
    },
    {
      id: "ORD-2024-005",
      trackId: "TRK5555666777",
      student: {
        name: "Sarah Parker",
        email: "sarah.p@email.com",
        phone: "+1 (555) 345-6789",
      },
      book: {
        title: "Islamic Psychology Guide",
        author: "Dr. Sarah Ahmed",
        image: "https://placehold.co/133x200",
      },
      type: "Both",
      quantity: 2,
      amount: 198.0,
      address: {
        line1: "789 Pine Road",
        city: "Chicago, IL 60601",
        country: "United States",
      },
      payment: "Paid",
      status: "Delivered",
      date: "Oct 10, 2023",
      time: "9:00 AM",
    },
    {
      id: "ORD-2024-006",
      trackId: "TRK8888999000",
      student: {
        name: "David Kim",
        email: "david.k@email.com",
        phone: "+1 (555) 456-7890",
      },
      book: {
        title: "Islamic Psychology Guide",
        author: "Dr. Sarah Ahmed",
        image: "https://placehold.co/133x200",
      },
      type: "Both",
      quantity: 1,
      amount: 99.0,
      address: {
        line1: "321 Elm Street",
        city: "Houston, TX 77001",
        country: "United States",
      },
      payment: "Paid",
      status: "Pending",
      date: "Aug 15, 2023",
      time: "1:30 PM",
    },
  ];

  const getTypeStyle = (type) => {
    switch (type) {
      case "Physical":
        return "bg-purple-50 text-purple-700 outline-purple-300";
      case "Digital":
        return "bg-blue-50 text-blue-700 outline-blue-300";
      case "Both":
        return "bg-teal-50 text-teal-700 outline-teal-300";
      default:
        return "bg-gray-50 text-gray-700 outline-gray-300";
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const filteredData = salesData.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.book.title.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filterType === "All Types" || order.type === filterType;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="pt-2 flex flex-col gap-8 animate-in fade-in duration-500 pb-10 arimo-font">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl border border-black/10 flex justify-between items-center shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col gap-1">
              <span className="text-gray-500 text-sm">{stat.label}</span>
              <span className={`text-2xl font-bold ${stat.textColor}`}>
                {stat.value}
              </span>
            </div>
            <div className={`${stat.color} p-3 rounded-xl`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </div>
        ))}
      </div>

      {/* Filter & Search Section */}
      <div className="bg-white p-4 rounded-2xl border border-black/10 flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by student name, book title, or order ID..."
            className="w-full pl-10 pr-4 py-2 bg-zinc-100 rounded-lg outline-none text-sm border border-transparent focus:border-teal-500/30 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-60">
            <div
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className="flex items-center justify-between px-3 py-2 bg-zinc-100 rounded-lg border border-transparent hover:border-black/5 transition-all text-sm cursor-pointer select-none"
            >
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <span className="text-neutral-950 font-medium">
                  {filterType}
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-gray-500 opacity-50 transition-transform duration-200 ${showFilterDropdown ? "rotate-180" : ""}`}
              />
            </div>

            {showFilterDropdown && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowFilterDropdown(false)}
                ></div>
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-black/10 rounded-xl shadow-xl z-20 py-1 overflow-hidden animate-in fade-in zoom-in duration-200">
                  {["All Types", "Physical", "Digital", "Both"].map((type) => (
                    <div
                      key={type}
                      onClick={() => {
                        setFilterType(type);
                        setShowFilterDropdown(false);
                      }}
                      className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                        filterType === type
                          ? "bg-teal-50 text-teal-700 font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {type}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Table Section */}
      <div className="bg-white rounded-2xl border border-black/10 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-black/10">
          <div className="flex items-center gap-3 mb-1">
            <ClipboardList className="w-5 h-5 text-teal-600" />
            <h2 className="text-neutral-950 text-base font-semibold">
              All Book Sales & Orders
            </h2>
          </div>
          <p className="text-gray-500 text-sm">
            Complete list of all book purchases with customer and delivery
            information
          </p>
        </div>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left min-w-[1200px]">
            <thead className="bg-[#F8FAFC] border-b border-black/10">
              <tr>
                <th className="px-6 py-5 text-base font-bold text-neutral-950">
                  Order ID
                </th>
                <th className="px-6 py-5 text-base font-bold text-neutral-950">
                  Student
                </th>
                <th className="px-6 py-5 text-base font-bold text-neutral-950">
                  Book
                </th>
                <th className="px-6 py-5 text-base font-bold text-neutral-950">
                  Type
                </th>
                <th className="px-6 py-5 text-base font-bold text-neutral-950">
                  Quantity
                </th>
                <th className="px-6 py-5 text-base font-bold text-neutral-950">
                  Amount
                </th>
                <th className="px-6 py-5 text-base font-bold text-neutral-950">
                  Shipping Address
                </th>
                <th className="px-6 py-5 text-base font-bold text-neutral-950 text-center">
                  Payment
                </th>
                <th className="px-6 py-5 text-base font-bold text-neutral-950 text-center">
                  Status
                </th>
                <th className="px-6 py-5 text-base font-bold text-neutral-950">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10 text-sm">
              {filteredData.length > 0 ? (
                filteredData.map((order, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50/50 transition-colors border-l-2 border-transparent hover:border-teal-500"
                  >
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-teal-600 font-bold text-sm">
                          {order.id}
                        </span>
                        {order.trackId && (
                          <span className="text-gray-500 text-sm">
                            Track: {order.trackId}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-neutral-950 font-bold text-base">
                          {order.student.name}
                        </span>
                        <span className="text-gray-500 text-sm">
                          {order.student.email}
                        </span>
                        <span className="text-gray-500 text-sm">
                          {order.student.phone}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <img
                          src={order.book.image}
                          alt={order.book.title}
                          className="w-12 h-16 rounded-lg object-cover shadow-sm"
                        />
                        <div className="flex flex-col">
                          <span className="text-neutral-950 font-bold text-base line-clamp-1 w-48">
                            {order.book.title}
                          </span>
                          <span className="text-gray-500 text-sm">
                            {order.book.author}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`px-3 py-1 rounded-xl outline outline-1 outline-offset-[-1px] text-sm font-bold ${getTypeStyle(order.type)}`}
                      >
                        {order.type}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-neutral-950 font-medium text-lg">
                      &times;{order.quantity}
                    </td>
                    <td className="px-6 py-5 text-green-600 font-black text-xl arimo-font">
                      ${order.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-5 max-w-[250px]">
                      <div className="flex flex-col text-sm gap-0.5">
                        <span className="text-neutral-950 font-medium truncate">
                          {order.address.line1}
                        </span>
                        <span className="text-gray-600 truncate">
                          {order.address.city}
                        </span>
                        <span className="text-gray-500 font-medium">
                          {order.address.country}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-xl font-bold uppercase tracking-wide">
                        {order.payment}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span
                        className={`text-[11px] px-3 py-1 rounded-xl font-black inter-font uppercase tracking-widest ${getStatusStyle(order.status)}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col items-start gap-1">
                        <div className="flex items-center gap-2 text-neutral-950 font-bold">
                          <Calendar className="w-4 h-4 text-teal-500" />
                          <span>{order.date}</span>
                        </div>
                        <span className="text-gray-500 text-sm font-medium ml-6">
                          {order.time}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="10"
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No orders found matching your search and filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookSales;

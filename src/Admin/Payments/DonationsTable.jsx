import React, { useState } from "react";
import { Calendar } from "lucide-react";
import { useGetDonationsQuery } from "../../Api/adminApi";
import Pagination from "../../components/Pagination";

const DonationsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: donationsPageData,
    isLoading,
    isError,
  } = useGetDonationsQuery({
    page: currentPage,
  });

  const donations = donationsPageData?.results || [];
  const totalPages = donationsPageData?.total_pages || 1;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-emerald-100 text-emerald-700";
      case "pending":
        return "bg-amber-100 text-amber-700";
      case "failed":
        return "bg-rose-100 text-rose-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "✓";
      case "pending":
        return "⏱";
      case "failed":
        return "✕";
      default:
        return "•";
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl overflow-hidden border border-neutral-200">
      {/* Table Content */}
      <div className="w-full">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
          </div>
        ) : isError ? (
          <div className="flex justify-center items-center py-20">
            <span className="text-sm text-neutral-500">
              Failed to load donations
            </span>
          </div>
        ) : donations.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <span className="text-sm text-neutral-500">No donations found</span>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px] border-collapse">
                <thead>
                  <tr className="h-12 bg-gradient-to-r from-pink-50 to-red-50 text-left">
                    <th className="pl-6 text-neutral-700 text-sm font-bold arimo-font leading-5 w-[25%]">
                      Donor Name
                    </th>
                    <th className="pl-6 text-neutral-700 text-sm font-bold arimo-font leading-5 w-[25%]">
                      Email
                    </th>
                    <th className="pl-6 text-neutral-700 text-sm font-bold arimo-font leading-5 w-[15%]">
                      Amount
                    </th>
                    <th className="pl-6 text-neutral-700 text-sm font-bold arimo-font leading-5 w-[15%]">
                      Status
                    </th>
                    <th className="pl-6 text-neutral-700 text-sm font-bold arimo-font leading-5 w-[20%]">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map((item) => (
                    <tr
                      key={item.id}
                      className="h-16 border-b border-neutral-200 hover:bg-pink-50/20 transition-colors"
                    >
                      <td className="pl-6">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full flex justify-center items-center text-white bg-gradient-to-br from-pink-400 to-red-400">
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
                            {item.first_name} {item.last_name}
                          </span>
                        </div>
                      </td>
                      <td className="pl-6">
                        <span className="text-neutral-600 text-base font-normal arimo-font leading-6">
                          {item.email}
                        </span>
                      </td>
                      <td className="pl-6">
                        <span className="text-pink-600 text-lg font-bold arimo-font leading-7">
                          ${parseFloat(item.amount).toFixed(2)}
                        </span>
                      </td>
                      <td className="pl-6">
                        <div
                          className={`inline-flex px-3 py-1 rounded-full items-center gap-1 text-xs font-semibold capitalize ${getStatusColor(
                            item.status,
                          )}`}
                        >
                          <span>{getStatusIcon(item.status)}</span>
                          {item.status}
                        </div>
                      </td>
                      <td className="pl-6">
                        <div className="flex items-center gap-2 text-neutral-600 text-base font-normal arimo-font leading-6">
                          <Calendar className="w-4 h-4 text-neutral-400" />
                          {formatDate(item.created_at)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="px-6 py-4 border-t border-neutral-200 flex justify-end">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DonationsTable;

import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import {
  useGetNewsletterSubscribersQuery,
  useDeleteNewsletterSubscriberMutation,
} from "../../Api/adminApi";
import toast from "react-hot-toast";
import Pagination from "../../components/Pagination";

const SubscribersList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: subscribersPageData,
    isLoading,
    isError,
  } = useGetNewsletterSubscribersQuery({
    page: currentPage,
  });

  const [deleteSubscriber] = useDeleteNewsletterSubscriberMutation();

  const subscribers = subscribersPageData?.results || [];
  const totalPages = subscribersPageData?.total_pages || 1;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleRemoveSubscriber = async (id) => {
    toast(
      (t) => (
        <div className="flex items-center gap-4 p-1">
          <div className="flex-1">
            <p className="text-sm font-bold text-neutral-800 inter-font">
              Confirm Delete
            </p>
            <p className="text-xs text-neutral-500 mt-0.5">
              Are you sure you want to remove this subscriber?
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                try {
                  await deleteSubscriber(id).unwrap();
                  toast.dismiss(t.id);
                  toast.success("Subscriber removed successfully", {
                    icon: "🗑️",
                    style: {
                      borderRadius: "12px",
                      background: "#333",
                      color: "#fff",
                    },
                  });
                } catch (error) {
                  toast.dismiss(t.id);
                  toast.error("Failed to remove subscriber");
                }
              }}
              className="px-3 py-1.5 text-xs font-medium bg-red-500 text-white hover:bg-red-600 rounded-lg transition-colors shadow-sm"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        duration: 5000,
        position: "top-center",
        style: {
          minWidth: "350px",
          borderRadius: "16px",
          border: "1px solid rgba(0,0,0,0.05)",
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        },
      },
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl">
        <div className="flex gap-4 items-center">
          <span className="text-sm font-bold text-neutral-500">
            {subscribersPageData?.count || 0} Total Subscribers
          </span>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
        </div>
      ) : isError ? (
        <div className="flex justify-center items-center py-20">
          <span className="text-sm text-neutral-500">
            Failed to load subscribers
          </span>
        </div>
      ) : subscribers.length === 0 ? (
        <div className="flex justify-center items-center py-20">
          <span className="text-sm text-neutral-500">No subscribers found</span>
        </div>
      ) : (
        <>
          <div className="border border-neutral-200 rounded-2xl overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-neutral-50">
                <tr className="text-neutral-500 text-sm font-bold border-b border-neutral-200">
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Subscribed At</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {subscribers.map((subscriber) => (
                  <tr
                    key={subscriber.id}
                    className="hover:bg-neutral-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-bold text-neutral-800">
                      {subscriber.email}
                    </td>
                    <td className="px-6 py-4 text-neutral-500 text-sm">
                      {formatDate(subscriber.subscribed_at)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          subscriber.is_active
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {subscriber.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleRemoveSubscriber(subscriber.id)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-end">
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
  );
};

export default SubscribersList;

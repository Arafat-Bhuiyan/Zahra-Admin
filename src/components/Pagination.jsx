import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * A reusable premium pagination component.
 * 
 * @param {Object} props
 * @param {number} props.currentPage - The current active page
 * @param {number} props.totalPages - Total number of pages
 * @param {function} props.onPageChange - Callback when a page is clicked
 */
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show pages around current
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-between px-2 py-4">
      <div className="flex items-center gap-2">
        <p className="text-sm text-gray-500 arimo-font">
          Page <span className="font-medium text-neutral-900">{currentPage}</span> of{" "}
          <span className="font-medium text-neutral-900">{totalPages}</span>
        </p>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border border-black/10 text-neutral-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1 mx-2">
          {getPageNumbers().map((page, index) => (
            <React.Fragment key={index}>
              {page === "..." ? (
                <span className="px-3 py-1.5 text-gray-400">...</span>
              ) : (
                <button
                  onClick={() => onPageChange(page)}
                  className={`min-w-[36px] h-9 flex items-center justify-center rounded-lg text-sm arimo-font transition-all ${
                    currentPage === page
                      ? "bg-[#89A6A7] text-white font-medium shadow-sm"
                      : "text-neutral-600 hover:bg-gray-50 border border-transparent hover:border-black/5"
                  }`}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg border border-black/10 text-neutral-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;

import React from "react";
import {
  X,
  Download,
  Eye,
  User,
  Calendar,
  Tag,
  BookOpen,
  Globe,
  FileText,
} from "lucide-react";

const BookDetailsModal = ({ book, onClose }) => {
  if (!book) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-[550px] max-h-[90vh] bg-white rounded-2xl shadow-2xl relative overflow-y-auto arimo-font">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-neutral-950 text-xl font-bold">Book Details</h2>
            <p className="text-gray-500 text-sm font-normal mt-1">
              Complete information about the selected book
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Side: Image & Primary Actions */}
            <div className="w-full md:w-40 flex flex-col gap-4">
              <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-lg border border-black/5">
                <img
                  src={book.image}
                  className="w-full h-full object-cover"
                  alt={book.title}
                />
              </div>
              <div className="space-y-2">
                <button className="w-full h-10 bg-teal-600 hover:bg-teal-700 text-white rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors">
                  <Download className="w-4 h-4" />
                  Download Book
                </button>
                <button className="w-full h-10 bg-white border border-black/10 hover:bg-gray-50 text-neutral-950 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors">
                  <Eye className="w-4 h-4" />
                  Preview
                </button>
              </div>
            </div>

            {/* Right Side: Information */}
            <div className="flex-1 space-y-6">
              {/* Title & Author */}
              <div className="space-y-3">
                <span className="px-2 py-0.5 bg-teal-50 text-teal-700 text-xs font-medium rounded-md border border-teal-100">
                  {book.category}
                </span>
                <h3 className="text-neutral-950 text-2xl font-bold leading-tight">
                  {book.title}
                </h3>
                <div className="flex items-center gap-2 text-gray-600">
                  <User className="w-4 h-4" />
                  <span className="text-base font-normal">{book.author}</span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {book.description}
                </p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-y-6 border-t border-black/5 pt-6">
                <div>
                  <p className="text-gray-500 text-xs font-normal mb-1">
                    Price
                  </p>
                  <p className="text-teal-600 text-xl font-bold">
                    ${book.price}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-normal mb-1">
                    Book Type
                  </p>
                  <span className="px-2 py-0.5 bg-teal-50 text-teal-700 text-xs font-bold rounded-lg border border-teal-300">
                    {book.type}
                  </span>
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-normal mb-1">ISBN</p>
                  <p className="text-neutral-950 text-sm font-medium">
                    978-1-234567-89-0
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-normal mb-1">
                    Publisher
                  </p>
                  <p className="text-neutral-950 text-sm font-medium">
                    Islamic Knowledge Press
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-normal mb-1">
                    Publication Date
                  </p>
                  <div className="flex items-center gap-1.5 text-neutral-950 text-sm font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    5/15/2023
                  </div>
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-normal mb-1">
                    Pages
                  </p>
                  <p className="text-neutral-950 text-sm font-medium">342</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-normal mb-1">
                    Language
                  </p>
                  <p className="text-neutral-950 text-sm font-medium">
                    English
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-normal mb-1">
                    Format
                  </p>
                  <p className="text-neutral-950 text-sm font-medium">
                    PDF • 12.5 MB
                  </p>
                </div>
              </div>

              {/* Tags Area */}
              <div className="border-t border-black/5 pt-6">
                <p className="text-gray-500 text-xs font-normal mb-3">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {["Psychology", "Mental Health", "Islamic Studies"].map(
                    (tag) => (
                      <div
                        key={tag}
                        className="px-2 py-0.5 bg-white border border-teal-300 rounded-lg text-teal-700 text-xs font-medium flex items-center gap-1.5"
                      >
                        <Tag className="w-3 h-3 text-teal-600" />
                        {tag}
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* Bottom Stats Grid */}
              <div className="flex gap-4 pt-6 border-t border-black/5">
                <div className="flex-1 bg-gray-50 rounded-xl p-4 flex flex-col items-center justify-center gap-1">
                  <Download className="w-5 h-5 text-teal-600" />
                  <p className="text-teal-600 text-2xl font-bold leading-none mt-1">
                    {book.downloads}
                  </p>
                  <p className="text-gray-500 text-[10px] font-normal uppercase tracking-wider">
                    Downloads
                  </p>
                </div>
                <div className="flex-1 bg-gray-50 rounded-xl p-4 flex flex-col items-center justify-center gap-1">
                  <Calendar className="w-5 h-5 text-green-600" />
                  <p className="text-green-600 text-sm font-bold leading-none mt-1">
                    {book.date}
                  </p>
                  <p className="text-gray-500 text-[10px] font-normal uppercase tracking-wider">
                    Upload Date
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsModal;

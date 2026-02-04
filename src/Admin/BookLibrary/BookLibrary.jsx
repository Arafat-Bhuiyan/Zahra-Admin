import React, { useState } from "react";
import {
  Search,
  BookOpen,
  Download,
  Eye,
  Layers,
  ChevronDown,
  Plus,
  Calendar,
  FileText,
  Edit3,
  Trash2,
  Filter,
} from "lucide-react";
import BookDetailsModal from "./BookDetailsModal";
import EditBookModal from "./EditBookModal";
import UploadBookModal from "./UploadBookModal";
import toast from "react-hot-toast";
import { X } from "lucide-react";

const BookLibrary = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [editingBook, setEditingBook] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const [booksList, setBooksList] = useState([
    {
      id: 1,
      title: "Healing the Anxious Heart",
      author: "Dr. Sarah Ahmed",
      description:
        "A comprehensive guide to understanding Islamic psychology and its application in modern mental health practices.",
      downloads: "1243",
      date: "01/10/26",
      price: "99",
      category: "Psychology",
      type: "Both",
      status: "Active",
      image:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=2787&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "The Modern Muslimah",
      author: "Ayesha Khan",
      description:
        "Navigating identity, career, and spirituality in the 21st century with practical Islamic wisdom.",
      downloads: "2850",
      date: "12/09/25",
      price: "85",
      category: "Lifestyle",
      type: "Digital",
      status: "Active",
      image:
        "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2824&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Mindful Parenting",
      author: "Zaynab Ali",
      description:
        "Islamic perspectives on raising resilient and spiritually aware children in a digital age.",
      downloads: "1920",
      date: "15/11/25",
      price: "70",
      category: "Parenting",
      type: "Both",
      status: "Active",
      image:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=2800&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "Islamic History Revisited",
      author: "Prof. Omar Farooq",
      description:
        "Deep dive into the untold stories of Islamic civilizations and their global impact.",
      downloads: "3410",
      date: "20/08/25",
      price: "120",
      category: "History",
      type: "Physical",
      status: "Active",
      image:
        "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=2787&auto=format&fit=crop",
    },
    {
      id: 5,
      title: "Path to Serenity",
      author: "Imam Yusuf",
      description:
        "Practical steps to achieving inner peace through prayer, reflection, and gratitude.",
      downloads: "4560",
      date: "05/01/26",
      price: "60",
      category: "Spirituality",
      type: "Both",
      status: "Active",
      image:
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2899&auto=format&fit=crop",
    },
    {
      id: 6,
      title: "The Silent Wisdom",
      author: "Mariam Rahman",
      description:
        "Exploring the power of silence and meditation in Islamic mystical traditions.",
      downloads: "1150",
      date: "30/12/25",
      price: "110",
      category: "Philosophy",
      type: "Digital",
      status: "Active",
      image:
        "https://images.unsplash.com/photo-1491843331657-f050bc730ff9?q=80&w=2940&auto=format&fit=crop",
    },
  ]);

  const handleUpdateBook = (updatedBook) => {
    setBooksList((prev) =>
      prev.map((b) => (b.id === updatedBook.id ? updatedBook : b)),
    );
    setEditingBook(null);
  };

  const handleAddBook = (newBook) => {
    setBooksList((prev) => [newBook, ...prev]);
    setShowUploadModal(false);
  };

  const handleRemoveBook = (id) => {
    toast(
      (t) => (
        <div className="flex items-center gap-4 p-1">
          <div className="flex-1">
            <p className="text-sm font-bold text-neutral-800 inter-font">
              Confirm Delete
            </p>
            <p className="text-xs text-neutral-500 mt-0.5">
              Are you sure you want to remove this book?
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
              onClick={() => {
                setBooksList((prev) => prev.filter((book) => book.id !== id));
                toast.dismiss(t.id);
                toast.success("Book removed successfully", {
                  icon: "🗑️",
                  style: {
                    borderRadius: "12px",
                    background: "#333",
                    color: "#fff",
                  },
                });
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

  const stats = [
    { label: "Total Books", value: "6", icon: BookOpen, color: "bg-teal-600" },
    {
      label: "Total Downloads",
      value: "7,475",
      icon: Download,
      color: "bg-blue-600",
    },
    { label: "Total Views", value: "18,595", icon: Eye, color: "bg-green-600" },
    { label: "Categories", value: "8", icon: Layers, color: "bg-purple-600" },
  ];

  return (
    <div className="pt-2 flex flex-col gap-8 animate-in fade-in duration-500 pb-10 arimo-font">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-end items-start md:items-center gap-4">
        <button
          onClick={() => setShowUploadModal(true)}
          className="bg-[#7AA4A5] hover:opacity-90 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-all shadow-sm flex items-center gap-2 inter-font"
        >
          <Plus className="w-4 h-4" />
          Create New Book
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-black/10 flex items-center justify-between shadow-sm"
            >
              <div className="space-y-1">
                <p className="text-gray-500 text-sm font-normal">
                  {stat.label}
                </p>
                <p className="text-neutral-950 text-2xl font-bold leading-8">
                  {stat.value}
                </p>
              </div>
              <div
                className={`${stat.color} w-12 h-12 rounded-[10px] flex items-center justify-center`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-black/10 flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title, author, or description..."
            className="w-full h-11 pl-11 pr-4 bg-zinc-100 border-none rounded-lg focus:ring-2 focus:ring-[#7AA4A5]/20 text-sm text-neutral-900 placeholder:text-gray-500 transition-all font-normal"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative min-w-[200px] flex-1 md:flex-none">
            <select className="w-full h-11 pl-4 pr-10 bg-zinc-100 border-none rounded-lg appearance-none text-sm text-neutral-950 focus:ring-2 focus:ring-[#7AA4A5]/20 font-normal">
              <option>All Categories</option>
              <option>Psychology</option>
              <option>Lifestyle</option>
              <option>History</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          <button className="p-3 bg-zinc-100 rounded-lg text-gray-500 hover:bg-zinc-200 transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Books Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {booksList.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-2xl border border-black/10 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group"
          >
            {/* Image Container */}
            <div className="relative h-64 w-full bg-gray-100 overflow-hidden">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-3 right-3 px-3 py-1 bg-teal-600 rounded-lg text-white text-xs font-normal">
                {book.category}
              </div>
            </div>

            {/* Content Container */}
            <div className="p-5 flex-1 flex flex-col gap-3">
              <div className="space-y-1">
                <h3 className="text-neutral-950 text-lg font-bold leading-7 line-clamp-1">
                  {book.title}
                </h3>
                <p className="text-gray-600 text-sm font-normal">
                  {book.author}
                </p>
              </div>

              <p className="text-gray-500 text-sm font-normal leading-5 line-clamp-3">
                {book.description}
              </p>

              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                    <Download className="w-3.5 h-3.5" />
                    {book.downloads}
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                    <Calendar className="w-3.5 h-3.5" />
                    {book.date}
                  </div>
                </div>
                <div className="text-teal-600 text-lg font-bold leading-7">
                  ${book.price}
                </div>
              </div>

              <div className="w-fit px-2 py-0.5 bg-teal-50 rounded-lg border border-teal-300 text-teal-700 text-xs font-bold">
                {book.type}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-black/5">
                <button
                  onClick={() => setSelectedBook(book)}
                  className="flex-1 h-9 bg-[#7AA4A5] hover:bg-[#6b9192] text-white rounded-lg flex items-center justify-center gap-2 text-sm font-normal transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  View
                </button>
                <button
                  onClick={() => setEditingBook(book)}
                  className="w-9 h-9 border border-black/10 rounded-lg flex items-center justify-center text-neutral-950 hover:bg-gray-50 transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleRemoveBook(book.id)}
                  className="w-9 h-9 border border-black/10 rounded-lg flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Book Details Modal */}
      {selectedBook && (
        <BookDetailsModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}

      {/* Edit Book Modal */}
      {editingBook && (
        <EditBookModal
          book={editingBook}
          onClose={() => setEditingBook(null)}
          onSave={handleUpdateBook}
        />
      )}

      {/* Upload Book Modal */}
      {showUploadModal && (
        <UploadBookModal
          onClose={() => setShowUploadModal(false)}
          onSave={handleAddBook}
        />
      )}
    </div>
  );
};

export default BookLibrary;

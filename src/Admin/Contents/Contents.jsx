import React, { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  FileText,
  Image,
  Video,
  Eye,
  Edit,
  Trash2,
  Globe,
  Lock,
} from "lucide-react";

const Contents = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [contents, setContents] = useState([
    {
      id: 1,
      title: "The Role of Spirituality in Modern Mental Health",
      category: "Article",
      author: "Dr. Abdullah",
      date: "2024-03-22",
      status: "Published",
      views: "1.2k",
    },
    {
      id: 2,
      title: "Understanding Islamic Ethics: A Short Guide",
      category: "E-book",
      author: "Prof. Sarah",
      date: "2024-03-15",
      status: "Published",
      views: "850",
    },
    {
      id: 3,
      title: "Foundations of Arabic Calligraphy",
      category: "Video",
      author: "Master Hassan",
      date: "2024-03-10",
      status: "Draft",
      views: "0",
    },
    {
      id: 4,
      title: "The History of Ottoman Architecture",
      category: "Long Form",
      author: "Dr. Zeyneb",
      date: "2024-02-28",
      status: "Published",
      views: "2.4k",
    },
  ]);

  const getStatusStyle = (status) => {
    return status === "Published"
      ? "bg-emerald-50 text-emerald-600 border-emerald-100"
      : "bg-amber-50 text-amber-600 border-amber-100";
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Video":
        return <Video className="w-4 h-4" />;
      case "Image":
        return <Image className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="pt-2 flex flex-col gap-6 animate-in fade-in duration-500 pb-10">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-neutral-900 text-3xl font-bold arimo-font tracking-tight">
            Content Library
          </h1>
          <p className="text-gray-500 text-base font-normal arimo-font">
            Manage your articles, videos, and media assets
          </p>
        </div>
        <button className="bg-greenTeal hover:opacity-90 text-white px-6 py-2.5 rounded-xl text-sm font-semibold arimo-font transition-all shadow-md flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Create New Content
        </button>
      </div>

      <div className="w-full bg-white rounded-2xl border border-black/10 shadow-sm p-6 flex flex-col gap-7 min-h-[610px]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full">
          <div className="flex items-center gap-4 bg-zinc-100 p-1 rounded-xl">
            <button className="px-4 py-1.5 rounded-lg bg-white shadow-sm text-sm font-bold text-neutral-900">
              All Content
            </button>
            <button className="px-4 py-1.5 rounded-lg text-sm font-medium text-neutral-500 hover:text-neutral-900">
              Articles
            </button>
            <button className="px-4 py-1.5 rounded-lg text-sm font-medium text-neutral-500 hover:text-neutral-900">
              Media
            </button>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search contents..."
                className="w-full h-10 pl-10 pr-4 bg-zinc-50 border border-black/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-greenTeal/20 focus:border-greenTeal transition-all text-sm arimo-font"
              />
            </div>
            <button className="p-2.5 bg-white rounded-xl border border-black/10 hover:bg-gray-50 transition-colors shadow-sm text-neutral-950">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="w-full overflow-x-auto rounded-xl border border-black/5">
          <table className="w-full text-sm text-left arimo-font font-medium">
            <thead className="bg-zinc-50 border-b border-black/5 text-neutral-500">
              <tr>
                <th className="py-4 px-6">Title</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Author</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6 text-center">Views</th>
                <th className="py-4 px-6 text-center">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {contents.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-zinc-50/50 transition-colors"
                >
                  <td className="py-4 px-6 max-w-[300px]">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-neutral-950 font-bold line-clamp-1">
                        {item.title}
                      </span>
                      <span className="text-xs text-neutral-400">
                        ID: CNT-{item.id}024
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-neutral-600">
                      {getCategoryIcon(item.category)}
                      <span>{item.category}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-neutral-600 font-bold italic">
                    {item.author}
                  </td>
                  <td className="py-4 px-6 text-neutral-500">{item.date}</td>
                  <td className="py-4 px-6 text-center font-bold text-blue-600">
                    {item.views}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex justify-center">
                      <span
                        className={`px-2.5 py-1 rounded-lg border text-[10px] uppercase font-bold flex items-center gap-1.5 ${getStatusStyle(item.status)}`}
                      >
                        {item.status === "Published" ? (
                          <Globe className="w-3 h-3" />
                        ) : (
                          <Lock className="w-3 h-3" />
                        )}
                        {item.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-2 text-neutral-400">
                      <button className="p-1 hover:text-blue-600">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 hover:text-green-600">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 hover:text-rose-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Contents;

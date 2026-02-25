import React, { useState } from "react";
import { Search, Filter, Plus } from "lucide-react";
import DoorsTable from "./DoorsTable";
import DoorDetailsModal from "./DoorDetailsModal";
import AddDoorModal from "./AddDoorModal";
import toast from "react-hot-toast";

const Doors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDoor, setSelectedDoor] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [doors, setDoors] = useState([
    {
      id: 1,
      title: "Advanced React Mastery",
      description:
        "Master React Hooks, Context API, and Performance Optimization.",
      icon: "https://cdn-icons-png.flaticon.com/512/1126/1126012.png",
      courseLink: "https://example.com/react-mastery",
    },
    {
      id: 2,
      title: "Fullstack Web Development",
      description:
        "Comprehensive guide to MERN stack with real-world projects.",
      icon: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png",
      courseLink: "https://example.com/fullstack",
    },
    {
      id: 3,
      title: "UI/UX Design Fundamentals",
      description:
        "Learn the principles of design and how to create stunning interfaces.",
      icon: "https://cdn-icons-png.flaticon.com/512/1312/1312489.png",
      courseLink: "https://example.com/ui-ux",
    },
  ]);

  const filteredDoors = doors.filter(
    (door) =>
      door.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      door.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleAddDoor = () => {
    setSelectedDoor(null);
    setIsAddModalOpen(true);
  };

  const handleEditDoor = (door) => {
    setSelectedDoor(door);
    setIsAddModalOpen(true);
  };

  const handleSaveDoor = (doorData) => {
    if (selectedDoor) {
      // Edit existing door
      setDoors((prev) =>
        prev.map((d) => (d.id === selectedDoor.id ? doorData : d)),
      );
      toast.success(`${doorData.title} updated successfully!`);
    } else {
      // Add new door
      setDoors((prev) => [doorData, ...prev]);
      toast.success(`${doorData.title} added successfully!`);
    }
  };

  const confirmDelete = (doorId, title) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3 p-1">
          <p className="arimo-font text-sm text-neutral-800">
            Are you sure you want to delete <b>{title}</b>?
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 text-xs text-neutral-500 hover:text-neutral-700 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setDoors(doors.filter((d) => d.id !== doorId));
                toast.dismiss(t.id);
                toast.success("Door removed successfully");
              }}
              className="px-3 py-1 text-xs bg-rose-600 text-white rounded-md hover:bg-rose-700 font-medium transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        duration: 5000,
        position: "top-center",
        className:
          "border border-black/10 rounded-xl shadow-lg bg-white p-4 min-w-[300px]",
      },
    );
  };

  return (
    <div className="pt-2 flex flex-col gap-6 animate-in fade-in duration-500">
      {/* Action Header */}
      <div className="flex justify-end w-full">
        <button
          onClick={handleAddDoor}
          className="bg-[#89A6A7] hover:bg-[#729394] text-white px-6 py-2 rounded-lg text-sm font-medium arimo-font transition-colors shadow-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Door
        </button>
      </div>

      {/* Main Content Card */}
      <div className="w-full bg-white rounded-2xl border border-black/10 shadow-sm p-6 flex flex-col gap-7 min-h-[610px]">
        {/* Card Header */}
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col">
            <h2 className="text-neutral-950 text-base font-normal arimo-font leading-4">
              All Doors
            </h2>
            <p className="text-gray-500 text-base font-normal arimo-font leading-6">
              View and manage all course doors
            </p>
          </div>

          {/* <div className="flex items-center gap-3">
            <div className="relative w-[256px]">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search doors..."
                className="w-full h-9 pl-10 pr-3 py-1 bg-zinc-100 rounded-lg border-transparent focus:outline-none text-sm arimo-font text-gray-700 placeholder:text-gray-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="w-9 h-9 flex items-center justify-center bg-white rounded-lg border border-black/10 hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4 text-neutral-950" />
            </button>
          </div> */}
        </div>

        {/* Table Content */}
        <DoorsTable
          data={filteredDoors}
          onEdit={handleEditDoor}
          onDelete={confirmDelete}
        />

        {filteredDoors.length === 0 && (
          <div className="py-20 text-center text-gray-500 arimo-font w-full">
            No doors found matching your search.
          </div>
        )}
      </div>

      <AddDoorModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setSelectedDoor(null);
        }}
        onSave={handleSaveDoor}
        door={selectedDoor}
      />
    </div>
  );
};

export default Doors;

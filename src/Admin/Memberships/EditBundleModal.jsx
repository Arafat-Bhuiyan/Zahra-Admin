import React, { useState, useEffect } from "react";
import { X, Package, Check, Save } from "lucide-react";

// In a real app, this would likely come from an API or shared context
const availableCourses = [
  {
    id: 1,
    title: "Advanced React Patterns",
    category: "Web Development",
    price: 299,
  },
  {
    id: 2,
    title: "Data Science Fundamentals",
    category: "Data Science",
    price: 299,
  },
  {
    id: 3,
    title: "UI/UX Design Masterclass",
    category: "Design",
    price: 299,
  },
  { id: 4, title: "JavaScript ES6+", category: "Web Development", price: 299 },
  { id: 5, title: "Python for Beginners", category: "Programming", price: 299 },
  {
    id: 6,
    title: "Node.js Backend Development",
    category: "Web Development",
    price: 299,
  },
  {
    id: 7,
    title: "Machine Learning Basics",
    category: "Data Science",
    price: 299,
  },
  { id: 8, title: "Figma Design Course", category: "Design", price: 299 },
  { id: 9, title: "CSS Masterclass", category: "Web Development", price: 299 },
  { id: 10, title: "MongoDB Database", category: "Database", price: 299 },
];

const EditBundleModal = ({ isOpen, onClose, bundle, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    selectedCourses: [],
  });

  // Initialize form with bundle data when modal opens
  useEffect(() => {
    if (isOpen && bundle) {
      setFormData({
        title: bundle.title,
        description: bundle.description,
        price: bundle.price,
        selectedCourses: bundle.courses
          .map((c) => {
            // In a real app we might match by ID. Here we match by Title since the bundle's courses
            // might not have the original availableCourse ID attached in this mock data structure if it was just static data.
            // However, for consistency with CreateBundleModal logic which uses IDs, let's try to map back to IDs if possible,
            // or fallback to using titles/categories to find the matching availableCourse.
            // For simplicity, we'll try to find the matching course in availableCourses by title.
            const found = availableCourses.find((ac) => ac.title === c.title);
            return found ? found.id : null;
          })
          .filter((id) => id !== null),
      });
    }
  }, [isOpen, bundle]);

  if (!isOpen) return null;

  const handleToggleCourse = (courseId) => {
    setFormData((prev) => {
      const isSelected = prev.selectedCourses.includes(courseId);
      if (isSelected) {
        return {
          ...prev,
          selectedCourses: prev.selectedCourses.filter((id) => id !== courseId),
        };
      } else {
        return {
          ...prev,
          selectedCourses: [...prev.selectedCourses, courseId],
        };
      }
    });
  };

  const calculateOriginalValue = () => {
    return formData.selectedCourses.reduce((total, id) => {
      const course = availableCourses.find((c) => c.id === id);
      return total + (course ? course.price : 0);
    }, 0);
  };

  const handleSubmit = () => {
    if (
      !formData.title ||
      !formData.price ||
      formData.selectedCourses.length === 0
    ) {
      return;
    }

    // Get full course objects
    const courses = formData.selectedCourses.map((id) =>
      availableCourses.find((c) => c.id === id),
    );
    const originalPrice = calculateOriginalValue();
    const discount =
      originalPrice > 0
        ? Math.round(
            ((originalPrice - parseFloat(formData.price)) / originalPrice) *
              100,
          )
        : 0;

    const updatedBundle = {
      ...bundle,
      title: formData.title,
      description: formData.description,
      price: parseFloat(formData.price),
      originalPrice,
      discount: discount > 0 ? discount : 0,
      courses: courses,
    };

    onUpdate(updatedBundle);
    onClose();
  };

  const isFormValid =
    formData.title && formData.price && formData.selectedCourses.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[881px] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-6 bg-gradient-to-b from-[#7AA4A5] to-[#6A9495] border-b border-neutral-200 flex justify-between items-start shrink-0">
          <div className="flex flex-col gap-1 text-white">
            <h2 className="text-2xl font-bold arimo-font leading-8">
              Edit Bundle
            </h2>
            <p className="text-white/90 text-base font-normal arimo-font">
              Update courses and pricing for this bundle
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-[10px] hover:bg-white/20 transition-colors text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex flex-col gap-6">
          {/* Bundle Name */}
          <div className="flex flex-col gap-2">
            <label className="text-neutral-700 text-sm font-normal arimo-font">
              Bundle Name
            </label>
            <input
              type="text"
              placeholder="e.g., Web Development Mastery Bundle"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="px-4 py-2 rounded-[10px] border border-neutral-300 text-neutral-950 text-base font-normal arimo-font focus:outline-none focus:border-greenTeal placeholder:text-neutral-950/50"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="text-neutral-700 text-sm font-normal arimo-font">
              Description
            </label>
            <textarea
              placeholder="Brief description of the bundle"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={2}
              className="px-4 py-2 rounded-[10px] border border-neutral-300 text-neutral-950 text-base font-normal arimo-font focus:outline-none focus:border-greenTeal resize-none placeholder:text-neutral-950/50"
            />
          </div>

          {/* Price */}
          <div className="flex flex-col gap-2">
            <label className="text-neutral-700 text-sm font-normal arimo-font">
              Bundle Price ($)
            </label>
            <input
              type="number"
              placeholder="0"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="px-4 py-2 rounded-[10px] border border-neutral-300 text-neutral-950 text-base font-normal arimo-font focus:outline-none focus:border-greenTeal placeholder:text-neutral-950/50"
            />
          </div>

          {/* Select Courses */}
          <div className="flex flex-col gap-3">
            <label className="text-neutral-700 text-sm font-normal arimo-font">
              Select Courses ({formData.selectedCourses.length} selected)
            </label>
            <div className="w-full h-80 px-4 py-4 rounded-[10px] border border-neutral-300 bg-white overflow-y-auto space-y-2">
              {availableCourses.map((course) => {
                const isSelected = formData.selectedCourses.includes(course.id);
                return (
                  <div
                    key={course.id}
                    onClick={() => handleToggleCourse(course.id)}
                    className={`flex items-center p-3 rounded-[10px] border-2 cursor-pointer transition-all ${
                      isSelected
                        ? "bg-neutral-50 border-neutral-300"
                        : "bg-white border-transparent hover:bg-neutral-50"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded border mr-4 flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-greenTeal border-greenTeal"
                          : "border-neutral-300 bg-white"
                      }`}
                    >
                      {isSelected && <Check size={14} className="text-white" />}
                    </div>
                    <div className="flex-1 flex justify-between items-center">
                      <div className="flex flex-col">
                        <span className="text-neutral-800 text-base font-normal arimo-font">
                          {course.title}
                        </span>
                        <span className="text-neutral-500 text-sm font-normal arimo-font">
                          {course.category}
                        </span>
                      </div>
                      <span className="text-slate-400 text-sm font-bold arimo-font">
                        ${course.price}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bundle Preview */}
          <div className="p-4 bg-stone-300/20 rounded-[10px] border border-stone-300 flex flex-col gap-3">
            <h3 className="text-neutral-800 text-sm font-bold arimo-font">
              Bundle Preview
            </h3>
            <div className="flex flex-col gap-2 text-sm text-neutral-700 arimo-font">
              <div className="flex justify-between items-center">
                <span>Name:</span>
                <span>{formData.title || "Not set"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Courses:</span>
                <span>{formData.selectedCourses.length} courses</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Bundle Price:</span>
                <span>${formData.price || "0"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Original Value:</span>
                <span>${calculateOriginalValue()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200 flex justify-end items-center gap-3 shrink-0">
          <button
            onClick={onClose}
            className="w-24 h-10 rounded-[10px] border border-neutral-300 text-neutral-700 text-base font-normal arimo-font hover:bg-neutral-100 transition-colors"
          >
            Cancel
          </button>
          <button
            disabled={!isFormValid}
            onClick={handleSubmit}
            className={`w-44 h-10 rounded-[10px] text-white text-base font-normal arimo-font flex items-center justify-center gap-2 transition-colors ${
              isFormValid
                ? "bg-greenTeal hover:bg-opacity-80 shadow-md"
                : "bg-greenTeal opacity-50 cursor-not-allowed"
            }`}
          >
            <Save size={18} />
            Update Bundle
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBundleModal;

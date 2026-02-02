"use client";
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import profile from "../assets/img/profile_teacher.png";
import { Award, Badge, GraduationCap, Tag } from "lucide-react";
export default function EditProfile() {
  const [formData, setFormData] = useState({
    name: "Dr. Fatima Rahman",
    title: "Clinical Psychologist & Islamic Scholar",
    email: "dr.fatima@example.com",
    location: "London, UK",
    // preview URL for the profile picture (defaults to bundled image)
    profileUrl: profile,
    // raw File object for upload if needed
    profileFile: null,
    about: `Dr. Fatima Rahman is a dedicated clinical psychologist specializing in mental health support for Muslim communities. Her work combines evidence-based psychological practices with Islamic values, creating a unique and effective approach to mental wellness.`,
    specialties: [
      "Clinical Psychology",
      "Islamic Studies",
      "Mental Health Counseling",
    ],
    education: [
      {
        degree: "PhD in Clinical Psychology",
        university: "University of Cambridge",
      },
      { degree: "MA in Islamic Studies", university: "Al-Azhar University" },
      { degree: "BA in Psychology", university: "University of London" },
    ],
    achievements: [
      "Published numerous research in Islamic Psychology",
      "Speaker at International Islamic Psychology Conferences",
      "Consultant for Muslim Mental Health Initiatives",
    ],
  });

  // file input ref and handlers for upload & preview
  const fileInputRef = useRef(null);

  useEffect(() => {
    // cleanup preview URL when component unmounts or when a new file is chosen
    return () => {
      if (formData.profileUrl && formData.profileUrl.startsWith("blob:")) {
        URL.revokeObjectURL(formData.profileUrl);
      }
    };
  }, [formData.profileUrl]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file (JPG/PNG/etc.)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Maximum file size is 5MB");
      return;
    }

    // revoke previous blob URL if set
    setFormData((prev) => {
      if (prev.profileUrl && prev.profileUrl.startsWith("blob:")) {
        URL.revokeObjectURL(prev.profileUrl);
      }
      const url = URL.createObjectURL(file);
      return { ...prev, profileUrl: url, profileFile: file };
    });
  };

  const [newSpecialty, setNewSpecialty] = useState("");
  const [newEducation, setNewEducation] = useState({
    degree: "",
    university: "",
  });
  const [newAchievement, setNewAchievement] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addSpecialty = () => {
    if (newSpecialty.trim()) {
      setFormData((prev) => ({
        ...prev,
        specialties: [...prev.specialties, newSpecialty],
      }));
      setNewSpecialty("");
    }
  };

  const removeSpecialty = (index) => {
    setFormData((prev) => ({
      ...prev,
      specialties: prev.specialties.filter((_, i) => i !== index),
    }));
  };

  const addEducation = () => {
    if (newEducation.degree.trim() && newEducation.university.trim()) {
      setFormData((prev) => ({
        ...prev,
        education: [...prev.education, newEducation],
      }));
      setNewEducation({ degree: "", university: "" });
    }
  };

  const removeEducation = (index) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const addAchievement = () => {
    if (newAchievement.trim()) {
      setFormData((prev) => ({
        ...prev,
        achievements: [...prev.achievements, newAchievement],
      }));
      setNewAchievement("");
    }
  };

  const removeAchievement = (index) => {
    setFormData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Basic Info */}
        <section className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Profile Header
          </h2>
          <div className="max-w-4xl mx-auto mb-6">
            <div className="flex items-center gap-6">
              <img
                src={formData.profileUrl}
                alt="Profile"
                className="w-28 rounded-full object-cover"
              />
              <div>
                <button
                  type="button"
                  onClick={handleUploadClick}
                  className="inline-block px-3 py-1.5 bg-primary text-white rounded mb-2 focus:outline-none"
                >
                  Upload Profile Photo
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <h1 className="text-sm text-gray-800">
                  Professional photo recommended (JPG, PNG - Max. 5MB)
                </h1>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title / Role
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Public Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              About & Professional Approach
            </label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleInputChange}
              rows="5"
              placeholder="Introduce yourself, your experience, and expertise..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </section>

        {/* Specialties */}
        <section className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
          <h2 className="text-lg font-bold flex items-center gap-2 text-primary mb-4">
            <Tag /> Specialties & Tags
          </h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {formData.specialties.map((spec, index) => (
              <div
                key={index}
                className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-medium flex items-center gap-2"
              >
                {spec}
                <button
                  onClick={() => removeSpecialty(index)}
                  className="text-teal-700 hover:text-red-600 font-bold"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newSpecialty}
              onChange={(e) => setNewSpecialty(e.target.value)}
              placeholder="Add a specific tag..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              onKeyPress={(e) => e.key === "Enter" && addSpecialty()}
            />
            <button
              onClick={addSpecialty}
              className="px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-all"
            >
              Add
            </button>
          </div>
        </section>

        {/* Education */}
        <section className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
          <h2 className="text-lg font-medium text-primary mb-4">Education</h2>
          <div className="space-y-3 mb-4">
            {formData.education.map((edu, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-gray-100 p-2 rounded-xl">
                    <GraduationCap className="text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">{edu.degree}</p>
                    <p className="text-sm font-medium text-gray-600">
                      {edu.university}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeEducation(index)}
                  className="text-red-600 font-medium"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Add Education
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
              <input
                type="text"
                value={newEducation.degree}
                onChange={(e) =>
                  setNewEducation({ ...newEducation, degree: e.target.value })
                }
                placeholder="Degree / Ph.D, etc."
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <input
                type="text"
                value={newEducation.university}
                onChange={(e) =>
                  setNewEducation({
                    ...newEducation,
                    university: e.target.value,
                  })
                }
                placeholder="University name"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={addEducation}
              className="w-full px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-all font-medium"
            >
              Add Education
            </button>
          </div>
        </section>

        {/* Achievements */}
        <section className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Achievements & Credentials
          </h2>
          <div className="space-y-2 mb-4">
            {formData.achievements.map((achievement, index) => (
              <div
                key={index}
                className="flex justify-between items-start p-3 bg-green-50 rounded-lg"
              >
                <div className="flex items-center gap-3 flex-1">
                  <Award className="text-primary" size={18} />
                  <p className="text-gray-800">{achievement}</p>
                </div>
                <button
                  onClick={() => removeAchievement(index)}
                  className="text-red-600 hover:text-red-800 font-bold ml-2"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newAchievement}
                onChange={(e) => setNewAchievement(e.target.value)}
                placeholder="Add an achievement..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                onKeyPress={(e) => e.key === "Enter" && addAchievement()}
              />
              <button
                onClick={addAchievement}
                className="px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-all"
              >
                Add
              </button>
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <Link to={"/teacher/public-profile"}>
            <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all font-medium">
              Preview Profile
            </button>
          </Link>
          <button className="px-6 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-all font-medium">
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
}

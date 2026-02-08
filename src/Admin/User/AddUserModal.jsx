import React, { useState, useEffect } from "react";
import {
  X,
  User,
  Mail,
  Briefcase,
  ShieldCheck,
  Lock,
  MapPin,
  Plus,
  Trash2,
  GraduationCap,
  Award,
  DollarSign,
  Upload,
  Globe,
  CheckCircle2,
  History,
} from "lucide-react";

const AddUserModal = ({ isOpen, onClose, type, onAdd }) => {
  // --- Student Specific State ---
  const [studentData, setStudentData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // --- Teacher Specific State ---
  const [teacherData, setTeacherData] = useState({
    name: "",
    professionalTitle: "",
    email: "",
    location: "",
    about: "",
    approach: "",
    specialties: [
      "Anxiety Psychology",
      "Family Management",
      "Boundaries",
      "CBT",
      "Trauma Informed Care",
    ],
    education: [
      {
        degree: "PhD in Clinical Psychology",
        institution: "University of Cambridge",
      },
      { degree: "MA in Islamic Studies", institution: "Al Azhar University" },
      { degree: "BA in Psychology", institution: "University of London" },
    ],
    achievements: [
      "Published researcher in Islamic Psychology",
      "Speaker at International Islamic Psychology Conference",
      "Consultant for Muslim Mental Health Initiative",
      "Certified Mindfulness Instructor",
    ],
    courseRate: "75",
    consultationRate: "100",
    profileImage: null,
  });

  const fileInputRef = React.useRef(null);

  // Helper states for adding new items
  const [newSpecialty, setNewSpecialty] = useState("");
  const [newEdu, setNewEdu] = useState({ degree: "", institution: "" });
  const [newAchievement, setNewAchievement] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTeacherData({ ...teacherData, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    // Reset states when type changes
    if (type === "students") {
      setStudentData({ name: "", email: "", password: "" });
    }
  }, [type, isOpen]);

  if (!isOpen) return null;

  // --- Form Handlers ---
  const handleStudentSubmit = (e) => {
    e.preventDefault();
    onAdd({
      ...studentData,
      role: "student",
      id: Date.now(),
      courses: 0,
      joined: new Date().toISOString().split("T")[0],
    });
    onClose();
  };

  const handleTeacherSubmit = (e) => {
    e.preventDefault();
    onAdd({
      ...teacherData,
      role: "teacher",
      id: Date.now(),
      courses: teacherData.education.length, // mock
      students: 0,
      joined: new Date().toISOString().split("T")[0],
    });
    onClose();
  };

  // --- Teacher UI Components ---
  const SpecialtyTag = ({ text, onRemove }) => (
    <div className="h-6 px-3 bg-[#89A6A7] rounded-lg flex items-center gap-2 group">
      <span className="text-white text-xs font-medium arimo-font">{text}</span>
      <button
        type="button"
        onClick={onRemove}
        className="text-white hover:text-white/70"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );

  if (type === "students") {
    // Simple Student Modal (keeping existing working logic but updating aesthetic)
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="w-full max-w-[500px] bg-white rounded-2xl shadow-2xl border border-black/5 overflow-hidden animate-in zoom-in-95 duration-200">
          <div className="px-6 py-5 border-b border-black/5 flex justify-between items-center bg-gray-50/50">
            <h2 className="text-neutral-900 text-xl font-bold arimo-font">
              Add New Student
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors text-greenTeal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <form
            onSubmit={handleStudentSubmit}
            className="p-6 flex flex-col gap-5"
          >
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-neutral-700 ml-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="e.g. Abdullah Rahman"
                  className="w-full h-11 pl-10 pr-4 bg-gray-50 border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89A6A7]/20 focus:border-[#89A6A7] transition-all text-sm"
                  value={studentData.name}
                  onChange={(e) =>
                    setStudentData({ ...studentData, name: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-neutral-700 ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  placeholder="e.g. abdullah@example.com"
                  className="w-full h-11 pl-10 pr-4 bg-gray-50 border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89A6A7]/20 focus:border-[#89A6A7] transition-all text-sm"
                  value={studentData.email}
                  onChange={(e) =>
                    setStudentData({ ...studentData, email: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-neutral-700 ml-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  placeholder="Enter password"
                  className="w-full h-11 pl-10 pr-4 bg-gray-50 border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89A6A7]/20 focus:border-[#89A6A7] transition-all text-sm"
                  value={studentData.password}
                  onChange={(e) =>
                    setStudentData({ ...studentData, password: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 h-11 border border-black/10 rounded-xl text-sm font-medium text-neutral-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-[2] h-11 bg-[#89A6A7] text-white rounded-xl text-sm font-medium shadow-md"
              >
                Create Student
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // --- TEACHER INTERFACE (COMPLEX) ---
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="w-full max-w-[1168px] h-[90vh] bg-white rounded-xl shadow-2xl overflow-y-auto no-scrollbar border border-black/10 relative">
        {/* Banner/Header */}
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md px-8 py-6 border-b border-black/5 flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <h1 className="text-[#89A6A7] text-3xl font-bold inter-font leading-9">
              Teacher Profile
            </h1>
            <p className="text-gray-600 text-base font-normal inter-font leading-6">
              Manage what students see on your profile
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors group"
          >
            <X className="w-6 h-6 text-greenTeal group-hover:text-black" />
          </button>
        </div>

        <form
          onSubmit={handleTeacherSubmit}
          className="p-8 flex flex-col gap-6 max-w-[1120px] mx-auto"
        >
          {/* Section 1: Profile Header */}
          <div className="w-full bg-white rounded-2xl border border-black/10 p-8 flex flex-col gap-6 shadow-sm">
            <h3 className="text-greenTeal text-base font-medium inter-font">
              Profile Header
            </h3>

            <div className="flex flex-col gap-8">
              {/* Photo Upload area */}
              <div className="flex items-center gap-8">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/png, image/jpeg, image/jpg"
                  className="hidden"
                />
                <div className="w-32 h-32 bg-[#89A6A7] rounded-full flex items-center justify-center text-white text-3xl font-normal inter-font overflow-hidden border-2 border-[#89A6A7]/20">
                  {teacherData.profileImage ? (
                    <img
                      src={teacherData.profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    "FR"
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="w-[176px] h-9 bg-[#89A6A7] rounded-lg text-white text-sm font-medium inter-font hover:bg-[#729394] transition-colors"
                  >
                    Upload Profile Photo
                  </button>
                  <p className="text-gray-500 text-xs font-normal inter-font">
                    Professional photo recommended (JPG, PNG - Max. 5MB)
                  </p>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-neutral-950 text-sm font-medium inter-font">
                    Full Name / Title
                  </label>
                  <input
                    type="text"
                    className="w-full h-11 px-4 bg-zinc-100 rounded-lg border-transparent focus:outline-none focus:ring-1 focus:ring-[#89A6A7] text-sm"
                    placeholder="Dr. Fatima Rahman"
                    value={teacherData.name}
                    onChange={(e) =>
                      setTeacherData({ ...teacherData, name: e.target.value })
                    }
                    required
                  />
                </div>
                {/* Prof Title */}
                <div className="flex flex-col gap-2">
                  <label className="text-neutral-950 text-sm font-medium inter-font">
                    Professional Title
                  </label>
                  <input
                    type="text"
                    className="w-full h-11 px-4 bg-zinc-100 rounded-lg border-transparent text-sm"
                    placeholder="Clinical Psychologist & Islamic Scholar"
                    value={teacherData.professionalTitle}
                    onChange={(e) =>
                      setTeacherData({
                        ...teacherData,
                        professionalTitle: e.target.value,
                      })
                    }
                  />
                </div>
                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="text-neutral-950 text-sm font-medium inter-font">
                    Public Email
                  </label>
                  <input
                    type="email"
                    className="w-full h-11 px-4 bg-zinc-100 rounded-lg border-transparent text-sm"
                    placeholder="Learner@Sakeena.edu"
                    value={teacherData.email}
                    onChange={(e) =>
                      setTeacherData({ ...teacherData, email: e.target.value })
                    }
                    required
                  />
                </div>
                {/* Location */}
                <div className="flex flex-col gap-2">
                  <label className="text-neutral-950 text-sm font-medium inter-font">
                    Location
                  </label>
                  <input
                    type="text"
                    className="w-full h-11 px-4 bg-zinc-100 rounded-lg border-transparent text-sm"
                    placeholder="London, UK"
                    value={teacherData.location}
                    onChange={(e) =>
                      setTeacherData({
                        ...teacherData,
                        location: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: About & Professional Approach */}
          <div className="w-full bg-white rounded-2xl border border-black/10 p-8 flex flex-col gap-6 shadow-sm">
            <h3 className="text-greenTeal text-base font-medium inter-font">
              About & Professional Approach
            </h3>

            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-neutral-950 text-sm font-medium inter-font">
                  About Me
                </label>
                <textarea
                  className="w-full min-h-[120px] p-4 bg-zinc-100 rounded-lg border-transparent text-sm focus:outline-none focus:ring-1 focus:ring-[#89A6A7]"
                  placeholder="Introduce yourself, your experience, and expertise..."
                  value={teacherData.about}
                  onChange={(e) =>
                    setTeacherData({ ...teacherData, about: e.target.value })
                  }
                ></textarea>
                <p className="text-gray-500 text-xs font-normal inter-font">
                  {teacherData.about.length} characters
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-neutral-950 text-sm font-medium inter-font">
                  Professional Approach
                </label>
                <textarea
                  className="w-full min-h-[100px] p-4 bg-zinc-100 rounded-lg border-transparent text-sm focus:outline-none focus:ring-1 focus:ring-[#89A6A7]"
                  placeholder="Describe your teaching methodology and approach..."
                  value={teacherData.approach}
                  onChange={(e) =>
                    setTeacherData({ ...teacherData, approach: e.target.value })
                  }
                ></textarea>
              </div>
            </div>
          </div>

          {/* Section 3: Specialties & Tags */}
          <div className="w-full bg-white rounded-2xl border border-black/10 p-8 flex flex-col gap-6 shadow-sm">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#89A6A7]" />
              <h3 className="text-greenTeal text-base font-medium inter-font">
                Specialties & Tags
              </h3>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                {teacherData.specialties.map((s, i) => (
                  <SpecialtyTag
                    key={i}
                    text={s}
                    onRemove={() =>
                      setTeacherData({
                        ...teacherData,
                        specialties: teacherData.specialties.filter(
                          (_, idx) => idx !== i,
                        ),
                      })
                    }
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 h-9 px-4 bg-zinc-100 rounded-lg border-transparent text-sm"
                  placeholder="Add a specialty tag (e.g., Anxiety Psychology)"
                  value={newSpecialty}
                  onChange={(e) => setNewSpecialty(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (newSpecialty) {
                        setTeacherData({
                          ...teacherData,
                          specialties: [
                            ...teacherData.specialties,
                            newSpecialty,
                          ],
                        });
                        setNewSpecialty("");
                      }
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newSpecialty) {
                      setTeacherData({
                        ...teacherData,
                        specialties: [...teacherData.specialties, newSpecialty],
                      });
                      setNewSpecialty("");
                    }
                  }}
                  className="w-10 h-9 bg-[#89A6A7] rounded-lg flex items-center justify-center text-white"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Section 4: Education */}
          <div className="w-full bg-white rounded-2xl border border-black/10 p-8 flex flex-col gap-6 shadow-sm">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-[#89A6A7]" />
              <h3 className="text-greenTeal text-base font-medium inter-font">
                Education
              </h3>
            </div>

            <div className="flex flex-col gap-4">
              {teacherData.education.map((edu, i) => (
                <div
                  key={i}
                  className="self-stretch p-4 rounded-[10px] border border-gray-200 flex justify-between items-start"
                >
                  <div className="flex gap-4 items-start">
                    <div className="w-9 h-9 bg-[#89A6A7]/10 rounded-[10px] flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-[#89A6A7]" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-neutral-950 text-base font-semibold inter-font">
                        {edu.degree}
                      </span>
                      <span className="text-gray-600 text-sm font-normal inter-font">
                        {edu.institution}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setTeacherData({
                        ...teacherData,
                        education: teacherData.education.filter(
                          (_, idx) => idx !== i,
                        ),
                      })
                    }
                    className="p-1.5 hover:bg-rose-50 rounded-lg text-rose-500 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {/* Add Education sub-form */}
              <div className="p-4 bg-gray-50 rounded-[10px] flex flex-col gap-3">
                <h4 className="text-neutral-950 text-sm font-semibold inter-font">
                  Add Education
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    className="h-9 px-3 bg-zinc-100 rounded-lg border-transparent text-sm"
                    placeholder="Degree (e.g., PhD in Psychology)"
                    value={newEdu.degree}
                    onChange={(e) =>
                      setNewEdu({ ...newEdu, degree: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    className="h-9 px-3 bg-zinc-100 rounded-lg border-transparent text-sm"
                    placeholder="Institution (e.g., Harvard University)"
                    value={newEdu.institution}
                    onChange={(e) =>
                      setNewEdu({ ...newEdu, institution: e.target.value })
                    }
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (newEdu.degree && newEdu.institution) {
                      setTeacherData({
                        ...teacherData,
                        education: [...teacherData.education, newEdu],
                      });
                      setNewEdu({ degree: "", institution: "" });
                    }
                  }}
                  className="w-full h-9 bg-[#89A6A7] rounded-lg flex items-center justify-center gap-2 text-white text-sm font-medium inter-font"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Education</span>
                </button>
              </div>
            </div>
          </div>

          {/* Section 5: Achievements & Credentials */}
          <div className="w-full bg-white rounded-2xl border border-black/10 p-8 flex flex-col gap-6 shadow-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#89A6A7]" />
              <h3 className="text-greenTeal text-base font-medium inter-font">
                Achievements & Credentials
              </h3>
            </div>

            <div className="flex flex-col gap-3">
              {teacherData.achievements.map((ach, i) => (
                <div
                  key={i}
                  className="px-4 py-3 bg-green-50 rounded-[10px] border border-green-200 flex justify-between items-center group"
                >
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-green-600" />
                    <span className="text-neutral-950 text-sm font-normal inter-font">
                      {ach}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setTeacherData({
                        ...teacherData,
                        achievements: teacherData.achievements.filter(
                          (_, idx) => idx !== i,
                        ),
                      })
                    }
                    className="p-1 hover:bg-rose-100 rounded text-rose-600 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}

              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  className="flex-1 h-9 px-4 bg-zinc-100 rounded-lg border-transparent text-sm"
                  placeholder="Add an achievement or credential..."
                  value={newAchievement}
                  onChange={(e) => setNewAchievement(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (newAchievement) {
                        setTeacherData({
                          ...teacherData,
                          achievements: [
                            ...teacherData.achievements,
                            newAchievement,
                          ],
                        });
                        setNewAchievement("");
                      }
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newAchievement) {
                      setTeacherData({
                        ...teacherData,
                        achievements: [
                          ...teacherData.achievements,
                          newAchievement,
                        ],
                      });
                      setNewAchievement("");
                    }
                  }}
                  className="w-10 h-9 bg-[#89A6A7] rounded-lg flex items-center justify-center text-white shadow-sm"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Section 6: Payment Rates */}
          <div className="w-full bg-gradient-to-br from-[#89A6A7]/10 to-stone-300/20 rounded-[10px] border-2 border-[#89A6A7]/30 p-8 flex flex-col gap-6 shadow-sm">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-[#89A6A7]" />
                <h3 className="text-neutral-800 text-lg font-bold arimo-font">
                  Payment Rates
                </h3>
              </div>
              <button
                type="button"
                className="h-9 px-4 bg-[#89A6A7] text-white rounded-[10px] text-sm font-normal arimo-font hover:bg-[#729394]"
              >
                Add Rates
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-white rounded-[10px] border border-neutral-200 flex flex-col gap-3">
                <span className="text-neutral-600 text-sm font-normal arimo-font">
                  Course Rate
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-[#89A6A7] text-3xl font-bold arimo-font">
                    ${teacherData.courseRate}
                  </span>
                  <span className="text-neutral-500 text-sm font-normal arimo-font">
                    /hour
                  </span>
                </div>
                <p className="text-neutral-500 text-xs font-normal arimo-font italic">
                  Rate for regular course teaching sessions
                </p>
              </div>

              <div className="p-5 bg-white rounded-[10px] border border-neutral-200 flex flex-col gap-3">
                <span className="text-neutral-600 text-sm font-normal arimo-font">
                  Consultation Hourly Rate
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-[#89A6A7] text-3xl font-bold arimo-font">
                    ${teacherData.consultationRate}
                  </span>
                  <span className="text-neutral-500 text-sm font-normal arimo-font">
                    /hour
                  </span>
                </div>
                <p className="text-neutral-500 text-xs font-normal arimo-font italic">
                  Rate for one-on-one consultation sessions
                </p>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-[10px] border border-blue-200">
              <div className="flex gap-2">
                <span className="text-blue-800 text-sm font-bold arimo-font">
                  Note:
                </span>
                <p className="text-blue-800 text-sm font-normal arimo-font leading-5">
                  These rates are automatically displayed on the instructor's
                  dashboard. They can view their earnings and dues based on
                  these hourly rates.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-4 mb-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 h-10 border border-black/10 rounded-lg text-sm font-normal text-neutral-950 hover:bg-gray-50 flex items-center justify-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 h-10 bg-[#89A6A7] hover:bg-[#729394] text-white rounded-lg text-sm font-semibold transition-all shadow-md active:scale-[0.98] inter-font"
            >
              Create Teacher
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;

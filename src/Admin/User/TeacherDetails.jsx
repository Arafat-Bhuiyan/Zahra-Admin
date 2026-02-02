import React from "react";
import {
  X,
  Mail,
  MapPin,
  Star,
  BookOpen,
  Users,
  Award,
  DollarSign,
  Calendar,
  CheckCircle2,
} from "lucide-react";

const TeacherDetails = ({ teacher, onBack }) => {
  if (!teacher) return null;

  return (
    <div className="flex flex-col gap-8 pb-10 animate-in fade-in duration-300">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <h1 className="text-greenTeal text-3xl font-bold inter-font leading-9">
            Teacher Profile
          </h1>
          <p className="text-gray-600 text-base font-normal inter-font leading-6">
            Manage what students see on your profile
          </p>
        </div>
        <button
          onClick={onBack}
          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors group"
        >
          <X className="w-6 h-6 text-neutral-400 group-hover:text-neutral-950" />
        </button>
      </div>

      {/* Profile Card */}
      <div className="w-full bg-white rounded-2xl shadow-[0px_6px_20px_rgba(0,0,0,0.05)] border border-stone-200 p-8 md:p-12">
        <div className="flex flex-col md:flex-row gap-10 items-center md:items-start text-center md:text-left">
          {/* Profile Image */}
          <div className="relative">
            <img
              className="w-48 h-48 md:w-52 md:h-52 rounded-full object-cover border-4 border-white shadow-lg"
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(teacher.name)}&background=89A6A7&color=fff&size=512`}
              alt={teacher.name}
            />
            {teacher.status === "active" && (
              <div className="absolute bottom-4 right-4 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
            )}
          </div>

          {/* Profile Info */}
          <div className="flex-1 flex flex-col gap-5">
            <div className="flex flex-col md:flex-row gap-3 items-center md:items-start">
              <div className="px-3 py-1 bg-emerald-50 rounded-xl border border-green-200 flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></div>
                <span className="text-green-700 text-xs font-medium arimo-font uppercase tracking-wider">
                  Available
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-stone-900 text-4xl font-normal arimo-font">
                {teacher.name}
              </h2>
              <p className="text-stone-600 text-lg font-normal arimo-font">
                {teacher.department} Expert & Senior Educator
              </p>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-6">
              <div className="flex items-center gap-2 text-zinc-600">
                <Mail className="w-4 h-4" />
                <span className="text-sm font-normal arimo-font">
                  {teacher.email}
                </span>
              </div>
              <div className="flex items-center gap-2 text-zinc-600">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-normal arimo-font">
                  New York, USA
                </span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-8 mt-2">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 flex items-center justify-center">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                </div>
                <span className="text-stone-900 text-lg font-bold">4.9</span>
                <span className="text-stone-500 text-sm font-normal">
                  Rating
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-slate-600" />
                </div>
                <span className="text-stone-900 text-lg font-bold">
                  {teacher.courses}
                </span>
                <span className="text-stone-500 text-sm font-normal">
                  Courses
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 flex items-center justify-center">
                  <Users className="w-4 h-4 text-slate-600" />
                </div>
                <span className="text-stone-900 text-lg font-bold">
                  {teacher.students}
                </span>
                <span className="text-stone-500 text-sm font-normal">
                  Students
                </span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
              {[
                "Islamic Psychology",
                "Anxiety Management",
                "Mindfulness",
                "CBT",
                "Trauma-Informed Care",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1 rounded-xl border border-slate-300 text-slate-600 text-xs font-normal arimo-font"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* About Section */}
      <div className="bg-white rounded-2xl border border-stone-200 p-8 flex flex-col gap-6 shadow-sm">
        <h3 className="text-stone-900 text-2xl font-normal arimo-font border-b border-stone-100 pb-4">
          About
        </h3>
        <div className="flex flex-col gap-4 text-stone-700 text-base font-normal arimo-font leading-7">
          <p>
            {teacher.name} is a board-certified clinical psychologist with over
            15 years of experience integrating Islamic principles with
            evidence-based psychological treatments. She holds a PhD in Clinical
            Psychology and has completed specialized training in Islamic
            counseling and mindfulness-based therapies.
          </p>
          <p>
            Her career has been dedicated to making mental health support
            accessible to the Muslim community, emphasizing the integration of
            faith and professional psychological care. Her approach combines
            compassion, cultural sensitivity, and clinical excellence.
          </p>
        </div>
      </div>
      {/* Main Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column (2/3) */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* Education Section */}
          <div className="bg-white rounded-2xl border border-stone-200 p-8 flex flex-col gap-6 shadow-sm">
            <h3 className="text-stone-900 text-2xl font-normal arimo-font border-b border-stone-100 pb-4">
              Education
            </h3>
            <div className="flex flex-col gap-6">
              {[
                {
                  title: "PhD in Clinical Psychology",
                  school: "University of Cambridge",
                  year: "2008",
                },
                {
                  title: "MA in Islamic Studies",
                  school: "Al-Azhar University",
                  year: "2005",
                },
                {
                  title: "BA in Psychology",
                  school: "University of London",
                  year: "2003",
                },
              ].map((edu, idx) => (
                <div key={idx} className="flex gap-5 items-start">
                  <div className="w-12 h-12 bg-emerald-50 rounded-full border border-slate-300 flex items-center justify-center shrink-0">
                    <Award className="w-6 h-6 text-slate-600" />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-stone-900 text-lg font-medium arimo-font">
                      {edu.title}
                    </h4>
                    <p className="text-stone-600 text-sm arimo-font">
                      {edu.school}
                    </p>
                    <p className="text-stone-400 text-xs mt-1 arimo-font">
                      {edu.year}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Courses Taught Section */}
          <div className="bg-white rounded-2xl border border-stone-200 p-8 flex flex-col gap-6 shadow-sm">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-4">
              <div className="p-1 rounded bg-blue-50">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-neutral-950 text-2xl font-normal arimo-font">
                Courses Taught (3)
              </h3>
            </div>

            <div className="rounded-[10px] border border-black/10 overflow-hidden">
              <table className="w-full text-sm text-left arimo-font">
                <thead className="bg-gray-50 border-b border-black/10">
                  <tr>
                    <th className="py-3 px-4 font-normal text-neutral-950 w-2/3">
                      Course Name
                    </th>
                    <th className="py-3 px-4 font-normal text-neutral-950 text-right">
                      Students
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/10">
                  {[
                    { name: "Advanced Mathematics", students: 85 },
                    { name: "Calculus I", students: 75 },
                    { name: "Statistics", students: 85 },
                  ].map((course, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="py-4 px-4 text-neutral-950 text-base">
                        {course.name}
                      </td>
                      <td className="py-4 px-4 text-neutral-950 text-base text-right font-medium">
                        {course.students}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (1/3) */}
        <div className="flex flex-col gap-8">
          {/* Achievements */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
            <h3 className="text-stone-900 text-lg font-bold arimo-font mb-6 border-b border-stone-100 pb-3">
              Achievements
            </h3>
            <div className="flex flex-col gap-4">
              {[
                "Published researcher in Islamic Psychology",
                "Speaker at International Islamic Psychology Conference",
                "Consultant for Muslim Mental Health Initiative",
                "Certified Mindfulness Instructor",
              ].map((ach, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <CheckCircle2 className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                  <p className="text-stone-700 text-sm font-normal arimo-font leading-relaxed">
                    {ach}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Rates Section */}
          <div className="bg-stone-50 rounded-2xl border-2 border-stone-100 p-6 flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-slate-400" />
                <h3 className="text-neutral-800 text-lg font-bold arimo-font">
                  Payment Rates
                </h3>
              </div>
              <button className="px-4 py-1.5 bg-slate-500 hover:bg-slate-600 text-white text-sm rounded-lg transition-colors flex items-center gap-2">
                <Award className="w-4 h-4" />
                Edit Rates
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-white p-5 rounded-xl border border-stone-200 flex flex-col gap-2">
                <span className="text-neutral-500 text-xs font-medium uppercase tracking-wider">
                  Course Rate
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-slate-500 text-3xl font-bold font-['Arimo']">
                    $75
                  </span>
                  <span className="text-neutral-400 text-sm">/hour</span>
                </div>
                <p className="text-neutral-400 text-[11px] arimo-font">
                  Rate for regular course teaching sessions
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-stone-200 flex flex-col gap-2">
                <span className="text-neutral-500 text-xs font-medium uppercase tracking-wider">
                  Consultation Hourly Rate
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-slate-500 text-3xl font-bold font-['Arimo']">
                    $100
                  </span>
                  <span className="text-neutral-400 text-sm">/hour</span>
                </div>
                <p className="text-neutral-400 text-[11px] arimo-font">
                  Rate for one-on-one consultation sessions
                </p>
              </div>
            </div>

            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
              <p className="text-blue-800 text-[13px] arimo-font leading-relaxed">
                <span className="font-bold">Note:</span> These rates are
                automatically displayed on the instructor's dashboard. They can
                view their earnings and dues based on these hourly rates.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Earnings Section */}
      <div className="w-full bg-neutral-50 rounded-2xl p-8 flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Calendar className="w-6 h-6 text-green-600" />
          <h3 className="text-neutral-800 text-xl font-bold arimo-font">
            Current Month Earnings
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm flex flex-col gap-1">
            <span className="text-neutral-500 text-xs font-medium uppercase tracking-wider">
              Course Earnings
            </span>
            <span className="text-neutral-800 text-2xl font-bold">$3,000</span>
          </div>
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm flex flex-col gap-1">
            <span className="text-neutral-500 text-xs font-medium uppercase tracking-wider">
              Consultation Earnings
            </span>
            <span className="text-neutral-800 text-2xl font-bold">$800</span>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200 shadow-sm flex flex-col gap-1">
            <span className="text-green-700 text-xs font-medium uppercase tracking-wider">
              Total Earnings
            </span>
            <span className="text-green-700 text-3xl font-bold">$3,800</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetails;

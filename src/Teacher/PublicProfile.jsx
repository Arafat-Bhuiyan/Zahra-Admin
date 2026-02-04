"use client";

import { Link } from "react-router-dom";
import profile from "../assets/img/profile_teacher.png";
import { CircleCheckBig } from "lucide-react";

export default function PublicProfile() {
  const profileData = {
    name: "Dr. Fatima Rahman",
    title: "Clinical Psychologist & Islamic Scholar",
    location: "London, UK",
    email: "dr.fatima@example.com",
    website: "www.drfatima.com",
    about: `Dr. Fatima Rahman is a dedicated clinical psychologist specializing in mental health support for Muslim communities. Her work combines evidence-based psychological practices with Islamic values, creating a unique and effective approach to mental wellness. She holds a PhD in Clinical Psychology and has extensive specialized training in Islamic counseling and psychotherapy.

Dr. Rahman has dedicated her career to making mental health support accessible to the Muslim community, emphasizing the integration of faith and conventional psychological care. She brings together cutting-edge therapeutic techniques with a deep understanding of Islamic worldview and practices.`,
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
      "Certified Mind-Wellness Instructor",
    ],
    specialties: [
      "Clinical Psychology",
      "Islamic Studies",
      "Mental Health Counseling",
      "Trauma Support",
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Profile Header */}
   
        <div className="max-w-4xl mx-auto px-6 py-8 bg-white rounded-lg shadow-md border">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-6">
              <img
                src={profile}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover"
              />
              <div>
                <div className="inline-flex font-medium text-[#008236] items-center gap-2 px-4 py-1 rounded-full bg-[#E8FFF0] mb-1 border border-[#C3FFCA]">
                  <CircleCheckBig size={18} /> <p className=" "> Available</p>
                </div>

                <h1 className="text-3xl font-bold text-gray-800">
                  {profileData.name}
                </h1>
                <p className="text-teal-600 font-medium">{profileData.title}</p>
                <p className="text-gray-600 mt-1">{profileData.location}</p>
                <div className="flex gap-4 mt-3">
                  <a
                    href={`mailto:${profileData.email}`}
                    className="text-sm text-teal-600 hover:underline"
                  >
                    {profileData.email}
                  </a>
              
                </div>
              </div>
            </div>
            <Link to={"/teacher/edit-profile"}>
              {" "}
              <button className="px-6 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-all font-medium">
                Edit Profile
              </button>
            </Link>
          </div>
        </div>
  

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-8">
        {/* About Section */}
        <section className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4">About</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {profileData.about}
          </p>
        </section>

        {/* Education Section */}
        <section className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Education</h2>
          <div className="space-y-4">
            {profileData.education.map((edu, index) => (
              <div
                key={index}
                className="flex gap-4 pb-4 border-b border-gray-200 last:border-b-0"
              >
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-teal-700 font-bold">🎓</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                  <p className="text-gray-600 text-sm">{edu.university}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Specialties Section */}
        <section className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Specialties & Tags
          </h2>
          <div className="flex flex-wrap gap-2">
            {profileData.specialties.map((spec, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-medium"
              >
                {spec}
              </span>
            ))}
          </div>
        </section>

        {/* Achievements Section */}
        <section className="bg-white rounded-lg p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Achievements & Credentials
          </h2>
          <div className="space-y-3">
            {profileData.achievements.map((achievement, index) => (
              <div key={index} className="flex gap-3 items-start">
                <span className="text-green-500 font-bold mt-1">✓</span>
                <span className="text-gray-700">{achievement}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

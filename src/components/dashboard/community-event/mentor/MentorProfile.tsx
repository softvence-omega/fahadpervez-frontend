import { useState } from "react";
import {
  Clock12,
  Languages,
  Link,
  MapPin,
  Search,
  Star,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardHeading from "@/components/reusable/DashboardHeading";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import SessionCard from "./SessionCard";
import { ConnectionRequestModal } from "./ConnectionRequestModal";
import { SessionSelectionModal } from "./SessionSelectionModal";
import { BreadcrumbItem } from "../../gamified-learning/types";
import Breadcrumb from "@/components/reusable/CommonBreadcrumb";

const breadcrumbs: BreadcrumbItem[] = [
  { name: "Dashboard", link: "/dashboard" },
  { name: "All Mentor", link: "/dashboard/all-mentor" },
  { name: "Mentor Profile", link: "/dashboard/mentor-profile" },
];

export default function MentorProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [activeModal, setActiveModal] = useState<
    "session" | "connection" | null
  >(null);

  const handleBookSession = (sessionId: string) => {
    console.log("Session booked:", sessionId);
    setActiveModal(null);
    // After booking a session, you might want to show connection modal
    // setActiveModal("connection");
  };

  const handleSendRequest = () => {
    // Your logic to send connection request
    console.log("Connection request sent!");
    setIsModalOpen(false);
  };

  const [skills] = useState([
    "EHR/EMR",
    "EHR/EMR",
    "EHR/EMR",
    "EHR/EMR",
    "EHR/EMR",
    "EHR/EMR",
    "Physician - Internal Medicine",
    "Physician - Internal Medicine",
  ]);

  return (
    <div className="my-6">
      {/* Breadcrumb */}
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <div className="min-h-screen bg-white">
        {/* Header Section */}
        <div className="bg-blue-900 h-52 w-full"></div>
        <div className="flex items-center justify-between -mt-24 px-10">
          <div className="flex items-center gap-5">
            <img
              src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
              alt="mentor"
              className="w-28 h-28 rounded-full border-4 border-white shadow object-cover mt-6"
            />
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              Top Mentor
            </span>
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            <Button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2 bg-white border rounded-lg text-blue-700 font-medium hover:bg-blue-50 mb-7 cursor-pointer"
            >
              <Link />
              Connect
            </Button>
            <Button
              onClick={() => setActiveModal("session")}
              className="px-6 py-2 bg-white border rounded-lg text-blue-700 font-medium hover:bg-blue-50 mb-7 cursor-pointer"
            >
              <Link />
              Book For Session
            </Button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between">
            {/* Profile Header */}
            <div className="max-w-lg flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex gap-4">
                <div>
                  <h1 className="text-2xl text-[#0F172A] font-semibold mt-2">
                    Mohammad Essayed
                  </h1>
                  <p className="text-[#0F172A] font-medium mb-1">
                    Medical Consultant- Preventive & Clinical Care
                  </p>
                  <p className="text-[#118577] hover:underline mb-5">
                    I'll help you step confidently into the field of Medical
                    Consultant, sharing over 12 years of real-world experience
                  </p>
                  <div className="mt-3 text-sm text-gray-600 space-y-3">
                    <p className="flex items-center gap-2 text-[#475569]">
                      <MapPin className="w-5 h-5 text-emerald-600" /> Poland
                    </p>
                    <p className="flex items-center gap-2 text-[#475569]">
                      <Languages className="w-5 h-5 text-emerald-600" /> Speaks
                      English and Arabic
                    </p>
                    <p className="flex items-center gap-2 text-[#475569]">
                      <Star className="w-5 h-5 text-emerald-600" />
                      5.0 (60 reviews)
                    </p>
                    <p className="flex items-center gap-2 text-[#475569]">
                      <Clock12 className="w-5 h-5 text-emerald-600" />
                      Active today
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div className="max-w-96 mt-6">
              <h2 className="text-[#0F172A] font-semibold mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2 mt-3">
                {skills.slice(0, 5).map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gray-100 text-gray-700 border border-slate-200 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
                <span className="px-3 py-1 text-gray-700 text-sm border-b border-b-[#334155]">
                  + 13 more
                </span>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="mt-10">
            <h2 className="text-xl text-[#0F172A] font-semibold mb-5">About</h2>
            <p className="leading-relaxed ">
              In a field as dynamic and critical as information security, your
              journey from learning the ropes to mastering the domain requires
              more than just technical knowledge—it demands a roadmap tailored
              to your unique career aspirations and challenges. That's where I
              come in. With a wealth of experience in the trenches of
              information security, I'm here to guide, inspire, and elevate your
              career to new heights.
            </p>
          </div>

          {/* Testimonials */}
          <div className="mt-12">
            <h2 className="text-xl text-[#0F172A] font-semibold mb-6">
              What mentees say
            </h2>
            <div className="flex items-center gap-4 mt-4 p-4 rounded-xl">
              <img
                src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
                alt="menthe"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm text-[#111827] font-medium mb-2">Fabio</p>
                <div className="flex items-center text-[#21A391]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="#21A391" />
                  ))}
                </div>
                <p className="text-sm text-gray-500">August 14, 2025</p>
              </div>
            </div>
            <p className="text-gray-700 mt-2">
              Muhammad is a great mentor, he walked me through the real skills
              you need to know to be job ready. Very much recommended.
            </p>
          </div>

          {/* Bottom Skills */}
          {/* <div className="mt-8">
          <h2 className="text-lg font-semibold">Skills</h2>
          <div className="flex flex-wrap gap-2 mt-3">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div> */}

          <div className="border border-[#0000001A] p-7 rounded-[8px] my-10">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 text-center md:text-left gap-6">
              <div>
                <DashboardHeading
                  title="Recorded Session"
                  titleSize="text-xl"
                  titleColor="text-[#0A0A0A]"
                  description="Access your recorded study sessions, mentorship calls, and educational content"
                  descColor="text-[#4A5565]"
                  descFont="text-sm"
                />
              </div>
              <PrimaryButton
                icon={<Video className="w-4 h-4" />}
                iconPosition="left"
                className="bg-white text-slate-800 border border-slate-300 cursor-pointer"
              >
                6 Recordings
              </PrimaryButton>
            </div>

            <div className="flex items-center gap-6">
              {/* Search Input with Icon */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by title, instructor, or tags..."
                  className="w-full md:w-[450px] h-10 pl-10 pr-4 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
              </div>

              {/* Dropdown */}
              <select className="h-10 px-4 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                <option value="all">All</option>
                <option value="new">New</option>
                <option value="watched">Watched</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {Array(4)
              .fill(null)
              .map(() => (
                <SessionCard />
              ))}
          </div>
        </div>

        <ConnectionRequestModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleSendRequest}
        />

        <SessionSelectionModal
          isOpen={activeModal === "session"}
          onClose={() => setActiveModal(null)}
          onBookNow={handleBookSession}
        />
      </div>
    </div>
  );
}

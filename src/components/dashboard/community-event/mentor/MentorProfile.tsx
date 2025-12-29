import { useState } from "react";
import {
  BadgeHelp,
  Clock12,
  Languages,
  Link as LinkIcon,
  MapPin,
  MessageCircleQuestion,
  Star,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardHeading from "@/components/reusable/DashboardHeading";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import { ConnectionRequestModal } from "./ConnectionRequestModal";
import { SessionSelectionModal } from "./SessionSelectionModal";
import { BreadcrumbItem } from "../../gamified-learning/types";
import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
import { Link, useLocation } from "react-router-dom";
import { Mentor } from "../types";

const breadcrumbs: BreadcrumbItem[] = [
  { name: "Dashboard", link: "/dashboard" },
  { name: "All Mentor", link: "/dashboard/all-mentor" },
  { name: "Mentor Profile", link: "/dashboard/mentor-profile" },
];

export default function MentorProfile() {
  const { state } = useLocation();
  const mentor = state?.mentor as Mentor;

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

  // const [skills] = useState([
  //   "EHR/EMR",
  //   "EHR/EMR",
  //   "EHR/EMR",
  //   "EHR/EMR",
  //   "EHR/EMR",
  //   "EHR/EMR",
  //   "Physician - Internal Medicine",
  //   "Physician - Internal Medicine",
  // ]);

  if (!mentor) {
    return <div className="p-6">Mentor data not found.</div>;
  }

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
              src={
                mentor.profile_photo ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZYgW4c4mScN4iMaoZM2YNPO2iV7aaxtmDVg&s"
              }
              alt="mentor"
              className="w-28 h-28 rounded-full border-2 border-white shadow object-cover mt-6"
            />
            {mentor.profileVerification === "VERIFIED" && (
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                Verified Mentor
              </span>
            )}
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            {/* <Button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2 bg-white border rounded-lg text-blue-700 font-medium hover:bg-blue-50 mb-7 cursor-pointer"
            >
              <Link />
              Connect
            </Button> */}
          </div>
        </div>

        <div className="p-6">
          <div className="md:flex items-center justify-between">
            {/* Profile Header */}
            <div className="max-w-lg flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h1 className="text-2xl text-[#0F172A] font-semibold mt-2">
                  {mentor?.firstName} {mentor?.lastName}
                </h1>
                <p className="text-[#0F172A] font-medium mb-1">
                  {mentor?.currentRole}
                </p>

                <div className="w-2/3">
                  <Button
                    onClick={() => setActiveModal("session")}
                    className="w-full bg-white border rounded text-blue-main font-medium hover:bg-blue-50 my-1 cursor-pointer"
                  >
                    <LinkIcon />
                    Book For Session
                  </Button>

                  <div className="flex items-center gap-1">
                    <Link to={"/dashboard/ask-question"} className="">
                      <Button className=" bg-white border border-indigo-500 rounded text-violet-700 font-medium hover:bg-blue-50 my-1 cursor-pointer">
                        <MessageCircleQuestion />
                        Ask a Question
                      </Button>
                    </Link>
                    <Link to={""} className="">
                      <Button
                        onClick={() => setActiveModal("session")}
                        className=" bg-orange-400 border rounded text-white font-medium hover:bg-orange-600 my-1 cursor-pointer"
                      >
                        Massage
                      </Button>
                    </Link>
                  </div>
                </div>

                <p className="text-[#118577] hover:underline mb-5">
                  {mentor?.specialty} - {mentor?.hospitalOrInstitute}
                  <br />
                  {mentor?.professionalExperience} Years of Experience
                </p>
                <div className="mt-3 text-sm text-gray-600 space-y-3">
                  <p className="flex items-center gap-2 text-[#475569]">
                    <MapPin className="w-5 h-5 text-emerald-600" />{" "}
                    {mentor?.country}
                  </p>
                  <p className="flex items-center gap-2 text-[#475569]">
                    <Languages className="w-5 h-5 text-emerald-600" /> Speaks{" "}
                    {mentor?.languages?.join(", ") || "English"}
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

            {/* Skills Section */}
            <div className="max-w-96 mt-6">
              <h2 className="text-[#0F172A] font-semibold mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2 mt-3">
                {mentor?.skills?.slice(0, 5).map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gray-100 text-gray-700 border border-slate-200 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
                {mentor?.skills?.length > 5 && (
                  <span className="px-3 py-1 text-gray-700 text-sm border-b border-b-[#334155]">
                    + {mentor?.skills?.length - 5} more
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Asked Question Section */}
          <div className="my-10">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg text-[#0F172A]  font-medium">
                Asked Question
              </h3>
              <Link
                to={"/dashboard/ask-question"}
                className="text-sm font-semibold text-blue-main underline"
              >
                View All
              </Link>
            </div>
            <div className="border border-[#0000001A] p-4 rounded-[8px]">
              <div className="flex flex-col md:flex-row justify-between items-center mb-3 text-center md:text-left gap-6">
                <div>
                  <DashboardHeading
                    title="Your Asked Question"
                    titleSize="text-base"
                    titleFont="font-normal"
                    titleColor="text-[#0A0A0A]"
                    description="Access your Question sessions, for getting your answer"
                    descColor="text-[#717182]"
                    descFont="text-sm"
                    className="space-y-2"
                  />
                </div>
                <p className="flex items-center gap-1 text-slate-800 cursor-pointer">
                  <BadgeHelp className="w-4 h-4" />6 Question
                </p>
              </div>
            </div>
          </div>

          {/* Completed Session Section*/}
          <div className="my-10">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg text-[#0F172A]  font-medium">
                Completed Session
              </h3>
              {/* <Link
                to={`/dashboard/mentor-profile/${mentor?._id}`}
                className="text-sm font-semibold text-blue-main underline"
              >
                View All
              </Link> */}
            </div>
            <div className="border border-[#0000001A] p-4 rounded-[8px]">
              <div className="flex flex-col md:flex-row justify-between items-center mb-3 text-center md:text-left gap-6">
                <div>
                  <DashboardHeading
                    title="Recorded Session"
                    titleSize="text-base"
                    titleFont="font-normal"
                    titleColor="text-[#0A0A0A]"
                    description="Access your recorded study sessions, mentorship calls, and educational content"
                    descColor="text-[#4A5565]"
                    descFont="text-sm"
                    className="space-y-2"
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
            </div>
          </div>

          {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {Array(4)
              .fill(null)
              .map(() => (
                <SessionCard />
              ))}
          </div> */}
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

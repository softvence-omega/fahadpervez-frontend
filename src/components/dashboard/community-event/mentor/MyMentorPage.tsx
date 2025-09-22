import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
import { BreadcrumbItem } from "../../gamified-learning/types";
import { Link } from "react-router-dom";
import { ArrowLeft, CalendarDays, Video, Zap } from "lucide-react";
import DashboardHeading from "@/components/reusable/DashboardHeading";
import { Button } from "@/components/ui/button";
import MyMentorCard from "./MyMentorCard";
import PrimaryButton from "@/components/reusable/PrimaryButton";

export default function MyMentorPage() {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "Mentor", link: "/dashboard/all-communities" },
    { name: "My Mentor", link: "/dashboard/my-mentor" },
  ];

  return (
    <div className="my-6">
      <Breadcrumb breadcrumbs={breadcrumbs} />

      <div className="flex items-start gap-3 mt-6">
        <Link to={"/dashboard/all-communities"} className="mt-0.5">
          <ArrowLeft />
        </Link>
        <DashboardHeading
          title="My Mentors"
          titleColor="text-[#0A0A0A]"
          titleSize="text-xl"
          description="Take your medical Experience from Expertise"
          descColor="text-[#4A5565]"
          descSize="text-sm"
          className=""
        />
      </div>

      <div className="flex items-center gap-4 mt-6">
        <Button className="text-sm font-medium bg-blue-main text-white py-2 px-4 rounded-[6px]">
          Overview
        </Button>
        <Button className="text-sm font-medium bg-white text-slate-800 py-2 px-4 rounded-[6px] border border-slate-300">
          Recoded Session
        </Button>
      </div>

      <div className="my-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {Array(4)
          .fill(null)
          .map(() => (
            <MyMentorCard />
          ))}
      </div>

      <div className="bg-[#EFF6FF] border border-slate-300 rounded-[12px] p-5">
        <div className="flex items-center justify-between">
          <div className="flex  items-center gap-[10px]">
            <div className="bg-[#DBEAFE] rounded-[8px] p-[10px]">
              <Zap className="text-[#155DFC]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#0A0A0A]">Next Session</p>
              <p className="text-sm text-[#717182]">Don't miss this Class</p>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <CalendarDays className="w-4 h-4" />
              <p className="text-xs text-[#4A5565]">
                January 15, 2025 • 5:00 PM GMT
              </p>
            </div>
            <div className="flex items-center gap-3">
              <CalendarDays className="w-4 h-4" />
              <p className="text-xs text-[#4A5565]">Zoom Webinar</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 my-5">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
          <h3 className="font-medium">Dr. James Wilson</h3>
        </div>
        <div>
          <p className="text-gray-800">USMLE Step 1 Preparation Masterclass</p>
          <p className="max-w-[650px] text-sm text-gray-700 mt-2 mb-6">
            Join Dr. Maria Estevez from NYU for a comprehensive guide to
            preparing for USMLE Step 1 in 3 months with proven strategies and
            study schedules.
          </p>
          <PrimaryButton
            bgType="solid"
            iconPosition="left"
            bgColor="bg-blue-btn-1"
            icon={<Video className="w-4 h-4" />}
            className="h-10 mb-4 hover:bg-blue-btn-1 hover:opacity-80 cursor-pointer"
          >
            Join Zoom
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

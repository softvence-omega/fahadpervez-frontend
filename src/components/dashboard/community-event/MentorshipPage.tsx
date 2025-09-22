import DashboardHeading from "@/components/reusable/DashboardHeading";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import { HandHeart, Search } from "lucide-react";
import MyMentorCard from "./mentor/MyMentorCard";
import ConnectMentorCard from "./mentor/ConnectMentorCard";
import { useState } from "react";
import FindMentorModal from "./mentor/FindMentorModal";
import { Link } from "react-router-dom";

const MentorshipPage = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 text-center md:text-left gap-6">
        <div>
          <DashboardHeading
            title="Mentorship"
            titleSize="text-xl"
            titleColor="text-[#0A0A0A]"
            description="Connect, learn, and grow with the medical education community"
            descColor="text-[#4A5565]"
            descFont="text-sm"
          />
        </div>
        <PrimaryButton
          icon={<Search className="w-4 h-4" />}
          iconPosition="left"
          onClick={() => setOpen(true)}
          className="cursor-pointer"
        >
          Find a Mentor
        </PrimaryButton>
      </div>

      <div className="border border-slate-300 rounded-[8px] pt-5 px-8 pb-7">
        <div className="flex items-center justify-between">
          <h3 className="text-slate-900 font-medium">My Mentor</h3>
          <Link
            to={"/dashboard/my-mentor"}
            className="text-sm font-medium text-blue-main underline"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-7">
          {Array(6)
            .fill(null)
            .map(() => (
              <MyMentorCard />
            ))}
        </div>

        <div className="border border-slate-300 rounded-xl bg-white p-7 mt-12">
          <div className="text-center">
            <HandHeart className="mx-auto w-6 h-6" />
            <h2 className="mt-[10px] mb-2 text-xl font-semibold">
              Looking for a Mentor?
            </h2>
            <p className="text-[#4B5563]">
              Connect with residents and practicing doctors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-7">
            {Array(3)
              .fill(null)
              .map(() => (
                <ConnectMentorCard />
              ))}
          </div>
        </div>
      </div>
      <FindMentorModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default MentorshipPage;

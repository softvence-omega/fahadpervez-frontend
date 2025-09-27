import DashboardHeading from "@/components/reusable/DashboardHeading";
import MyMentorCard from "./mentor/MyMentorCard";
import { Link } from "react-router-dom";
import { BreadcrumbItem } from "../gamified-learning/types";
import Breadcrumb from "@/components/reusable/CommonBreadcrumb";

const breadcrumbs: BreadcrumbItem[] = [
  { name: "Dashboard", link: "/dashboard" },
  { name: "Mentors", link: "/dashboard/mentorship" },
];

const MentorshipPage = () => {
  return (
    <div className="mt-6 mb-16">
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <div>
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 text-center md:text-left gap-6">
          <div>
            <DashboardHeading
              title="Upcoming Sessions"
              titleSize="text-xl"
              titleColor="text-[#0A0A0A]"
              description="Connect, learn, and grow with the medical education community"
              descColor="text-[#4A5565]"
              descFont="text-sm"
            />
          </div>
          <Link
            to={"/dashboard/my-session"}
            className="text-sm font-medium text-blue-main underline"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-5 mt-7 mb-12">
          {Array(3)
            .fill(null)
            .map(() => (
              <div>
                <div className="border border-slate-300 p-3 rounded-[8px]">
                  <h3 className="text-[#18181B] text-lg font-medium mb-5">
                    USMLE Step 1 Preparation Masterclass
                  </h3>
                  <p className="text-sm text-[#71717A]">Today at 4:00 pm</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="mt-16 mb-7">
        <div className="flex items-center justify-between">
          <h3 className="text-xl text-[#111827]  font-semibold">My Mentor</h3>
          <Link
            to={"/dashboard/my-mentor"}
            className="text-sm font-semibold text-blue-main underline"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-7">
          {Array(4)
            .fill(null)
            .map(() => (
              <MyMentorCard />
            ))}
        </div>
        {/* <div className="border border-slate-300 rounded-xl bg-white p-7 mt-12">
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
            {Array(8)
              .fill(null)
              .map(() => (
                <ConnectMentorCard />
              ))}
          </div>
        </div> */}
      </div>

      <div className="mt-16 mb-7">
        <div className="flex items-center justify-between">
          <h3 className="text-xl text-[#111827]  font-semibold">
            Suggested For You
          </h3>
          <Link
            to={"/dashboard/all-mentor"}
            className="text-sm font-semibold text-blue-main underline"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-7">
          {Array(8)
            .fill(null)
            .map(() => (
              <MyMentorCard />
            ))}
        </div>
      </div>
    </div>
  );
};

export default MentorshipPage;

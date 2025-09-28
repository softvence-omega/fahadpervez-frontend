import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
import { BreadcrumbItem } from "../../gamified-learning/types";
import DashboardHeading from "@/components/reusable/DashboardHeading";
import { CalendarDays, TimerOff, Video } from "lucide-react";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const breadcrumbs: BreadcrumbItem[] = [
  { name: "Dashboard", link: "/dashboard" },
  { name: "Mentors", link: "/dashboard/mentorship" },
  { name: "My Session", link: "/dashboard/my-session" },
];

export default function MySession() {
  return (
    <div className="mt-6">
      <Breadcrumb breadcrumbs={breadcrumbs} />

      <div className="flex items-center justify-between">
        <DashboardHeading
          title="My Sessions"
          titleColor="text-[#0F172A]"
          titleSize="text-base"
          titleFont="font-medium"
          description="Connect, learn, and grow with the medical education community"
          descColor="text-[#4A5565]"
          descSize="text-sm"
          className="mt-3 mb-5"
        />
        <Link to={"/dashboard/recorded-session"}>
          <Button className="bg-blue-main hover:bg-blue-600 cursor-pointer">
            Recorded Session
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {Array(4)
          .fill(null)
          .map(() => (
            <Link to={`/dashboard/session-details/${3}`}>
              <div className="border border-slate-300 rounded-[8px] bg-[#EFF6FF] p-5">
                <p className="text-sm text-[#0A0A0A] font-medium">
                  USMLE Step 1 Preparation Masterclass
                </p>
                <p className="text-sm text-[#717182] mt-0.5">
                  with
                  <span className="text-sm text-zinc-700 underline ml-1">
                    Dr. James Wilson
                  </span>
                </p>

                <div className="mt-4 mb-6 space-y-2">
                  <div className="flex items-center gap-2">
                    <CalendarDays />
                    <p className="text-xs text-[#4A5565]">
                      January 15, 2025 • 5:00 PM GMT
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Video />
                    <p className="text-xs text-[#4A5565]">Zoom</p>
                  </div>
                </div>

                <PrimaryButton
                  iconPosition="left"
                  className="w-full bg-blue-main text-white border border-slate-300 transition-colors hover:bg-blue-main hover:text-white"
                  icon={<TimerOff className="h-4 w-4" />}
                >
                  Start Case
                </PrimaryButton>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

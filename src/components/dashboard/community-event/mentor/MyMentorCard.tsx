import { Button } from "@/components/ui/button";
import { Files, Plus, Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function MyMentorCard() {
  return (
    <div className="bg-[#F9FAFB] border border-slate-300 rounded-[8px] p-5">
      <Link to={`/dashboard/mentor-profile/${3}`} className="">
        <div className="flex items-start justify-between gap-3 flex-wrap hover:bg-white hover:shadow-2xs p-4 rounded">
          <div className="flex flex-wrap items-center gap-3">
            <img
              src="https://media.istockphoto.com/id/2194078950/photo/profile-picture-of-smiling-confident-arabic-businessman.webp?a=1&b=1&s=612x612&w=0&k=20&c=42Z7FDi1u5Ogevtd0xMUkTWM7hDzrre4YOlbHKvK_T8="
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="space-y-[6px]">
              <h3 className="font-medium text-nowrap">Dr. James Wilson</h3>
              {/* <p className="text-sm text-[#6B7280]">
            Availability: Weekends, Evenings
          </p> */}
              <p className="text-sm text-[#6B7280] text-nowrap">
                Cardiology • English
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Star className="text-orange-500" fill="currentColor" />
            5.0
          </div>
        </div>
      </Link>

      <div className="mt-4">
        <p className="text-sm text-zinc-700 font-semibold">Recent:</p>
        <p className="text-sm text-[#6B7280] underline">
          Session: USMLE Step 1 Preparation Masterclass
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <Button className="w-full bg-white text-slate-800 hover:text-white hover:bg-blue-main border border-slate-300 rounded pt-2 px-4 cursor-pointer">
          <Files />
          Ask Question
        </Button>

        <Button className="w-full bg-white text-slate-800 hover:text-white hover:bg-blue-main border border-slate-300 rounded pt-2 px-4 cursor-pointer">
          <Plus />
          New Session
        </Button>
      </div>
    </div>
  );
}

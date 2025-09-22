import { Button } from "@/components/ui/button";
import { Files, Plus } from "lucide-react";

export default function MyMentorCard() {
  return (
    <div className="bg-[#F9FAFB] border border-slate-300 rounded-[8px] p-5">
      <div className="flex items-center gap-3">
        <img
          src="https://media.istockphoto.com/id/2194078950/photo/profile-picture-of-smiling-confident-arabic-businessman.webp?a=1&b=1&s=612x612&w=0&k=20&c=42Z7FDi1u5Ogevtd0xMUkTWM7hDzrre4YOlbHKvK_T8="
          alt=""
          className="w-10 h-10 rounded-full"
        />
        <div className="space-y-[6px]">
          <h3 className="font-medium">Dr. James Wilson</h3>
          <p className="text-sm text-[#6B7280]">
            Availability: Weekends, Evenings
          </p>
          <p className="text-sm text-[#6B7280]">Cardiology • English</p>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-10">
        <Button className="w-full bg-white text-slate-800 hover:text-white hover:bg-blue-main border border-slate-300 rounded pt-2 px-4">
          <Files />
          Ask Question
        </Button>

        <Button className="w-full bg-white text-slate-800 hover:text-white hover:bg-blue-main border border-slate-300 rounded pt-2 px-4">
          <Plus />
          New Session
        </Button>
      </div>
    </div>
  );
}

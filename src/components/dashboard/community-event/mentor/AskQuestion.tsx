import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
import { BreadcrumbItem } from "../../gamified-learning/types";
import DashboardHeading from "@/components/reusable/DashboardHeading";
import { BadgeHelp, Search, SendHorizonal } from "lucide-react";

const breadcrumbs: BreadcrumbItem[] = [
  { name: "Dashboard", link: "/dashboard" },
  { name: "Mentor", link: "/dashboard/mentorship" },
  { name: "Ask Question", link: "/dashboard/ask-question" },
];

export default function AskQuestion() {
  return (
    <div className="mt-6 mb-8">
      {/* Breadcrumb */}
      <Breadcrumb breadcrumbs={breadcrumbs} />

      <DashboardHeading
        title="Ask Question"
        titleColor="text-[#0F172A]"
        titleSize="text-base"
        titleFont="font-medium"
        description="Connect, learn, and grow with the medical education community"
        descColor="text-[#4A5565]"
        descSize="text-sm"
        className="mt-8 mb-5"
      />

      <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6 mt-5 mb-3">
        <div>
          <DashboardHeading
            title="Your Asked Question"
            titleSize="text-base"
            titleFont="font-normal"
            titleColor="text-[#0A0A0A]"
            description=""
            descColor="text-[#717182]"
            descFont="text-sm"
            className="space-y-2"
          />
        </div>
        <p className="flex items-center gap-1 text-slate-800 cursor-pointer">
          <BadgeHelp className="w-4 h-4" />6 Question
        </p>
      </div>

      {/* Search Input with Icon */}
      <div className="relative mt-6">
        <input
          type="text"
          placeholder="Search by condition or keyword"
          className="w-full md:w-[450px] h-12 pl-10 pr-4 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
      </div>

      {/* question section */}
      <div>
        {Array(3)
          .fill(null)
          .map(() => (
            <div className="border border-slate-300 rounded-[8px] p-3 my-5 bg-white">
              <p className="text-slate-500 text-sm mb-4">
                Q.Best mnemonics for remembering cranial nerves?
              </p>
              <p className="text-xs text-slate-800">
                <span className="text-sm font-medium">Answer:</span> But I still
                feel like I'm missing something fundamental. Can anyone
                recommend resources that really helped them master ECG
                interpretation? I'm particularly struggling with:
                <br />
                - Identifying different types of blocks
                <br />
                - ST segment interpretation
                <br />- Complex arrhythmias
              </p>
            </div>
          ))}

        <div>
          <div className="border border-slate-300 rounded-[8px] p-3 my-5 bg-white">
            <p className="text-slate-500 text-sm mb-8">Your Question</p>

            <div className="relative mt-6">
              <input
                type="text"
                placeholder="Ask Question"
                className="w-full h-16 pl-3 pr-4 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <SendHorizonal
              
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

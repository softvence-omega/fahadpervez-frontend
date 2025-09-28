import { BreadcrumbItem } from "@/components/dashboard/gamified-learning/types";
import OSCECard from "@/components/dashboard/osce/OSCECard";
import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
import DashboardHeading from "@/components/reusable/DashboardHeading";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import { ArrowLeft, Filter, Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function OSCEStation() {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "OSCE Station", link: "/dashboard/osce" },
  ];

  const handleWatchTutorial = () => {
    // Add your implementation here
    alert("Opening tutorial...");
  };

  // const handleSimulate = () => {
  //     // Add your implementation here
  //     alert("Starting simulation...");
  // };

  const handlePractice = () => {
    // Add your implementation here
    alert("Opening practice checklist...");
  };

  return (
    <div className="my-6">
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <div className="flex items-start gap-3">
        <Link to={"/dashboard/osce"} className="mt-1.5">
          <ArrowLeft />
        </Link>
        <DashboardHeading
          title="OSCE station"
          titleSize="text-xl"
          description="Choose a station to practise your clinical skills"
          className="mb- space-y-1"
        />
      </div>
      <div className="relative mt-5">
        <input
          type="text"
          placeholder="e,g cardiovascular"
          className="w-full h-11 pl-10 pr-4 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
      </div>

      <div className="flex items-center justify-between mt-12">
        <h3 className="text-xl font-semibold text-slate-800">History</h3>
        <PrimaryButton
          icon={<Filter className="w-4 h-4" />}
          bgType="solid"
          iconPosition="left"
          bgColor="bg-blue-btn-1"
          className="h-10 mb-4 hover:bg-blue-btn-1 hover:opacity-80 cursor-pointer"
        >
          Filter
        </PrimaryButton>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(3)
          .fill(null)
          .map(() => (
            <OSCECard
              onWatchTutorial={handleWatchTutorial}
              onPractice={handlePractice}
            />
          ))}
      </div>
    </div>
  );
}

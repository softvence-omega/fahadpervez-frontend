import DashboardHeading from "@/components/reusable/DashboardHeading";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import { ArrowLeft, Filter, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import MyStudyPlanCard from "./MyStudyPlanCard";

export default function MyPlan() {
    return (
        <div>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Link to={'/dashboard/study-plan'} className="mb-7">
                        <ArrowLeft /></Link>
                    <DashboardHeading
                        title="All Study Plan"
                        titleSize="text-xl"
                        description="A structured path to smarter learning and better results."
                        className="mt-12 mb-12 space-y-1"
                    />
                </div>
                <div className="flex items-center gap-6">
                    <Link to={"/dashboard/my-plan"}>
                        <PrimaryButton
                            bgType="solid"
                            bgColor="bg-teal-700"
                            iconPosition="left"
                            icon={<Filter className="w-4 h-4" />}
                            className="h-12 mb-4 hover:bg-teal-700/90 hover:opacity-80 cursor-pointer">
                            Filter
                        </PrimaryButton>
                    </Link>
                    <Link to={"/dashboard/create-study-plan"}>
                        <PrimaryButton
                            bgType="solid"
                            bgColor="bg-blue-btn-1"
                            iconPosition="left"
                            icon={<Plus className="w-4 h-4" />}
                            className="h-12 mb-4 hover:bg-blue-btn-1 hover:opacity-80 cursor-pointer">
                            Create new plan
                        </PrimaryButton>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-9">
                <MyStudyPlanCard />
                <MyStudyPlanCard />
            </div>
        </div>
    )
}

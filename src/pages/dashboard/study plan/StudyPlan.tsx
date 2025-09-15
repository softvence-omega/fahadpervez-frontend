import DashboardHeading from "@/components/reusable/DashboardHeading";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import { BookOpenText, CalendarDays, Clock, Plus, Target } from "lucide-react";
import { Link } from "react-router-dom";
import TestOverviewCard from '@/components/reusable/TestOverviewCard';

export default function StudyPlan() {
    return (
        <div>
            <div className="flex justify-between items-center">
                <DashboardHeading
                    title="Medical Study Platform"
                    titleSize="text-xl"
                    titleColor="text-black"
                    description="Welcome back, Omar! Ready to continue your Gastroenterology preparation?"
                    descColor="text-slate-700"
                    className="mt-12 mb-8"
                />
                <div className="flex items-center gap-6">
                    <Link to={"/dashboard/my-plan"}>
                        <PrimaryButton
                            bgType="solid"
                            bgColor="bg-teal-700"
                            className="h-12 mb-4 hover:bg-teal-700/90 hover:opacity-80 cursor-pointer">
                            My Plan
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <TestOverviewCard
                    icon={Clock}
                    iconColor="text-blue-700"
                    iconBg="bg-blue-100"
                    topText="1.2 hr"
                    bottomText="Today's Study"
                />
                <TestOverviewCard
                    icon={Target}
                    iconColor="text-green-700"
                    iconBg="bg-[#DCFCE7]"
                    topText="60%"
                    bottomText="Avg.Score"
                />
                <TestOverviewCard
                    icon={BookOpenText}
                    iconColor="text-yellow-600"
                    iconBg="bg-[#FFEDD4]"
                    topText="2/5"
                    bottomText="Topic Complete"
                />
                <TestOverviewCard
                    icon={CalendarDays}
                    iconColor="text-purple-700"
                    iconBg="bg-[#F3E8FF]"
                    topText="10"
                    bottomText="Days to Exam"
                />
            </div>

            <div>
                <form action=""></form>
            </div>
        </div>
    )
}

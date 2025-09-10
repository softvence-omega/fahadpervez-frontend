import DashboardHeading from "@/components/reusable/DashboardHeading";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function AllGeneratedQuiz() {
    return (
        <div>
            <div className="flex items-center gap-3">
                <Link to={'/dashboard/quiz-page'} className="mb-7">
                    <ArrowLeft /></Link>
                <DashboardHeading
                    title="Generated Quiz"
                    titleSize="text-xl"
                    description="Create custom quizzes from your images and videos using AI"
                    descColor="text-[#4A5565]"
                    descSize="text-sm"
                    className="mt-12 mb-12 space-y-1"
                />
            </div>
        </div>
    )
}

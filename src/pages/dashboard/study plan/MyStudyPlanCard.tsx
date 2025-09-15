import PrimaryButton from "@/components/reusable/PrimaryButton";
import { BookOpen, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export default function MyStudyPlanCard() {
    return (
        <div className="p-7 border border-slate-300 rounded-[8px]">
            <div className="flex justify-between items-start gap-4">
                <h3 className="text-lg font-semibold text-slate-800">Gastroenterology & Hepatology Block Exam</h3>
                <p className="text-lg text-white font-semibold bg-green-700 rounded-full pt-0.5 px-2.5">Active</p>
            </div>
            <p className="text-slate-600 mt-3">Exam : 04/09/25</p>
            <p className="flex items-center gap-3 text-slate-600 mt-12"><Clock /> 3 hours daily</p>
            <p className="flex items-center gap-3 text-slate-600 mt-5"><BookOpen /> 02 topic</p>
            <div className="flex items-center gap-2 mt-3">
                <p className="border border-slate-300 rounded-full text-sm text-[#0A0A0A]  pt-0.5 px-2.5">Liver & Biliary</p>
                <p className="border border-slate-300 rounded-full text-sm text-[#0A0A0A]  pt-0.5 px-2.5">Liver & Biliary</p>
            </div>

            <Link to={`/dashboard/weekly-plan/${3}`}>
                <PrimaryButton className="w-full mt-7">View Plan</PrimaryButton>
            </Link>
        </div>
    )
}

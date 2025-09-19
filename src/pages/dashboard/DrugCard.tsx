/* eslint-disable @typescript-eslint/no-explicit-any */
import { BreadcrumbItem } from "@/components/dashboard/gamified-learning/types";
import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
import DashboardHeading from "@/components/reusable/DashboardHeading";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import { ClipboardList, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { FaBookmark, FaShare } from "react-icons/fa";
import img1 from "@/assets/dashboard/AI Recommendation.png"
import { Link } from "react-router-dom";

// Dummy JSON (simulate API)
const dummyData: any = {
    name: "Insulin Glargine",
    subtitle: "AI-Generated Drug Card",
    basicInfo: {
        generic: "Insulin Glargine",
        brands: "Lantus, Toujeo, Basaglar",
        class: "Long-acting Insulin",
    },
    pharmacokinetics: {
        onset: "1-2 hours",
        peak: "No pronounced peak",
        duration: "20-24 hours",
    },
    indications: [
        "Type 1 Diabetes Mellitus",
        "Type 2 Diabetes Mellitus (glycemic control)",
    ],
    mechanism:
        "Recombinant human insulin analog that forms microprecipitates after subcutaneous injection, leading to slow and prolonged release with no pronounced peak. Binds to insulin receptors to lower blood glucose.",
    adverseEffects: [
        "Hypoglycemia",
        "Injection site reactions",
        "Lipodystrophy",
    ],
    nursingConsiderations: [
        "Administer once daily at the same time each day (evening is common)",
        "Do NOT mix with other insulins or solutions",
        "Do NOT administer IV",
        "Monitor blood glucose regularly",
        "Educate patient on symptoms of hypoglycemia and management",
        "Assess injection sites",
    ],
    relatedInsulin: [
        { name: "Insulin Lispro", type: "Rapid-acting" },
        { name: "NPH Insulin", type: "Intermediate-acting" },
        { name: "Regular Insulin", type: "Short-acting" },
    ],
    aiRecommendations: [
        {
            title: "Skill Review Needed",
            desc: "Review 'Subcutaneous Injection Technique' video tutorial",
            action: "Take Quiz →",
        },
        {
            title: "Case Study",
            desc: "Apply knowledge in DKA management scenario",
            action: "Start Case →",
        },
    ],
};

export default function DrugCard() {
    const breadcrumbs: BreadcrumbItem[] = [
        { name: "Dashboard", link: "/dashboard" },
        { name: "OSCE Station", link: "/dashboard/osce" },
    ];

    const [drugData, setDrugData] = useState<any>(null);

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setDrugData(dummyData);
        }, 500);
    }, []);

    if (!drugData) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="my-6">
            <Breadcrumb breadcrumbs={breadcrumbs} />
            <div className="flex flex-col md:flex-row justify-between items-center mb-5 text-center md:text-left gap-6">
                <div >
                    <DashboardHeading
                        title="Search Drug"
                        titleSize="text-xl"
                        titleColor="text-[#000000]"
                        description="Search by generic name, brand name, or drug class"
                        descColor="text-slate-700"
                        descFont="text-sm"
                    />
                </div>
                <Link to={"/dashboard/your-drug-cards"}>
                    <PrimaryButton>
                        View Cards
                    </PrimaryButton>
                </Link>
            </div>
            <div className="relative">
                <input
                    type="text"
                    placeholder="e,g cardiovascular"
                    className="w-full h-11 pl-10 pr-4 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
            </div>

            <div className="max-w-6x mx-auto grid lg:grid-cols-3 gap-6 mt-10">
                {/* Left Section */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow p-6 space-y-6">
                    {/* Title */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">{drugData.name}</h1>
                            <p className="text-sm text-gray-500">{drugData.subtitle}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaBookmark className="text-[#4B5563] text-xl cursor-pointer" />
                            <FaShare className="text-[#4B5563] text-xl cursor-pointer" />
                        </div>
                    </div>

                    {/* Basic Info */}
                    <section className="border-l-4 border-blue-600 pl-3">
                        <h2 className="font-semibold text-blue-600 flex items-center gap-2">
                            Basic Information
                        </h2>
                        <ul className="mt-2 text-gray-700 text-sm space-y-1">
                            <li>Generic Name: {drugData.basicInfo.generic}</li>
                            <li>Brand Names: {drugData.basicInfo.brands}</li>
                            <li>Drug Class: {drugData.basicInfo.class}</li>
                        </ul>
                    </section>

                    {/* Pharmacokinetics */}
                    <section className="border-l-4 border-purple-600 pl-3">
                        <h2 className="font-semibold text-purple-600 flex items-center gap-2">
                            Pharmacokinetics
                        </h2>
                        <ul className="mt-2 text-gray-700 text-sm space-y-1">
                            <li>Onset: {drugData.pharmacokinetics.onset}</li>
                            <li>Peak: {drugData.pharmacokinetics.peak}</li>
                            <li>Duration: {drugData.pharmacokinetics.duration}</li>
                        </ul>
                    </section>

                    {/* Indications */}
                    <section className="border-l-4 border-green-600 pl-3">
                        <h2 className="font-semibold text-green-600">Indications</h2>
                        <ul className="list-disc list-inside text-sm mt-2 text-gray-700 space-y-1">
                            {drugData.indications.map((ind: any, i: number) => (
                                <li key={i}>{ind}</li>
                            ))}
                        </ul>
                    </section>

                    {/* Mechanism */}
                    <section className="border-l-4 border-orange-600 pl-3">
                        <h2 className="font-semibold text-orange-600">Mechanism of Action</h2>
                        <p className="text-sm mt-2 text-gray-700">{drugData.mechanism}</p>
                    </section>

                    {/* Adverse Effects */}
                    <section className="border-l-4 border-red-600 pl-3">
                        <h2 className="font-semibold text-red-600">Key Adverse Effects</h2>
                        <ul className="list-disc list-inside text-sm mt-2 text-gray-700 space-y-1">
                            {drugData.adverseEffects.map((effect: any, i: number) => (
                                <li key={i}>{effect}</li>
                            ))}
                        </ul>
                    </section>

                    {/* Nursing Considerations */}
                    <section className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                        <h2 className="font-semibold text-yellow-700 flex items-center gap-2">
                            <ClipboardList size={18} /> Nursing Considerations
                        </h2>
                        <ul className="list-disc list-inside text-sm mt-2 text-[#854D0E] space-y-1">
                            {drugData.nursingConsiderations.map((item: any, i: number) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </section>
                </div>

                {/* Right Section */}
                <div className="space-y-6">
                    {/* Related Insulin Types */}
                    <div className="bg-white rounded-xl shadow p-6">
                        <h2 className="text-lg font-semibold text-[#111827] mb-3">
                            Related Insulin Types
                        </h2>
                        <div className="space-y-2">
                            {drugData.relatedInsulin.map((ins: any, i: number) => (
                                <div
                                    key={i}
                                    className="p-3 rounded-lg bg-[#F9FAFB] hover:bg-gray-100 transition"
                                >
                                    <p className="font-medium text-gray-700">{ins.name}</p>
                                    <p className="text-sm text-gray-500">{ins.type}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* AI Recommendations */}
                    <div className="bg-gradient-to-r from-[#FAF5FF] to-[#FDF2F8] rounded-xl shadow p-6">
                        <div className="flex items-center gap-3">
                            <img src={img1} alt="" className="mb-3 bg-[#F3E8FF] p-3 px-2 rounded-lg" />
                            <h2 className="font-semibold text-[#581C87] mb-3">
                                AI Recommendations
                            </h2>
                        </div>
                        <div className="space-y-3">
                            {drugData.aiRecommendations.map((rec: any, i: number) => (
                                <div
                                    key={i}
                                    className="p-3 bg-white rounded-lg border border-[#E9D5FF] shadow-sm hover:shadow-md transition"
                                >
                                    <h3 className="font-medium text-[#6B21A8]">{rec.title}</h3>
                                    <p className="text-sm text-[#7E22CE]">{rec.desc}</p>
                                    <button className="mt-2 text-sm text-[#9333EA] font-semibold hover:underline">
                                        {rec.action}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

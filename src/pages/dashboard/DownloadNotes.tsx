import DashboardHeading from "@/components/reusable/DashboardHeading";
import NoteCard from "@/components/reusable/NoteCard";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import { Plus, Search } from "lucide-react";
import { useState } from "react";
import RecentDownloadsTab from "./RecentDownloadsTab";

export default function DownloadNotes() {

    const [activeTab, setActiveTab] = useState("allNotes");

    const tabs = [
        { id: "allNotes", label: "All Notes" },
        { id: "generatedNotes", label: "Generated Notes" },
        { id: "recentDownloads", label: "Recent Downloads" },
    ];

    return (
        <div>
            <DashboardHeading
                title="High-Yield Medical Study Notes"
                description="Download concise, topic-focused PDF notes for anatomy, pathology, pharmacology, and more."
                className="mt-12 mb-8 space-y-2"
            />

            <div className="flex justify-between items-center">
                <div className="flex items-center gap-6">
                    {/* Search Input with Icon */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by condition or keyword"
                            className="w-[450px] h-12 pl-10 pr-4 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                    </div>

                    {/* Dropdown */}
                    <select
                        className="h-12 px-4 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    >
                        <option value="cardiology">Cardiology</option>
                        <option value="neurology">Neurology</option>
                        <option value="orthopedics">Orthopedics</option>
                    </select>
                </div>
                <PrimaryButton
                    bgType="solid"
                    iconPosition="left"
                    bgColor="bg-[var(--color-blue-btn-1)]"
                    icon={<Plus className="w-4 h-4" />}
                    className="h-10 hover:bg-[var(--color-blue-btn-1)] hover:opacity-80 cursor-pointer">

                    Start Case
                </PrimaryButton>
            </div>


            {/* Tab  */}
            <div>
                <div className="w-full">
                    {/* Tab Buttons */}
                    <div className="flex  mt-12 mb-6">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex-1 py-2 text-start text-xl font-semibold leading-7 transition-colors duration-200
              ${activeTab === tab.id
                                        ? "border-b-2 border-blue-500 text-blue-600"
                                        : "text-gray-500 hover:text-blue-500"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="mt-4 p-4 bg-white shadow rounded-lg">
                        {activeTab === "allNotes" && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                <NoteCard
                                    tag="Heart Sounds"
                                    title="Types of Shock"
                                    description="Shock is a life-threatening condition where tissue perfusion is inadequate to meet cellular demands, leading to cellular dysfunction and organ failure."
                                    chapter={12}
                                    pages={12}
                                    downloads={45}
                                    onViewNotes={() => console.log("Viewing notes")}
                                    onDownload={() => console.log("Downloading PDF")}
                                />

                                <NoteCard
                                    tag="Heart Sounds"
                                    title="Types of Shock"
                                    description="Shock is a life-threatening condition where tissue perfusion is inadequate to meet cellular demands, leading to cellular dysfunction and organ failure."
                                    chapter={12}
                                    pages={12}
                                    // downloads={45}
                                    showDownload={false}
                                    onViewNotes={() => console.log("Viewing notes")}
                                />
                                <NoteCard
                                    tag="Heart Sounds"
                                    title="Types of Shock"
                                    description="Shock is a life-threatening condition where tissue perfusion is inadequate to meet cellular demands, leading to cellular dysfunction and organ failure."
                                    chapter={12}
                                    pages={12}
                                    // downloads={45}
                                    showDownload={false}
                                    onViewNotes={() => console.log("Viewing notes")}
                                />
                            </div>
                        )}
                        {activeTab === "generatedNotes" && (
                            <p className="text-gray-700">
                                Here you'll find **Generated Notes** of the product.
                            </p>
                        )}
                        {activeTab === "recentDownloads" && (
                            <div>
                                <RecentDownloadsTab />
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div>
    )
}

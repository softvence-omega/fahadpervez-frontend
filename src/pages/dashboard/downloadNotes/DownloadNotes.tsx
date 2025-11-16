import DashboardHeading from "@/components/reusable/DashboardHeading";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import { Plus, Search } from "lucide-react";
import { useState } from "react";
import RecentDownloadsTab from "./RecentDownloadsTab";
import { Link } from "react-router-dom";
import AllNotesTab from "./AllNotesTab";
import GeneratedNotes from "./GeneratedNotes";
import { useGetSingleUserNotesQuery } from "@/store/features/note/NoteAPI";

export default function DownloadNotes() {
  const [activeTab, setActiveTab] = useState("allNotes");

  const tabs = [
    { id: "allNotes", label: "All Notes" },
    { id: "generatedNotes", label: "Generated Notes" },
    { id: "recentDownloads", label: "Recent Downloads" },
  ];

  const { data: noteResponse, isLoading: noteLoading } = useGetSingleUserNotesQuery({});
  const noteData = noteResponse?.data;
  console.log(noteData);

  return (
    <div>
      <DashboardHeading
        title="High-Yield Medical Study Notes"
        description="Download concise, topic-focused PDF notes for anatomy, pathology, pharmacology, and more."
        className="mt-12 mb-8 space-y-2"
      />

      <div className="md:flex gap-5 space-y-3 justify-between items-center">
        <div className="flex items-center gap-6">
          {/* Search Input with Icon */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by condition or keyword"
              className="w-full md:w-[450px] h-12 pl-10 pr-4 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
          </div>

          {/* Dropdown */}
          <select className="h-12 px-4 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
            <option value="cardiology">Cardiology</option>
            <option value="neurology">Neurology</option>
            <option value="orthopedics">Orthopedics</option>
          </select>
        </div>
        <Link to={"/dashboard/create-note"}>
          <PrimaryButton
            bgType="solid"
            iconPosition="left"
            bgColor="bg-blue-btn-1"
            icon={<Plus className="w-4 h-4" />}
            className="h-12 mb-4 hover:bg-blue-btn-1 hover:opacity-80 cursor-pointer"
          >
            Create Notes
          </PrimaryButton>
        </Link>
      </div>

      {/* Tab  */}
      <div>
        <div>
          {/* Tab Buttons */}
          <div className="flex gap-4 my-6 md:my-8">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={` py-1 text-start text-lg font-semibold leading-7 transition-colors duration-200 hover:cursor-pointer
              ${
                activeTab === tab?.id
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-blue-500"
              }`}
              >
                {tab?.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="">
            {activeTab === "allNotes" && <AllNotesTab notes={noteData} loading={noteLoading} />}
            {activeTab === "generatedNotes" && <GeneratedNotes />}
            {activeTab === "recentDownloads" && (
              <div>
                <RecentDownloadsTab />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

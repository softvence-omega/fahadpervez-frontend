import React, { useState } from "react";
import StatsCard from "@/components/admin_Content & Resource_Component/QuestionBank/StatsCard";
import SearchBar from "@/components/admin_Content & Resource_Component/QuestionBank/SearchBar";
import ButtonWithIcon from "@/common/button/ButtonWithIcon";
import { NotepadTextIcon, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import ResourceCard from "@/components/admin_Content & Resource_Component/Career Resource/ResourceCard";
import Upload_New_Resource from "./Upload_New_Resource";
import CommonSpace from "@/common/space/CommonSpace";

const Career_Resource_Homepage: React.FC = () => {
  const [showUploadPage, setShowUploadPage] = useState(false);

  if (showUploadPage) {
    return <Upload_New_Resource onBack={() => setShowUploadPage(false)} />;
  }

  return (
    <div className="space-y-6 w-full">
      {/* ✅ Stats Section */}
      <CommonSpace>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 justify-items-center sm:justify-items-start gap-4 sm:gap-6">
          <StatsCard
            title="Total Notes"
            value={10}
            subtitle="OSCE Station Published"
            icon={<NotepadTextIcon className="w-6 h-6 text-orange-600" />}
          />
          <StatsCard
            title="Published"
            value={5}
            subtitle="Cardiovascular notes Published"
            icon={<NotepadTextIcon className="w-6 h-6 text-orange-600" />}
          />
          <StatsCard
            title="Last Upload"
            value={1}
            subtitle="Cardiovascular notes 2025-09-12"
            icon={<NotepadTextIcon className="w-6 h-6 text-orange-600" />}
          />
          <StatsCard
            title="Drafts"
            value={3}
            subtitle="Unpublished Resources"
            icon={<NotepadTextIcon className="w-6 h-6 text-orange-600" />}
          />
        </div>
      </CommonSpace>

      {/* ✅ Search + Add Button */}
      <div className="flex flex-col sm:flex-row w-full justify-between items-stretch sm:items-center gap-3 sm:gap-4">
        <div className="flex-1 w-full min-w-0">
          <SearchBar
            placeholder="Search Resources"
            onChange={(val) => console.log(val)}
          />
        </div>

        <div className="w-full sm:w-auto mt-2 sm:mt-0">
          <ButtonWithIcon
            icon={Plus}
            onClick={() => setShowUploadPage(true)}
            className="w-full sm:w-auto bg-gradient-to-tr from-[#0076F5] to-[#0058B8] hover:from-[#0069DB] hover:to-[#004C9E] text-white font-medium px-4 py-2 sm:px-5 sm:py-2.5 rounded-md text-sm sm:text-base flex items-center justify-center gap-2 transition-all duration-200"
          >
            Add New Resource
          </ButtonWithIcon>
        </div>
      </div>

      {/* ✅ Header with View All */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
        <h2 className="text-lg sm:text-xl font-semibold">Resources</h2>
        <Link to="/upload-content/all_osce_stations">
          <button className="text-blue-600 hover:underline p-0 text-sm sm:text-base">
            View All
          </button>
        </Link>
      </div>

      {/* ✅ Resources Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {[...Array(6)].map((_, i) => (
          <ResourceCard
            key={i}
            title={`Sample Resource ${i + 1}`}
            description="This is a sample description for the resource."
            tags={["Residency Disease", "USA"]}
            downloads={i * 10}
            published={i % 2 === 0}
          />
        ))}
      </div>
    </div>
  );
};

export default Career_Resource_Homepage;

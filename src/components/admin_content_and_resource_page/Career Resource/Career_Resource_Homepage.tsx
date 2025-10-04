import React, { useState } from "react";
import StatsCard from "@/components/admin_Content & Resource_Component/QuestionBank/StatsCard";
import SearchBar from "@/components/admin_Content & Resource_Component/QuestionBank/SearchBar";
import { Button } from "../../ui/button";
import ButtonWithIcon from "@/common/button/ButtonWithIcon";
import { NotepadTextIcon, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import ResourceCard from "@/components/admin_Content & Resource_Component/Career Resource/ResourceCard";
import Upload_New_Resource from "./Upload_New_Resource";

const Career_Resource_Homepage: React.FC = () => {
  const [showUploadPage, setShowUploadPage] = useState(false);

  // If upload page should be shown, render it instead
  if (showUploadPage) {
    return <Upload_New_Resource onBack={() => setShowUploadPage(false)} />;
  }

  // Otherwise render the homepage
  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* ✅ Stats Section */}
      <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-4">
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
          subtitle="Cardiovascular notes  2025-09-12"
          icon={<NotepadTextIcon className="w-6 h-6 text-orange-600" />}
        />
      </div>

      {/* ✅ Search + Add Button */}
      <div className="mt-4 flex flex-col sm:flex-row w-full gap-2 sm:gap-4 items-center">
        {/* Search */}
        <div className="flex-1 w-full min-w-0">
          <SearchBar
            placeholder="Search Question Bank"
            onChange={(val) => console.log(val)}
          />
        </div>

        {/* Add Button */}
        <div className="w-full sm:w-auto mt-2 sm:mt-0">
          <ButtonWithIcon
            icon={Plus}
            onClick={() => setShowUploadPage(true)}
            className="w-full sm:w-auto bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md text-sm sm:text-base"
          >
            Add New Notes
          </ButtonWithIcon>
        </div>
      </div>

      {/* ✅ Header with View All */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
        <h2 className="text-lg sm:text-xl font-semibold">Notes</h2>
        <Link to="/upload-content/all_osce_stations">
          <Button variant="link" className="p-0 text-sm sm:text-base">
            View All
          </Button>
        </Link>
      </div>

      {/* ✅ Notes List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <ResourceCard
          title="Sample Resource"
          description="This is a sample description for the resource."
          tags={["Residency Disease", "USA"]}
          downloads={42}
          published={true}
        />
        <ResourceCard
          title="Sample Resource"
          description="This is a sample description for the resource."
          tags={["tag1", "tag2"]}
          downloads={0}
          published={true}
        />
        <ResourceCard
          title="Sample Resource"
          description="This is a sample description for the resource."
          tags={["tag1", "tag2"]}
          downloads={42978}
          published={false}
        />
      </div>
    </div>
  );
};

export default Career_Resource_Homepage;

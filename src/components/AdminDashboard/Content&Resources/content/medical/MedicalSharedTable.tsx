import { useState } from "react";
import ContentTable from "./ContentTable";
import { ContentCategory } from "./data/data";
import SearchWithTabs from "./examMode/SearchWithTabs";

export const contentTabs: ContentCategory[] = [
  "MCQ",
  "Flashcard",
  "ClinicalCase",
  "OSCE",
  "Notes",
];
const MedicalSharedTable = () => {
  const [activeTab, setActiveTab] = useState("MCQ");
  return (
    <div className="w-full flex flex-col gap-6">
      <SearchWithTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div>
        {contentTabs.map(
          (tab) => activeTab === tab && <ContentTable key={tab} type={tab} />
        )}
      </div>
    </div>
  );
};

export default MedicalSharedTable;

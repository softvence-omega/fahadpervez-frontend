import CommonSpace from "@/common/space/CommonSpace";
import DashboardTopSection from "@/components/AdminDashboard/reuseable/DashboardTopSection";
import Tabs from "@/components/AdminDashboard/reuseable/Tabs";
import { useState } from "react";
import ExamMode from "./examMode/ExamMode";
import StudyMode from "./studyMode/StudyMode";

const MedicalStudent = () => {
  const [selectMode, setSelectMode] = useState("study");
  const tabs = [
    { label: "Study Mode", value: "study" },
    { label: "Exam Mode", value: "exam" },
  ];
  return (
    <div>
      <div>
        {selectMode === "study" ? (
          <DashboardTopSection
            title="Medical Students Content Inventory"
            description="Manage and organize content for Medical Students."
            buttonText="Add Content"
          />
        ) : (
          <DashboardTopSection
            title="Medical Students Content Inventory"
            description="Manage and organize content for Medical Students."
            buttonText="Add Question"
          />
        )}
      </div>
      <CommonSpace>
        <Tabs tabs={tabs} active={selectMode} onChange={setSelectMode} />
      </CommonSpace>

      <div>{selectMode === "study" && <StudyMode />}</div>
      <div>{selectMode === "exam" && <ExamMode />}</div>
    </div>
  );
};

export default MedicalStudent;

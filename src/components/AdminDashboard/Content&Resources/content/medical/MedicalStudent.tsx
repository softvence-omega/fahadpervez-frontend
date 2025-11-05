import CommonSpace from "@/common/space/CommonSpace";
import DashboardTopSection from "@/components/AdminDashboard/reuseable/DashboardTopSection";
import Tabs from "@/components/AdminDashboard/reuseable/Tabs";
import { showAddContent } from "@/store/features/adminDashboard/staticContent/staticContentSlice";
import { AppDispatch } from "@/store/store";
import { useState } from "react";
import { useDispatch } from "react-redux";
import ExamMode from "./examMode/ExamMode";
import StudyMode from "./studyMode/StudyMode";

const MedicalStudent = () => {
  const Dispatch = useDispatch<AppDispatch>();

  const [selectMode, setSelectMode] = useState("study");
  const tabs = [
    { label: "Study Mode", value: "study" },
    { label: "Exam Mode", value: "exam" },
  ];
  return (
    <div>
      <div>
        <DashboardTopSection
          title="Medical Students Content Inventory"
          description="Manage and organize content for Medical Students."
          buttonText="Add Content"
          action={() => Dispatch(showAddContent())}
        />
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

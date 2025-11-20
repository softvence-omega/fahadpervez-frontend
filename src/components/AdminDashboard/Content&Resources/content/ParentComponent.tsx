import CommonSpace from "@/common/space/CommonSpace";
import DashboardTopSection from "@/components/AdminDashboard/reuseable/DashboardTopSection";
import Tabs from "@/components/AdminDashboard/reuseable/Tabs";
import { useAppSelector } from "@/store/hook";
import { RootState } from "@/store/store";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ExamMode from "./medical/examMode/ExamMode";
import StudyMode from "./medical/studyMode/StudyMode";

const ParentComponent = () => {
  const [selectMode, setSelectMode] = useState("study");
  const tabs = [
    { label: "Study Mode", value: "study" },
    { label: "Exam Mode", value: "exam" },
  ];
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const studentTypeName = useAppSelector(
    (state: RootState) => state.staticContent.studentType
  );

  const outletVisible = pathname.includes("create-content");
  return (
    <>
      {outletVisible ? (
        <Outlet />
      ) : (
        <div>
          <div>
            <DashboardTopSection
              title={`${studentTypeName ?? ""} Content Inventory`}
              description={`Manage and organize content for ${
                studentTypeName ?? ""
              }`}
              buttonText="Add Content"
              action={() => {
                navigate("create-content");
              }}
            />
          </div>
          <CommonSpace>
            <Tabs tabs={tabs} active={selectMode} onChange={setSelectMode} />
          </CommonSpace>

          <div>{selectMode === "study" && <StudyMode />}</div>
          <div>{selectMode === "exam" && <ExamMode />}</div>
        </div>
      )}
    </>
  );
};

export default ParentComponent;

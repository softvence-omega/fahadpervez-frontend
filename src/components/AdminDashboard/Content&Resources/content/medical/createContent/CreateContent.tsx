import CommonSpace from "@/common/space/CommonSpace";
import DashboardTopSection from "@/components/AdminDashboard/reuseable/DashboardTopSection";
import Tabs from "@/components/AdminDashboard/reuseable/Tabs";
import { RootState } from "@/store/store";
import { useState } from "react";
import { useSelector } from "react-redux";
import { tabs } from "../examMode/SearchWithTabs";
import StepIndicator from "../StepIndicator";
import CreateMCQStudy from "../studyMode/CreateMCQStudy";
import ContentSelectionForm from "./ContentSelectionForm";
export const steps = [
  { id: 1, label: "Select Hierarchy" },
  { id: 2, label: "Add Content" },
];
const CreateContent = () => {
  const [activeTab, setActiveTab] = useState("MCQ");
  const { addMCQ } = useSelector((state: RootState) => state.staticContent);
  const [breadcrumb, setBreadcrumb] = useState("");

  const handleBreadcrumb = (text: string) => {
    setBreadcrumb(text);
  };

  const activeStep = 1;

  return (
    <div>
      {addMCQ ? (
        <CreateMCQStudy
          breadcrumb={breadcrumb}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      ) : (
        <>
          <DashboardTopSection
            title="Add New Content - Medical Students"
            description="Step 1 of 2 - Study Mode"
            descriptionClassName="!text-[#717182]"
          />
          <CommonSpace>
            <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
          </CommonSpace>
          <StepIndicator steps={steps} activeStep={activeStep} />
          <CommonSpace>
            <div>
              <ContentSelectionForm
                handleBreadcrumb={handleBreadcrumb}
                activeTab={activeTab}
              />
            </div>
          </CommonSpace>
        </>
      )}
    </div>
  );
};

export default CreateContent;

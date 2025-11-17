import CommonSpace from "@/common/space/CommonSpace";
import DashboardTopSection from "@/components/AdminDashboard/reuseable/DashboardTopSection";
import Tabs from "@/components/AdminDashboard/reuseable/Tabs";
import { useState } from "react";
import { tabs } from "../../MultipleTap";
import StepIndicator from "../StepIndicator";
import CreateMCQStudy from "../studyMode/CreateMCQStudy";
import ContentSelectionForm from "./ContentSelectionForm";
export const steps = [
  { id: 1, label: "Select Hierarchy" },
  { id: 2, label: "Add Content" },
];

const CreateContent = () => {
  const [activeTab, setActiveTab] = useState("MCQ");
  const [breadcrumb, setBreadcrumb] = useState("");

  const handleBreadcrumb = (text: string) => {
    setBreadcrumb(text);
  };

  const activeStep = 1;

  const [isMcqCreation, setIsMcqCreation] = useState(false);

  return (
    <div>
      {isMcqCreation ? (
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
                setIsMcqCreation={setIsMcqCreation}
              />
            </div>
          </CommonSpace>
        </>
      )}
    </div>
  );
};

export default CreateContent;

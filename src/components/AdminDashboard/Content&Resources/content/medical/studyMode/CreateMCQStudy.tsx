import CommonHeader from "@/common/header/CommonHeader";
import CommonSpace from "@/common/space/CommonSpace";
import DashboardTopSection from "@/components/AdminDashboard/reuseable/DashboardTopSection";
import Tabs from "@/components/AdminDashboard/reuseable/Tabs";
import ToggleButtonGroup from "@/components/AdminDashboard/reuseable/ToggleButtonGroup";
import { useState } from "react";
import StepIndicator from "../StepIndicator";
import { steps } from "../createContent/CreateContent";

import { tabs } from "../../MultipleTap";
import AddBulkMCQ from "./AddBulkMCQ";
import AddMCQForm from "./AddMCQForm";

interface CreateMCQStudyProps {
  breadcrumb: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const activeStep = 2;
const CreateMCQStudy: React.FC<CreateMCQStudyProps> = ({
  breadcrumb,
  activeTab,
  setActiveTab,
}) => {
  const [mode, setMode] = useState<"manual" | "bulk">("manual");
  return (
    <div>
      <DashboardTopSection
        title="Add Mcq Content"
        description={breadcrumb}
        descriptionClassName="!text-[#717182]"
      />
      <CommonSpace>
        <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
      </CommonSpace>

      <StepIndicator steps={steps} activeStep={activeStep} />
      <CommonSpace>
        <CommonHeader className="!text-2xl !font-arial !leading-4">
          Add MCQ Content
        </CommonHeader>
        <CommonHeader className="mt-3">
          {breadcrumb.split("→")[0].trim()}
        </CommonHeader>
        <div className="py-10">
          <ToggleButtonGroup
            options={[
              { label: "Manual Upload", value: "manual" },
              { label: "Bulk Upload", value: "bulk" },
            ]}
            active={mode}
            onChange={setMode}
          />
        </div>

        {mode === "manual" ? <AddMCQForm /> : <AddBulkMCQ />}
      </CommonSpace>
    </div>
  );
};

export default CreateMCQStudy;

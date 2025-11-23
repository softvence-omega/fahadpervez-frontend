import CommonSpace from "@/common/space/CommonSpace";
import DashboardTopSection from "@/components/AdminDashboard/reuseable/DashboardTopSection";
import StepIndicator from "../medical/StepIndicator";
import { steps } from "../medical/createContent/CreateContent";

import React from "react";
import ActionButtons from "../ActionButtons";

import CommonHeader from "@/common/header/CommonHeader";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Examiner from "./Examiner";
import OsceEditor from "./OsceEditor";
import UrlInput from "./UrlInput";
import VideoInput from "./VideoInput";

interface CreateMCQStudyProps {
  breadcrumb: string;
}

const inputClass = {
  label: "block text-sm font-normal text-[#020617] font-inter mb-2",
  input:
    "w-full border border-[#CBD5E1] bg-white rounded-md p-3 outline-none text-[#94A3B8] text-xs",
  error: "text-red-500 text-sm mt-1",
};

const activeStep = 2;

const OSCEUpload: React.FC<CreateMCQStudyProps> = ({ breadcrumb }) => {
  const selectFormData = useSelector(
    (state: RootState) => state.staticContent.formData
  );

  const navigate = useNavigate();
  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <form>
      <DashboardTopSection
        title="Add OSCE Content"
        description={breadcrumb}
        descriptionClassName="!text-[#717182]"
      />

      <CommonSpace>
        <StepIndicator steps={steps} activeStep={activeStep} />
      </CommonSpace>
      <div className="space-y-6">
        <div className="space-y-6 bg-white p-6">
          <CommonHeader>Basic Information</CommonHeader>
          <div>
            <label className={inputClass.label}>Name</label>
            <input
              className={inputClass.input}
              placeholder="Cardiovascular Examination "
            />
          </div>
          <div>
            <label className={inputClass.label}>Description</label>
            <textarea
              className={inputClass.input}
              placeholder="Cardiovascular Examination "
            />
          </div>
          <div>
            <label className={inputClass.label}>Time Limit</label>
            <input className={inputClass.input} placeholder="10 " />
          </div>
        </div>
        <div className="space-y-6 bg-white p-6  ">
          <div>
            <label className={inputClass.label}>Scenario:</label>
            <textarea
              className={inputClass.input}
              placeholder="You are asked to perform a focused cardiovascular examination on a 45-year- old patient presenting with shortness of breath. "
            />
          </div>
        </div>
        <OsceEditor title="Candidate Instruction" />
        <OsceEditor title="Patient Script" />
        <Examiner />
        <VideoInput />
        <UrlInput />
      </div>
      <div className="pb-6">
        <ActionButtons
          onCancel={() => handleCancel()}
          importLabel="Save & Publish OSCE"
          onSavePublish={() => {}}
        />
      </div>
    </form>
  );
};

export default OSCEUpload;

import CommonSpace from "@/common/space/CommonSpace";
import DashboardTopSection from "@/components/AdminDashboard/reuseable/DashboardTopSection";
import Tabs from "@/components/AdminDashboard/reuseable/Tabs";
import {
  ContentType,
  setContentType,
} from "@/store/features/adminDashboard/staticContent/staticContentSlice";
import { useAppDispatch } from "@/store/hook";
import { RootState } from "@/store/store";
import { useState } from "react";
import { useSelector } from "react-redux";
import ClinicalCaseUpload from "../../ClinicalCase/ClinicalCaseUpload";
import FlashCardUpload from "../../FlashCard/FlashCardUpload";
import MCQUpload from "../../MCQ/MCQUpload";
import { tabs } from "../../MultipleTap";
import NotesUpload from "../../Notes/NotesUpload";
import OSCEUpload from "../../OSCE/OSCEUpload";
import StepIndicator from "../StepIndicator";
import ContentSelectionForm from "./ContentSelectionForm";
export const steps = [
  { id: 1, label: "Select Hierarchy" },
  { id: 2, label: "Add Content" },
];

const CreateContent = () => {
  const contentType = useSelector(
    (state: RootState) => state.staticContent.contentType
  );
  const studentTypeName = useSelector(
    (state: RootState) => state.staticContent.studentType
  );
  const dispatch = useAppDispatch();

  const [breadcrumb, setBreadcrumb] = useState("");

  const handleBreadcrumb = (text: string) => {
    setBreadcrumb(text);
  };

  const activeStep = 1;

  const [isContentCreation, setIsContentCreation] = useState(false);

  return (
    <div>
      {isContentCreation ? (
        <div>
          {contentType === "MCQ" && <MCQUpload breadcrumb={breadcrumb} />}
          {contentType === "Flashcard" && (
            <FlashCardUpload breadcrumb={breadcrumb} />
          )}
          {contentType === "ClinicalCase" && (
            <ClinicalCaseUpload breadcrumb={breadcrumb} />
          )}
          {contentType === "OSCE" && <OSCEUpload breadcrumb={breadcrumb} />}
          {contentType === "Notes" && <NotesUpload breadcrumb={breadcrumb} />}
        </div>
      ) : (
        <div>
          <DashboardTopSection
            title={`Add New Content - ${studentTypeName}`}
            description="Step 1 of 2 - Study Mode"
            descriptionClassName="!text-[#717182]"
          />
          <CommonSpace>
            <Tabs
              tabs={tabs}
              active={contentType}
              onChange={(value) =>
                dispatch(setContentType(value as ContentType))
              }
            />
          </CommonSpace>
          <StepIndicator steps={steps} activeStep={activeStep} />
          <CommonSpace>
            <div>
              <ContentSelectionForm
                handleBreadcrumb={handleBreadcrumb}
                setIsContentCreation={setIsContentCreation}
              />
            </div>
          </CommonSpace>
        </div>
      )}
    </div>
  );
};

export default CreateContent;

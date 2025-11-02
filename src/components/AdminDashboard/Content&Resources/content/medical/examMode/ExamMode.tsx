import { useState } from "react";
import MedicalSharedTable from "../MedicalSharedTable";
import CreateExamModal from "./CreateExamModal";
import TableContentForExam from "./TableContentForExam";

const ExamMode = () => {
  const [isCreateQuestionModalOpen, setIsCreateQuestionModalOpen] =
    useState(false);

  return (
    <div>
      <div className=" w-full flex  gap-6">
        <TableContentForExam
          iconAction={() => setIsCreateQuestionModalOpen(true)}
        />
        <MedicalSharedTable />
      </div>

      {isCreateQuestionModalOpen && (
        <CreateExamModal
          setIsQuestionModalOpen={setIsCreateQuestionModalOpen}
        />
      )}
    </div>
  );
};

export default ExamMode;

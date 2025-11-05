import { Exam } from "@/store/features/adminDashboard/ContentResources/MCQ/type/tree";
import { useState } from "react";
import MedicalSharedTable from "../MedicalSharedTable";
import CreateExamModal from "./CreateExamModal";
import TableContentForExam from "./TableContentForExam";

const ExamMode = () => {
  const [isCreateQuestionModalOpen, setIsCreateQuestionModalOpen] =
    useState(false);
  const [initialData, setInitialData] = useState<Exam | null>(null);

  return (
    <div>
      <div className=" w-full flex  gap-6">
        <TableContentForExam
          iconAction={() => setIsCreateQuestionModalOpen(true)}
          setInitialData={setInitialData}
        />
        <MedicalSharedTable />
      </div>

      {isCreateQuestionModalOpen && (
        <CreateExamModal
          setIsQuestionModalOpen={setIsCreateQuestionModalOpen}
          initialData={initialData}
        />
      )}
    </div>
  );
};

export default ExamMode;

import TableContent from "@/components/AdminDashboard/Content&Resources/content/medical/studyMode/TableContentForStudy";
import { useState } from "react";
import MedicalSharedTable from "../MedicalSharedTable";
import AddSubjectModal from "./AddSubjectModal";

const StudyMode = () => {
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);

  return (
    <div>
      <div className=" w-full flex  gap-6">
        <TableContent iconAction={() => setIsSubjectModalOpen(true)} />
        <MedicalSharedTable />
      </div>
      {isSubjectModalOpen && (
        <AddSubjectModal onClose={() => setIsSubjectModalOpen(false)} />
      )}
    </div>
  );
};

export default StudyMode;

import TableContent from "@/components/AdminDashboard/Content&Resources/content/medical/studyMode/TableContentForStudy";
import { useGetStudyModeAllContentQuery } from "@/store/features/adminDashboard/ContentResources/MCQ/mcqApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { useState } from "react";
import MedicalSharedTable from "../MedicalSharedTable";
import AddSubjectModal from "./AddSubjectModal";

export type SelectedNode = {
  subject: string;
  system: string;
  topic: string;
  subtopic: string;
};

const StudyMode = () => {
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<SelectedNode>({
    subject: "",
    system: "",
    topic: "",
    subtopic: "",
  });

  const queryArg =
    selectedNode.subtopic.trim() !== ""
      ? {
          subject: selectedNode.subject.trim(),
          system: selectedNode.system.trim(),
          topic: selectedNode.topic.trim(),
          subtopic: selectedNode.subtopic.trim(),
        }
      : skipToken;

  const { data: shareData } = useGetStudyModeAllContentQuery(queryArg);

  return (
    <div>
      <div className=" w-full flex  gap-6">
        <TableContent
          iconAction={() => setIsSubjectModalOpen(true)}
          setSelectedNode={setSelectedNode}
        />
        <MedicalSharedTable data={shareData} />
      </div>
      {isSubjectModalOpen && (
        <AddSubjectModal onClose={() => setIsSubjectModalOpen(false)} />
      )}
    </div>
  );
};

export default StudyMode;

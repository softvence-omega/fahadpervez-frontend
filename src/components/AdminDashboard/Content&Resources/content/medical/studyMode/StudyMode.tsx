import Pagination from "@/common/custom/Pagination";
import TableContent from "@/components/AdminDashboard/Content&Resources/content/medical/studyMode/TableContentForStudy";
import {
  useGetSingleMcqQuery,
  useGetStudyModeAllContentQuery,
} from "@/store/features/adminDashboard/ContentResources/MCQ/mcqApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { useState } from "react";
import MultipleTap from "../../MultipleTap";
import MedicalSharedTable from "../MedicalSharedTable";
import AddSubjectModal from "./AddSubjectModal";
import McqBankCardForAdmin from "./McqBankCardForAdmin";

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

  const [mcqBankId, setMcqBankId] = useState<string>("");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit = 10;

  const isValidSelection =
    selectedNode.subject.trim() !== "" ||
    selectedNode.system.trim() !== "" ||
    selectedNode.topic.trim() !== "" ||
    selectedNode.subtopic.trim() !== "";

  const queryArg = isValidSelection
    ? {
        subject: selectedNode.subject.trim(),
        system: selectedNode.system.trim(),
        topic: selectedNode.topic.trim(),
        subtopic: selectedNode.subtopic.trim(),
      }
    : skipToken;

  const { data: mcqBank } = useGetStudyModeAllContentQuery(queryArg);

  const singleMcqQueryArg = mcqBankId
    ? { id: mcqBankId, page: currentPage, limit }
    : skipToken;

  const { data: singleMcqBank } = useGetSingleMcqQuery(singleMcqQueryArg, {
    skip: mcqBankId === "",
  });

  const singleMcqBankData = singleMcqBank?.data.mcqs ?? [];
  const totalPages = singleMcqBank?.meta?.totalPages ?? 1;

  // tab state

  const [activeTab, setActiveTab] = useState("MCQ");

  return (
    <div>
      <div className="w-full  flex  items-start gap-6">
        <TableContent
          iconAction={() => setIsSubjectModalOpen(true)}
          setSelectedNode={(node) => {
            setSelectedNode(node);
            setMcqBankId("");
          }}
        />

        <div className="w-full flex flex-col gap-6">
          <div>
            <MultipleTap activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          <div>
            {mcqBankId === "" ? (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-6">
                  {mcqBank?.data?.map((data) => (
                    <McqBankCardForAdmin
                      key={data._id}
                      data={data}
                      setMcqBankId={setMcqBankId}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="w-full flex flex-col gap-4">
                <MedicalSharedTable
                  data={singleMcqBankData}
                  mcqBankId={mcqBankId}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {isSubjectModalOpen && (
        <AddSubjectModal onClose={() => setIsSubjectModalOpen(false)} />
      )}

      {totalPages > 1 && (
        <div className="mt-10 w-full flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}
    </div>
  );
};

export default StudyMode;

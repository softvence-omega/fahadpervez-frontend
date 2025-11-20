import TableContent from "@/components/AdminDashboard/Content&Resources/content/medical/studyMode/TableContentForStudy";
import Tabs from "@/components/AdminDashboard/reuseable/Tabs";
import { useGetStudyModeAllContentQuery } from "@/store/features/adminDashboard/ContentResources/MCQ/mcqApi";
import {
  ContentType,
  setContentType,
} from "@/store/features/adminDashboard/staticContent/staticContentSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { RootState } from "@/store/store";
import { skipToken } from "@reduxjs/toolkit/query";
import { useState } from "react";
import FlashCardBank from "../../bank/FlashCardBank/FlashCardBank";
import MCQBank from "../../bank/MCQBank/MCQBank";
import { tabs } from "../../MultipleTap";
import AddSubjectModal from "./AddSubjectModal";

export type SelectedNode = {
  subject: string;
  system: string;
  topic: string;
  subtopic: string;
};

const StudyMode = () => {
  //manage  key
  const dispatch = useAppDispatch();
  const contentType = useAppSelector(
    (state: RootState) => state.staticContent.contentType
  );
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<SelectedNode>({
    subject: "",
    system: "",
    topic: "",
    subtopic: "",
  });

  const isValidSelection =
    selectedNode.subject.trim() !== "" ||
    selectedNode.system.trim() !== "" ||
    selectedNode.topic.trim() !== "" ||
    selectedNode.subtopic.trim() !== "";

  const queryArg = isValidSelection
    ? {
        key: contentType,
        subject: selectedNode.subject.trim(),
        system: selectedNode.system.trim(),
        topic: selectedNode.topic.trim(),
        subtopic: selectedNode.subtopic.trim(),
      }
    : skipToken;

  const { data: mcqBank } = useGetStudyModeAllContentQuery(queryArg);

  const [bankId, setBankId] = useState<string>("");

  return (
    <div>
      <div className="w-full  flex  items-start gap-6 pb-6">
        <TableContent
          iconAction={() => setIsSubjectModalOpen(true)}
          setSelectedNode={(node) => {
            setSelectedNode(node);
            setBankId("");
          }}
        />

        <div className="w-full flex flex-col gap-6">
          <div>
            <Tabs
              tabs={tabs}
              active={contentType}
              onChange={(value) =>
                dispatch(setContentType(value as ContentType))
              }
            />
          </div>
          <div>
            {mcqBank && (
              <div>
                {contentType === "MCQ" && (
                  <MCQBank
                    mcqBank={mcqBank}
                    bankId={bankId}
                    setBankId={setBankId}
                  />
                )}
                {contentType === "Flashcard" && (
                  <FlashCardBank
                    mcqBank={mcqBank}
                    bankId={bankId}
                    setBankId={setBankId}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {isSubjectModalOpen && (
        <AddSubjectModal onClose={() => setIsSubjectModalOpen(false)} />
      )}

      {/* {totalPages > 1 && (
        <div className="mt-10 w-full flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )} */}
    </div>
  );
};

export default StudyMode;

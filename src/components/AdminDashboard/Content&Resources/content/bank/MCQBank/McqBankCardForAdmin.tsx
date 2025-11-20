import CommonButton from "@/common/button/CommonButton";
import { toBerhanTime } from "@/help/help";
import { useDeleteFlashCardBankMutation } from "@/store/features/adminDashboard/ContentResources/flashCard/flashCardSlice";
import { useDeleteMcqBankApiMutation } from "@/store/features/adminDashboard/ContentResources/MCQ/mcqApi";
import { SingleMcqBank } from "@/store/features/adminDashboard/ContentResources/MCQ/type/allContent";
import { useAppSelector } from "@/store/hook";
import { RootState } from "@/store/store";
import { FC } from "react";

interface Props {
  data: SingleMcqBank;
  setMcqBankId: (id: string) => void;
}
const McqBankCardForAdmin: FC<Props> = ({ data, setMcqBankId }) => {
  const { contentType } = useAppSelector(
    (state: RootState) => state.staticContent
  );
  const [deleteMcqBankApi, { isLoading }] = useDeleteMcqBankApiMutation();
  const [deleteFlashCardBank, { isLoading: isDeleting }] =
    useDeleteFlashCardBankMutation();

  // useDeleteFlashCardBankMutation,
  // useDeleteSingleFlashCardMutation,

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this MCQ bank?"
    );
    if (!confirmDelete) return;
    if (contentType === "MCQ") {
      await deleteMcqBankApi(id);
    }

    if (contentType === "Flashcard") {
      await deleteFlashCardBank(id);
    }
  };

  return (
    <div className=" bg-white rounded-3xl  border border-border overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6">
        <h2 className="text-2xl font-bold tracking-wide">{data.title}</h2>
        <p className="mt-1 text-sm opacity-90">
          {data.subject} • {data.system}
        </p>
      </div>

      {/* Body */}
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl">
            <p className="text-xs text-gray-500 dark:text-gray-400">Topic</p>
            <p className="font-medium text-gray-800 dark:text-gray-200">
              {data.topic}
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl">
            <p className="text-xs text-gray-500 dark:text-gray-400">Subtopic</p>
            <p className="font-medium text-gray-800 dark:text-gray-200">
              {data.subtopic}
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Student Type
            </p>
            <p className="font-medium text-gray-800 dark:text-gray-200">
              {data.studentType}
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Uploaded By
            </p>
            <p className="font-medium text-gray-800 dark:text-gray-200">
              {data.uploadedBy}
            </p>
          </div>
        </div>

        <div className="mt-4 text-xs text-gray-400">
          Created: {toBerhanTime(data.createdAt)}
        </div>
      </div>

      <div className="p-4 bg-gray-50 flex justify-between border-t border-border ">
        <CommonButton
          disabled={isLoading}
          onClick={() => handleDelete(data._id)}
          className=" bg-red-500 !text-white"
        >
          {isLoading || isDeleting ? "Deleting..." : "Delete"}
        </CommonButton>
        <CommonButton
          onClick={() => setMcqBankId(data._id)}
          className=" bg-blue-500 !text-white"
        >
          View Details
        </CommonButton>
      </div>
    </div>
  );
};

export default McqBankCardForAdmin;

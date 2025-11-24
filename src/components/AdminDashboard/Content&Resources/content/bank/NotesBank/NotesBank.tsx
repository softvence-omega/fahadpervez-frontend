import CommonButton from "@/common/button/CommonButton";
import AlertDialogBox from "@/common/custom/AlertDialogBox";
import { useDeleteClinicalCaseMutation } from "@/store/features/adminDashboard/ContentResources/ClinicalCase/clinicalCaseApi";
import { NotesTreeResponse } from "@/store/features/adminDashboard/ContentResources/MCQ/types/allContent";
import { useGetNotesQuery } from "@/store/features/adminDashboard/ContentResources/Notes/NoteSlice";
import React from "react";
import SingleNote from "./SingleNote";

interface Props {
  mcqBank: NotesTreeResponse;
  bankId: string;
  setBankId: (id: string) => void;
}
const NotesBank: React.FC<Props> = ({ mcqBank, bankId, setBankId }) => {
  const notesBank = mcqBank.data ?? [];

  // single clinical case
  const { data: singleNotes } = useGetNotesQuery(bankId, {
    skip: bankId === "",
  });

  const [deleteClinicalCase, { isLoading: isDeleting }] =
    useDeleteClinicalCaseMutation();

  const handleDelete = async (id: string) => {
    await deleteClinicalCase(id)
      .unwrap()

      .catch((error) =>
        console.error("Failed to delete Clinical Case:", error)
      );
  };
  return (
    <div>
      {bankId === "" ? (
        <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3">
          {notesBank.map((item) => (
            <div className="bg-white shadow-md rounded-xl p-4 border border-gray-200 hover:shadow-lg transition">
              <h2 className="text-lg font-semibold text-gray-800">
                {item.title}
              </h2>
              <p className="text-sm text-gray-600">{item.description}</p>

              <div className="mt-3 space-y-1 text-sm text-gray-700">
                <p>
                  <span className="font-semibold">Subject:</span> {item.subject}
                </p>
                <p>
                  <span className="font-semibold">System:</span> {item.system}
                </p>
                <p>
                  <span className="font-semibold">Topic:</span> {item.topic}
                </p>
                <p>
                  <span className="font-semibold">Subtopic:</span>{" "}
                  {item.subtopic}
                </p>
                <p>
                  <span className="font-semibold">Student:</span>{" "}
                  {item.studentType}
                </p>
              </div>

              <div className=" flex justify-between mt-4">
                <AlertDialogBox
                  action={() => handleDelete(item._id)}
                  isLoading={isDeleting}
                />
                <CommonButton
                  onClick={() => setBankId(item._id)}
                  className=" bg-blue-500 !text-white"
                >
                  View Details
                </CommonButton>
              </div>
            </div>
          ))}
        </div>
      ) : (
        singleNotes && <SingleNote data={singleNotes} />
      )}
    </div>
  );
};

export default NotesBank;

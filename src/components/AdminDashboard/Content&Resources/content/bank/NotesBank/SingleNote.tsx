import CommonButton from "@/common/button/CommonButton";
import { useUpdatedNotesMutation } from "@/store/features/adminDashboard/ContentResources/Notes/NoteSlice";
import { NotesResponse } from "@/store/features/adminDashboard/ContentResources/Notes/types/Notes";
import { Download } from "lucide-react";
import { useState } from "react";
import { MdEdit } from "react-icons/md";
export const inputClass = {
  input:
    "text-sm font-normal text-[#0F172A] font-inter leading-[20px] outline-none transition w-full px-4 py-3 border border-border rounded-md ",
  label:
    "text-sm font-normal text-[#18181B] font-inter leading-[20px] block mb-2",
  error: "text-red-500 text-sm mt-1",
};
interface ClinicalCaseData {
  data: NotesResponse;
}

const SingleNote: React.FC<ClinicalCaseData> = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const item = data?.data ?? {};

  const [formData, setFormData] = useState({
    title: item.title ?? "",
    description: item.description ?? "",
    subject: item.subject ?? "",
    system: item.system ?? "",
    topic: item.topic ?? "",
    subtopic: item.subtopic ?? "",
    studentType: item.studentType ?? "",
  });

  const [updateNotes, { isLoading }] = useUpdatedNotesMutation();

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await updateNotes({
      id: item._id,
      data: formData,
    });

    setIsModalOpen(false);
  };
  const fields: (keyof typeof formData)[] = [
    "title",
    "description",
    "subject",
    "system",
    "topic",
    "subtopic",
    "studentType",
  ];

  return (
    item && (
      <>
        <div className="bg-white shadow-md rounded-xl p-4 border border-gray-200 hover:shadow-lg transition">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold mb-2">{item.title}</h2>

            {/* Edit Button */}
            <CommonButton
              type="button"
              className="!px-3 !py-2"
              onClick={() => setIsModalOpen(true)}
            >
              <MdEdit />
            </CommonButton>
          </div>

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
              <span className="font-semibold">Subtopic:</span> {item.subtopic}
            </p>
            <p>
              <span className="font-semibold">Student:</span> {item.studentType}
            </p>
          </div>

          {/* Files Section */}
          <div className="mt-4">
            <h3 className="font-medium text-gray-800">Download Notes</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {item?.notes?.map((note) => (
                <a
                  key={note.fileId}
                  href={note.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 mt-2 bg-primary/10 border border-border text-primary px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 hover:text-white transition"
                >
                  <Download size={18} />
                  {note?.fileName}
                </a>
              ))}
            </div>
          </div>

          <p className="mt-3 text-xs text-gray-500">
            Uploaded: {new Date(item.createdAt).toLocaleDateString()}
          </p>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 space-y-4">
              <h2 className="text-xl font-bold text-gray-800">Edit Notes</h2>

              <div className="grid grid-cols-1 gap-3">
                {fields.map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium capitalize">
                      {field}
                    </label>
                    <input
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className={inputClass.input}
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-3">
                <CommonButton
                  type="button"
                  className="!px-4 !py-2"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </CommonButton>

                <CommonButton
                  type="button"
                  className="!px-4 !py-2 !bg-blue-600 !text-white"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? "Updating..." : "Update"}
                </CommonButton>
              </div>
            </div>
          </div>
        )}
      </>
    )
  );
};

export default SingleNote;

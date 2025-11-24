import { NotesResponse } from "@/store/features/adminDashboard/ContentResources/Notes/types/Notes";
import { Download } from "lucide-react";

interface ClinicalCaseData {
  data: NotesResponse;
}
const SingleNote: React.FC<ClinicalCaseData> = ({ data }) => {
  const item = data?.data ?? [];

  // useUpdateClinicalCaseMutation,
  return (
    <div className="bg-white shadow-md rounded-xl p-4 border border-gray-200 hover:shadow-lg transition">
      <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
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
        <h3 className="font-medium text-gray-800">Notes</h3>

        {item.notes.map((note) => (
          <a
            key={note.fileId}
            href={note.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 mt-2 bg-primary/10 border border-primary text-primary px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary hover:text-white transition"
          >
            <Download size={18} />
            {note.fileName}
          </a>
        ))}
      </div>

      <p className="mt-3 text-xs text-gray-500">
        Uploaded: {new Date(item.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default SingleNote;

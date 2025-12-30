import DashboardHeading from "@/components/reusable/DashboardHeading";
import FilePreviewList from "@/components/reusable/FilePreview";
import FileUploader from "@/components/reusable/FileUploader";
import { useGenerateNoteMutation } from "@/store/features/note/NoteAPI";
import { ArrowLeft, Atom, Upload, Loader2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function CreateNotes() {
  const navigate = useNavigate();
  const [generateNote, { isLoading }] = useGenerateNoteMutation();

  const [files, setFiles] = useState<File[]>([]);
  const [note, setNote] = useState("");
  const [noteName, setNoteName] = useState("");
  const [noteFormat, setNoteFormat] = useState("Bullet point");

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!files.length) {
      toast.error("Please upload a file");
      return;
    }
    if (!noteName) {
      toast.error("Please enter a note name");
      return;
    }

    const formData = new FormData();
    formData.append("file", files[0]); // API expects single file 'file'

    // Construct the data object as JSON string
    const dataPayload = {
      make_your_note: note,
      topic_name: noteName,
      note_format: noteFormat,
    };
    formData.append("data", JSON.stringify(dataPayload));

    try {
      const res = await generateNote(formData).unwrap();
      if (res.success) {
        toast.success("Note generated successfully!");
        navigate("/dashboard/download-notes");
      }
    } catch (error: any) {
      console.error("Failed to generate note:", error);
      toast.error(error?.data?.message || "Failed to generate note");
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-3">
        <Link to={"/dashboard/download-notes"} className="mb-7">
          <ArrowLeft />
        </Link>
        <DashboardHeading
          title="Create Notes"
          titleSize="text-xl"
          description="Builds confidence through repeated practice."
          className="mt-12 mb-12 space-y-1"
        />
      </div>

      <div className="w-full">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5x mx-auto p-6"
        >
          {/* Uploader */}
          <div className="p-6 border rounded-xl border-black/10">
            <h3 className="flex items-center gap-2 text-lg font-semibold mb-2">
              <Upload className="w-5 h-5 mb-1" /> Upload Media
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Upload images or videos to generate AI-powered Notes
            </p>
            <FileUploader
              onFilesChange={(newFiles) => setFiles([...files, ...newFiles])}
            />
          </div>

          {/* Right side */}
          <div className="p-6 border rounded-xl border-black/10 space-y-4 ">
            <h3 className="text-lg font-semibold">Recent Uploads</h3>
            <p className="text-sm text-gray-500">
              Your uploaded files ready for quiz generation
            </p>

            {/* Preview List */}
            <FilePreviewList files={files} onRemove={handleRemoveFile} />

            {/* Note Textarea */}
            <textarea
              placeholder="Make your note! (optional instructions)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full border border-black/10 rounded p-3 text-sm"
              rows={4}
            />

            {/* Dropdowns */}
            <div>
              <label className="block text-sm mb-1">Note Name / Topic</label>
              <input
                value={noteName}
                onChange={(e) => setNoteName(e.target.value)}
                placeholder="Enter topic name (e.g. Cardiology Basics)"
                className="w-full border rounded p-2 text-sm border-black/10"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Note Format</label>
              <select
                value={noteFormat}
                onChange={(e) => setNoteFormat(e.target.value)}
                className="w-full border rounded border-black/10 p-2 text-sm"
              >
                <option value="Bullet point">Bullet point</option>
                <option value="Summary">Summary</option>
                <option value="Paragraph">Paragraph</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 flex justify-center items-center gap-2 bg-slate-500 text-white py-2 rounded-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin w-4 h-4" /> Generating...
                  </>
                ) : (
                  <>
                    <Atom className="w-4 h-4" /> Generate Notes
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

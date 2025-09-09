import DashboardHeading from "@/components/reusable/DashboardHeading";
import FilePreviewList from "@/components/reusable/FilePreview";
import FileUploader from "@/components/reusable/FileUploader";
import { ArrowLeft, Atom, Upload } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function CreateNotes() {

  const [files, setFiles] = useState<File[]>([]);
  const [note, setNote] = useState("");
  const [noteName, setNoteName] = useState("Cardiology Note");
  const [noteFormat, setNoteFormat] = useState("Bullet point");

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ files, note, noteName, noteFormat });
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-3">
        <Link to={'/dashboard/download-notes'} className="mb-7">
          <ArrowLeft /></Link>
        <DashboardHeading
          title="Create  Notes"
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
            <FileUploader onFilesChange={(newFiles) => setFiles([...files, ...newFiles])} />
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
              placeholder="Make your note!"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full border border-black/10 rounded p-3 text-sm"
            />

            {/* Dropdowns */}
            <div>
              <label className="block text-sm mb-1">Note Name</label>
              <input
                value={noteName}
                onChange={(e) => setNoteName(e.target.value)}
                placeholder="Enter note name"
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
                <option>Bullet point</option>
                <option>Summary</option>
                <option>Paragraph</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                className="flex-1 bg-cyan-700 text-white py-2 rounded-lg hover:bg-cyan-900"
              >
                Summarize Notes
              </button>
              <button
                type="submit"
                className="flex-1 flex justify-center gap-4 bg-slate-500 text-white py-2 rounded-lg hover:bg-slate-700"
              >
                <Atom />
                Generate Notes
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  )
}

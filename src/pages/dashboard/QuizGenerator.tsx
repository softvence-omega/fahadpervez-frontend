import DashboardHeading from "@/components/reusable/DashboardHeading";
import FilePreviewList from "@/components/reusable/FilePreview";
import FileUploader from "@/components/reusable/FileUploader";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import { Progress } from "@/components/ui/progress";
import { Atom, Crown, Upload } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const QuizGenerator = () => {


  const [files, setFiles] = useState<File[]>([]);
  const [note, setNote] = useState("");

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ files, note });
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <DashboardHeading
          title="AI Quiz Generator"
          titleSize="text-xl"
          titleColor="text-[#0A0A0A]"
          description="Create custom quizzes from your images and videos using AI"
          descColor="text-[#4A5565]"
          descFont="text-sm"
          className="mt-12 mb-8"
        />
        <Link to={"/dashboard/create-note"}>
          <PrimaryButton
            bgType="solid"
            iconPosition="left"
            bgColor="bg-blue-btn-1"
            className="h-12 mb-4 hover:bg-blue-btn-1 hover:opacity-80 cursor-pointer">

            Create Notes
          </PrimaryButton></Link>
      </div>

      <div className="bg-white py-5 px-7 mb-12">
        <div className="flex justify-between mb-6">
          <h3 className="text-sm text-[#0A0A0A]">Monthly Usage</h3>
          <button className="flex items-center gap-2"><Crown /> Free Plan</button>
        </div>
        <div>
          <div className="flex justify-between items-center mb-3">
            <p className="text-sm text-[#0A0A0A]">Uploads used this month</p>
            <p className="text-sm text-[#0A0A0A]">7 / 10</p>
          </div>
          <Progress value={70} />
        </div>
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
          <div className="p-6 border rounded-xl border-black/10 flex flex-col justify-between gap-4">
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

            {/* Buttons */}
            <div className="">

              <button
                type="submit"
                className="w-full flex justify-center gap-4 bg-violet-700 text-white py-2 rounded-lg hover:bg-slate-700"
              >
                <Atom />
                Generate Quiz
              </button>
            </div>
          </div>
        </form>

      </div>

    </div>
  )
};

export default QuizGenerator;

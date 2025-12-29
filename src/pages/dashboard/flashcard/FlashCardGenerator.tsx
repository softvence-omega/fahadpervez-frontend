import { useState } from "react";
import DashboardHeading from "@/components/reusable/DashboardHeading";
import FilePreviewList from "@/components/reusable/FilePreview";
import FileUploader from "@/components/reusable/FileUploader";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import { Atom, Upload } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { FlashCardGeneratorDialog } from "./FlashCardGeneratorDialog";
import { useGenerateAiFlashCardMutation } from "@/store/features/flashCard/flashCard.api";

const FlashCardGenerator = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState<File[]>([]);
  const [note, setNote] = useState("");
  const [openModal, setOpenModal] = useState(false);
  // const [generatedFlashCard, setGeneratedFlashCard] = useState(null);
  // console.log("Generated FlashCard State:", generatedFlashCard);

  // const [generateAiFlashCard, { isLoading }] = useGenerateAiFlashCardMutation();
  const [generateAiFlashCard, { isLoading }] = useGenerateAiFlashCardMutation();

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  // called after modal submit
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFinalSubmit = async (modalData: any) => {
    const combinedData = {
      files,
      note,
      ...modalData,
    };

    const payload = new FormData();
    payload.append("file", combinedData.files[0]);
    payload.append(
      "data",
      JSON.stringify({
        quiz_name: combinedData.quiz_name,
        subject: combinedData.subject,
        system: combinedData.system,
        topic: combinedData.topic,
        sub_topic: combinedData.sub_topic,
        question_type: combinedData.question_type,
        question_count: combinedData.question_count,
        difficulty_level: combinedData.difficulty_level,
        user_prompt: combinedData.note,
      })
    );

    try {
      const res = await generateAiFlashCard(payload).unwrap();
      console.log("Generated AI Response:", res);

      // Extract the actual data - handle potential nesting variations
      let flashCardData = res.data || res;

      if (!flashCardData) {
        console.error("No data found in response");
        return;
      }

      // 🔥 If it's just an array, wrap it in a proper object structure
      if (Array.isArray(flashCardData)) {
        flashCardData = {
          _id: "temp-id-" + Date.now(),
          title: combinedData.quiz_name || "Generated Flashcards",
          subject: combinedData.subject || "General",
          system: combinedData.system,
          topic: combinedData.topic,
          subtopic: combinedData.sub_topic,
          flashCards: flashCardData, // The array of cards
          totalFlashCards: flashCardData.length,
          createdAt: new Date().toISOString(),
          uploadedBy: "AI Generator",
        };
      }

      // ⬇️ SEND DATA TO NEXT PAGE
      // Use the ID from our possibly-wrapped object
      const targetId = flashCardData._id || "temp-id";

      navigate(`/dashboard/solve-flash-card/${targetId}`, {
        state: {
          flashCardData: flashCardData, // send full flashcard object (now guaranteed to have structure)
        },
      });
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <DashboardHeading
          title="Upload a Text or Documents for generate Flashcard"
          titleSize="text-xl"
          titleColor="text-[#0A0A0A]"
          description="Create custom flashcards from your images and prompts using AI"
          descColor="text-[#4A5565]"
          descFont="text-sm"
          className="mt-12 mb-8"
        />
        <Link to={"/dashboard/flashcard-page"}>
          <PrimaryButton
            bgType="solid"
            iconPosition="left"
            bgColor="bg-blue-btn-1"
            className="h-12 mb-4 hover:bg-blue-btn-1 hover:opacity-80 cursor-pointer"
          >
            Flashcards Overview
          </PrimaryButton>
        </Link>
      </div>

      {/* <div className="bg-white py-5 px-7 mb-12">
        <div className="flex justify-between mb-6">
          <h3 className="text-sm text-[#0A0A0A]">Monthly Usage</h3>
        </div>
        <div>
          <div className="flex justify-between items-center mb-3">
            <p className="text-sm text-[#0A0A0A]">Uploads used this month</p>
            <p className="text-sm text-[#0A0A0A]">7 / 10</p>
          </div>
          <Progress value={70} />
        </div>
      </div> */}

      <div className="w-full">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setOpenModal(true); // open modal on "Generate Quiz"
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5x mx-auto p-6"
        >
          {/* Uploader */}
          <div className="p-6 border rounded-xl border-black/10">
            <h3 className="flex items-center gap-2 text-lg font-semibold mb-2">
              <Upload className="w-5 h-5 mb-1" /> Upload Media
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Upload images or pdf to generate AI-powered Flash Card
            </p>
            <FileUploader
              onFilesChange={(newFiles) => setFiles([...files, ...newFiles])}
            />
          </div>

          {/* Right side */}
          <div className="p-6 border rounded-xl border-black/10 flex flex-col justify-between gap-4">
            <h3 className="text-lg font-semibold">Recent Uploads</h3>
            {/* <p className="text-sm text-gray-500">
              Your uploaded files ready for flash card generation
            </p> */}

            {/* Preview List */}
            <FilePreviewList files={files} onRemove={handleRemoveFile} />

            {/* Note Textarea */}
            <textarea
              placeholder="Ask me anything ! make your flash card"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full border border-black/10 rounded p-3 text-sm"
            />

            {/* Buttons */}
            <button
              disabled={isLoading}
              type="submit"
              className={` w-full flex items-center justify-center gap-4 bg-violet-700 text-white py-2 rounded-lg hover:bg-slate-700  cursor-pointer ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <Atom className={isLoading ? "animate-spin" : ""} />
              {isLoading ? "Generating..." : "Generate Flashcards"}
            </button>
          </div>
        </form>
      </div>

      {/* Modal for quiz details */}
      <FlashCardGeneratorDialog
        open={openModal}
        setOpen={setOpenModal}
        onFinalSubmit={handleFinalSubmit}
      />
    </div>
  );
};

export default FlashCardGenerator;

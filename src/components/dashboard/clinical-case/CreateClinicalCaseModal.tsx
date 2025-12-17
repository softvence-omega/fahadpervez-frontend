// components/dashboard/clinical-case/CreateClinicalCaseModal.tsx
import { useState } from "react";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import { X } from "lucide-react";
import { useGenerateClinicalCaseMutation } from "@/store/features/clinicalCase/clinicalCase.api";
import { useNavigate } from "react-router-dom";

interface Props {
  open: boolean;
  onClose: () => void;
}

const CreateClinicalCaseModal = ({ open, onClose }: Props) => {
  const [prompt, setPrompt] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const [generateClinicalCase, { isLoading }] =
    useGenerateClinicalCaseMutation();

  if (!open) return null;

  const handleSubmit = async () => {
    const formData = new FormData();

    if (prompt) {
      formData.append("data", JSON.stringify({ prompt }));
    }

    if (file) {
      formData.append("file", file);
    }

    try {
      const result = await generateClinicalCase(formData).unwrap();
      console.log("Clinical case generated:", result);
      onClose();
      setPrompt("");
      setFile(null);
      if (result.success) {
        // Navigate to the newly created clinical case detail page with type=generated
        navigate(`/dashboard/clinical-case/${result?.data?._id}?type=generated`);
      }
    } catch (error) {
      console.error("Failed to generate clinical case", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-md rounded-xl p-6 space-y-4">
        {/* header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Create Clinical Case</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* input */}
        <div>
          <label className="text-sm font-medium">Prompt (optional)</label>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Generate Clinical case for a old man"
            className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-md text-sm"
          />
        </div>

        {/* file upload */}
        <div>
          <label className="text-sm font-medium">Upload File (optional)</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full mt-1 text-sm"
          />
        </div>

        {/* actions */}
        <div className="flex justify-end gap-3 pt-4">
          <button onClick={onClose} className="text-sm text-gray-600">
            Cancel
          </button>
          <PrimaryButton onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Generating..." : "Generate"}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default CreateClinicalCaseModal;

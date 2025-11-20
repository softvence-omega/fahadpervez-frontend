// EditFlashCardModal.tsx

import { z } from "zod";

export const editFlashCardSchema = z.object({
  frontText: z.string().min(1, "Front text is required"),
  backText: z.string().min(1, "Back text is required"),
  explanation: z.string().min(1, "Explanation is required"),
  difficulty: z.string().min(1, "Difficulty is required"),
});

// 👇 Infer TypeScript type from schema
export type EditFlashCardInput = z.infer<typeof editFlashCardSchema>;

import ButtonWithLoading from "@/common/button/ButtonWithLoading";
import CommonButton from "@/common/button/CommonButton";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

interface EditFlashCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EditFlashCardInput) => Promise<void> | void;
  initialData: EditFlashCardInput;
  isLoading?: boolean;
}

const EditFlashCardModal: React.FC<EditFlashCardModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditFlashCardInput>({
    resolver: zodResolver(editFlashCardSchema),
    defaultValues: initialData,
  });

  // keep form synced when initialData changes
  useEffect(() => {
    reset(initialData);
  }, [initialData, reset]);

  if (!isOpen) return null;

  const submit = async (values: EditFlashCardInput) => {
    await onSubmit(values);
    // you can choose to close on success inside parent; we'll close here:
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit(submit)}
        className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg"
      >
        <h2 className="text-xl font-semibold mb-4">Edit Flash Card</h2>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium">Front Text</label>
            <input
              {...register("frontText")}
              className="w-full border p-2 rounded"
              placeholder="Front text"
            />
            {errors.frontText && (
              <p className="text-xs text-red-600 mt-1">
                {errors.frontText.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Back Text</label>
            <input
              {...register("backText")}
              className="w-full border p-2 rounded"
              placeholder="Back text"
            />
            {errors.backText && (
              <p className="text-xs text-red-600 mt-1">
                {errors.backText.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Explanation</label>
            <textarea
              {...register("explanation")}
              className="w-full border p-2 rounded"
              placeholder="Explanation"
              rows={4}
            />
            {errors.explanation && (
              <p className="text-xs text-red-600 mt-1">
                {errors.explanation.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Difficulty</label>
            <input
              {...register("difficulty")}
              className="w-full border p-2 rounded"
              placeholder="Easy / Medium / Hard"
            />
            {errors.difficulty && (
              <p className="text-xs text-red-600 mt-1">
                {errors.difficulty.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <CommonButton type="button" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </CommonButton>
          <CommonButton
            type="submit"
            disabled={isLoading}
            className="!bg-blue-600 text-white rounded disabled:opacity-60 cursor-pointer"
          >
            {isLoading ? <ButtonWithLoading title="Updating..." /> : "Update"}
          </CommonButton>
        </div>
      </form>
    </div>
  );
};

export default EditFlashCardModal;

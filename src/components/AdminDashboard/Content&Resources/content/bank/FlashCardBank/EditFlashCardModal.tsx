// EditFlashCardModal.tsx

import { z } from "zod";

export const editFlashCardSchema = z.object({
  frontText: z.string().min(1, "Front text is required"),
  backText: z.string().min(1, "Back text is required"),
  explanation: z.string().min(1, "Explanation is required"),
  difficulty: z.string().min(1, "Difficulty is required"),
  image: z.string().min(1, "Image is required"),
});

// 👇 Infer TypeScript type from schema
export type EditFlashCardInput = z.infer<typeof editFlashCardSchema>;

import ButtonWithLoading from "@/common/button/ButtonWithLoading";
import CommonButton from "@/common/button/CommonButton";
import CommonSelect from "@/common/custom/CommonSelect";
import { difficultyOptions } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

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
    control,
    formState: { errors, isSubmitting },
  } = useForm<EditFlashCardInput>({
    resolver: zodResolver(editFlashCardSchema),
    defaultValues: initialData,
  });

  useEffect(() => {
    reset(initialData);
  }, [initialData, reset]);

  if (!isOpen) return null;

  const inputClass = {
    label: "block text-sm font-normal text-[#020617] font-inter mb-2",
    input:
      "w-full border border-[#CBD5E1] bg-white rounded-md p-3 outline-none text-[#94A3B8] text-xs",
    error: "text-red-500 text-sm mt-1",
  };
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
            <label className={inputClass.label}>Front Text</label>
            <input
              {...register("frontText")}
              className={inputClass.input}
              placeholder="Front text"
            />
            {errors.frontText && (
              <p className={inputClass.error}>{errors.frontText.message}</p>
            )}
          </div>

          <div>
            <label className={inputClass.label}>Back Text</label>
            <input
              {...register("backText")}
              className={inputClass.input}
              placeholder="Back text"
            />
            {errors.backText && (
              <p className="text-xs text-red-600 mt-1">
                {errors.backText.message}
              </p>
            )}
          </div>

          <div>
            <label className={inputClass.label}>Explanation</label>
            <textarea
              {...register("explanation")}
              className={inputClass.input}
              placeholder="Explanation"
              rows={4}
            />
            {errors.explanation && (
              <p className={inputClass.error}>{errors.explanation.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className={inputClass.label}>Difficulty</label>

          <Controller
            control={control}
            name="difficulty"
            render={({ field }) => (
              <CommonSelect
                className="!bg-white border-[#CBD5E1]"
                value={field.value}
                item={difficultyOptions}
                onValueChange={(val) => field.onChange(val)}
              />
            )}
          />

          {errors.difficulty && (
            <p className={inputClass.error}>{errors.difficulty.message}</p>
          )}
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

{
  /* <div className="space-y-2">
  <label className={inputClass.label}>Image</label>

  <div>
    <input
      type="file"
      accept="image/*"
      id="flashcard-image"
      className="hidden"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
        
          setValue("image", reader.result as string);
        };
        reader.readAsDataURL(file);
      }}
    />

    <label
      htmlFor="flashcard-image"
      className="flex items-center gap-2 p-3 text-blue-600 hover:bg-blue-50 rounded-md border border-gray-300 transition cursor-pointer"
    >
      Upload Image
    </label>
  </div>


  {control._formValues.image && (
    <div className="relative w-32">
      <img
        src={control._formValues.image}
        alt="preview"
        className="w-32 h-32 object-cover rounded border"
      />


      <button
        type="button"
        onClick={() => setValue("image", "")}
        className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
      >
        ✕
      </button>
    </div>
  )}

  {errors.image && <p className={inputClass.error}>{errors.image.message}</p>}
</div>; */
}

import CommonButton from "@/common/button/CommonButton";
import CommonSelect from "@/common/custom/CommonSelect";
import CommonBorderWrapper from "@/common/space/CommonBorderWrapper";
import { useManualUploadFlashCardMutation } from "@/store/features/adminDashboard/ContentResources/flashCard/flashCardSlice";
import { useAppSelector } from "@/store/hook";
import { RootState } from "@/store/store";
import { difficultyOptions } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import ActionButtons from "../ActionButtons";

const FlashCardSchema = z.object({
  frontText: z.string().min(1, { message: "Front text is required" }),
  backText: z.string().min(1, { message: "Back text is required" }),
  explanation: z.string().optional(),
  difficulty: z.enum(["Basic", "Intermediate", "Advance"]),
});

const FlashCardsFormSchema = z.object({
  flashCards: z.array(FlashCardSchema).min(1),
});

type FlashCardsFormValues = z.infer<typeof FlashCardsFormSchema>;

const inputClass = {
  label: "block text-sm font-normal text-[#020617] font-inter mb-2",
  input:
    "w-full border border-[#CBD5E1] bg-white rounded-md p-3 outline-none text-[#94A3B8] text-xs",
  error: "text-red-500 text-sm mt-1",
};

const ManualFlashUpload = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FlashCardsFormValues>({
    resolver: zodResolver(FlashCardsFormSchema),
    defaultValues: {
      flashCards: [
        { frontText: "", backText: "", explanation: "", difficulty: "Basic" },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "flashCards",
  });

  const { formData } = useAppSelector(
    (state: RootState) => state.staticContent
  );
  const [manualUploadFlashCard, { isLoading }] =
    useManualUploadFlashCardMutation();
  const onSubmit = async (data: FlashCardsFormValues) => {
    try {
      if (formData) {
        const formattedPayload = { ...formData, flashCards: data.flashCards };
        await manualUploadFlashCard(formattedPayload);
        reset();
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const handleCancel = () => navigate(-1);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {fields.map((field, index) => (
        <CommonBorderWrapper key={field.id} className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-semibold">Flashcard {index + 1}</h2>
            {fields.length > 1 && (
              <CommonButton
                type="button"
                onClick={() => remove(index)}
                className="text-red-500"
              >
                Remove
              </CommonButton>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className={inputClass.label}>Front Text</label>
              <textarea
                {...register(`flashCards.${index}.frontText`)}
                className={inputClass.input}
              />
              {errors.flashCards?.[index]?.frontText && (
                <p className={inputClass.error}>
                  {errors.flashCards[index]?.frontText?.message}
                </p>
              )}
            </div>

            <div>
              <label className={inputClass.label}>Back Text</label>
              <textarea
                {...register(`flashCards.${index}.backText`)}
                className={inputClass.input}
              />
              {errors.flashCards?.[index]?.backText && (
                <p className={inputClass.error}>
                  {errors.flashCards[index]?.backText?.message}
                </p>
              )}
            </div>

            <div>
              <label className={inputClass.label}>Explanation</label>
              <textarea
                {...register(`flashCards.${index}.explanation`)}
                className={inputClass.input}
              />
            </div>

            <div>
              <label className={inputClass.label}>Difficulty</label>

              <Controller
                control={control}
                name={`flashCards.${index}.difficulty`}
                render={({ field }) => (
                  <CommonSelect
                    className="!bg-white border-[#CBD5E1]"
                    value={field.value}
                    item={difficultyOptions}
                    onValueChange={(val) => field.onChange(val)}
                  />
                )}
              />
            </div>
          </div>
        </CommonBorderWrapper>
      ))}

      <div className="mb-6  flex items-center justify-between ">
        <CommonButton
          type="button"
          onClick={() =>
            append({
              frontText: "",
              backText: "",
              explanation: "",
              difficulty: "Basic",
            })
          }
          className="!text-blue-600"
        >
          + Add Another Flashcard
        </CommonButton>
        <ActionButtons
          importLabel="Save & Publish Flashcards"
          onSavePublish={handleSubmit(onSubmit)}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      </div>
    </form>
  );
};

export default ManualFlashUpload;

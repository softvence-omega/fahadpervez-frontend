import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlatformTrainingData, platformTrainingSchema } from "./schemas";

interface Props {
  onNext: (data: PlatformTrainingData) => void;
  onBack: () => void;
  defaultValues?: Partial<PlatformTrainingData>;
}

export default function PlatformTraining({ onNext, onBack, defaultValues }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PlatformTrainingData>({
    resolver: zodResolver(platformTrainingSchema),
    defaultValues: {
      trainingCompleted: false,
      ...defaultValues,
    },
  });

  useEffect(() => {
    if (defaultValues) reset({ ...defaultValues });
  }, [defaultValues, reset]);

  const onSubmit = (data: PlatformTrainingData) => {
    onNext(data);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-bricolage text-3xl font-semibold mb-2">Platform Training</h2>
      <p className="mb-6">Complete the platform training to proceed</p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-slate-300 rounded-[12px] bg-white p-6 space-y-4"
      >
        <div>
          <label className="block text-sm font-medium mb-1">
            <input
              type="checkbox"
              {...register("trainingCompleted")}
              className="mr-2"
            />
            I have completed the platform training
          </label>
          {errors.trainingCompleted && (
            <p className="text-red-500 text-sm mt-1">{errors.trainingCompleted.message}</p>
          )}
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 border rounded"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-main text-white rounded"
          >
            {isSubmitting ? "Saving..." : "Save & Continue"}
          </button>
        </div>
      </form>
    </div>
  );
}
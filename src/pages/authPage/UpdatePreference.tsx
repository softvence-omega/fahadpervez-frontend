import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdatePreferenceData, updatePreferenceSchema } from "./schemas";

interface Props {
  onNext: (data: UpdatePreferenceData) => void;
  onBack: () => void;
  defaultValues?: Partial<UpdatePreferenceData>;
}

export default function UpdatePreference({ onNext, onBack, defaultValues }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
  } = useForm<UpdatePreferenceData>({
    resolver: zodResolver(updatePreferenceSchema),
    defaultValues: {
      bio: defaultValues?.bio || "",
      subjects: defaultValues?.subjects || [""],
      languages: defaultValues?.languages || [""],
      hourlyRate: defaultValues?.hourlyRate || 0,
      availability: defaultValues?.availability || {},
    },
  });

  const [subjectInputs, setSubjectInputs] = useState<string[]>([""]);
  const [languageInputs, setLanguageInputs] = useState<string[]>([""]);

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
      setSubjectInputs(defaultValues.subjects || [""]);
      setLanguageInputs(defaultValues.languages || [""]);
    }
  }, [defaultValues, reset]);

  const addInput = (type: "subject" | "language") => {
    if (type === "subject") setSubjectInputs([...subjectInputs, ""]);
    else setLanguageInputs([...languageInputs, ""]);
  };

  const removeInput = (type: "subject" | "language", index: number) => {
    if (type === "subject") {
      const newSubjects = subjectInputs.filter((_, i) => i !== index);
      setSubjectInputs(newSubjects);
      setValue("subjects", newSubjects.map((s) => getValues(`subjects.${index}`) || ""));
    } else {
      const newLanguages = languageInputs.filter((_, i) => i !== index);
      setLanguageInputs(newLanguages);
      setValue("languages", newLanguages.map((s) => getValues(`languages.${index}`) || ""));
    }
  };

  const onSubmit = (data: UpdatePreferenceData) => {
    onNext(data);
  };

  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i < 10 ? `0${i}` : `${i}`;
    return `${hour}:00-${hour === "23" ? "00" : `${+hour + 1}:00`}`;
  });

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-2">Complete Your Profile</h2>
      <p className="text-gray-600 mb-6">
        Upload your professional documents to complete verification.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {/* Professional Bio */}
        <div className="border border-slate-300 rounded-lg p-4 bg-white">
          <label className="block text-sm font-medium mb-2">Professional Bio</label>
          <textarea
            {...register("bio")}
            placeholder="Enter your bio"
            className="w-full p-3 border border-slate-300 rounded-md resize-none h-24"
            defaultValue={defaultValues?.bio || ""}
          />
          {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>}
        </div>

        {/* Subject You Teach */}
        <div className="border border-slate-300 rounded-lg p-4 bg-white">
          <label className="block text-sm font-medium mb-2">Subject You Teach</label>
          {subjectInputs.map((_, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                {...register(`subjects.${index}` as const)}
                placeholder="Enter subject"
                className="w-full p-3 border border-slate-300 rounded-md"
                defaultValue={defaultValues?.subjects?.[index] || ""}
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeInput("subject", index)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              )}
              {index === subjectInputs.length - 1 && (
                <button
                  type="button"
                  onClick={() => addInput("subject")}
                  className="ml-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add
                </button>
              )}
            </div>
          ))}
          {errors.subjects && <p className="text-red-500 text-sm mt-1">{errors.subjects.message}</p>}
        </div>

        {/* Language */}
        <div className="border border-slate-300 rounded-lg p-4 bg-white">
          <label className="block text-sm font-medium mb-2">Language</label>
          {languageInputs.map((_, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                {...register(`languages.${index}` as const)}
                placeholder="Enter language"
                className="w-full p-3 border border-slate-300 rounded-md"
                defaultValue={defaultValues?.languages?.[index] || ""}
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeInput("language", index)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              )}
              {index === languageInputs.length - 1 && (
                <button
                  type="button"
                  onClick={() => addInput("language")}
                  className="ml-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add
                </button>
              )}
            </div>
          ))}
          {errors.languages && <p className="text-red-500 text-sm mt-1">{errors.languages.message}</p>}
        </div>

        {/* Hourly Rate */}
        <div className="border border-slate-300 rounded-lg p-4 bg-white flex space-x-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-2">Hourly rate</label>
            <input
              type="number"
              {...register("hourlyRate", { valueAsNumber: true })}
              placeholder="Enter hourly rate"
              className="w-full p-3 border border-slate-300 rounded-md"
              defaultValue={defaultValues?.hourlyRate || 0}
            />
            {errors.hourlyRate && <p className="text-red-500 text-sm mt-1">{errors.hourlyRate.message}</p>}
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-2">Currency</label>
            <select
              {...register("currency", { required: true })}
              className="w-full p-3 border border-slate-300 rounded-md"
              defaultValue={defaultValues?.currency || "Dollar"}
            >
              <option value="Dollar">Dollar</option>
              <option value="Euro">Euro</option>
              <option value="Pound">Pound</option>
            </select>
          </div>
        </div>

        {/* Availability */}
        <div className="border border-slate-300 rounded-lg p-4 bg-white">
          <label className="block text-sm font-medium mb-2">Availability</label>
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
            <div key={day} className="flex items-center mb-2">
              <input
                type="checkbox"
                {...register(`availability.${day}.enabled`)}
                className="mr-2"
                onChange={(e) => {
                  if (!e.target.checked) {
                    setValue(`availability.${day}.startTime`, "");
                    setValue(`availability.${day}.endTime`, "");
                  }
                }}
              />
              <span className="mr-2">{day}</span>
              <select
                {...register(`availability.${day}.startTime`)}
                className="p-2 border border-slate-300 rounded-md mr-2"
                disabled={!getValues(`availability.${day}.enabled`)}
              >
                <option value="">Start Time</option>
                {timeOptions.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
              <select
                {...register(`availability.${day}.endTime`)}
                className="p-2 border border-slate-300 rounded-md"
                disabled={!getValues(`availability.${day}.enabled`)}
              >
                <option value="">End Time</option>
                {timeOptions.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          ))}
          {errors.availability && <p className="text-red-500 text-sm mt-1">{errors.availability.message}</p>}
        </div>

        <div className="flex justify-between mt-6">
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
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {isSubmitting ? "Saving..." : "Save & Continue"}
          </button>
        </div>
      </form>
    </div>
  );
}
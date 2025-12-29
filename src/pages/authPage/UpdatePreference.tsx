import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdatePreferenceData, updatePreferenceSchema } from "./schemas";

interface Props {
  onNext: (data: UpdatePreferenceData) => void;
  onBack: () => void;
  onSkip?: () => void;
  defaultValues?: Partial<UpdatePreferenceData>;
}

export default function UpdatePreference({
  onNext,
  onBack,
  onSkip,
  defaultValues,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
    watch,
  } = useForm({
    resolver: zodResolver(updatePreferenceSchema),
    defaultValues: {
      bio: defaultValues?.bio || "",
      subjects: defaultValues?.subjects || [""],
      languages: defaultValues?.languages || [""],
      hourlyRate: defaultValues?.hourlyRate || 0,
      currency: defaultValues?.currency || "USD",
      availability: defaultValues?.availability || {
        Monday: { enabled: false, startTime: "", endTime: "" },
        Tuesday: { enabled: false, startTime: "", endTime: "" },
        Wednesday: { enabled: false, startTime: "", endTime: "" },
        Thursday: { enabled: false, startTime: "", endTime: "" },
        Friday: { enabled: false, startTime: "", endTime: "" },
        Saturday: { enabled: false, startTime: "", endTime: "" },
        Sunday: { enabled: false, startTime: "", endTime: "" },
      },
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
    if (type === "subject") {
      // Get current values and check if last one is not empty
      const currentValues = getValues("subjects") as string[];
      const lastValue = currentValues[currentValues.length - 1];
      if (!lastValue || lastValue.trim() === "") {
        return; // Don't add if last field is empty
      }
      // Add new empty field to both state and form
      const newSubjects = [...currentValues, ""];
      setSubjectInputs(newSubjects);
      setValue("subjects", newSubjects);
    } else {
      // Get current values and check if last one is not empty
      const currentValues = getValues("languages") as string[];
      const lastValue = currentValues[currentValues.length - 1];
      if (!lastValue || lastValue.trim() === "") {
        return; // Don't add if last field is empty
      }
      // Add new empty field to both state and form
      const newLanguages = [...currentValues, ""];
      setLanguageInputs(newLanguages);
      setValue("languages", newLanguages);
    }
  };

  const removeInput = (type: "subject" | "language", index: number) => {
    if (type === "subject") {
      const currentValues = getValues("subjects") as string[];
      const newSubjects = currentValues.filter((_, i) => i !== index);
      setSubjectInputs(newSubjects.length > 0 ? newSubjects : [""]);
      setValue("subjects", newSubjects.length > 0 ? newSubjects : [""]);
    } else {
      const currentValues = getValues("languages") as string[];
      const newLanguages = currentValues.filter((_, i) => i !== index);
      setLanguageInputs(newLanguages.length > 0 ? newLanguages : [""]);
      setValue("languages", newLanguages.length > 0 ? newLanguages : [""]);
    }
  };

  const onSubmit = (data: UpdatePreferenceData) => {
    onNext(data);
  };

  // Helper function to convert 24-hour to 12-hour format with AM/PM
  const formatTime = (hour: number): string => {
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    const displayHourStr =
      displayHour < 10 ? `0${displayHour}` : `${displayHour}`;
    return `${displayHourStr}:00 ${period}`;
  };

  // Generate time options in 12-hour format with AM/PM
  const timeOptions = Array.from({ length: 24 }, (_, i) => formatTime(i));
  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-3xl font-semibold">Complete Your Profile</h2>
        {onSkip && (
          <button
            type="button"
            onClick={onSkip}
            className="text-blue-500 underline hover:text-blue-600 font-medium"
          >
            Skip
          </button>
        )}
      </div>
      <p className="text-gray-600 mb-6">
        Upload your professional documents to complete verification.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Professional Bio */}
        <div className="border border-slate-300 rounded-lg p-4 bg-white">
          <label className="block text-sm font-medium mb-2">
            Professional Bio
          </label>
          <textarea
            {...register("bio")}
            placeholder="Enter your bio"
            className="w-full p-3 border border-slate-300 rounded-md resize-none h-24"
          />
          {errors.bio && (
            <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>
          )}
        </div>

        {/* Subject You Teach */}
        <div className="border border-slate-300 rounded-lg p-4 bg-white">
          <label className="block text-sm font-medium mb-2">
            Subject You Teach
          </label>

          {/* Display existing subjects as tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {subjectInputs.map((_, index) => {
              const value = watch(`subjects.${index}`);
              if (!value) return null;
              return (
                <div
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-md text-sm"
                >
                  <span>{value}</span>
                  <button
                    type="button"
                    onClick={() => removeInput("subject", index)}
                    className="text-gray-600 hover:text-red-600 font-bold text-lg leading-none"
                    title="Remove"
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>

          {/* Input field for new subject */}
          <div className="flex items-center gap-2">
            <input
              {...register(`subjects.${subjectInputs.length - 1}` as const)}
              placeholder="Enter subject"
              className="flex-1 p-3 border border-slate-300 rounded-md"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addInput("subject");
                }
              }}
            />
            <button
              type="button"
              onClick={() => addInput("subject")}
              className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 font-medium"
            >
              Add
            </button>
          </div>
          {errors.subjects && (
            <p className="text-red-500 text-sm mt-1">
              {errors.subjects.message}
            </p>
          )}
        </div>

        {/* Language */}
        <div className="border border-slate-300 rounded-lg p-4 bg-white">
          <label className="block text-sm font-medium mb-2">Language</label>

          {/* Display existing languages as tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {languageInputs.map((_, index) => {
              const value = watch(`languages.${index}`);
              if (!value) return null;
              return (
                <div
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-md text-sm"
                >
                  <span>{value}</span>
                  <button
                    type="button"
                    onClick={() => removeInput("language", index)}
                    className="text-gray-600 hover:text-red-600 font-bold text-lg leading-none"
                    title="Remove"
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>

          {/* Input field for new language */}
          <div className="flex items-center gap-2">
            <input
              {...register(`languages.${languageInputs.length - 1}` as const)}
              placeholder="Enter language"
              className="flex-1 p-3 border border-slate-300 rounded-md"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addInput("language");
                }
              }}
            />
            <button
              type="button"
              onClick={() => addInput("language")}
              className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 font-medium"
            >
              Add
            </button>
          </div>
          {errors.languages && (
            <p className="text-red-500 text-sm mt-1">
              {errors.languages.message}
            </p>
          )}
        </div>

        {/* Hourly Rate */}
        <div className="border border-slate-300 rounded-lg p-4 bg-white flex space-x-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-2">
              Hourly rate
            </label>
            <input
              type="number"
              {...register("hourlyRate", { valueAsNumber: true })}
              placeholder="Enter hourly rate"
              className="w-full p-3 border border-slate-300 rounded-md"
            />
            {errors.hourlyRate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.hourlyRate.message}
              </p>
            )}
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-2">Currency</label>
            <select
              {...register("currency")}
              className="w-full p-3 border border-slate-300 rounded-md"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>
        </div>

        {/* Availability */}
        <div className="border border-slate-300 rounded-lg p-4 bg-white">
          <label className="block text-sm font-medium mb-4">Availability</label>
          <div className="space-y-2">
            {[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ].map((day) => {
              const isEnabled = watch(`availability.${day}.enabled`);
              const startTime = watch(`availability.${day}.startTime`);
              const endTime = watch(`availability.${day}.endTime`);

              return (
                <div
                  key={day}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <input
                      type="checkbox"
                      {...register(`availability.${day}.enabled`)}
                      className="w-4 h-4"
                      onChange={(e) => {
                        if (!e.target.checked) {
                          setValue(`availability.${day}.startTime`, "");
                          setValue(`availability.${day}.endTime`, "");
                        }
                      }}
                    />
                    <span className="text-sm font-medium w-24">{day}</span>
                  </div>

                  {/* Time Range Display/Input */}
                  <div className="flex items-center gap-2">
                    {isEnabled ? (
                      <>
                        <select
                          {...register(`availability.${day}.startTime`)}
                          className="px-3 py-1.5 border border-slate-300 rounded text-sm"
                        >
                          <option value="">Start</option>
                          {timeOptions.map((time) => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                        <span className="text-sm text-gray-500">-</span>
                        <select
                          {...register(`availability.${day}.endTime`)}
                          className="px-3 py-1.5 border border-slate-300 rounded text-sm"
                        >
                          <option value="">End</option>
                          {timeOptions.map((time) => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                      </>
                    ) : (
                      <span className="text-sm text-gray-400 w-[200px] text-right">
                        {startTime && endTime ? `${startTime}-${endTime}` : ""}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {errors?.availability &&
            typeof errors.availability?.message === "string" && (
              <p className="text-red-500 text-sm mt-1">
                {errors.availability.message}
              </p>
            )}
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 border rounded"
          >
            Back
          </button>
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {isSubmitting ? "Saving..." : "Save & Continue"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

"use client";
import { useForm } from "react-hook-form";

type PreferenceForm = {
  subTopic: string;
  topic: string;
  systemPreference: string;
  subjectPreference: string;
};

export default function Preferences() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PreferenceForm>();

  console.log(isSubmitting)

  const onSubmit = (data: PreferenceForm) => {
    console.log("Form Data:", data);
  };

  return (
    <div>
      <div>
        <h2 className="text-bricolage text-5xl font-semibold mb-2">
          Setting your Preferences
        </h2>
        <p>
          Select your primary goals so our AI can focus on what matters most
        </p>
      </div>

      <div className="w-full border border-slate-300 rounded-[12px] bg-white mt-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-4 p-6"
        >
          {/* Subject Preference */}
          <div className="w-full">
            <h3 className="text-sm text-[#020617] font-medium leading-5 mb-2">
              Subject Preference
            </h3>
            <input
              type="text"
              placeholder="Enter your subject preference"
              {...register("subjectPreference", {
                required: "Subject Preference is required",
              })}
              className="w-full p-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            {errors.subjectPreference && (
              <p className="text-red-500 text-sm">
                {errors.subjectPreference.message}
              </p>
            )}
          </div>

          {/* System Preference */}
          <div>
            <h3 className="text-sm text-[#020617] font-medium leading-5 mb-2">
              System Preference
            </h3>
            <select
              {...register("systemPreference", {
                required: "System Preference is required",
              })}
              className="w-full p-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="">Select Sub-Topic</option>
              <option value="cardiology">Cardiology</option>
              <option value="neurology">Neurology</option>
              <option value="gastroenterology">Gastroenterology</option>
              <option value="pulmonology">Pulmonology</option>
              <option value="dermatology">Dermatology</option>
            </select>
            {errors.systemPreference && (
              <p className="text-red-500 text-sm">
                {errors.systemPreference.message}
              </p>
            )}
          </div>

          {/* Topic */}
          <div>
            <h3 className="text-sm text-[#020617] font-medium leading-5 mb-2">
              Topic
            </h3>
            <select
              {...register("topic", { required: "Topic is required" })}
              className="w-full p-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="">Select Topic</option>
              <option value="hypertension">Hypertension</option>
              <option value="stroke">Stroke</option>
              <option value="peptic-ulcer">Peptic Ulcer</option>
              <option value="copd">COPD</option>
              <option value="psoriasis">Psoriasis</option>
            </select>
            {errors.topic && (
              <p className="text-red-500 text-sm">{errors.topic.message}</p>
            )}
          </div>

          {/* Sub-Topic */}
          <div>
            <h3 className="text-sm text-[#020617] font-medium leading-5 mb-2">
              Sub-Topic
            </h3>
            <select
              {...register("subTopic", { required: "Sub-Topic is required" })}
              className="w-full p-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="">Select Sub-Topic</option>
              <option value="cardiology">Cardiology</option>
              <option value="neurology">Neurology</option>
              <option value="gastroenterology">Gastroenterology</option>
              <option value="pulmonology">Pulmonology</option>
              <option value="dermatology">Dermatology</option>
            </select>
            {errors.subTopic && (
              <p className="text-red-500 text-sm">{errors.subTopic.message}</p>
            )}
          </div>

          {/* Submit Button */}
          {/* <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-main text-sm font-medium text-[#FAFAFA] p-3 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? "Loading..." : "Save Preferences"}
          </button> */}
        </form>
      </div>
    </div>
  );
}

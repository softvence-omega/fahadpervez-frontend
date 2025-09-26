// src/components/MultiStepRegisterForm.tsx
import { useState } from "react";
import CommonWrapper from "@/common/CommonWrapper";
import { Progress } from "@/components/ui/progress";
import AboutYourSelfTab from "./ProfileSetupTab";
import PreparingFor from "./PreparingFor";
import Preferences from "./Preferences";
import UploadProfile from "./UploadProfile";
import { MultiStepFormData, multiStepSchema } from "./schemas";
// import { multiStepSchema, type MultiStepFormData } from "@/lib/schemas";

export default function MultiStepRegisterForm() {
  const [step, setStep] = useState<number>(0);
  const [formData, setFormData] = useState<Partial<MultiStepFormData>>({});

  const stepCount = 4;
  const progressValue = ((step + 1) / stepCount) * 100;

  const handleNext = (partial: Partial<MultiStepFormData>) => {
    // merge partial into state
    setFormData((prev) => ({ ...prev, ...partial }));
    setStep((s) => Math.min(s + 1, stepCount - 1));
  };

  const handleBack = () => setStep((s) => Math.max(0, s - 1));

  const handleFinalSubmit = async (partial: Partial<MultiStepFormData>) => {
    const merged = { ...formData, ...partial } as MultiStepFormData;

    console.log(merged)
    
    // validate final merged object
    const check = multiStepSchema.safeParse(merged);
    if (!check.success) {
      // send first validation error as alert — you can replace with UI error handling
      alert(check.error.errors[0]?.message ?? "Validation failed");
      return;
    }

    // try {
    //   const res = await fetch("/api/register", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(merged),
    //   });
    //   if (!res.ok) throw new Error("Failed to submit");
    //   alert("Form submitted ✅");
    //   // optional: reset state or navigate
    // } catch (err) {
    //   console.error(err);
    //   alert("Submission failed. See console for details.");
    // }
  };

  return (
    <div>
      <div className="border-b-2 border-b-slate-300">
        <CommonWrapper>
          <div className="flex items-center justify-between ">
            <div className="flex items-center gap-7">
              <img src="/logo1.svg" className="h-16" alt="logo" />
              <h2 className="text-xl font-semibold ">Medical Student Hub</h2>
            </div>
            <p>
              Step {step + 1} of {stepCount}
            </p>
          </div>
        </CommonWrapper>
      </div>

      <CommonWrapper>
        <div className="max-w-4x mx-auto mt-4">
          <Progress value={progressValue} className="h-2 mb-6 [&>div]:bg-[#0D71CF]" />

          <div className="min-h-[150px] flex items-center justify-center rounded-lg p-6 mb-6">
            {step === 0 && (
              <AboutYourSelfTab
                defaultValues={formData.profile ?? undefined}
                onNext={(profile) => handleNext({ profile })}
              />
            )}
            {step === 1 && (
              <PreparingFor
                defaultValues={formData.preparing ?? undefined}
                onBack={handleBack}
                onNext={(preparing) => handleNext({ preparing })}
              />
            )}
            {step === 2 && (
              <Preferences
                defaultValues={formData.preferences ?? undefined}
                onBack={handleBack}
                onNext={(preferences) => handleNext({ preferences })}
              />
            )}
            {step === 3 && (
              <UploadProfile
                defaultValues={formData.upload ?? undefined}
                onBack={handleBack}
                onNext={(upload) => handleFinalSubmit({ upload })}
              />
            )}
          </div>
        </div>
      </CommonWrapper>
    </div>
  );
}

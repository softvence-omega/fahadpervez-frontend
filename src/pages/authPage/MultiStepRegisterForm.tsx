import { useState } from "react";
import CommonWrapper from "@/common/CommonWrapper";
import { Progress } from "@/components/ui/progress";
import AboutYourSelfTab from "./ProfileSetupTab";
import PreparingFor from "./PreparingFor";
import Preferences from "./Preferences";
import UploadProfile from "./UploadProfile";
import VerifyProfession from "./VerifyProfession";
import UpdatePreference from "./UpdatePreference";
import PlatformTraining from "./PlatformTraining";
import PayoutSetup from "./PayoutSetup";
import { MultiStepFormData, multiStepSchema } from "./schemas";
import { useRegisterUserMutation } from "@/store/features/auth/auth.api";

export default function MultiStepRegisterForm() {
  const [step, setStep] = useState<number>(0);
  const [formData, setFormData] = useState<Partial<MultiStepFormData>>({});

  const [registerUser] = useRegisterUserMutation();

  // Determine steps based on role
  const isMentor = formData.profile?.role === "mentor";
  const steps = isMentor
    ? [
        "AboutYourSelfTab",
        "VerifyProfession",
        "UpdatePreference",
        "PlatformTraining",
        "PayoutSetup",
        "UploadProfile",
      ]
    : ["AboutYourSelfTab", "PreparingFor", "Preferences", "UploadProfile"];
  const stepCount = steps.length;
  const progressValue = ((step + 1) / stepCount) * 100;

  const handleNext = (partial: Partial<MultiStepFormData>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFormData((prev: any) => ({ ...prev, ...partial }));
    setStep((s) => Math.min(s + 1, stepCount - 1));
  };

  const handleBack = () => setStep((s) => Math.max(0, s - 1));

  const handleFinalSubmit = async (partial: Partial<MultiStepFormData>) => {
    const merged = { ...formData, ...partial } as MultiStepFormData;

    console.log(merged);

    if (merged.profile.role === "student") {
      const studentData = {
        role: "STUDENT",
        student: {
          firstName: merged.profile.firstName,
          lastName: merged.profile.lastName,
          university: merged.profile.university,
          country: merged.profile.country,
          year_of_study: merged.profile.academicYear,
          studentType: merged.profile.subRole, // example: "Dental student"
          preparingFor: merged.preparing?.exams?.join(", ") || "", // e.g. "usmle1"
        },
        preference: {
          subject: merged.preferences?.subjectPreference,
          systemPreference: merged.preferences?.systemPreference,
          topic: merged.preferences?.topic,
          subTopic: merged.preferences?.subTopic,
        },
        bio: merged.upload?.bio,
      };

      console.log("🚀 Final student payload:", studentData);

      // ✅ Call API
      // try {
      //   const res = await registerUser(studentData);

      //   // fetch("/api/register", {
      //   //   method: "POST",
      //   //   headers: { "Content-Type": "application/json" },
      //   //   body: JSON.stringify(studentData),
      //   // });

      //   if (!res.data.success) throw new Error("Failed to submit");
      //   alert("Form submitted ✅");
      // } catch (err) {
      //   console.error(err);
      //   alert("Submission failed. See console for details.");
      // }
    }

    // Validate final merged object
    const check = multiStepSchema.safeParse({
      ...merged,
      role: formData.profile?.role,
    });
    if (!check.success) {
      alert("Validation failed");
      return;
    }

    // Uncomment for actual API submission
    /*
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(merged),
      });
      if (!res.ok) throw new Error("Failed to submit");
      alert("Form submitted ✅");
    } catch (err) {
      console.error(err);
      alert("Submission failed. See console for details.");
    }
    */
  };

  return (
    <div>
      <div className="border-b-2 border-b-slate-300">
        <CommonWrapper>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-7">
              <img src="/logo1.svg" className="h-16" alt="logo" />
              <h2 className="text-xl font-semibold">Medical Student Hub</h2>
            </div>
            <p>
              Step {step + 1} of {stepCount}
            </p>
          </div>
        </CommonWrapper>
      </div>

      <CommonWrapper>
        <div className="max-w-7xl mx-auto mt-4">
          <Progress
            value={progressValue}
            className="h-2 mb-6 [&>div]:bg-[#0D71CF]"
          />

          <div className="min-h-[150px] flex items-center justify-center rounded-lg p-6 mb-6">
            {steps[step] === "AboutYourSelfTab" && (
              <AboutYourSelfTab
                defaultValues={formData.profile ?? undefined}
                onNext={(profile) => handleNext({ profile } as any)}
              />
            )}
            {steps[step] === "PreparingFor" && !isMentor && (
              <PreparingFor
                defaultValues={
                  "preparing" in formData ? formData.preparing : undefined
                }
                onBack={handleBack}
                onNext={(preparing) => handleNext({ preparing })}
              />
            )}

            {steps[step] === "Preferences" && !isMentor && (
              <Preferences
                defaultValues={
                  "preferences" in formData ? formData.preferences : undefined
                }
                onBack={handleBack}
                onNext={(preferences) => handleNext({ preferences })}
              />
            )}

            {steps[step] === "VerifyProfession" && isMentor && (
              <VerifyProfession
                defaultValues={
                  "verifyProfession" in formData
                    ? formData.verifyProfession
                    : undefined
                }
                onBack={handleBack}
                onNext={(verifyProfession) => handleNext({ verifyProfession })}
              />
            )}

            {steps[step] === "UpdatePreference" && isMentor && (
              <UpdatePreference
                defaultValues={
                  "updatePreference" in formData
                    ? formData.updatePreference
                    : undefined
                }
                onBack={handleBack}
                onNext={(updatePreference) => handleNext({ updatePreference })}
              />
            )}

            {steps[step] === "PlatformTraining" && isMentor && (
              <PlatformTraining
                defaultValues={
                  "platformTraining" in formData
                    ? formData.platformTraining
                    : undefined
                }
                onBack={handleBack}
                onNext={(platformTraining) => handleNext({ platformTraining })}
              />
            )}

            {steps[step] === "PayoutSetup" && isMentor && (
              <PayoutSetup
                defaultValues={
                  "payoutSetup" in formData ? formData.payoutSetup : undefined
                }
                onBack={handleBack}
                onNext={(payoutSetup) => handleNext({ payoutSetup })}
              />
            )}
            {steps[step] === "UploadProfile" && (
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

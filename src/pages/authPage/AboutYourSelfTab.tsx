import img1 from "@/assets/signUp/onboarding_img1.png";
import img2 from "@/assets/signUp/onboarding_img2.png";

export default function AboutYourSelfTab() {
  return (
    <div className="text-center">
      <h2 className="text-5xl font-semibold font-bricolage">
        What Are you Preparing For
      </h2>
      <p className="mt-2">
        Select your primary goals so our AI can focus on what matters most
      </p>

      <div className="w-4xl grid grid-cols-1 md:grid-cols-2 mt-12 gap-10">
        <div className="flex items-center gap-3 w-full border border-slate-300 rounded-[8px] p-6">
          <img src={img1} alt="" className="w-14 h-14" />
          <div className="text-start">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Medical Student
            </h3>
            <p className="text-gray-600">
              Comprehensive medical curriculum with clinical rotations and board
              exam preparation
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full border border-slate-300 rounded-[8px] p-6">
          <img src={img2} alt="" className="w-14 h-14" />
          <div className="text-start">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Medical Student
            </h3>
            <p className="text-gray-600">
              Comprehensive medical curriculum with clinical rotations and board
              exam preparation
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full border border-slate-300 rounded-[8px] p-6">
          <img src={img1} alt="" className="w-14 h-14" />
          <div className="text-start">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Medical Student
            </h3>
            <p className="text-gray-600">
              Comprehensive medical curriculum with clinical rotations and board
              exam preparation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

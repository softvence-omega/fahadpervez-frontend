
import img1 from "@/assets/signUp/onboarding_img1.png"
import img2 from "@/assets/signUp/onboarding_img2.png"

export default function AboutYourSelfTab() {
    return (
        <div className="text-center">
            <h2 className="text-5xl font-semibold font-bricolage">Tell Us About Yourself</h2>
            <p className="mt-2">Select your academic path to train your content</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-12 gap-10">
                <div className="w-full md:w-[350px] border border-slate-300 rounded-[8px] p-6 text-center">
                    <img src={img1} alt="" className="mx-auto" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-7">Medical Student</h3>
                    <p className="text-gray-600">Comprehensive medical curriculum with clinical rotations and board exam preparation</p>
                </div>
                <div className="w-full md:w-[350px] border border-slate-300 rounded-[8px] p-6 text-center">
                    <img src={img2} alt="" className="mx-auto" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-7">Medical Student</h3>
                    <p className="text-gray-600">Comprehensive medical curriculum with clinical rotations and board exam preparation</p>
                </div>
                <div className="w-full md:w-[350px] border border-slate-300 rounded-[8px] p-6 text-center">
                    <img src={img1} alt="" className="mx-auto" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-7">Medical Student</h3>
                    <p className="text-gray-600">Comprehensive medical curriculum with clinical rotations and board exam preparation</p>
                </div>
            </div>
        </div>
    )
}

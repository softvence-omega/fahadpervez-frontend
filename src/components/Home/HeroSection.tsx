import CommonWrapper from "@/common/CommonWrapper";
import heroIcon1 from "@/assets/home/hero_icon_1.png"
import heroIcon2 from "@/assets/home/hero_icon_2.png"
import bannerImage from "@/assets/home/heroBanner.png"
import PrimaryButton from "../reusable/PrimaryButton";

export default function HeroSection() {
  return (
    <div className="bg-[#FAFAFA] py-10 md:py-16 ">
      <CommonWrapper>
        <div className="md:grid grid-cols-2 gap-10 items-center">
          <div >
            <h1 className="text-3xl md:text-5xl font-bold text-[#1E293B]  mb-4">Welcome to Your Medical <br /> Student Hub</h1>
            <p className="text-base md:text-lg text-[#334155]">Learn smarter, connect faster, succeed together.</p>

            <div className="grid grid-cols-2 gap-4 my-6 md:my-8 lg:my-10 max-w-lg">
              <div className=" rounded-lg border bg-blue-50 border-[#0EA5E94D]/30 p-4 md:p-6">
                <img src={heroIcon1} alt="heroIcon" />
                <h3 className="text-sm md:text-lg lg:text-xl font-semibold text-blue-800 mt-2">Medical student</h3>
              </div>

              <div className=" rounded-lg border bg-blue-50 border-[#0EA5E94D]/30 p-4 md:p-6">
                <img src={heroIcon2} alt="heroIcon" />
                <h3 className="text-sm md:text-lg lg:text-xl font-semibold text-blue-800 mt-2">Nursing student</h3>
              </div>
            </div>
            <div className="flex gap-5 items-center">
              <PrimaryButton className="bg-teal-600">
                Join Study Group
              </PrimaryButton>
              <PrimaryButton>
                Take a Quiz
              </PrimaryButton>
            </div>
          </div>
          <div className="hidden md:block">
            <img src={bannerImage} alt="" />
          </div>
        </div>

        <div>

        </div>
      </CommonWrapper>
    </div>
  )
}

import CommonWrapper from "@/common/CommonWrapper";
import { Button } from "@/components/ui/button";

import heroIcon1 from "@/assets/home/hero_icon_1.png"
import heroIcon2 from "@/assets/home/hero_icon_2.png"
import bannerImage from "@/assets/home/heroBanner.png"

export default function HeroSection() {
  return (
    <div>
      <CommonWrapper>
        <div className="flex items-center justify-between">
          <div className="mt-20 mb-6">
            <h1 className="text-5xl font-bold text-[#1E293B] leading-12 mb-4">Welcome to Your Medical <br /> Student Hub</h1>
            <p className="text-lg text-[#334155] font-normal leading-7 mb-12">Learn smarter, connect faster, succeed together.</p>

            <div className="flex space-x-8 mb-20">
              <div className="w-[300px] rounded-[8px] bg-[#0EA5E94D] py-5 px-6">
                <img src={heroIcon1} alt="heroIcon" />
                <h3 className="text-xl font-semibold text-[#1D4ED8] leading-7">Medical Student</h3>
              </div>

              <div className="w-[300px] rounded-[8px] bg-[#0EA5E94D] py-5 px-6">
                <img src={heroIcon2} alt="heroIcon" />
                <h3 className="text-xl font-semibold text-[#1D4ED8] leading-7">Medical Student</h3>
              </div>
            </div>
            <div className="space-x-5">
              <Button className="text-sm font-medium bg-[#0D9488] text-white py-3 px-5">Join Study Group</Button>
              <Button className="text-sm font-medium bg-[#0076F5] text-white py-3 px-5">Take a Quiz</Button>
            </div>
          </div>
          <div>
            <img src={bannerImage} alt="" />
          </div>
        </div>

        <div>

        </div>
      </CommonWrapper>
    </div>
  )
}

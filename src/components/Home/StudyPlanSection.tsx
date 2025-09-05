
import studyPlanImage from "@/assets/home/study_plan_image.png"
import CommonWrapper from "@/common/CommonWrapper"

export default function StudyPlanSection() {
    return (
        <CommonWrapper>
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="max-w-[650px] mx-auto">
                    <h2 className="text-5xl text-[#1F2937] font-semibold leading-14">Innovative AI Study plan for <br />
                        better Education.</h2>
                    <p className="text-[#181818] font-normal leading-6 border-b border-b-[#E2E8F0] pb-9 mt-9 mb-6">Every year, we change the lives of millions of students. We enable them to explore all their study options in one place and to find the best fit study programme that matches their goals, and preferences. In order to succeed in this mission, we work with institutions who are eager to diversify their campuses and attract best-fit students from all over the world.</p>

                    <div className="flex items-center justify-between gap-[200px] mb-12">
                        <div className="space-y-5">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-[#155E75]"></div>
                                <p className="text-[#1E293B] font-medium leading-6">AI Generated Quiz </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-[#155E75]"></div>
                                <p className="text-[#1E293B] font-medium leading-6">MCQ Bank</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-[#155E75]"></div>
                                <p className="text-[#1E293B] font-medium leading-6">Downloads Notes</p>
                            </div>
                        </div>

                        <div className="space-y-5">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-[#155E75]"></div>
                                <p className="text-[#1E293B] font-medium leading-6">AI Create Flash Cards </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-[#155E75]"></div>
                                <p className="text-[#1E293B] font-medium leading-6">Case Study</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-[#155E75]"></div>
                                <p className="text-[#1E293B] font-medium leading-6">Medical AI</p>
                            </div>
                        </div>
                    </div>

                    <button className="text-sm text-white font-medium leading-6 py-3 px-4 rounded-lg bg-linear-to-r from-[#0076F5] to-[#0058B8]">View All Expertise</button>

                </div>
                <div className="hidden md:block mx-auto">
                    <img src={studyPlanImage} alt="" />
                </div>
            </div>
        </CommonWrapper>
    )
}

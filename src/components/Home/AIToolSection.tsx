import AIToolImage from "@/assets/home/AI_tool_image.png"
import CommonWrapper from "@/common/CommonWrapper"
import { FaAirbnb, FaBook, FaBookOpen, FaBookReader } from "react-icons/fa"
import { FcSettings } from "react-icons/fc"

export default function AIToolSection() {
    return (
        <div className="bg-[#0F172A] py-20">
            <CommonWrapper>
                <div className="grid md:grid-cols-2 gap-6 items-center justify-between gap-3">
                    <div className="mx-auto">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">Enhancing learning with Smart AI-powered tools.</h2>
                        <div className="max-w-[600px] bg-slate-800 rounded-[20px] pt-6 pl-6 pb-4 mt-10 mb-8">
                            <div className="flex items-center gap-4">
                                <FaAirbnb className="w-6 h-6 text-white" />
                                <h4 className="text-[#F8FAFC] font-medium">AI  Tutor</h4>
                            </div>
                            <p className=" pt-3 text-base text-slate-400 font-normal leading-6">A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.</p>
                        </div>
                        <div className="space-y-8 ml-6">
                            <div className="flex items-center gap-4">
                                <FaAirbnb className="w-6 h-6 text-white" />
                                <h4 className="text-[#F8FAFC] font-medium">Pharmaceutical Aid </h4>
                            </div>

                            <div className="flex items-center gap-4">
                                <FaBook className="w-6 h-6 text-white" />
                                <h4 className="text-[#F8FAFC] font-medium">Question Aid</h4>
                            </div>
                            <div className="flex items-center gap-4">
                                <FcSettings className="w-6 h-6 text-white" />
                                <h4 className="text-[#F8FAFC] font-medium">In Death Explanation </h4>
                            </div>
                            <div className="flex items-center gap-4">
                                <FaBookOpen className="w-6 h-6 text-white" />
                                <h4 className="text-[#F8FAFC] font-medium">Clinical Context</h4>
                            </div>
                            <div className="flex items-center gap-4">
                                <FaBookReader className="w-6 h-6 text-white" />
                                <h4 className="text-[#F8FAFC] font-medium">USMLE Question Style</h4>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block max-w-xl mx-auto">
                        <img src={AIToolImage} className="w-full" alt="ai_tool_image" />
                    </div>
                </div>
            </CommonWrapper>
        </div>
    )
}

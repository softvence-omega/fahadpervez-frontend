import { FileDown, View } from "lucide-react";
import pdfImage from "@/assets/fi_18063801.png"

export default function RecentDownloadsTab() {
    return (
        <div>
            <div className="flex items-center gap-2">
                <FileDown className="w-5 h-5 text-[#007BFF]" />
                <p className="text-lg text-slate-800 font-medium leading-7">Recent Downloads</p>
            </div>

            <div className="mt-6 space-y-7">
                <div className="flex justify-between items-center border-b border-b-slate-300 pb-2 pl-2">
                    <div className="flex items-center gap-3">
                        <img src={pdfImage} alt="pdfImage" />
                        <h4 className="text-base text-[#3F3F3F] font-medium leading-6">Topic Name.PDF</h4>
                        <p className="text-sm text-slate-700 font-normal leading-5">Aug 1, 11AM</p>
                    </div>
                    <View className="w-6 h-6" />
                </div>
                <div className="flex justify-between items-center border-b border-b-slate-300 pb-2 pl-2">
                    <div className="flex items-center gap-3">
                        <img src={pdfImage} alt="pdfImage" />
                        <h4 className="text-base text-[#3F3F3F] font-medium leading-6">Topic Name.PDF</h4>
                        <p className="text-sm text-slate-700 font-normal leading-5">Aug 1, 11AM</p>
                    </div>
                    <View className="w-6 h-6" />
                </div>
                <div className="flex justify-between items-center border-b border-b-slate-300 pb-2 pl-2">
                    <div className="flex items-center gap-3">
                        <img src={pdfImage} alt="pdfImage" />
                        <h4 className="text-base text-[#3F3F3F] font-medium leading-6">Topic Name.PDF</h4>
                        <p className="text-sm text-slate-700 font-normal leading-5">Aug 1, 11AM</p>
                    </div>
                    <View className="w-6 h-6" />
                </div>
                <div className="flex justify-between items-center border-b border-b-slate-300 pb-2 pl-2">
                    <div className="flex items-center gap-3">
                        <img src={pdfImage} alt="pdfImage" />
                        <h4 className="text-base text-[#3F3F3F] font-medium leading-6">Topic Name.PDF</h4>
                        <p className="text-sm text-slate-700 font-normal leading-5">Aug 1, 11AM</p>
                    </div>
                    <View className="w-6 h-6" />
                </div>
                <div className="flex justify-between items-center border-b border-b-slate-300 pb-2 pl-2">
                    <div className="flex items-center gap-3">
                        <img src={pdfImage} alt="pdfImage" />
                        <h4 className="text-base text-[#3F3F3F] font-medium leading-6">Topic Name.PDF</h4>
                        <p className="text-sm text-slate-700 font-normal leading-5">Aug 1, 11AM</p>
                    </div>
                    <View className="w-6 h-6" />
                </div>
            </div>
        </div>
    )
}

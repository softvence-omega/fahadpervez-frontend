import CommonButton from "@/common/button/CommonButton";
import CommonHeader from "@/common/header/CommonHeader";
import { Plus } from "lucide-react";
import { useState } from "react";

const inputClass = {
  label: "block text-sm font-normal text-[#020617] font-inter mb-2",
  input:
    "w-full border border-[#CBD5E1] bg-white rounded-md p-3 outline-none text-[#94A3B8] text-xs",
  error: "text-red-500 text-sm mt-1",
};
const VideoInput = () => {
  const [videoUrl, setVideoUrl] = useState("");

  return (
    <div>
      <CommonHeader className="pb-6">Tutorial</CommonHeader>
      <div className="bg-white p-6">
        <div className="flex gap-2  mb-4">
          <CommonButton className="flex-1 !bg-blue-600 !text-white">
            Embedded link
          </CommonButton>
          <CommonButton className="flex-1 ">Media</CommonButton>
        </div>

        <label className={inputClass.label}>Video Url</label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="https://www.youtube.com/"
            className={inputClass.input}
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
          <button
            className="p-3 text-green-600 hover:bg-green-50 rounded-md border border-gray-300 transition cursor-pointer"
            aria-label="Add item"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoInput;

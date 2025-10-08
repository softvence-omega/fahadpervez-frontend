import React from "react";
import { Play } from "lucide-react";

interface VideoButtonProps {
  title: string;
  duration: string;
}

const VideoButton: React.FC<VideoButtonProps> = ({ title, duration }) => (
  <button className="flex items-center gap-3 w-full p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors mb-2">
    <div className="bg-blue-600 rounded p-2">
      <Play className="w-4 h-4 text-white fill-white" />
    </div>
    <div className="text-left">
      <div className="font-medium text-gray-800 text-sm">{title}</div>
      <div className="text-xs text-gray-500">{duration}</div>
    </div>
  </button>
);

export default VideoButton;

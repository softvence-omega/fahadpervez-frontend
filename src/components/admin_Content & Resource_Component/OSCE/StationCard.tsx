import React from "react";
import { Eye, Trash2, PlayCircle, Clock, List } from "lucide-react";

interface StationCardProps {
  title: string;
  steps: number;
  videos: number;
  duration: string;
  description: string;
  category: string;
  onViewStation?: () => void;
  onDelete?: () => void;
  onPublish?: () => void;
  onClick?: () => void;
}

const StationCard: React.FC<StationCardProps> = ({
  title,
  steps,
  videos,
  duration,
  description,
  category,
  onViewStation,
  onDelete,
  onPublish,
  onClick
}) => {
  return (
    <div className="p-5 hover:shadow-md transition rounded border border-slate-300 bg-white" onClick={onClick} >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          {/* Title */}
          <h2 className="text-lg font-semibold text-gray-900 mb-2">{title}</h2>

          {/* Meta info */}
          <div className="flex items-center text-sm text-gray-600 gap-4 mb-3">
            <span className="flex items-center gap-1.5">
              <List className="w-4 h-4" /> {steps} steps
            </span>
            <span className="flex items-center gap-1.5">
              <PlayCircle className="w-4 h-4" /> {videos.toString().padStart(2, "0")} videos
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> {duration}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-700 text-sm mb-4">{description}</p>

          {/* Category + Action Buttons */}
          <div className="flex items-center gap-3">
            <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-md font-medium">
              {category}
            </span>
            <button
              onClick={onViewStation}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              <Eye className="w-4 h-4" /> View Station
            </button>
            <button
              onClick={onDelete}
              className="p-1.5 border border-gray-300 rounded-md text-red-600 hover:bg-red-50 transition focus:outline-none focus:ring-2 focus:ring-red-300"
              aria-label="Delete station"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Publish button */}
        <button
          onClick={onPublish}
          className=" text-white px-4 py-1.5 text-sm font-medium hover:scale-105 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ml-6 rounded-full bg-gradient-to-tr from-[#0076F5] to-[#0058B8]"
        >
          Publish
        </button>
      </div>
    </div>
  );
};

export default StationCard;
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
  onClick,
}) => {
  return (
    <div
      className="p-5 hover:shadow-md transition rounded border border-slate-300 bg-white w-full sm:max-w-full"
      onClick={onClick}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex-1 flex flex-col gap-3">
          {/* Title */}
          <h2 className="text-lg font-semibold text-gray-900 break-words">{title}</h2>

          {/* Meta info */}
          <div className="flex flex-wrap items-center text-sm text-gray-600 gap-3">
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
          <p className="text-gray-700 text-sm break-words">{description}</p>

          {/* Category + Actions */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
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
        <div className="flex-shrink-0 w-full sm:w-auto mt-3 sm:mt-0">
          <button
            onClick={onPublish}
            className="w-full sm:w-auto text-white px-4 py-1.5 text-sm font-medium hover:scale-105 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full bg-gradient-to-tr from-[#0076F5] to-[#0058B8]"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default StationCard;

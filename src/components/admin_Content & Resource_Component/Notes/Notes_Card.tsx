import React from "react";
import { Trash2, FileText } from "lucide-react";

interface Notes_CardProps {
  category: string;
  title: string;
  description: string;
  pages: number;
  status: "draft" | "published";
  onPublish?: () => void;
  onDelete?: () => void;
}

const Notes_Card: React.FC<Notes_CardProps> = ({
  category,
  title,
  description,
  pages,
  status,
  onPublish,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200 flex flex-col h-full">
      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Category + PDF icon */}
        <div className="flex justify-between items-start mb-3">
          <span className="bg-yellow-50 text-yellow-700 text-xs font-medium px-3 py-1 rounded-md border border-yellow-200">
            {category}
          </span>
          <div className="bg-blue-50 p-1.5 rounded">
            <FileText className="w-4 h-4 text-blue-600" />
          </div>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 text-base mb-2 leading-tight">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
          {description}
        </p>

        {/* Pages */}
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-1">Pages</p>
          <p className="text-sm text-gray-900">{pages}</p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2 px-5 pb-5">
        {status === "draft" ? (
          <button
            onClick={onPublish}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded-md transition-colors duration-200"
          >
            Publish Notes
          </button>
        ) : (
          <button
            className="flex-1 bg-green-600 text-white text-sm font-medium py-2.5 rounded-md cursor-default"
            disabled
          >
            Published
          </button>
        )}

        {/* Delete button */}
        <button
          onClick={onDelete}
          className="p-2.5 bg-red-50 hover:bg-red-100 rounded-md border border-red-100 transition-colors duration-200"
        >
          <Trash2 className="w-4 h-4 text-red-600" />
        </button>
      </div>
    </div>
  );
};

export default Notes_Card;
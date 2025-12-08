import { CareerResource } from "@/store/features/adminDashboard/ContentResources/resourceCariier/types/resorce";
import { DownloadIcon, FileText, StarIcon, Trash2Icon } from "lucide-react";
import React from "react";

interface Props {
  data: CareerResource[]; // Receive array from backend
}

const ResourceCard: React.FC<Props> = ({ data }) => {
  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Notes</h1>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer">
          View All
        </button>
      </div>

      {/* Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {data.map((resource) => (
          <div
            key={resource._id}
            className="shadow-sm hover:shadow-md transition flex flex-col p-5 gap-4 rounded-lg border border-slate-200 bg-white"
          >
            {/* Header */}
            <div className="flex justify-between items-start">
              {/* File Icon */}
              <div className="bg-red-50 p-2 rounded-md">
                <FileText className="text-red-500 w-5 h-5" />
              </div>

              {/* Favorite */}
              <button className="hover:text-gray-600">
                <StarIcon className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Title & Description */}
            <div>
              <h3 className="font-semibold text-gray-900 text-base mb-2">
                {resource.resourceName}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {resource.description}
              </p>
            </div>

            {/* Tags */}
            <div className="flex gap-2 flex-wrap">
              {resource.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs text-gray-700 rounded border border-slate-200 bg-gray-50"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Downloads (backend has no downloads, so show 0) */}
            <div className="flex items-center text-sm text-gray-500 gap-2">
              <DownloadIcon className="w-4 h-4 text-gray-400" />
              <span>0 downloads</span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 mt-2">
              <button
                className={`flex-1 py-2.5 rounded-md text-sm font-medium transition-colors cursor-pointer bg-blue-600 hover:bg-blue-700 text-white`}
              >
                Publish Resource
              </button>

              <button className="p-2.5 rounded-md border border-slate-200 hover:bg-gray-50 transition-colors cursor-pointer">
                <Trash2Icon className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceCard;

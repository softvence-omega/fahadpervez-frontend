// components/ResourceCard.tsx
import React from "react";
import { FaRegFileAlt, FaRegStar } from "react-icons/fa";
import { Trash2, DownloadIcon, StarIcon } from "lucide-react";

type ResourceCardProps = {
  title: string;
  description: string;
  tags: string[];
  downloads: number;
  published: boolean;
  isFavorite?: boolean;
};

const ResourceCard: React.FC<ResourceCardProps> = ({
  title,
  description,
  tags,
  downloads,
  published,
  isFavorite = false,
}) => {
  function onDelete(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    event.preventDefault();
    // You might want to show a confirmation dialog or call a prop callback here.
    // For now, we'll just log to the console.
    console.log(`Delete requested for resource: ${title}`);
  }
  return (
    <div className="shadow-sm hover:shadow-md transition flex flex-col p-5 gap-4 sm:gap-6 rounded-lg border border-slate-300 bg-white w-full">
      {/* Header */}
      <div className="flex justify-between items-start">
        {/* File Icon */}
        <div className="bg-red-100 p-2 rounded-md">
          <FaRegFileAlt className="text-red-500 w-5 h-5" />
        </div>

        {/* Favorite */}
        <button className="text-zinc-950 hover:text-gray-600">
          {isFavorite ? <StarIcon className="text-zinc-950" /> : <FaRegStar />}
        </button>
      </div>

      {/* Title & Description */}
      <div>
        <h3 className="font-semibold text-gray-900 text-base">{title}</h3>
        <p className="text-sm text-[#717182]">{description}</p>
      </div>

      {/* Tags */}
      <div className="flex gap-2 flex-wrap">
        {tags.map((tag, i) => (
          <span
            key={i}
            className="px-3 py-1 text-xs text-gray-700 text-nowrap rounded border border-slate-300"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Downloads */}
      <div className="flex items-center text-sm text-gray-500 gap-2">
        <DownloadIcon className="text-gray-400" />
        <span>{downloads.toLocaleString()} downloads</span>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mt-3 gap-2">
        <button
          className={`flex-1 py-2.5 rounded-md text-sm font-medium transition-colors ${
            published
              ? "bg-green-700 text-white cursor-default"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {published ? "Published Resource" : "Publish Resource"}
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
  );
};

export default ResourceCard;

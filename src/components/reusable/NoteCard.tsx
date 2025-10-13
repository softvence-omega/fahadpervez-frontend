import { Download, View } from "lucide-react";
import { FaFilePdf } from "react-icons/fa6";
import React from "react";
import { Button } from "../ui/button";

interface NoteCardProps {
  tag: string;
  title: string;
  description: string;
  chapter: number | string;
  pages: number | string;
  downloads?: number | string;
  showDownload?: boolean; // optional
  onViewNotes?: () => void;
  onDownload?: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({
  tag,
  title,
  description,
  chapter,
  pages,
  downloads,
  showDownload = true,
  onViewNotes,
  onDownload,
}) => {
  return (
    <div className="p-6 border border-gray-300 rounded-2xl">
      {/* Tag + Icon */}
      <div className="flex justify-between items-center mb-3">
        <p className="text-sm text-yellow-800 font-medium leading-5 bg-yellow-100 px-3 py-2 rounded-2xl">
          {tag}
        </p>
        <FaFilePdf className="text-[var(--color-blue-btn-1)] w-6 h-6" />
      </div>

      {/* Title & Description */}
      <h2 className="text-2xl text-black font-semibold leading-8">{title}</h2>
      <p className="text-base text-slate-700 font-normal leading-6 mt-2 mb-9">
        {description}
      </p>

      {/* Meta Info */}
      <div className="flex justify-between flex-wrap gap-5">
        <div>
          <h3 className="text-base text-black font-medium leading-6">
            Chapter
          </h3>
          <p className="text-base text-black font-normal leading-6 mt-1">
            {chapter}
          </p>
        </div>

        <div>
          <h3 className="text-base text-black font-medium leading-6">Pages</h3>
          <p className="text-base text-black font-normal leading-6 mt-1">
            {pages}
          </p>
        </div>

        {showDownload && (
          <div>
            <h3 className="text-base text-black font-medium leading-6">
              Downloads
            </h3>
            <p className="text-base text-black font-normal leading-6 mt-1">
              {downloads}
            </p>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="grid md:grid-cols-2 mt-8 gap-4">
        {showDownload ? (
          <>
            <Button
              onClick={onViewNotes}
              className="bg-yellow-900 hover:bg-yellow-800 text-white  rounded-[6px] cursor-pointer md:text-lg py-2 h-auto"
            >
              <View className="w-5 h-5" />
              View Notes
            </Button>
            <Button
              onClick={onDownload}
              className="bg-green-900 hover:bg-green-800 text-white  rounded-[6px] cursor-pointer md:text-lg py-2 h-auto"
            >
              <Download className="w-5 h-5" /> Download PDF
            </Button>
          </>
        ) : (
          <Button
            onClick={onViewNotes}
            className="bg-emerald-700 hover:bg-emerald-600 text-white py-2 rounded-[6px] cursor-pointer"
          >
            View Notes
          </Button>
        )}
      </div>
    </div>
  );
};

export default NoteCard;

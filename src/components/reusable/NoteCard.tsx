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
  pdfUrl: string;
  pdfId: string;
  showDownload?: boolean;
  onViewNotes?: () => void;
  onDownload?: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({
  tag,
  title,
  description,
  // chapter,
  pages,
  downloads,
  showDownload = true,
  onViewNotes,
  onDownload,
}) => {
  return (
    <div className="p-6 border border-gray-300 rounded-2xl">
      {/* Tag + PDF Icon */}
      <div className="flex justify-between items-center mb-3">
        <p className="text-sm text-yellow-800 font-medium bg-yellow-100 px-3 py-2 rounded-2xl">
          {tag}
        </p>
        <FaFilePdf className="text-[var(--color-blue-btn-1)] w-6 h-6" />
      </div>

      {/* Title & Description */}
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="text-base text-slate-700 mt-2 mb-9">{description}</p>

      {/* Meta Info */}
      <div className="flex flex-wrap gap-14">
        {/* <div>
          <h3 className="text-base font-medium">Chapter</h3>
          <p className="text-base mt-1">{chapter}</p>
        </div> */}
        <div>
          <h3 className="text-base font-medium">Pages</h3>
          <p className="text-base mt-1">{pages}</p>
        </div>
        {showDownload && (
          <div>
            <h3 className="text-base font-medium">Downloads</h3>
            <p className="text-base mt-1">{downloads}</p>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="grid md:grid-cols-2 mt-8 gap-4">
        <Button
          onClick={onViewNotes}
          className="bg-yellow-900 hover:bg-yellow-800 text-white rounded-[6px] cursor-pointer md:text-lg py-2 h-auto flex items-center justify-center gap-2"
        >
          <View className="w-5 h-5" /> View Notes
        </Button>

        {showDownload && (
          <Button
            onClick={onDownload}
            className="bg-green-900 hover:bg-green-800 text-white rounded-[6px] cursor-pointer md:text-lg py-2 h-auto flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" /> Download PDF
          </Button>
        )}
      </div>
    </div>
  );
};

export default NoteCard;

import { Download } from "lucide-react";
import { FaFilePdf } from "react-icons/fa6";
import React from "react";

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
                    <h3 className="text-base text-black font-medium leading-6">Chapter</h3>
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
            <div className="flex flex-col sm:flex-row mt-9 gap-4 sm:gap-5">
                {showDownload ? (
                    <>
                        <button
                            onClick={onViewNotes}
                            className="w-full sm:w-auto border border-slate-300 py-2 px-7 rounded-[6px] cursor-pointer"
                        >
                            View Notes
                        </button>
                        <button
                            onClick={onDownload}
                            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-green-900 hover:bg-green-800 text-white py-2 px-6 rounded-[6px] cursor-pointer"
                        >
                            <Download className="w-5 h-5" /> Download PDF
                        </button>
                    </>
                ) : (
                    <button
                        onClick={onViewNotes}
                        className="w-full bg-emerald-700 hover:bg-emerald-600 text-white py-2 rounded-[6px] cursor-pointer"
                    >
                        View Notes
                    </button>
                )}
            </div>
        </div>
    );
};

export default NoteCard;

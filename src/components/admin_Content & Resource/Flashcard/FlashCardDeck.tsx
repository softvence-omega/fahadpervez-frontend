import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
interface FlashcardDeckCardProps {
  title: string;
  cards: number;
  subject: string;
  created: string;
  onPublish?: () => void;
  onAddFlashcard?: () => void;
  onDelete?: () => void;
}

const FlashcardDeckCard: React.FC<FlashcardDeckCardProps> = ({
  title,
  cards,
  subject,
  created,
  onPublish,
  onAddFlashcard,
  onDelete
}) => {
  return (
    <div className="shadow-sm hover:shadow-md transition flex flex-col p-5 gap-4 sm:gap-6 rounded-lg border border-slate-300 bg-white w-full">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">{title}</h3>
        <button
          onClick={onPublish}
          className="px-4 py-1.5 bg-blue-600 text-white text-sm sm:text-base font-medium hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex-shrink-0 rounded-full bg-gradient-to-tr from-[#0076F5] to-[#0058B8]"
        >
          Publish
        </button>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 text-sm">
        <span className="text-gray-600">Cards:</span>
        <span className="text-gray-900 font-medium text-right">{cards}</span>

        <span className="text-gray-600">Subject:</span>
        <span className="text-gray-900 font-medium text-right">{subject}</span>

        <span className="text-gray-600">Created:</span>
        <span className="text-gray-900 font-medium text-right">{created}</span>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 mt-2">
        <button
          onClick={onAddFlashcard}
          className="rounded-sm bg-gradient-to-tr from-[#0076F5] to-[#0058B8] flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm sm:text-base font-medium transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Plus className="w-4 h-4" />
          Add Flashcard
        </button>
        <button
          onClick={onDelete}
          className="p-2 text-red-600 hover:bg-red-50 rounded-md transition focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex-shrink-0"
          aria-label="Delete deck"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default FlashcardDeckCard;

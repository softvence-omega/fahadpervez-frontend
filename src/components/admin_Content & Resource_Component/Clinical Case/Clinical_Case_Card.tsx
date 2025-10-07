import React from 'react';
import { Eye, Trash2, StethoscopeIcon, UserIcon, PencilLineIcon } from 'lucide-react';

interface Clinical_Case_CardProps {
  title: string;
  category: string;
  gender: "Male" | "Female" | "Other";
  questionNumber?: number;
  questionType: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'Publish' | 'Draft';
  onView?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
}

const Clinical_Case_Card: React.FC<Clinical_Case_CardProps> = ({
  title,
  category,
  gender,
  questionNumber = 0,
  questionType,
  difficulty,
  status,
  onView,
  onDelete,
  onEdit,
}) => {
  const statusColor = status === 'Publish' ? 'bg-blue-600' : 'bg-gray-400';
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-base font-semibold text-gray-900 flex-1 pr-4">
          {title}
        </h3>
        <button className={`${statusColor} text-white text-xs font-medium px-4 py-1.5 rounded-full bg-[linear-gradient(103deg,#0076F5_6.94%,#0058B8_99.01%)]`}>
          {status}
        </button>
      </div>

      {/* Info Row */}
      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
        <div className="flex items-center gap-1.5">
          <StethoscopeIcon className="w-4 h-4 text-zinc-950" />
          <span>{category}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <UserIcon className="w-4 h-4 text-zinc-950" />
          <span>{gender}</span>
        </div>
      </div>

      {/* Question Type */}
      <div className="mb-3 gap-2 flex items-center">
        <span className="text-sm text-gray-500">{questionNumber}</span>
        <span className="text-sm text-gray-900">{questionType}</span>
      </div>

      {/* Difficulty Badge */}
      <div className="mb-4">
        <span className="inline-block text-gray-700 text-xs font-medium px-3 py-1 rounded-full border border-slate-300">
          {difficulty}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={onView}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          <Eye className="w-4 h-4" />
          <span>View Case</span>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation(); // ✅ Prevent card click
            onDelete?.();
          }}
          className="p-2 text-red-500 border border-red-100 rounded-md hover:bg-red-100 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
        <button
          onClick={onEdit}
          className="p-2 text-gray-600 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 transition-colors"
        >
          <PencilLineIcon className="w-4 h-4 text-amber-500" />
        </button>
      </div>
    </div>
  );
};

export default Clinical_Case_Card;

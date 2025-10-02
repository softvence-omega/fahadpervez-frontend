import { ChevronDown } from "lucide-react";

interface BasicInfoProps {
  title: string;
  specialty: string;
  duration: string;
  description: string;
  onTitleChange: (value: string) => void;
  onSpecialtyChange: (value: string) => void;
  onDurationChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
}

const BasicInfo: React.FC<BasicInfoProps> = ({
  title,
  specialty,
  duration,
  description,
  onTitleChange,
  onSpecialtyChange,
  onDurationChange,
  onDescriptionChange
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Medical Speciality</label>
          <div className="relative">
            <input
              type="text"
              value={specialty}
              onChange={(e) => onSpecialtyChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
          <input
            type="text"
            value={duration}
            onChange={(e) => onDurationChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Enter description"
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
          />
        </div>
      </div>
    </div>
  );
};


export default BasicInfo;
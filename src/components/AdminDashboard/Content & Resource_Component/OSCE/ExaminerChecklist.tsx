import { Trash2, PlusCircle, Plus } from 'lucide-react';

interface ExaminerChecklistProps {
  checklistName: string;
  checklistItems: string[];
  onUpdate: (index: number, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

const ExaminerChecklist: React.FC<ExaminerChecklistProps> = ({
  checklistName,
  checklistItems,
  onUpdate,
  onAdd,
  onRemove
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Examiner Checklist</h2>
      <div className="border border-gray-200 rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Task 1</label>
          <label className="block text-sm font-medium text-gray-700 mb-2">Checklist Name</label>
          <div className="px-4 py-2 bg-blue-50 text-gray-900 rounded-md mb-4">
            {checklistName}
          </div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Checklist 1</label>
          {checklistItems.map((item, index) => (
            <div key={index} className="flex gap-3 mb-3">
              <input
                type="text"
                value={item}
                onChange={(e) => onUpdate(index, e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              {index === checklistItems.length - 1 ? (
                <button
                  onClick={onAdd}
                  className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <PlusCircle className="w-5 h-5 text-gray-600" />
                </button>
              ) : (
                <button
                  onClick={() => onRemove(index)}
                  className="p-2 border border-gray-300 rounded-md hover:bg-red-50"
                >
                  <Trash2 className="w-5 h-5 text-red-600" />
                </button>
              )}
            </div>
          ))}
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          Add Checklist Item
        </button>
      </div>
    </div>
  );
};

export default ExaminerChecklist;
import { PlusCircle, Trash2 } from "lucide-react";

interface InstructionProps {
  instructions: string[];
  onUpdate: (index: number, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

const Instructions: React.FC<InstructionProps> = ({
  instructions,
  onUpdate,
  onAdd,
  onRemove
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Candidate Instruction</h2>
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Instruction</label>
        {instructions.map((instruction, index) => (
          <div key={index} className="flex gap-3">
            <input
              type="text"
              value={instruction}
              onChange={(e) => onUpdate(index, e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            {index === instructions.length - 1 ? (
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
    </div>
  );
};

export default Instructions;
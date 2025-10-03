import React, { ReactNode } from "react";
import { Check } from "lucide-react";
import ChecklistItem from "./ChecklistItem";

interface ChecklistSectionProps {
  icon: ReactNode;
  title: string;
  items: string[];
  checkedItems: Record<string, boolean>;
  onToggle: (item: string) => void;
}

const ChecklistSection: React.FC<ChecklistSectionProps> = ({
  icon,
  title,
  items,
  checkedItems,
  onToggle,
}) => {
  const allChecked = items.every((item) => checkedItems[item]);

  return (
    <div className="border border-gray-200 rounded-lg mb-3">
      <div
        className={`flex items-center gap-2 p-3 ${
          allChecked ? "bg-green-50" : "bg-white"
        } border-b border-gray-200`}
      >
        <span className="text-lg">{icon}</span>
        <span className="font-medium text-gray-800 text-sm">{title}</span>
        {allChecked && <Check className="w-4 h-4 text-green-600 ml-auto" />}
      </div>
      <div className="p-2">
        {items.map((item) => (
          <ChecklistItem
            key={item}
            label={item}
            checked={checkedItems[item] || false}
            onChange={() => onToggle(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default ChecklistSection;

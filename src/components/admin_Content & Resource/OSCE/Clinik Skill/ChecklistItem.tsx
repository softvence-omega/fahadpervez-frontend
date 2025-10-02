import React from "react";

interface ChecklistItemProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

const ChecklistItem: React.FC<ChecklistItemProps> = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
    />
    <span className={`text-sm ${checked ? "text-gray-600 line-through" : "text-gray-700"}`}>
      {label}
    </span>
  </label>
);

export default ChecklistItem;

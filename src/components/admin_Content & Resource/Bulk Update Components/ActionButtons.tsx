import React from 'react';

interface ActionButtonsProps {
  onImport: () => void;
  onCancel: () => void;
  importLabel: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onImport, onCancel, importLabel }) => (
  <div className="flex gap-4">
    <button
      onClick={onImport}
      className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      {importLabel}
    </button>
    <button
      onClick={onCancel}
      className="px-6 py-2.5 text-gray-700 font-medium rounded-md hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
    >
      Cancel
    </button>
  </div>
);

export default ActionButtons;

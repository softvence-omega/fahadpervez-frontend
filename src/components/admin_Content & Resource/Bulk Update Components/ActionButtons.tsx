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
      className="px-6 bg-gradient-to-tr from-[#0076F5] to-[#0058B8] py-2.5 text-white font-medium rounded-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      {importLabel}
    </button>
    <button
      onClick={onCancel}
      className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
    >
      Cancel
    </button>
  </div>
);

export default ActionButtons;

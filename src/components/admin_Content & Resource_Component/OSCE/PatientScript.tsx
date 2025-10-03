import { Plus } from "lucide-react";

interface PatientScriptProps {
  scripts: Array<{ headline: string; description: string }>;
}

const PatientScript: React.FC<PatientScriptProps> = ({ scripts }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Patient Script</h2>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          Add Script
        </button>
      </div>
      <div className="space-y-6">
        {scripts.map((script, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Headline</label>
              <div className="px-4 py-2 bg-blue-50 text-gray-900 rounded-md">
                {script.headline}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <div className="px-4 py-3 bg-blue-50 text-gray-900 rounded-md whitespace-pre-line">
                {script.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientScript;
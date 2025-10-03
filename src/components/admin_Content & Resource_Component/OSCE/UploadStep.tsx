import { Upload } from 'lucide-react';

const UploadStep: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Upload</h2>
      <div className="border border-gray-200 rounded-lg p-6">
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <Upload className="w-4 h-4" />
            <h3 className="font-medium text-gray-900">Upload Media</h3>
          </div>
          <p className="text-sm text-gray-600">Upload images or videos For Practice OSCE</p>
        </div>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-16 text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Upload className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-base font-medium text-gray-900 mb-1">Click to upload files</p>
            <p className="text-xs text-gray-500">
              Upload supporting materials like images, videos documents(Max 100MB)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadStep;
import { useState } from 'react';
import { Upload, ChevronDown } from 'lucide-react';

interface Upload_New_ResourceProps {
  onBack?: () => void;
}

const Upload_New_Resource: React.FC<Upload_New_ResourceProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Cardiovascular',
    description: '',
    tags: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  interface FormData {
    title: string;
    category: string;
    description: string;
    tags: string;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({
      ...prev,
      [name]: value
    }));
  };

  interface FileUploadEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & EventTarget;
  }

  const handleFileUpload = (e: FileUploadEvent) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUploadClick = () => {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleSubmit = () => {
    console.log('Form Data:', formData);
    console.log('File:', selectedFile);
    // After successful upload, you can call onBack to return to homepage
    // if (onBack) onBack();
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Upload New Resource</h1>
          <p className="text-gray-600 text-sm">
            Upload educational resources including OSCE stations, study notes, career guides, and general materials.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white p-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Upload Resource</h2>

          <div className="space-y-5 border border-gray-300 p-10 rounded-md">
            {/* Notes Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Cardiovascular Examination"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            {/* Career Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Career Category
              </label>
              <div className="relative">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm appearance-none bg-white"
                >
                  <option value="Cardiovascular">Cardiovascular</option>
                  <option value="Respiratory">Respiratory</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Anatomy">Anatomy</option>
                  <option value="Physiology">Physiology</option>
                  <option value="Surgery">Surgery</option>
                  <option value="Pediatrics">Pediatrics</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Cardiovascular"
                rows={4}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="Cardiovascular"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            {/* Upload Media Section */}
            <div className="pt-4">
              <div className="flex items-center gap-2 mb-2">
                <Upload className="w-4 h-4 text-gray-700" />
                <label className="text-sm font-medium text-gray-700">
                  Upload Media
                </label>
              </div>
              <p className="text-xs text-gray-500 mb-4">
                Upload Images or Videos For Practice OSCE
              </p>

              {/* File Upload Area */}
              <div 
                onClick={handleUploadClick}
                className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
              >
                <input
                  id="fileInput"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="flex flex-col items-center">
                  <div className="bg-blue-50 p-3 rounded-full mb-3">
                    <Upload className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Click to Upload study notes file
                  </p>
                  <p className="text-xs text-gray-500">
                    PDF, DOC (Max 25MB)
                  </p>
                  {selectedFile && (
                    <p className="mt-3 text-sm text-green-600 font-medium">
                      Selected: {selectedFile.name}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 mt-8">
            <button
              onClick={handleBack}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors text-sm"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors text-sm"
            >
              Upload Resource
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload_New_Resource;
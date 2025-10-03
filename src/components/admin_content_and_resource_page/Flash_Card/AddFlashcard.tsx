import React, { useState } from 'react';
import { Upload, Plus } from 'lucide-react';

const AddFlashcard: React.FC = () => {
  const [subject, setSubject] = useState('Cardiology');
  const [frontSide, setFrontSide] = useState('');
  const [backSide, setBackSide] = useState('');
  const [explanation, setExplanation] = useState('');

  const handleSave = () => {
    console.log({
      subject,
      frontSide,
      backSide,
      explanation
    });
    alert('Flashcard Saved!');
  };

  const handleSaveAndAddAnother = () => {
    handleSave();
    // Reset form
    setFrontSide('');
    setBackSide('');
    setExplanation('');
  };

  const handleBulkUpload = () => {
    console.log('Opening bulk upload...');
    alert('Bulk Upload feature');
  };

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto ">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Add Flashcard</h1>
            <p className="text-sm text-gray-600 mt-1">
              Basic concepts in cardiovascular medicine
            </p>
          </div>
          <button
            onClick={handleBulkUpload}
            className="rounded-sm bg-blue-700 inline-flex items-center gap-2 px-4 py-2  text-white text-sm font-medium hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Upload className="w-4 h-4" />
            Bulk Upload
          </button>
        </div>

        <div className="space-y-6 bg-white rounded-lg  p-8">
          {/* Subject Field */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* Front Side Field */}
          <div>
            <label htmlFor="frontSide" className="block text-sm font-medium text-gray-700 mb-2">
              Front Side (Question/Term)
            </label>
            <textarea
              id="frontSide"
              value={frontSide}
              onChange={(e) => setFrontSide(e.target.value)}
              rows={4}
              placeholder="Enter the question"
              className="rounded-sm border border-slate-300 bg-[#EFF6FF]/60 w-full px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
            />
          </div>

          {/* Back Side Field */}
          <div>
            <label htmlFor="backSide" className="block text-sm font-medium text-gray-700 mb-2">
              Back Side (Answer/Definition)
            </label>
            <textarea
              id="backSide"
              value={backSide}
              onChange={(e) => setBackSide(e.target.value)}
              rows={4}
              placeholder="Enter the Answer"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
            />
          </div>

          {/* Explanation Field */}
          <div>
            <label htmlFor="explanation" className="block text-sm font-medium text-gray-700 mb-2">
              Explanation
            </label>
            <textarea
              id="explanation"
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              rows={4}
              placeholder="Explain"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
            />
          </div>
        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={handleSave}
            className="rounded-sm bg-gradient-to-tr from-[#0076F5] to-[#0058B8] inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-medium hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Plus className="w-4 h-4" />
            Save Flashcard
          </button>
          <button
            onClick={handleSaveAndAddAnother}
            className="px-6 py-2.5 text-gray-700 border border-gray-300 font-medium rounded-md hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
          >
            Save & Add Another
          </button>
        </div>
        </div>
 
      </div>
    </div>
  );
};

export default AddFlashcard;
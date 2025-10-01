// import React, { useState } from 'react';
// import { Upload } from 'lucide-react';

// const BulkUploadCards: React.FC = () => {
//   const [detectedCount, setDetectedCount] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);

//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = () => {
//     setIsDragging(false);
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragging(false);
//     const files = e.dataTransfer.files;
//     if (files.length > 0) {
//       handleFile(files[0]);
//     }
//   };

//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       handleFile(e.target.files[0]);
//     }
//   };

//   const handleFile = (file: File) => {
//     // Simulate file processing
//     setDetectedCount(Math.floor(Math.random() * 50) + 1);
//     console.log('File uploaded:', file.name);
//   };

//   const handleImport = () => {
//     console.log('Importing cards...');
//     alert('Cards imported successfully!');
//   };

//   const handleCancel = () => {
//     window.history.back();
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-2xl font-semibold text-gray-900 mb-1">
//           Bulk Upload Questions
//         </h1>
//         <p className="text-sm text-gray-600 mb-8">
//           Basic concepts in cardiovascular medicine
//         </p>

//         {/* Upload Section */}
//         <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
//           <div className="mb-6">
//             <h2 className="text-base font-medium text-gray-900 mb-1">
//               Upload Media
//             </h2>
//             <p className="text-sm text-gray-600">
//               Upload images or videos to generate AI-powered Notes
//             </p>
//           </div>

//           <div
//             onDragOver={handleDragOver}
//             onDragLeave={handleDragLeave}
//             onDrop={handleDrop}
//             className={`border-2 border-dashed rounded-lg p-16 text-center transition ${
//               isDragging
//                 ? 'border-blue-500 bg-blue-50'
//                 : 'border-gray-300 bg-gray-50'
//             }`}
//           >
//             <div className="flex flex-col items-center">
//               <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
//                 <Upload className="w-6 h-6 text-blue-600" />
//               </div>
//               <h3 className="text-base font-medium text-gray-900 mb-2">
//                 Upload Question files
//               </h3>
//               <p className="text-sm text-gray-600 mb-1">
//                 click to browse CSV or Excel file here
//               </p>
//               <p className="text-xs text-gray-500">
//                 Supported formats: .csv, .xlsx, .xls (Max 10MB)
//               </p>
//               <input
//                 type="file"
//                 accept=".csv,.xlsx,.xls"
//                 onChange={handleFileSelect}
//                 className="hidden"
//                 id="file-upload"
//               />
//               <label
//                 htmlFor="file-upload"
//                 className="absolute inset-0 cursor-pointer"
//               >
//                 <span className="sr-only">Choose file</span>
//               </label>
//             </div>
//           </div>
//         </div>

//         {/* Required Columns Section */}
//         <div className="bg-blue-50 rounded-lg p-6 mb-6">
//           <h3 className="text-sm font-semibold text-gray-900 mb-4">
//             Required Columns:
//           </h3>
//           <div className="space-y-2 text-sm">
//             <div>
//               <span className="font-medium text-gray-900">Subject:</span>{' '}
//               <span className="text-gray-700">Subject category</span>
//             </div>
//             <div>
//               <span className="font-medium text-gray-900">Front Side:</span>{' '}
//               <span className="text-gray-700">Basic: Front Side (Question/Term)</span>
//             </div>
//             <div>
//               <span className="font-medium text-gray-900">Back Side:</span>{' '}
//               <span className="text-gray-700">Back Side (Answer/Definition)</span>
//             </div>
//             <div>
//               <span className="font-medium text-gray-900">Explanation:</span>{' '}
//               <span className="text-gray-700">Detailed explanation for correct answer</span>
//             </div>
//           </div>
//         </div>

//         {/* Upload Preview Section */}
//         <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-base font-medium text-gray-900">Upload Preview</h3>
//             <span className="text-sm text-gray-600">
//               {detectedCount} Cards detected
//             </span>
//           </div>
//           <p className="text-sm text-gray-600">
//             Upload a file to see preview and validation results
//           </p>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex gap-4">
//           <button
//             onClick={handleImport}
//             className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//           >
//             Import Cards
//           </button>
//           <button
//             onClick={handleCancel}
//             className="px-6 py-2.5 text-gray-700 font-medium rounded-md hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BulkUploadCards;
// import React, { useState } from 'react';
// import { Plus, Trash2, Upload, PlusCircle, ChevronDown } from 'lucide-react';

// type Step = 'basic' | 'instruction' | 'script' | 'checklist' | 'upload';

// const Create_New_OSCE: React.FC = () => {
//   const [currentStep, setCurrentStep] = useState<Step>('basic');
  
//   // Basic Information
//   const [title, setTitle] = useState('Cardiovascular Examination');
//   const [specialty, setSpecialty] = useState('Cardiovascular');
//   const [duration, setDuration] = useState('15 Min');
//   const [description, setDescription] = useState('');
  
//   // Instruction
//   const [instructions, setInstructions] = useState([
//     'You are a medical student working in the emergency department',
//     'A 34-year-old woman has presented for assessment'
//   ]);
  
//   // Patient Script
//   const [scripts, setScripts] = useState([
//     {
//       headline: 'Presenting complaint',
//       description: 'Epigastric pain ("It\'s my tummy, it just hurts so much")'
//     },
//     {
//       headline: 'History of presenting complaint',
//       description: `Abdominal pain

// • Epigastric pain ("It's my tummy, it just hurts so much")
// • Site: epigastric ("It hurts in the middle, right under my ribs")
// • suddenly, 90 minutes ago ("It came on suddenly about one and a half hours ago")
// • Character: sharp ("It's a sharp, gripping pain")
// • Site: epigastric ("It hurts in the middle, right under my ribs")`
//     }
//   ]);
  
//   // Checklist
//   const [checklistName, setChecklistName] = useState('Introduction & Consent');
//   const [checklistItems, setChecklistItems] = useState([
//     'Introduce yourself to patient',
//     'Obtain informed consent'
//   ]);

//   const steps = [
//     { id: 'basic', label: 'Basic Information' },
//     { id: 'instruction', label: 'Instruction' },
//     { id: 'script', label: 'Patient Script' },
//     { id: 'checklist', label: 'Examiner Checklist' },
//     { id: 'upload', label: 'Upload' }
//   ];

//   const addInstruction = () => {
//     setInstructions([...instructions, '']);
//   };

//   const removeInstruction = (index: number) => {
//     setInstructions(instructions.filter((_, i) => i !== index));
//   };

//   const updateInstruction = (index: number, value: string) => {
//     const newInstructions = [...instructions];
//     newInstructions[index] = value;
//     setInstructions(newInstructions);
//   };

//   const addChecklistItem = () => {
//     setChecklistItems([...checklistItems, '']);
//   };

//   const removeChecklistItem = (index: number) => {
//     setChecklistItems(checklistItems.filter((_, i) => i !== index));
//   };

//   const updateChecklistItem = (index: number, value: string) => {
//     const newItems = [...checklistItems];
//     newItems[index] = value;
//     setChecklistItems(newItems);
//   };

//   const handleNext = () => {
//     const stepOrder: Step[] = ['basic', 'instruction', 'script', 'checklist', 'upload'];
//     const currentIndex = stepOrder.indexOf(currentStep);
//     if (currentIndex < stepOrder.length - 1) {
//       setCurrentStep(stepOrder[currentIndex + 1]);
//     }
//   };

//   const handleBack = () => {
//     const stepOrder: Step[] = ['basic', 'instruction', 'script', 'checklist', 'upload'];
//     const currentIndex = stepOrder.indexOf(currentStep);
//     if (currentIndex > 0) {
//       setCurrentStep(stepOrder[currentIndex - 1]);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-5xl mx-auto">
//         <h1 className="text-2xl font-semibold text-gray-900 mb-1">Create New OSCE Station</h1>
//         <p className="text-sm text-gray-600 mb-8">Create a new OSCE Station to Help your Students.</p>

//         {/* Stepper */}
//         <div className="mb-12">
//           <div className="flex items-center justify-between relative">
//             {/* Background line */}
//             <div className="absolute top-3 left-0 right-0 h-0.5 bg-gray-300"></div>
            
//             {steps.map((step, index) => {
//               const stepOrder: Step[] = ['basic', 'instruction', 'script', 'checklist', 'upload'];
//               const currentIndex = stepOrder.indexOf(currentStep);
//               const stepIndex = stepOrder.indexOf(step.id as Step);
//               const isActive = stepIndex === currentIndex;
//               const isCompleted = stepIndex < currentIndex;
              
//               return (
//                 <div key={step.id} className="flex flex-col items-center relative bg-gray-50 z-10">
//                   <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
//                     isActive || isCompleted
//                       ? 'bg-purple-600'
//                       : 'bg-gray-300'
//                   }`}>
//                     <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
//                   </div>
//                   <span className={`text-xs mt-2 whitespace-nowrap ${
//                     isActive ? 'text-gray-900 font-medium' : 'text-gray-500'
//                   }`}>
//                     {step.label}
//                   </span>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Step Content */}
//         <div className="bg-white rounded-lg shadow-sm p-8">
//           {currentStep === 'basic' && (
//             <div>
//               <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
//               <div className="space-y-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
//                   <input
//                     type="text"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Medical Speciality</label>
//                   <div className="relative">
//                     <input
//                       type="text"
//                       value={specialty}
//                       onChange={(e) => setSpecialty(e.target.value)}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                     />
//                     <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
//                   <input
//                     type="text"
//                     value={duration}
//                     onChange={(e) => setDuration(e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//                   <textarea
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     placeholder="Enter description"
//                     rows={4}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
//                   />
//                 </div>
//               </div>
//             </div>
//           )}

//           {currentStep === 'instruction' && (
//             <div>
//               <h2 className="text-xl font-semibold text-gray-900 mb-6">Candidate Instruction</h2>
//               <div className="space-y-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Instruction</label>
//                 {instructions.map((instruction, index) => (
//                   <div key={index} className="flex gap-3">
//                     <input
//                       type="text"
//                       value={instruction}
//                       onChange={(e) => updateInstruction(index, e.target.value)}
//                       className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                     />
//                     {index === instructions.length - 1 ? (
//                       <button
//                         onClick={addInstruction}
//                         className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
//                       >
//                         <PlusCircle className="w-5 h-5 text-gray-600" />
//                       </button>
//                     ) : (
//                       <button
//                         onClick={() => removeInstruction(index)}
//                         className="p-2 border border-gray-300 rounded-md hover:bg-red-50"
//                       >
//                         <Trash2 className="w-5 h-5 text-red-600" />
//                       </button>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {currentStep === 'script' && (
//             <div>
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-xl font-semibold text-gray-900">Patient Script</h2>
//                 <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
//                   <Plus className="w-4 h-4" />
//                   Add Script
//                 </button>
//               </div>
//               <div className="space-y-6">
//                 {scripts.map((script, index) => (
//                   <div key={index} className="border border-gray-200 rounded-lg p-6">
//                     <div className="mb-4">
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Headline</label>
//                       <div className="px-4 py-2 bg-blue-50 text-gray-900 rounded-md">
//                         {script.headline}
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//                       <div className="px-4 py-3 bg-blue-50 text-gray-900 rounded-md whitespace-pre-line">
//                         {script.description}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {currentStep === 'checklist' && (
//             <div>
//               <h2 className="text-xl font-semibold text-gray-900 mb-6">Examiner Checklist</h2>
//               <div className="border border-gray-200 rounded-lg p-6">
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Task 1</label>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Checklist Name</label>
//                   <div className="px-4 py-2 bg-blue-50 text-gray-900 rounded-md mb-4">
//                     {checklistName}
//                   </div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Checklist 1</label>
//                   {checklistItems.map((item, index) => (
//                     <div key={index} className="flex gap-3 mb-3">
//                       <input
//                         type="text"
//                         value={item}
//                         onChange={(e) => updateChecklistItem(index, e.target.value)}
//                         className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                       />
//                       {index === checklistItems.length - 1 ? (
//                         <button
//                           onClick={addChecklistItem}
//                           className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
//                         >
//                           <PlusCircle className="w-5 h-5 text-gray-600" />
//                         </button>
//                       ) : (
//                         <button
//                           onClick={() => removeChecklistItem(index)}
//                           className="p-2 border border-gray-300 rounded-md hover:bg-red-50"
//                         >
//                           <Trash2 className="w-5 h-5 text-red-600" />
//                         </button>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//                 <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
//                   <Plus className="w-4 h-4" />
//                   Add Checklist Item
//                 </button>
//               </div>
//             </div>
//           )}

//           {currentStep === 'upload' && (
//             <div>
//               <h2 className="text-xl font-semibold text-gray-900 mb-6">Upload</h2>
//               <div className="border border-gray-200 rounded-lg p-6">
//                 <div className="mb-4">
//                   <div className="flex items-center gap-2 mb-1">
//                     <Upload className="w-4 h-4" />
//                     <h3 className="font-medium text-gray-900">Upload Media</h3>
//                   </div>
//                   <p className="text-sm text-gray-600">Upload images or videos For Practice OSCE</p>
//                 </div>
//                 <div className="border-2 border-dashed border-gray-300 rounded-lg p-16 text-center">
//                   <div className="flex flex-col items-center">
//                     <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
//                       <Upload className="w-6 h-6 text-blue-600" />
//                     </div>
//                     <p className="text-base font-medium text-gray-900 mb-1">Click to upload files</p>
//                     <p className="text-xs text-gray-500">
//                       Upload supporting materials like images, videos documents(Max 100MB)
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Navigation Buttons */}
//         <div className="flex gap-4 mt-6">
//           <button
//             onClick={handleBack}
//             className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition"
//           >
//             Back
//           </button>
//           <button
//             onClick={handleNext}
//             className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
//           >
//             {currentStep === 'upload' ? 'Upload Station' : 'Next'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Create_New_OSCE;

import React, { useState } from 'react';
import BasicInfo from '@/components/admin_Content & Resource/OSCE/BasicInfo';
import Instructions from '@/components/admin_Content & Resource/OSCE/Instructions';
import Stepper from '@/components/admin_Content & Resource/OSCE/Stepper';
import ExaminerChecklist from '@/components/admin_Content & Resource/OSCE/ExaminerChecklist';
import UploadStep from '@/components/admin_Content & Resource/OSCE/UploadStep';
import PatientScript from '@/components/admin_Content & Resource/OSCE/PatientScript';

type Step = 'basic' | 'instruction' | 'script' | 'checklist' | 'upload';

const Create_New_OSCE: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>('basic');
  
  // Basic Information
  const [title, setTitle] = useState('Cardiovascular Examination');
  const [specialty, setSpecialty] = useState('Cardiovascular');
  const [duration, setDuration] = useState('15 Min');
  const [description, setDescription] = useState('');
  
  // Instruction
  const [instructions, setInstructions] = useState([
    'You are a medical student working in the emergency department',
    'A 34-year-old woman has presented for assessment'
  ]);
  
  // Patient Script
  const [scripts] = useState([
    {
      headline: 'Presenting complaint',
      description: 'Epigastric pain ("It\'s my tummy, it just hurts so much")'
    },
    {
      headline: 'History of presenting complaint',
      description: `Abdominal pain

• Epigastric pain ("It's my tummy, it just hurts so much")
• Site: epigastric ("It hurts in the middle, right under my ribs")
• suddenly, 90 minutes ago ("It came on suddenly about one and a half hours ago")
• Character: sharp ("It's a sharp, gripping pain")
• Site: epigastric ("It hurts in the middle, right under my ribs")`
    }
  ]);
  
  // Checklist
  const [checklistName] = useState('Introduction & Consent');
  const [checklistItems, setChecklistItems] = useState([
    'Introduce yourself to patient',
    'Obtain informed consent'
  ]);

  const updateInstruction = (index: number, value: string) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  };

  const addInstruction = () => {
    setInstructions([...instructions, '']);
  };

  const removeInstruction = (index: number) => {
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  const updateChecklistItem = (index: number, value: string) => {
    const newItems = [...checklistItems];
    newItems[index] = value;
    setChecklistItems(newItems);
  };

  const addChecklistItem = () => {
    setChecklistItems([...checklistItems, '']);
  };

  const removeChecklistItem = (index: number) => {
    setChecklistItems(checklistItems.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    const stepOrder: Step[] = ['basic', 'instruction', 'script', 'checklist', 'upload'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const stepOrder: Step[] = ['basic', 'instruction', 'script', 'checklist', 'upload'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Create New OSCE Station</h1>
        <p className="text-sm text-gray-600 mb-8">Create a new OSCE Station to Help your Students.</p>

        <Stepper currentStep={currentStep} />

        <div className="bg-white rounded-lg shadow-sm p-8">
          {currentStep === 'basic' && (
            <BasicInfo
              title={title}
              specialty={specialty}
              duration={duration}
              description={description}
              onTitleChange={setTitle}
              onSpecialtyChange={setSpecialty}
              onDurationChange={setDuration}
              onDescriptionChange={setDescription}
            />
          )}

          {currentStep === 'instruction' && (
            <Instructions
              instructions={instructions}
              onUpdate={updateInstruction}
              onAdd={addInstruction}
              onRemove={removeInstruction}
            />
          )}

          {currentStep === 'script' && (
            <PatientScript scripts={scripts} />
          )}

          {currentStep === 'checklist' && (
            <ExaminerChecklist
              checklistName={checklistName}
              checklistItems={checklistItems}
              onUpdate={updateChecklistItem}
              onAdd={addChecklistItem}
              onRemove={removeChecklistItem}
            />
          )}

          {currentStep === 'upload' && <UploadStep />}
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={handleBack}
            className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="rounded-md bg-gradient-to-r from-[#0076F5] to-[#0058B8] text-white px-6 py-2 bg-blue-600font-medium hover:bg-blue-700 transition"
          >
            {currentStep === 'upload' ? 'Upload Station' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Create_New_OSCE;
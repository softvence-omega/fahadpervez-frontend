/* eslint-disable @typescript-eslint/no-explicit-any */
// import { BreadcrumbItem } from "@/components/dashboard/gamified-learning/types";
// import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
// import DashboardHeading from "@/components/reusable/DashboardHeading";
// import PrimaryButton from "@/components/reusable/PrimaryButton";
// import { useGetSingleMCQQuery } from "@/store/features/MCQBank/MCQBank.api";
// import { ArrowLeft, Plus } from "lucide-react";
// import { useState } from "react";
// import { Link, useParams } from "react-router-dom";

// type Question = {
//   id: string;
//   text: string;
//   options: {
//     value: string;
//     label: string;
//     isCorrect: boolean;
//   }[];
//   explanation: {
//     correct: string;
//     incorrect: { [key: string]: string };
//     references: string;
//   };
// };

// const questions: Question[] = [
//   {
//     id: "01",
//     text: "A 16-year-old female presents to the clinic with complaints of acne vulgaris. She reports using several oil-based cosmetic products and often wears tight-fitting clothing. Upon further questioning, she mentions increased stress levels and irregular menstrual cycles. Which of the following is a risk factor for her condition?",
//     options: [
//       { value: "A", label: "A. Increased androgen levels", isCorrect: true },
//       { value: "B", label: "B. Use of water-based products", isCorrect: false },
//       {
//         value: "C",
//         label: "C. Wearing loose cotton clothing",
//         isCorrect: false,
//       },
//       { value: "D", label: "D. Regular menstrual cycles", isCorrect: false },
//     ],
//     explanation: {
//       correct:
//         "Increased androgen levels stimulate sebaceous gland activity, which plays a key role in acne development.",
//       incorrect: {
//         B: "Water-based products are generally non-comedogenic and do not trigger acne.",
//         C: "Loose cotton clothing reduces friction and is unlikely to cause acne.",
//         D: "Irregular, not regular, menstrual cycles are associated with hormonal imbalance that can worsen acne.",
//       },
//       references:
//         "Reference: Robbins Basic Pathology, 10th Edition, Chapter 23.",
//     },
//   },
//   {
//     id: "02",
//     text: "Which of the following hormones is secreted by the anterior pituitary gland?",
//     options: [
//       { value: "A", label: "A. Oxytocin", isCorrect: false },
//       { value: "B", label: "B. Prolactin", isCorrect: true },
//       { value: "C", label: "C. Antidiuretic hormone (ADH)", isCorrect: false },
//       { value: "D", label: "D. Calcitonin", isCorrect: false },
//     ],
//     explanation: {
//       correct:
//         "Prolactin is secreted by the anterior pituitary and plays a role in lactation.",
//       incorrect: {
//         A: "Oxytocin is secreted by the posterior pituitary.",
//         C: "ADH is secreted by the posterior pituitary.",
//         D: "Calcitonin is secreted by the thyroid gland.",
//       },
//       references:
//         "Guyton and Hall Textbook of Medical Physiology, 14th Edition.",
//     },
//   },
//   {
//     id: "03",
//     text: "Which of the following is the most common cause of myocardial infarction?",
//     options: [
//       { value: "A", label: "A. Coronary artery spasm", isCorrect: false },
//       {
//         value: "B",
//         label: "B. Atherosclerotic plaque rupture with thrombus formation",
//         isCorrect: true,
//       },
//       { value: "C", label: "C. Embolism from left atrium", isCorrect: false },
//       { value: "D", label: "D. Coronary artery dissection", isCorrect: false },
//     ],
//     explanation: {
//       correct:
//         "Most myocardial infarctions are caused by rupture of an atherosclerotic plaque with subsequent thrombus formation.",
//       incorrect: {
//         A: "Coronary artery spasm may cause angina, but not the majority of MIs.",
//         C: "Embolism from the left atrium is a rare cause of MI.",
//         D: "Coronary artery dissection is an uncommon cause, usually seen in young women.",
//       },
//       references:
//         "Robbins and Cotran Pathologic Basis of Disease, 10th Edition.",
//     },
//   },
// ];

// export default function PracticeMCQ() {
//   const breadcrumbs: BreadcrumbItem[] = [
//     { name: "Dashboard", link: "/dashboard" },
//     { name: "Practice MCQ", link: "/dashboard/practice-mcq" },
//   ];

//   const { id } = useParams();
//   console.log(id);
//   const [selected, setSelected] = useState<{ [key: string]: number | null }>(
//     {}
//   );
//   const [showAnswer, setShowAnswer] = useState<{ [key: string]: boolean }>({});

//   const handleSelect = (qId: string, index: number) => {
//     setSelected((prev) => ({ ...prev, [qId]: index }));
//   };

//   const toggleAnswer = (qId: string) => {
//     setShowAnswer((prev) => ({ ...prev, [qId]: !prev[qId] }));
//   };

//   const { data } = useGetSingleMCQQuery(id as string);
//   console.log(data?.data);

//   return (
//     <div className="p-6 space-y-8">
//       <Breadcrumb breadcrumbs={breadcrumbs} />

//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         {/* Left Section */}
//         <div className="flex items-center gap-3">
//           <Link to={"/dashboard/mcq-bank"} className="mb-2 sm:mb-0">
//             <ArrowLeft />
//           </Link>
//           <DashboardHeading
//             title={data?.data?.mcqBankTitle}
//             titleSize="text-xl"
//             description={`${data?.data?.totalMcq} Question | Uploaded By: ${data?.data?.uploadedBy}`}
//             className="space-y-1"
//           />
//         </div>

//         {/* Right Section */}
//         <Link to={"/dashboard/quiz-generator"} className="w-full sm:w-auto">
//           <PrimaryButton
//             bgType="solid"
//             bgColor="bg-blue-btn-1"
//             iconPosition="left"
//             icon={<Plus />}
//             className="h-12 w-full sm:w-auto hover:bg-blue-btn-1 hover:opacity-80 cursor-pointer"
//           >
//             Create Quiz
//           </PrimaryButton>
//         </Link>
//       </div>
// {/* data?.data?.mcqSets.map */}
//       {questions.map((q, idx) => {
//         const selectedIndex = selected[q.id];
//         return (
//           <div
//             key={q.id}
//             className="border border-slate-300 rounded-lg p-5 space-y-4"
//           >
//             <div>
//               <p className="text-slate-900 font-medium">
//                 Question {idx + 1} of {data?.data?.totalMcq}
//               </p>
//             </div>

//             <p className="text-slate-900 font-medium">{q.question}</p>

//             {/* Options */}
//             <div className="space-y-2">
//               {q.options.map((opt, idx) => {
//                 const isSelected = selectedIndex === idx;
//                 const isCorrect = opt.isCorrect;
//                 const show = showAnswer[q.id];

//                 // Determine styles
//                 let borderClass = "border-none";
//                 let bgClass = "";
//                 let textClass = "text-slate-800";

//                 if (show) {
//                   if (isSelected && isCorrect) {
//                     borderClass = "border-green-500";
//                     bgClass = "bg-green-50";
//                     textClass = "text-green-700 font-medium";
//                   } else if (isSelected && !isCorrect) {
//                     borderClass = "border-red-500";
//                     bgClass = "bg-red-50";
//                     textClass = "text-red-700 font-medium";
//                   } else if (!isSelected && isCorrect) {
//                     borderClass = "border-green-500";
//                     bgClass = "bg-green-50";
//                     textClass = "text-green-700 font-medium";
//                   }
//                 } else if (isSelected) {
//                   borderClass = "border-blue-500";
//                   bgClass = "bg-blue-50";
//                 }

//                 return (
//                   <label
//                     key={idx}
//                     className={`block p-2 border rounded cursor-pointer ${borderClass} ${bgClass}`}
//                   >
//                     <input
//                       type="radio"
//                       name={`question-${q.id}`}
//                       className="mr-2"
//                       onChange={() => handleSelect(q.id, idx)}
//                       checked={isSelected}
//                       disabled={show} // disable after showing answer
//                     />
//                     <span className={textClass}>{opt.label}</span>
//                   </label>
//                 );
//               })}
//             </div>

//             {/* Show Answer Button */}
//             {selectedIndex !== undefined && selectedIndex !== null && (
//               <button
//                 onClick={() => toggleAnswer(q.id)}
//                 className="px-4 py-2 border rounded text-sm font-medium bg-blue-main text-white hover:bg-blue-main/85 cursor-pointer"
//               >
//                 {showAnswer[q.id] ? "Hide Answer" : "Show Answer"}
//               </button>
//             )}

//             {/* Explanation */}
//             {showAnswer[q.id] && (
//               <div className="mt-4 p-4 bg-slate-100 rounded-lg">
//                 <h4 className="text-lg font-medium mb-2">Explanation</h4>

//                 {q.options.map((option) => {
//                   const isOptionCorrect = option.isCorrect;
//                   return (
//                     <div key={option.value} className="mb-3">
//                       {isOptionCorrect ? (
//                         <p className="font-medium text-green-600">
//                           [Correct - Choice {option.value}]
//                         </p>
//                       ) : (
//                         <p className="font-medium text-red-600">
//                           [Choice {option.value}]
//                         </p>
//                       )}

//                       <p className="text-gray-800">
//                         {isOptionCorrect
//                           ? q.explanation.correct
//                           : q.explanation.incorrect[option.value]}
//                       </p>
//                     </div>
//                   );
//                 })}

//                 <p className="text-sm text-gray-600 mt-4 italic">
//                   {q.explanation.references}
//                 </p>
//               </div>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

import { BreadcrumbItem } from "@/components/dashboard/gamified-learning/types";
import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
import DashboardHeading from "@/components/reusable/DashboardHeading";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import { useGetSingleMCQQuery } from "@/store/features/MCQBank/MCQBank.api";
import { ArrowLeft, Plus } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function PracticeMCQ() {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "Practice MCQ", link: "/dashboard/practice-mcq" },
  ];

  const { id } = useParams();
  const { data } = useGetSingleMCQQuery(id as string);

  const [selected, setSelected] = useState<{ [key: string]: number | null }>(
    {}
  );
  const [showAnswer, setShowAnswer] = useState<{ [key: string]: boolean }>({});

  const handleSelect = (qId: string, index: number) => {
    setSelected((prev) => ({ ...prev, [qId]: index }));
  };

  const toggleAnswer = (qId: string) => {
    setShowAnswer((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const mcqData = data?.data;
  const questions = mcqData?.mcqSets || [];

  return (
    <div className="p-6 space-y-8">
      <Breadcrumb breadcrumbs={breadcrumbs} />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          <Link to={"/dashboard/mcq-bank"} className=" sm:mb-0">
            <ArrowLeft className="mb-8" />
          </Link>
          <DashboardHeading
            title={mcqData?.mcqBankTitle}
            titleSize="text-xl"
            description={`${mcqData?.totalMcq} Questions | Uploaded By: ${mcqData?.uploadedBy}`}
            className="space-y-1"
          />
        </div>

        {/* Right Section */}
        <Link to={"/dashboard/quiz-generator"} className="w-full sm:w-auto">
          <PrimaryButton
            bgType="solid"
            bgColor="bg-blue-btn-1"
            iconPosition="left"
            icon={<Plus />}
            className="h-12 w-full sm:w-auto hover:bg-blue-btn-1 hover:opacity-80 cursor-pointer"
          >
            Create Quiz
          </PrimaryButton>
        </Link>
      </div>

      {/* Render questions */}
      {questions.map((q: any, idx: number) => {
        const qId = q._id || `question-${idx}`; // ensure unique id per question
        const selectedIndex = selected[qId];
        return (
          <div
            key={qId}
            className="border border-slate-300 rounded-lg p-5 space-y-4"
          >
            <div>
              <p className="text-slate-900 font-medium">
                Question {idx + 1} of {mcqData?.totalMcq}
              </p>
            </div>

            <p className="text-slate-900 font-medium">{q.question}</p>

            <div className="space-y-2">
              {q.options.map((opt: any, optionIdx: number) => {
                const isSelected = selectedIndex === optionIdx;
                const isCorrect = opt.option === q.correctOption;
                const show = showAnswer[qId];

                // styles
                let borderClass = "border-none";
                let bgClass = "";
                let textClass = "text-slate-800";

                if (show) {
                  if (isSelected && isCorrect) {
                    borderClass = "border-green-500";
                    bgClass = "bg-green-50";
                    textClass = "text-green-700 font-medium";
                  } else if (isSelected && !isCorrect) {
                    borderClass = "border-red-500";
                    bgClass = "bg-red-50";
                    textClass = "text-red-700 font-medium";
                  } else if (!isSelected && isCorrect) {
                    borderClass = "border-green-500";
                    bgClass = "bg-green-50";
                    textClass = "text-green-700 font-medium";
                  }
                } else if (isSelected) {
                  borderClass = "border-blue-500";
                  bgClass = "bg-blue-50";
                }

                return (
                  <label
                    key={optionIdx}
                    className={`block p-2 border rounded cursor-pointer ${borderClass} ${bgClass}`}
                  >
                    <input
                      type="radio"
                      name={`question-${qId}`} // ✅ each question group unique
                      className="mr-2"
                      onChange={() => handleSelect(qId, optionIdx)} // ✅ use qId consistently
                      checked={isSelected}
                      disabled={show}
                    />
                    <span className={textClass}>
                      {opt.option}. {opt.optionText}
                    </span>
                  </label>
                );
              })}
            </div>

            {selectedIndex !== undefined && selectedIndex !== null && (
              <button
                onClick={() => toggleAnswer(qId)} // ✅ use qId
                className="px-4 py-2 border rounded text-sm font-medium bg-blue-main text-white hover:bg-blue-main/85 cursor-pointer"
              >
                {showAnswer[qId] ? "Hide Answer" : "Show Answer"}
              </button>
            )}
            {showAnswer[qId] && (
              <div className="mt-4 p-4 bg-slate-100 rounded-lg">
                <h4 className="text-lg font-medium mb-2">Explanation</h4>
                {q.options.map((option: any) => {
                  const isOptionCorrect = option.option === q.correctOption;
                  return (
                    <div key={option.option} className="mb-3">
                      {isOptionCorrect ? (
                        <p className="font-medium text-green-600">
                          [Correct - Choice {option.option}]
                        </p>
                      ) : (
                        <p className="font-medium text-red-600">
                          [Choice {option.option}]
                        </p>
                      )}
                      <p className="text-gray-800">{option.explanation}</p>
                    </div>
                  );
                })}
                {q.imageDescription && (
                  <p className="text-sm text-gray-700 mt-2 italic">
                    {q.imageDescription}
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

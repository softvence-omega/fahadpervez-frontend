// import { useState } from "react";
// import { Play, Check } from "lucide-react";
// import type { ReactNode } from "react";

// // Reusable Section Component
// interface SectionProps {
//   title: string;
//   children: ReactNode;
//   bgColor?: string;
// }
// const Section: React.FC<SectionProps> = ({ title, children, bgColor = "bg-white" }) => (
//   <div className={`${bgColor} rounded-lg p-6 shadow-sm mb-6`}>
//     <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>
//     {children}
//   </div>
// );

// // Reusable Badge Component
// interface BadgeProps {
//   children: ReactNode;
//   color?: "orange" | "red" | "blue";
// }
// const Badge: React.FC<BadgeProps> = ({ children, color = "orange" }) => {
//   const colors: Record<"orange" | "red" | "blue", string> = {
//     orange: "bg-orange-500",
//     red: "bg-red-500",
//     blue: "bg-blue-500",
//   };

//   return (
//     <span
//       className={`${colors[color]} text-white px-3 py-1 rounded text-sm font-medium inline-block mb-3`}
//     >
//       {children}
//     </span>
//   );
// };

// // Reusable Video Button Component
// interface VideoButtonProps {
//   title: string;
//   duration: string;
// }
// const VideoButton: React.FC<VideoButtonProps> = ({ title, duration }) => (
//   <button className="flex items-center gap-3 w-full p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors mb-2">
//     <div className="bg-blue-600 rounded p-2">
//       <Play className="w-4 h-4 text-white fill-white" />
//     </div>
//     <div className="text-left">
//       <div className="font-medium text-gray-800 text-sm">{title}</div>
//       <div className="text-xs text-gray-500">{duration}</div>
//     </div>
//   </button>
// );

// // Reusable Checklist Item Component
// interface ChecklistItemProps {
//   label: string;
//   checked: boolean;
//   onChange: () => void;
// }
// const ChecklistItem: React.FC<ChecklistItemProps> = ({ label, checked, onChange }) => (
//   <label className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
//     <input
//       type="checkbox"
//       checked={checked}
//       onChange={onChange}
//       className="w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
//     />
//     <span className={`text-sm ${checked ? "text-gray-600 line-through" : "text-gray-700"}`}>
//       {label}
//     </span>
//   </label>
// );

// // Reusable Checklist Section Component
// interface ChecklistSectionProps {
//   icon: ReactNode;
//   title: string;
//   items: string[];
//   checkedItems: Record<string, boolean>;
//   onToggle: (item: string) => void;
// }
// const ChecklistSection: React.FC<ChecklistSectionProps> = ({
//   icon,
//   title,
//   items,
//   checkedItems,
//   onToggle,
// }) => {
//   const allChecked = items.every((item) => checkedItems[item]);

//   return (
//     <div className="border border-gray-200 rounded-lg mb-3">
//       <div
//         className={`flex items-center gap-2 p-3 ${
//           allChecked ? "bg-green-50" : "bg-white"
//         } border-b border-gray-200`}
//       >
//         <span className="text-lg">{icon}</span>
//         <span className="font-medium text-gray-800 text-sm">{title}</span>
//         {allChecked && <Check className="w-4 h-4 text-green-600 ml-auto" />}
//       </div>
//       <div className="p-2">
//         {items.map((item) => (
//           <ChecklistItem
//             key={item}
//             label={item}
//             checked={checkedItems[item] || false}
//             onChange={() => onToggle(item)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// // Main Component
// const Clinical_Skill_Lab: React.FC = () => {
//   const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

//   const handleToggle = (item: string) => {
//     setCheckedItems((prev) => ({
//       ...prev,
//       [item]: !prev[item],
//     }));
//   };

//   const checklistSections = [
//     {
//       icon: "👋",
//       title: "Introduction & Consent",
//       items: ["Introduce yourself to patient", "Obtain informed consent", "Wash hands/sanitizer"],
//     },
//     {
//       icon: "👁️",
//       title: "Inspection",
//       items: ["General appearance-appointment", "Look for visible pulsations", "Wash hands/sanitizer"],
//     },
//     {
//       icon: "🤚",
//       title: "Palpation",
//       items: ["Palpate apex beat", "Check for parasternal heave", "Palpate for thrills"],
//     },
//     {
//       icon: "🩺",
//       title: "Auscultation",
//       items: [
//         "Auscultate aortic area",
//         "Auscultate pulmonary area",
//         "Auscultate tricuspid area",
//         "Auscultate mitral area",
//       ],
//     },
//   ];

//   const totalItems = checklistSections.reduce((acc, section) => acc + section.items.length, 0);
//   const completedItems = Object.values(checkedItems).filter(Boolean).length;

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-start mb-6 rounded-lg border border-slate-300 bg-white p-4">
//           <div>
//             <h1 className="mb-2 text-slate-700 font-semibold text-2xl leading-8 tracking-tight">
//               Cardiovascular Examination (CVS)
//             </h1>
//             <p className="text-gray-600 text-sm">
//               Practice the complete CVS examination from introduction to final summary.
//             </p>
//           </div>
//           <div className="text-right flex-nowrap my-auto flex justify-center items-center gap-1 self-stretch">
//             <span className="text-xs text-gray-500">Time</span>
//             <span className=" text-gray-900 font-medium text-base leading-6">15:00</span>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Left Column */}
//           <div className="lg:col-span-2">
//             {/* Candidate Instructions */}
//             <Section title="Candidate Instructions">
//               <ul className="space-y-2 text-sm text-gray-700">
//                 <li className="flex gap-2">
//                   <span className="text-gray-400">•</span>
//                   <span>You are a medical student working in the emergency department</span>
//                 </li>
//                 <li className="flex gap-2">
//                   <span className="text-gray-400">•</span>
//                   <span>A 56-year-old woman has presented for assessment</span>
//                 </li>
//                 <li className="flex gap-2">
//                   <span className="text-gray-400">•</span>
//                   <span>She is complaining of shortness of breath</span>
//                 </li>
//                 <li className="flex gap-2">
//                   <span className="text-gray-400">•</span>
//                   <span>Please take a history</span>
//                 </li>
//                 <li className="flex gap-2">
//                   <span className="text-gray-400">•</span>
//                   <span>At the end of the station, the examiner may ask you some further questions</span>
//                 </li>
//               </ul>
//             </Section>

//             {/* Patient Script */}
//             <Section title="Patient Script">
//               <Badge color="orange">Presenting complaint</Badge>
//               <p className="text-sm text-gray-700 mb-4">
//                 • Examiner: (start this on buzzer...it just has to be much)
//               </p>

//               <Badge color="red">History of presenting complaint</Badge>
//               <div className="space-y-3 mb-4">
//                 <p className="text-sm text-gray-700">Abdominal pain</p>
//                 <ul className="space-y-2 text-sm text-gray-700 ml-4">
//                   <li>• Examiner: (start this on buzzer...it just has to be much)</li>
//                   <li>• Site: epigastric ("it's hurts in the middle, right under my ribs")</li>
//                   <li>• Suddenly, 90 minutes ago ("it came on suddenly about one and a half hours ago")</li>
//                   <li>• Character: sharp ("it's a sharp, gnawing pain")</li>
//                   <li>• Site: epigastric ("it's hurts in the middle, right under my ribs")</li>
//                 </ul>
//               </div>

//               <Badge color="red">Past medical & surgical history</Badge>
//               <div className="space-y-2 mb-4">
//                 <p className="text-sm text-gray-700">
//                   • Examiner: ("I had appendicitis a few months ago, they put this pain is much worse than that's")
//                 </p>
//                 <p className="text-sm text-gray-700">
//                   • Gestational diabetes in first diabetics which I was pregnant with both my children, but my blood sugar wasn't back to normal afterwards")
//                 </p>
//               </div>

//               <Badge color="blue">Drug history</Badge>
//               <div className="space-y-2">
//                 <p className="text-sm text-gray-700">Abdominal pain</p>
//                 <ul className="space-y-2 text-sm text-gray-700 ml-4">
//                   <li>• Combined oral contraceptive pill (Dianette 30/150)</li>
//                   <li>• No known drug allergies</li>
//                 </ul>
//               </div>
//             </Section>

//             {/* Examiner Checklist */}
//             <Section title="Examiner checklist" bgColor="bg-white">
//               <div className="flex justify-between items-center mb-4">
//                 <span className="text-xs text-gray-500">
//                   {completedItems} / {totalItems} completed
//                 </span>
//               </div>

//               {checklistSections.map((section) => (
//                 <ChecklistSection
//                   key={section.title}
//                   icon={section.icon}
//                   title={section.title}
//                   items={section.items}
//                   checkedItems={checkedItems}
//                   onToggle={handleToggle}
//                 />
//               ))}
//             </Section>
//           </div>

//           {/* Right Column */}
//           <div>
//             <Section title="Uploaded Videos" bgColor="bg-white">
//               <VideoButton title="Palpation of Apex Beat" duration="2:45 mins" />
//               <VideoButton title="Inspection Techniques" duration="1:30 mins" />
//             </Section>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Clinical_Skill_Lab;


import { useState } from "react";
import Section from "@/components/admin_Content & Resource/OSCE/Clinik Skill/Section";
import Badge from "@/components/admin_Content & Resource/OSCE/Clinik Skill/Badge";
import VideoButton from "@/components/admin_Content & Resource/OSCE/Clinik Skill/VideoButton";
import ChecklistSection from "@/components/admin_Content & Resource/OSCE/Clinik Skill/ChecklistSection";

const Clinical_Skill_Lab: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const handleToggle = (item: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const checklistSections = [
    {
      icon: "👋",
      title: "Introduction & Consent",
      items: ["Introduce yourself to patient", "Obtain informed consent", "Wash hands/sanitizer"],
    },
    {
      icon: "👁️",
      title: "Inspection",
      items: ["General appearance-appointment", "Look for visible pulsations", "Wash hands/sanitizer"],
    },
    {
      icon: "🤚",
      title: "Palpation",
      items: ["Palpate apex beat", "Check for parasternal heave", "Palpate for thrills"],
    },
    {
      icon: "🩺",
      title: "Auscultation",
      items: [
        "Auscultate aortic area",
        "Auscultate pulmonary area",
        "Auscultate tricuspid area",
        "Auscultate mitral area",
      ],
    },
  ];

  const totalItems = checklistSections.reduce((acc, section) => acc + section.items.length, 0);
  const completedItems = Object.values(checkedItems).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-6 rounded-lg border border-slate-300 bg-white p-4">
          <div>
            <h1 className="mb-2 text-slate-700 font-semibold text-2xl leading-8 tracking-tight">
              Cardiovascular Examination (CVS)
            </h1>
            <p className="text-gray-600 text-sm">
              Practice the complete CVS examination from introduction to final summary.
            </p>
          </div>
          <div className="text-right flex-nowrap my-auto flex justify-center items-center gap-1 self-stretch">
            <span className="text-xs text-gray-500">Time</span>
            <span className=" text-gray-900 font-medium text-base leading-6">15:00</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* Candidate Instructions */}
            <Section title="Candidate Instructions">
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex gap-2">
                  <span className="text-gray-400">•</span>
                  <span>You are a medical student working in the emergency department</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-400">•</span>
                  <span>A 56-year-old woman has presented for assessment</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-400">•</span>
                  <span>She is complaining of shortness of breath</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-400">•</span>
                  <span>Please take a history</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-400">•</span>
                  <span>At the end of the station, the examiner may ask you some further questions</span>
                </li>
              </ul>
            </Section>

            {/* Patient Script */}
            <Section title="Patient Script">
              <Badge color="orange">Presenting complaint</Badge>
              <p className="text-sm text-gray-700 mb-4">
                • Examiner: (start this on buzzer...it just has to be much)
              </p>

              <Badge color="red">History of presenting complaint</Badge>
              <div className="space-y-3 mb-4">
                <p className="text-sm text-gray-700">Abdominal pain</p>
                <ul className="space-y-2 text-sm text-gray-700 ml-4">
                  <li>• Examiner: (start this on buzzer...it just has to be much)</li>
                  <li>• Site: epigastric ("it's hurts in the middle, right under my ribs")</li>
                  <li>• Suddenly, 90 minutes ago ("it came on suddenly about one and a half hours ago")</li>
                  <li>• Character: sharp ("it's a sharp, gnawing pain")</li>
                  <li>• Site: epigastric ("it's hurts in the middle, right under my ribs")</li>
                </ul>
              </div>

              <Badge color="red">Past medical & surgical history</Badge>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-700">
                  • Examiner: ("I had appendicitis a few months ago, they put this pain is much worse than that's")
                </p>
                <p className="text-sm text-gray-700">
                  • Gestational diabetes in first diabetics which I was pregnant with both my children, but my blood sugar wasn't back to normal afterwards")
                </p>
              </div>

              <Badge color="blue">Drug history</Badge>
              <div className="space-y-2">
                <p className="text-sm text-gray-700">Abdominal pain</p>
                <ul className="space-y-2 text-sm text-gray-700 ml-4">
                  <li>• Combined oral contraceptive pill (Dianette 30/150)</li>
                  <li>• No known drug allergies</li>
                </ul>
              </div>
            </Section>

            {/* Examiner Checklist */}
            <Section title="Examiner checklist" bgColor="bg-white">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs text-gray-500">
                  {completedItems} / {totalItems} completed
                </span>
              </div>

              {checklistSections.map((section) => (
                <ChecklistSection
                  key={section.title}
                  icon={section.icon}
                  title={section.title}
                  items={section.items}
                  checkedItems={checkedItems}
                  onToggle={handleToggle}
                />
              ))}
            </Section>
          </div>

          {/* Right Column */}
          <div>
            <Section title="Uploaded Videos" bgColor="bg-white">
              <VideoButton title="Palpation of Apex Beat" duration="2:45 mins" />
              <VideoButton title="Inspection Techniques" duration="1:30 mins" />
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clinical_Skill_Lab;

// import { useState } from "react";
// import { Goal, SelectedSubject, Subject } from "./type";
// import { Modal, Step1, Step2, Step3 } from "./Modal";
// import { GoalEmptyState } from "./GoalEmptyState";
// import { GoalDashboard } from "./GoalDashboard";

// // Main Component
// const MedicalStudyGoalTracker: React.FC = () => {
//   const [showModal, setShowModal] = useState<boolean>(false);
//   const [currentStep, setCurrentStep] = useState<number>(1);
//   const [goal, setGoal] = useState<Goal | null>(null);

//   const [formData, setFormData] = useState<FormData>({
//     goalName: "",
//     studyHoursPerDay: 0,
//     startDate: "",
//     endDate: "",
//   });

//   const availableSubjects: Subject[] = [
//     {
//       name: "Pathology",
//       systems: [
//         "General Pathology",
//         "Systemic Pathology",
//         "Clinical Pathology",
//         "Hematology",
//         "Immunology",
//         "Genetics",
//         "Neoplasia",
//         "Inflammation",
//         "Cell Injury",
//         "Hemodynamics",
//       ],
//     },
//     {
//       name: "Pharmacology",
//       systems: [
//         "General Pharmacology",
//         "Autonomic Drugs",
//         "CNS Drugs",
//         "Cardiovascular Drugs",
//         "Antibiotics",
//         "Chemotherapy",
//         "Endocrine Drugs",
//         "GI Drugs",
//         "Respiratory Drugs",
//         "Toxicology",
//       ],
//     },
//     {
//       name: "Microbiology",
//       systems: [
//         "Bacteriology",
//         "Virology",
//         "Mycology",
//         "Parasitology",
//         "Immunology",
//         "Infection Control",
//         "Gram Positive",
//         "Gram Negative",
//         "Anaerobes",
//         "Mycobacteria",
//       ],
//     },
//     {
//       name: "Biochemistry",
//       systems: [
//         "Carbohydrates",
//         "Proteins",
//         "Lipids",
//         "Nucleic Acids",
//         "Enzymes",
//         "Vitamins",
//         "Minerals",
//         "Metabolism",
//         "Clinical Biochemistry",
//         "Molecular Biology",
//       ],
//     },
//     {
//       name: "Anatomy",
//       systems: [
//         "Cardiovascular",
//         "Respiratory",
//         "Digestive",
//         "Urinary",
//         "Reproductive",
//         "Endocrine",
//         "Nervous",
//         "Musculoskeletal",
//         "Lymphatic",
//         "Integumentary",
//       ],
//     },
//     {
//       name: "Physiology",
//       systems: [
//         "Cardiovascular",
//         "Respiratory",
//         "Nervous",
//         "Digestive",
//         "Renal",
//         "Endocrine",
//         "Reproductive",
//         "Musculoskeletal",
//         "Blood",
//         "Special Senses",
//       ],
//     },
//   ];

//   const [selectedSubjects, setSelectedSubjects] = useState<SelectedSubject[]>(
//     []
//   );

//   const handleSubjectToggle = (subjectName: string) => {
//     const subject = availableSubjects.find((s) => s.name === subjectName);
//     const existingIndex = selectedSubjects.findIndex(
//       (s) => s.subjectName === subjectName
//     );

//     if (existingIndex >= 0) {
//       setSelectedSubjects(
//         selectedSubjects.filter((s) => s.subjectName !== subjectName)
//       );
//     } else {
//       setSelectedSubjects([
//         ...selectedSubjects,
//         { subjectName, systemNames: [], fullSubject: false },
//       ]);
//     }
//   };

//   const handleFullSubjectToggle = (subjectName: string) => {
//     const subject = availableSubjects.find((s) => s.name === subjectName);
//     if (!subject) return;

//     const existingIndex = selectedSubjects.findIndex(
//       (s) => s.subjectName === subjectName
//     );

//     if (existingIndex >= 0) {
//       const updated = [...selectedSubjects];
//       const currentFullSubject = updated[existingIndex].fullSubject;

//       if (currentFullSubject) {
//         updated[existingIndex] = {
//           subjectName,
//           systemNames: [],
//           fullSubject: false,
//         };
//       } else {
//         updated[existingIndex] = {
//           subjectName,
//           systemNames: [...subject.systems],
//           fullSubject: true,
//         };
//       }
//       setSelectedSubjects(updated);
//     }
//   };

//   const handleSystemToggle = (subjectName: string, systemName: string) => {
//     const subject = availableSubjects.find((s) => s.name === subjectName);
//     if (!subject) return;

//     const existingIndex = selectedSubjects.findIndex(
//       (s) => s.subjectName === subjectName
//     );

//     if (existingIndex >= 0) {
//       const updated = [...selectedSubjects];
//       const systemIndex =
//         updated[existingIndex].systemNames.indexOf(systemName);

//       if (systemIndex >= 0) {
//         updated[existingIndex].systemNames = updated[
//           existingIndex
//         ].systemNames.filter((s) => s !== systemName);
//       } else {
//         updated[existingIndex].systemNames = [
//           ...updated[existingIndex].systemNames,
//           systemName,
//         ];
//       }

//       updated[existingIndex].fullSubject =
//         updated[existingIndex].systemNames.length === subject.systems.length;
//       setSelectedSubjects(updated);
//     }
//   };

//   const calculateDuration = (): number => {
//     if (!formData.startDate || !formData.endDate) return 0;
//     const start = new Date(formData.startDate);
//     const end = new Date(formData.endDate);
//     const diffTime = Math.abs(end.getTime() - start.getTime());
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     return diffDays;
//   };

//   const calculateTotalStudyHours = (): number => {
//     return calculateDuration() * formData.studyHoursPerDay;
//   };

//   const calculateHoursPerSystem = (): string => {
//     const totalSystems = selectedSubjects.reduce(
//       (total, subject) => total + subject.systemNames.length,
//       0
//     );
//     if (totalSystems === 0) return "0";
//     return (calculateTotalStudyHours() / totalSystems).toFixed(1);
//   };

//   const handleCreateGoal = () => {
//     const goalData: Goal = {
//       ...formData,
//       selectedSubjects: selectedSubjects.map((s) => ({
//         subjectName: s.subjectName,
//         systemNames: s.systemNames,
//         fullSubject: s.fullSubject,
//       })),
//       accuracy: 75,
//       completed: 85,
//       daysRemaining: 36,
//       totalHours: calculateTotalStudyHours(),
//     };

//     console.log("Creating goal:", goalData);
//     setGoal(goalData);
//     handleCloseModal();
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setCurrentStep(1);
//     setFormData({
//       goalName: "",
//       studyHoursPerDay: 0,
//       startDate: "",
//       endDate: "",
//     });
//     setSelectedSubjects([]);
//   };

//   const handleChangeGoal = () => {
//     setGoal(null);
//     setShowModal(true);
//   };

//   return (
//     <div className="bg-gray-50 mb-12">
//       <div className="">
//         {!goal ? (
//           <GoalEmptyState onSetGoal={() => setShowModal(true)} />
//         ) : (
//           <GoalDashboard goal={goal} onChangeGoal={handleChangeGoal} />
//         )}

//         <Modal
//           showModal={showModal}
//           currentStep={currentStep}
//           onClose={handleCloseModal}
//         >
//           {currentStep === 1 && (
//             <Step1
//               formData={formData}
//               onFormDataChange={setFormData}
//               onNext={() => setCurrentStep(2)}
//               onCancel={handleCloseModal}
//             />
//           )}
//           {currentStep === 2 && (
//             <Step2
//               availableSubjects={availableSubjects}
//               selectedSubjects={selectedSubjects}
//               onSubjectToggle={handleSubjectToggle}
//               onFullSubjectToggle={handleFullSubjectToggle}
//               onSystemToggle={handleSystemToggle}
//               onPrevious={() => setCurrentStep(1)}
//               onNext={() => setCurrentStep(3)}
//             />
//           )}
//           {currentStep === 3 && (
//             <Step3
//               formData={formData}
//               selectedSubjects={selectedSubjects}
//               availableSubjects={availableSubjects}
//               calculateDuration={calculateDuration}
//               calculateTotalStudyHours={calculateTotalStudyHours}
//               calculateHoursPerSystem={calculateHoursPerSystem}
//               onPrevious={() => setCurrentStep(2)}
//               onCreate={handleCreateGoal}
//             />
//           )}
//         </Modal>
//       </div>
//     </div>
//   );
// };

// export default MedicalStudyGoalTracker;


import { useState } from "react";
import { Goal, SelectedSubject, Subject, FormData as GoalFormData } from "./type";
import { Modal, Step1, Step2, Step3 } from "./Modal";
import { GoalEmptyState } from "./GoalEmptyState";
import { GoalDashboard } from "./GoalDashboard";

// Main Component
const MedicalStudyGoalTracker: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [goal, setGoal] = useState<Goal | null>(null);

  const [formData, setFormData] = useState<GoalFormData>({
    goalName: "",
    studyHoursPerDay: 0,
    startDate: "",
    endDate: "",
  });

  const availableSubjects: Subject[] = [
    {
      name: "Pathology",
      systems: [
        "General Pathology",
        "Systemic Pathology",
        "Clinical Pathology",
        "Hematology",
        "Immunology",
        "Genetics",
        "Neoplasia",
        "Inflammation",
        "Cell Injury",
        "Hemodynamics",
      ],
    },
    {
      name: "Pharmacology",
      systems: [
        "General Pharmacology",
        "Autonomic Drugs",
        "CNS Drugs",
        "Cardiovascular Drugs",
        "Antibiotics",
        "Chemotherapy",
        "Endocrine Drugs",
        "GI Drugs",
        "Respiratory Drugs",
        "Toxicology",
      ],
    },
    {
      name: "Microbiology",
      systems: [
        "Bacteriology",
        "Virology",
        "Mycology",
        "Parasitology",
        "Immunology",
        "Infection Control",
        "Gram Positive",
        "Gram Negative",
        "Anaerobes",
        "Mycobacteria",
      ],
    },
    {
      name: "Biochemistry",
      systems: [
        "Carbohydrates",
        "Proteins",
        "Lipids",
        "Nucleic Acids",
        "Enzymes",
        "Vitamins",
        "Minerals",
        "Metabolism",
        "Clinical Biochemistry",
        "Molecular Biology",
      ],
    },
    {
      name: "Anatomy",
      systems: [
        "Cardiovascular",
        "Respiratory",
        "Digestive",
        "Urinary",
        "Reproductive",
        "Endocrine",
        "Nervous",
        "Musculoskeletal",
        "Lymphatic",
        "Integumentary",
      ],
    },
    {
      name: "Physiology",
      systems: [
        "Cardiovascular",
        "Respiratory",
        "Nervous",
        "Digestive",
        "Renal",
        "Endocrine",
        "Reproductive",
        "Musculoskeletal",
        "Blood",
        "Special Senses",
      ],
    },
  ];

  const [selectedSubjects, setSelectedSubjects] = useState<SelectedSubject[]>([]);

  const handleSubjectToggle = (subjectName: string): void => {
    const existingIndex = selectedSubjects.findIndex(
      (s) => s.subjectName === subjectName
    );

    if (existingIndex >= 0) {
      setSelectedSubjects(
        selectedSubjects.filter((s) => s.subjectName !== subjectName)
      );
    } else {
      setSelectedSubjects([
        ...selectedSubjects,
        { subjectName, systemNames: [], fullSubject: false },
      ]);
    }
  };

  const handleFullSubjectToggle = (subjectName: string): void => {
    const subject = availableSubjects.find((s) => s.name === subjectName);
    if (!subject) return;

    const existingIndex = selectedSubjects.findIndex(
      (s) => s.subjectName === subjectName
    );

    if (existingIndex >= 0) {
      const updated = [...selectedSubjects];
      const currentFullSubject = updated[existingIndex].fullSubject;

      if (currentFullSubject) {
        updated[existingIndex] = {
          subjectName,
          systemNames: [],
          fullSubject: false,
        };
      } else {
        updated[existingIndex] = {
          subjectName,
          systemNames: [...subject.systems],
          fullSubject: true,
        };
      }
      setSelectedSubjects(updated);
    }
  };

  const handleSystemToggle = (subjectName: string, systemName: string): void => {
    const subject = availableSubjects.find((s) => s.name === subjectName);
    if (!subject) return;

    const existingIndex = selectedSubjects.findIndex(
      (s) => s.subjectName === subjectName
    );

    if (existingIndex >= 0) {
      const updated = [...selectedSubjects];
      const systemIndex = updated[existingIndex].systemNames.indexOf(systemName);

      if (systemIndex >= 0) {
        updated[existingIndex].systemNames = updated[existingIndex].systemNames.filter(
          (s) => s !== systemName
        );
      } else {
        updated[existingIndex].systemNames = [
          ...updated[existingIndex].systemNames,
          systemName,
        ];
      }

      updated[existingIndex].fullSubject =
        updated[existingIndex].systemNames.length === subject.systems.length;
      setSelectedSubjects(updated);
    }
  };

  const calculateDuration = (): number => {
    if (!formData.startDate || !formData.endDate) return 0;
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const calculateTotalStudyHours = (): number => {
    return calculateDuration() * formData.studyHoursPerDay;
  };

  const calculateHoursPerSystem = (): string => {
    const totalSystems = selectedSubjects.reduce(
      (total, subject) => total + subject.systemNames.length,
      0
    );
    if (totalSystems === 0) return "0";
    return (calculateTotalStudyHours() / totalSystems).toFixed(1);
  };

  const handleCreateGoal = (): void => {
    const goalData: Goal = {
      ...formData,
      selectedSubjects: selectedSubjects.map((s) => ({
        subjectName: s.subjectName,
        systemNames: s.systemNames,
        fullSubject: s.fullSubject,
      })),
      accuracy: 75,
      completed: 85,
      daysRemaining: 36,
      totalHours: calculateTotalStudyHours(),
    };

    console.log("Creating goal:", goalData);
    setGoal(goalData);
    handleCloseModal();
  };

  const handleCloseModal = (): void => {
    setShowModal(false);
    setCurrentStep(1);
    setFormData({
      goalName: "",
      studyHoursPerDay: 0,
      startDate: "",
      endDate: "",
    });
    setSelectedSubjects([]);
  };

  const handleChangeGoal = (): void => {
    setGoal(null);
    setShowModal(true);
  };

  return (
    <div className="bg-gray-50 mb-12">
      <div>
        {!goal ? (
          <GoalEmptyState onSetGoal={() => setShowModal(true)} />
        ) : (
          <GoalDashboard goal={goal} onChangeGoal={handleChangeGoal} />
        )}

        <Modal
          showModal={showModal}
          currentStep={currentStep}
          onClose={handleCloseModal}
        >
          {currentStep === 1 && (
            <Step1
              formData={formData}
              onFormDataChange={setFormData}
              onNext={() => setCurrentStep(2)}
              onCancel={handleCloseModal}
            />
          )}
          {currentStep === 2 && (
            <Step2
              availableSubjects={availableSubjects}
              selectedSubjects={selectedSubjects}
              onSubjectToggle={handleSubjectToggle}
              onFullSubjectToggle={handleFullSubjectToggle}
              onSystemToggle={handleSystemToggle}
              onPrevious={() => setCurrentStep(1)}
              onNext={() => setCurrentStep(3)}
            />
          )}
          {currentStep === 3 && (
            <Step3
              formData={formData}
              selectedSubjects={selectedSubjects}
              availableSubjects={availableSubjects}
              calculateDuration={calculateDuration}
              calculateTotalStudyHours={calculateTotalStudyHours}
              calculateHoursPerSystem={calculateHoursPerSystem}
              onPrevious={() => setCurrentStep(2)}
              onCreate={handleCreateGoal}
            />
          )}
        </Modal>
      </div>
    </div>
  );
};

export default MedicalStudyGoalTracker;
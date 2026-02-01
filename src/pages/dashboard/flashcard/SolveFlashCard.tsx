// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { ArrowLeft, BadgeHelp, CircleAlert } from "lucide-react";
// import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
// import { BreadcrumbItem } from "@/components/dashboard/gamified-learning/types";
// import { Link, useLocation, useParams } from "react-router-dom";
// import {
//   useGetSingleFlashCardQuery,
//   useGetSingleGeneratedFlashCardQuery,
// } from "@/store/features/flashCard/flashCard.api";
// import { useSaveStudyPlanProgressMutation } from "@/store/features/studyPlan/studyPlan.api";
// import { useUpdateProgressMcqFlashcardClinicalCaseMutation } from "@/store/features/goal/goal.api";
// import DashboardHeading from "@/components/reusable/DashboardHeading";
// import GlobalLoader2 from "@/common/GlobalLoader2";
// import { toast } from "sonner";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import { useBlocker, useNavigate } from "react-router-dom";

// const breadcrumbs: BreadcrumbItem[] = [
//   { name: "Dashboard", link: "/dashboard" },
//   { name: "Flashcard Generator", link: "/dashboard/flashcard-generator" },
// ];

// export default function SolveFlashCard() {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const location = useLocation();
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [isFlipped, setIsFlipped] = useState(false);
//   const [isCompleted, setIsCompleted] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [updateProgress] = useUpdateProgressMcqFlashcardClinicalCaseMutation();
//   const [saveStudyPlanProgress] = useSaveStudyPlanProgressMutation();

//   // Block navigation if user has started but hasn't submitted
//   const blocker = useBlocker(
//     ({ currentLocation, nextLocation }) =>
//       currentQuestion > 0 &&
//       !isSubmitting &&
//       currentLocation.pathname !== nextLocation.pathname
//   );

//   // 🔥 Get flashcard data from navigate() state
//   const stateFlashcardData = location.state?.flashCardData;
//   const source = location.state?.source || "all";
//   const totalFlashCards = location.state?.totalFlashCards;

//   // console.log("SolveFlashCard State Data:", stateFlashcardData);
//   // console.log("SolveFlashCard ID:", id);
//   // console.log("SolveFlashCard Source:", source);

//   // 🔥 Do NOT call API if we already have state data
//   // Call standard API if source is 'all' (and no pre-loaded data)
//   const { data: standardData, isLoading: isStandardLoading } =
//     useGetSingleFlashCardQuery(
//       { id: id as string, limit: totalFlashCards },
//       {
//         skip: !!stateFlashcardData || source === "generated",
//       }
//     );

//   // Call generated API if source is 'generated' (and no pre-loaded data)
//   const { data: generatedData, isLoading: isGeneratedLoading } =
//     useGetSingleGeneratedFlashCardQuery(
//       { id: id as string, limit: totalFlashCards },
//       {
//         skip: !!stateFlashcardData || source !== "generated",
//       }
//     );

//   const isLoading = isStandardLoading || isGeneratedLoading;

//   // 🔥 Final data from either source
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   let flashCardData: any =
//     stateFlashcardData ||
//     (source === "generated" ? generatedData?.data : standardData?.data);

//   // Handle case where it's a direct array (fallback for legacy/direct data)
//   if (Array.isArray(flashCardData)) {
//     flashCardData = {
//       flashCards: flashCardData,
//       title: "Generated Session",
//       subject: "AI Generated",
//     };
//   }

//   // console.log("Final FlashCard Data to Render:", flashCardData);

//   if (!flashCardData && isLoading) return <GlobalLoader2 />;

//   if (
//     !flashCardData ||
//     !flashCardData.flashCards ||
//     flashCardData.flashCards.length === 0
//   ) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
//         <CircleAlert className="w-16 h-16 text-red-500" />
//         <h2 className="text-xl font-semibold text-slate-700">
//           No Flashcards Found
//         </h2>
//         <p className="text-slate-500">
//           The flashcard set you are looking for does not exist or has been removed.
//         </p>
//         <Link to="/dashboard/flashcard-page">
//           <Button className="bg-blue-main hover:bg-blue-main/90">
//             Back to Flashcards
//           </Button>
//         </Link>
//       </div>
//     );
//   }

//   // Convert API/state data into usable format
//   const questions = flashCardData.flashCards.map((fc: any) => ({
//     id: fc?.flashCardId,
//     tag: fc?.difficulty,
//     text: fc?.frontText,
//     answer: fc?.backText,
//     explanation: fc?.explanation,
//     image: fc?.image,
//   }));

//   // Navigation functions
//   const handlePrevious = () => {
//     if (currentQuestion > 0) {
//       setIsFlipped(false);
//       setCurrentQuestion((prev) => prev - 1);
//     }
//   };

//   const handleNext = () => {
//     if (currentQuestion < questions.length - 1) {
//       setIsFlipped(false);
//       setCurrentQuestion((prev) => prev + 1);
//     } else {
//       setIsCompleted(true);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!flashCardData?._id) return;

//     setIsSubmitting(true);

//     try {
//       await updateProgress({
//         totalAttempted: questions.length,
//         totalCorrect: questions.length, // Flashcards are usually just reviewed
//         totalIncorrect: 0,
//         key: "flashcard",
//         bankId: flashCardData._id,
//       }).unwrap();

//       // Check if we came from WeeklyPlan and update study plan progress
//       if (location.state?.from === "weekly-plan" && location.state?.planId) {
//         try {
//           await saveStudyPlanProgress({
//             planId: location.state.planId,
//             day: location.state.day,
//             suggest_content: location.state.suggest_content,
//           }).unwrap();
//           // toast.success("Study plan progress saved!");
//         } catch (error) {
//           console.error("Failed to save study plan progress:", error);
//         }
//       }

//       if (location.state?.from === "weekly-plan") {
//         navigate(-1);
//       } else {
//         navigate("/dashboard/flashcard-page");
//       }
//     } catch (error) {
//       console.error("Failed to save progress:", error);
//       toast.error("Failed to save progress");
//       setIsSubmitting(false);
//     }
//   };

//   // Completion screen
//   if (isCompleted) {
//     return (
//       <div className="min-h-screen flex flex-col justify-center items-center text-center p-6">
//         <h1 className="text-2xl font-bold text-green-600 mb-3">
//           🎉 Session Completed!
//         </h1>
//         <p className="text-gray-600 mb-4">
//           You've reviewed all {questions?.length} flashcards.
//         </p>
//         <Button
//           onClick={handleSubmit}
//           className="bg-blue-main hover:bg-blue-700"
//           disabled={isSubmitting}
//         >
//           {isSubmitting ? "Saving..." : "Done & Save Progress"}
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen my-2 px-2 overflow-y-auto">
//       <AlertDialog open={blocker.state === "blocked"}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Are you sure you want to leave?</AlertDialogTitle>
//             <AlertDialogDescription>
//               You are in the middle of a session. If you leave now, your current
//               progress will not be saved.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel
//               onClick={() => blocker.state === "blocked" && blocker.reset()}
//             >
//               Cancel
//             </AlertDialogCancel>
//             <AlertDialogAction
//               className="bg-red-500 hover:bg-red-600 text-white border-none"
//               onClick={() => {
//                 if (blocker.state === "blocked") {
//                   blocker.proceed();
//                 }
//               }}
//             >
//               Leave
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//       <div className="text-sm text-gray-600">
//         <Breadcrumb breadcrumbs={breadcrumbs} />
//       </div>

//       <div className="flex items-start gap-3 mb-4">
//         <div
//           onClick={() => {
//             if (location.state?.from === "weekly-plan") {
//               navigate(-1);
//             } else {
//               navigate("/dashboard/flashcard-page");
//             }
//           }}
//           className="mt-0.5 cursor-pointer"
//         >
//           <ArrowLeft />
//         </div>
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4">
//           <DashboardHeading
//             title={flashCardData?.title}
//             titleColor="text-[#0A0A0A]"
//             titleSize="text-xl"
//             description="Flip the card to check the correct answer."
//             descColor="text-[#4A5565]"
//             descSize="text-sm"
//           />
//           {/* <Button
//             onClick={handleSubmit}
//             disabled={isSubmitting || currentQuestion === 0}
//             className={`cursor-pointer ${
//               isSubmitting || currentQuestion === 0
//                 ? "bg-gray-300 pointer-events-none"
//                 : "bg-emerald-600 hover:bg-emerald-700"
//             }`}
//           >
//             {isSubmitting ? "Submitting..." : "Submit Progress"}
//           </Button> */}
//         </div>
//       </div>

//       <div className="flex flex-col md:flex-row gap-4">
//         <div
//           className={`bg-white rounded-lg shadow transition-all duration-300
//   ${isSidebarOpen ? "w-full md:w-1/6" : "w-14"}
//   `}
//         >
//           {/* Header */}
//           <div className="flex items-center justify-between p-4 border-b border-b-slate-300">
//             {isSidebarOpen && (
//               <div>
//                 <h2 className="font-semibold">{flashCardData?.title}</h2>
//                 <p className="text-sm text-gray-600">
//                   {questions.length} Flashcards • {flashCardData?.subject}
//                 </p>
//               </div>
//             )}

//             <button
//               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//               className="text-gray-500 hover:text-gray-800 cursor-pointer"
//               title={isSidebarOpen ? "Collapse" : "Expand"}
//             >
//               {isSidebarOpen ? "❮" : "❯"}
//             </button>
//           </div>

//           {/* Scrollable List */}
//           <div
//             className={`overflow-y-auto transition-all thin-scrollbar
//     ${isSidebarOpen ? "max-h-[500px] p-4" : "max-h-[500px] p-2 no-scrollbar"}
//     `}
//           >
//             {questions.map((q: any, index: number) => (
//               <div
//                 key={q?.id}
//                 className={`p-2 mb-2 rounded cursor-pointer text-sm
//         ${
//           index === currentQuestion
//             ? "bg-blue-100 text-blue-600 font-medium"
//             : "text-gray-600 hover:bg-gray-100"
//         }`}
//                 onClick={() => {
//                   setIsFlipped(false);
//                   setCurrentQuestion(index);
//                 }}
//               >
//                 {isSidebarOpen ? `Card ${index + 1}` : index + 1}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Flashcard Box */}
//         <div
//           className={`flex flex-col items-center border border-slate-300 rounded-[8px] px-5 transition-all duration-300
//   ${isSidebarOpen ? "w-full md:w-5/6" : "w-full md:w-[calc(100%-2.5rem)]"}
//   `}
//         >
//           <div className="w-full max-w-2xl mt-7 mb-12 border border-slate-300 px-4 rounded-[8px]">
//             <h3 className="font-medium text-slate-900">
//               Review your Flashcard
//             </h3>
//             <p className="text-sm text-slate-900">
//               Click card to reveal the answer
//             </p>
//           </div>

//           {/* Flip Card */}
//           <div
//             className={`relative w-full max-w-2xl h-64 md:h-96 bg-white rounded-xl shadow-lg cursor-pointer transition-transform duration-500 preserve-3d ${
//               isFlipped ? "rotate-y-180" : ""
//             }`}
//             onClick={() => setIsFlipped(!isFlipped)}
//             style={{ transformStyle: "preserve-3d" }}
//           >
//             {/* Front */}
//             <div className="absolute w-full h-full flex flex-col justify-center items-center p-6 backface-hidden">
//               <span className="absolute top-3 left-3 text-xs font-semibold text-white bg-slate-600 py-1 px-2 rounded-r-3xl rounded-l-3xl">
//                 {questions[currentQuestion]?.tag}
//               </span>

//               <div className="text-center">
//                 <div className="bg-[#007BFF1A] p-2 rounded-full w-10 h-10 mx-auto">
//                   <BadgeHelp />
//                 </div>
//                 <p className="text-lg text-black font-medium mt-4 mb-3">
//                   Question
//                 </p>

//                 {questions[currentQuestion]?.image && (
//                   <img
//                     src={questions[currentQuestion]?.image}
//                     alt=""
//                     className="w-[300px] h-[150px] mb-2 rounded object-cover mx-auto"
//                   />
//                 )}

//                 <p className="text-center text-lg font-medium">
//                   {questions[currentQuestion]?.text}
//                 </p>
//               </div>
//             </div>

//             {/* Back */}
//             <div className="absolute w-full h-full flex flex-col justify-center items-center p-6 bg-blue-50 rounded-xl rotate-y-180 backface-hidden">
//               <h3 className="text-blue-600 font-semibold mb-2">Answer</h3>
//               <p className="text-center text-lg mb-6">
//                 {questions[currentQuestion]?.answer}
//               </p>

//               {questions[currentQuestion]?.explanation && (
//                 <div className="w-full mt-2 pl-4 border-l-4 border-blue-200 text-left">
//                   <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
//                     Explanation
//                   </p>
//                   <p className="text-sm text-slate-600 leading-relaxed italic">
//                     {questions[currentQuestion]?.explanation}
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Navigation */}
//           <div className="flex items-center justify-end gap-3 w-full mt-6 mb-3">
//             {currentQuestion > 0 ? (
//               <Button variant="outline" onClick={handlePrevious}>
//                 Previous
//               </Button>
//             ) : (
//               <div></div>
//             )}

//             {currentQuestion < questions.length - 1 ? (
//               <Button onClick={handleNext}>Next</Button>
//             ) : (
//               <Button
//                 onClick={handleNext}
//                 className="bg-blue-main hover:bg-blue-700"
//               >
//                 Complete
//               </Button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BadgeHelp, CircleAlert } from "lucide-react";
import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
import { BreadcrumbItem } from "@/components/dashboard/gamified-learning/types";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  useGetSingleFlashCardQuery,
  useGetSingleGeneratedFlashCardQuery,
} from "@/store/features/flashCard/flashCard.api";
import { useSaveStudyPlanProgressMutation } from "@/store/features/studyPlan/studyPlan.api";
import { useUpdateProgressMcqFlashcardClinicalCaseMutation } from "@/store/features/goal/goal.api";
import DashboardHeading from "@/components/reusable/DashboardHeading";
import GlobalLoader2 from "@/common/GlobalLoader2";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useBlocker, useNavigate } from "react-router-dom";

const breadcrumbs: BreadcrumbItem[] = [
  { name: "Dashboard", link: "/dashboard" },
  { name: "Flashcard Generator", link: "/dashboard/flashcard-generator" },
];

// Color array for flashcard backgrounds
const cardColors = [
  "bg-gradient-to-br from-purple-500 to-purple-600",
  "bg-gradient-to-br from-blue-500 to-blue-600",
  "bg-gradient-to-br from-green-500 to-green-600",
  "bg-gradient-to-br from-orange-500 to-orange-600",
  "bg-gradient-to-br from-pink-500 to-pink-600",
  "bg-gradient-to-br from-teal-500 to-teal-600",
  "bg-gradient-to-br from-indigo-500 to-indigo-600",
  "bg-gradient-to-br from-red-500 to-red-600",
  "bg-gradient-to-br from-cyan-500 to-cyan-600",
  "bg-gradient-to-br from-amber-500 to-amber-600",
];

export default function SolveFlashCard() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreviousModal, setShowPreviousModal] = useState(false);

  const [updateProgress] = useUpdateProgressMcqFlashcardClinicalCaseMutation();
  const [saveStudyPlanProgress] = useSaveStudyPlanProgressMutation();

  // Block navigation if user has started but hasn't submitted
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      currentQuestion > 0 &&
      !isSubmitting &&
      currentLocation.pathname !== nextLocation.pathname
  );

  // 🔥 Get flashcard data from navigate() state
  const stateFlashcardData = location.state?.flashCardData;
  const source = location.state?.source || "all";
  const totalFlashCards = location.state?.totalFlashCards;

  // console.log("SolveFlashCard State Data:", stateFlashcardData);
  // console.log("SolveFlashCard ID:", id);
  // console.log("SolveFlashCard Source:", source);

  // 🔥 Do NOT call API if we already have state data
  // Call standard API if source is 'all' (and no pre-loaded data)
  const { data: standardData, isLoading: isStandardLoading } =
    useGetSingleFlashCardQuery(
      { id: id as string, limit: totalFlashCards },
      {
        skip: !!stateFlashcardData || source === "generated",
      }
    );

  // Call generated API if source is 'generated' (and no pre-loaded data)
  const { data: generatedData, isLoading: isGeneratedLoading } =
    useGetSingleGeneratedFlashCardQuery(
      { id: id as string, limit: totalFlashCards },
      {
        skip: !!stateFlashcardData || source !== "generated",
      }
    );

  const isLoading = isStandardLoading || isGeneratedLoading;

  // 🔥 Final data from either source
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let flashCardData: any =
    stateFlashcardData ||
    (source === "generated" ? generatedData?.data : standardData?.data);

  // Handle case where it's a direct array (fallback for legacy/direct data)
  if (Array.isArray(flashCardData)) {
    flashCardData = {
      flashCards: flashCardData,
      title: "Generated Session",
      subject: "AI Generated",
    };
  }

  // console.log("Final FlashCard Data to Render:", flashCardData);

  if (!flashCardData && isLoading) return <GlobalLoader2 />;

  if (
    !flashCardData ||
    !flashCardData.flashCards ||
    flashCardData.flashCards.length === 0
  ) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <CircleAlert className="w-16 h-16 text-red-500" />
        <h2 className="text-xl font-semibold text-slate-700">
          No Flashcards Found
        </h2>
        <p className="text-slate-500">
          The flashcard set you are looking for does not exist or has been removed.
        </p>
        <Link to="/dashboard/flashcard-page">
          <Button className="bg-blue-main hover:bg-blue-main/90">
            Back to Flashcards
          </Button>
        </Link>
      </div>
    );
  }

  // Convert API/state data into usable format
  const questions = flashCardData.flashCards.map((fc: any) => ({
    id: fc?.flashCardId,
    tag: fc?.difficulty,
    text: fc?.frontText,
    answer: fc?.backText,
    explanation: fc?.explanation,
    image: fc?.image,
  }));

  // Navigation functions
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setShowPreviousModal(true);
    }
  };

  const confirmPrevious = () => {
    setIsFlipped(false);
    setCurrentQuestion((prev) => prev - 1);
    setShowPreviousModal(false);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setIsFlipped(false);
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleSubmit = async () => {
    if (!flashCardData?._id) return;

    setIsSubmitting(true);

    try {
      await updateProgress({
        totalAttempted: questions.length,
        totalCorrect: questions.length, // Flashcards are usually just reviewed
        totalIncorrect: 0,
        key: "flashcard",
        bankId: flashCardData._id,
      }).unwrap();

      // Check if we came from WeeklyPlan and update study plan progress
      if (location.state?.from === "weekly-plan" && location.state?.planId) {
        try {
          await saveStudyPlanProgress({
            planId: location.state.planId,
            day: location.state.day,
            suggest_content: location.state.suggest_content,
          }).unwrap();
          // toast.success("Study plan progress saved!");
        } catch (error) {
          console.error("Failed to save study plan progress:", error);
        }
      }

      if (location.state?.from === "weekly-plan") {
        navigate(-1);
      } else {
        navigate("/dashboard/flashcard-page");
      }
    } catch (error) {
      console.error("Failed to save progress:", error);
      toast.error("Failed to save progress");
      setIsSubmitting(false);
    }
  };

  // Completion screen
  if (isCompleted) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center p-6">
        <h1 className="text-2xl font-bold text-green-600 mb-3">
          🎉 Session Completed!
        </h1>
        <p className="text-gray-600 mb-4">
          You've reviewed all {questions?.length} flashcards.
        </p>
        <Button
          onClick={handleSubmit}
          className="bg-blue-main hover:bg-blue-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Done & Save Progress"}
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen my-2 px-2 overflow-y-auto">
      <AlertDialog open={blocker.state === "blocked"}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to leave?</AlertDialogTitle>
            <AlertDialogDescription>
              You are in the middle of a session. If you leave now, your current
              progress will not be saved.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => blocker.state === "blocked" && blocker.reset()}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600 text-white border-none"
              onClick={() => {
                if (blocker.state === "blocked") {
                  blocker.proceed();
                }
              }}
            >
              Leave
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <AlertDialog open={showPreviousModal} onOpenChange={setShowPreviousModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Go to Previous Question?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to go back to the previous question?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowPreviousModal(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmPrevious}>
              Yes, Go Back
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <div className="text-sm text-gray-600">
        <Breadcrumb breadcrumbs={breadcrumbs} />
      </div>

      <div className="flex items-start gap-3 mb-4">
        <div
          onClick={() => {
            if (location.state?.from === "weekly-plan") {
              navigate(-1);
            } else {
              navigate("/dashboard/flashcard-page");
            }
          }}
          className="mt-0.5 cursor-pointer"
        >
          <ArrowLeft />
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4">
          <DashboardHeading
            title={flashCardData?.title}
            titleColor="text-[#0A0A0A]"
            titleSize="text-xl"
            description="Flip the card to check the correct answer."
            descColor="text-[#4A5565]"
            descSize="text-sm"
          />
          {/* <Button
            onClick={handleSubmit}
            disabled={isSubmitting || currentQuestion === 0}
            className={`cursor-pointer ${
              isSubmitting || currentQuestion === 0
                ? "bg-gray-300 pointer-events-none"
                : "bg-emerald-600 hover:bg-emerald-700"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit Progress"}
          </Button> */}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div
          className={`bg-white rounded-lg shadow transition-all duration-300
  ${isSidebarOpen ? "w-full md:w-1/6" : "w-14"}
  `}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-b-slate-300">
            {isSidebarOpen && (
              <div>
                <h2 className="font-semibold">{flashCardData?.title}</h2>
                <p className="text-sm text-gray-600">
                  {questions.length} Flashcards • {flashCardData?.subject}
                </p>
              </div>
            )}

            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-500 hover:text-gray-800 cursor-pointer"
              title={isSidebarOpen ? "Collapse" : "Expand"}
            >
              {isSidebarOpen ? "❮" : "❯"}
            </button>
          </div>

          {/* Scrollable List */}
          <div
            className={`overflow-y-auto transition-all thin-scrollbar
    ${isSidebarOpen ? "max-h-[500px] p-4" : "max-h-[500px] p-2 no-scrollbar"}
    `}
          >
            {questions.map((q: any, index: number) => (
              <div
                key={q?.id}
                className={`p-2 mb-2 rounded cursor-pointer text-sm
        ${
          index === currentQuestion
            ? "bg-blue-100 text-blue-600 font-medium"
            : "text-gray-600 hover:bg-gray-100"
        }`}
                onClick={() => {
                  setIsFlipped(false);
                  setCurrentQuestion(index);
                }}
              >
                {isSidebarOpen ? `Card ${index + 1}` : index + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Flashcard Box */}
        <div
          className={`flex flex-col items-center border border-slate-300 rounded-[8px] px-5 transition-all duration-300
  ${isSidebarOpen ? "w-full md:w-5/6" : "w-full md:w-[calc(100%-2.5rem)]"}
  `}
        >
          <div className="w-full max-w-2xl mt-7 mb-12 border border-slate-300 px-4 rounded-[8px]">
            <h3 className="font-medium text-slate-900">
              Review your Flashcard
            </h3>
            <p className="text-sm text-slate-900">
              Click card to reveal the answer
            </p>
          </div>

          {/* Flip Card */}
          <div
            className={`relative w-full max-w-2xl h-64 md:h-96 rounded-xl shadow-lg cursor-pointer transition-transform duration-500 preserve-3d ${
              isFlipped ? "rotate-y-180" : ""
            }`}
            onClick={() => setIsFlipped(!isFlipped)}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front */}
            <div className={`absolute w-full h-full flex flex-col justify-center items-center p-6 backface-hidden rounded-xl ${cardColors[currentQuestion % cardColors.length]}`}>
              <span className="absolute top-3 left-3 text-xs font-semibold text-white bg-black/30 py-1 px-2 rounded-r-3xl rounded-l-3xl">
                {questions[currentQuestion]?.tag}
              </span>

              <div className="text-center">
                <div className="bg-white/20 p-2 rounded-full w-10 h-10 mx-auto">
                  <BadgeHelp className="text-white" />
                </div>
                <p className="text-2xl text-white font-bold mt-4 mb-4 tracking-wide font-sans">
                  Question
                </p>

                {questions[currentQuestion]?.image && (
                  <img
                    src={questions[currentQuestion]?.image}
                    alt=""
                    className="w-[300px] h-[150px] mb-2 rounded object-cover mx-auto"
                  />
                )}

                <p className="text-center text-xl font-semibold text-white leading-relaxed font-sans px-4">
                  {questions[currentQuestion]?.text}
                </p>
              </div>
            </div>

            {/* Back */}
            <div className="absolute w-full h-full flex flex-col justify-center items-center p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl rotate-y-180 backface-hidden">
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-wide font-sans">Answer</h3>
              <p className="text-center text-xl font-semibold text-slate-800 mb-6 leading-relaxed font-sans px-4">
                {questions[currentQuestion]?.answer}
              </p>

              {questions[currentQuestion]?.explanation && (
                <div className="w-full mt-2 pl-4 border-l-4 border-blue-400 text-left bg-white/50 rounded-r-lg p-3">
                  <p className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-2 font-sans">
                    Explanation
                  </p>
                  <p className="text-base text-slate-700 leading-relaxed font-sans">
                    {questions[currentQuestion]?.explanation}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-end gap-3 w-full mt-6 mb-3">
            {currentQuestion > 0 ? (
              <Button variant="outline" onClick={handlePrevious}>
                Previous
              </Button>
            ) : (
              <div></div>
            )}

            {currentQuestion < questions.length - 1 ? (
              <Button onClick={handleNext}>Next</Button>
            ) : (
              <Button
                onClick={handleNext}
                className="bg-blue-main hover:bg-blue-700"
              >
                Complete
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
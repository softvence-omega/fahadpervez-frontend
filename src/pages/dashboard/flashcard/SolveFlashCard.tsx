import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BadgeHelp } from "lucide-react";

// Sample flashcard data
const flashCardData = {
    title: "Session 1",
    description: "5 Flashcards. Medium. Neurology.",
    isCompleted: false,
    questions: [
        {
            id: "01",
            tag: "Acne Vulgaris",
            text: "A 19-year-old female presents to the clinic with moderate acne vulgaris. She reports frequent flare-ups, particularly after physical activities and when using certain cosmetics. What lifestyle modification should the physician prioritize to minimize mechanical irritation?",
            answer: "Avoid touching the face frequently.",
        },
        {
            id: "02",
            tag: "Migraine",
            text: "A patient with migraine headaches is prescribed a triptan. What is the primary mechanism of action?",
            answer: "Serotonin receptor agonist.",
        },
        {
            id: "03",
            tag: "Parkinson's Disease",
            text: "Which of the following is a common symptom of Parkinson's disease?",
            answer: "Tremor at rest.",
        },
        {
            id: "04",
            tag: "Subarachnoid Hemorrhage",
            text: "A 45-year-old man presents with sudden onset of severe headache. CT scan shows subarachnoid hemorrhage. What is the most likely cause?",
            answer: "Ruptured aneurysm.",
        },
        {
            id: "05",
            tag: "Stroke",
            text: "What is the first-line treatment for acute ischemic stroke?",
            answer: "tPA (tissue plasminogen activator).",
        },
    ],
};

export default function SolveFlashCard() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const questions = flashCardData.questions;
    const [isCompleted, setIsCompleted] = useState(flashCardData.isCompleted);
    console.log(isCompleted)

    // Navigation
    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setIsFlipped(false);
            setCurrentQuestion((prev) => prev - 1);
        }
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setIsFlipped(false);
            setCurrentQuestion((prev) => prev + 1);
        } else {
            // last card reached
            setIsCompleted(true);
        }
    };


    if (isCompleted) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center text-center p-6">
                <h1 className="text-2xl font-bold text-green-600 mb-3">
                    🎉 Session Completed!
                </h1>
                <p className="text-gray-600 mb-4">
                    You’ve reviewed all {questions.length} flashcards.
                </p>
                <Button
                    onClick={() => {
                        setIsCompleted(false);
                        setCurrentQuestion(0);
                    }}
                >
                    Restart Session
                </Button>
            </div>
        );
    }



    return (
        <div className="min-h-screen">
            {/* Header */}
            <div className="text-sm text-gray-600 mb-2">
                Dashboard &gt; MCOG &gt; Custom Flashcards
            </div>
            <h1 className="text-xl font-bold mb-1">Flashcards</h1>
            <p className="text-sm text-gray-600 mb-4">
                Flip the card to check the correct answer.
            </p>

            {/* Main Content */}
            <div className="flex flex-col md:flex-row gap-4">
                {/* Sidebar */}
                <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow">
                    <h2 className="font-semibold mb-2">{flashCardData.title}</h2>
                    <p className="text-sm text-gray-600 mb-4">
                        {flashCardData.description}
                    </p>
                    {questions.map((q, index) => (
                        <div
                            key={q.id}
                            className={`p-2 mb-2 rounded cursor-pointer ${index === currentQuestion
                                ? "bg-blue-100 text-blue-600"
                                : "text-gray-600"
                                }`}
                            onClick={() => {
                                setIsFlipped(false);
                                setCurrentQuestion(index);
                            }}
                        >
                            Card {q.id}
                        </div>
                    ))}
                </div>

                {/* Flashcard Area */}
                <div className="w-full md:w-3/4 flex flex-col items-center">
                    <div
                        className={`relative w-full max-w-2xl h-64 md:h-80 bg-white rounded-xl shadow-lg cursor-pointer transition-transform duration-500 preserve-3d ${isFlipped ? "rotate-y-180" : ""
                            }`}
                        onClick={() => setIsFlipped((prev) => !prev)}
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        {/* Front (Question) */}
                        <div className="absolute w-full h-full flex flex-col justify-center items-center p-6 backface-hidden">
                            <span className="absolute top-3 left-3 text-xs font-semibold text-white bg-slate-600 py-1 px-2 rounded-r-3xl rounded-l-3xl mt-3 ml-5">
                                {questions[currentQuestion].tag}
                            </span>
                            <div className="text-center">
                                <div className="bg-[#007BFF1A] p-2 rounded-full w-10 h-10 mx-auto">
                                    <BadgeHelp />
                                </div>
                                <p className="text-lg text-black font-medium mt-4 mb-3">Question</p>
                                <p className="text-center">
                                    {questions[currentQuestion].text}
                                </p>
                            </div>
                        </div>

                        {/* Back (Answer) */}
                        <div className="absolute w-full h-full flex flex-col justify-center items-center p-6 bg-blue-50 rounded-xl rotate-y-180 backface-hidden">
                            <h3 className="text-blue-600 font-semibold mb-2">Answer</h3>
                            <p className="text-center text-lg">
                                {questions[currentQuestion].answer}
                            </p>
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between w-full mt-6">
                        {currentQuestion > 0 ? (
                            <Button variant="outline" onClick={handlePrevious}>
                                Previous
                            </Button>
                        ) : (
                            <div></div>
                        )}
                        {currentQuestion < questions.length && (
                            <Button onClick={handleNext}>Next</Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

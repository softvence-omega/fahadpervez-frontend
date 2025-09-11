// src/components/Quiz.js
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Timer } from 'lucide-react'; // Assuming lucide-react for icons, install if needed

// Sample JSON data for medical students (Neurology questions)
const quizData = {
    title: "Session 1",
    description: "5 Question. Medium. Neurology.",
    questions: [
        {
            id: "01",
            text: "A 19-year-old female presents to the clinic with moderate acne vulgaris. She reports frequent flare-ups, particularly after physical activities and when using certain cosmetics. The physician discusses lifestyle modifications to minimize irritation and avoid oil-based products. After the following recommendations should the physician prioritize to minimize mechanical irritation?",
            options: [
                { value: "A", label: "A. Increase dairy intake" },
                { value: "B", label: "B. Use oil-based moisturizers" },
                { value: "C", label: "C. Avoid touching the face frequently" },
                { value: "D", label: "D. Apply heavy makeup daily" },
                { value: "E", label: "E. Engage in prolonged sun exposure" },
            ],
        },
        {
            id: "02",
            text: "A patient with migraine headaches is prescribed a triptan. What is the primary mechanism of action?",
            options: [
                { value: "A", label: "A. Beta-blocker" },
                { value: "B", label: "B. Serotonin receptor agonist" },
                { value: "C", label: "C. Calcium channel blocker" },
                { value: "D", label: "D. Anticonvulsant" },
                { value: "E", label: "E. Opioid agonist" },
            ],
        },
        {
            id: "03",
            text: "Which of the following is a common symptom of Parkinson's disease?",
            options: [
                { value: "A", label: "A. Hyperreflexia" },
                { value: "B", label: "B. Tremor at rest" },
                { value: "C", label: "C. Visual hallucinations" },
                { value: "D", label: "D. Seizures" },
                { value: "E", label: "E. Ataxia" },
            ],
        },
        {
            id: "04",
            text: "A 45-year-old man presents with sudden onset of severe headache. CT scan shows subarachnoid hemorrhage. What is the most likely cause?",
            options: [
                { value: "A", label: "A. Hypertension" },
                { value: "B", label: "B. Ruptured aneurysm" },
                { value: "C", label: "C. Trauma" },
                { value: "D", label: "D. Arteriovenous malformation" },
                { value: "E", label: "E. Coagulopathy" },
            ],
        },
        {
            id: "05",
            text: "What is the first-line treatment for acute ischemic stroke?",
            options: [
                { value: "A", label: "A. Aspirin" },
                { value: "B", label: "B. tPA (tissue plasminogen activator)" },
                { value: "C", label: "C. Heparin" },
                { value: "D", label: "D. Warfarin" },
                { value: "E", label: "E. Clopidogrel" },
            ],
        },
    ],
};

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeElapsed, setTimeElapsed] = useState(0);
    const questions = quizData.questions;

    // Timer effect
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeElapsed((prev) => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Format time as MM:SS
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };

    // Handle answer selection
    const handleAnswerChange = (value) => {
        setAnswers((prev) => ({
            ...prev,
            [currentQuestion]: value,
        }));
    };

    // Navigation
    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion((prev) => prev - 1);
        }
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
        } else {
            handleSubmit();
        }
    };

    // Submit answers (simulate backend response)
    const handleSubmit = () => {
        // Collect answers
        const submittedAnswers = {
            session: quizData.title,
            answers: Object.entries(answers).map(([index, answer]) => ({
                questionId: questions[index].id,
                selected: answer,
            })),
        };
        // Simulate backend: console.log or alert
        console.log('Submitted Answers:', JSON.stringify(submittedAnswers, null, 2));
        alert('Quiz submitted! Check console for answers.');
        // Here you can add axios.post('/api/submit', submittedAnswers) for real backend
    };

    // End Quiz
    const handleEndQuiz = () => {
        if (window.confirm('Are you sure you want to end the quiz?')) {
            handleSubmit();
        }
    };

    return (
        <div className="min-h-screen p-4">
            {/* Header */}
            <div className="text-sm text-gray-600 mb-2">
                Dashboard &gt; MCOG &gt; Custom Session
            </div>
            <h1 className="text-xl font-bold mb-1">Your Generated Question</h1>
            <p className="text-sm text-gray-600 mb-4">Build your own challenge. Learn your way.</p>

            {/* Main Content */}
            <div className="flex flex-col md:flex-row gap-4">
                {/* Sidebar */}
                <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow">
                    <h2 className="font-semibold mb-2">{quizData.title}</h2>
                    <p className="text-sm text-gray-600 mb-4">{quizData.description}</p>
                    {questions.map((q, index) => (
                        <div
                            key={q.id}
                            className={`p-2 mb-2 rounded cursor-pointer ${index === currentQuestion ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
                            onClick={() => setCurrentQuestion(index)}
                        >
                            Question {q.id}
                        </div>
                    ))}
                </div>

                {/* Question Area */}
                <div className="w-full md:w-3/4 bg-white p-4 rounded-lg shadow">
                    <h3 className="font-semibold mb-4">Question {questions[currentQuestion].id}</h3>
                    <p className="mb-4">{questions[currentQuestion].text}</p>
                    <RadioGroup
                        value={answers[currentQuestion] || ''}
                        onValueChange={handleAnswerChange}
                    >
                        {questions[currentQuestion].options.map((option) => (
                            <div key={option.value} className="flex items-center space-x-2 mb-2">
                                <RadioGroupItem value={option.value} id={option.value} />
                                <Label htmlFor={option.value}>{option.label}</Label>
                            </div>
                        ))}
                    </RadioGroup>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-6">
                        {currentQuestion > 0 ? (
                            <Button variant="outline" onClick={handlePrevious}>
                                Previous
                            </Button>
                        ) : (
                            <div></div> // Placeholder for alignment
                        )}
                        <Button onClick={handleNext}>
                            {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Bottom Timer */}
            <div className=" bg-white p-4 shadow-lg flex justify-between items-center mt-5">
                <div className="flex items-center">
                    <Timer className="mr-2" />
                    {formatTime(timeElapsed)}
                </div>
                <Button variant="secondary" onClick={handleEndQuiz}>
                    End Quiz
                </Button>
            </div>
        </div>
    );
};

export default Quiz;
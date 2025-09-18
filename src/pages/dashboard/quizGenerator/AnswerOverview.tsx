// src/components/AnswerOverview.js
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

// Sample JSON data for medical students (Neurology questions with answers)
const quizData = {
    title: "Session 1 (Neurology)",
    description: "5 Question | Medium",
    questions: [
        {
            id: "01",
            text: "A 16-year-old female presents to the clinic with complaints of acne vulgaris. She reports using several oil-based cosmetic products and often wears tight-fitting clothing. Upon further questioning, she mentions increased stress levels and irregular menstrual cycles. Which of the following is a risk factor for her condition?",
            options: [
                { value: "A", label: "A. Increased androgen levels", isCorrect: true },
                { value: "B", label: "B. Low humidity environment", isCorrect: false },
                { value: "C", label: "C. High-fiber diet", isCorrect: false },
                { value: "D", label: "D. Excessive sun exposure", isCorrect: false },
                { value: "E", label: "E. Regular exercise", isCorrect: false },
            ],
            explanation: {
                correct: "Increased androgen levels are a well-established risk factor for acne vulgaris. Androgens, such as testosterone, stimulate sebaceous gland activity, leading to increased sebum production. This excess sebum can contribute to the obstruction of the pilosebaceous units, resulting in the formation of comedones (both open and closed), which can evolve into inflammatory lesions. Infertility conditions such as polycystic ovary syndrome (PCOS) can lead to elevated androgen levels, exacerbating acne.",
                incorrect: {
                    "B": "A low humidity environment is not typically associated with an increase in acne vulgaris. In fact, dry conditions may reduce sebum production, potentially alleviating acne symptoms.",
                    "C": "A high-fiber diet is generally considered beneficial for overall health and may have a positive effect on skin health. It does not serve as a risk factor for acne vulgaris.",
                    "D": "While excessive sun exposure can lead to skin damage and may temporarily improve acne lesions due to drying effects, it is not a direct risk factor for the development of acne vulgaris.",
                    "E": "Regular exercise is associated with numerous health benefits, including improved circulation and stress reduction. It does not increase the risk of acne vulgaris and may even help mitigate some acne symptoms."
                },
                references: "Thiboutot, D., et al. (2018). 'The role of androgens in acne.' Journal of Clinical and Aesthetic Dermatology, 11(3), 20-27. Zaenglein, A. L., et al. (2016). 'Guidelines of care for the management of acne vulgaris.' Journal of the American Academy of Dermatology, 74(5), 945-973. Draelos, Z. D. (2019). 'Cosmetic Dermatology: Products and Procedures.' Wiley-Blackwell."
            },
        },
        // Add more questions as needed
        {
            id: "02",
            text: "A patient with migraine headaches is prescribed a triptan. What is the primary mechanism of action?",
            options: [
                { value: "A", label: "A. Beta-blocker", isCorrect: false },
                { value: "B", label: "B. Serotonin receptor agonist", isCorrect: true },
                { value: "C", label: "C. Calcium channel blocker", isCorrect: false },
                { value: "D", label: "D. Anticonvulsant", isCorrect: false },
                { value: "E", label: "E. Opioid agonist", isCorrect: false },
            ],
            explanation: {
                correct: "Triptans work as serotonin receptor agonists, specifically targeting 5-HT1B/1D receptors, which helps to constrict dilated blood vessels and reduce inflammation in the brain during a migraine attack.",
                incorrect: {
                    "A": "Beta-blockers are used for migraine prevention, not as a primary mechanism for triptans.",
                    "C": "Calcium channel blockers are used for other conditions like hypertension, not migraine treatment.",
                    "D": "Anticonvulsants are sometimes used for migraine prevention, not as a primary mechanism for triptans.",
                    "E": "Opioid agonists are not a standard treatment for migraines."
                },
            },
        },
        // Add remaining questions similarly
    ],
};

const AnswerOverview = () => {
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
        }
    };

    // Determine if answer is correct and get correct answer
    const selectedAnswer = answers[currentQuestion];
    const currentQuestionData = questions[currentQuestion];
    const isCorrect = selectedAnswer && currentQuestionData.options.find(opt => opt.value === selectedAnswer)?.isCorrect;
    const correctAnswer = currentQuestionData.options.find(opt => opt.isCorrect)?.label;

    return (
        <div className="min-h-screen bg-blue-50 p-4">
            {/* Header */}
            <div className="text-sm text-gray-600 mb-2">
                Dashboard &gt; MCOG &gt; Custom Session
            </div>
            <h1 className="text-xl font-bold mb-1">{quizData.title}</h1>
            <p className="text-sm text-gray-600 mb-4">{quizData.description}</p>

            {/* Main Content */}
            <div className="flex flex-col md:flex-row gap-4">
                {/* Sidebar */}
                <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow">
                    <h2 className="font-semibold mb-2">Study Mode</h2>
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
                        disabled={true} // Disable selection in overview mode
                    >
                        {questions[currentQuestion].options.map((option) => (
                            <div key={option.value} className="flex items-center space-x-2 mb-2">
                                <RadioGroupItem
                                    value={option.value}
                                    id={option.value}
                                    checked={answers[currentQuestion] === option.value}
                                    className={`
                    ${answers[currentQuestion] === option.value && option.isCorrect ? 'text-green-600' : ''}
                    ${answers[currentQuestion] === option.value && !option.isCorrect ? 'text-red-600' : ''}
                  `}
                                />
                                <Label
                                    htmlFor={option.value}
                                    className={`
                    ${answers[currentQuestion] === option.value && option.isCorrect ? 'text-green-600 font-bold' : ''}
                    ${answers[currentQuestion] === option.value && !option.isCorrect ? 'text-red-600 line-through' : ''}
                    ${!answers[currentQuestion] && option.isCorrect ? 'text-green-600 font-bold' : ''}
                  `}
                                >
                                    {option.label}
                                </Label>
                                {answers[currentQuestion] && !option.isCorrect && option.isCorrect && (
                                    <span className="text-green-600 ml-2">Correct: {correctAnswer}</span>
                                )}
                            </div>
                        ))}
                    </RadioGroup>

                    {/* Explanation */}
                    {/* {answers[currentQuestion] && ( */}
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold mb-2">Explanation</h4>

                        {currentQuestionData.options.map((option) => {
                            const isOptionCorrect = option.isCorrect;
                            return (
                                <div key={option.value} className="mb-3">
                                    {/* Label (Correct/Incorrect choice) */}
                                    {isOptionCorrect ? (
                                        <p className="font-medium text-green-600">
                                            [Correct - Choice {option.value}]
                                        </p>
                                    ) : (
                                        <p className="font-medium text-red-600">[Choice {option.value}]</p>
                                    )}

                                    {/* Explanation text */}
                                    <p className="text-gray-800">
                                        {isOptionCorrect
                                            ? currentQuestionData.explanation.correct
                                            : currentQuestionData.explanation.incorrect[option.value]}
                                    </p>
                                </div>
                            );
                        })}

                        {/* References */}
                        <p className="text-sm text-gray-600 mt-4 italic">
                            {currentQuestionData.explanation.references}
                        </p>
                    </div>

                    {/* )} */}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-6">
                        {currentQuestion > 0 ? (
                            <Button variant="outline" onClick={handlePrevious}>
                                Previous
                            </Button>
                        ) : (
                            <div></div>
                        )}
                        {currentQuestion < questions.length - 1 ? (
                            <Button onClick={handleNext}>Next</Button>
                        ) : null}
                    </div>
                </div>
            </div>

            {/* Bottom Timer */}
            {/* <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg flex justify-between items-center">
                <div className="flex items-center">
                    <Timer className="mr-2" />
                    {formatTime(timeElapsed)}
                </div>
            </div> */}
        </div>
    );
};

export default AnswerOverview;
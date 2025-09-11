import { Link } from "react-router-dom";
import { Button } from "../ui/button";

interface ResultsSummaryProps {
    completed: number;
    total: number;
    correct: number;
    incorrect: number;
}

const ResultsSummary: React.FC<ResultsSummaryProps> = ({
    completed,
    total,
    correct,
    incorrect,
}) => {
    const correctPercentage = Math.round((correct / total) * 100);

    return (
        <div className="text-center mt-4">
            <p className="text-lg">
                You completed {completed}/{total} questions. You answered:
            </p>
            <p className="mt-2">
                <span className="flex items-center mr-4">
                    <div className="w-4 h-4 bg-green-600 mr-2"></div>
                    {correctPercentage}% correctly ({correct} questions)
                </span>
                <span className="flex items-center">
                    <div className="w-4 h-4 bg-gray-300 mr-2"></div>
                    {100 - correctPercentage}% incorrectly ({incorrect} questions)
                </span>
            </p>
            <div className="flex justify-center space-x-4 mt-6">
                <Button className="bg-blue-main">Repeat Session</Button>
                <Link to={`/dashboard/quiz-answer-overview/${"2"}`}><Button className="bg-slate-600">Review Session</Button></Link>
            </div>
        </div>
    );
};

export default ResultsSummary;

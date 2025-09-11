import { BrainCircuit, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function QuizCard() {
    const navigate = useNavigate();

    const handleQuiz = (id: string) => {
        navigate(`/dashboard/quiz/${id}`)
    }

    return (
        <div>
            <div className="p-5 border border-slate-300 rounded-[12px]">
                <div className="mb-10">
                    <div className="flex items-center gap-1">
                        <BrainCircuit className="text-zinc-950" />
                        <h3 className="text-[#0A0A0A]">Human Anatomy - Heart Structure</h3>
                    </div>
                    <p className="text-sm text-slate-500 mt-2">1 questions • From anatomy_diagram.jpg</p>
                </div>
                <button onClick={() => handleQuiz('3')} className="w-full rounded-[4px] py-3 flex justify-center gap-1 items-center bg-emerald-800 text-white">
                    <Play className="w-4 h-4" /> Start Quiz
                </button>
            </div>
        </div>
    )
}

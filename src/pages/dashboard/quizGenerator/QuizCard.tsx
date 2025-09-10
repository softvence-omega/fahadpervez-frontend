import { BrainCircuit, Play } from "lucide-react";

export default function QuizCard() {
    return (
        <div>
            <div className="p-5 border border-slate-300 rounded-[12px]">
                <div className="mb-10">
                    <div className="flex items-center gap-1">
                        <BrainCircuit className="text-zinc-950"/>
                        <h3 className="text-[#0A0A0A]">Human Anatomy - Heart Structure</h3>
                    </div>
                    <p className="text-sm text-slate-500 mt-2">1 questions • From anatomy_diagram.jpg</p>
                </div>
                <button className="w-full rounded-[4px] py-3 flex justify-center gap-1 items-center bg-emerald-800 text-white">
                    <Play className="w-4 h-4" /> Start Quiz
                </button>
            </div>
        </div>
    )
}

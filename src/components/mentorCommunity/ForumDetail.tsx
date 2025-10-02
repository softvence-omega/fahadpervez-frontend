import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import message from "@/assets/dashboard/message-circle.svg";

interface ForumDetailProps {
    forumId: string
    onBack: () => void
}

interface Answer {
    id: string
    author: {
        name: string
        avatar: string
        badge?: string
    }
    timeAgo: string
    content: string
}

const ForumDetail = ({ forumId, onBack }: ForumDetailProps) => {
    console.log(forumId)
    const [answer, setAnswer] = useState("")
    const [answers] = useState<Answer[]>([
        {
            id: "1",
            author: {
                name: "Alex Thompson",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
                badge: "MODERATOR",
            },
            timeAgo: "4 hours ago",
            content:
                "I highly recommend 'The ECG Made Easy' by John Hampton. It's concise but comprehensive. Also, try the ECG tutor app - it has great practice cases with step-by-step explanations. For blocks specifically, focus on understanding the AV node, QRS width, and rhythm patterns. Practice with real cases daily!",
        },
        {
            id: "2",
            author: {
                name: "Alex Thompson",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
                badge: "MODERATOR",
            },
            timeAgo: "4 hours ago",
            content:
                "I highly recommend 'The ECG Made Easy' by John Hampton. It's concise but comprehensive. Also, try the ECG tutor app - it has great practice cases with step-by-step explanations. For blocks specifically, focus on understanding the AV node, QRS width, and rhythm patterns. Practice with real cases daily!",
        },
    ])

    const handleSubmitAnswer = () => {
        if (answer.trim()) {
            // Handle answer submission
            setAnswer("")
        }
    }

    return (
        <div>
            <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 sm:mb-6">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm sm:text-base">Back to Forums</span>
            </button>

            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
                <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10  rounded-full flex items-center justify-center">
                        <img src={message} />
                    </div>
                    <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Best mnemonics for remembering cranial nerves?</h2>
                            <span className="px-2 py-1 sm:px-3 sm:py-1 bg-red-500 text-white text-xs rounded-full w-fit">Anatomy</span>
                        </div>
                        <p className="text-gray-600 mb-4 text-sm sm:text-base">
                            I'm currently in my 3rd year and I'm really struggling with ECG interpretation. Despite going through
                            several textbooks and online resources, I still find it challenging to identify different arrhythmias and
                            interpret complex ECGs.
                        </p>
                        <p className="text-gray-700 mb-2 text-sm sm:text-base">I've tried:</p>
                        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1 text-sm sm:text-base">
                            <li>Dubin's Rapid Interpretation of EKG's</li>
                            <li>Online ECG tutorials</li>
                            <li>Practicing with various sources</li>
                        </ul>
                        <p className="text-gray-700 mb-4 text-sm sm:text-base">
                            But I still feel like I'm missing something fundamental. Can anyone recommend resources that really helped
                            them master ECG interpretation? I'm particularly struggling with:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1 text-sm sm:text-base">
                            <li>Identifying different types of blocks</li>
                            <li>ST segment interpretation</li>
                            <li>Complex arrhythmias</li>
                        </ul>
                        <p className="text-gray-600 text-sm sm:text-base">Any advice would be greatly appreciated!</p>
                        <div className="flex flex-wrap gap-2 mt-4">
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">#DumbTips</span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">#Neurology</span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500 mt-3">Sumi M • 2nd Year • 2 hours ago</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-600 text-xs sm:text-sm">💡</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">Answers & Solutions ({answers.length})</h3>
                </div>
                <p className="text-gray-600 mb-6 text-sm sm:text-base">Share your knowledge and help fellow students</p>
                <div className=" pt-4 sm:pt-6 bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Your Answer</h4>
                    <textarea
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="What's on your mind? Share a study tip, ask a question, or start a discussion..."
                        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] sm:min-h-[120px] resize-none mb-4 text-sm sm:text-base"
                    />
                    <div className="flex sm:justify-end gap-4">
                        <div className="flex gap-2 self-end sm:self-auto">
                            <button
                                onClick={handleSubmitAnswer}
                                className="px-3 py-2 sm:px-4 sm:py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm sm:text-base cursor-pointer"
                            >
                                Post
                            </button>
                            <button className="px-3 py-2 sm:px-4 sm:py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm sm:text-base cursor-pointer">Cancel</button>

                        </div>
                    </div>
                </div>

                <div className="space-y-6 my-6">
                    {answers.map((ans) => (
                        <div key={ans.id} className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                            <div className="flex items-start gap-3 mb-3">
                                <img
                                    src={ans.author.avatar || "/placeholder.svg"}
                                    alt={ans.author.name}
                                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0"
                                />
                                <div className="flex-1">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{ans.author.name}</h4>
                                        {ans.author.badge && (
                                            <span className="px-2 py-0.5 bg-gray-900 text-white text-xs rounded-[25px] w-fit">{ans.author.badge}</span>
                                        )}
                                    </div>
                                    <p className="text-xs sm:text-sm text-gray-500">{ans.timeAgo}</p>
                                </div>
                            </div>
                            <p className="text-gray-700 text-sm sm:text-base">{ans.content}</p>
                        </div>
                    ))}
                </div>


            </div>
        </div>
    )
}

export default ForumDetail;
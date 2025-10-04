
import { useState } from "react"
import { ChevronRight, ChevronDown } from "lucide-react"

interface QuestionItem {
  id: string
  question: string
  author: string
  answer?: string
  isExpanded?: boolean
}

const Question = () => {
  const [questions, setQuestions] = useState<QuestionItem[]>([
    {
      id: "1",
      question: "Q.Best mnemonics for remembering cranial nerves?",
      author: "Ema Harison",
      isExpanded: false,
    },
    {
      id: "2",
      question: "Q.Best mnemonics for remembering cranial nerves?",
      author: "Ema Harison",
      isExpanded: false,
    },
    {
      id: "3",
      question: "Q.Best mnemonics for remembering cranial nerves?",
      author: "Ema Harison",
      answer:
        "Answer: But I still feel like I'm missing something fundamental. Can anyone recommend resources that really helped them master ECG interpretation? I'm particularly struggling with:\n- Identifying different types of blocks\n- ST segment interpretation\n- Complex arrhythmias",
      isExpanded: true,
    },
    {
      id: "4",
      question: "Q.Best mnemonics for remembering cranial nerves?",
      author: "Ema Harison",
      answer:
        "Answer: But I still feel like I'm missing something fundamental. Can anyone recommend resources that really helped them master ECG interpretation? I'm particularly struggling with:\n- Identifying different types of blocks\n- ST segment interpretation\n- Complex arrhythmias",
      isExpanded: true,
    },
  ])

  const toggleQuestion = (id: string) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, isExpanded: !q.isExpanded } : q)))
  }

  return (
    <div>
      <div className="mb-4 md:mb-8 space-y-2">
        <h4 className="text-[16px] md:text-[20px] font-semibold text-[#0F172A]">
         Asked Question
        </h4>
        <p className="text-[14px] md:text-[16px] text-gray-600">See who’s asking, learning, and engaging.</p>
      </div>
      <div className="flex gap-6">
        <div className="flex-1 space-y-4">
          <div className="bg-white rounded-lg shadow-sm">

            <div className="divide-y divide-gray-200">
              {questions.map((question) => (
                <div key={question.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <button
                        onClick={() => toggleQuestion(question.id)}
                        className="mt-1 text-gray-400 hover:text-gray-600"
                      >
                        {question.isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                      </button>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">{question.question}</h3>
                        <p className="text-sm text-gray-600">
                          From <span className="text-blue-600">{question.author}</span>
                        </p>
                        {question.isExpanded && question.answer && (
                          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                            <p className="text-gray-700 whitespace-pre-line">{question.answer}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    {!question.isExpanded && (
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                        Give answer
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Question

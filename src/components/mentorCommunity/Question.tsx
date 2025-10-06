import { useState } from "react"
import { ChevronRight, ChevronDown, Send } from "lucide-react"
import Pagination from "../reusable/Pagination"

interface QuestionItem {
  id: string
  question: string
  author: string
  answer?: string
  isExpanded?: boolean
  showAnswerInput?: boolean
}

const Question = () => {
  const [questions, setQuestions] = useState<QuestionItem[]>([
    {
      id: "1",
      question: "Q.Best mnemonics for remembering cranial nerves?",
      author: "Ema Harison",
      isExpanded: false,
      showAnswerInput: false,
    },
    {
      id: "2",
      question: "Q.Best mnemonics for remembering cranial nerves?",
      author: "Ema Harison",
      isExpanded: false,
      showAnswerInput: false,
    },
    {
      id: "3",
      question: "Q.Best mnemonics for remembering cranial nerves?",
      author: "Ema Harison",
      answer:
        "Answer: But I still feel like I'm missing something fundamental. Can anyone recommend resources that really helped them master ECG interpretation? I'm particularly struggling with:\n- Identifying different types of blocks\n- ST segment interpretation\n- Complex arrhythmias",
      isExpanded: true,
      showAnswerInput: false,
    },
    {
      id: "4",
      question: "Q.Best mnemonics for remembering cranial nerves?",
      author: "Ema Harison",
      answer:
        "Answer: But I still feel like I'm missing something fundamental. Can anyone recommend resources that really helped them master ECG interpretation? I'm particularly struggling with:\n- Identifying different types of blocks\n- ST segment interpretation\n- Complex arrhythmias",
      isExpanded: true,
      showAnswerInput: false,
    },
  ])

  const [answerTexts, setAnswerTexts] = useState<{ [key: string]: string }>({})

  const toggleQuestion = (id: string) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, isExpanded: !q.isExpanded } : q)))
  }

  const toggleAnswerInput = (id: string) => {
    setQuestions(questions.map((q) => 
      q.id === id ? { ...q, showAnswerInput: !q.showAnswerInput } : q
    ))
  }

  const handleAnswerChange = (id: string, text: string) => {
    setAnswerTexts({ ...answerTexts, [id]: text })
  }

  const submitAnswer = (id: string) => {
    const answerText = answerTexts[id]
    if (answerText && answerText.trim()) {
      setQuestions(questions.map((q) => 
        q.id === id 
          ? { ...q, answer: answerText, showAnswerInput: false, isExpanded: true } 
          : q
      ))
      setAnswerTexts({ ...answerTexts, [id]: "" })
    }
  }
// Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [showAll, setShowAll] = useState(false);

  // Config
  const productsPerPage = 10;
  const totalProducts = questions.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  // Handle toggle show all
  const handleShowAll = () => setShowAll((prev) => !prev);

  // Get products for current page or all
  // const paginatedProducts = useMemo(() => {
  //     if (showAll) return products;
  //     const startIndex = (currentPage - 1) * productsPerPage;
  //     return products.slice(startIndex, startIndex + productsPerPage);
  // }, [products, currentPage, showAll]);

  // Showing range
  const start = showAll ? 1 : (currentPage - 1) * productsPerPage + 1;
  const end = showAll
    ? totalProducts
    : Math.min(currentPage * productsPerPage, totalProducts);
  return (
    <div className="w-full">
      <div className="mb-4 md:mb-8 space-y-2">
        <h4 className="text-[16px] md:text-[20px] font-semibold text-[#0F172A]">
          Asked Question
        </h4>
        <p className="text-[14px] md:text-[16px] text-gray-600">See who's asking, learning, and engaging.</p>
      </div>
      
      <div className="w-full">
        <div className="bg-white rounded-lg shadow-sm w-full">
          <div className="divide-y divide-gray-200 w-full">
            {questions.map((question) => (
              <div key={question.id} className="p-4 md:p-6 w-full">
                <div className="flex items-start justify-between gap-3 w-full">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <button
                      onClick={() => toggleQuestion(question.id)}
                      className="mt-1 text-gray-400 hover:text-gray-600 flex-shrink-0"
                    >
                      {question.isExpanded ? 
                        <ChevronDown className="w-4 h-4 md:w-5 md:h-5" /> : 
                        <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                      }
                    </button>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 text-sm md:text-base mb-1 break-words">
                        {question.question}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-600">
                        From <span className="text-blue-600">{question.author}</span>
                      </p>
                      
                      {question.isExpanded && question.answer && (
                        <div className="mt-3 md:mt-4 p-3 md:p-4 bg-gray-50 rounded-lg">
                          <p className="text-gray-700 whitespace-pre-line text-sm md:text-base">
                            {question.answer}
                          </p>
                        </div>
                      )}

                      {question.showAnswerInput && (
                        <div className="mt-3 md:mt-4">
                          <div className="bg-gray-50 rounded-lg p-3 md:p-4 border border-gray-200">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Give Answer
                            </label>
                            <textarea
                              value={answerTexts[question.id] || ""}
                              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                              placeholder="Write your answer here..."
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg  resize-none text-sm md:text-base"
                              rows={4}
                            />
                            <div className="flex gap-2 mt-3">
                              <button
                                onClick={() => submitAnswer(question.id)}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm cursor-pointer"
                              >
                                <Send className="w-4 h-4" />
                                Submit Answer
                              </button>
                              <button
                                onClick={() => toggleAnswerInput(question.id)}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm cursor-pointer"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {!question.isExpanded && !question.showAnswerInput && (
                    <div className="flex-shrink-0">
                      <button 
                        onClick={() => toggleAnswerInput(question.id)}
                        className="px-3 py-2 md:px-4 md:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs md:text-sm whitespace-nowrap cursor-pointer"
                      >
                        Give answer
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-16 mb-32 flex justify-center space-x-5 ">
        {!showAll && (
          <Pagination
            title={"All Products"}
            showText={`Showing ${start} to ${end} of ${totalProducts} Products`}
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onToggleShowAll={handleShowAll}
            showAll={showAll}
          />
        )}

        {/* Show All Toggle */}
        {/* {showAll && (
                    <div className="flex justify-center">
                        <button
                            onClick={handleShowAll}
                            className="px-6 py-2 bg-sunset-orange text-white rounded-lg"
                        >
                            Show Less
                        </button>
                    </div>
                )} */}
      </div>
    </div>
  )
}

export default Question;
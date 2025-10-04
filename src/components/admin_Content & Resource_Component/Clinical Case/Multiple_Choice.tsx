import React, { useState } from 'react';
import { Plus, ChevronDown, Trash2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface Option {
  id: number;
  optionText: string;
  supportingEvidence: string;
  refutingEvidence: string;
}

interface Question {
  id: number;
  questionText: string;
  options: Option[];
  correctAnswer: string;
  explanation: string;
}

interface MCQComponentProps {
  onQuestionsChange?: (questions: Question[]) => void;
}

const MCQComponent: React.FC<MCQComponentProps> = ({ onQuestionsChange }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState({
    questionText: '',
    options: [
      { id: 1, optionText: '', supportingEvidence: '', refutingEvidence: '' },
      { id: 2, optionText: '', supportingEvidence: '', refutingEvidence: '' },
      { id: 3, optionText: '', supportingEvidence: '', refutingEvidence: '' },
      { id: 4, optionText: '', supportingEvidence: '', refutingEvidence: '' }
    ],
    correctAnswer: '',
    explanation: ''
  });

  const handleOptionChange = (id: number, field: keyof Option, value: string) => {
    setCurrentQuestion(prev => ({
      ...prev,
      options: prev.options.map(opt => 
        opt.id === id ? { ...opt, [field]: value } : opt
      )
    }));
  };

  const handleAddQuestion = () => {
    if (!currentQuestion.questionText.trim()) {
      alert('Please enter a question text');
      return;
    }

    let updatedQuestions;

    if (editingId !== null) {
      // Update existing question
      updatedQuestions = questions.map(q => 
        q.id === editingId 
          ? { ...currentQuestion, id: editingId }
          : q
      );
      setEditingId(null);
      alert('Question updated successfully!');
    } else {
      // Add new question
      const newQuestion: Question = {
        id: Date.now(),
        ...currentQuestion
      };
      updatedQuestions = [...questions, newQuestion];
      alert('Question added successfully!');
    }

    setQuestions(updatedQuestions);
    
    if (onQuestionsChange) {
      onQuestionsChange(updatedQuestions);
    }

    // Reset form
    setCurrentQuestion({
      questionText: '',
      options: [
        { id: 1, optionText: '', supportingEvidence: '', refutingEvidence: '' },
        { id: 2, optionText: '', supportingEvidence: '', refutingEvidence: '' },
        { id: 3, optionText: '', supportingEvidence: '', refutingEvidence: '' },
        { id: 4, optionText: '', supportingEvidence: '', refutingEvidence: '' }
      ],
      correctAnswer: '',
      explanation: ''
    });
  };

  const handleEditQuestion = (question: Question) => {
    setEditingId(question.id);
    setCurrentQuestion({
      questionText: question.questionText,
      options: question.options,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation
    });
    // Scroll to form
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setCurrentQuestion({
      questionText: '',
      options: [
        { id: 1, optionText: '', supportingEvidence: '', refutingEvidence: '' },
        { id: 2, optionText: '', supportingEvidence: '', refutingEvidence: '' },
        { id: 3, optionText: '', supportingEvidence: '', refutingEvidence: '' },
        { id: 4, optionText: '', supportingEvidence: '', refutingEvidence: '' }
      ],
      correctAnswer: '',
      explanation: ''
    });
  };

  const handleRemoveQuestion = (id: number) => {
    if (editingId === id) {
      handleCancelEdit();
    }
    const updatedQuestions = questions.filter(q => q.id !== id);
    setQuestions(updatedQuestions);
    if (onQuestionsChange) {
      onQuestionsChange(updatedQuestions);
    }
  };

  return (
    <div className="space-y-6">
      {/* Added Questions List */}
      {questions.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200">
          <h3 className="text-base font-semibold text-gray-900 mb-4">
            Added Questions ({questions.length})
          </h3>
          <div className="space-y-4">
            {questions.map((q, index) => (
              <div 
                key={q.id} 
                className={`p-4 border rounded-lg ${
                  editingId === q.id 
                    ? 'bg-blue-50 border-blue-300' 
                    : 'bg-green-50 border-green-200'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 mb-2">
                      Question {index + 1}: {q.questionText}
                    </p>
                    <p className="text-xs text-gray-600">
                      Correct Answer: Option {q.correctAnswer || 'Not set'}
                    </p>
                    {editingId === q.id && (
                      <p className="text-xs text-blue-600 mt-1 font-medium">
                        Currently editing this question
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditQuestion(q)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-md transition-colors"
                      disabled={editingId === q.id}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleRemoveQuestion(q.id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-md transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Question Form */}
      <div className="bg-white">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-1">
              Add Multiple Choice Questions
            </h2>
            <p className="text-xs text-gray-500">
              Create questions based on this case
            </p>
          </div>
          <button
            onClick={handleAddQuestion}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            {editingId !== null ? 'Update Question' : 'Add Question'}
          </button>
        </div>

        {editingId !== null && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <div className="flex justify-between items-center">
              <p className="text-sm text-blue-900">
                You are editing a question. Make your changes and click "Update Question".
              </p>
              <button
                onClick={handleCancelEdit}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Cancel Edit
              </button>
            </div>
          </div>
        )}

        {/* Question Text */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Question Text
          </label>
          <Textarea
            value={currentQuestion.questionText}
            onChange={(e) => setCurrentQuestion(prev => ({ ...prev, questionText: e.target.value }))}
            placeholder="Enter your question here"
            className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        {/* Answer Options */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Answer Option
          </label>
          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <div 
                key={option.id} 
                className="p-4 rounded-md border border-slate-300 bg-[rgba(239,246,255,0.6)]"
              >
                <div className="flex items-start gap-3">
                  {/* Letter Badge */}
                  <div className="flex-shrink-0 w-8 h-8 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center text-sm font-semibold text-gray-700">
                    {String.fromCharCode(65 + index)}
                  </div>

                  {/* Option Inputs */}
                  <div className="flex-1 space-y-3">
                    <input
                      type="text"
                      value={option.optionText}
                      onChange={(e) => handleOptionChange(option.id, 'optionText', e.target.value)}
                      placeholder={`Enter option ${String.fromCharCode(65 + index)}`}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Textarea
                        value={option.supportingEvidence}
                        onChange={(e) => handleOptionChange(option.id, 'supportingEvidence', e.target.value)}
                        placeholder="Supporting evidence"
                        className="px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                      />
                      <Textarea
                        value={option.refutingEvidence}
                        onChange={(e) => handleOptionChange(option.id, 'refutingEvidence', e.target.value)}
                        placeholder="Refuting evidence"
                        className="px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Correct Answer & Explanation */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Correct Answer & Explanation
          </label>
          <div className="relative mb-3">
            <select
              value={currentQuestion.correctAnswer}
              onChange={(e) => setCurrentQuestion(prev => ({ ...prev, correctAnswer: e.target.value }))}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm appearance-none bg-white pr-10"
            >
              <option value="">Select correct answer</option>
              <option value="A">Option A</option>
              <option value="B">Option B</option>
              <option value="C">Option C</option>
              <option value="D">Option D</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          <textarea
            value={currentQuestion.explanation}
            onChange={(e) => setCurrentQuestion(prev => ({ ...prev, explanation: e.target.value }))}
            placeholder="Explain..."
            rows={5}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
          />
        </div>
      </div>
    </div>
  );
};

// Demo Component
const Multiple_Choice = () => {
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);

  const handleQuestionsChange = (questions: Question[]) => {
    setAllQuestions(questions);
    console.log('All Questions:', questions);
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto">
        <MCQComponent onQuestionsChange={handleQuestionsChange} />
        
        {allQuestions.length > 0 && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm font-medium text-blue-900">
              Total Questions Created: {allQuestions.length}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Multiple_Choice;
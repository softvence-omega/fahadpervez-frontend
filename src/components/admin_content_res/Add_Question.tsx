import React, { useState } from 'react';
import { Upload, ChevronDown } from 'lucide-react';

const AddQuestion: React.FC = () => {
  const [subject, setSubject] = useState('Cardiology');
  const [system, setSystem] = useState('Cardiology');
  const [topic, setTopic] = useState('Cardiology');
  const [difficultyLabel, setDifficultyLabel] = useState('Medium');
  const [questionType, setQuestionType] = useState('Multiple Choice');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('Option A');
  const [explanation, setExplanation] = useState('');
  const [isDifficultyOpen, setIsDifficultyOpen] = useState(false);
  const [isCorrectAnswerOpen, setIsCorrectAnswerOpen] = useState(false);

  const difficulties = ['Easy', 'Medium', 'Hard'];
  const answerOptions = ['Option A', 'Option B', 'Option C', 'Option D'];

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSave = () => {
    console.log({
      subject,
      system,
      topic,
      difficultyLabel,
      questionType,
      question,
      options,
      correctAnswer,
      explanation
    });
    alert('Question Saved!');
  };

  const handleSaveAndAddAnother = () => {
    handleSave();
    // Reset form
    setQuestion('');
    setOptions(['', '', '', '']);
    setExplanation('');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Add Question</h1>
            <p className="text-sm text-gray-600 mt-1">Basic concept in cardiovascular medicine</p>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition">
            <Upload className="w-4 h-4" />
            Bulk Upload
          </button>
        </div>

        <div className="space-y-6 mt-8">
          {/* Subject Field */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* System Field */}
          <div>
            <label htmlFor="system" className="block text-sm font-medium text-gray-700 mb-2">
              System
            </label>
            <input
              id="system"
              type="text"
              value={system}
              onChange={(e) => setSystem(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* Topic Field */}
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
              Topic
            </label>
            <input
              id="topic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* Difficulty Label Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Difficulty Label
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDifficultyOpen(!isDifficultyOpen)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white text-left flex items-center justify-between"
              >
                <span className="text-gray-900">{difficultyLabel}</span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isDifficultyOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDifficultyOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                  {difficulties.map((diff) => (
                    <button
                      key={diff}
                      type="button"
                      onClick={() => {
                        setDifficultyLabel(diff);
                        setIsDifficultyOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left hover:bg-gray-100 transition ${
                        difficultyLabel === diff ? 'bg-blue-50 text-blue-600' : 'text-gray-900'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Select Question Type */}
          <div>
            <label htmlFor="questionType" className="block text-sm font-medium text-gray-700 mb-2">
              Select Question Type
            </label>
            <input
              id="questionType"
              type="text"
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* Question Field */}
          <div>
            <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
              Question
            </label>
            <textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={4}
              placeholder="Question Text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
            />
          </div>

          {/* Answer Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Answer Option
            </label>
            <div className="space-y-3">
              {options.map((option, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600 text-sm font-medium flex-shrink-0">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Enter option ${String.fromCharCode(65 + index)}`}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Correct Answer Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Correct Answer
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCorrectAnswerOpen(!isCorrectAnswerOpen)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white text-left flex items-center justify-between"
              >
                <span className="text-gray-900">{correctAnswer}</span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isCorrectAnswerOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isCorrectAnswerOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                  {answerOptions.map((ans) => (
                    <button
                      key={ans}
                      type="button"
                      onClick={() => {
                        setCorrectAnswer(ans);
                        setIsCorrectAnswerOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left hover:bg-gray-100 transition ${
                        correctAnswer === ans ? 'bg-blue-50 text-blue-600' : 'text-gray-900'
                      }`}
                    >
                      {ans}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Explanation Field */}
          <div>
            <label htmlFor="explanation" className="block text-sm font-medium text-gray-700 mb-2">
              Explanation
            </label>
            <textarea
              id="explanation"
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              rows={4}
              placeholder="Explain"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save Question
          </button>
          <button
            onClick={handleSaveAndAddAnother}
            className="px-6 py-2.5 text-gray-700 font-medium rounded-md hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
          >
            Save & Add Another
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;
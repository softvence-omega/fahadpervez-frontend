import React from "react";

const Upload_Content_Header: React.FC = () => {
  return (
    <div className="bg-gray-50 px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <header>
        <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
          Content & Resource Management
        </h1>
        <p className="mt-1 text-sm sm:text-base text-gray-600">
          Manage MCQ banks, flashcards, quizzes, and educational resources.
        </p>
      </header>
    </div>
  );
};

export default Upload_Content_Header;

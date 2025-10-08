import React from "react";
import DashboardTopSection from "../reuseable/DashboardTopSection";

const Upload_Content_Header: React.FC = () => {
  return (
    <div className="">
      {/* Page Header */}
      <header>
        <DashboardTopSection
          title="Content & Resource Management"
          description="Manage MCQ banks, flashcards, quizzes, and educational resources."
        />
      </header>
    </div>
  );
};

export default Upload_Content_Header;

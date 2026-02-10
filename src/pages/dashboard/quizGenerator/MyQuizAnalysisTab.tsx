import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Stats, Recommendations } from "@/components/quizOverview/type";
import StatsRow from "@/components/quizOverview/StatsRow";
import CircularProgress from "@/components/quizOverview/CircularProgress";
import ResultsSummary from "@/components/quizOverview/ResultsSummary";
import StudyRecommendations from "@/components/quizOverview/StudyRecommendations";
import { useGetGeneratedMCQQuery } from "@/store/features/MCQBank/MCQBank.api";
import { ArrowLeft, Sparkles } from "lucide-react";
import DashboardHeading from "@/components/reusable/DashboardHeading";

const MyQuizAnalysisTab: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const justSubmitted = location.state?.justSubmitted;
  const { data: response, isLoading, isFetching, refetch } = useGetGeneratedMCQQuery(id || "");
  const quizData = response?.data;
  const [isAILoading, setIsAILoading] = useState(!!location.state?.isGeneratingRecommendation);

  // Stop loading if we have content OR if we finished a fetch and gpt might have returned nothing
  useEffect(() => {
    if (!isFetching && response) {
      const recommendations = quizData?.tracking?.recommendedContent as Recommendations;
      if (recommendations && (
        recommendations.post_quiz_recommendations ||
        recommendations.flashcards ||
        recommendations.clinical_case ||
        recommendations.notes
      )) {
        setIsAILoading(false);
      }
    }
  }, [isFetching, response, quizData]);

  // If still loading AI, refetch every 3 seconds to check for updates
  useEffect(() => {
    let interval: any;
    if (isAILoading) {
      interval = setInterval(() => {
        refetch();
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isAILoading, refetch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!quizData) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">No quiz analysis found.</p>
      </div>
    );
  }

  const { tracking, title } = quizData;

  const stats: Stats = {
    completed: `${tracking?.totalAttemptCount ?? 0}`,
    correct: `${tracking?.correctMcqCount ?? 0}`,
    wrong: `${tracking?.wrongMcqCount ?? 0}`,
    totalTime: tracking?.timeTaken || "0",
  };

  const correctPercentage = tracking?.correctPercentage ?? 0;
  const wrongPercentage = tracking?.wrongPercentage ?? 0;

  return (
    <div className="">
      <div className="py-6">
        <div className="w-full space-y-6">
          {/* <div className="flex justify-between items-center">
            <h3 className="text-gray-800 font-medium font-inter text-xl">
              Performance Analysis
            </h3>
          </div> */}
          <div className="flex items-start gap-1">
            <Link to="/dashboard/quiz-page" className="sm:mb-0">
              <ArrowLeft className="mt-0.5" />
            </Link>

            <DashboardHeading
              title="Performance Analysis"
              titleSize="text-xl"
              titleColor="text-[#0A0A0A]"
              description="Analyze quiz performance, track user progress from detailed results"
              descColor="text-[#4A5565]"
              descFont="text-sm"
              className="mb-5"
            />
          </div>

          {isAILoading && (
            <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl animate-pulse">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-blue-900">AI is crafting your study plan</p>
                <p className="text-xs text-blue-700">Analyzing your weak areas to generate personalized recommendations...</p>
              </div>
            </div>
          )}

          <StatsRow stats={stats} />

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-8 text-[#1A1C1E] font-inter">
                {title}
              </h2>

              <div className="mb-10">
                <CircularProgress
                  correctPercentage={correctPercentage}
                  incorrectPercentage={wrongPercentage}
                  label="Session Performance"
                />
              </div>

              <ResultsSummary
                completed={tracking?.totalAttemptCount ?? 0}
                total={tracking?.totalMcqCount ?? 0}
                correct={tracking?.correctMcqCount ?? 0}
                incorrect={tracking?.wrongMcqCount ?? 0}
                quizId={id}
                justSubmitted={justSubmitted}
              />
            </div>

            <StudyRecommendations
              isLoading={isAILoading}
              recommendations={tracking?.recommendedContent || {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyQuizAnalysisTab;

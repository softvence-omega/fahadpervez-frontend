/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation, useParams } from "react-router-dom";
import { Stats } from "@/components/quizOverview/type";
import StatsRow from "@/components/quizOverview/StatsRow";
import CircularProgress from "@/components/quizOverview/CircularProgress";
import ResultsSummary from "@/components/quizOverview/ResultsSummary";
import StudyRecommendations from "@/components/quizOverview/StudyRecommendations";
import { useGetGeneratedMCQQuery } from "@/store/features/MCQBank/MCQBank.api";

const MyQuizAnalysisTab: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const justSubmitted = location.state?.justSubmitted;
  const { data: response, isLoading } = useGetGeneratedMCQQuery(id || "");
  const quizData = response?.data;

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
    <div className="min-h-screen">
      <div className="py-6">
        <div className="w-full space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-gray-800 font-medium font-inter text-xl">
              Performance Analysis
            </h3>
          </div>

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
              recommendations={
                tracking?.recommendedContent &&
                tracking?.recommendedContent?.length > 0
                  ? {
                      articles: tracking?.recommendedContent
                        ?.filter((c: any) => c?.type === "article")
                        ?.map((c: any) => c?.title),
                      flashcards: tracking?.recommendedContent
                        ?.filter((c: any) => c?.type === "flashcard")
                        ?.map((c: any) => c?.title),
                      clinicalCases: tracking?.recommendedContent
                        ?.filter((c: any) => c?.type === "case")
                        ?.map((c: any) => c?.title),
                    }
                  : { articles: [], flashcards: [], clinicalCases: [] }
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyQuizAnalysisTab;

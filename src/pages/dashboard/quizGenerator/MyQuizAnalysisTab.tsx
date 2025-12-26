import { useState, useEffect } from "react";
// import { Progress } from "@/components/ui/progress";
import { Session, Stats } from "@/components/quizOverview/type";
import StatsRow from "@/components/quizOverview/StatsRow";
import CircularProgress from "@/components/quizOverview/CircularProgress";
import ResultsSummary from "@/components/quizOverview/ResultsSummary";
import StudyRecommendations from "@/components/quizOverview/StudyRecommendations";
import { useLocation } from "react-router-dom";

const initialSessionsData: Session[] = [];

const overviewStats: Stats = {
  completed: "0",
  correct: "0",
  totalTime: "00:00",
  wrong: "0",
};

const MyQuizAnalysisTab: React.FC = () => {
  const location = useLocation();
  const [, setSessions] = useState<Session[]>(initialSessionsData);
  const [selectedSession, setSelectedSession] = useState<Session>(
    initialSessionsData[0]
  );
  const [stats, setStats] = useState<Stats>(overviewStats);

  useEffect(() => {
    if (location.state?.quizId) {
      const {
        quizId,
        correctCount,
        incorrectCount,
        totalQuestions,
        timeSpent,
        // rawTimeSpent,
      } = location.state;

      const newSession: Session = {
        id: Date.now(),
        name: `Session for Quiz ${quizId}`,
        source: "AI",
        result: `${correctCount}/${totalQuestions}`,
        progress: Math.round((correctCount / totalQuestions) * 100) || 0,
        details: {
          completed: totalQuestions,
          total: totalQuestions,
          correct: correctCount,
          incorrect: incorrectCount,
          recommendations: {
            articles: ["High-yield Neurology core", "Migraine pathogenesis"],
            flashcards: ["Triptans MoA", "Stroke initial management"],
            clinicalCases: ["Acute Case 1"],
          },
        },
      };

      setSessions((prev) => {
        const updatedSessions = [newSession, ...prev];

        // Calculate aggregate stats across all sessions
        const totalCompleted = updatedSessions.length;
        const totalCorrect = updatedSessions.reduce(
          (acc, s) => acc + (s.details?.correct || 0),
          0
        );
        const totalIncorrect = updatedSessions.reduce(
          (acc, s) => acc + (s.details?.incorrect || 0),
          0
        );

        setStats({
          completed: `${totalCompleted}`,
          correct: `${totalCorrect}`,
          wrong: `${totalIncorrect}`,
          totalTime: timeSpent, // Showing time from latest session as per request or aggregate if available
        });

        return updatedSessions;
      });

      setSelectedSession(newSession);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen">
      <div>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Left Side: Sessions List (Optional, can be re-enabled if needed) */}

          {/* Right Side: Session Details */}
          <div className="w-full md:w-full space-y-6 mx-auto">
            <h3 className="text-gray-800 font-medium mb-4">
              Sessions Analysis
            </h3>
            <StatsRow stats={stats} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedSession?.details && (
                <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                  <h2 className="text-xl font-bold mb-8 text-[#1A1C1E]">
                    {selectedSession?.name}
                  </h2>

                  <div className="mb-10">
                    <CircularProgress
                      correctPercentage={
                        ((selectedSession?.details?.correct || 0) /
                          (selectedSession?.details?.total || 1)) *
                        100
                      }
                      incorrectPercentage={
                        ((selectedSession?.details?.incorrect || 0) /
                          (selectedSession?.details?.total || 1)) *
                        100
                      }
                      label="Session Performance"
                    />
                  </div>

                  <ResultsSummary
                    completed={selectedSession?.details?.completed}
                    total={selectedSession?.details?.total}
                    correct={selectedSession?.details?.correct}
                    incorrect={selectedSession?.details?.incorrect}
                    quizId={location.state?.quizId || "3"}
                  />
                </div>
              )}

              {selectedSession?.details && (
                <StudyRecommendations
                  recommendations={selectedSession?.details?.recommendations}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyQuizAnalysisTab;

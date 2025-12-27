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
  const [sessions, setSessions] = useState<Session[]>(initialSessionsData);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [stats, setStats] = useState<Stats>(overviewStats);

  useEffect(() => {
    if (location.state?.quizId) {
      const {
        quizId,
        correctCount,
        incorrectCount,
        answeredCount,
        totalQuestions,
        rawTimeSpent,
      } = location.state;

      const newSession: Session = {
        id: Date.now(),
        name: `Session for Quiz ${quizId}`,
        source: "AI",
        result: `${correctCount}/${totalQuestions}`,
        progress: Math.round((correctCount / totalQuestions) * 100) || 0,
        details: {
          completed: answeredCount,
          total: totalQuestions,
          correct: correctCount,
          incorrect: incorrectCount,
          rawTimeSpent: rawTimeSpent || 0,
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
        const totalAttended = updatedSessions.reduce(
          (acc, s) => acc + (s.details?.completed || 0),
          0
        );
        const totalCorrect = updatedSessions.reduce(
          (acc, s) => acc + (s.details?.correct || 0),
          0
        );
        const totalIncorrect = updatedSessions.reduce(
          (acc, s) => acc + (s.details?.incorrect || 0),
          0
        );
        const totalTimeSpentSeconds = updatedSessions.reduce(
          (acc, s) => acc + (s.details?.rawTimeSpent || 0),
          0
        );

        // Format total time
        const formatTotalTime = (seconds: number): string => {
          const hours = Math.floor(seconds / 3600);
          const mins = Math.floor((seconds % 3600) / 60);
          const secs = seconds % 60;
          if (hours > 0) {
            return `${hours}:${mins.toString().padStart(2, "0")}:${secs
              .toString()
              .padStart(2, "0")}`;
          }
          return `${mins.toString().padStart(2, "0")}:${secs
            .toString()
            .padStart(2, "0")}`;
        };

        setStats({
          completed: `${totalAttended}`,
          correct: `${totalCorrect}`,
          wrong: `${totalIncorrect}`,
          totalTime: formatTotalTime(totalTimeSpentSeconds),
        });

        return updatedSessions;
      });

      setSelectedSession(newSession);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen">
      <div className="py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Side: Sessions List */}
          {sessions.length > 0 && (
            <div className="w-full md:w-1/4 space-y-4">
              <h3 className="text-gray-800 font-medium mb-4">Past Sessions</h3>
              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    onClick={() => setSelectedSession(session)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedSession?.id === session.id
                        ? "bg-blue-50 border-blue-200 shadow-sm"
                        : "bg-white border-gray-100 hover:border-blue-100"
                    }`}
                  >
                    <p className="font-medium text-sm text-gray-800 truncate">
                      {session.name}
                    </p>
                    <div className="flex justify-between mt-2 text-xs text-gray-500">
                      <span>Result: {session.result}</span>
                      <span>Source: {session.source}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Right Side: Session Details */}
          <div
            className={
              sessions.length > 0
                ? "w-full md:w-3/4 space-y-6"
                : "w-full space-y-6"
            }
          >
            <div className="flex justify-between items-center">
              <h3 className="text-gray-800 font-medium">
                Performance Analysis
              </h3>
              {sessions.length === 0 && (
                <p className="text-sm text-gray-500 italic">
                  No sessions completed yet. Take a quiz to see your analysis!
                </p>
              )}
            </div>

            <StatsRow stats={stats} />

            <div
              className={`grid grid-cols-1 ${
                sessions.length > 0 ? "lg:grid-cols-2" : "md:grid-cols-2"
              } gap-6`}
            >
              {selectedSession?.details ? (
                <>
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
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

                  <StudyRecommendations
                    recommendations={selectedSession?.details?.recommendations}
                  />
                </>
              ) : (
                sessions.length > 0 && (
                  <div className="col-span-full py-20 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    <p className="text-gray-500">
                      Select a session from the list to view detailed analytics.
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyQuizAnalysisTab;

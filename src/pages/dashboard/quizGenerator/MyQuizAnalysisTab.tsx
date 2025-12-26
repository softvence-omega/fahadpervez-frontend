import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Session, Stats } from "@/components/quizOverview/type";
import StatsRow from "@/components/quizOverview/StatsRow";
import CircularProgress from "@/components/quizOverview/CircularProgress";
import ResultsSummary from "@/components/quizOverview/ResultsSummary";
import StudyRecommendations from "@/components/quizOverview/StudyRecommendations";
import { useLocation } from "react-router-dom";

const initialSessionsData: Session[] = [
  {
    id: 1,
    name: "Custom session from Aug 1, 11AM",
    source: "AI",
    result: "7/10",
    progress: 70,
    details: {
      completed: 5,
      total: 5,
      correct: 2,
      incorrect: 3,
      recommendations: {
        articles: [
          "Chronic obstructive pulmonary",
          "Acute leukemia",
          "Nephrotic syndrome",
          "Tick-borne diseases",
          "Retinal detachment",
        ],
        flashcards: ["Flashcard topic 1", "Flashcard topic 2"],
        clinicalCases: ["Case 1", "Case 2"],
      },
    },
  },
  {
    id: 2,
    name: "Custom session from Aug 1, 12PM",
    source: "Question Bank",
    result: "8/10",
    progress: 80,
  },
];

const overviewStats: Stats = {
  completed: "2/5",
  correct: "40%",
  timePerQuestion: "00m 23s",
  totalTime: "0h 01m",
};

const MyQuizAnalysisTab: React.FC = () => {
  const location = useLocation();
  const [sessions, setSessions] = useState<Session[]>(initialSessionsData);
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
        rawTimeSpent,
      } = location.state;

      const newSession: Session = {
        id: Date.now(),
        name: `Session for Quiz ${quizId}`,
        source: "AI",
        result: `${correctCount}/${totalQuestions}`,
        progress: Math.round((correctCount / totalQuestions) * 100) || 100,
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

      setSessions((prev) => [newSession, ...prev]);
      setSelectedSession(newSession);

      // Update overview stats
      setStats({
        completed: `${sessions.length + 1} sessions`,
        correct: `${Math.round((correctCount / totalQuestions) * 100)}%`,
        timePerQuestion: `${Math.round(rawTimeSpent / totalQuestions)}s`,
        totalTime: timeSpent,
      });
    }
  }, [location.state]);

  return (
    <div className="min-h-screen">
      <div>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Left Side: Sessions List */}
          <div className="w-full md:w-1/4 space-y-4 mt-4">
            <div className="">
              <h3 className="text-lg text-gray-800 font-medium mb-2">
                All sessions
              </h3>
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className={`p-4 rounded-lg shadow cursor-pointer transition-all ${
                    selectedSession.id === session.id
                      ? " bg-blue-50 border-blue-200 border"
                      : "bg-white border-transparent border"
                  }`}
                  onClick={() => setSelectedSession(session)}
                >
                  <p className="font-semibold text-[#1A1C1E]">
                    Quiz: {session.name}
                  </p>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Source: {session.source}</span>
                    <span>Result: {session.result}</span>
                  </div>
                  <Progress
                    value={session.progress}
                    className="mt-2 [&>div]:bg-blue-500 h-1.5"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Session Details */}
          <div className="w-full md:w-3/4 space-y-6">
            <h3 className="text-gray-800 font-medium mb-4">
              Sessions Analysis
            </h3>
            <StatsRow stats={stats} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedSession.details && (
                <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                  <h2 className="text-xl font-bold mb-6 text-[#1A1C1E]">
                    {selectedSession.name}
                  </h2>
                  <CircularProgress
                    percentage={selectedSession.progress || 40}
                  />
                  <ResultsSummary
                    completed={selectedSession.details.completed}
                    total={selectedSession.details.total}
                    correct={selectedSession.details.correct}
                    incorrect={selectedSession.details.incorrect}
                    quizId={location.state?.quizId || "3"}
                  />
                </div>
              )}

              {selectedSession.details && (
                <StudyRecommendations
                  recommendations={selectedSession.details.recommendations}
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

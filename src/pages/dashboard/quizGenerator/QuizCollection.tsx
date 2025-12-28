import { useGetAllGeneratedMCQQuery } from "@/store/features/MCQBank/MCQBank.api";
import QuizCard from "./QuizCard";
import GlobalLoader from "@/common/GlobalLoader";

export default function QuizCollection() {
  const { data: quizzesResponse, isLoading } = useGetAllGeneratedMCQQuery({});

  const quizzes = quizzesResponse?.data || quizzesResponse || [];

  if (isLoading) return <GlobalLoader />;

  return (
    <div className="md:my-6">
      <div className="mt-12">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-medium text-lg text-zinc-800">All Quiz's</h3>
        </div>

        {quizzes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
            {quizzes.map((quiz: any) => (
              <QuizCard
                key={quiz.id || quiz._id}
                id={quiz.id || quiz._id}
                title={quiz.title || quiz.session || "Generated Quiz"}
                questionCount={
                  quiz.questions?.length ||
                  quiz.mcqs?.length ||
                  quiz.questionCount
                }
                sourceFile={quiz.sourceFile || quiz.fileName}
                isCompleted={
                  quiz.isCompleted ||
                  (quiz.tracking && quiz.tracking.totalAttemptCount > 0)
                }
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-dashed border-slate-300 rounded-xl">
            <p className="text-slate-500">
              No quizzes found. Generate one to get started!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

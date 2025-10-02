import MentorOverviewCard from "@/components/reusable/MentorOverviewCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BookOpenText,
  MessageCircle,
  NotepadText,
  Users,
  Video,
} from "lucide-react";
import TotalEarningsChart from "./TotalEarningsChart";
import { useState } from "react";
import { Link } from "react-router-dom";
import MentorQuestionBankCard from "./MentorQuestionBankCard";
import MentorSessionCard from "./MentorSessionCard";
import MentorAnswerAndSolutionCard from "./MentorAnswerAndSolutionCard";

const MentorDashboard = () => {
  const [category, setCategory] = useState<string>("");

  return (
    <div>
      <h2 className="text-2xl text-[#111827] font-semibold mb-6">Overview</h2>
      <div className="flex items-center gap-7">
        <MentorOverviewCard
          icon={BookOpenText}
          iconColor="text-blue-700"
          iconBg="bg-blue-100"
          value="02"
          bottomText="Question Bank"
        />
        <MentorOverviewCard
          icon={NotepadText}
          iconColor="text-fuchsia-700"
          iconBg="bg-fuchsia-100"
          value="247"
          bottomText="Total Question"
        />
        <MentorOverviewCard
          icon={Users}
          iconColor="text-violet-700"
          iconBg="bg-violet-50"
          value="20"
          bottomText="Total Students"
        />
        <MentorOverviewCard
          icon={Video}
          iconColor="text-green-700"
          iconBg="bg-green-100"
          value="04"
          bottomText="Live Classes"
        />
      </div>

      <div>
        <div className="flex items-center justify-between my-5">
          <p className="text-2xl text-[#111827] font-semibold">
            Total Earnings
          </p>
          <div className="grid gap-2">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category" className="w-full bg-blue-main">
                <SelectValue placeholder="Select Time" />
              </SelectTrigger>
              <SelectContent className="">
                <SelectItem value="basic">Day</SelectItem>
                <SelectItem value="clinical">Month</SelectItem>
                <SelectItem value="advanced">Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-7 mb-12">
          <TotalEarningsChart />
        </div>
      </div>

      {/* Question Bank */}
      <div className="mt-16">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-2xl text-[#111827] font-semibold">
              Question bank
            </p>
          </div>
          <div>
            <Link to={""}>
              <p className="text-lg font-medium text-[#0076F5] underline">
                View All
              </p>
            </Link>
          </div>
        </div>

        <div>
          {Array(2)
            .fill(null)
            .map(() => (
              <MentorQuestionBankCard />
            ))}
        </div>
      </div>

      {/* Schedule Classes */}
      <div className="mt-16">
        <div className="flex items-center justify-between mb-7">
          <div>
            <p className="text-2xl text-[#111827] font-semibold">
              Schedule Classes
            </p>
          </div>
          <div>
            <Link to={"/mentor/recent-transaction"}>
              <p className="text-lg font-medium text-[#0076F5] underline">
                View All
              </p>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {Array(2)
            .fill(null)
            .map(() => (
              <MentorSessionCard />
            ))}
        </div>
      </div>

      {/* Answers & Solutions */}
      <div className="mt-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-start gap-3">
            <MessageCircle />
            <div>
              <p className="text-lg font-medium">Answers & Solutions</p>
              <p className="text-lg font-medium">
                Share your knowledge and help fellow students
              </p>
            </div>
          </div>
          <div>
            <Link to={"/mentor/recent-transaction"}>
              <p className="text-lg font-medium text-[#0076F5] underline">
                View All
              </p>
            </Link>
          </div>
        </div>

        <MentorAnswerAndSolutionCard />
      </div>
    </div>
  );
};

export default MentorDashboard;

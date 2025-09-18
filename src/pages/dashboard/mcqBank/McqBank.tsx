import { BreadcrumbItem } from "@/components/dashboard/gamified-learning/types";
import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
import mcqBankImg from "@/assets/dashboard/MCQ Bank img.png"
import DashboardHeading from "@/components/reusable/DashboardHeading";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import { Link } from "react-router-dom";
import { Clock10, Cog, FileText, Plus, Target } from "lucide-react";
import TestOverviewCard from "@/components/reusable/TestOverviewCard";



const resources = [
  {
    id: 1,
    title: "Anatomy Essentials MCQs",
    questions: "100 Question",
    tags: ["Anatomy", "Anatomy"],
    uploader: "DR. Root Silva",
  },
  {
    id: 2,
    title: "Physiology Quick Review",
    questions: "80 Question",
    tags: ["Physiology", "Medical"],
    uploader: "Prof. Jane Doe",
  },
  {
    id: 3,
    title: "Pathology Exam Prep",
    questions: "120 Question",
    tags: ["Pathology"],
    uploader: "Dr. Khan",
  },
];



const McqBank = () => {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "MCQ Bank", link: "/dashboard/mcq-bank" },
  ];

  return (
    <div className="my-6 md:my-10">
      <Breadcrumb breadcrumbs={breadcrumbs} />

      <div className="md:flex items-center gap-8 border border-slate-300 rounded-[8px] py-6 px-10">
        <img src={mcqBankImg} alt="" className="mx-auto" />
        <div>
          <h3 className="text-xl text-slate-800 font-semibold mb-3">Create a Quiz From Question Bank Session</h3>
          <p className="text-slate-600">Create a session based on an exam, clinical subject, Article, organ system, symptom, difficulty level or the number of times you have already seen specific questions in previous Qbank sessions.</p>
        </div>
      </div>

      <div className="md:flex justify-between items-center">
        <DashboardHeading
          title="MCQ Bank"
          titleSize="text-xl"
          titleColor="text-[#0A0A0A]"
          description="AI-powered adaptive questioning system"
          descColor="text-[#4A5565]"
          descFont="text-sm"
          className="mt-12 mb-8"
        />
        <Link to={"/dashboard/quiz-generator"}>
          <PrimaryButton
            icon={<Plus />}
            bgType="solid"
            iconPosition="left"
            bgColor="bg-blue-btn-1"
            className="h-10 mb-4 hover:bg-blue-btn-1 hover:opacity-80 cursor-pointer">
            Create Quiz
          </PrimaryButton>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <TestOverviewCard
          icon={Target}
          iconColor="text-blue-700"
          iconBg="bg-blue-100"
          topText="2,847"
          bottomText="Total Questions"
        />
        <TestOverviewCard
          icon={Target}
          iconColor="text-green-700"
          iconBg="bg-[#DCFCE7]"
          topText="82%"
          bottomText="Accuracy Rate"
        />
        <TestOverviewCard
          icon={Clock10}
          iconColor="text-yellow-600"
          iconBg="bg-[#FFEDD4]"
          topText="45"
          bottomText="Minutes Today"
        />
        <TestOverviewCard
          icon={Cog}
          iconColor="text-purple-700"
          iconBg="bg-[#F3E8FF]"
          topText="04"
          bottomText="Session Created"
        />
      </div>

      <div className="md:flex justify-between items-end">
        <DashboardHeading
          title="Straight from the Expert"
          titleSize="text-xl"
          titleColor="text-[#0A0A0A]"
          description="10,000+ exam-style questions with detailed explanations"
          descColor="text-[#4A5565]"
          descFont="text-sm"
          className="mt-12 mb-8"
        />
        {/* <Link to={"/dashboard/view-more"}> */}
        <button className="cursor-pointer text-blue-main underline font-medium">View More</button>
        {/* </Link> */}
      </div>

      <div className="space-y-6 my-6">
        {resources.map((item) => (
          <div
            key={item.id}
            className="border border-slate-300 rounded-lg py-4 px-5"
          >
            <Link to={"/dashboard/practice-mcq"}>
              <div className="sm:flex items-center gap-10">
                {/* Icon */}
                <div className="sm:border-r-2 border-r-slate-300 pr-4">
                  <FileText className="w-12 h-12 mx-auto text-slate-600" />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h4 className="text-lg text-slate-900 font-medium">
                    {item.title}
                  </h4>
                  <div className="flex flex-wrap items-center gap-4">
                    <p className="text-slate-600">{item.questions}</p>
                    <div className="flex flex-wrap items-center gap-2">
                      {item.tags.map((tag, idx) => (
                        <p
                          key={idx}
                          className="border border-slate-300 rounded-full px-2"
                        >
                          {tag}
                        </p>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-slate-700">
                    Uploaded By: {item.uploader}
                  </p>
                </div>
              </div></Link>
          </div>
        ))}
      </div>

    </div>
  )
}

export default McqBank
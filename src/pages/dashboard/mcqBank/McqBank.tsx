/* eslint-disable @typescript-eslint/no-explicit-any */
import { BreadcrumbItem } from "@/components/dashboard/gamified-learning/types";
import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
// import mcqBankImg from "@/assets/dashboard/MCQ Bank img.png";
import DashboardHeading from "@/components/reusable/DashboardHeading";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import {
  Clock10,
  Cog,
  FileText,
  Filter,
  Plus,
  Search,
  Target,
} from "lucide-react";
import TestOverviewCard from "@/components/reusable/TestOverviewCard";
import { useGllMCQBankQuery } from "@/store/features/MCQBank/MCQBank.api";
import GlobalLoader from "@/common/GlobalLoader";
import { TMCQBank } from "@/types";
import { QuizGeneratorDialog } from "../quizGenerator/QuizGenerateModal";
import { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "@/common/custom/Pagination";
import McqBankFilterModal from "./McqBankFilterModal";

const McqBank = () => {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "MCQ Bank", link: "/dashboard/mcq-bank" },
  ];

  // const [files, setFiles] = useState<File[]>([]);
  // const [note, setNote] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    subject: "",
    system: "",
    topic: "",
  });

  const { data, isFetching } = useGllMCQBankQuery({
    searchTerm: searchTerm || undefined,
    subject: filters.subject || undefined,
    system: filters.system || undefined,
    topic: filters.topic || undefined,
    page,
    limit: 10,
  });
  const MCQBank = data?.data;
  const meta = data?.meta;
  const totalPages = meta?.totalPages || 1;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleApplyFilter = (filterData: {
    subject: string;
    system: string;
    topic: string;
  }) => {
    setFilters(filterData);
    setPage(1); // Reset to first page when filters change
    setIsFilterOpen(false);
  };

  return (
    <div className="my-6 md:my-10 px-2">
      <Breadcrumb breadcrumbs={breadcrumbs} />

      {/* <div className="md:flex items-center gap-8 border border-slate-300 rounded-[8px] py-6 px-10">
        <img src={mcqBankImg} alt="" className="mx-auto" />
        <div>
          <h3 className="text-xl text-slate-800 font-semibold mb-3">
            Create a Quiz From Question Bank Session
          </h3>
          <p className="text-slate-600">
            Create a session based on an exam, clinical subject, Article, organ
            system, symptom, difficulty level or the number of times you have
            already seen specific questions in previous Qbank sessions.
          </p>
        </div>
      </div> */}

      <div className="md:flex justify-between items-center">
        <DashboardHeading
          title="MCQ Bank"
          titleSize="text-xl"
          titleColor="text-[#0A0A0A]"
          description="AI-powered adaptive questioning system"
          descColor="text-[#4A5565]"
          descFont="text-sm"
          className="mb-8"
        />
        {/* <Link to={"/dashboard/quiz-generator"}> */}
        <PrimaryButton
          icon={<Plus />}
          bgType="solid"
          iconPosition="left"
          bgColor="bg-blue-btn-1"
          className="h-10 mb-4 hover:bg-blue-btn-1 hover:opacity-80 cursor-pointer"
          onClick={() => setOpenModal(true)}
        >
          Create Quiz
        </PrimaryButton>
        {/* </Link> */}
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

      {/* <div className="md:flex justify-between items-end">
        <DashboardHeading
          title="Straight from the Expert"
          titleSize="text-xl"
          titleColor="text-[#0A0A0A]"
          description="10,000+ exam-style questions with detailed explanations"
          descColor="text-[#4A5565]"
          descFont="text-sm"
          className="mt-12 mb-8"
        /> */}
      {/* <Link to={"/dashboard/view-more"}> */}
      {/* <button className="cursor-pointer text-blue-main underline font-medium">
          View More
        </button> */}
      {/* </Link> */}
      {/* </div> */}

      <div className="flex items-center justify-between my-8">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by condition or keyword"
              className="w-full md:w-[450px] h-12 pl-10 pr-4 border border-slate-300 rounded"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1); // reset page
              }}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
          </div>
          <p>{meta?.total || 0} MCQ Banks found</p>
        </div>
        <button
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700"
        >
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {isFetching ? (
        <GlobalLoader />
      ) : (
        <>
          <div className="space-y-6 my-6 grid grid-cols-1 md:grid-cols-2 items-start gap-6">
            {MCQBank?.length > 0 ? (
              MCQBank?.map((mcq: TMCQBank) => (
                <div
                  key={mcq?._id}
                  className="border border-slate-300 rounded-lg py-4 px-5"
                >
                  <div className="flex items-end justify-between">
                    <div className="sm:flex items-center gap-10">
                      {/* Icon */}
                      <div className="sm:border-r-2 border-r-slate-300 pr-4">
                        <FileText className="w-12 h-12 mx-auto text-slate-600" />
                      </div>

                      {/* Content */}
                      <div className="space-y-2">
                        <Link to={`/dashboard/practice-mcq/${mcq?._id}`}>
                          <h4 className="text-lg text-slate-900 font-medium hover:underline hover:text-blue-600 transition duration-75">
                            {mcq?.title}
                          </h4>
                        </Link>

                        <div className="flex flex-wrap items-center gap-4">
                          <p className="text-slate-600">{mcq?.totalMcq} MCQs</p>
                          <div className="flex flex-wrap items-center gap-2">
                            {/* {mcq.tags.map((tag, idx) => ( */}
                            <p
                              // key={idx}
                              className="border border-slate-300 rounded-full px-2"
                            >
                              {mcq?.subject}
                            </p>
                            {/* ))} */}
                          </div>
                        </div>
                        {/* <p className="text-sm text-slate-700 mt-2">
                          Uploaded By: {mcq.uploadedBy}
                        </p> */}
                      </div>
                    </div>
                    <Link to={`/dashboard/practice-mcq/${mcq?._id}`}>
                      <button className="text-blue-main font-medium hover:underline cursor-pointer">
                        Open
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">
                No MCQ Banks found.
              </p>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination
                totalPages={totalPages}
                currentPage={page}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}

      {/* Modals */}
      <QuizGeneratorDialog open={openModal} setOpen={setOpenModal} />
      {isFilterOpen && (
        <McqBankFilterModal
          close={() => setIsFilterOpen(false)}
          onApply={handleApplyFilter}
        />
      )}
    </div>
  );
};

export default McqBank;

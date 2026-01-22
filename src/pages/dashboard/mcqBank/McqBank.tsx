/* eslint-disable @typescript-eslint/no-explicit-any */
import { BreadcrumbItem } from "@/components/dashboard/gamified-learning/types";
import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
// import mcqBankImg from "@/assets/dashboard/MCQ Bank img.png";
import DashboardHeading from "@/components/reusable/DashboardHeading";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import {
  FileText,
  Filter,
  Plus,
  Search,
} from "lucide-react";
// import TestOverviewCard from "@/components/reusable/TestOverviewCard";
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
    <div className="my-3 px-2">
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

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <DashboardHeading
          title="MCQ Bank"
          titleSize="text-xl"
          titleColor="text-[#0A0A0A]"
          description="AI-powered adaptive questioning system"
          descColor="text-[#4A5565]"
          descFont="text-sm"
          className="mb-0"
        />
        <PrimaryButton
          icon={<Plus />}
          bgType="solid"
          iconPosition="left"
          bgColor="bg-blue-btn-1"
          className="h-10 hover:bg-blue-btn-1 hover:opacity-80 cursor-pointer w-full sm:w-auto"
          onClick={() => setOpenModal(true)}
        >
          Create Quiz
        </PrimaryButton>
      </div>

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
      </div> */}

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

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mt-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4 w-full lg:w-auto">
          <div className="relative w-full md:w-[450px]">
            <input
              type="text"
              placeholder="Search by condition or keyword"
              className="w-full h-12 pl-10 pr-4 border border-slate-300 rounded shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1); // reset page
              }}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
          </div>
          <p className="text-sm text-slate-600 whitespace-nowrap">{meta?.total || 0} MCQ Banks found</p>
        </div>
        <button
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-2 h-12 rounded cursor-pointer hover:bg-blue-700 transition-colors w-full lg:w-auto font-medium"
        >
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {isFetching ? (
        <GlobalLoader />
      ) : (
        <>
          <div className="my-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 items-stretch">
            {MCQBank?.length > 0 ? (
              MCQBank?.map((mcq: TMCQBank) => (
                <div
                  key={mcq?._id}
                  className="border border-slate-300 rounded-lg p-5 flex flex-col h-full hover:shadow-md transition-shadow bg-white"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 h-full">
                    <div className="flex items-start sm:items-center gap-4">
                      {/* Icon */}
                      <div className="hidden sm:block border-r-2 border-r-slate-200 pr-4">
                        <FileText className="w-10 h-10 text-slate-500" />
                      </div>

                      {/* Content */}
                      <div className="space-y-2 flex-1">
                        <Link to={`/dashboard/practice-mcq/${mcq?._id}`}>
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="text-lg text-slate-900 font-semibold hover:underline hover:text-blue-600 transition duration-150 break-words">
                              {mcq?.title}
                            </h4>
                            {mcq?.isComplete && (
                              <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-green-200 uppercase tracking-wider">
                                Completed
                              </span>
                            )}
                          </div>
                        </Link>

                        <div className="flex flex-wrap items-center gap-3 text-sm">
                          <p className="text-slate-500 font-medium">{mcq?.totalMcq} MCQs</p>
                          <span className="hidden sm:inline w-1 h-1 bg-slate-300 rounded-full"></span>
                          <p className="border border-slate-200 bg-slate-50 text-slate-600 rounded-full px-3 py-0.5 text-xs font-medium">
                            {mcq?.subject}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Link to={`/dashboard/practice-mcq/${mcq?._id}`} className="sm:ml-auto">
                      <button className="text-blue-600 font-bold hover:text-blue-700 hover:underline cursor-pointer transition-colors whitespace-nowrap">
                        Open Bank
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center">
                 <p className="text-slate-500 font-medium">No MCQ Banks found matching your criteria.</p>
              </div>
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

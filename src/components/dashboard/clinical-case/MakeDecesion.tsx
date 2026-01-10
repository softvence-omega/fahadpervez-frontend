// import { Button } from "@/components/ui/button";
// import { FilePlus2 } from "lucide-react";
import ClinicalCaseFlow from "./ClinicalCaseFlow";
import { useParams, useSearchParams } from "react-router-dom";
import {
  useGetSingleClinicalCaseQuery,
  useGetSingleGeneratedClinicalCaseQuery,
} from "@/store/features/clinicalCase/clinicalCase.api";
import GlobalLoader from "@/common/GlobalLoader";
import { ClinicalCaseData } from "@/types/clinicalCase";
// import { ClinicalCaseData } from "@/types/clinicalCase.types";

const MakeDecision = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const caseType = searchParams.get("type"); // "generated" or null/undefined
  const isGenerated = caseType === "generated";

  // Standard Query
  const {
    data: standardData,
    isLoading: isLoadingStandard,
    error: errorStandard,
  } = useGetSingleClinicalCaseQuery(id as string, { skip: isGenerated });

  // Generated Query
  const {
    data: generatedData,
    isLoading: isLoadingGenerated,
    error: errorGenerated,
  } = useGetSingleGeneratedClinicalCaseQuery(id as string, {
    skip: !isGenerated,
  });

  const isLoading = isGenerated ? isLoadingGenerated : isLoadingStandard;
  const error = isGenerated ? errorGenerated : errorStandard;
  const clinicalCase = (
    isGenerated ? generatedData?.data : standardData?.data
  ) as ClinicalCaseData;

  if (isLoading) {
    return <GlobalLoader />;
  }

  if (error || !clinicalCase) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Error loading clinical case
      </div>
    );
  }

  return (
    <div>
      <div className="border border-slate-300 rounded-2xl p-6 mt-10 bg-white">
        <div className="md:flex items-center justify-between gap-3">
          <div className="flex items-center gap-4 mb-4">
            {clinicalCase?.subject && (
              <p className="bg-slate-200 text-slate-900 px-[10px] py-[2px] rounded-full">
                {clinicalCase?.subject}
              </p>
            )}
            {clinicalCase?.difficultyLevel && (
              <p className="border border-slate-200 text-slate-950 px-[10px] py-[2px] rounded-full">
                {clinicalCase?.difficultyLevel}
              </p>
            )}
          </div>
          {/* <Link to={`/dashboard/clinical-case/${id}${isGenerated ? "?type=generated" : ""}`}>
            <Button className="px-3 h-10 border border-indigo-500 bg-white text-indigo-500 hover:bg-indigo-50">
              <FilePlus2 />
              Review Case Details
            </Button>
          </Link> */}
        </div>
        <h2 className="text-3xl font-semibold mt-5">
          {clinicalCase?.caseTitle}
        </h2>
      </div>

      <ClinicalCaseFlow clinicalCase={clinicalCase} />
    </div>
  );
};

export default MakeDecision;

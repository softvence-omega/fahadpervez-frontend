import { Button } from "@/components/ui/button";
import { FilePlus2 } from "lucide-react";
import ClinicalCaseFlow from "./ClinicalCaseFlow";
import { mockCase } from "@/data/case";

const MakeDecesion = () => {
  return (
    <div>
      <div className="border border-slate-300 rounded-2xl p-6 mt-10 bg-white">
        <div className="md:flex items-center justify-between gap-3">
          <div className="flex items-center gap-4 mb-4">
            <p className="bg-slate-200 text-slate-900 px-[10px] py-[2px] rounded-full">
              Cardiology
            </p>
            <p className="border border-slate-200 text-slate-950 px-[10px] py-[2px] rounded-full">
              Cardiology
            </p>
          </div>
          <Button
            // variant={"outline"}
            className="px-3 h-10 border border-indigo-500 bg-white text-indigo-500"
          >
            <FilePlus2 />
            Review Case Details
          </Button>
        </div>
        <h2 className="text-3xl font-semibold mt-5">
          Case: Acute Abdominal Pain in a Young Female
        </h2>
      </div>

      <ClinicalCaseFlow clinicalCase={mockCase} />
    </div>
  );
};

export default MakeDecesion;

import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
import { BreadcrumbItem } from "../gamified-learning/types";
import { useState } from "react";
import { Play, Target } from "lucide-react";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import { Link } from "react-router-dom";

const breadcrumbs: BreadcrumbItem[] = [
  { name: "Dashboard", link: "/dashboard" },
  { name: "OSCE Station", link: "/dashboard/osce" },
];

export default function OSCETutorial() {
  const [sessionNotes, setSessionNotes] = useState("");

  return (
    <div className="my-6">
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-slate-700">
          OSCE: Cardiovascular Examination (CVS)
        </h2>
        <p className="font-medium text-gray-500">
          Watch the complete CVS examination from introduction to final summary.
        </p>
      </div>

      <div className="mt-9 grid grid-cols-5 gap-4">
        <div className="col-span-3">
          <div className="w-full">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/E263tXzw0Gw?si=9axPuamUeDVo1ap6"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full h-[500px]"
            ></iframe>

            <p className="text-sm font-medium mt-7 mb-2">Session Note</p>
            <textarea
              value={sessionNotes}
              onChange={(e) => setSessionNotes(e.target.value)}
              className="w-full p-2 border rounded"
              rows={4}
              aria-label="Notes"
              placeholder="Write Your Note here.."
            />
          </div>
        </div>

        <div className="space-y-11 col-span-2">
          {/* Candidate Instructions */}
          <div>
            <h3 className="font-medium text-lg mb-2">Candidate Instructions</h3>
            <div className="bg-white px-5 py-7 rounded-lg shadow">
              <ul className="list-disc pl-5 space-y-2">
                <li className="text-sm text-[#111827]">
                  You are a medical student working in the emergency department
                </li>
                <li className="text-sm text-[#111827]">
                  A 34-year-old woman has presented for assessment
                </li>
                <li className="text-sm text-[#111827]">
                  Her presenting complaint is abdominal pain
                </li>
                <li className="text-sm text-[#111827]">
                  Please take a history
                </li>
                <li className="text-sm text-[#111827]">
                  At the end of the station, the examiner may ask you some
                  further questions
                </li>
              </ul>
            </div>
          </div>

          {/* Quick Access */}
          <div>
            <h3 className="font-semibold text-[#111827] text-xl mb-6">
              Quick Access
            </h3>
            <div className="bg-white px-4 py-7 rounded-lg shadow">
              <Link to={"/dashboard/practice-with-checklist/3"}>
                <PrimaryButton
                  icon={<Target className="w-4 h-4" />}
                  iconPosition="left"
                  className="w-full py-4 bg-blue-800 text-white hover:bg-blue-main cursor-pointer"
                >
                  Practice with Checklist
                </PrimaryButton>
              </Link>
            </div>
          </div>

          {/* Suggested Video Tutorials */}
          <div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-[#111827] font-semibold text-lg mb-2">
                Suggested Video Tutorials
              </h3>

              <div className="space-y-3">
                {Array(3)
                  .fill(null)
                  .map(() => (
                    <div className="flex items-center gap-3 bg-[#F9FAFB] p-4 rounded-[8px]">
                      <div className="bg-[#2563EB] rounded-[8px] p-3">
                        <Play className="text-white" />
                      </div>
                      <div>
                        <p className="text-[#111827] font-medium">
                          Palpation of Apex Beat
                        </p>
                        <p className="text-[#4B5563] text-sm">3:45 mins</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

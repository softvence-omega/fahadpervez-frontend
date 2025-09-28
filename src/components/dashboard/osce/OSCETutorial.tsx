import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
import { BreadcrumbItem } from "../gamified-learning/types";
import { Textarea } from "@/components/ui/textarea";

const breadcrumbs: BreadcrumbItem[] = [
  { name: "Dashboard", link: "/dashboard" },
  { name: "OSCE Station", link: "/dashboard/osce" },
];

export default function OSCETutorial() {
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

      <div className="mt-9 grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <div>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/E263tXzw0Gw?si=9axPuamUeDVo1ap6"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>

            <p className="text-sm font-medium mt-7 mb-2">Session Note</p>
            <Textarea />
          </div>
        </div>
        <div>
          {/* Candidate Instructions */}
          <div>
            <h3 className="font-medium text-lg mb-2">Candidate Instructions</h3>
            <div className="bg-white px-4 py-7 rounded-lg shadow">
              <ul className="list-disc pl-5 space-y-2">
                {/* {pageData.candidateInstructions.map((inst, idx) => ( */}
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
                    At the end of the station, the examiner may ask you some further questions
                  </li>
                {/* ))} */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { GoArrowBoth } from "react-icons/go";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { FC } from "react";
import { LuEye } from "react-icons/lu";
import Pagination from "@/common/custom/Pagination";
import { Feedback } from "./data";
import RenderStars from "@/common/custom/RenderStars";

const tableHeaders = [
  { label: "Mentorship", align: "text-center" },
  { label: "Rating", align: "text-center" },
  { label: "Comments", align: "text-left" },
  { label: "Date", align: "text-center" },
  { label: "Action", align: "text-center" },
];
interface FeedbackTableProps {
  feedback: Feedback[];
}

const FeedbackTable: FC<FeedbackTableProps> = ({ feedback }) => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className=" text-lg font-geist text-[#2C2C2C] font-medium">
            {tableHeaders.map((header) => (
              <TableHead
                key={header.label}
                className={`border border-border ${header.align} px-4`}
              >
                {header.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {feedback.map((p) => (
            <TableRow
              key={p.id}
              className="hover:bg-gray-50 text-[#2C2C2C] font-inter text-sm font-normal"
            >
              <TableCell className="border border-border ">
                <div className="flex items-center gap-1 justify-center">
                  {p.mentorship.firstName}
                  <div className="">
                    <GoArrowBoth />
                  </div>
                  {p.mentorship.lastName}
                </div>
              </TableCell>
              <TableCell className="border border-border ">
                <div className="flex items-center gap-1 justify-center">
                  {p.rating} <RenderStars rating={p.rating} />
                </div>
              </TableCell>
              <TableCell className="border border-border ">
                <div>{p.comments}</div>
              </TableCell>
              <TableCell className="border border-border text-center">
                <div>{p.date}</div>
              </TableCell>

              <TableCell className="border border-border text-center">
                <span className="text-[#1D4ED8] cursor-pointer flex justify-center">
                  <LuEye size={24} />
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="my-10">
        <Pagination currentPage={2} totalPages={5} onPageChange={() => {}} />
      </div>
    </div>
  );
};

export default FeedbackTable;

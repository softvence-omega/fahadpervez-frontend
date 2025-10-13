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
  { label: "Comments", align: "text-left hidden xl:table-cell" },
  { label: "Date", align: "text-center lg:table-cell hidden" },
  { label: "Action", align: "text-center" },
];

const tableDesign = {
  header:
    "text-lg font-geist text-[#2C2C2C] font-medium bg-[#EFF6FF] hover:bg-[#EFF6FF] md:h-12",
  cellHeader: "border border-border px-4 ",
  bodyRow: "text-[#2C2C2C] font-inter text-sm font-normal md:h-12",
  cell: "border border-border px-4 text-center",
};
interface FeedbackTableProps {
  feedback: Feedback[];
}

const FeedbackTable: FC<FeedbackTableProps> = ({ feedback }) => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className={tableDesign.header}>
            {tableHeaders.map((header) => (
              <TableHead
                key={header.label}
                className={`${tableDesign.cellHeader} ${header.align} `}
              >
                {header.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {feedback.map((p) => (
            <TableRow key={p.id} className={tableDesign.bodyRow}>
              <TableCell className={`${tableDesign.cell}`}>
                <div className="flex items-center gap-1 justify-center">
                  {p.mentorship.firstName}
                  <div className="">
                    <GoArrowBoth />
                  </div>
                  {p.mentorship.lastName}
                </div>
              </TableCell>
              <TableCell className={`${tableDesign.cell}`}>
                <div className="flex items-center gap-1 justify-center">
                  {p.rating}
                  <div className=" hidden md:flex">
                    <RenderStars rating={p.rating} />
                  </div>
                </div>
              </TableCell>
              <TableCell
                className={`hidden xl:table-cell !text-left ${tableDesign.cell}`}
              >
                <div>{p.comments}</div>
              </TableCell>
              <TableCell className={`hidden lg:table-cell ${tableDesign.cell}`}>
                <div>{p.date}</div>
              </TableCell>

              <TableCell className={`${tableDesign.cell}`}>
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

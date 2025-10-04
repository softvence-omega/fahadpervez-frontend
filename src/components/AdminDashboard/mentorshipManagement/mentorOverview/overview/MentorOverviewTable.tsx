import { BiSolidEdit } from "react-icons/bi";

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
import { OverviewTable } from "./data";

const tableHeaders = [
  { label: "Mentor", align: "text-left" },
  { label: "Students", align: "text-left" },
  { label: "Total Session", align: "text-center" },
  { label: "Total Revenue", align: "text-center" },
  { label: "Next Session", align: "text-center" },
  { label: "Action", align: "text-center" },
];
interface MentorOverviewTable {
  overview: OverviewTable[];
}

const MentorOverviewTable: FC<MentorOverviewTable> = ({ overview }) => {
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
          {overview.map((p) => (
            <TableRow
              key={p.id}
              className="hover:bg-gray-50 text-[#2C2C2C] font-inter text-sm font-normal"
            >
              <TableCell className="border border-border ">
                <div>{p.mentorName}</div>
              </TableCell>
              <TableCell className="border border-border ">
                <div>{p.studentNames}</div>
              </TableCell>
              <TableCell className="border border-border text-center">
                <div>{p.totalSessions}</div>
              </TableCell>
              <TableCell className="border border-border text-center">
                <div>{p.totalRevenue}</div>
              </TableCell>
              <TableCell className="border border-border text-center">
                <div>{p.nextSession}</div>
              </TableCell>
              <TableCell className="border border-border">
                <div className="flex justify-center gap-3  ">
                  <span className="text-[#1D4ED8] cursor-pointer">
                    <LuEye size={24} />
                  </span>
                  <span className="text-[#B91C1C] cursor-pointer">
                    <BiSolidEdit size={24} />
                  </span>
                </div>
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

export default MentorOverviewTable;

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
  { label: "Mentor", align: "text-center  " },
  { label: "Students", align: "text-left xl:table-cell hidden" },
  { label: "Total Session", align: "text-center" },
  { label: "Total Revenue", align: "text-center lg:table-cell hidden" },
  { label: "Next Session", align: "text-center lg:table-cell hidden" },
  { label: "Action", align: "text-center" },
];
interface MentorOverviewTable {
  overview: OverviewTable[];
}

const tableDesign = {
  header:
    "text-lg font-geist text-[#2C2C2C] font-medium bg-[#EFF6FF] hover:bg-[#EFF6FF] md:h-12",
  cellHeader: "border border-border px-4 ",
  bodyRow: "text-[#2C2C2C] font-inter text-sm font-normal md:h-12",
  cell: "border border-border px-4 text-center",
};

const MentorOverviewTable: FC<MentorOverviewTable> = ({ overview }) => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className={tableDesign.header}>
            {tableHeaders.map((header) => (
              <TableHead
                key={header.label}
                className={`${tableDesign.cellHeader} ${header.align}`}
              >
                {header.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {overview.map((p) => (
            <TableRow key={p.id} className={tableDesign.bodyRow}>
              <TableCell className={`${tableDesign.cell}`}>
                <div>{p.mentorName}</div>
              </TableCell>
              <TableCell
                className={`!text-left hidden xl:!table-cell ${tableDesign.cell}`}
              >
                <div>{p.studentNames}</div>
              </TableCell>
              <TableCell className={` ${tableDesign.cell}`}>
                <div>{p.totalSessions}</div>
              </TableCell>
              <TableCell className={`hidden lg:table-cell ${tableDesign.cell}`}>
                <div>{p.totalRevenue}</div>
              </TableCell>
              <TableCell className={`hidden lg:table-cell ${tableDesign.cell}`}>
                <div>{p.nextSession}</div>
              </TableCell>
              <TableCell className={`${tableDesign.cell}`}>
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

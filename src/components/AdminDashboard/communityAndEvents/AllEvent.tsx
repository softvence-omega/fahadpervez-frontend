import { type FC } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { BiSolidEdit } from "react-icons/bi";
import { HiOutlineVideoCamera } from "react-icons/hi";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export interface AllEventData {
  id: number;
  event: {
    eventName: string;
    doctorName: string;
  };
  type: string | "Seminar" | "Workshop";
  registration: number;
  price: string;
  date: string;
}
interface PlanSubscriptionTableProps {
  events: AllEventData[];
  onDelete?: (event: AllEventData) => void;
}
const tableHeaders = [
  { label: "Event", align: "text-left" },
  { label: "Type & Format", align: "text-center xl:table-cell hidden" },
  { label: "Registrations", align: "text-center lg:table-cell hidden" },
  { label: "Price", align: "text-center md:table-cell hidden" },
  { label: "Date & Time", align: "text-center lg:table-cell hidden" },
  { label: "Action", align: "text-center" },
];

const tableDesign = {
  header:
    "text-lg font-geist text-[#2C2C2C] font-medium bg-[#EFF6FF] hover:bg-[#EFF6FF] md:h-12",
  cellHeader: "border border-border px-4 ",
  bodyRow: "text-[#2C2C2C] font-inter text-sm font-normal md:h-12",
  cell: "border border-border px-4 text-center",
};
const AllEvent: FC<PlanSubscriptionTableProps> = ({ events, onDelete }) => {
  return (
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
        {events.map((p) => (
          <TableRow key={p.id} className={tableDesign.bodyRow}>
            <TableCell className={`${tableDesign.cell}`}>
              <div>{p.event.eventName}</div>
              <div>by {p.event.doctorName}</div>
            </TableCell>
            <TableCell className={`hidden xl:table-cell ${tableDesign.cell}`}>
              <div className="flex gap-1 justify-center">
                {p.type}, online
                <span>
                  <HiOutlineVideoCamera size={24} />
                </span>
              </div>
            </TableCell>
            <TableCell className={`lg:table-cell  hidden ${tableDesign.cell}`}>
              <div>{p.registration}</div>
            </TableCell>
            <TableCell className={`hidden md:table-cell ${tableDesign.cell}`}>
              <div>{p.price}</div>
            </TableCell>
            <TableCell className={`hidden lg:table-cell ${tableDesign.cell}`}>
              <div>{p.date}</div>
            </TableCell>
            <TableCell className={`${tableDesign.cell}`}>
              <div className="flex justify-center gap-3 text-[#B91C1C] ">
                <span className="text-blue-500 cursor-pointer">
                  <BiSolidEdit size={24} />
                </span>
                <button
                  className="hover:text-red-800 cursor-pointer"
                  onClick={() => onDelete?.(p)}
                >
                  <RiDeleteBinLine size={24} />
                </button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AllEvent;

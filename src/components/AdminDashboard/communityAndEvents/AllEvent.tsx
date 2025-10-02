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
  { label: "Type & Format", align: "text-center" },
  { label: "Registrations", align: "text-center" },
  { label: "Date & Time", align: "text-center" },
  { label: "Price", align: "text-center" },
  { label: "Action", align: "text-center" },
];

const AllEvent: FC<PlanSubscriptionTableProps> = ({ events, onDelete }) => {
  return (
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
        {events.map((p) => (
          <TableRow
            key={p.id}
            className="hover:bg-gray-50 text-[#2C2C2C] font-inter text-sm font-normal"
          >
            <TableCell className="border border-border px-4">
              <div>{p.event.eventName}</div>
              <div>by {p.event.doctorName}</div>
            </TableCell>
            <TableCell className="border border-border text-center">
              <div className="flex gap-1 justify-center">
                {p.type}, online
                <span>
                  <HiOutlineVideoCamera size={24} />
                </span>
              </div>
            </TableCell>
            <TableCell className="border border-border text-center">
              <div>{p.registration}</div>
            </TableCell>
            <TableCell className="border border-border text-center">
              <div>{p.price}</div>
            </TableCell>
            <TableCell className="border border-border text-center">
              <div>{p.date}</div>
            </TableCell>
            <TableCell className="border border-border">
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

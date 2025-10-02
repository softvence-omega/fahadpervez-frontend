import { type FC } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { BiSolidEdit } from "react-icons/bi";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export interface SubscriptionData {
  id: number;
  user: string;
  plan: "Standard" | "Elite";
  status: "Active" | "Deactive";
  nextBilling: string; // date
  revenue: string;
}

interface PlanSubscriptionTableProps {
  subscription: SubscriptionData[];
  onDelete?: (provider: SubscriptionData) => void;
}
const tableHeaders = [
  { label: "User", align: "text-left" },
  { label: "Plan", align: "text-center" },
  { label: "Next Billing", align: "text-center" },
  { label: "Revenue", align: "text-center" },
  { label: "Status", align: "text-center" },
  { label: "Action", align: "text-center" },
];

const PlanSubscriptionTable: FC<PlanSubscriptionTableProps> = ({
  subscription,
  onDelete,
}) => {
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
        {subscription.map((p) => (
          <TableRow
            key={p.id}
            className="hover:bg-gray-50 text-[#2C2C2C] font-inter text-sm font-normal"
          >
            <TableCell className="border border-border px-4">
              <div>{p.user}</div>
            </TableCell>
            <TableCell className="border border-border text-center">
              <div>{p.plan}</div>
            </TableCell>
            <TableCell className="border border-border text-center">
              <div>{p.status}</div>
            </TableCell>
            <TableCell className="border border-border text-center">
              <div>{p.nextBilling}</div>
            </TableCell>
            <TableCell className="border border-border text-center">
              <div>{p.revenue}</div>
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

export default PlanSubscriptionTable;

import demo from "@/assets/signUp/Upload Photo.png";
import ButtonWithLoading from "@/common/button/ButtonWithLoading";
import CommonSelect from "@/common/custom/CommonSelect";
import { useUpdateReportForAdminMutation } from "@/store/features/adminDashboard/support/support";
import {
  ReportItem,
  ReportStatus,
} from "@/store/features/adminDashboard/support/types/support";
import { useState } from "react";
import { FiSend } from "react-icons/fi";
import { z } from "zod";

export const inputClass = {
  input:
    "text-sm font-normal text-[#0F172A] font-inter leading-[20px] outline-none transition w-full px-4 py-3 border border-border rounded-md ",
  label:
    "text-sm font-normal text-[#18181B] font-inter leading-[20px] block mb-2",
  error: "text-red-500 text-sm mt-1",
};

// ZOD VALIDATION
const updateReportSchema = z.object({
  status: z.enum(["IN_REVIEW", "RESOLVED", "REJECTED"]),
  note: z.string().min(1, "Comment is required"),
});

const statusOptions = [
  { value: "IN_REVIEW", label: "IN_REVIEW" },
  { value: "RESOLVED", label: "RESOLVED" },
  { value: "REJECTED", label: "REJECTED" },
];

interface TicketDetailProps {
  ticket: ReportItem;
  selectedIndex: number;
}

const TicketDetail: React.FC<TicketDetailProps> = ({
  ticket,
  selectedIndex,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<ReportStatus>(
    (ticket.status as ReportStatus) || "IN_REVIEW"
  );
  const [comment, setComment] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [updateReport, { isLoading }] = useUpdateReportForAdminMutation();

  const handleSendMessage = async (note: string) => {
    // Validate using Zod
    const result = updateReportSchema.safeParse({
      status: selectedStatus,
      note,
    });

    if (!result.success) {
      setErrorMsg(result.error.issues[0].message);
      return;
    }

    setErrorMsg(null);

    const payload = {
      id: ticket._id,
      data: result.data,
    };

    await updateReport(payload);
  };

  return (
    <div className="flex h-full flex-col rounded-lg border border-border bg-card">
      <div className="">
        <div className="mb-2 flex items-start justify-between bg-[#EFF6FF] px-4 py-3">
          <h2 className="text-lg font-semibold text-foreground">
            Question Report: {ticket.report.mcqId}
          </h2>
          <span className="text-xs text-muted-foreground">
            #TKT: {selectedIndex + 1}
          </span>
        </div>

        <div className="flex flex-col gap-4 p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground">User</p>
              <p className="mt-1 text-sm text-foreground">{ticket.name}</p>
            </div>

            <div>
              <p className="text-xs font-medium text-muted-foreground">
                User Type
              </p>
              <p className="mt-1 text-sm text-foreground capitalize">Student</p>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-y-auto flex-1 m-4">
        <div className="flex items-baseline-last gap-2">
          <div className="w-full bg-black text-white rounded-lg p-4">
            <p className="text-xs font-medium">
              Question ID: {ticket.report.mcqId}
            </p>
            <p className="mt-2 whitespace-pre-wrap text-xs leading-relaxed">
              {ticket.report.text}
            </p>
          </div>

          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
            <img
              className="w-full h-full object-cover"
              src={ticket.profile_photo || demo}
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="w-40 m-4">
        <p className="text-xs font-medium text-muted-foreground mb-2">Status</p>

        {/* FIXED SELECT */}
        <CommonSelect
          item={statusOptions}
          onValueChange={(val) => setSelectedStatus(val as ReportStatus)}
          value={selectedStatus}
          className="!w-full"
          placeholder="change the status"
        />
      </div>

      <div className="p-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type message"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleSendMessage(comment);
            }}
            className={inputClass.input}
          />

          <button
            onClick={() => handleSendMessage(comment)}
            className="rounded-lg bg-foreground px-3 py-2 text-sm font-medium text-background hover:bg-foreground/90 transition-colors flex items-center gap-1 cursor-pointer"
          >
            {isLoading ? <ButtonWithLoading title="Sending..." /> : "Send"}
            <FiSend />
          </button>
        </div>

        {errorMsg && <p className="text-red-500 text-sm mt-2">{errorMsg}</p>}
      </div>
    </div>
  );
};

export default TicketDetail;

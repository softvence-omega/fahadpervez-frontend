/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronRight, CircleAlert, CircleCheck, Clock } from "lucide-react";

export default function TicketsList({
  tickets,
  selectedTicket,
  onSelectTicket,
}: any) {
  return (
    <div className="space-y-5 bg-white rounded-lg border border-gray-200 p-4 h-64 lg:h-full overflow-y-auto">
      {tickets.map((ticket: any) => (
        <button
          key={ticket.id}
          onClick={() => onSelectTicket(ticket)}
          className={`w-full text-left p-4 rounded-lg transition border border-slate-300 cursor-pointer ${
            selectedTicket?.id === ticket.id
              ? "bg-blue-50 border border-slate-400"
              : "hover:bg-gray-50 border"
          }`}
        >
          <div className="items-start justify-between gap-2">
            <div className="flex-1 flex items-center justify-between">
              <h3 className="font-normal text-foreground">
                {ticket.title}
              </h3>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span
                  className={`text-xs px-2 py-1 rounded ${ticket.statusColor}`}
                >
                  {ticket.status === "In Progress" ? (
                    <div className="flex items-center gap-1 ">
                      <CircleAlert width={16} />
                      {ticket.status}
                    </div>
                  ) : null}
                  {ticket.status === "Resolved" ? (
                    <div className="flex items-center gap-1 ">
                      <CircleCheck width={16} />
                      {ticket.status}
                    </div>
                  ) : null}
                </span>
                {/* <span
                  className={`text-xs px-2 py-1 rounded-full ${ticket.priorityColor}`}
                  >
                  {ticket.priority}
                  </span> */}
                {selectedTicket?.id === ticket.id && (
                  <ChevronRight className="w-5 h-5 text-primary flex-shrink-0" />
                )}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">{ticket.id}</p>
          </div>
          <p className="text-sm font-normal text-[#717182] my-5">{ticket.description}</p>
          <p className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
            <Clock className="w-4 h-4" />
            {ticket.createdAt}
          </p>
        </button>
      ))}
    </div>
  );
}

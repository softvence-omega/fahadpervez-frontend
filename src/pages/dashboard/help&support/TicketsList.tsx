"use client";

import { ChevronRight } from "lucide-react";

export default function TicketsList({
  tickets,
  selectedTicket,
  onSelectTicket,
}: any) {
  return (
    <div className="space-y-2 bg-white rounded-lg border border-border p-4 max-h-96 overflow-y-auto">
      {tickets.map((ticket: any) => (
        <button
          key={ticket.id}
          onClick={() => onSelectTicket(ticket)}
          className={`w-full text-left p-4 rounded-lg transition ${
            selectedTicket?.id === ticket.id
              ? "bg-blue-50 border border-primary"
              : "hover:bg-gray-50 border border-transparent"
          }`}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm text-foreground truncate">
                {ticket.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">{ticket.id}</p>
              <div className="flex gap-2 mt-2 flex-wrap">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${ticket.statusColor}`}
                >
                  {ticket.status}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${ticket.priorityColor}`}
                >
                  {ticket.priority}
                </span>
              </div>
            </div>
            {selectedTicket?.id === ticket.id && (
              <ChevronRight className="w-5 h-5 text-primary flex-shrink-0" />
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {ticket.createdAt}
          </p>
        </button>
      ))}
    </div>
  );
}

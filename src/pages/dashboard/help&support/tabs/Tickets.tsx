/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
// import { Plus } from "lucide-react";
import TicketsList from "../TicketsList";
import ChatWindow from "../ChatWindow";
import CreateTicketModal from "../CreateTicketModal";
import { mockTickets } from "../../../../data/mockData";
import { useGetSingleUserReportQuery } from "@/store/features/adminDashboard/ContentResources/MCQ/mcqApi";

export default function Tickets() {
  const [selectedTicket, setSelectedTicket] = useState(mockTickets[0]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [tickets, setTickets] = useState<any[]>([]);

  const { data: reportresponse } = useGetSingleUserReportQuery({});
  useEffect(() => {
    if (reportresponse?.data) {
      setTickets(reportresponse.data);
    }
  }, [reportresponse]);

  console.log(tickets)

  const handleCreateTicket = (formData: any) => {
    // Prepare data for API
    const data = new FormData();
    data.append("title", formData.title);
    data.append("issueType", formData.issueType);
    data.append("description", formData.description);
    if (formData.attachment) {
      data.append("attachment", formData.attachment);
    }

    // Here you would send to API:
    // fetch('/api/tickets/create', { method: 'POST', body: data })

    console.log("[v0] FormData ready for API:", {
      title: formData.title,
      issueType: formData.issueType,
      description: formData.description,
      hasAttachment: !!formData.attachment,
    });

    // Create mock ticket
    const newTicket = {
      id: `TKT-${Date.now()}`,
      title: formData.title,
      issueType: formData.issueType,
      description: formData.description,
      status: "Open",
      statusColor: "bg-yellow-100 text-yellow-800",
      priority: "Medium",
      priorityColor: "bg-yellow-100 text-yellow-800",
      createdAt: new Date().toLocaleDateString(),
      messages: [
        {
          sender: "user",
          text: formData.description,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ],
    };

    setTickets([newTicket, ...tickets]);
    setSelectedTicket(newTicket);
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-1">
            All Ticket
          </h2>
        </div>
        {/* <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm"
        >
          <Plus className="w-4 h-4" />
          Create Ticket
        </button> */}
      </div>

      {/* Main Content - List and Chat */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-96">
        {/* Tickets List - Left */}
        <div className="lg:col-span-1">
          <TicketsList
            tickets={tickets}
            selectedTicket={selectedTicket}
            onSelectTicket={setSelectedTicket}
          />
        </div>

        {/* Chat Window - Right */}
        <div className="">
          {selectedTicket ? (
            <ChatWindow ticket={selectedTicket} />
          ) : (
            <div className="bg-white rounded-lg border border-border h-full flex items-center justify-center p-6 text-center">
              <p className="text-muted-foreground">
                Select a ticket to start chatting
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Create Ticket Modal */}
      {showCreateModal && (
        <CreateTicketModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateTicket}
        />
      )}
    </div>
  );
}

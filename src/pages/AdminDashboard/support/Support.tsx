import CommonSpace from "@/common/space/CommonSpace";
import DashboardTopSection from "@/components/AdminDashboard/reuseable/DashboardTopSection";
import { Eye, Paperclip, Search, Send, X } from "lucide-react";
import React, { useState } from "react";

interface Ticket {
  id: string;
  subject: string;
  user: string;
  type: string;
  priority: "High" | "Medium" | "low";
  status: "Open" | "In-Progress" | "Resolved";
  created: string;
}

interface Message {
  id: string;
  sender: string;
  text: string;
  time: string;
  isSupport: boolean;
}

const tickets: Ticket[] = [
  {
    id: "#1234",
    subject: "Cannot access MCQ section",
    user: "John Smith",
    type: "student",
    priority: "High",
    status: "Open",
    created: "2024-10-14",
  },
  {
    id: "#1235",
    subject: "Payment issue with subscription",
    user: "Dr. Sarah Johnson",
    type: "professional",
    priority: "Medium",
    status: "In-Progress",
    created: "2024-10-14",
  },
  {
    id: "#1234",
    subject: "Cannot access MCQ section",
    user: "John Smith",
    type: "student",
    priority: "low",
    status: "Resolved",
    created: "2024-10-14",
  },
  {
    id: "#1234",
    subject: "Cannot access MCQ section",
    user: "John Smith",
    type: "student",
    priority: "low",
    status: "Resolved",
    created: "2024-10-14",
  },
];

const Support: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("All Ticket");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [message, setMessage] = useState("");
  const [messages] = useState<Message[]>([
    {
      id: "1",
      sender: "User",
      text: "Hello,\nThis Question does not contain the correct answer. The answer is:",
      time: "Today, 12:45 PM",
      isSupport: false,
    },
    {
      id: "2",
      sender: "Jhon Doe",
      text: "Hi Alex,\n\nThanks for your feedback. We will check it and let you know",
      time: "Today, 12:45 PM",
      isSupport: true,
    },
  ]);

  const filters = [
    { label: "All Ticket", count: 4 },
    { label: "Open", count: 1 },
    { label: "In-Progress", count: 1 },
    { label: "Resolved", count: 2 },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-600 bg-red-50 border-red-200";
      case "Medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "low":
        return "text-blue-600 bg-blue-50 border-blue-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "text-gray-700 bg-white border-gray-300";
      case "In-Progress":
        return "text-yellow-700 bg-yellow-50 border-yellow-300";
      case "Resolved":
        return "text-green-700 bg-green-50 border-green-300";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="">
      <div className="">
        <DashboardTopSection
          title="Support Center"
          description=" Manage support tickets and customer inquiries"
        />

        <CommonSpace>
          <div className="bg-white rounded-lg shadow-sm">
            {/* Filters and Search */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {filters.map((filter) => (
                    <button
                      key={filter.label}
                      onClick={() => setActiveFilter(filter.label)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeFilter === filter.label
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {filter.label}({filter.count})
                    </button>
                  ))}
                </div>
                <div className="relative flex-1 lg:max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search Ticket"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ticket #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tickets.map((ticket, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {ticket.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {ticket.subject}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {ticket.user}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {ticket.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded text-xs font-medium border ${getPriorityColor(
                              ticket.priority
                            )}`}
                          >
                            {ticket.priority}
                          </span>
                          <button className="text-gray-400 hover:text-gray-600">
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded text-xs font-medium border ${getStatusColor(
                              ticket.status
                            )}`}
                          >
                            {ticket.status}
                          </span>
                          <button className="text-gray-400 hover:text-gray-600">
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {ticket.created}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => setSelectedTicket(ticket)}
                          className="text-orange-500 hover:text-orange-600"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CommonSpace>

        {selectedTicket && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex">
              {/* Left Side - Ticket List */}
              <div className="w-1/2 border-r border-gray-200 flex flex-col">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Support Center
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Manage support tickets and customer inquiries
                  </p>
                </div>

                <div className="p-4 border-b border-gray-200">
                  <div className="flex gap-2 mb-4">
                    {filters.map((filter) => (
                      <button
                        key={filter.label}
                        className={`px-3 py-1.5 rounded text-sm font-medium ${
                          activeFilter === filter.label
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {filter.label}({filter.count})
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search Ticket"
                      className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                          Ticket #
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                          Subject
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                          Created
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {tickets.map((ticket, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium">{ticket.id}</td>
                          <td className="px-4 py-3">{ticket.subject}</td>
                          <td className="px-4 py-3 text-gray-600">
                            {ticket.created}
                          </td>
                          <td className="px-4 py-3">
                            <Eye className="w-4 h-4 text-orange-500" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Side - Chat */}
              <div className="w-1/2 flex flex-col">
                <div className="p-6 border-b border-gray-200 flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">
                        Question Report: QRE0001
                      </h3>
                      <button
                        onClick={() => setSelectedTicket(null)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500 mb-1">User</p>
                        <p className="font-medium">{selectedTicket.user}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">Priority</p>
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded text-xs font-medium border ${getPriorityColor(
                            selectedTicket.priority
                          )}`}
                        >
                          {selectedTicket.priority}
                        </span>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">User Type</p>
                        <p className="font-medium">{selectedTicket.type}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">Status</p>
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded text-xs font-medium border ${getStatusColor(
                            selectedTicket.status
                          )}`}
                        >
                          {selectedTicket.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.isSupport ? "justify-start" : "justify-end"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] ${
                          msg.isSupport ? "order-2" : ""
                        }`}
                      >
                        {msg.isSupport && (
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
                              JD
                            </div>
                            <span className="font-medium text-sm">
                              {msg.sender}
                            </span>
                          </div>
                        )}
                        <div
                          className={`rounded-lg p-4 ${
                            msg.isSupport
                              ? "bg-white border border-gray-200"
                              : "bg-gray-800 text-white"
                          }`}
                        >
                          {msg.isSupport && !msg.text.startsWith("Hi") && (
                            <div className="text-xs font-medium mb-2">
                              Question ID: QRE0001
                            </div>
                          )}
                          <p className="text-sm whitespace-pre-line">
                            {msg.text}
                          </p>
                          {!msg.isSupport && (
                            <div className="flex items-center justify-end gap-2 mt-2">
                              <button className="w-6 h-6 rounded-full bg-white text-gray-800 flex items-center justify-center">
                                <svg
                                  className="w-3 h-3"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{msg.time}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-end gap-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Paperclip className="w-5 h-5" />
                    </button>
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type message"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 flex items-center gap-2">
                      Send
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Support;

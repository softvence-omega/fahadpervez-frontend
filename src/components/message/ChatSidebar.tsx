import React, { useState } from "react";
import { Search, Users, User, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { ChatUser } from "./types";

interface ChatSidebarProps {
  users: ChatUser[];
  activeUserId: string;
  onUserSelect: (userId: string) => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  users,
  activeUserId,
  onUserSelect,
}) => {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    if (activeTab === "All") return matchesSearch;
    if (activeTab === "Groups")
      return matchesSearch && user.userType === "group";
    if (activeTab === "Mentor")
      return matchesSearch && user.userType === "mentor";
    return matchesSearch;
  });

  return (
    <>
      {/* Search */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by, contact or keyword"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {["All", "Groups", "Mentor"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 px-4 py-3 text-sm font-medium ${
              activeTab === tab
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {filteredUsers.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <p className="text-sm">No {activeTab.toLowerCase()} found</p>
          </div>
        ) : activeTab === "Groups" ? (
          <div className="p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-700">
                <Link to="#" className="hover:underline ">
                  Explore Groups
                </Link>
              </h3>
              <button className="flex items-center gap-1 text-sm text-blue-600 hover:underline">
                <span>
                  {" "}
                  <Link to="#">
                    <Plus className="w-6 h-6 inline" />
                    <p className="hidden md:inline">Create new Group</p>
                  </Link>
                </span>
              </button>
            </div>

            {/* Group Cards */}
            <div className="space-y-3">
              {filteredUsers
                .filter((u) => u.userType === "group")
                .map((user) => (
                  <div
                    key={user.id}
                    onClick={() => onUserSelect(user.id)}
                    className={`p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 ${
                      activeUserId === user.id ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="ml-3 flex-1">
                        <h4 className="text-[.75rem] sm:text-sm md:text-wrap font-medium text-gray-900 truncate">
                          {user.name}
                        </h4>
                        {user.memberCount && (
                          <p className="text-xs text-gray-500">
                            {user.memberCount} members
                          </p>
                        )}
                        {user.lastMessage && (
                          <p className="text-xs text-gray-500 truncate">
                            {user.lastMessage}
                          </p>
                        )}
                        {user.timeAgo && (
                          <p className="text-xs text-gray-400">
                            {user.timeAgo}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          // Default for All & Mentor tabs
          filteredUsers.map((user) => (
            <div
              key={user.id}
              onClick={() => onUserSelect(user.id)}
              className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 ${
                activeUserId === user.id ? "bg-blue-50" : ""
              }`}
            >
              {/* Avatar */}
              <div className="relative">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  {user.userType === "mentor" ? (
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">Dr</span>
                    </div>
                  ) : (
                    <User className="w-6 h-6 text-gray-600" />
                  )}
                </div>
                <div
                  className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                    user.status === "online" ? "bg-green-500" : "bg-gray-400"
                  }`}
                />
              </div>

              {/* Info */}
              <div className="ml-3 flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {user.name}
                    {user.userType === "mentor" && (
                      <span className="ml-1 text-xs text-blue-600 font-medium">
                        Mentor
                      </span>
                    )}
                  </h4>
                </div>
                <p className="text-xs text-gray-500 truncate mt-1">
                  {user.lastMessage || user.lastSeen}
                </p>
                {user.timeAgo && (
                  <p className="text-xs text-gray-400 mt-1">{user.timeAgo}</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ChatSidebar;

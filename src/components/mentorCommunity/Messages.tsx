import React, { useState } from "react";
import ChatSidebar from "@/components/message/ChatSidebar";
import ChatMain from "@/components/message/ChatMain";
import { demoUsers, demoMessages } from "@/components/message/demoData";



const Messages: React.FC = () => {
  const [activeUserId, setActiveUserId] = useState("4");
  const [showChat, setShowChat] = useState(false);
  const activeUser = demoUsers.find((user) => user.id === activeUserId);

  return (
    // if your tailwind doesn't support 'h-260', use h-[260px] or responsive variants
    <div className="h-[calc(100vh-200px)]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
        {/* Sidebar */}
        <div
          className={`bg-white border border-gray-200 rounded-lg flex flex-col h-full min-h-0 ${
            showChat ? "hidden md:flex" : "flex"
          }`}
        >
          {/* Make sidebar scrollable - ensure wrapper has min-h-0 too */}
          <div className="flex-1 min-h-0 overflow-y-auto">
            <ChatSidebar
              users={demoUsers}
              activeUserId={activeUserId}
              onUserSelect={(id) => {
                setActiveUserId(id);
                setShowChat(true);
              }}
            />
          </div>
        </div>

        {/* Chat */}
        <div
          className={`  shadow-x flex flex-col h-full md:col-span-2 min-h-0 ${
            showChat ? "flex" : "hidden md:flex"
          }`}
        >
          <ChatMain
            messages={demoMessages}
            activeUser={activeUser}
            onBack={() => setShowChat(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default Messages;

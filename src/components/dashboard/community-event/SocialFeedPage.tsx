import { useState } from "react";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import SocialFeed from "./social-feed/SocialFeed";
import LiveChat from "./social-feed/LiveChat";
import CreatePostModal from "./social-feed/CreatePostModal";
import CreateRoomModal from "./social-feed/CreateRoomModal";


const SocialFeedPage = () => {
  const [activeTab, setActiveTab] = useState("Social Feed");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between h-auto sm:h-16 gap-3 py-4">
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab("Social Feed")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === "Social Feed"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Social Feed
          </button>
          <button
            onClick={() => setActiveTab("Live Chat")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === "Live Chat"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Live Chat
          </button>
        </div>

        {/* Dynamic Button */}
        <PrimaryButton onClick={() => setIsModalOpen(true)}>
          {activeTab === "Social Feed" ? "+ Create Post" : "+ Create Room"}
        </PrimaryButton>
      </div>

      {/* Content */}
      {activeTab === "Social Feed" ? <SocialFeed /> : <LiveChat />}

      {/* Modals */}
      {activeTab === "Social Feed" ? (
        <CreatePostModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      ) : (
        <CreateRoomModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      )}
    </div>
  );
};

export default SocialFeedPage;

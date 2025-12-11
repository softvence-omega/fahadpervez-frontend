// components/Sidebar.tsx
import { useContext, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp, MessageSquare, Loader2 } from "lucide-react";
import { ChatContext, ChatContextType } from "./AITutor";
import { useGetThreadTitlesQuery } from "@/store/features/aiTutor/aiTutor.api";

export default function AiTutorSidebar() {
  const {
    addNewChat,
    searchQuery,
    setSearchQuery,
    setCurrentChatId,
    currentChatId,
  } = useContext(ChatContext) as ChatContextType;

  const [isHistoryOpen, setIsHistoryOpen] = useState(true);
  const { data: threadTitles, isLoading } = useGetThreadTitlesQuery();

  // Auto open history when searching
  useEffect(() => {
    if (searchQuery.trim() !== "") {
      setIsHistoryOpen(true);
    }
  }, [searchQuery]);

  // Filter threads based on search
  const filteredThreads = threadTitles?.filter(thread => 
    thread.session_title.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  // Highlight matched letters
  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-yellow-300 text-black px-0.5 rounded">
          {part}
        </mark>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  return (
    <aside className="w-64 bg-white p-4 border-r border-gray-200 flex flex-col h-full">
      <div className="flex flex-col items-center justify-start mb-6">
        <h1 className="text-xl font-semibold text-start text-[#0A0A0A]">
          Medical AI
        </h1>
        <p className="text-sm text-[#4A5565] font-normal">Your Personalized Learning Companion</p>
      </div>

      <nav className="space-y-4 flex-1 flex flex-col min-h-0">
        {/* New Chat */}
        <Button
          onClick={addNewChat}
          className="w-full bg-blue-500 text-white hover:bg-blue-600"
        >
          + New Chat
        </Button>

        {/* Search */}
        <div>
          <Input
            type="text"
            placeholder="Search chats"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>

        {/* History Section */}
        <div className="flex-1 flex flex-col min-h-0 rounded-md bg-gray-50">
          <button
            onClick={() => setIsHistoryOpen((prev) => !prev)}
            className="w-full flex justify-between items-center px-3 py-2 font-medium text-gray-700 hover:bg-gray-100 rounded-t-md transition-colors"
          >
            History
            {isHistoryOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>

          {isHistoryOpen && (
            <div className="flex-1 overflow-y-auto border-t border-gray-200 custom-scrollbar">
              {isLoading ? (
                <div className="flex justify-center p-4">
                    <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                </div>
              ) : filteredThreads.length > 0 ? (
                filteredThreads.map((thread) => (
                  <div
                    key={thread.thread_id}
                    onClick={() => setCurrentChatId(thread.thread_id)}
                    className={`cursor-pointer px-3 py-2 text-sm transition-colors flex items-center gap-2 ${
                      currentChatId === thread.thread_id
                        ? "bg-blue-100 text-blue-800 font-medium"
                        : "text-gray-700 hover:bg-blue-50"
                    }`}
                  >
                    <MessageSquare className="w-4 h-4 shrink-0" />
                    <span className="truncate">
                        {highlightMatch(thread.session_title, searchQuery)}
                    </span>
                  </div>
                ))
              ) : (
                <div className="px-3 py-2 text-sm text-gray-400 text-center">
                  No chats found
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
}

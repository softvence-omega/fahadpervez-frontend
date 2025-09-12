// components/Sidebar.tsx
import { useContext, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ChatContext, ChatContextType } from "./AITutor";

export default function AiTutorSidebar() {
    const {
        addNewChat,
        searchQuery,
        setSearchQuery,
        filteredChats,
        setCurrentChatId,
        currentChatId,
    } = useContext(ChatContext) as ChatContextType;

    const [isHistoryOpen, setIsHistoryOpen] = useState(true);

    // Auto open history when searching
    useEffect(() => {
        if (searchQuery.trim() !== "") {
            setIsHistoryOpen(true);
        }
    }, [searchQuery]);

    // Highlight matched letters
    const highlightMatch = (text: string, query: string) => {
        if (!query) return text;

        const regex = new RegExp(`(${query})`, "gi");
        const parts = text.split(regex);

        return parts.map((part, i) =>
            regex.test(part) ? (
                <mark
                    key={i}
                    className="bg-yellow-300 text-black px-0.5 rounded"
                >
                    {part}
                </mark>
            ) : (
                <span key={i}>{part}</span>
            )
        );
    };

    return (
        <aside className="w-64 bg-white p-4 border-r border-gray-200">
            {/* Logo */}
            <div className="flex items-center justify-center mb-6">
                <img src="/logo.png" alt="Medical AI" className="h-12 w-12" />
                <h1 className="ml-2 text-xl font-semibold">Medical AI</h1>
            </div>

            <nav className="space-y-4">
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
                <div className=" rounded-md bg-gray-50">
                    <button
                        onClick={() => setIsHistoryOpen((prev) => !prev)}
                        className="w-full flex justify-between items-center px-3 py-2 font-medium text-gray-700 hover:bg-gray-100 rounded-t-md"
                    >
                        History
                        {isHistoryOpen ? (
                            <ChevronUp className="h-4 w-4" />
                        ) : (
                            <ChevronDown className="h-4 w-4" />
                        )}
                    </button>

                    {isHistoryOpen && (
                        <div className="max-h-60 overflow-y-auto border-t border-gray-200">
                            {filteredChats.length > 0 ? (
                                filteredChats.map((chat) => (
                                    <div
                                        key={chat.id}
                                        onClick={() => setCurrentChatId(chat.id)}
                                        className={`cursor-pointer px-3 py-2 text-sm transition-colors ${currentChatId === chat.id
                                            ? "bg-blue-100 text-blue-800 font-medium"
                                            : "text-gray-700 hover:bg-blue-50"
                                            }`}
                                    >
                                        {highlightMatch(chat.title, searchQuery)}
                                    </div>
                                ))
                            ) : (
                                <div className="px-3 py-2 text-sm text-gray-400">
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

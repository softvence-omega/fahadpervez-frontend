// components/ChatMessages.tsx
import { Message } from "./AITutor";
import NewChatPrompt from "./NewChatPrompt";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatMessagesProps {
    messages: Message[];
    lastMessageRef: React.RefObject<HTMLLIElement | null>;
}

export default function ChatMessages({ messages, lastMessageRef }: ChatMessagesProps) {
    if (!messages.length) return null;

    return (
        <ul className="space-y-4">
            {messages.map((msg, index) => (
                <li
                    key={index}
                    className={`flex ${msg.role === "ai" ? 'justify-start' : 'justify-end'}`}
                    ref={index === messages.length - 1 ? lastMessageRef : null}
                >
                    <div className={`p-4 rounded-lg ${msg.role === "ai" ? 'bg-blue-50 max-w-2xl' : 'bg-gray-600 text-white max-w-md'}`}>
                        {msg.role === "ai" ? (
                            <div className="prose prose-sm max-w-none prose-p:text-gray-800 prose-headings:text-gray-900 prose-strong:text-gray-900 prose-ul:list-disc prose-ol:list-decimal prose-a:text-blue-600">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {msg.content}
                                </ReactMarkdown>
                            </div>
                        ) : (
                            <div className="whitespace-pre-wrap">{msg.content}</div>
                        )}
                    </div>
                </li>
            ))}
        </ul>
    );
}
// components/ChatMessages.tsx
import { Message } from "./AITutor";
import NewChatPrompt from "./NewChatPrompt";

interface ChatMessagesProps {
    messages: Message[];
    lastMessageRef: React.RefObject<HTMLLIElement | null>;
}

export default function ChatMessages({ messages, lastMessageRef }: ChatMessagesProps) {
    return (
        <div>
            {messages.length ? (
                <ul className="space-y-4">
                    {messages.map((msg, index) => (
                        <li
                            key={index}
                            className={`flex ${msg.role === "ai" ? 'justify-start' : 'justify-end'}`}
                            ref={index === messages.length - 1 ? lastMessageRef : null}
                        >
                            <div className={`p-4 rounded-lg ${msg.role === "ai" ? 'bg-blue-50 max-w-2xl' : 'bg-gray-600 text-white max-w-md'}`}>
                                <div className="whitespace-pre-wrap">{msg.content}</div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div><NewChatPrompt /></div>
            )}
        </div>
    );
}
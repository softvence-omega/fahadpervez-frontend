// components/ChatMessages.tsx
import { Message } from "./AITutor";
import NewChatPrompt from "./NewChatPrompt";

interface ChatMessagesProps {
    messages: Message[];
    lastMessageRef: React.RefObject<HTMLLIElement | null>;
}

export default function ChatMessages({ messages, lastMessageRef }: ChatMessagesProps) {
    console.log(messages);
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
                            <div className={`p-3 rounded-lg max-w-xs ${msg.role === "ai" ? 'bg-blue-100' : 'bg-gray-100'} ${msg.role === "user" && "bg-gray-600 text-white"}`}>
                                {msg.content}
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
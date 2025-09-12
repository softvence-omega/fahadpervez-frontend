// components/ChatWindow.tsx
import { useContext, useState, useEffect, useRef } from 'react';
import NewChatPrompt from './NewChatPrompt';
import ChatMessages from './ChatMessages';
import InputField from './InputField';
import { Chat, ChatContext, ChatContextType } from './AITutor';

export default function ChatWindow() {
    const { currentChatId, chats, addMessage } = useContext(ChatContext) as ChatContextType;
    const [currentChat, setCurrentChat] = useState<Chat | null>(null);
    const [inputValue, setInputValue] = useState<string>('');
    const lastMessageRef = useRef<HTMLLIElement>(null);

    useEffect(() => {
        if (currentChatId) {
            const chat = chats.find(c => c.id === currentChatId);
            setCurrentChat(chat || null);
        } else {
            setCurrentChat(null);
        }
        // Scroll to the last message when chat changes
        if (lastMessageRef.current && currentChat?.messages.length) {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, [currentChatId, chats, currentChat]);

    const handleSend = () => {
        if (inputValue.trim() && currentChat) {
            addMessage(currentChat.id, { role: 'user', content: inputValue });
            setTimeout(() => {
                addMessage(currentChat.id, { role: 'ai', content: 'This is a dummy AI response.' });
            }, 500);
            setInputValue('');
        }
    };

    if (!currentChat) {
        return <NewChatPrompt />;
    }

    return (
        <section className="flex-1 p-6 overflow-y-auto">
            <header className="border-b border-gray-200 pb-4 mb-4">
                <h2 className="text-xl font-semibold">{currentChat?.title}</h2>
            </header>
            <div className="h-3/5 overflow-y-auto">
                <ChatMessages messages={currentChat?.messages} lastMessageRef={lastMessageRef} />
            </div>
            <InputField value={inputValue} onChange={setInputValue} onSend={handleSend} />
        </section>
    );
}
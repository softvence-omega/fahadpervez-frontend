// components/ChatWindow.tsx
import { useContext, useState, useEffect, useRef } from 'react';
import NewChatPrompt from './NewChatPrompt';
import ChatMessages from './ChatMessages';
import InputField from './InputField';
import { Chat, ChatContext, ChatContextType, Message } from './AITutor';
import { useSendQuestionMutation, useGetHistoryQuery, IMessage } from '@/store/features/aiTutor/aiTutor.api';
import { toast } from 'sonner';

const WELCOME_MESSAGE: Message = {
    role: 'ai',
    content: `I can help you in various ways, including:

1. **Clarifying Concepts**: I can explain medical concepts, terms, or diseases in a way that's easy to understand.
2. **Exam Preparation**: I can help you review key topics, suggest study strategies, and provide practice questions.
3. **Research Summaries**: If you need an overview or summary of a specific medical topic, I can provide that.
4. **Clinical Scenarios**: I can help you work through clinical cases or problem-solving scenarios.
5. **Resources Recommendations**: I can suggest textbooks, online courses, or other resources for deeper learning.

Just let me know what you need help with, and we can get started!`
};

export default function ChatWindow() {
    const { currentChatId, chats } = useContext(ChatContext) as ChatContextType;
    const [currentChat, setCurrentChat] = useState<Chat | null>(null);
    const [inputValue, setInputValue] = useState<string>('');
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const [displayMessages, setDisplayMessages] = useState<Message[]>([WELCOME_MESSAGE]);
    const [pendingQuestion, setPendingQuestion] = useState<string | null>(null);
    const lastMessageRef = useRef<HTMLLIElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const [sendQuestion, { isLoading }] = useSendQuestionMutation();
    const { data: historyData, refetch } = useGetHistoryQuery();

    useEffect(() => {
        if (currentChatId) {
            const chat = chats.find(c => c.id === currentChatId);
            setCurrentChat(chat || null);
        } else {
            setCurrentChat(null);
        }
    }, [currentChatId, chats]);

    // Convert history data to display messages
    useEffect(() => {
        if (historyData && historyData.length > 0) {
            const messages: Message[] = [];
            
            // Process history items in reverse order (oldest first)
            const sortedHistory = [...historyData].reverse();
            
            sortedHistory.forEach(item => {
                item.messages.forEach((msg: IMessage) => {
                    messages.push({
                        role: msg.type === 'HumanMessage' ? 'user' : 'ai',
                        content: msg.content
                    });
                });
            });
            
            setDisplayMessages(messages);
            setPendingQuestion(null); // Clear pending question once history is loaded
        } else if (!historyData || historyData.length === 0) {
            // Show welcome message if no history
            setDisplayMessages([WELCOME_MESSAGE]);
        }
    }, [historyData]);

    // Auto-scroll to latest message
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [displayMessages, isTyping, pendingQuestion]);

    const handleSend = async () => {
        if (inputValue.trim() && currentChat) {
            const questionText = inputValue;
            
            // Optimistically add user's question to UI
            setPendingQuestion(questionText);
            const userMessage: Message = { role: 'user', content: questionText };
            setDisplayMessages(prev => [...prev.filter(msg => msg !== WELCOME_MESSAGE), userMessage]);
            
            setInputValue(''); // Clear input immediately
            setIsTyping(true); // Show typing indicator

            try {
                await sendQuestion({ question: questionText }).unwrap();
                
                // Refetch history to get updated messages from backend
                await refetch();
                
                toast.success('Response received! ✅');
                
            } catch (error: any) {
                console.error('AI Tutor error:', error);
                toast.error(error?.data?.message || 'Failed to get AI response. Please try again ❌');
                
                // Remove the pending question on error
                setPendingQuestion(null);
                setDisplayMessages(prev => prev.filter(msg => msg.content !== questionText));
            } finally {
                setIsTyping(false);
            }
        }
    };

    return (
        <section className="flex-1 flex flex-col p-6">
            <header className="border-b border-gray-200 pb-4 mb-4">
                <h2 className="text-xl font-semibold">AI Tutor</h2>
            </header>
            <div className="flex-1 overflow-y-auto mb-4">
                {currentChat ? (
                    <div className="space-y-4">
                        <ChatMessages messages={displayMessages} lastMessageRef={lastMessageRef} />
                        {isTyping && (
                            <div className="flex items-start gap-3 mb-4">
                                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                                    AI
                                </div>
                                <div className="bg-gray-100 p-3 rounded-lg">
                                    <div className="flex gap-1">
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                ) : (
                    <NewChatPrompt />
                )}
            </div>
            <InputField 
                value={inputValue} 
                onChange={setInputValue} 
                onSend={handleSend} 
                disabled={isLoading || isTyping}
            />
        </section>
    );
}
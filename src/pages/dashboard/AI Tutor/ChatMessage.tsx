// // components/ChatMessage.tsx

// interface ChatMessageProps {
//     role: 'user' | 'ai';
//     content: string;
// }

// export default function ChatMessage({ role, content }: ChatMessageProps) {
//     const isAI = role === 'ai';
//     const isUser = role === "user";
//     return (
//         <li className={`flex ${isAI ? 'justify-start' : 'justify-end'}`}>
//             <div className={`p-3 rounded-lg max-w-xs ${isAI ? 'bg-blue-100' : 'bg-gray-100'} ${isUser && "bg-gray-600 text-white"}`}>
//                 {content}
//             </div>
//         </li>
//     );
// }